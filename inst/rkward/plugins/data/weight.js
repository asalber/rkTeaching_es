// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var data, newdata, freq;

function preprocess(){
	// add requirements etc. here
	echo("require(TeachingExtras)\n");
}

function calculate () {
	data = getValue("data");
	newdata = getValue("save")
	freq = getValue("freq").split('"')[1];
	echo ('.GlobalEnv$' + newdata + ' <- weightDataFrame(' + data + ', "' + freq + '")\n');	
}

function printout () {
	echo ('rk.header ("Ponderaci&oacute;n de conjunto de datos", parameters=list("Conjunto de datos a ponderar" = "' + data + '", "Frecuencias de ponderaci&oacute;n" = "' + freq + '", "Nuevo conjunto de datos" = rk.get.description(' + newdata + ')))\n');
}

