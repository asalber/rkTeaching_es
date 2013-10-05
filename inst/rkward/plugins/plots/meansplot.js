//author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var data, x, variable, variablename, groups, groupsname, xlab, ylab, points, confintervals, meancolor; 

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
	// Set mean color
	meancolor = ', colour=I("#FF9999")';
	// Set grouped mode
	facet = '';
	if (getBoolean("grouped")) {
		meancolor = ', colour=' + groupsname;
	}
	// Set confidence intervals
	confintervals = '';
	if (getBoolean("confint_frame.checked")) {
		confintervals = ' + stat_summary(fun.data=function(x) mean_cl_normal(x, conf.int=' + getString("conflevel") + '), geom="pointrange", position=position_dodge(width=0.25))';
	}
	// Set points
	points = '';
	if (getBoolean("points")) {
		points = ' + geom_point(position=position_dodge(width=0.25))';
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
		echo ('rk.header ("Diagrama de medias de ' + getList("variable.shortname").join(', ') + '", list ("Variable(s)" = rk.get.description(' + variable + ', paste.sep=", ")' + getString("filter_embed.code.printout"));
		if (getBoolean("grouped")) {
			echo(', "Variable(s) de agrupaci&oacute;n" = rk.get.description(' + groups + ', paste.sep=", ")');
		}
		if (getBoolean("confint_frame.checked")) {
			echo(', "Nivel de confianza del intervalo" = ' + getString("conflevel"));
		}
		echo('))\n');
		echo ('rk.graph.on ()\n');
	}
	// Plot
	echo('try ({\n');
	echo('p<-qplot(x,y,data=df, stat="summary", fun.y=mean' + meancolor + ', position=position_dodge(width=0.25), size=I(4)' + xlab + ylab + getString("plotoptions.code.printout") + ')'  + points + confintervals + facet + getString("plotoptions.code.calculate") + '\n');
	echo('print(p)\n');
	echo ('})\n');

	if (full) {
		echo ('rk.graph.off ()\n');
	}
}