// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, y, filter;

function preprocess(){
	echo('require(rk.Teaching)\n');
}

function calculate () {
	y = getString("y");
	x = getString("x");
	data = getValue("y").split('[[')[0];
	var models = getString("linear") + getString("cuadratic") + getString("cubic") + getString("potential") + getString("exponential") + getString("logarithmic") + getString("inverse") + getString("sigmoid");
	models = models.slice(0, -1);
	filter = '';
	if (getBoolean("filter_frame.checked")){
		filter = ', subset=' + data + '$' + getString("filter");
	}
	echo ('results <- regcomp(' + y + ', ' + x + ', models=c(' + models + ')' + filter + ')\n');
}

function printout () {
	echo ('rk.header ("Comparaci&oacute;n de modelos de regresi&oacute;n", parameters=list("Variable dependiente" = rk.get.description(' + y + '), "Variable independiente" = rk.get.description(' + x + ')');
	if (getBoolean("filter_frame.checked")){
		echo(", 'Filtro' = '" + getString("filter") + "'");
	}
	echo("))\n");
	echo('rk.results(setNames(list(results[,1],results[,2],results[,3]),c("Modelo","R<sup>2</sup>","p-valor")))\n');

}

