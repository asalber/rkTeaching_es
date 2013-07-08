// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var q;

function calculate () {
	q = "c (" + getString("q").replace (/[, ]+/g, ", ") + ")";

	echo ('result <- (punif(q = ' + q + ', min = ' + getString("min") + ', max = ' + getString("max") + ', ' + getString("tail") + '))\n');
}

function printout () {
	echo ('rk.header ("Probabilidad acumulada Uniforme continua", list ("L&iacute;mite inferior" = "' + getString("min") + '", "L&iacute;mite superior" = "' + getString("max") + '", "Cola de acumulaci&oacute;n" = ');
	if (getString("tail")=="lower.tail=TRUE" )
		echo('"Izquierda (&lt;)"));\n');
	else
		echo('"Derecha (&gt;)"));\n');
	echo ('rk.results (list("Valores" = ' + q + ', "Probabilidades acumuladas" = result))\n');
}
