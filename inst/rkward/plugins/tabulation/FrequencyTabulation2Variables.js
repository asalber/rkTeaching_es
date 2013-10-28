//author: Alfredo Sánchez Alberca (asalber@ceu.es)

var data, varrows, varcolumns, varrowsname, varcolumnsname, groupsnames;

function preprocess(){
	// add requirements etc. here
	echo("require(plyr)\n");
}

function calculate(){
	// Filter
	echo(getString("filter_embed.code.calculate"));
	// Load variables
	varrows = getString("var_rows");
	varcolumns = getString("var_columns");
	data = varrows.split('[[')[0];
	varrowsname = getString("var_rows.shortname");
	varcolumnsname = getString("var_columns.shortname");
	if (getBoolean("intervals_rows_frame.checked")){
		echo(varrows + '<-' + 'cut(' + varrows  + getString("cells_rows.code.calculate") + ', include.lowest=TRUE)\n');
	}
	if (getBoolean("intervals_columns_frame.checked")){
		echo(varcolumns + '<-' + 'cut(' + varcolumns  + getString("cells_columns.code.calculate") + ', include.lowest=TRUE)\n');
	}
	if (getBoolean("grouped")) {
		groups = getList("groups");
		groupsnames = getList("groups.shortname");
		if (getBoolean("relative_freq")){
			if (getBoolean("marginal_freq")){
				echo('result <- dlply(' + data + ', c(' + groupsnames.map(quote) + '), function(x) with(x,round(addmargins(prop.table(table(' + varrowsname + ', ' + varcolumnsname + '))),4)))\n');
			}
			else{
				echo('result <- dlply(' + data + ', c(' + groupsnames.map(quote) + '), function(x) with(x,round(prop.table(table(' + varrowsname + ', ' + varcolumnsname + ')),4)))\n');
			}
		}
		else{
			if (getBoolean("marginal_freq")){
				echo('result <- dlply(' + data + ', c(' + groupsnames.map(quote) + '), function(x) with(x,addmargins(table(' + varrowsname + ', ' + varcolumnsname + '))))\n');
			}
			else{
				echo('result <- dlply(' + data + ', c(' + groupsnames.map(quote) + '), function(x) with(x,table(' + varrowsname + ', ' + varcolumnsname + ')))\n');
			}
		}
	}
	else{
		if (getBoolean("relative_freq")){
			echo('result <- with(' + data + ', prop.table(table(' + varrowsname + ', ' + varcolumnsname + ')))\n'); 
		}
		else {
			echo('result <- with(' + data + ', table(' + varrowsname + ', ' + varcolumnsname + '))\n'); 
		}
		if (getBoolean("marginal_freq")){
			echo('result <- addmargins(result)\n');
		}
		echo('result <- round(result,4)\n');
	}

}

function printout(){
	// printout the results
	echo('rk.header(');
	if (getBoolean("relative_freq")){
		echo('"Tabla bidimensional de frecuencias relativas de ' + varrowsname + ' y ' + varcolumnsname + '"');
	}
	else {
		echo('"Tabla bidimensional de frecuencias absolutas de ' + varrowsname + ' y ' + varcolumnsname + '"');
	}
	echo(', parameters=list("Variable de las filas" = rk.get.description (' + varrows + ')' + ', "Variable de las columnas" = rk.get.description (' + varcolumns + ')' + getString("filter_embed.code.printout"));
	if (getBoolean("grouped")) {
		echo(', "Variable(s) de agrupaci&oacute;n" = rk.get.description(' + groups + ',paste.sep=", ")');
	}
	echo('))\n');
	if (getBoolean("grouped")){
		echo('for (i in 1:length(result)){\n');
		echo('\t rk.header(paste("Grupo ' + groupsnames.join('.') + ' = ", names(result)[i]),level=3)\n');
		echo('\t\t rk.results(result[[i]])\n');
		echo('}\n');
	}
	else {
		echo('\t rk.results(result)\n');
	}
// Para mostrar la interpretación con un botón	
//	echo('rk.print("<a href=\\"javascript:unhide(\'interpretation\');\\" class=\\"button\\">Interpretaci&oacute;n</a>")\n');
//	echo('rk.print("<div id=\\"interpretation\\">Frecuencia absoluta $n_i$: Es el número de veces que se repite el valor en la muestra </div>")\n');
}

