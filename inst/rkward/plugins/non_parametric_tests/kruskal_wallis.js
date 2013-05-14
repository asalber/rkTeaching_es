// globals
var variable, factor, pairwise;

function preprocess () {
	echo('require(TeachingExtras)\n');
}

function calculate () {
	variable = getValue ("variable");
	factor = getValue ("factor");
	pairwise = getValue ("pairwise");
	// Código R
	echo('result <- kruskal.test(' + variable + ', ' + factor + ')\n');
	if (pairwise){
		echo('pairs <- kruskalMultipleComparison(' + variable + ', ' + factor + ')\n');
		echo('pairs[["dif.com"]][["difference"]] <- replace(pairs[["dif.com"]][["difference"]],pairs[["dif.com"]][["difference"]]==TRUE,"SI")\n');
		echo('pairs[["dif.com"]][["difference"]] <- replace(pairs[["dif.com"]][["difference"]],pairs[["dif.com"]][["difference"]]==FALSE,"NO")\n');		
	}
}

function printout () {
	echo('rk.header("Test de Kruskal-Wallis para la comparaci&oacute;n de muestras independientes", ');
	echo('parameters=list ("Comparaci&oacute;n de" = rk.get.description(' + variable + '), "Seg&uacute;n" = rk.get.description(' + factor + ')))\n');
	echo('rk.results(list("Estad&iacute;stico Chi" = result[["statistic"]], "p-valor" = result[["p.value"]]))\n');
	if (pairwise) {
		echo('rk.header("Comparaci&oacute;n por pares", level=3)\n');
		echo('rk.results(list(');
		echo('"Pares" = rownames(pairs[["dif.com"]])');
		echo(', "Diferencia observada" = pairs[["dif.com"]][["obs.dif"]]');
		echo(', "Diferencia cr&iacute;tica" = pairs[["dif.com"]][["critical.dif"]]');
		echo(', "Diferencias significativas" = pairs[["dif.com"]][["difference"]]');
		echo('))\n');
	}
}


