//author: Alfredo Sánchez Alberca (asalber@ceu.es)

var data, variable, variablename, y, groups, groupsname, fill, position, xlab, ylab, barcolor, bordercolor, facet; 

function preprocess() {
	echo('require(rk.Teaching)\n');
	echo('require(plyr)\n');
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
		barcolor = ', fill=I("#FF9999")'; // Defauklt bar color
	}
    // Set border color
	bordercolor = getString("barbordercolor.code.printout");
	if (bordercolor != '') {
		bordercolor = ', colour=I(' + bordercolor + ')';
	}
	// Set grouped mode
	position = '';
	facet = '';
	if (getBoolean("grouped")) {
		groups = getList("groups");
		groupsname = getList("groups.shortname");
		fill = ', fill=' + groupsname.join('.');
		if (getBoolean("cumulative") || getString("position")==='faceted') {
			facet = ' + facet_grid(' + groupsname.join('.') + '~.)';
		}
		else {
			position = ', position="' + getString("position") + '"';
		}
		barcolor = '';
	}
    // Filter
	echo(getString("filter_embed.code.calculate"));
	// Prepare data
	if (getBoolean("grouped")) {
		echo('df <- ldply(frequencyTable(' + data + ', ' + quote(variablename) + ', groups=c(' + groupsname.map(quote) + ')))\n');
		if (groupsname.length>1){
			echo('df <- transform(df,' + groupsname.join('.') + '=interaction(df[,c(' + groupsname.map(quote) + ')]))\n');
		}
	}
	else {
		echo('df <- frequencyTable(' + data + ', ' + quote(variablename) + ')\n');
	}
	// Set frequency type
	y = ', Frec.Abs.';
	if (getBoolean("relative")) {
		y = ', Frec.Rel.';
		ylab = ', ylab="Frecuencia relativa"';
		if (getBoolean("grouped") && getString("position")==='stack' ) {
			echo('df <- transform(df,Frec.Rel.=Frec.Abs./sum(Frec.Abs.))\n');
		}
	}
	if (getBoolean("cumulative")) {
		y = ', Frec.Abs.Acum.';
		ylab = ', ylab="Frecuencia acumulada"';
		if (getBoolean("relative")){
			y = ', Frec.Rel.Acum.';
			ylab = ', ylab="Frecuencia relativa acumulada"';
		}
	}
}

function printout () {
	doPrintout(true);
}

function preview() {
	preprocess();
	calculate();
	doPrintout(false);
}

function doPrintout(full) {
	// Print header
	if (full) {
		echo ('rk.header ("Diagrama de barras de ' + variablename + '", list ("Variable" = rk.get.description(' + variable + ')' + getString("filter_embed.code.printout"));
		if (getBoolean("grouped")) {
			echo(', "Variable de agrupaci&oacute;n" = rk.get.description(' + groups + ', paste.sep=", ")');
		}
		echo('))\n');
		echo ('rk.graph.on()\n');
	}
	// Plot
	echo('try ({\n');
	echo('p<-qplot(' +  variablename + y + ', data=df, geom="bar", stat="identity"' + fill + barcolor + bordercolor + position + xlab + ylab + getString("plotoptions.code.printout") + ')' + facet + getString("plotoptions.code.calculate") + '\n');
	if (getBoolean("polygon")) {
		if (getBoolean("cumulative")) {
			echo('p <- p + geom_step(aes(group=1))\n');
		}
		else {
			echo('p <- p + geom_line(aes(group=1))\n');
		}
	}
	echo('print(p)\n');
	echo ('})\n');

	if (full) {
		echo ('rk.graph.off()\n');
	}
}

