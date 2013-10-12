// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var p, df1, df2, tail, fun;

function calculate () {
	df1 = getString("df1");
	df2 = getString("df2");
	p = 'c(' + getString("p").replace (/[, ]+/g, ", ") + ')';
	tail = getString("tail");
	echo ('result <- (qf(p = ' + p + ', df1 = ' + df1 + ', df2 = ' + df2 + ', ' + tail + '))\n');
}

function printout () {
	echo ('rk.header ("Cuantiles F de Fisher F(' + df1 + ',' + df2 + ')", list ("Grados de libertad del numerador" = "' + df1 + '", "Grados de libertad del denominador" = "' + df2 + '", "Cola de acumulaci&oacute;n" = ');
	if (tail=="lower.tail=TRUE" )
		echo('"Izquierda (&le;)"));\n');
	else
		echo('"Derecha (&gt;)"));\n');
	echo ('rk.results (list("Probabilidades acumuladas" = ' + p + ', "Cuantiles" = result))\n');
}
