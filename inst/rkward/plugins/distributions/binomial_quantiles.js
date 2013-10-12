// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var p, fun, size, prob, tail;

function calculate () {
	size = getString("size");
	prob = getString("prob");
	p = 'c(' + getString("p").replace (/[, ]+/g, ", ") + ')';
	tail = getString("tail");
	echo ('result <- (qbinom(p = ' + p + ', size = ' + size + ', prob = ' + prob + ', ' + tail + '))\n');
}

function printout () {
	echo ('rk.header ("Cuantiles Binomial B(' + size + ',' + prob + ')", list ("N&ordm; de repeticiones" = "' + size + '", "Probabilidad de &eacute;xito" = "' + prob + '", "Cola de acumulaci&oacute;n" = ');
	if (tail=="lower.tail=TRUE" )
		echo('"Izquierda (&le;)"));\n');
	else
		echo('"Derecha (&gt;)"));\n');
	echo ('rk.results (list("Probabilidades acumuladas" = ' + p + ', "Cuantiles" = result))\n');
}

