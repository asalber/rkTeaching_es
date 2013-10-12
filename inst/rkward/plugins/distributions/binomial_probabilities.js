// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var q, fun, size, prob, tail;

function calculate () {
	size = getString("size");
	prob = getString("prob");
	q = 'c(' + getString("q").replace (/[, ]+/g, ", ") + ')';
	tail = getString("tail");
	fun = getString("function");
	echo ('result <- ' + fun + 'binom(' + q + ', size = ' + size + ', prob = ' + prob);
	if (fun == 'p'){
		echo(', ' + tail);
	}
	echo(')\n');
}

function printout () {
	var title = 'Probabilidades';
	var label = '';
	if (fun == 'p') {
		title += ' acumuladas';
		label += ' , "Cola de acumulaci&oacute;n" = ';
		if (tail=="lower.tail=TRUE" )
			label += '"Izquierda (&le;)"';
		else
			label += '"Derecha (>)"';
	}
	echo ('rk.header ("' + title + ' Binomial B(' + size + ',' + prob + ')", list("N&uacute;mero de repeticiones" = "' + size + '", "Probabilidad de &eacute;xito" = "' + prob + '"' + label + '))\n');
	echo ('rk.results (list("Valores" = ' + q + ', "' + title + '" = result))\n');
}

