// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var model;

function preprocess(){
	echo('require(rk.Teaching)\n');
}

function calculate () {
	model = getString("model");
	var interval = '';
	if (getBoolean("intervals")){
		interval= 'interval="prediction"';
	}
	var data;
	if (getBoolean("use_dataframe")){
		data = getString("dataframe");
	}
	else{
		data = 'data.frame(x=c(' + getString("values") + '))'
	}		
	echo('results <- predictions(' + model + ', ' + data + ', ' + interval + ')\n');
}

function printout () {
	echo('rk.header ("Predicciones de regresi&oacute;n", parameters=list("Nombre del modelo" = "' + model + '", "Variable dependiente" = colnames(' + model +'$model)[1], "Variable independiente" = colnames(' + model +'$model)[-1], "Ecuaci&oacute;n del modelo" = paste(colnames(' + model +'$model)[1],"=",round(' + model +'$coefficients[1],4), "+", round(' + model + '$coefficients[2],4), colnames(' + model +'$model)[-1])))\n');
	if (getBoolean("intervals")){
		echo('rk.results(setNames(list(results[,1],results[,2],results[,3],results[,4]),c(colnames(results)[1],paste("predicciones ",colnames(' + model +'$model)[1]), "l&iacute;m inf 95%","l&iacute;m sup 95%")))\n');
	}
	else{
		echo('rk.results(setNames(list(results[,1],results[,2]),c(colnames(results)[1],paste("predicciones ",colnames(' + model +'$model)[1]))))\n');
	}
		
}

