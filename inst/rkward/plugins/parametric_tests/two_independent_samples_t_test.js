// globals
var variable, factor, varequal, confint, conflevel, alternative;

function preprocess () {

}

function calculate () {
	variable = getValue ("variable");
	factor = getValue ("factor");
	varequal = getValue ("varequal");
	confint = getValue ("confint.checked");
	conflevel = getValue ("conflevel");
	var hypothesis = getValue ("hypothesis");

	var options = ", alternative=\"" + hypothesis + "\"";
	if (varequal) options += ", var.equal=TRUE";
	if (confint) options += ", conf.level=" + conflevel;
	
	if (hypothesis=="two.sided") alternative = "Bilateral";
	else if (hypothesis=="greater") alternative = "Unilateral mayor";
	else alternative = "Unilateral menor";

	echo('result <- t.test (' + variable + ' ~ ' + factor + options + ')\n');
}

function printout () {
	echo ('rk.header ("Test T de comparaci&oacute;n de medias para dos muestras independientes", ');
	echo ('parameters=list ("Comparaci&oacute;n de" = rk.get.description(' + variable + '), "Seg&uacute;n" = rk.get.description(' + factor + '), "Hip&oacute;tesis alternativa" = "' + alternative + '",');
	echo ('"Se han supuesto varianzas iguales" =');
	if (!varequal) echo ('"No"');
	else echo ('"Si"');
	if (confint) {
		echo (', "Nivel de confianza del intervalo" = "' + conflevel + '"');
	}
	echo('))\n');
	
	//echo ('rk.print(result)\n');
	echo ('rk.results (list(');
	echo ('"Variable" = rk.get.description(' + variable + '), ');
	echo ('"Niveles del factor" = levels(' + factor + '), ');
	echo ('"Medias estimadas" = result$estimate, ');
	echo ('"Grados de libertad" = result$parameter, ');
	echo ('"Estad&iacute;stico t" = result$statistic, ');
	echo ('"p-valor" = result$p.value');
	if (confint) {
		echo (', "Nivel de confianza %" = (100 * attr(result$conf.int, "conf.level"))');
		echo (', "Intervalo de confianza para la diferencia de medias" = result$conf.int');
	}
	echo ('))\n');
}


