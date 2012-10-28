// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var q;

function calculate () {
	q = "c (" + getValue ("q").replace (/[, ]+/g, ", ") + ")";

	echo ('result <- (pbinom(q = ' + q + ', size = ' + getValue ("size") + ', prob = ' + getValue ("prob") + ', ' + getValue ("tail") + '))\n');
}

function printout () {
	echo ('rk.header ("Probabilidad acumulada Binomial", list ("N&ordm; de repeticiones" = "' + getValue ("size") + '", "Probabilidad de &eacute;xito" = "' + getValue ("prob") + '", "Cola de acumulaci&oacute;n" = ');
	if (getValue ("tail")=="lower.tail=TRUE" )
		echo('"Izquierda"));\n');
	else
		echo('"Derecha"));\n');
	echo ('rk.results (list("Valores" = ' + q + ', "Probabilidades acumuladas" = result))\n');
}

