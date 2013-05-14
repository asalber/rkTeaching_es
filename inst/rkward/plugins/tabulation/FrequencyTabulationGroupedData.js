// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var variable;

function preprocess(){
	// add requirements etc. here
	echo('require(rk.Teaching)\n');
}

function calculate(){
	variable = getString("variable");
	echo('result <- frequencyTableIntervals(' + variable + getValue("cells.code.calculate") + ')\n');
}

function printout(){
	// printout the results
	echo('rk.header("Tabla de frecuencias (datos agrupados)", ');
	echo('parameters=list("Variable" = rk.get.description(' + variable +  ')' + getValue("cells.code.printout") + '))\n');
	echo('\t rk.results(setNames(list(rownames(result),result[,1],result[,2]),c(rk.get.description (' + variable + '), "Frec.Abs.","Frec.Rel.")))\n');		
}

