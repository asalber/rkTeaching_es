// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var p;

function calculate () {
	p = "c (" + getString("p").replace (/[, ]+/g, ", ") + ")";
	echo ('result <- (qbinom(p = ' + p + ', size = ' + getString("size") + ', prob = ' + getString("prob") + ', ' + getString("tail") + '))\n');
}

function printout () {
	echo ('rk.header ("Cuantiles Binomial", list ("N&ordm; de repeticiones" = "' + getString("size") + '", "Probabilidad de &eacute;xito" = "' + getString("prob") + '", "Cola de acumulaci&oacute;n" = ');
	if (getString("tail")=="lower.tail=TRUE" )
		echo('"Izquierda (&lt;=)"));\n');
	else
		echo('"Derecha (&gt;)"));\n');
	echo ('rk.results (list("Probabilidades acumuladas" = ' + p + ', "Cuantiles" = result))\n');
}

