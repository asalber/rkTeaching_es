// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals

function preprocess(){
	// add requirements etc. here
}

function calculate(){
	// the R code to be evaluated
	var variable = getString("variable");
	if (getBoolean("filter_frame.checked")){
		var data = variable.split('[[')[0];
		var filter = getString("filter");
		echo (data + ' <- subset(' + data + ', subset=' + filter + ')\n');
	}
}

function printout(){
	// printout the results
	if (getBoolean("filter_frame.checked")){
		echo(", 'Filtro' = '" + getString("filter") + "'");
	}
}
