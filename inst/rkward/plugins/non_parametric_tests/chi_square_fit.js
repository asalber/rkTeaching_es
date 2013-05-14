// globals
var observed, theoric;

function preprocess () {

}

function calculate () {
	observed = getValue("observed");
	theoric = getValue("theoric");

	// Código R
	echo('results <- chisq.test(' + observed + ', p=' + theoric + ', rescale.p=TRUE)\n');
}

function printout () {
	echo ('rk.header ("Test de bondad de ajuste Chi-Cuadrado", ');
	echo ('parameters=list ("Frecuencias observadas" = rk.get.description(' + observed + '), "Probabilidades te&oacute;ricas" = rk.get.description(' + theoric + ')))\n');
	echo ('rk.results (list(');
	echo ('"Estad&iacute;stico Chi" = results$statistic');
	echo (', "Grados de libertad" = results$parameter');
	echo (', "p-valor" = results$p.value');
	echo ('))\n');
}

 
