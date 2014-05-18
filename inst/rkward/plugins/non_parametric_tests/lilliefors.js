// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var data, variable, variablename, groups, groupsnames;

function preprocess() {
	echo('require(nortest)\n');
}

function calculate() {
	variable = getString("variable");
	data = variable.split('[[')[0];
	variablename = getString("variable.shortname");
	// Filter
	echo(getString("filter_embed.code.calculate"));
	// Grouped mode
	if (getBoolean("grouped")) {
		groups = getList("groups");
		groupsname = getList("groups.shortname");
		echo(data + ' <- transform(' + data + ', .groups=interaction(' + data
				+ '[,c(' + groupsname.map(quote) + ')]))\n');
		echo('result <- dlply(' + data
				+ ', ".groups", function(df) lillie.test(df[["' + variablename
				+ '"]]))\n');
	} else {
		echo('result <- lillie.test(' + variable + ')\n');
	}
}

function printout() {
	echo('rk.header("Test de normalidad de Lilliefors (Kolmogorov-Smirnov)", parameters=list ("Variable"= rk.get.description('
			+ variable + ')' + getString("filter_embed.code.printout"));
	if (getBoolean("grouped")) {
		echo(', "Variable de agrupaci&oacute;n" = rk.get.description(' + groups
				+ ', paste.sep=", ")');
	}
	echo('))\n');
	// Grouped mode
	if (getBoolean("grouped")) {
		echo('for (i in 1:length(result)){\n');
		echo('\t rk.header(paste("Grupo ' + groupsname.join('.')
				+ ' = ", names(result)[i]),level=3)\n');
		echo('\t rk.results (list(');
		echo('\t "Estad&iacute;stico D" = result[[i]][[1]],');
		echo('\t "p-valor" = result[[i]][[2]]))\n');
		echo('}\n');
	} 
	// Non grouped mode
	else {
		echo('rk.results (list(');
		echo('"Estad&iacute;stico D" = result[[1]],');
		echo('"p-valor" = result[[2]]))\n');
	}
}
