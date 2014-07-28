// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var ncoins, ntoss, dataframe;

function preprocess(){
	echo('require(prob)\n');
}


function calculate () {
	ncoins = getString("ncoins");
	ntoss = getString("ntoss");
	dataframe= getString("save");
	echo('s <- tosscoin(' + ncoins + ', makespace=TRUE)\n');
	echo('results <- sim(s, ntrials=' + ntoss + ')\n');
	if (getBoolean("freq")) {
		echo('results <- empirical(results)\n');
		echo('names(results)[ncol(results)]="frecuencia"\n');
	}
	echo('for (i in 1:'+ ncoins+ ') {\n');
	echo('\t names(results)[i]= paste("moneda",i,sep="")\n');
	echo('\t levels(results[[i]])=c("C","X")\n');
	echo('}\n');
	echo ('assign("' + dataframe + '", results, .GlobalEnv)\n');
}

function printout () {
	echo('rk.header ("Lanzamiento de monedas", parameters=list("N&uacute;mero de monedas" = "' + ncoins + '", "N&uacute;mero de lanzamientos" = "' + ntoss + '", "Conjunto de datos" = "' + dataframe + '"))\n');
}

