// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var options;

include ('plot_dist_common.js');

function getParameters () {
	options['df1'] = getValue ("df1");
	options['df2'] = getValue ("df2");
	getContRangeParameters ();

	if (options['is_density']) {
		options['fun'] = "df";
	} else {
		options['fun'] = "pf";
	}
}

function doHeader () {
	echo ('rk.header ("Funci&oacute;n de ' + options['label'] + ' F de Fisher", list ("Grados de libertad del numerador"= "' + options['df1'] + '", "Grados de libertad del denominador" = "' + options['df2'] + '"))\n');
}

function doFunCall () {
	echo (options['fun'] + '(x, df1=' + options['df1'] + ', df2=' + options['df2'] + ')');
}

