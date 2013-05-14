// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, mean, confint, conflevel, alternative;

function preprocess () {

}

function calculate () {
	x = getString("variable");
	mean = getString("mean");
	confint = getBoolean ("confint_frame.checked");
	conflevel = getString ("conflevel");
	var hypothesis = getString ("hypothesis");
	var options = ', alternative="' + hypothesis + '", mu=' + mean ;
	if (confint) {
		options += ", conf.level=" + conflevel;
	}
	if (hypothesis=="two.sided") alternative = "Bilateral";
	else if (hypothesis=="greater") alternative = "Unilateral mayor";
	else alternative = "Unilateral menor";
	
	echo('result <- t.test (' + x + options + ')\n');
}

function printout () {
	echo ('rk.header ("Test T para una media", ');
	echo ('parameters=list ("Variable" = rk.get.description(' + x + '), "Hip&oacute;tesis nula" = "media poblacional =' + mean + '", "Hip&oacute;tesis alternativa" = "' + alternative + '"');
	if (confint) {
		echo (', "Nivel de confianza del intervalo" = "' + conflevel + '"');
	}
	echo('))\n');
	
	//echo ('rk.print(result)\n');
	echo ('rk.results (list(');
	echo ('"Variable" = rk.get.description(' + x + '), ');
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


