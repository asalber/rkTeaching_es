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
	// Copy also the labels of original data set
	echo('for(i in 1:length(names(' + newdata + '))){\n');
	echo('\t if (names(' + newdata + ')[i]!= "' + freq + '"){\n');
    echo('\t attr(.GlobalEnv$' + newdata + '[[names(' + newdata + ')[i]]],".rk.meta") = attr(' + data + '[[names(' + newdata + ')[i]]],".rk.meta")\n');
    echo('\t }\n');
    echo('}\n');
}

function printout () {
	echo ('rk.header ("Ponderaci&oacute;n de conjunto de datos", parameters=list("Conjunto de datos a ponderar" = "' + data + '", "Frecuencias de ponderaci&oacute;n" = "' + freq + '", "Nuevo conjunto de datos" = rk.get.description(' + newdata + ')))\n');
}

