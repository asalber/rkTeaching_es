// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals

function preprocess () {
}

function printout () {
	doPrintout (true);
}

function preview () {
	doPrintout (false);
}

function doPrintout (full) {
	var x = getValue ("x");
	var response = getValue("response");
	var trace = getValue ("trace");
	var type = getValue("type");
	if (full) {
		echo ('rk.header ("Diagrama de interacci&oacute;n", list ("Variable respuesta" = rk.get.description (' + response + '), "Grupos del eje X seg&uacute;n" = rk.get.description(' + x + '), "Grupos de trazado seg&uacute;n" = rk.get.description(' + trace + ')))\n');
		echo ('\n');
		echo ('rk.graph.on ()\n');
	}
	echo ('try ({\n');
	echo ("\t", getValue ("plotoptions.code.preprocess"), '', '\n');

	echo ('\tinteraction.plot (response=' + response + ', x.factor=' + x + ', trace.factor='+ trace + ', trace.label="' + getValue("trace.shortname") + '", type="' + type + '", pch=c(15,16,17,18,19,20), col=rainbow(10)' + getValue ("plotoptions.code.printout") + ')\n');

	echo ("\t", getValue ("plotoptions.code.calculate"), '\n', '');
	echo ('})\n');

	if (full) {
		echo ('rk.graph.off ()\n');
	}
}

