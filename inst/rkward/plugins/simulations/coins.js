// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var nsamples, size, dataframe;

function preprocess(){
	echo('require(rkTeaching)\n');
}


function calculate () {
	nsamples = getValue("nsamples");
	size = getValue("size"); 
	dataframe= getValue("save");
	var sum = getValue("sum");
	var mean = getValue("mean");
	echo('nsamples <- ' + nsamples + '\n');
	echo('results <- samples(c(0,1), nsamples=' + nsamples + ', size=' + size + ', sum=' + sum + ', mean=' + mean + ')\n');
	echo('for (i in 1:nsamples)\n');
	echo('\t names(results)[i]= paste("moneda",i,sep="")\n');
	echo ('assign("' + dataframe + '", results, .GlobalEnv)\n');
}

function printout () {
	echo('rk.header ("Lanzamiento de monedas", parameters=list("N&uacute;mero de monedas" = "' + nsamples + '", "N&uacute;mero de lanzamientos" = "' + size + '", "Conjunto de datos" = "' + dataframe + '"))\n');
}

