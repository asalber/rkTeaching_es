// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var q;

function calculate () {
	q = "c (" + getValue ("q").replace (/[, ]+/g, ", ") + ")";

	echo ('result <- (pchisq(q = ' + q + ', df = ' + getValue ("df") + ', ' + getValue ("tail") + '))\n');
}

function printout () {
	echo ('rk.header ("Probabilidad acumulada Chi-cuadrado", list ("Grados de libertad" = "' + getValue ("df") + '", "Cola de acumulaci&oacute;n" = ');
	if (getValue ("tail")=="lower.tail=TRUE" )
		echo('"Izquierda"));\n');
	else
		echo('"Derecha"));\n');
	echo ('rk.results (list("Valores" = ' + q + ', "Probabilidades acumuladas" = result))\n');
}
