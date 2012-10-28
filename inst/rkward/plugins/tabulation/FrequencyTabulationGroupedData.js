// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var variable;

function preprocess(){
	// add requirements etc. here
	echo('require(TeachingExtras)\n');
}

function calculate(){
	variable = getValue("variable");
	echo('result <- frequencyTableIntervals(' + variable + getValue("cells.code.calculate") + ')\n');
}

function printout(){
	// printout the results
	echo('rk.header("Tabla de frecuencias (datos agrupados)", ');
	echo('parameters=list("Variable" = rk.get.description(' + variable +  ')' + getValue("cells.code.printout") + '))\n');
	echo('rk.print (result)\n');

}

