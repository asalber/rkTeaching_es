// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var variable;

function preprocess(){
	// add requirements etc. here
	echo('require(rk.Teaching)\n');
}

function calculate(){
	variable = getString("variable");
	if (getBoolean("filter_frame.checked")){
		var data = variable.split('[[')[0];
		var variableName = getString("variable.shortname");
		var filter = getString("filter");
		echo ('data <- subset(' + data + ', subset=' + filter + ')\n');
		echo ('result <- frequencyTableIntervals (data[["' + variableName + '"]]' + getString("cells.code.calculate") + ')\n');
	}
	else {	
		echo('result <- frequencyTableIntervals(' + variable + getString("cells.code.calculate") + ')\n');
	}
}

function printout(){
	// printout the results
	echo('rk.header("Tabla de frecuencias (datos agrupados)", ');
	echo('parameters=list("Variable" = rk.get.description(' + variable +  ')' + getString("cells.code.printout"));  
	if (getBoolean("filter_frame.checked")){
		echo(", 'Filtro' = '" + getString("filter") + "'");
	}
	echo ('))\n');
	echo('\t rk.results(setNames(list(rownames(result),result[,1],result[,2],result[,3],result[,4],result[,5]),c(rk.get.description (' + variable + '), "Marca", "Frec.Abs.","Frec.Rel.","Frec.Abs.Acum.","Frec.Rel.Acum.")))\n');
}

