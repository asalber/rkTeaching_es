// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals

function preprocess () {
	echo('require(gplots)\n');
}

function printout () {
	doPrintout (true);
}

function preview () {
	doPrintout (false);
}

function doPrintout (full) {
	var x = getValue ("x");
	var groups = getValue ("groups");
	var bars = '';
	if (getValue("confinf_frame.checked")){
		bars = ', bars=TRUE, p=' + getValue("conflevel");
	};

	if (full) {
		echo ('rk.header ("Diagrama de medias", list ("Variable" = rk.get.description (' + x + '), "Grupos" = rk.get.description(' + groups.split("\n") + ', paste.sep=", ")))\n');
		echo ('\n');
		echo ('rk.graph.on ()\n');
	}
	echo ('try ({\n');
	echo ("\t", getValue ("plotoptions.code.preprocess"), '', '\n');

	echo ('\tplotmeans (' + x + ' ~ ' + groups  + bars + ", n.label=FALSE" + getValue ("plotoptions.code.printout") + ')\n');

	echo ("\t", getValue ("plotoptions.code.calculate"), '\n', '');
	echo ('})\n');

	if (full) {
		echo ('rk.graph.off ()\n');
	}
}

