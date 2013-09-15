// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, y, filter;

function preprocess(){
	echo('require(rk.Teaching)\n');
}

function calculate () {
    // Filter
	echo(getString("filter_embed.code.calculate"));
	// Load variables
	y = getString("y");
	x = getString("x");
	data = getValue("y").split('[[')[0];
	var models = getString("linear") + getString("cuadratic") + getString("cubic") + getString("potential") + getString("exponential") + getString("logarithmic") + getString("inverse") + getString("sigmoid");
	models = models.slice(0, -1);
	echo ('result <- regcomp(' + y + ', ' + x + ', models=c(' + models + '))\n');
}

function printout () {
	echo ('rk.header ("Comparaci&oacute;n de modelos de regresi&oacute;n", parameters=list("Variable dependiente" = rk.get.description(' + y + '), "Variable independiente" = rk.get.description(' + x + ')' + getString("filter_embed.code.printout") + "))\n");
	echo('rk.results(result)\n');
}

