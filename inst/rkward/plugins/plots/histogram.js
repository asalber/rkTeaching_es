//author: Alfredo Sánchez Alberca (asalber@ceu.es)

var variable, y, variablename, data, groups, groupsname, cells, fill, position, xlab, ylab, barcolor, bordercolor, facet; 

function preprocess(){
	// add requirements etc. here
	echo('require(rk.Teaching)\n');
	echo('require(plyr)\n');
	echo('require(ggplot2)\n');
}

function calculate() {
	// Load variables
	variable = getString("variable");
	data = variable.split('[[')[0];
	variablename = getString("variable.shortname");
	xlab = ' + xlab("' + variablename + '")';
	ylab = ' + ylab("Frecuencia absoluta")';
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
		groups = getList("groups");
		groupsname = getList("groups.shortname");
		fill = ', fill=' + groupsname.join('.');
		if (getBoolean("cumulative") || getString("position")==='faceted') {
			facet = ' + facet_grid(' + groupsname.join('.') + '~.)';
		}
		else {
			position = ', position="' + getString("position") + '"';
			if (getString("position")==='identity') {
				position += ', alpha=.5';
			}
		}
		barcolor = '';
	}

    // Filter
	echo(getString("filter_embed.code.calculate"));
	// Interval breaks
	cells = getString("cells.code.calculate");
	echo('breaks <- ' + getString("cells.code.preprocess") + '\n');	
	// Calculate frequencies
	if (getBoolean("grouped")) {
		echo('df <- ldply(frequencyTableIntervals(' + data + ', ' + quote(variablename) + ', breaks=breaks, center=TRUE, width=TRUE, groups=c(' + groupsname.map(quote) + ')))\n');
		if (groupsname.length>1){
			echo('df <- transform(df,' + groupsname.join('.') + '=interaction(df[,c(' + groupsname.map(quote) + ')]))\n');
		}
	}
	else {
		echo('df <- frequencyTableIntervals(' + data + ', ' + quote(variablename) + ', breaks=breaks, center=TRUE, width=TRUE)\n');
	}
	// Set frecuency type
	y = 'Frec.Abs.';
	if (getBoolean("relative")) {
		y = 'Frec.Rel.';
		ylab = ' + ylab("Frecuencia relativa")';
		if (getBoolean("grouped") && getString("position")==='stack' ) {
			echo('df <- transform(df,Frec.Rel.=Frec.Abs./sum(Frec.Abs.))\n');
		}
	}
	if (getBoolean("cumulative")) {
		y = 'Frec.Abs.Acum.';
		ylab = ' + ylab("Frecuencia absoluta acumulada")';
		if (getBoolean("relative")){
			y = 'Frec.Rel.Acum.';
			ylab = ' + ylab("Frecuencia relativa acumulada")';
		}
	}
//	y = '';
//	if (getBoolean("relative")) {
//		y = ', y=..density..';
//		ylab = ', ylab="Frecuencia relativa"';
//	}
//	if (getBoolean("cumulative")) {
//		y = ', y=cumsum(..count..)';
//		ylab = ', ylab="Frecuencia acumulada"';
//		if (getBoolean("relative")){
//			y = ', y=cumsum(..density..)';
//			ylab = ', ylab="Frecuencia relativa acumulada"';
//		}
//	}
}

function printout () {
	doPrintout (true);
}

function preview () {
	preprocess();
	calculate();
	doPrintout (false);
}

function doPrintout (full) {
	// Print header
	if (full) {
		echo('rk.header ("Histograma de ' + variablename + '", parameters=list ("Variable" = rk.get.description (' + variable + ')' + getString("filter_embed.code.printout"));
		if (getBoolean("grouped")) {
			echo(', "Variable de agrupaci&oacute;n" = rk.get.description(' + groups + ', paste.sep=", ")');
		}
		echo(getString("histogram_opt.code.printout") + getString("cells.code.printout") + '))\n');
		echo('\n');
		echo('rk.graph.on ()\n');
	}
	// Plot
	echo('try ({\n');
	// Histogram
	echo('p <- ggplot(data=df, aes(x=Centro, y=' + y + ')' + getString("plotoptions.code.printout") + ') + geom_bar(aes(width=Amplitud' + fill + '), stat="identity"' + barcolor + bordercolor + position + ')' + ' + scale_x_continuous(breaks=breaks)' + xlab + ylab + facet + getString("plotoptions.code.calculate") + '\n');
	// Density
	if (getBoolean("density")) {
		echo('p <- p + geom_line(aes(x=' + variablename + ', y = ..density..), data=' + data + ', stat = "density")\n');
	}
	// Polygon
	if (getBoolean("polygon")) {
		if (getBoolean("cumulative")) {
			if (getBoolean("relative")) {
				echo('df <- data.frame(x=breaks, y=c(0,df[["Frec.Rel.Acum."]]))\n');
			}
			else {
				echo('df <- data.frame(x=breaks, y=c(0,df[["Frec.Abs.Acum."]]))\n');
			}
			echo('p <- p + geom_line(aes(x=x, y=y), data=df)\n');
		}
		else {
			echo('p <- p + geom_line()\n');
		}
	}
	echo('print(p)\n');
	echo('})\n');
	if (full) {
		echo('rk.graph.off ()\n');
	}
}


