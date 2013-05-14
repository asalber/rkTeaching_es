// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var model;

function preprocess(){
	// add requirements etc. here
	echo('require(TeachingExtras)\n');
}

function calculate () {
	model = getValue("model");
	var interval = '';
	if (getValue("intervals")){
		interval= 'interval="prediction"';
	}
	var data;
	if (getValue("use_dataframe")){
		data = getValue("dataframe");
	}
	else{
		data = 'data.frame(x=c(' + getValue("values") + '))'
	}
		
	echo('results <- predictions(' + model + ', ' + data + ', ' + interval + ')\n');
}

function printout () {
	echo('rk.header ("Predicciones de regresi&oacute;n", parameters=list("Nombre del modelo" = "' + model + '", "Ecuaci&oacute;n del modelo" = toString(' + model + '$call)))\n');
	echo('rk.results(setNames(list(results[,1],results[,2]),c(colnames(results)[1],colnames(results)[2])))\n');
	if (getValue("intervals")){
		echo('rk.results(setNames(list(results[,1],results[,2],results[,3],results[,4]),c(colnames(results)[1],colnames(results)[2],"l&iacute;m inf 95%","l&iacute;m sup 95%")))\n');
	}
}

