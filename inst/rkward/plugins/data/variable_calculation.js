// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var data, variable, expresion;

function preprocess(){
	// add requirements etc. here
}

function calculate () {
	variable = getValue("save");
	data = variable.split('[[')[0];
	expresion = getValue("expresion");
	echo ('.GlobalEnv$' + variable + ' <- with(' + data + ', ' + expresion + ')\n');	
}

function printout () {
	echo ('rk.header ("C&aacute;lculo de variable", parameters=list("Conjunto de datos" = "' + data + '", "Nueva variable"= rk.get.description(' + variable + '), "Expresi&oacute;n" = "' + expresion + '"))\n');
}

