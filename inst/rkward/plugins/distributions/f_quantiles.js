// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var p;

function calculate () {
	p = "c (" + getValue ("p").replace (/[, ]+/g, ", ") + ")";

	echo ('result <- (qf(p = ' + p + ', df1 = ' + getValue ("df1") + ', df2 = ' + getValue ("df2") + ', ' + getValue ("tail") + '))\n');
}

function printout () {
	echo ('rk.header ("Cuantiles F de Fisher", list ("Grados de libertad del numerador" = "' + getValue ("df1") + '", "Grados de libertad del denominador" = "' + getValue ("df2") + '", "Cola de acumulaci&oacute;n" = ');
	if (getValue ("tail")=="lower.tail=TRUE" )
		echo('"Izquierda"));\n');
	else
		echo('"Derecha"));\n');
	echo ('rk.results (list("Probabilidades acumuladas" = ' + p + ', "Cuantiles" = result))\n');
}
