// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var q;

function calculate () {
	q = "c (" + getString("q").replace (/[, ]+/g, ", ") + ")";

	echo ('result <- (pnorm(q = ' + q + ', mean = ' + getString("mean") + ', sd = ' + getString("sd") + ', ' + getString("tail") + '))\n');
}

function printout () {
	echo ('rk.header ("Probabilidad acumulada Normal", list ("Media" = "' + getString("mean") + '", "Desviaci&oacute;n t&iacute;pica" = "' + getString("sd") + '", "Cola de acumulaci&oacute;n" = ');
	if (getValue ("tail")=="lower.tail=TRUE" )
		echo('"Izquierda (&lt;)"));\n');
	else
		echo('"Derecha (&gt;)"));\n');
	echo ('rk.results (list("Valores" = ' + q + ', "Probabilidades acumuladas" = result))\n');
}
