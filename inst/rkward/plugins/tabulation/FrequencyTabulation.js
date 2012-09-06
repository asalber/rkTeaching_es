//author: Alfredo Sánchez Alberca (asalber@ceu.es)

//globlas
var var1;

function preprocess(){
	// add requirements etc. here
	echo("require(TeachingExtras)\n");
}

function calculate(){
	// read in variables from dialog
	var1 = getValue("var1");
	// the R code to be evaluated
	echo("result <- frequencyTable (" + var1 + ")\n");
}

function printout(){
	// printout the results
	echo('rk.header("Tabla de frecuencias", parameters=list("Variable", rk.get.description (' + var1 + ')))\n');
	echo('rk.print (result)\n');
}

