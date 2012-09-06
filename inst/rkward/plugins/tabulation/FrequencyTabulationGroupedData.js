// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var var1 = getValue("var1");

function preprocess(){
	// add requirements etc. here
	echo('require(TeachingExtras)\n');
}

function calculate(){
	// the R code to be evaluated
	echo('result <- frequencyTableIntervals(' + var1 + getValue("cells.code.calculate") + ')\n');
}

function printout(){
	// printout the results
	echo('rk.header("Tabla de frecuencias (datos agrupados)", parameters=list("Variable", rk.get.description (' + var1 + ')' + getValue("cells.code.printout") + '))\n');
	echo('rk.print (result)\n');

}

