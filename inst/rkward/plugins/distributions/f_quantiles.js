// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var p;

function calculate () {
	p = "c (" + getString("p").replace (/[, ]+/g, ", ") + ")";

	echo ('result <- (qf(p = ' + p + ', df1 = ' + getString("df1") + ', df2 = ' + getString("df2") + ', ' + getString("tail") + '))\n');
}

function printout () {
	echo ('rk.header ("Cuantiles F de Fisher", list ("Grados de libertad del numerador" = "' + getString("df1") + '", "Grados de libertad del denominador" = "' + getString("df2") + '", "Cola de acumulaci&oacute;n" = ');
	if (getString("tail")=="lower.tail=TRUE" )
		echo('"Izquierda (&le;)"));\n');
	else
		echo('"Derecha (&gt;)"));\n');
	echo ('rk.results (list("Probabilidades acumuladas" = ' + p + ', "Cuantiles" = result))\n');
}
