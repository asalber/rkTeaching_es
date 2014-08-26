// author: Alfredo Sánchez Alberca (asalber@ceu.es)
var source_dataframe, freq, target_dataframe;

function preprocess(){
	echo('require(prob)\n');
}


function calculate () {
	source_dataframe = getString("dataframe");
	target_dataframe= getString("save");
	if (getBoolean("set_freq.state")) {
		freq = getString("freq");
		echo('freq <- ' + freq + '\n');
		echo('' + freq + '<- NULL\n');
		echo('results <- marginal(probspace(' +  source_dataframe + ', probs=freq/sum(freq)))\n');
	} else {
		echo('results <- empirical(' + source_dataframe + ')\n');
	}
	echo('names(results)[ncol(results)]="probs"\n');
	echo ('assign("' + target_dataframe + '", results, .GlobalEnv)\n');
}


function printout () {
	echo('rk.header ("Construcci&oacute;n de espacio probabil&iacute;stico", parameters=list("Conjunto de datos" = "' + source_dataframe + '", "Espacio probabil&iacute;stico" = "' + target_dataframe + '"))\n');
}
