//author: Alfredo Sánchez Alberca (asalber@ceu.es)

var variable, y, variablename, data, groups, groupsname, fill, position, xlab, ylab, barcolor, bordercolor, facet; 

function preprocess(){
	// add requirements etc. here
	echo('require(ggplot2)\n');
}

function calculate() {
	// Load variables
	variable = getString("variable");
	data = variable.split('[[')[0];
	variablename = getString("variable.shortname");
	xlab = ', xlab="' + variablename + '"';
	ylab = ', ylab = "Frecuencia absoluta"';
	fill = '';
	// Set bar color
	barcolor = getString("barfillcolor.code.printout")
	if (barcolor!='') {
		barcolor = ', fill=I(' + barcolor + ')';
	}
	else {
		barcolor = ', fill=I("#FF9999")';
	}
    // Set border color
	bordercolor = getString("barbordercolor.code.printout");
	if (bordercolor != '') {
		bordercolor = ', colour=I(' + bordercolor + ')';
	}
	else {
		bordercolor = ', colour=I("white")';
	}
	// Set grouped mode
	position = '';
	facet = '';
	if (getBoolean("grouped")) {
		groups = getString("groups");
		groupsname = getString("groups.shortname");
		fill = ', fill=' + groupsname;
		if (getString("position")!='faceted') {
			position = ', position="' + getString("position") + '"';
			if (getString("position")==='identity') {
				position += ', alpha=.5';
			}
		}
		else {
			facet = ' + facet_grid(.~' + groupsname + ')';
		}
		barcolor = '';
	}
    // Filter
	echo(getString("filter_embed.code.calculate"));
	// Set frecuency type
	y = '';
	if (getBoolean("relative")) {
		y = ', y=..density..';
		ylab = ', ylab="Frecuencia relativa"';
	}
	if (getBoolean("cumulative")) {
		y = ', y=cumsum(..count..)';
		ylab = ', ylab="Frecuencia acumulada"';
		if (getBoolean("relative")){
			y = ', y=cumsum(..density..)';
			ylab = ', ylab="Frecuencia relativa acumulada"';
		}
	}
}

function printout () {
	doPrintout (true);
}

function preview () {
	doPrintout (false);
}

function doPrintout (full) {
	// Print header
	if (full) {
		echo('rk.header ("Histograma", parameters=list ("Variable" = rk.get.description (' + variable + ')' + getValue ("histogram_opt.code.printout") + getValue ("cells.code.printout") + '))\n');
		echo('\n');
		echo('rk.graph.on ()\n');
	}
	// Plot
	echo('try ({\n');
	echo('p<-qplot(' +  variablename + y + ', data=' + data + ', geom="histogram"' + stat + getString("cells.code.calculate") + fill + barcolor + bordercolor + position + xlab + ylab + getString("plotoptions.code.printout") + ')' + facet + getString("plotoptions.code.calculate") + '\n');
	if (getBoolean("density")) {
		echo('p <- p + geom_line(aes(y = ..density..), stat = "density")\n');
	}
	if (getBoolean("polygon")) {
		echo('p <- p + geom_freqpoly(' + getString("cells.code.calculate") + ')\n');
	}
	echo('print(p)\n');
	echo('})\n');
	if (full) {
		echo('rk.graph.off ()\n');
	}
}


