// globals
var vars;

function preprocess () {
	echo('require(TeachingExtras)\n');
}

function calculate () {
	vars = getValue ("vars");
	// Código R
	vars = vars.split ('\n').join (', ');
	echo('result <- friedman.test(cbind(' + vars + '))\n');
}

function printout () {
	echo('rk.header("Test de Friedman para la comparaci&oacute;n de medidas repetidas", ');
	echo('parameters=list ("Comparaci&oacute;n de" = rk.get.description(' + vars + ', paste.sep=", ")))\n');
	echo('rk.results(list("Estad&iacute;stico Chi" = result[["statistic"]], "p-valor" = result[["p.value"]]))\n');
}


