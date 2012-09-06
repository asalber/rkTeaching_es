// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var vars;

function preprocess(){
	// add requirements etc. here
	echo('require(TeachingExtras)\n');
}

function getName(x){
	return x.split('"')[1];
}

function calculate () {
	echo ('.x <- ' + getValue("x") + '\n');
	echo ('.sum <- sum(.x, na.rm=TRUE) \n');
	echo ('.sum2 <- sum(.x^2, na.rm=TRUE) \n');
	echo ('.n <- sum(!is.na(.x)) \n');
	echo ('.mean <- round(.sum/.n,4) \n');
	echo ('.variance <- round(.sum2/.n-.mean^2,4) \n');
	echo ('.sd <- round(sqrt(.variance),4) \n');
	if (getValue("mean")){
	}

	if (getValue("variance")){
	}



/*	var narm = "na.rm=FALSE";
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
	}
	if (getValue("quantiles")!= ''){
		quantiles += ', ' + getValue("quantiles");
	}
	quantiles += ')';
	echo ('results <- descriptiveStats(' + data + ', statistics=' + statistics + ', quantiles= ' + quantiles + ')\n');
	*/
	
}

function printout () {
	echo ('rk.header ("Estadística Descriptiva (cálculo detallado)", parameters=list("Variable",  rk.get.description(' + getValue("x") + ')))\n');
	if (getValue("mean")){
		echo ('.table <- varianceTable(.x)\n');
		echo ('colnames(.table)<-c("\\\\(x_i\\\\)","\\\\(n_i\\\\)","\\\\(x_in_i\\\\)","\\\\(x_i^2n_i\\\\)")\n');
		echo ('rk.print(.table)\n');
		echo ('rk.print("F&oacute;rmula de la media: \\\\[\\\\bar{x} = \\\\frac{\\\\sum x_in_i}{n}\\\\]")\n');
		echo ('rk.print(paste("C&aacute;lculo de la media: \\\\[\\\\bar{x}=\\\\frac{", .sum, "}{", .n, "}= ", .mean, "\\\\]", sep=""))\n');
	}
	if (getValue("variance")){
		echo ('.table <- varianceTable(.x)\n');
		echo ('colnames(.table)<-c("\\\\(x_i\\\\)","\\\\(n_i\\\\)","\\\\(x_in_i\\\\)","\\\\(x_i^2n_i\\\\)")\n');
		echo ('rk.print(.table)\n');
		echo ('rk.print("F&oacute;rmula de la varianza: \\\\[s^2 = \\\\frac{\\\\sum x_i^2n_i}{n}-\\\\bar{x}^2\\\\]")\n');
		echo ('rk.print(paste("C&aacute;lculo de la varianza: \\\\[s^2=\\\\frac{", .sum2, "}{", .n, "}-", .mean, "^2 = ", .variance, "\\\\]", sep=""))\n');
		echo ('rk.print("F&oacute;rmula de la desviaci&oacute;n t&iacute;pica: \\\\[s = \\\\sqrt{s^2}\\\\]")\n');
		echo ('rk.print(paste("C&aacute;lculo de la desviaci&oacute;n t&iacute;pica: \\\\[s=\\\\sqrt{", .variance, "}=", .sd, "\\\\]", sep=""))\n');

	}
	
}

