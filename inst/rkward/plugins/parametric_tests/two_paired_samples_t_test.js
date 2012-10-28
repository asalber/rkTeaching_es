// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, y, confint, conflevel, alternative;

function preprocess () {

}

function calculate () {
	x = getValue ("x");
	y = getValue ("y");
	confint = getValue ("confint_frame.checked");
	conflevel = getValue ("conflevel");
	var hypothesis = getValue ("hypothesis");
	var options = ', alternative="' + hypothesis + '", paired=TRUE';
	if (confint) {
		options += ", conf.level=" + conflevel;
	}
	if (hypothesis=="two.sided") alternative = "Bilateral";
	else if (hypothesis=="greater") alternative = "Unilateral mayor";
	else alternative = "Unilateral menor";
	
	echo('result <- t.test (' + x + ', ' + y + options + ')\n');
}

function printout () {
	echo ('rk.header ("Test T de comparaci&oacute;n de medias para dos muestras pareadas", ');
	echo ('parameters=list ("Comparaci&oacute;n de" = rk.get.description(' + x + '), "con" = rk.get.description(' + y + '), "Hip&oacute;tesis alternativa" = "' + alternative + '"');
	if (confint) {
		echo (', "Nivel de confianza del intervalo" = "' + conflevel + '"');
	}
	echo('))\n');
	
	//echo ('rk.print(result)\n');
	echo ('rk.results (list(');
	echo ('"Variables" = rk.get.description(' + x + ',' + y + '), ');
	echo ('"Diferencia media estimada" = result$estimate, ');
	echo ('"Grados de libertad" = result$parameter, ');
	echo ('"Estad&iacute;stico t" = result$statistic, ');
	echo ('"p-valor" = result$p.value');
	if (confint) {
		echo (', "Nivel de confianza %" = (100 * attr(result$conf.int, "conf.level"))');
		echo (', "Intervalo de confianza para la media de la diferencia" = result$conf.int');
	}
	echo ('))\n');
}


