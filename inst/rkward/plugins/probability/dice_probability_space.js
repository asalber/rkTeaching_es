// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var ndice, prob, dataframe;

function preprocess(){
	echo('require(prob)\n');
}


function calculate () {
	ndice = getString("ndice");
	dataframe= getString("save");
	prob = getString("prob");
	echo('results <- rolldie(' + ndice + ', makespace=' + prob + ')\n');
	echo('for (i in 1:'+ ndice+ ')\n');
	echo('\t names(results)[i]= paste("dado",i,sep="")\n');
	echo ('assign("' + dataframe + '", results, .GlobalEnv)\n');
}

function printout () {
	echo('rk.header ("Espacio probabil&iacute;stico del lanzamiento de dados", parameters=list("N&uacute;mero de dados" = "' + ndice + '", "Conjunto de datos" = "' + dataframe + '"))\n');
}

