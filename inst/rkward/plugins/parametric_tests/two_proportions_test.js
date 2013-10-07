// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, factor, category, freq1, n1, freq2, n2,  type, test, confint, conflevel, hypothesis;

function preprocess () {

}

function calculate () {
	hypothesis = getString ("hypothesis");
	var options = ', alternative="' + hypothesis + '"';
	confint = getBoolean("confint.checked");
	conflevel = getString("conflevel");
	if (confint) {
		options += ', conf.level=' + conflevel;
	}
	type = getString("type");
	if (type=="normal"){
		options += ', correct=FALSE)';
		test = "Aproximaci&oacute;n normal sin correcci&oacute;n por continuidad";
	}
	else {
		test = "Aproximaci&oacute;n normal con correcci&oacute;n por continuidad";
	}
	if (getBoolean("manual.checked")){
		freq1 = getString("freq1");
		n1 = getString("n1");
		freq2 = getString("freq2");
		n2 = getString("n2");
		echo('result <- prop.test(c(' + freq1 + ',' + freq2 + '),c(' + n1 + ',' + n2 + '), ' + options + ')\n');
		echo('result <- list("Proporci&oacute;n estimada 1" = result$estimate[1], "Proporci&oacute;n estimada 2" = result$estimate[2], "Grados de libertad" = result$parameter, "Estad&iacute;stico Chi" = result$statistic, "p-valor" = result$p.value');
		if (confint) {
			echo(', "Nivel de confianza %" = (100 * attr(result$conf.int, "conf.level")), "Intervalo de confianza para la diferencia de proporciones" = result$conf.int)');
		}
		echo('\n');
		category = ''; 
	}
	else {
		// Filter
		echo(getString("filter_embed.code.calculate"));
		// Load variables
		x = getString("variable");
		factor = getString("factor");
		category = getString("category");
		echo('.data <- split(' + x + ',' + factor +')\n');
		echo('.x1<-.data[[levels(' + factor + ')[1]]]\n');
		echo('.x2<-.data[[levels(' + factor + ')[2]]]\n');
		echo ('.freq1 <- length(.x1[.x1=="' + category + '"])\n');
		echo ('.n1 <- length(.x1)\n');
		echo ('.freq2 <- length(.x2[.x2=="' + category + '"])\n');
		echo ('.n2 <- length(.x2)\n');
		echo('result <- prop.test(c(.freq1,.freq2),c(.n1,.n2)' + options + ')\n');
		echo('result <- list(result$estimate[1], result$estimate[2], "Grados de libertad" = result$parameter, "Estad&iacute;stico Chi" = result$statistic, "p-valor" = result$p.value');
		if (confint) {
			echo(', "Nivel de confianza %" = (100 * attr(result$conf.int, "conf.level")), "Intervalo de confianza para la diferencia de proporciones" = result$conf.int)');
		}
		echo('\n');
		echo('names(result)[1:2] <- c(paste("Proporci&oacute;n estimada de ' + category + ' en ", levels(' + factor + ')[1]), paste("Proporci&oacute;n estimada de ' + category + ' en ", levels(' + factor + ')[2]))\n');
	}	
}

function printout () {
	echo ('rk.header ("Test para la comparaci&oacute;n de proporciones');
	if (getBoolean("manual.checked")){
		echo ('", parameters=list("Frecuencia de la primera muestra" = "' + freq1 + '", "Tama&ntilde;o de la primera muestra" = "' + n1 + '", "Frecuencia de la segunda muestra" = "' + freq2 + '", "Tama&ntilde;o de la segunda muestra" = "' + n2 + '"');
		echo(', "Hip&oacute;tesis nula" = "proporci&oacute;n 1 = proporci&oacute;n 2"');
		if (hypothesis=="two.sided"){
			echo(', "Hip&oacute;tesis nula" = "proporci&oacute;n 1 &ne; proporci&oacute;n 2"');
		}
		else if (hypothesis=="greater") {
			echo(', "Hip&oacute;tesis nula" = "proporci&oacute;n 1 &gt; proporci&oacute;n 2"');
		}
		else {
			echo(', "Hip&oacute;tesis nula" = "proporci&oacute;n 1 &lt; proporci&oacute;n 2"');
		}	
	} else {
		echo(' de ' + getString("variable.shortname") + '=' + category + ' seg&uacute;n ' + getString("factor.shortname") + '", parameters=list ("Comparaci&oacute;n de" = rk.get.description(' + x + '), "Seg&uacute;n" = rk.get.description(' + factor + ')' + getString("filter_embed.code.printout") + ', "Proporci&oacute;n de" = "' + category + '"');
		echo(', "Hip&oacute;tesis nula" = paste("proporci&oacute;n ' + category + ' en ",  levels(' + factor + ')[1], " = proporci&oacute;n ' + category + ' en ", levels(' + factor + ')[2])');
		if (hypothesis=="two.sided"){
			echo(', "Hip&oacute;tesis alternativa" = paste("proporci&oacute;n ' + category + ' en ",  levels(' + factor + ')[1], " &ne; proporci&oacute;n ' + category + ' en ", levels(' + factor + ')[2])');
		}
		else if (hypothesis=="greater") {
			echo(', "Hip&oacute;tesis alternativa" = paste("proporci&oacute;n ' + category + ' en ",  levels(' + factor + ')[1], " &gt; proporci&oacute;n ' + category + ' en ", levels(' + factor + ')[2])');
		}
		else {
			echo(', "Hip&oacute;tesis alternativa" = paste("proporci&oacute;n ' + category + ' en ",  levels(' + factor + ')[1], " &lt; proporci&oacute;n ' + category + ' en ", levels(' + factor + ')[2])');
		}	
	}		
	echo(', "Tipo de prueba" = "' + test + '"');
	if (confint) {
		echo (', "Nivel de confianza del intervalo" = "' + conflevel + '"');
	}
	echo('))\n');
	echo ('rk.results(result)\n');
}


