// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var p;

function calculate () {
	p = "c (" + getString("p").replace (/[, ]+/g, ", ") + ")";

	echo ('result <- (qnorm(p = ' + p + ', mean = ' + getString("mean") + ', sd = ' + getString("sd") + ', ' + getString("tail") + '))\n');
}

function printout () {
	echo ('rk.header ("Cuantiles Normal", list ("Media" = "' + getString("mean") + '", "Desviaci&oacute;n t&iacute;pica" = "' + getString("sd") + '", "Cola de acumulaci&oacute;n" = ');
	if (getString("tail")=="lower.tail=TRUE" )
		echo('"Izquierda (&le;)"));\n');
	else
		echo('"Derecha (&gt;)"));\n');
	echo ('rk.results (list("Probabilidades acumuladas" = ' + p + ', "Cuantiles" = result))\n');
}
