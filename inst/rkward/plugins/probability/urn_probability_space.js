// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var objects, num_objects, list_objects, num_choices, replace, ordered, prob, dataframe;

function preprocess(){
	echo('require(prob)\n');
}


function calculate () {
	objects = getString("objects");
	dataframe= getString("save");
	prob = getString("prob");
	num_choices = getString("num_choices");
	replace = getString("replace");
	ordered = getString("ordered");
	if (objects=="num") {
		num_objects = getString("num_objects");
		echo('results <- urnsamples(1:' + num_objects + ', size=' + num_choices + ', replace=' + replace + ', ordered=' + ordered + ',makespace=' + prob + ')\n');
	} else {
		list_objects = getString("list_objects");
		echo('results <- urnsamples(c("' + list_objects.replace(/,/g,'","') + '"), size=' + num_choices + ', replace=' + replace + ', ordered=' + ordered + ',makespace=' + prob + ')\n');
	}
	echo ('assign("' + dataframe + '", results, .GlobalEnv)\n');
}

function printout () {
	echo('rk.header ("Espacio probabil&iacute;stico de la extracci&oacute;n de una urna", parameters=list("Objetos en la urna" = "');
	if (objects=="num") {
		echo('1:' + num_objects);
	}
	else {
		echo(list_objects);
	}
	echo('", "N&uacute;mero de extracciones" = "' + num_choices + '"');
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



