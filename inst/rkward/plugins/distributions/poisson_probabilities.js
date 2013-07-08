// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var q, fun;

function calculate () {
	q = "c (" + getString("q").replace (/[, ]+/g, ", ") + ")";
	fun = getString("function");
	echo ('result <- ' + fun + 'pois(' + q + ', lambda = ' + getString("lambda"));
	if (fun == 'p'){
		echo(', ' + getString("tail"));
	}
	echo(')\n');
}

function printout () {
	var title = 'Probabilidades';
	var label = '';
	if (fun == 'p') {
		title += ' acumuladas';
		label += ' , "Cola de acumulaci&oacute;n" = ';
		if (getValue ("tail")=="lower.tail=TRUE" )
			label += '"Izquierda (&le;)"';
		else
			label += '"Derecha (&gh;)"';
	}
	echo ('rk.header ("' + title + ' Poisson", list ("Media" = "' + getString("lambda") + '"' + label + '))\n');
	echo ('rk.results (list("Valores" = ' + q + ', "' + title + '" = result))\n');
}

