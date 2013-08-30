//author: Alfredo Sánchez Alberca (asalber@ceu.es)

var data, variable, variablename, groups, groupsname, fill, xlab, ylab, facet; 

function preprocess () {
	echo('require(ggplot2)\n');
}

function calculate() {
	variable = getString("variable");
	data = variable.split('[[')[0];
	variablename = getString("variable.shortname");
	xlab = ', xlab=""';
	ylab = ', ylab = ""';
	// Set grouped mode
	facet = '';
	if (getBoolean("grouped")) {
		groups = getString("groups");
		groupsname = getString("groups.shortname");
			facet = ' + facet_grid(.~' + groupsname + ')';
	}
    // Filter
	echo(getString("filter_embed.code.calculate"));
}

function printout () {
	doPrintout (true);
}

function preview() {
	doPrintout (false);
}

function doPrintout(full) {
	// Print header
	if (full) {
		echo ('rk.header ("Diagrama de sectores", list ("Variable" = rk.get.description(' + variable + ')))\n');
		echo ('rk.graph.on ()\n');
	}
	// Plot
	echo('try ({\n');
	echo('p<-qplot(x=factor(1), data=' + data + ', fill=factor(' + variablename + ')' + xlab + ylab + getString("plotoptions.code.printout") + ')' + ' + geom_bar(width=1) +  coord_polar(theta="y") + theme( axis.ticks.y=element_blank(), axis.text.y=element_blank())' + facet + getString("plotoptions.code.calculate") + '\n');
	echo('print(p)\n');
	echo ('})\n');

	if (full) {
		echo ('rk.graph.off ()\n');
	}
}

