// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var objects, num_objects, list_objects, num_choices, num_rep, replace, ordered, freq, dataframe;

function preprocess() {
	echo('require(prob)\n');
}

function calculate() {
	objects = getString("objects");
	dataframe = getString("save");
	freq = getString("freq");
	num_choices = getString("num_choices");
	num_rep = getString("num_rep");
	replace = getString("replace");
	ordered = getString("ordered");
	if (objects == "num") {
		num_objects = getString("num_objects");
		echo('s <- urnsamples(1:' + num_objects + ', size=' + num_choices
				+ ', replace=' + replace + ', ordered=' + ordered + ')\n');
	} else {
		list_objects = getString("list_objects");
		echo('s <- urnsamples(c("' + list_objects.replace(/,/g, '","')
				+ '"), size=' + num_choices + ', replace=' + replace
				+ ', ordered=' + ordered + ')\n');
	}
	echo('s <- probspace(s)\n');
	echo('results <- sim(s, ntrials=' + num_rep + ')\n');
	if (getBoolean("freq")) {
		echo('results <- empirical(results)\n');
		echo('names(results)[ncol(results)]="frecuencia"\n');
	}
	echo('assign("' + dataframe + '", results, .GlobalEnv)\n');
}

function printout() {
	echo('rk.header ("Extracci&oacute;n de una urna", parameters=list("Objetos en la urna" = "');
	if (objects == "num") {
		echo('1:' + num_objects);
	} else {
		echo(list_objects);
	}
	echo('", "N&uacute;mero de extracciones" = "' + num_choices
			+ '", "N&uacute;mero de repeticiones" = "' + num_rep + '"');
	if (getBoolean("replace.state"))
		echo(', "Con reemplazamiento" = "Si"');
	else
		echo(', "Con reemplazamiento" = "No"');
	if (getBoolean("ordered.state"))
		echo(', "Con orden" = "Si"');
	else
		echo(', "Con orden" = "No"');
	echo(', "Conjunto de datos" = "' + dataframe + '"))\n');
}
