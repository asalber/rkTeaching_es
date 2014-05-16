// author: Alfredo Sánchez Alberca (asalber@ceu.es)
var data, condition, filtervariables, variables;

function preprocess(){
	// add requirements etc. here
}

function calculate () {
	data = getString("dataframe");
	var newdata = getString("save");
	condition = getString("condition");
	filtervariables = getBoolean ("variables_frame.checked");
	// Create a new dataset with the filtered data
	echo('.GlobalEnv$' + newdata + ' <- subset(' + data + ', subset=' + condition);
	if (filtervariables){
		variables = getList("variables.shortname").join (', ');
		if (variables != '') echo (', select=c(' + variables +')');
	}
	echo(')\n');
	// Copy also the labels of original data set
	echo('for(i in 1:length(names(' + newdata + '))){\n');
    echo('\t attr(.GlobalEnv$' + newdata + '[[names(' + newdata + ')[i]]],".rk.meta") = attr(' + data + '[[names(' + newdata + ')[i]]],".rk.meta")\n');
    echo('}\n');
}

function printout () {
	echo("rk.header ('Filtrado de datos', parameters=list('Conjunto de datos' = '" + data + "'"); 
	if (condition!='') echo(", 'Condici&oacute;n de selecci&oacute;n' = '" + condition + "'");
	if (filtervariables && variables!='') echo(", 'Variables seleccionadas' = '" + variables + "'");
	echo('))\n');
}

