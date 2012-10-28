// globals
var variable, factor, confint, conflevel, alternative;

function preprocess () {

}

function calculate () {
	variable = getValue ("variable");
	factor = getValue ("factor");
	confint = getValue ("confint_frame.checked");
	conflevel = getValue ("conflevel");
	var hypothesis = getValue ("hypothesis");
	var options = ", alternative=\"" + hypothesis + "\"";
	if (confint) options += ", conf.level=" + conflevel;
	if (hypothesis=="two.sided") alternative = "Bilateral";
	else if (hypothesis=="greater") alternative = "Unilateral mayor";
	else alternative = "Unilateral menor";
	echo('result <- var.test (' + variable + ' ~ ' + factor + options + ')\n');
}

function printout () {
	echo ('rk.header ("Test F de comparaci&oacute;n de varianzas para dos muestras independientes", ');
	echo ('parameters=list ("Comparaci&oacute;n de" = rk.get.description(' + variable + '), "Seg&uacute;n" = rk.get.description(' + factor + '), "Hip&oacute;tesis alternativa" = "' + alternative + '"');
	if (confint) {
		echo (', "Nivel de confianza del intervalo" = "' + conflevel + '"');
	}
	echo('))\n');
	
	//echo ('rk.print(result)\n');
	echo ('rk.results (list(');
	echo ('"Variable" = rk.get.description(' + variable + '), ');
	echo ('"Niveles del factor" = levels(' + factor + '), ');
	echo ('"Grados de libertad" = result$parameter, ');
	echo ('"Estad&iacute;stico F" = result$statistic, ');
	echo ('"p-valor" = result$p.value');
	if (confint) {
		echo (', "Nivel de confianza %" = (100 * attr(result$conf.int, "conf.level"))');
		echo (', "Intervalo de confianza para el cociente de varianzas" = result$conf.int');
	}
	echo ('))\n');
}


