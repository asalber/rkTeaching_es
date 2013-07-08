// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var q;

function calculate () {
	q = "c (" + getString("q").replace (/[, ]+/g, ", ") + ")";

	echo ('result <- (pchisq(q = ' + q + ', df = ' + getString("df") + ', ' + getString("tail") + '))\n');
}

function printout () {
	echo ('rk.header ("Probabilidad acumulada Chi-cuadrado", list ("Grados de libertad" = "' + getString("df") + '", "Cola de acumulaci&oacute;n" = ');
	if (getValue ("tail")=="lower.tail=TRUE" )
		echo('"Izquierda (&lt;)"));\n');
	else
		echo('"Derecha (&gt;)"));\n');
	echo ('rk.results (list("Valores" = ' + q + ', "Probabilidades acumuladas" = result))\n');
}
