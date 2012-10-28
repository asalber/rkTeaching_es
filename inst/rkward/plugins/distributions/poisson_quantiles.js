// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var p;

function calculate () {
	p = "c (" + getValue ("p").replace (/[, ]+/g, ", ") + ")";

	echo ('result <- (qpois(p = ' + p + ', lambda = ' + getValue ("lambda") + ', ' + getValue ("tail") + '))\n');
}

function printout () {
	echo ('rk.header ("Cuantiles Poisson", list ("Media" = "' + getValue ("lambda") + '", "Cola de acumulaci&oacute;n" = ');
	if (getValue ("tail")=="lower.tail=TRUE" )
		echo('"Izquierda"));\n');
	else
		echo('"Derecha"));\n');
	echo ('rk.results (list("Probabilidades acumuladas" = ' + p + ', "Cuantiles" = result))\n');
}
