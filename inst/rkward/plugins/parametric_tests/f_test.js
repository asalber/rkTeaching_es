// globals
var data, variable, factor, factorname, defsamples, sample1, sample2, confint, conflevel, hypothesis;

function preprocess () {

}

function calculate () {
	// Filter
	echo(getString("filter_embed.code.calculate"));
	// Load variables
	variable = getString("variable");
	factor = getString("factor");
	defsamples = getBoolean("samples_frame.checked");
	if (defsamples){
		sample1 = getString("sample1");
		sample2 = getString("sample2");
		data = factor.split('[[')[0];
		factorname = getString("factor.shortname");
		echo (data + ' <- subset(' + data + ', subset=' + factorname + '=="' + sample1 + '" | ' + factorname + '=="' + sample2 + '")\n');
		echo (factor + ' <- factor(' + factor + ')\n');
	}
	confint = getBoolean("confint_frame.checked");
	conflevel = getString("conflevel");
	hypothesis = getString("hypothesis");
	var options = ", alternative=\"" + hypothesis + "\"";
	if (confint) options += ", conf.level=" + conflevel;
	echo('result <- var.test (' + variable + ' ~ ' + factor + options + ')\n');
}

function printout () {
	echo ('rk.header ("Test F de comparaci&oacute;n de varianzas de ' + getString("variable.shortname") + ' seg&uacute;n ' + getString("factor.shortname") + '", ');
	echo ('parameters=list ("Comparaci&oacute;n de" = rk.get.description(' + variable + '), "Seg&uacute;n" = rk.get.description(' + factor + ')' + getString("filter_embed.code.printout") + ', "Hip&oacute;tesis nula" = paste("varianza", levels(' + factor + ')[1], " = varianza ", levels(' + factor + ')[2])');
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


