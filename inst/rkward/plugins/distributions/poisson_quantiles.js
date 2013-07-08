// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var p;

function calculate () {
	p = "c (" + getString("p").replace (/[, ]+/g, ", ") + ")";

	echo ('result <- (qpois(p = ' + p + ', lambda = ' + getString("lambda") + ', ' + getString("tail") + '))\n');
}

function printout () {
	echo ('rk.header ("Cuantiles Poisson", list ("Media" = "' + getString("lambda") + '", "Cola de acumulaci&oacute;n" = ');
	if (getString("tail")=="lower.tail=TRUE" )
		echo('"Izquierda (&le;)"));\n');
	else
		echo('"Derecha (&gt;)"));\n');
	echo ('rk.results (list("Probabilidades acumuladas" = ' + p + ', "Cuantiles" = result))\n');
}
