// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var classes, breaks, classesheader;

function makeCodes () {
	classesheader = ', "M&eacute;todo de determinaci&oacute;n de los intervalos " = "';
	var variable = getString("variable");
	var breaksmethod = getString("breaksFunction");
	if (breaksmethod == "num") {
		breaks = 'pretty(range(' + variable + '),' + getString("breaks_num") + ')';
		classesheader += 'Aproximadamente ' + getString("breaks_num") + ' intervalos"';
	} else if (breaksmethod == "vec") {
		breaks = 'c(' +  getString("breaks_vec") + ')';
		classesheader += 'Definidos por el usuario: ' + getString ("breaks_vec") + '"';
	} else {
		breaks = 'pretty(range(' + variable + '), nclass.' + breaksmethod + '(' +  variable + '))';
		classesheader += breaksmethod + '"';
	};
	classes = ', breaks=' + breaks;
	if (getBoolean("rightclosed")) {
		classes += ', right=TRUE';
	}
	else {
		classes += ', right=FALSE';
	}
}

function prueba() {
	echo("hola");
}

function preprocess(){
	// add requirements etc. here
	makeCodes();
	echo(breaks);
}

function calculate(){
	// the R code to be evaluated
	echo(classes);
}

function printout(){
	// printout the results
	echo(classesheader);
}

