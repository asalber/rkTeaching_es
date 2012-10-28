// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, y, filter;

function preprocess(){
	// add requirements etc. here
	echo('require(TeachingExtras)\n');
}

function calculate () {
	y = getValue("y");
	x = getValue("x");
	data = getValue("y").split('[[')[0];
	var models = getValue("linear") + getValue("cuadratic") + getValue("cubic") + getValue("potential") + getValue("exponential") + getValue("logarithmic") + getValue("inverse") + getValue("sigmoid");
	models = models.slice(0, -1);
	filter = '';
	if (getValue("filter_frame.checked")){
		filter = ', subset=' + data + '$' + getValue("filter");
	}
	echo ('results <- regcomp(' + y + ', ' + x + ', models=c(' + models + ')' + filter + ')\n');
}

function printout () {
	echo ('rk.header ("Comparaci&oacute;n de modelos de regresi&oacute;n", parameters=list("Variable dependiente" = rk.get.description(' + y + '), "Variable independiente" = rk.get.description(' + x + ')');
	if (getValue("filter_frame.checked")){
		echo(", 'Filtro' = '" + getValue("filter") + "'");
	}
	echo("))\n");

	echo ('rk.print(results)\n');
}

