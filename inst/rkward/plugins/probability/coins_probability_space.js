// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var ncoins, prob, dataframe;

function preprocess(){
	echo('require(prob)\n');
}


function calculate () {
	ncoins = getString("ncoins");
	dataframe= getString("save");
	prob = getString("prob");
	echo('results <- tosscoin(' + ncoins + ', makespace=' + prob + ')\n');
	echo('for (i in 1:'+ ncoins+ ') {\n');
	echo('\t names(results)[i]= paste("moneda",i,sep="")\n');
	echo('\t levels(results[[i]])=c("C","X")\n');
	echo('}\n');
	echo ('assign("' + dataframe + '", results, .GlobalEnv)\n');
}

function printout () {
	echo('rk.header ("Espacio probabil&iacute;stico del lanzamiento de monedas", parameters=list("N&uacute;mero de monedas" = "' + ncoins + '", "Conjunto de datos" = "' + dataframe + '"))\n');
}

