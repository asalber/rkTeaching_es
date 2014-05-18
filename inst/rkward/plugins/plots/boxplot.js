//author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var data, x, variable, variablename, groups, groupsname, notch, means, points, xlab, ylab, boxcolor, bordercolor; 

function preprocess() {
	echo('require(ggplot2)\n');
}

function calculate() {
    // Filter
	echo(getString("filter_embed.code.calculate"));
	// Load variables
	variable = getList("variable");
	var numvar = variable.length;
	variable = variable.join();
	data = variable.split('[[')[0];
	variablename = getList("variable.shortname").join('","');
	echo('df <- data.frame(y=c(' + variable + '), x=factor(rep(c("' + variablename + '"), each=nrow(' + data + ')))');
	if (getBoolean("grouped")) {
		groups = getList("groups").join();
		groupsname = getList("groups.shortname").join(".");
		echo(', ' + groupsname + '=rep(interaction(' + groups + '),' + numvar + ')');
	}
	echo(')\n');
	xlab = ', xlab=""';
	ylab = ', ylab=""';
	fill = '';
	// Set box color
	boxcolor = getString("boxfillcolor.code.printout");
	if (boxcolor != '') {
		boxcolor = ', fill=I(' + boxcolor + ')';
	}
	else {
		boxcolor = ', fill=I("#FF9999")'; // Default box color
	}
    // Set border color
	bordercolor = getString("boxbordercolor.code.printout");
	if (bordercolor != '') {
		bordercolor = ', colour=I(' + bordercolor + ')';
	}
	// Set grouped mode
	facet = '';
	if (getBoolean("grouped")) {
		boxcolor = ', fill=' + groupsname;
		bordercolor = '';
	}
	// Set notch
	notch = '';
	if (getBoolean("notch")) {
		notch = ', notch=TRUE';
	}
	// Set means
	means = '';
	if (getBoolean("means")) {
		means = ' + stat_summary(fun.y=mean, colour="red", geom="point", position=position_dodge(width=0.75))';
	}
	// Set points
	points = '';
	if (getBoolean("points")) {
		points = ' + geom_point(position=position_dodge(width=0.75))';
	}
}

function printout () {
	doPrintout (true);
}

function preview() {
	preprocess();
	calculate();
	doPrintout (false);
}

function doPrintout(full) {
	// Print header
	if (full) {
		echo ('rk.header ("Diagrama de caja de ' + getList("variable.shortname").join(', ') + '", list ("Variable(s)" = rk.get.description(' + variable + ', paste.sep=", ")' + getString("filter_embed.code.printout"));
		if (getBoolean("grouped")) {
			echo(', "Variable(s) de agrupaci&oacute;n" = rk.get.description(' + groups + ', paste.sep=", ")');
		}
		echo('))\n');
		echo ('rk.graph.on ()\n');
	}
	// Plot
	echo('try ({\n');
	echo('p<-qplot(x,y,data=df, geom="boxplot"' + boxcolor + bordercolor + notch + xlab + ylab + getString("plotoptions.code.printout") + ')' + points + means + facet + getString("plotoptions.code.calculate") + '\n');
	echo('print(p)\n');
	echo ('})\n');

	if (full) {
		echo ('rk.graph.off ()\n');
	}
}