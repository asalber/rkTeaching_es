// author: Alfredo Sánchez Alberca (asalber@ceu.es)
var source_dataframe, nrep, target_dataframe;

function preprocess(){
	echo('require(rk.Teaching)\n');
}


function calculate () {
	source_dataframe = getString("dataframe");
	target_dataframe= getString("save");
	nrep = getString("nrep");
	echo('results <- repeat.probspace(' + source_dataframe + ',' + nrep + ')\n');
	echo ('assign("' + target_dataframe + '", results, .GlobalEnv)\n');
}


function printout () {
	echo('rk.header ("Repetici&oacute;n de espacio probabil&iacute;stico", parameters=list("Espacio probabil&iacute;stico original" = "' + source_dataframe + '", "Espacio probabil&iacute;stico repetido" = "' + target_dataframe + '"))\n');
}
