// globals
var variable, factor, type, confint, conflevel, alternative;

function preprocess () {

}

function calculate () {
	variable = getValue ("variable");
	factor = getValue ("factor");
	type = getValue ("type");
	confint = getValue ("confint.checked");
	conflevel = getValue ("conflevel");
	var hypothesis = getValue ("hypothesis");

	var options = ', alternative="' + hypothesis + '"';
	if (type=="non_correction")
		options += ', correct=FALSE';
	if (type=="exact")
		options += ', exact=TRUE';
	if (confint) options += ', conf.int=TRUE, conf.level=' + conflevel;
	if (hypothesis=="two.sided") alternative = 'Bilateral';
	else if (hypothesis=="greater") alternative = 'Unilateral mayor';
	else alternative = 'Unilateral menor';
	// Código R
	echo('result <- wilcox.test(' + variable + ' ~ ' + factor + options + ')\n');
}

function printout () {
	echo ('rk.header ("Test U de Mann Whitney para la comparaci&oacute;n de dos muestras independientes", ');
	echo ('parameters=list ("Comparaci&oacute;n de" = rk.get.description(' + variable + '), "Seg&uacute;n" = rk.get.description(' + factor + '), "Hip&oacute;tesis alternativa" = "' + alternative + '",');
	echo ('"Tipo de prueba" =');
	if (type=="non_correction")
		echo ('"Aproximaci&oacute;n normal sin correci&oacute;n por continuidad"');
	else if (type=="exact")
		echo ('"Exacta"');
	else
		echo ('"Aproximaci&oacute;n normal con correci&oacute;n por continuidad"');
	if (confint) {
		echo (', "Nivel de confianza del intervalo" = "' + conflevel + '"');
	}
	echo('))\n');
	
	//echo ('rk.print(result)\n');
	echo ('rk.results (list(');
	echo ('"Variable" = rk.get.description(' + variable + '), ');
	echo ('"Niveles del factor" = levels(' + factor + '), ');
	echo ('"Estad&iacute;stico U" = result$statistic, ');
	echo ('"p-valor" = result$p.value');
	if (confint) {
		echo (', "Nivel de confianza %" = (100 * attr(result$conf.int, "conf.level"))');
		echo (', "Intervalo de confianza para la diferencia de medias" = result$conf.int');
	}
	echo ('))\n');
}


