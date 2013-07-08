// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var q;

function calculate () {
	q = "c (" + getString("q").replace (/[, ]+/g, ", ") + ")";

	echo ('result <- (pf(q = ' + q + ', df1 = ' + getString("df1") + ', df2 = ' + getString("df2") + ', ' + getString("tail") + '))\n');
}

function printout () {
	echo ('rk.header ("Probabilidad acumulada F de Fisher", list ("Grados de libertad del numerador" = "' + getString("df1") + '", "Grados de libertad del denominador" = "' + getString("df2") + '", "Cola de acumulaci&oacute;n" = ');
	if (getValue ("tail")=="lower.tail=TRUE" )
		echo('"Izquierda (&lt;)"));\n');
	else
		echo('"Derecha (&gt;)"));\n');
	echo ('rk.results (list("Valores" = ' + q + ', "Probabilidades acumuladas" = result))\n');
}
