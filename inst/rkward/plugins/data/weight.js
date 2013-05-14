// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var data, newdata, freq;

function preprocess(){
	// add requirements etc. here
	echo("require(rk.Teaching)\n");
}

function calculate () {
	data = getString("dataframe");
	newdata = getString("save");
	freq = getString("freq.shortname");
	echo ('.GlobalEnv$' + newdata + ' <- weightDataFrame(' + data + ', "' + freq + '")\n');	
}

function printout () {
	echo ('rk.header ("Ponderaci&oacute;n de conjunto de datos", parameters=list("Conjunto de datos a ponderar" = "' + data + '", "Frecuencias de ponderaci&oacute;n" = "' + freq + '", "Nuevo conjunto de datos" = rk.get.description(' + newdata + ')))\n');
}

