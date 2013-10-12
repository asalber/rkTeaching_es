// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var p, df, tail;

function calculate () {
	df = getString("df");
	p = 'c(' + getString("p").replace (/[, ]+/g, ", ") + ')';
	tail = getString("tail");
	echo ('result <- (qt(p = ' + p + ', df = ' + df + ', ' + tail + '))\n');
}

function printout () {
	echo ('rk.header ("Cuantiles T de student T(' + df + ')", list ("Grados de libertad" = "' + df + '", "Cola de acumulaci&oacute;n" = ');
	if (tail=="lower.tail=TRUE" )
		echo('"Izquierda (&le;)"));\n');
	else
		echo('"Derecha (&gt;)"));\n');
	echo ('rk.results (list("Probabilidades acumuladas" = ' + p + ', "Cuantiles" = result))\n');
}
