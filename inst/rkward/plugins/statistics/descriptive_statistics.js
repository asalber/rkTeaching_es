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
	}
	if (getValue("quantiles")!= ''){
		quantiles += ', ' + getValue("quantiles");
	}
	quantiles += ')';
	echo ('results <- descriptiveStats(' + data + ', statistics=' + statistics + ', quantiles= ' + quantiles + ')\n');
	
}

function printout () {
	echo ('rk.header ("Estadística Descriptiva", parameters=list("Variables", ' + "'" + vars.join(', ') + "'" + ', "Eliminar valores desconocidos", ');
	if (getValue ("narm")) echo ("TRUE");
	else echo ("FALSE");
	echo ('))\n');
	echo ('rk.print(results$table)\n');
}

