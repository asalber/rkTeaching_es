// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals

function printout () {
	doPrintout (true);
}

function preview () {
	doPrintout (false);
}

function doPrintout (full) {
	var opts = "";
	var params = "";
	var x = getValue ("x");
	var groups = getValue ("groups");
	var method = '"' + getValue ("method") + '"';
	if (method == "\"jitter\"") {
		opts += ", jitter = " + getValue ("jitter");
		params += ", \"Jitter\" = " + getValue ("jitter");
	} else if (method == "\"stack\"") {
		opts += ", offset = " + getValue ("offset");
		params += ", \"Offset\" = " + getValue ("offset");
	}
	var orientation = getValue ("orientation");
	if (orientation == "Vertical") opts += ", vertical = TRUE";

	if (full) {
		echo ('rk.header ("Diagrama de puntos", list ("Variable" = rk.get.description (' + x + '), "Grupos" = rk.get.description (' + groups + ')))\n');
		echo ('\n');
		echo ('rk.graph.on ()\n');
	}
	echo ('try ({\n');
	echo ("\t", getValue ("plotoptions.code.preprocess"), '', '\n');

	echo ('\tstripchart (' + x + ' ~ (' + groups + '), method = ' + method + opts + getValue ("plotoptions.code.printout") + ')\n');

	echo ("\t", getValue ("plotoptions.code.calculate"), '\n', '');
	echo ('})\n');

	if (full) {
		echo ('rk.graph.off ()\n');
	}
}

