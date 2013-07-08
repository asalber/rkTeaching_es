// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var p;

function calculate () {
	p = "c (" + getString("p").replace (/[, ]+/g, ", ") + ")";

	echo ('result <- (qchisq(p = ' + p + ', df = ' + getString("df") + ', ' + getString("tail") + '))\n');
}

function printout () {
	echo ('rk.header ("Cuantiles Chi-cuadrado", list ("Grados de libertad" = "' + getString("df") + '", "Cola de acumulaci&oacute;n" = ');
	if (getValue ("tail")=="lower.tail=TRUE" )
		echo('"Izquierda (&le;)"));\n');
	else
		echo('"Derecha (&gt;)"));\n');
	echo ('rk.results (list("Probabilidades acumuladas" = ' + p + ', "Cuantiles" = result))\n');
}
