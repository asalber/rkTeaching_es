// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var deck, prob, dataframe;

function preprocess(){
	echo('require(prob)\n');
	echo('require(rkTeaching)\n');
}


function calculate () {
	deck = getString("deck");
	dataframe= getString("save");
	prob = getString("prob");
	echo('results <- cards(type="' + deck + '", makespace=' + prob + ')\n');
	echo ('assign("' + dataframe + '", results, .GlobalEnv)\n');
}

function printout () {
	echo('rk.header ("Espacio probabil&iacute;stico de la extracción de naipes", parameters=list("Tipo de baraja" = "' + deck + '", "Conjunto de datos" = "' + dataframe + '"))\n');
}



