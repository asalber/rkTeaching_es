// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var data, condition, filtervariables, variables;

function preprocess(){
	// add requirements etc. here
}

function calculate () {
	data = getString("dataframe");
	var newdata = getString("save");
	condition = getString("condition");
	filtervariables = getBoolean ("variables_frame.checked");
	echo ('.GlobalEnv$' + newdata + ' <- subset(' + data + ', subset=' + condition);
	if (filtervariables){
		variables = getList("variables.shortname").join (', ');
		if (variables != '') echo (', select=c(' + variables +')');
	}
	echo (')\n');	
}

function printout () {
	echo ("rk.header ('Filtrado de datos', parameters=list('Conjunto de datos' = '" + data + "'"); 
	if (condition!='') echo(", 'Condici&oacute;n de selecci&oacute;n' = '" + condition + "'");
	if (filtervariables && variables!='') echo(", 'Variables seleccionadas' = '" + variables + "'");
	echo('))\n');
}

