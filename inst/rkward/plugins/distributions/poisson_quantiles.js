// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var p, fun, lambda, tail;

function calculate () {
	lambda = getString("lambda");
	p = 'c(' + getString("p").replace (/[, ]+/g, ", ") + ')';
	tail = getString("tail");
	echo ('result <- (qpois(p = ' + p + ', lambda = ' + lambda + ', ' + tail + '))\n');
}

function printout () {
	echo ('rk.header ("Cuantiles Poisson P(' + lambda + ')", list ("Media" = "' + lambda + '", "Cola de acumulaci&oacute;n" = ');
	if (tail=="lower.tail=TRUE" )
		echo('"Izquierda (&le;)"));\n');
	else
		echo('"Derecha (&gt;)"));\n');
	echo ('rk.results (list("Probabilidades acumuladas" = ' + p + ', "Cuantiles" = result))\n');
}
