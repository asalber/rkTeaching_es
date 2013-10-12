// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var q, min, max;

function calculate () {
	min = getString("min");
	max = getString("max");
	p = 'c(' + getString("p").replace (/[, ]+/g, ", ") + ')';
	tail = getString("tail");
	echo ('result <- (qunif(p = ' + p + ', min = ' + min + ', max = ' + max + ', ' + tail + '))\n');
}

function printout () {
	echo ('rk.header ("Cuantiles Uniforme continua U(' + min + ',' + max + ')", list ("L&iacute;mite inferior" = "' + min + '", "L&iacute;mite superior" = "' + max + '", "Cola de acumulaci&oacute;n" = ');
	if (tail=="lower.tail=TRUE" )
		echo('"Izquierda (&le;)"));\n');
	else
		echo('"Derecha (&gt;)"));\n');
	echo ('rk.results (list("Probabilidades acumuladas" = ' + p + ', "Cuantiles" = result))\n');
}
