// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var vars;

function preprocess(){
	// add requirements etc. here
	echo('require(rk.Teaching)\n');
}

function getName(x){
	return x.split('"')[1];
}

function calculate () {
	var narm = "na.rm=FALSE";
	if (getValue ("narm")) narm = "na.rm=TRUE";
	var v = trim (getValue ("data"));
	var data = v.split('[[')[0] + '[,c(';
	vars = v.split ("\n");
	for (i=0; i<vars.length; i++){
		data += '"' + getName(vars[i]) + '",';
	}
	data = data.slice(0, -1) + ')]';
	var statistics = getValue("min") + getValue("max") + getValue("mean") + getValue("median") + getValue("mode") + getValue("variance") + getValue("unvariance") + getValue("stdev") + getValue("sd") + getValue("cv") + getValue("range") + getValue("iqrange") + getValue("skewness") + getValue("kurtosis");
	if (getValue("quartile") || getValue("quantiles")!=''){
		statistics += "'quantiles',";
	}
	statistics = 'c(' + statistics.slice(0, -1) + ')';
	var quantiles = 'c(';
	if (getValue("quartile")){
		quantiles += '0.25, 0.5, 0.75 ';
		if (getValue("quantiles")!= '')
			quantiles += ', ';
	}
	quantiles += getValue("quantiles") + ')';
	var groups = '';
	if (getValue("grouped")){
		groups = ', groups=' + getValue("groups");
	}
	echo ('results <- descriptiveStats(' + data + groups + ', statistics=' + statistics + ', quantiles= ' + quantiles + ')\n');
	
}

function printout () {
	echo ('rk.header ("Estad&iacute;stica Descriptiva"');
	//echo (', parameters=list("Variables" =' + "'" + vars.join(', ') + "'");
	echo (', parameters=list("Variables" = rk.get.description(' + getValue("data").split("\n") + ', paste.sep=", ")');
	if (getValue("grouped")){
		echo (', "Seg&uacute;n" = rk.get.description(' + getValue("groups") +  ')');
	}
	echo (', "Eliminar valores desconocidos" = ');
	if (getValue ("narm")) echo ('"Si"');
	else echo ('"No"');
	echo ('))\n');
	//echo ('rk.results(list("Variables" = rownames(results$table)))\n');
	//echo ('HTML(results$table,file=rk.get.output.html.file(),digits=6)\n');
	echo ('rk.print(results$table,digits=6)\n');
	//echo('colnames(results$table) <- c("M&iacute;nimo", "M&aacute;ximo", "Media", "Mediana", "Moda", "Varianza", "Cuasivarianza", "Desviaci&oacute;n t&iacute;pica", "Cuasidesviaci&oacute;n t&iacute;pica", "Coeficiente de variaci&oacute;n", "Rango", "Rango intercuart&iacute;lico", "Coeficiente de asimietr&iacute;a", "Coeficiente de curtosis")[c("min", "max", "mean", "median", "Mode", "variance", "unvariance", "stdev", "sd", "cv", "ran", "iqrange", "skewness", "kurtosis") %in% colnames(results$table)]\n');
	//echo('rk.results(list("Estad&iacute;sticos" = colnames(results$table), "Valor" = results$table))\n');
}

