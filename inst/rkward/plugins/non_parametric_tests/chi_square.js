// globals
var row, col, fisher, mcnemar, observed, percentages, expected;

function preprocess () {

}

function calculate () {
	row= getValue ("row");
	var data = row.split('[[')[0];
	row= getValue ("row.shortname");
	col = getValue ("col.shortname");
	fisher = getValue ("fisher");
	mcnemar = getValue ("mcnemar");
	observed = getValue("observed");
	percentages = getValue ("percentages");
	expected = getValue ("expected");

	// Código R
	echo('table <- xtabs(~' + row + '+' + col + ', data=' + data + ')\n');
	if (mcnemar)	
		echo('results <- mcnemar.test(table)\n');
	else
		echo('results <- chisq.test(table)\n');
	if (fisher)	
		echo('results.fisher <- fisher.test(table)\n');
}

function printout () {
	if (mcnemar)
		echo ('rk.header ("Test de independencia de McNemar para datos pareados", ');
	else
		echo ('rk.header ("Test de independencia Chi-Cuadrado", ');
	echo ('parameters=list ("Variable dependiente" = rk.get.description(' + getValue("row") + '), "Variable indpendiente" = rk.get.description(' + getValue("col") + ')))\n');
	if (mcnemar){
		echo ('rk.results (list(');
		echo ('"Estad&iacute;stico Chi" = results$statistic');
		echo (', "Grados de libertad" = results$parameter');
		echo (', "p-valor" = results$p.value');
		echo ('))\n');
	} else {
		echo ('rk.results (list(');
		echo ('"Estad&iacute;stico Chi" = results$statistic');
		echo (', "Grados de libertad" = results$parameter');
		echo (', "p-valor" = results$p.value');
		echo ('))\n');
		if (fisher){
			echo('rk.header("Test exacto de Fisher", level=3)\n');
			echo ('rk.results (list(');
			echo ('"p-valor" = results.fisher$p.value');
			echo ('))\n');
		}
	}
	if (observed){
		echo('rk.header("Frecuencias observadas", level=3)\n');
		echo ('rk.print(ftable(table))\n');
	}
	if (expected){
		echo('rk.header("Frecuencias esperadas", level=3)\n');
		echo ('rk.print(ftable(results$expected))\n');
	}
	if (percentages){
		echo('rk.header("Porcentajes observados", level=3)\n');
		echo ('rk.print(ftable(prop.table(table)*100))\n');
	}
}

 
