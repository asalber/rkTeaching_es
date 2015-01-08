// globals
var data, variable, factor, factorname, population1, population2, confint, conflevel, hypothesis;

function preprocess () {

}

function calculate () {
	// Filter
	echo(getString("filter_embed.code.calculate"));
	// Load variables
	variable = getString("variable");
	factor = getString("factor");
	population1 = getString("population1");
	population2 = getString("population2");
//	defsamples = getBoolean("samples_frame.checked");
//	if (defsamples){
//		sample1 = getString("sample1");
//		sample2 = getString("sample2");
//		data = factor.split('[[')[0];
//		factorname = getString("factor.shortname");
//		echo (data + ' <- subset(' + data + ', subset=' + factorname + '=="' + sample1 + '" | ' + factorname + '=="' + sample2 + '")\n');
//		echo (factor + ' <- factor(' + factor + ')\n');
//	}
	confint = getBoolean("confint_frame.checked");
	conflevel = getString("conflevel");
	hypothesis = getString("hypothesis");
	var options = ", alternative=\"" + hypothesis + "\"";
	if (confint) options += ", conf.level=" + conflevel;
	echo('resultvar <- var.test (' + variable + '[' + factor + '==' + population1 + '], ' +  variable + '[' + factor + '==' + population2 + '], conf.level=0.95)\n');
	echo('resultnovareq <- t.test (' + variable + '[' + factor + '==' + population1 + '], ' +  variable + '[' + factor + '==' + population2 + ']' + options + ', var.equal=FALSE)\n');
	echo('resultvareq <- t.test (' + variable + '[' + factor + '==' + population1 + '], ' +  variable + '[' + factor + '==' + population2 + ']' + options + ', var.equal=TRUE)\n');
}

function printout () {
	// F test for comparison of variances
	echo('rk.header ("Test F de comparaci&oacute;n de varianzas de ' + getString("variable.shortname") + ' seg&uacute;n ' + getString("factor.shortname") + '", ');
	echo('parameters=list ("Comparaci&oacute;n de" = rk.get.description(' + variable + '), "Seg&uacute;n" = rk.get.description(' + factor + ')' + getString("filter_embed.code.printout") + ', "Hip&oacute;tesis nula" = paste("varianza", ' + population1 +', " = varianza ", ' + population2 + ')');
	echo(', "Hip&oacute;tesis alternativa" = paste("varianza", ' + population1 +', " &ne; varianza ", ' + population2 + ')');
	echo('))\n');
	echo('rk.results (list(');
	echo('"Variable" = rk.get.short.name(' + variable + '), ');
	echo('"Poblaciones" = c(' + population1 + ', ' + population2 + '), ');
	echo('"Grados de libertad" = resultvar$parameter, ');
	echo('"Estad&iacute;stico F" = resultvar$statistic, ');
	echo('"p-valor" = resultvar$p.value');
	echo (', "Nivel de confianza %" = (100 * attr(resultvar$conf.int, "conf.level"))');
	echo (', "Intervalo de confianza para el cociente de varianzas" = resultvar$conf.int');
	echo ('))\n');
	// T test for comparison of means 
	echo ('rk.header ("Test T de comparaci&oacute;n de medias de ' + getString("variable.shortname") + ' seg&uacute;n ' + getString("factor.shortname") + '", ');
	echo ('parameters=list ("Comparaci&oacute;n de" = rk.get.description(' + variable + '), "Seg&uacute;n" = rk.get.description(' + factor + ')' + getString("filter_embed.code.printout") + ', "Hip&oacute;tesis nula" = paste("media", ' + population1 +', " = media ", ' + population2 + ')');
	if (hypothesis=="two.sided"){
		echo(', "Hip&oacute;tesis alternativa" = paste("media", ' + population1 +', " &ne; media ", ' + population2 + ')');
	}
	else if (hypothesis=="greater") {
		echo(', "Hip&oacute;tesis alternativa" = paste("media", ' + population1 +', " &gt; media ", ' + population2 + ')');
	}
    else {
    	echo(', "Hip&oacute;tesis alternativa" = paste("media", ' + population1 +', " &lt; media ", ' + population2 + ')');
    }
	if (confint) {
		echo (', "Nivel de confianza del intervalo" = "' + conflevel + '"');
	}
	echo('))\n');
	//  Non equal variances
	echo('rk.header ("Suponiendo varianzas diferentes",level=4)\n');
	echo('rk.results (list(');
	echo('"Variable" = rk.get.short.name(' + variable + '), ');
	echo('"Poblaciones" = c(' + population1 + ', ' + population2 + '), ');
	echo('"Medias estimadas" = resultnovareq$estimate, ');
	echo('"Grados de libertad" = resultnovareq$parameter, ');
	echo('"Estad&iacute;stico t" = resultnovareq$statistic, ');
	echo('"p-valor" = resultnovareq$p.value');
	if (confint) {
		echo(', "Nivel de confianza %" = (100 * attr(resultnovareq$conf.int, "conf.level"))');
		echo(', "Intervalo de confianza para la diferencia de medias" = resultnovareq$conf.int');
	}
	echo('))\n');
	//  Equal variances
	echo('rk.header ("Suponiendo varianzas iguales",level=4)\n');
	echo('rk.results (list(');
	echo('"Variable" = rk.get.short.name(' + variable + '), ');
	echo('"Poblaciones" = c(' + population1 + ', ' + population2 + '), ');
	echo('"Medias estimadas" = resultvareq$estimate, ');
	echo('"Grados de libertad" = resultvareq$parameter, ');
	echo('"Estad&iacute;stico t" = resultvareq$statistic, ');
	echo('"p-valor" = resultvareq$p.value');
	if (confint) {
		echo(', "Nivel de confianza %" = (100 * attr(resultvareq$conf.int, "conf.level"))');
		echo(', "Intervalo de confianza para la diferencia de medias" = resultvareq$conf.int');
	}
	echo('))\n');
}


