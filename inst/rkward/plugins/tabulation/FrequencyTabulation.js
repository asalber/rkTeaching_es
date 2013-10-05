// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var variable;

function preprocess(){
	// add requirements etc. here
	echo('require(rk.Teaching)\n');
}

function calculate(){
	variable = getString("variable");
	data = variable.split('[[')[0];
	variablename = getString("variable.shortname");
	// Filter
	echo(getString("filter_embed.code.calculate"));
	// Calculate frequencies 
	// Intervals
	if (getBoolean("intervals_frame.checked")){
		echo('result <- frequencyTableIntervals(' + data + ', ' + quote(variablename) + getString("cells.code.calculate")); 
	}
	// Non intervals
	else{
		echo('result <- frequencyTable(' + data + ', ' + quote(variablename)); 
	}
	// Grouped mode
	if (getBoolean("grouped")) {
		groups = getList("groups");
		groupsname = getList("groups.shortname");
		echo(', groups=c(' + groupsname.map(quote) + ')');
	}
	echo(')\n');
}

function printout(){
	// printout the results
	echo('rk.header("Tabla de frecuencias de ' + variablename + '", ');
	echo('parameters=list("Variable" = rk.get.description(' + variable + ')' + getString("filter_embed.code.printout"));
	if (getBoolean("intervals_frame.checked")){
		echo(getString("cells.code.printout"));
	}
	if (getBoolean("grouped")) {
		echo(', "Variable(s) de agrupaci&oacute;n" = rk.get.description(' + groups + ',paste.sep=", ")');
	}
	echo ('))\n');
	if (getBoolean("grouped")){
		echo('for (i in 1:length(result)){\n');
		echo('\t rk.header(names(result)[i],level=3)\n');
		echo('\t\t rk.results(result[[i]])\n');
		echo('}\n');
	}
	else {
		echo('rk.results(result)\n');
	}
}

