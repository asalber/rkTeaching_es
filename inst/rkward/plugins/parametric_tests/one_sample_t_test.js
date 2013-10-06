// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, mean, confint, conflevel, hypothesis;

function preprocess () {
}

function calculate () {
	// Filter
	echo(getString("filter_embed.code.calculate"));
	// Load variables
	x = getString("variable");
	mean = getString("mean");
	confint = getBoolean ("confint_frame.checked");
	conflevel = getString ("conflevel");
	hypothesis = getString ("hypothesis");
	var options = ', alternative="' + hypothesis + '", mu=' + mean ;
	if (confint) {
		options += ", conf.level=" + conflevel;
	}
	echo('result <- t.test (' + x + options + ')\n');
}

function printout () {
	echo ('rk.header ("Test T para la media de ' + getString("variable.shortname") + '", ');
	echo ('parameters=list ("Variable" = rk.get.description(' + x + ')' + getString("filter_embed.code.printout") + ', "Hip&oacute;tesis nula" = paste("media ", rk.get.short.name(' + x + '), "= ' + mean + '")');
	if (hypothesis=="two.sided"){
		echo(', "Hip&oacute;tesis alternativa" = paste("media &ne; ' + mean + '")');
	}
	else if (hypothesis=="greater") {
		echo(', "Hip&oacute;tesis alternativa" = paste("media &gt; ' + mean + '")');
	}
    else {
    	echo(', "Hip&oacute;tesis alternativa" = paste("media &lt; ' + mean + '")');
    }
	if (confint) {
		echo (', "Nivel de confianza del intervalo" = "' + conflevel + '"');
	}
	echo('))\n');
	echo ('rk.results (list(');
	echo ('"Variable" = rk.get.short.name(' + x + '), ');
	echo ('"Media estimada" = result$estimate, ');
	echo ('"Grados de libertad" = result$parameter, ');
	echo ('"Estad&iacute;stico t" = result$statistic, ');
	echo ('"p-valor" = result$p.value');
	if (confint) {
		echo (', "Nivel de confianza %" = (100 * attr(result$conf.int, "conf.level"))');
		echo (', "Intervalo de confianza para la media" = result$conf.int');
	}
	echo ('))\n');
}


