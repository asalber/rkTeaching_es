// globals
var variable, factor, center;

function preprocess () {
	echo('require(car)\n');
}

function calculate () {
	variable = getString("variable");
	factor = getString("factor");
	center = getString("center");
	var options = ', center=' + center;
	echo('result <- leveneTest(' + variable + ', ' + factor + options + ')\n');
}

function printout () {
	echo ('rk.header ("Test de Levene para la comparaci&oacute;n de varianzas", ');
	echo ('parameters=list ("Comparaci&oacute;n de" = rk.get.description(' + variable + '), "Seg&uacute;n" = rk.get.description(' + factor + ')');
	if (center=="median") {
		echo (', "Variabilidad con respecto a la" = "Mediana"');
	}
	else {
		echo (', "Variabilidad con respecto a la" = "Media"');
	}
	echo('))\n');
	echo ('rk.results (list(');
	echo ('"Variable"= rk.get.short.name(' + variable + '), ');
	echo ('"Niveles del factor" = levels(' + factor + '), ');
	echo ('"Grados de libertad"=result[["Df"]], ');
	echo ('"Estad&iacute;stico F"=result[["F value"]][1], ');
	echo ('"p-valor"=result[["Pr(>F)"]][1]');
	echo ('))\n');
}


