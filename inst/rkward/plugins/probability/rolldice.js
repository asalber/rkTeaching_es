// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var ndice, nroll, dataframe;

function preprocess(){
	echo('require(prob)\n');
}


function calculate () {
	ndice = getString("ndice");
	nroll = getString("nroll");
	dataframe= getString("save");
	echo('s <- rolldie(' + ndice + ', makespace=TRUE)\n');
	echo('results <- sim(s, ntrials=' + nroll + ')\n');
	if (getBoolean("freq")) {
		echo('results <- empirical(results)\n');
		echo('names(results)[ncol(results)]="frecuencia"\n');
	}
	echo('for (i in 1:'+ ndice+ ')\n');
	echo('\t names(results)[i]= paste("dado",i,sep="")\n');
	echo ('assign("' + dataframe + '", results, .GlobalEnv)\n');
}

function printout () {
	echo('rk.header ("Lanzamiento de dados", parameters=list("N&uacute;mero de dados" = "' + ndice + '", "N&uacute;mero de lanzamientos" = "' + nroll + '", "Conjunto de datos" = "' + dataframe + '"))\n');
}

