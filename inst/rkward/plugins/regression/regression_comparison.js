// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, y, xname, yname, filter, groupsname;

function preprocess(){
	echo('require(rkTeaching)\n');
	echo('require(plyr)\n');
}

function calculate() {
    // Filter
	echo(getString("filter_embed.code.calculate"));
	// Load variables
	y = getString("y");
	x = getString("x");
	data = getValue("y").split('[[')[0];
	xname = getString("x.shortname");
	yname = getString("y.shortname");
	var models = getString("linear") + getString("cuadratic") + getString("cubic") + getString("potential") + getString("exponential") + getString("logarithmic") + getString("inverse") + getString("sigmoid");
	models = models.slice(0, -1);
	// Grouped mode
	if (getBoolean("grouped")) {
		groups = getList("groups");
		groupsname = getList("groups.shortname");
		echo(data + ' <- transform(' + data + ', .groups=interaction(' + data + '[,c(' + groupsname.map(quote) + ')]))\n');
		echo('result <- dlply(' + data + ', ".groups", function(df) regcomp(df[["' + yname + '"]], df[["' + xname + '"]]' + ', models=c(' + models + ')))\n');
	}
	else{
		echo ('result <- regcomp(' + y + ', ' + x + ', models=c(' + models + '))\n');
	}
}

function printout () {
	echo ('rk.header ("Comparaci&oacute;n de modelos de regresi&oacute;n de ' + yname + ' sobre ' + xname + '", parameters=list("Variable dependiente" = rk.get.description(' + y + '), "Variable independiente" = rk.get.description(' + x + ')' + getString("filter_embed.code.printout") + "))\n");
	// Grouped mode
	if (getBoolean("grouped")){
		echo('for (i in 1:length(result)){\n');
		echo('\t rk.header(paste("Grupo ' + groupsname.join('.') + ' = ", names(result)[i]),level=3)\n');
		echo('\t rk.results(result[[i]])\n');
		echo('}\n');
	}
	else{
		echo('rk.results(result)\n');
	}
}

