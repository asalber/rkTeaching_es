// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var p;

function calculate () {
	p = "c (" + getValue ("p").replace (/[, ]+/g, ", ") + ")";

	echo ('result <- (qnorm(p = ' + p + ', mean = ' + getValue ("mean") + ', sd = ' + getValue ("sd") + ', ' + getValue ("tail") + '))\n');
}

function printout () {
	echo ('rk.header ("Cuantiles Normal", list ("Media" = "' + getValue ("mean") + '", "Desviaci&oacute;n t&iacute;pica" = "' + getValue ("sd") + '", "Cola de acumulaci&oacute;n" = ');
	if (getValue ("tail")=="lower.tail=TRUE" )
		echo('"Izquierda"));\n');
	else
		echo('"Derecha"));\n');
	echo ('rk.results (list("Probabilidades acumuladas" = ' + p + ', "Cuantiles" = result))\n');
}
