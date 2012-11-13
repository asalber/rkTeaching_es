// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var q, fun;

function calculate () {
	q = "c (" + getValue ("q").replace (/[, ]+/g, ", ") + ")";
	fun = getValue("function");
	echo ('result <- ' + fun + 'binom(' + q + ', size = ' + getValue ("size") + ', prob = ' + getValue ("prob"));
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
	echo ('rk.header ("' + title + ' Binomial", list("N&uacute;mero de repeticiones" = "' + getValue ("size") + '", "Probabilidad de &eacute;xito" = "' + getValue ("prob") + '"' + label + '))\n');
	echo ('rk.results (list("Valores" = ' + q + ', "' + title + '" = result))\n');
}

