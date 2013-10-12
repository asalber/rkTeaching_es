// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var p, mean, sd, tail;

function calculate () {
	mean = getString("mean");
	sd = getString("sd");
	p = 'c(' + getString("p").replace (/[, ]+/g, ", ") + ')';
	tail = getString("tail");
	echo ('result <- (qnorm(p = ' + p + ', mean = ' + mean + ', sd = ' + sd + ', ' + tail + '))\n');
}

function printout () {
	echo ('rk.header ("Cuantiles Normal N(' + mean + ',' + sd + ')", list ("Media" = "' + mean + '", "Desviaci&oacute;n t&iacute;pica" = "' + sd + '", "Cola de acumulaci&oacute;n" = ');
	if (tail=="lower.tail=TRUE" )
		echo('"Izquierda (&le;)"));\n');
	else
		echo('"Derecha (&gt;)"));\n');
	echo ('rk.results (list("Probabilidades acumuladas" = ' + p + ', "Cuantiles" = result))\n');
}
