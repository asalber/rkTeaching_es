// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals

function preprocess () {
	echo('require(nortest)\n');
}

function calculate () {
	if (getValue("grouped")){
		var data = getValue("x").split('[[')[0];
		var x = getValue("x.shortname");
		var groups = getValue("groups.shortname");
		echo('results <- do.call("rbind", with(' + data + ', tapply(' + x + ',' + groups + ', function(x) unlist(lillie.test(x)[c("statistic", "p.value")]))))\n');
	}
	else {
		var x = getValue("x");
		echo('results <- unlist(lillie.test(prueba$mate)[c("statistic","p.value")])\n');
	}
}

function printout () {
	echo ('rk.header("Test de normalidad de Lilliefors (Kolmogorov-Smirnov)", parameters=list ("Variable"= rk.get.description(' + getValue("x") + ')');
	if (getValue("grouped")){
		echo(', "Seg&uacute;n" = rk.get.description(' + getValue("groups") + ')');
	}
	echo('))\n');
	echo ('rk.results(list(');
	if (getValue("grouped")){
		echo('"Grupo" = rownames(results), ');
	}
	echo('"Estad&iacute;stico D" = results[["statistic.D"]], "p-valor" = results[["p.value"]]))\n');
}
