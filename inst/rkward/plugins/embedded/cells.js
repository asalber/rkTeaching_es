// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var calcoptions;
var headeroptions;

function makeCodes () {
	calcoptions = ", breaks=";
	headeroptions = ', "M&eacute;todo de determinaci&oacute;n de los intervalos " = "';
	var variable = getString("variable");
	var breaks = getValue("breaksFunction");
	if (breaks == "num") {
		calcoptions += getValue ("breaks_num");
		headeroptions += 'Aproximadamente ' + getValue ("breaks_num") + ' intervalos"';
	} else if (breaks == "int") {
		calcoptions += "seq (floor (min (" + variable + ", na.rm=TRUE))-0.5, ceiling (max (" + variable + ", na.rm=TRUE))+0.5)";
		headeroptions += 'Enteros"';
	} else if (breaks == "vec") {
		calcoptions += 'c(' +  getValue("breaks_vec") + ')';
		headeroptions += 'Definidos por el usuario: ' + getValue ("breaks_vec") + '"';
	} else {
		calcoptions += "\"" + breaks + "\"";
		headeroptions += breaks + '"';
	}
	var right = getValue ("rightclosed");
	if (right) {
		headeroptions += ', "Intervalos cerrados a la derecha" = "Si"';
		calcoptions += ", right=TRUE";
	} else {
		headeroptions += ', "Intervalos cerrados a la derecha" = "No"';
		calcoptions += ", right=FALSE";
	}
	var inclowest = getValue ("include_lowest");
	if (!inclowest) {
		headeroptions += ', "Incluir el l&iacute;mite inferior del primer intervalo" = "Si"';
		calcoptions += ", include.lowest=FALSE";
	} else {
		headeroptions += ', "Incluir el l&iacute;mite inferior del primer intervalo" = "No"';
	}
}


function preprocess(){
	// add requirements etc. here
	makeCodes();
}

function calculate(){
	// the R code to be evaluated
	echo(calcoptions);
}

function printout(){
	// printout the results
	echo(headeroptions);
}

