// globals
var variable, factor, confint, conflevel, hypothesis;

function preprocess () {

}

function calculate () {
	variable = getString("variable");
	factor = getString("factor");
	confint = getBoolean("confint_frame.checked");
	conflevel = getString("conflevel");
	hypothesis = getString("hypothesis");
	var options = ", alternative=\"" + hypothesis + "\"";
	if (confint) options += ", conf.level=" + conflevel;
	echo('result <- var.test (' + variable + ' ~ ' + factor + options + ')\n');
}

function printout () {
	echo ('rk.header ("Test F de comparaci&oacute;n de varianzas para dos poblaciones independientes", ');
	echo ('parameters=list ("Comparaci&oacute;n de" = rk.get.description(' + variable + '), "Seg&uacute;n" = rk.get.description(' + factor + '), "Hip&oacute;tesis nula" = paste("varianza", levels(' + factor + ')[1], " = varianza ", levels(' + factor + ')[2])');
	if (hypothesis=="two.sided"){
		echo(', "Hip&oacute;tesis alternativa" = paste("varianza", levels(' + factor + ')[1], " &ne; varianza ", levels(' + factor + ')[2])');
	}
	else if (hypothesis=="greater") {
		echo(', "Hip&oacute;tesis alternativa" = paste("varianza", levels(' + factor + ')[1], " &gt; varianza ", levels(' + factor + ')[2])');
	}
    else {
    	echo(', "Hip&oacute;tesis alternativa" = paste("varianza", levels(' + factor + ')[1], " &lt; varianza ", levels(' + factor + ')[2])');
    }	if (confint) {
		echo (', "Nivel de confianza del intervalo" = "' + conflevel + '"');
	}
	echo('))\n');
	echo ('rk.results (list(');
	echo ('"Variable" = rk.get.short.name(' + variable + '), ');
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


