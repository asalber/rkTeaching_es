// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, y, confint, conflevel;

function preprocess () {

}

function calculate () {
	x = getValue ("x");
	y = getValue ("y");
	confint = getValue ("confint");
	conflevel = getValue ("conflevel");
	var hypothesis = getValue ("hypothesis");
	var options = ', alternative="' + hypothesis + '", paired=TRUE';
	if (confint) {
		options += ", conf.level=" + conflevel;
	}
	echo('result <- t.test (' + x + ', ' + y + options + ')\n');
}

function printout () {
	echo ('rk.header (result$method, ');
	echo ('parameters=list ("Comparing" = rk.get.description(' + x + '), "Against" = rk.get.description(' + y + '), "H1" = rk.describe.alternative (result)');
	if (confint) {
		echo (', "Confidence interval", "' + conflevel + 'conf.level"');
	}
	echo('))\n');
	
	echo ('rk.print(result)\n');
	echo ('rk.results (list(');
	echo ('"Variable Name"= rk.get.description(' + x + ',' + y + '), ');
	echo ('"Estimated mean"=result$estimate, ');
	echo ('"Degrees of freedom"=result$parameter, ');
	echo ('t=result$statistic, ');
	echo ('p=result$p.value');
	if (confint) {
		echo (', "Confidence level %"=(100 * attr(result$conf.int, "conf.level"))');
		echo (', "confidence interval of difference"=result$conf.int');
	}
	echo ('))\n');
}


