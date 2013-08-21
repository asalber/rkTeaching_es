//author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var variable, variablename, groups, groupsname, border, fill, position, xlab, ylab, barcolor; 

function preprocess() {
	echo('require(ggplot2)\n');
}

function calculate() {
	variable = getString("variable");
	variablename = getString("variable.shortname");
	xlab = ', xlab="' + variablename + '"';
	ylab = ', ylab = "Frecuencia absoluta"';
	fill = '';
	barcolor = getString("barfillcolor.code.printout")
	if (barcolor!='') {
		barcolor = ', fill=I(' + barcolor + ')';
	}
	else {
		barcolor = ', fill=I("#FF9999")';
	}
    
	bordercolor = getString("barbordercolor.code.printout");
	if (bordercolor != '') {
		bordercolor = ', colour=I(' + bordercolor + ')';
	}
	position = '';
	if (getBoolean("grouped")) {
		groups = getString("groups");
		groupsname = getString("groups.shortname");
		fill = ', fill=' + groupsname;
		position = ', position="' + getString("position") + '"';
		barcolor = '';
		bordercolor = '';
	}
    // Filter
	echo(getString("filter_embed.code.calculate"));
	// Previous settings
	if (getBoolean("grouped")) {
		echo('df <- as.data.frame(table(' + variable + ', ' + groups + '))\n');
		echo('names(df)[2] <- "' +  groupsname + '"\n');
	} else {
		echo('df <- as.data.frame(table(' + variable + '))\n');
	}
	if (getBoolean("relative")) {
		echo('df[["Freq"]] <- df[["Freq"]]/sum(df[["Freq"]])\n');
		ylab = ', ylab="Frecuencia relativa"';
	}
	if (getBoolean("cumulative")) {
		echo('df[["Freq"]] <- cumsum(df[["Freq"]])\n');
		ylab = ', ylab="Frecuencia acumulada"';
		if (getBoolean("relative")){
			ylab = ', ylab="Frecuencia relativa acumulada"';
		}
	}
	echo('names(df)[1] <- "' +  variablename + '"\n');
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
		echo ('rk.header ("Diagrama de barras", list ("Variable" = rk.get.description(' + variable + ')');
		if (getBoolean("grouped")) {
			echo(', "Variable de agrupaci&oacute;n" = rk.get.description(' + groups + ')');
		}
		echo('))\n');
		echo ('rk.graph.on ()\n');
	}
	// Plot
	echo('try ({\n');
	echo('p<-qplot(' +  variablename + ', Freq, data=df, geom="bar", stat="identity"' + fill + barcolor + bordercolor + position + xlab + ylab + getString("plotoptions.code.printout") + ')' + getString("plotoptions.code.calculate") + '\n');
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
		echo ('rk.graph.off ()\n');
	}
}

