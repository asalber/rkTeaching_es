// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var vars, varnames, data, statistics, groups, groupsnames, filter;

function preprocess(){
	echo('require(rk.Teaching)\n');
}

function calculate () {
	// Load variables
	var narm = "na.rm=FALSE";
	if (getBoolean("narm")) narm = "na.rm=TRUE";
	vars = getList("variables");
	varnames = getList("variables.shortname");
	data = vars.join();
	data = data.split('[[')[0];
	// Filter
	if (getBoolean("filter_frame.checked")){
		filter = getString("filter");
		echo (data + ' <- subset(' + data + ', subset=' + filter + ')\n');
	}
	
	statistics = getString("min") + getString("max") + getString("mean") + getString("median") + getString("mode") + getString("variance") + getString("unvariance") + getString("stdev") + getString("sd") + getString("cv") + getString("range") + getString("iqrange") + getString("skewness") + getString("kurtosis");
	if (getBoolean("quartile") || getString("quantiles")!=''){
		statistics += "'quantiles',";
	}
	statistics = 'c(' + statistics.slice(0, -1) + ')';
	var quantiles = 'c(';
	if (getBoolean("quartile")){
		quantiles += '0.25, 0.5, 0.75 ';
		if (getString("quantiles")!= '')
			quantiles += ', ';
	}
	quantiles += getString("quantiles") + ')';
	groups = '")]';
	if (getBoolean("grouped")) {
		groupsnames = getList("groups.shortname");
		groups = '",' + groupsnames.map(quote) + ')], groups=c(' + groupsnames.map(quote) + ')';
	}
	echo ('result <- descriptiveStats(' + data + '[c("' + varnames.join('","') + groups + ', statistics=' + statistics + ', quantiles= ' + quantiles + ')\n');
	
}

function printout () {
	echo ('rk.header ("Estad&iacute;sticos descriptivos de ' + varnames.join(', ') + '"');
	echo (', parameters=list("Variables" = rk.get.description(' + vars + ', paste.sep=", ")');
	if (getBoolean("filter_frame.checked")){
		echo(", 'Filtro' = '" + getString("filter") + "'");
	}
	if (getBoolean("grouped")) {
		echo(', "Variable(s) de agrupaci&oacute;n" = rk.get.description(' + getList("groups") + ',paste.sep=", ")');
	}
	echo (', "Eliminar valores desconocidos" = ');
	if (getBoolean("narm")) echo ('"Si"');
	else echo ('"No"');
	echo ('))\n');
	if (getBoolean("grouped")){
		echo('for (i in 1:length(result)){\n');
		echo('\t rk.header(paste("Grupo ' + groupsnames.join('.') + ' = ", names(result)[i]),level=3)\n');
		echo('\t\t rk.results(result[[i]])\n');
		echo('}\n');
	}
	else {
		echo('\t\t rk.results(result)\n');
	}

}

