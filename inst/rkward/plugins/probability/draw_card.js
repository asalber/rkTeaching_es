// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var deck, ncards, dataframe;

function preprocess(){
	echo('require(prob)\n');
	echo('require(rk.Teaching)\n');
}

function calculate () {
	deck = getString("deck");
	ncards = getString("ncards");
	dataframe= getString("save");
	echo('s <- cards(type="' + deck + '", makespace=TRUE)\n');
	echo('results <- sim(s, ntrials=' + ncards + ')\n');
	if (getBoolean("freq")) {
		echo('results <- empirical(results)\n');
		echo('names(results)[ncol(results)]="frecuencia"\n');
	}
	echo ('assign("' + dataframe + '", results, .GlobalEnv)\n');
}

function printout () {
	echo('rk.header ("Extracci&oacute;n de naipes", parameters=list("Tipo de baraja" = "' + deck + '", "N&uacute;mero de cartas" = "' + ncards + '", "Conjunto de datos" = "' + dataframe + '"))\n');
}

