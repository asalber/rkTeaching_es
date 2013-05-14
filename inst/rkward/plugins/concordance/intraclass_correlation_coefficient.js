// globals
var x, y;

function preprocess () {
	echo('require(psych)\n');
}

function calculate () {
	x= getValue ("x");
	var data = x.split('[[')[0];
	x = getValue("x.shortname");
	y = getValue("y.shortname");

	// Código R
	echo('results <- ICC(as.matrix(na.omit(' + data + '[,c("' + x + '","' + y + '")])))\n');
}

function printout () {
	echo ('rk.header ("Test de correlaci&oacute;n intraclase", ');
	echo ('parameters=list ("Primera medida" = rk.get.description(' + getValue("x") + '), "Segunda medida" = rk.get.description(' + getValue("y") + ')))\n');
	echo ('rk.results (list(');
	echo ('"Tipo" = results$results$type')
	echo (', "ICC" = results$results$ICC');
	echo (', "Estad&iacute;stico F" = results$results$F');
	echo (', "p-valor" = results$results$p');
	echo ('))\n');
}

 
