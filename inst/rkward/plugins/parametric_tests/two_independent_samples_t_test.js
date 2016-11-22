// globals
var data, variable, variablename, factor, factorname, population1, population2, groups, groupsname, confint, conflevel, hypothesis;

function preprocess () {
  echo('require(rk.Teaching)\n');
}

function calculate () {
	// Filter
	echo(getString("filter_embed.code.calculate"));
	// Load variables
	variable = getString("variable");
	variablename = getString("variable.shortname");
	factor = getString("factor");
	data = variable.split('[[')[0];
	population1 = getString("population1");
	population2 = getString("population2");
	confint = getBoolean("confint_frame.checked");
	conflevel = getString("conflevel");
	hypothesis = getString("hypothesis");
	var options = ", alternative=\"" + hypothesis + "\"";
	if (confint) options += ", conf.level=" + conflevel;
	// Grouped mode
	if (getBoolean("grouped")) {
		groups = getList("groups");
		groupsname = getList("groups.shortname");
		echo(data + ' <- transform(' + data + ', .groups=interaction(' + data + '[,c(' + groupsname.map(quote) + ')]))\n');
		echo('resultvar <- dlply(' + data + ', ".groups", function(df) var.test(df[["' + variablename + '"]][' + factor + '==' + population1 + '],  df[["' + variablename + '"]][' + factor + '==' + population2 + '], conf.level=0.95))\n');
		echo('resultnovareq <- dlply(' + data + ', ".groups", function(df) t.test(df[["' + variablename + '"]][' + factor + '==' + population1 + '],  df[["' + variablename + '"]][' + factor + '==' + population2 + ']' + options + ', var.equal=FALSE))\n');
		echo('resultvareq <- dlply(' + data + ', ".groups", function(df) t.test(df[["' + variablename + '"]][' + factor + '==' + population1 + '],  df[["' + variablename + '"]][' + factor + '==' + population2 + ']' + options + ', var.equal=TRUE))\n');
	} else {
  // Non-grouped mode
	  echo('resultvar <- var.test (' + variable + '[' + factor + '==' + population1 + '], ' +  variable + '[' + factor + '==' + population2 + '], conf.level=0.95)\n');
	  echo('resultnovareq <- t.test (' + variable + '[' + factor + '==' + population1 + '], ' +  variable + '[' + factor + '==' + population2 + ']' + options + ', var.equal=FALSE)\n');
	  echo('resultvareq <- t.test (' + variable + '[' + factor + '==' + population1 + '], ' +  variable + '[' + factor + '==' + population2 + ']' + options + ', var.equal=TRUE)\n');
	}
}

function printout () {
	// F test for comparison of variances
	echo('rk.header ("Test F de comparaci&oacute;n de varianzas de ' + getString("variable.shortname") + ' seg&uacute;n ' + getString("factor.shortname") + '", ');
	echo('parameters=list ("Comparaci&oacute;n de" = rk.get.description(' + variable + '), "Seg&uacute;n" = rk.get.description(' + factor + ')' + getString("filter_embed.code.printout") + ', "Hip&oacute;tesis nula" = paste("varianza", ' + population1 +', " = varianza ", ' + population2 + ')');
	echo(', "Hip&oacute;tesis alternativa" = paste("varianza", ' + population1 +', " &ne; varianza ", ' + population2 + ')');
	echo('))\n');
	// Grouped mode
	if (getBoolean("grouped")){
		echo('for (i in 1:length(resultvar)){\n');
		echo('\t rk.header(paste("Grupo ' + groupsname.join('.') + ' = ", names(resultvar)[i]),level=3)\n');
    echo('rk.results (list(');
	  echo('"Variable" = rk.get.short.name(' + variable + '), ');
	  echo('"Poblaciones" = c(' + population1 + ', ' + population2 + '), ');
	  echo('"Grados de libertad" = resultvar[[i]]$parameter, ');
	  echo('"Estad&iacute;stico F" = resultvar[[i]]$statistic, ');
	  echo('"p-valor" = resultvar[[i]]$p.value');
	  echo (', "Nivel de confianza %" = (100 * attr(resultvar[[i]]$conf.int, "conf.level"))');
	  echo (', "Intervalo de confianza para el cociente de varianzas" = resultvar[[i]]$conf.int');
	  echo ('))\n');
	  echo('}\n');
	} else {
	  // Non-grouped mode
  	echo('rk.results (list(');
	  echo('"Variable" = rk.get.short.name(' + variable + '), ');
  	echo('"Poblaciones" = c(' + population1 + ', ' + population2 + '), ');
	  echo('"Grados de libertad" = resultvar$parameter, ');
  	echo('"Estad&iacute;stico F" = resultvar$statistic, ');
	  echo('"p-valor" = resultvar$p.value');
  	echo (', "Nivel de confianza %" = (100 * attr(resultvar$conf.int, "conf.level"))');
	  echo (', "Intervalo de confianza para el cociente de varianzas" = resultvar$conf.int');
	  echo ('))\n');
	}
	
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
	// Grouped mode
	if (getBoolean("grouped")){
		echo('for (i in 1:length(resultnovareq)){\n');
		echo('\t rk.header(paste("Grupo ' + groupsname.join('.') + ' = ", names(resultnovareq)[i]),level=3)\n');
    //  Non equal variances
	  echo('rk.header ("Suponiendo varianzas diferentes",level=4)\n');
	  echo('rk.results (list(');
	  echo('"Variable" = rk.get.short.name(' + variable + '), ');
	  echo('"Poblaciones" = c(' + population1 + ', ' + population2 + '), ');
	  echo('"Medias estimadas" = resultnovareq[[i]]$estimate, ');
	  echo('"Grados de libertad" = resultnovareq[[i]]$parameter, ');
	  echo('"Estad&iacute;stico t" = resultnovareq[[i]]$statistic, ');
	  echo('"p-valor" = resultnovareq[[i]]$p.value');
	  if (confint) {
		  echo(', "Nivel de confianza %" = (100 * attr(resultnovareq[[i]]$conf.int, "conf.level"))');
		  echo(', "Intervalo de confianza para la diferencia de medias" = resultnovareq[[i]]$conf.int');
	  }
  	echo('))\n');
	  //  Equal variances
	  echo('rk.header ("Suponiendo varianzas iguales",level=4)\n');
	  echo('rk.results (list(');
	  echo('"Variable" = rk.get.short.name(' + variable + '), ');
	  echo('"Poblaciones" = c(' + population1 + ', ' + population2 + '), ');
	  echo('"Medias estimadas" = resultvareq[[i]]$estimate, ');
	  echo('"Grados de libertad" = resultvareq[[i]]$parameter, ');
	  echo('"Estad&iacute;stico t" = resultvareq[[i]]$statistic, ');
	  echo('"p-valor" = resultvareq[[i]]$p.value');
	  if (confint) {
		  echo(', "Nivel de confianza %" = (100 * attr(resultvareq[[i]]$conf.int, "conf.level"))');
		  echo(', "Intervalo de confianza para la diferencia de medias" = resultvareq[[i]]$conf.int');
	  }
	  echo('))\n');
	  echo('}\n');
	} else {
	// Non-grouped mode
	  // Non equal variances
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
}


