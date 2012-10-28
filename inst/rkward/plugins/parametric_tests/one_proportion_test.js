// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, freq, n, category, p, type, test, confint, conflevel, alternative;

function preprocess () {

}

function calculate () {
	if (getValue("manual.checked")){
		freq = getValue("freq");
		n = getValue("n");
		echo ('freq <- ' + freq + '\n');
		echo ('n <- ' + n + '\n');
	}
	else {
		x = getValue("variable");
		category = getValue("category");
		echo ('freq <- length(' + x + '[' + x + '=="' + category + '"])\n');
		echo ('n  <- length(' + x + ')\n');
	}	
	p = getValue ("proportion");
	confint = getValue ("confint.checked");
	conflevel = getValue ("conflevel");
	var hypothesis = getValue ("hypothesis");
	var options = ', alternative="' + hypothesis + '", p=' + p ;
	if (confint) {
		options += ", conf.level=" + conflevel;
	}
	if (hypothesis=="two.sided") alternative = "Bilateral";
	else if (hypothesis=="greater") alternative = "Unilateral mayor";
	else alternative = "Unilateral menor";
	type = getValue("type");
	if (type=="binomial"){
		echo('result <- binom.test (freq, n'+ options + ')\n');
		test = "Binomial exacto"
	}
	else if (type=="normal_correction"){
		echo('result <- prop.test (freq, n'+ options + ')\n');
		test = "Aproximaci&oacute;n normal con correcci&oacute;n por continuidad"
	}
	else {
		echo('result <- prop.test (freq, n'+ options + ', correct=FALSE)\n');
		test = "Aproximaci&oacute;n normal sin correcci&oacute;n por continuidad"
	}
}

function printout () {
	
	echo ('rk.header ("Test para una proporci&oacute;n", ');
	echo ('parameters=list ("Frecuencia muestral" = freq, "Tama&ntilde;o muestral" = n, "Hip&oacute;tesis nula" = "proporci&oacute;n poblacional = ' + p + '", "Hip&oacute;tesis alternativa" = "' + alternative + '", "Tipo de prueba" = "' + test + '"');
	if (confint) {
		echo (', "Nivel de confianza del intervalo" = "' + conflevel + '"');
	}
	echo('))\n');
	
	//echo ('rk.print(result)\n');
	echo ('rk.results (list(');
	echo ('"Proporci&oacute;n estimada " = freq/n, ');
	if (type!="binomial"){
		echo ('"Grados de libertad" = result$parameter, ');
		echo ('"Estad&iacute;stico Chi" = result$statistic, ');
	}
	echo ('"p-valor" = result$p.value');
	if (confint) {
		echo (', "Nivel de confianza %" = (100 * attr(result$conf.int, "conf.level"))');
		echo (', "Intervalo de confianza para la proporci&oacute;n" = result$conf.int');
	}
	echo ('))\n');
}


