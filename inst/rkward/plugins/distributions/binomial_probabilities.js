// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var q, fun;

function calculate () {
	q = "c (" + getString ("q").replace (/[, ]+/g, ", ") + ")";
	fun = getString("function");
	echo ('result <- ' + fun + 'binom(' + q + ', size = ' + getString("size") + ', prob = ' + getString("prob"));
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
		if (getString ("tail")=="lower.tail=TRUE" )
			label += '"Izquierda (&le;)"';
		else
			label += '"Derecha (&gt;)"';
	}
	echo ('rk.header ("' + title + ' Binomial", list("N&uacute;mero de repeticiones" = "' + getString ("size") + '", "Probabilidad de &eacute;xito" = "' + getString ("prob") + '"' + label + '))\n');
	echo ('rk.results (list("Valores" = ' + q + ', "' + title + '" = result))\n');
}

