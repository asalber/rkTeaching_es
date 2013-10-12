// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var min, max, density, label, ylabel, n;

function preprocess(){
	echo('require(ggplot2)\n');
}

function printout () {
	doPrintout (true);
}

function preview () {
	if (typeof (preprocess) != "undefined") preprocess ();
	if (typeof (calculate) != "undefined") calculate ();
	doPrintout (false);
}

// Continous distributions
function setContParameters() {
	if (getString("function") == "d") {
		density = true;
		label = "densidad";
		ylabel = "densidad de probabilidad";
	} else {
		density = false;
		label = "distribuci&oacute;n";
		ylabel = "probabilidad acumulada";
	}
	if (getBoolean("range.checked")){
		min = getString("min");
		max = getString("max"); 
	}
}

// Discrete distributions
function setDistParameters() {
	if (getString("function") == "d") {
		density = true;
		label = "probabilidad";
		ylabel = "probabilidad";
	} else {
		density = false;
		label = "distribuci&oacute;n";
		ylabel = "probabilidad acumulada";
	}
}

function doPrintout (full) {
	getParameters ();

	if (full) {
		doHeader ();
		echo ('\n');
		echo ('rk.graph.on ()\n');
	}

	echo ('try ({\n');
	printIndentedUnlessEmpty ("\t", getString("plotoptions.code.preprocess"), '', '\n');
	doFunCall ();
	echo(' + xlab("x") + ylab("' + ylabel + '")' + getString("plotoptions.code.calculate") + '\n');
	echo('print(p)\n');
	echo ('})\n');
	if (full) {
		echo ('rk.graph.off ()\n');
	}
}