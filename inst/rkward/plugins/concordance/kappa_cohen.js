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
	echo('table <- xtabs(~' + x + '+' + y + ', data=' + data + ')\n');
	echo('results <- cohen.kappa(table)\n');
}

function printout () {
	echo ('rk.header ("Test de concordancia Kappa de Cohen", ');
	echo ('parameters=list ("Primera medida" = rk.get.description(' + getValue("x") + '), "Segunda medida" = rk.get.description(' + getValue("y") + ')))\n');
	echo ('rk.results (list(');
	echo ('"Kappa" = results$kappa');
	echo (', "Kappa ponderado" = results$weighted.kappa');
	echo ('))\n');
}

 
