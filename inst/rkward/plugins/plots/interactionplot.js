// author: Alfredo Sánchez Alberca (asalber@ceu.es)
var variable, x, trace, data, variablename, xname, tracename, points, lines;

function preprocess () {
	echo('require(ggplot2)\n');
}

function calculate() {
	variable = getString("variable");
	x = getString("x");
	trace = getString("trace");
	data = variable.split('[[')[0];
	variablename = getString("variable.shortname");
	xname = getString("x.shortname");
	tracename = getString("trace.shortname");
	points = ' + geom_point(stat="summary", fun=mean)';
	lines = '';
	if (getBoolean("lines")) {
		lines = ' + geom_line(stat="summary", fun=mean, aes(group=' + tracename + '))';
	}
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
	if (full) {
		echo ('rk.header ("Diagrama de interacci&oacute;n de ' + xname + ' y ' + tracename + ' sobre ' + variablename + '", list ("Variable respuesta" = rk.get.description (' + variable + '), "Grupos del eje X seg&uacute;n" = rk.get.description(' + x + '), "Grupos de trazado seg&uacute;n" = rk.get.description(' + trace + ')))\n');
		echo ('\n');
		echo ('rk.graph.on ()\n');
	}
	echo ('try ({\n');
	echo('p<-ggplot(data=' + data + ', aes(x=' + xname + ', y=' + variablename + ', colour=' + tracename + '))' + points + lines + getString("plotoptions.code.calculate") + '\n');
	echo('print(p)\n');	
	echo ('})\n');

	if (full) {
		echo ('rk.graph.off ()\n');
	}
}

