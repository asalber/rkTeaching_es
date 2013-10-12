// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var q, fun, lambda, tail;

function calculate () {
	lambda = getString("lambda");
	q = 'c(' + getString("q").replace (/[, ]+/g, ", ") + ')';
	tail = getString("tail");
	fun = getString("function");
	echo ('result <- ' + fun + 'pois(' + q + ', lambda = ' + lambda);
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
	echo ('rk.header ("' + title + ' Poisson P(' + lambda + ')", list ("Media" = "' + lambda + '"' + label + '))\n');
	echo ('rk.results (list("Valores" = ' + q + ', "' + title + '" = result))\n');
}

