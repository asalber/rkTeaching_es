// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var data, variable, expresion;

function preprocess(){
	// add requirements etc. here
}

function calculate () {
	variable = getString("save");
	data = getString("dataframe");
	expresion = getString("expression");
	echo ('.GlobalEnv$' + variable + ' <- with(' + data + ', ' + expresion + ')\n');	
}

function printout () {
	echo ('rk.header ("C&aacute;lculo de variable", parameters=list("Conjunto de datos" = "' + data + '", "Nueva variable"= rk.get.description(' + variable + '), "Expresi&oacute;n" = "' + expresion + '"))\n');
}

