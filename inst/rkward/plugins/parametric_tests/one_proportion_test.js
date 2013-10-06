// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, freq, n, category, p, type, test, confint, conflevel, hypothesis;

function preprocess () {

}

function calculate () {
	if (getBoolean("manual.checked")){
		freq = getString("freq");
		n = getString("n");
		echo ('freq <- ' + freq + '\n');
		echo ('n <- ' + n + '\n');
		category='';
	}
	else {
		// Filter
		echo(getString("filter_embed.code.calculate"));
		// Load variables
		x = getString("variable");
		category = getString("category");
		echo ('freq <- length(' + x + '[' + x + '=="' + category + '"])\n');
		echo ('n  <- length(' + x + ')\n');
	}	
	p = getString("proportion");
	confint = getBoolean("confint_frame.checked");
	conflevel = getString("conflevel");
	hypothesis = getString("hypothesis");
	var options = ', alternative="' + hypothesis + '", p=' + p ;
	if (confint) {
		options += ", conf.level=" + conflevel;
	}
	type = getString("type");
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
	echo ('rk.header ("Test para ');
	if (getBoolean("manual.checked")){
		echo ('una proporci&oacute;n", parameters=list ("Frecuencia muestral" = freq, "Tama&ntilde;o muestral" = n');
	}
	else{
		echo ('la proporci&oacute;n de ' + getString("variable.shortname") + '=' + category + '", parameters=list ("Variable" = rk.get.description(' + x + '), "Proporci&oacute;n de" = "' + category + '"' + getString("filter_embed.code.printout") + ', "Frecuencia muestral" = freq, "Tama&ntilde;o muestral" = n');		
	}
	echo(', "Hip&oacute;tesis nula" = "proporci&oacute;n ' + category + ' = ' + p + '"');
	if (hypothesis=="two.sided"){
		echo(', "Hip&oacute;tesis alternativa" = "proporci&oacute;n ' + category + ' &ne; ' + p + '"');
	}
	else if (hypothesis=="greater") {
		echo(', "Hip&oacute;tesis alternativa" = "proporci&oacute;n ' + category + ' &gt; ' + p + '"');
	}
    else {
    	echo(', "Hip&oacute;tesis alternativa" = "proporci&oacute;n ' + category + ' &lt; ' + p + '"');
    }
	echo(', "Tipo de prueba" = "' + test + '"');
	if (confint) {
		echo (', "Nivel de confianza del intervalo" = "' + conflevel + '"');
	}
	echo('))\n');
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


