// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, factor, category, freq1, n1, freq2, n2,  type, test, confint, conflevel, alternative;

function preprocess () {

}

function calculate () {
	var hypothesis = getValue ("hypothesis");
	if (hypothesis=="two.sided") alternative = "Bilateral";
	else if (hypothesis=="greater") alternative = "Unilateral mayor";
	else alternative = "Unilateral menor";
	var options = ', alternative="' + hypothesis + '"';
	confint = getValue ("confint.checked");
	conflevel = getValue ("conflevel");
	if (confint) {
		options += ', conf.level=' + conflevel;
	}
	
	type = getValue("type");
	if (type=="normal"){
		options += ', correct=FALSE)';
		test = "Aproximaci&oacute;n normal sin correcci&oacute;n por continuidad";
	}
	else {
		test = "Aproximaci&oacute;n normal con correcci&oacute;n por continuidad";
	}
	if (getValue("manual.checked")){
		freq1 = getValue("freq1");
		n1 = getValue("n1");
		freq2 = getValue("freq2");
		n2 = getValue("n2");
		echo('result <- prop.test(c(' + freq1 + ',' + freq2 + '),c(' + n1 + ',' + n2 + '), ' + options + ')\n');
	}
	else {
		x = getValue("variable");
		factor = getValue("factor");
		category = getValue("category");
		echo('.data <- split(' + x + ',' + factor +')\n');
		echo('.x1<-.data[[levels(' + factor + ')[1]]]\n');
		echo('.x2<-.data[[levels(' + factor + ')[2]]]\n');
		echo ('.freq1 <- length(.x1[.x1=="' + category + '"])\n');
		echo ('.n1 <- length(.x1)\n');
		echo ('.freq2 <- length(.x2[.x2=="' + category + '"])\n');
		echo ('.n2 <- length(.x2)\n');
		echo('result <- prop.test(c(.freq1,.freq2),c(.n1,.n2)' + options + ')\n');
	}	
}

function printout () {
	
	echo ('rk.header ("Test para la comparaci&oacute;n de dos proporciones", ');
	echo ('parameters=list (');
	if (getValue("manual.checked")){
		echo ('"Frecuencia de la primera muestra" = "' + freq1 + '", "Tama&ntilde;o de la primera muestra" = "' + n1 + '", "Frecuencia de la segunda muestra" = "' + freq2 + '", "Tama&ntilde;o de la segunda muestra" = "' + n2 + '"');
	} else {
		echo('"Comparaci&oacute;n de" = rk.get.description(' + x + '), "Seg&uacute;n" = rk.get.description(' + factor + '), "Proporci&oacute;n de" = "' + category + '"');
	}
			
	echo(', "Hip&oacute;tesis alternativa" = "' + alternative + '", "Tipo de prueba" = "' + test + '"');
	if (confint) {
		echo (', "Nivel de confianza del intervalo" = "' + conflevel + '"');
	}
	echo('))\n');
	if (!getValue("manual.checked")){
		echo('rk.print("<b>Frecuencias muestrales</b>")\n');
		echo('rk.print(ftable(xtabs(~' + x + '+' + factor + ')))\n');
	}
	//echo ('rk.print(result)\n');
	echo ('rk.results (list(');
	echo ('"Proporci&oacute;n estimada 1" = result$estimate[1], ');
	echo ('"Proporci&oacute;n estimada 2" = result$estimate[2], ');
	echo ('"Grados de libertad" = result$parameter, ');
	echo ('"Estad&iacute;stico Chi" = result$statistic, ');
	echo ('"p-valor" = result$p.value');
	if (confint) {
		echo (', "Nivel de confianza %" = (100 * attr(result$conf.int, "conf.level"))');
		echo (', "Intervalo de confianza para la diferencia de proporciones" = result$conf.int');
	}
	echo ('))\n');
}


