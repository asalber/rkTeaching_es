// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var data, condition;

function preprocess(){
	// add requirements etc. here
}

function calculate () {
	data = getValue("data");
	var newdata = getValue("save");
	condition = getValue("condition");
	echo ('.GlobalEnv$' + newdata + ' <- subset(' + data + ', subset=' + condition + ')\n');	
}

function printout () {
	echo ("rk.header ('Filtrado de datos', parameters=list('Conjunto de datos' = '" + data + "', 'Condici&oacute;n' = '" + condition + "'))\n");
}

