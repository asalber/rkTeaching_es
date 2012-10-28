// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var q;

function calculate () {
	q = "c (" + getValue ("q").replace (/[, ]+/g, ", ") + ")";

	echo ('result <- (pnorm(q = ' + q + ', mean = ' + getValue ("mean") + ', sd = ' + getValue ("sd") + ', ' + getValue ("tail") + '))\n');
}

function printout () {
	echo ('rk.header ("Probabilidad acumulada Normal", list ("Media" = "' + getValue ("mean") + '", "Desviaci&oacute;n t&iacute;pica" = "' + getValue ("sd") + '", "Cola de acumulaci&oacute;n" = ');
	if (getValue ("tail")=="lower.tail=TRUE" )
		echo('"Izquierda"));\n');
	else
		echo('"Derecha"));\n');
	echo ('rk.results (list("Valores" = ' + q + ', "Probabilidades acumuladas" = result))\n');
}
