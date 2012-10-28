// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var p;

function calculate () {
	p = "c (" + getValue ("p").replace (/[, ]+/g, ", ") + ")";

	echo ('result <- (qbinom(p = ' + p + ', size = ' + getValue ("size") + ', prob = ' + getValue ("prob") + ', ' + getValue ("tail") + '))\n');
}

function printout () {
	echo ('rk.header ("Cuantiles Binomial", list ("N&ordm; de repeticiones" = "' + getValue ("size") + '", "Probabilidad de &eacute;xito" = "' + getValue ("prob") + '", "Cola de acumulaci&oacute;n" = ');
	if (getValue ("tail")=="lower.tail=TRUE" )
		echo('"Izquierda"));\n');
	else
		echo('"Derecha"));\n');
	echo ('rk.results (list("Probabilidades acumuladas" = ' + p + ', "Cuantiles" = result))\n');
}

