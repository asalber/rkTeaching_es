//author: Alfredo Sánchez Alberca (asalber@ceu.es)

//globlas
var variable;

function preprocess(){
	// add requirements etc. here
	echo("require(rk.Teaching)\n");
}

function calculate(){
	// read in variables from dialog
	variable = getString("variable");
	// the R code to be evaluated
	echo('result <- frequencyTable (' + variable + ')\n');
}

function printout(){
	// printout the results
	echo('rk.header("Tabla de frecuencias", parameters=list("Variable", rk.get.description (' + variable + ')))\n');
	echo('if (is.numeric(' + variable + '))\n');
	echo('\t rk.results(setNames(list(rownames(result),result[,1],result[,2],result[,3],result[,4]),c(rk.get.description (' + variable + '), "Frec.Abs.","Frec.Rel.","Frec.Abs.Acum.","Frec.Rel.Acum.")))\n');
	echo('else\n');
	echo('\t rk.results(setNames(list(rownames(result),result[,1],result[,2]),c(rk.get.description (' + variable + '), "Frec.Abs.","Frec.Rel.")))\n');		
}

