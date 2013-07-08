//author: Alfredo Sánchez Alberca (asalber@ceu.es)

//globlas
var variable;

function preprocess(){
	// add requirements etc. here
	echo("require(rk.Teaching)\n");
}

function calculate(){
	variable = getString("variable");
	if (getBoolean("filter_frame.checked")){
		var data = variable.split('[[')[0];
		var variableName = getString("variable.shortname");
		var filter = getString("filter");
		echo ('data <- subset(' + data + ', subset=' + filter + ')\n');
		echo ('result <- frequencyTable (data[["' + variableName + '"]])\n');
	}
	else {
		echo('result <- frequencyTable (' + variable + ')\n');
	}
}

function printout(){
	// printout the results
	echo('rk.header("Tabla de frecuencias", parameters=list("Variable" = rk.get.description (' + variable + ')');
	if (getBoolean("filter_frame.checked")){
		echo(", 'Filtro' = '" + getString("filter") + "'");
	}
	echo ('))\n');
	echo('if (is.numeric(' + variable + '))\n');
	echo('\t rk.results(setNames(list(rownames(result),result[,1],result[,2],result[,3],result[,4]),c(rk.get.description (' + variable + '), "Frec.Abs.","Frec.Rel.","Frec.Abs.Acum.","Frec.Rel.Acum.")))\n');
	echo('else\n');
	echo('\t rk.results(setNames(list(rownames(result),result[,1],result[,2]),c(rk.get.description (' + variable + '), "Frec.Abs.","Frec.Rel.")))\n');
// Para mostrar la interpretación con un botón	
//	echo('rk.print("<a href=\\"javascript:unhide(\'interpretation\');\\" class=\\"button\\">Interpretaci&oacute;n</a>")\n');
//	echo('rk.print("<div id=\\"interpretation\\">Frecuencia absoluta $n_i$: Es el número de veces que se repite el valor en la muestra </div>")\n');
}

