// globals
var variable, factor, varequal, confint, conflevel, hypothesis;

function preprocess () {

}

function calculate () {
	// Filter
	echo(getString("filter_embed.code.calculate"));
	// Load variables
	variable = getString("variable");
	factor = getString("factor");
	varequal = getBoolean("varequal");
	confint = getBoolean("confint_frame.checked");
	conflevel = getString("conflevel");
	hypothesis = getString("hypothesis");
	var options = ", alternative=\"" + hypothesis + "\"";
	if (varequal) options += ", var.equal=TRUE";
	if (confint) options += ", conf.level=" + conflevel;
	echo('result <- t.test (' + variable + ' ~ ' + factor + options + ')\n');
}

function printout () {
	echo ('rk.header ("Test T de comparaci&oacute;n de medias de ' + getString("variable.shortname") + ' seg&uacute;n ' + getString("factor.shortname") + '", ');
	echo ('parameters=list ("Comparaci&oacute;n de" = rk.get.description(' + variable + '), "Seg&uacute;n" = rk.get.description(' + factor + ')' + getString("filter_embed.code.printout") + ', "Hip&oacute;tesis nula" = paste("media", levels(' + factor + ')[1], " = media ", levels(' + factor + ')[2])');
	if (hypothesis=="two.sided"){
		echo(', "Hip&oacute;tesis alternativa" = paste("media", levels(' + factor + ')[1], " &ne; media ", levels(' + factor + ')[2])');
	}
	else if (hypothesis=="greater") {
		echo(', "Hip&oacute;tesis alternativa" = paste("media", levels(' + factor + ')[1], " &gt; media ", levels(' + factor + ')[2])');
	}
    else {
    	echo(', "Hip&oacute;tesis alternativa" = paste("media", levels(' + factor + ')[1], " &lt; media ", levels(' + factor + ')[2])');
    }
	if (!varequal){
		echo (', "Se han supuesto varianzas iguales" = "No"');
	}
	else {
		echo (', "Se han supuesto varianzas iguales" = "Si"');
	}
	if (confint) {
		echo (', "Nivel de confianza del intervalo" = "' + conflevel + '"');
	}
	echo('))\n');
	echo ('rk.results (list(');
	echo ('"Variable" = rk.get.short.name(' + variable + '), ');
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


