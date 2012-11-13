// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var q, fun;

function calculate () {
	q = "c (" + getValue ("q").replace (/[, ]+/g, ", ") + ")";
	fun = getValue("function");
	echo ('result <- ' + fun + 'pois(' + q + ', lambda = ' + getValue ("lambda"));
	if (fun == 'p'){
		echo(', ' + getValue ("tail"));
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
			label += '"Izquierda"';
		else
			label += '"Derecha"';
	}
	echo ('rk.header ("' + title + ' Poisson", list ("Media" = "' + getValue ("lambda") + '"' + label + '))\n');
	echo ('rk.results (list("Valores" = ' + q + ', "' + title + '" = result))\n');
}

