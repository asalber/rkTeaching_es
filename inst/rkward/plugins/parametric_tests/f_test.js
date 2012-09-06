// globals
var variable, factor, varequal, confint;

function preprocess () {

}

function calculate () {
	variable = getValue ("variable");
	factor = getValue ("factor");
	varequal = getValue ("varequal");
	confint = getValue ("confint_frame");
	var conflevel = getValue ("conflevel");
	var hypothesis = getValue ("hypothesis");

	var options = ", alternative=\"" + hypothesis + "\"";
	if (varequal) options += ", var.equal=TRUE";
	if (confint) options += ", conf.level=" + conflevel;

	echo('result <- t.test (' + variable + ' ~ ' + factor + options + ')\n');
}

function printout () {
	echo ('rk.header (result$method, ');
	echo ('parameters=list ("Comparing", rk.get.description(' + variable + '), "By", rk.get.description(' + factor + '), "H1", rk.describe.alternative (result), ');
	echo ('"Equal variances", "');
	if (!varequal) echo ('Not');
	echo (' assumed"');
	if (confint) {
		echo (', "Confidence interval", "' + conflevel + 'conf.level"');
	}
	echo('))\n');
	
	echo ('rk.print(result)\n');
/*	echo ('rk.results (list(');
	echo ('"Variable Name"= rk.get.description(' + variable + '), ');
	echo ('"Estimated mean"=result$estimate, ');
	echo ('"Degrees of freedom"=result$parameter, ');
	echo ('t=result$statistic, ');
	echo ('p=result$p.value');
	if (confint) {
		echo ('"Confidence interval percent"=(100 * attr(result$conf.int, "conf.level")), ');
		echo ('"confidence interval of difference"=result$conf.int');
	}
	echo ('))\n');
*/
}


