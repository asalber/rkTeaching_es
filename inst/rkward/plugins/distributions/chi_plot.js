// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var options;

include ('plot_dist_common.js');

function getParameters () {
	options['df'] = getString("df");
	getContRangeParameters ();

	if (options['is_density']) {
		options['fun'] = "dchisq";
	} else {
		options['fun'] = "pchisq";
	}
}

function doHeader () {
	echo ('rk.header ("Funci&oacute;n de ' + options['label'] + ' Chi-cuadrado", list ("Grados de libertad"= "' + options['df'] + '"))\n');
}

function doFunCall () {
	echo (options['fun'] + '(x, df=' + options['df'] + ')');
}

