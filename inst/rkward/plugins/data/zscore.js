// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var variables, variablesnames, data;

function preprocess(){
	echo('require("rkTeaching")\n');
}

function calculate () {
	variables = getList("variables");
	data = variables.join();
	data= data.split('[[')[0];
	variablesnames = getList ("variables.shortname");
	for (var i=0; i<variables.length; i++){
		echo(data + '<- transform(' + data + ',' + variablesnames[i] + '.tipificada=(' + variablesnames[i] + '-mean(' + variablesnames[i] + ',na.rm=TRUE))/stdev(' + variablesnames[i] + ',na.rm=TRUE))\n');
	    echo('\t attr(' + data + '[["' + variablesnames[i] + '.tipificada"]],".rk.meta") = NULL\n');
	}
	echo ('.GlobalEnv$' + data + ' <- ' + data + '\n');
}

function printout () {
	echo ('rk.header ("Tipificaci&oacute;n de variables", parameters=list("Variable(s) tipificada(s)" = rk.get.description(' + variables + ', paste.sep=", ")))\n');
}

