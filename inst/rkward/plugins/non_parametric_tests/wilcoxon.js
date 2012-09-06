// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, y;

function preprocess () {

}

function calculate () {
	x = getValue ("x");
	y = getValue ("y");
	var hypothesis = getValue ("hypothesis");
	var options = ', alternative="' + hypothesis + '", paired=TRUE';
	echo('result <- wilcox.test (' + x + ', ' + y + options + ')\n');
}

function printout () {
	echo ('rk.header (result$method, ');
	echo ('parameters=list ("Comparing" = rk.get.description(' + x + '), "Against" = rk.get.description(' + y + '), "H1" = rk.describe.alternative (result)');
	echo('))\n');
	
	echo ('rk.print(result)\n');
	echo ('rk.results (list(');
	echo ('"Variable Name"= rk.get.description(' + x + ',' + y + '), ');
	echo ('"V statistic"=result$statistic, ');
	echo ('p=result$p.value');
	echo ('))\n');
}


