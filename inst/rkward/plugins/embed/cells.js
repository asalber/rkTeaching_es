// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var classes;
var classesheader;

function makeCodes () {
	classes = 'breaks=';
	classesheader = ', "M&eacute;todo de determinaci&oacute;n de los intervalos " = "';
	var variable = getString("variable");
	var breaks = getString("breaksFunction");
	if (breaks == "num") {
		classes += 'pretty(range(' + variable + '),' + getString("breaks_num") + ')';
		classesheader += 'Aproximadamente ' + getString("breaks_num") + ' intervalos"';
	} else if (breaks == "int") {
		classes += 'seq (floor (min (' + variable + ', na.rm=TRUE))-0.5, ceiling (max(' + variable + ', na.rm=TRUE))+0.5)';
		classesheader += 'Enteros"';
	} else if (breaks == "vec") {
		classes += 'c(' +  getString("breaks_vec") + ')';
		classesheader += 'Definidos por el usuario: ' + getString ("breaks_vec") + '"';
	} else {
		classes += 'pretty(range(' + variable + '), nclass.' + breaks + '(' +  variable + '))';
		classesheader += breaks + '"';
	};
}


function preprocess(){
	// add requirements etc. here
	makeCodes();
}

function calculate(){
	// the R code to be evaluated
	echo(classes);
}

function printout(){
	// printout the results
	echo(classesheader);
}

