// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var options;

function printout () {
	doPrintout (true);
}

function preview () {
	if (typeof (preprocess) != "undefined") preprocess ();
	if (typeof (calculate) != "undefined") calculate ();
	doPrintout (false);
}

// get the range parameters for the continuous distributions (it's all the same for these)
function getContRangeParameters () {
	options['n'] = 100;
	options['min'] = getValue ("min");
	options['max'] = getValue ("max");
}

// get the range parameters for the discontinuous distributions (it's all the same for these)
function getDiscontRangeParameters () {
	options['min'] = getValue ("min");
	options['max'] = getValue ("max");
	options['n'] = options['max'] - options['min'] + 1;
}

function doPrintout (full) {
	var fun = getValue ("function");
	var is_density = "";
	var label = "";
	if (fun == "d") {
		is_density = true;
		label = "densidad";
	} else {
		is_density = false;
		label = "distribuci&oacute;n";
	}

	options = new Array();
	options['is_density'] = is_density;
	options['label'] = label;

	getParameters ();

	if (full) {
		doHeader ();
		echo ('\n');
		echo ('rk.graph.on ()\n');
	}

	echo ('try ({\n');
	printIndentedUnlessEmpty ("\t", getValue ("plotoptions.code.preprocess"), '', '\n');

	echo ('	curve (');
	doFunCall ();
	echo (', from=' + options['min'] + ', to=' + options['max'] + ', n=' + options['n'] + getValue ("plotoptions.code.printout") + ')\n');

	printIndentedUnlessEmpty ("\t", getValue ("plotoptions.code.calculate"), '\n', '');
	echo ('})\n');
	if (full) {
		echo ('rk.graph.off ()\n');
	}
}