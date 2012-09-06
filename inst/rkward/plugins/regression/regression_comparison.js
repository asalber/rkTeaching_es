// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var y;
var x;

function preprocess(){
	// add requirements etc. here
	echo('require(TeachingExtras)\n');
}

function calculate () {
	y = getValue("y");
	x = getValue("x"); 
	var models = getValue("linear") + getValue("cuadratic") + getValue("cubic") + getValue("potential") + getValue("exponential") + getValue("logarithmic") + getValue("inverse") + getValue("sigmoid");
	models = models.slice(0, -1);
	echo ('results <- regcomp(' + y + ', ' + x + ', models=c(' + models + '))\n');
}

function printout () {
	echo ('rk.header ("Regression Models Comparison", parameters=list("Dependent variable", rk.get.description(' + y + '), "Independent variable", rk.get.description(' + x + ')))\n');
	echo ('rk.print(results)\n');
}

