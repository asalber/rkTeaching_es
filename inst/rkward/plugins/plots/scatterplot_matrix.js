// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var vars, data, filter;

function preprocess() {
	// add requirements etc. here
	echo('require(car)\n');
}

function getName(x){
	return x.split('"')[1];
}

function calculate () {
	var v = trim (getValue ("vars"));
	data = v.split('[[')[0];
	var vs = v.split ("\n");
	vars = getName(vs[0]);
	for (i=1; i<vs.length; i++){
		vars += '+' + getName(vs[i]);
	}
	filter = '';
	if (getValue("filter_frame.checked")){
		filter = ', subset=' + getValue("filter");
	}

}

function printout () {
	doPrintout (true);
}

function preview () {
	calculate ();
	doPrintout (false);
}

function doPrintout (full) {
	if (full) {
		echo ('rk.header ("Matriz de Dispersi&oacute;n"');
		echo (', parameters=list("Variables" = rk.get.description(' + getValue("vars").split("\n") + ', paste.sep=", ")');
		if (getValue("filter_frame")){
			echo(", 'Filtro' = '" + getValue("filter") + "'");
		}
		echo("))\n");
		echo ('rk.graph.on()\n');
		echo ('\n');
	}
	echo ('scatterplotMatrix(~' + vars + filter + ', reg.line=' + getValue("regression") + ', smooth=' + getValue("smooth") + ', spread=' + getValue("spread") + ', diagonal="' + getValue("diagonal") + '", data=' + data + ')\n');
	if (full) {
		echo ('\n');
		echo ('rk.graph.off()\n');
	}
	

}


