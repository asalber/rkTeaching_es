// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var p;

function calculate () {
	p = "c (" + getValue ("p").replace (/[, ]+/g, ", ") + ")";

	echo ('result <- (qunif(p = ' + p + ', min = ' + getValue ("min") + ', max = ' + getValue ("max") + ', ' + getValue ("tail") + '))\n');
}

function printout () {
	echo ('rk.header ("Cuantiles Uniforme continua", list ("L&iacute;mite inferior" = "' + getValue ("min") + '", "L&iacute;mite superior" = "' + getValue ("max") + '", "Cola de acumulaci&oacute;n" = ');
	if (getValue ("tail")=="lower.tail=TRUE" )
		echo('"Izquierda"));\n');
	else
		echo('"Derecha"));\n');
	echo ('rk.results (list("Probabilidades acumuladas" = ' + p + ', "Cuantiles" = result))\n');
}
