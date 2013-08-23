//author: Alfredo Sánchez Alberca (asalber@ceu.es)

var data, variable, variablename;

function preprocess(){
	// add requirements etc. here
	echo("require(rk.Teaching)\n");
}

function calculate(){
	variable = getString("variable");
	data = variable.split('[[')[0];
	variablename = getString("variable.shortname");
	echo(getString("filter_embed.code.calculate"));
	echo('result <- frequencyTable(' + data + ', ' + quote(variablename)); 
	if (getBoolean("grouped")) {
		groups = getList("groups");
		groupsname = getList("groups.shortname");
		echo(', groups=c(' + groupsname.map(quote) + ')');
	}
	echo(')\n');
}

function printout(){
	// printout the results
	echo('rk.header("Tabla de frecuencias", parameters=list("Variable" = rk.get.description (' + variable + ')' + getString("filter_embed.code.printout"));
	if (getBoolean("grouped")) {
		echo(', "Variable(s) de agrupaci&oacute;n" = rk.get.description(' + groups + ',paste.sep=", ")');
	}
	echo('))\n');
	if (getBoolean("grouped")){
		echo('for (i in 1:length(result)){\n');
		echo('\t rk.header(names(result)[i],level=3)\n');
		echo('\t if (is.numeric(' + variable + '))\n');
		echo('\t\t rk.results(result[[i]])\n');
		echo('\t else\n');
		echo('\t\t rk.results(result[[i]][1:3])\n');
		echo('}\n');
	}
	else {
		echo('if (is.numeric(' + variable + '))\n');
		echo('\t rk.results(result)\n');
		echo('else\n');
		echo('\t rk.results(result[1:3])\n');
	}
// Para mostrar la interpretación con un botón	
//	echo('rk.print("<a href=\\"javascript:unhide(\'interpretation\');\\" class=\\"button\\">Interpretaci&oacute;n</a>")\n');
//	echo('rk.print("<div id=\\"interpretation\\">Frecuencia absoluta $n_i$: Es el número de veces que se repite el valor en la muestra </div>")\n');
}

