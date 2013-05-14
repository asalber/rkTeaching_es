// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals

function preprocess () {
}

function calculate () {
	if (getValue("grouped")){
		var data = getValue("x").split('[[')[0];
		var x = getValue("x.shortname");
		var groups = getValue("groups.shortname");
		echo('results <- do.call("rbind", with(' + data + ', tapply(' + x + ',' + groups + ', function(x) unlist(shapiro.test(x)[c("statistic", "p.value")]))))\n');
	}
	else {
		var x = getValue("x");
		echo('results <- unlist(shapiro.test(' + x + ')[c("statistic","p.value")])\n');
	}
}

function printout () {
	echo ('rk.header("Test de normalidad de Shapiro-Wilk", parameters=list ("Variable"= rk.get.description(' + getValue("x") + ')');
	if (getValue("grouped")){
		echo(', "Seg&uacute;n" = rk.get.description(' + getValue("groups") + ')');
	}
	echo('))\n');
	echo ('rk.results(list(');
	if (getValue("grouped")){
		echo('"Grupo" = rownames(results), ');
		echo('"Estad&iacute;stico W" = results[,"statistic.W"], "p-valor" = results[,"p.value"]))\n');
	}
	else{
		echo('"Estad&iacute;stico W" = results[["statistic.W"]], "p-valor" = results[["p.value"]]))\n');
	}
}
