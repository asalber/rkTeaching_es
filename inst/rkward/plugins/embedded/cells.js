// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var calcoptions;
var headeroptions;

function makeCodes () {
	calcoptions = ", breaks=";
	headeroptions = ', "Puntos de corte de los intervalos ", "';
	var var1 = getValue("var1");
	var breaks = getValue("breaksFunction");
	if (breaks == "num") {
		calcoptions += getValue ("breaks_num");
		headeroptions += 'Aproximadamente ' + getValue ("breaks_num") + ' intervalos"';
	} else if (breaks == "int") {
		calcoptions += "seq (floor (min (" + var1 + ", na.rm=TRUE))-0.5, ceiling (max (" + var1 + ", na.rm=TRUE))+0.5)";
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
		headeroptions += ', "Intervalos cerrados a la derecha", "TRUE"';
		calcoptions += ", right=TRUE";
	} else {
		headeroptions += ', "Intervalos cerrados a la derecha", "FALSE"';
		calcoptions += ", right=FALSE";
	}
	var inclowest = getValue ("include_lowest");
	if (!inclowest) {
		headeroptions += ', "Incluir el l&iacute;mite inferior del primer intervalo", "FALSE"';
		calcoptions += ", include.lowest=FALSE";
	} else {
		headeroptions += ', "Incluir el l&iacute;mite inferior del primer intervalo", "TRUE"';
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

