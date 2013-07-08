// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var options;

include ('plot_dist_common.js');

function getParameters () {
	options['min'] = getString("min");
	options['max'] = getString("max");
	getContRangeParameters ();

	if (options['is_density']) {
		options['fun'] = "dunif";
	} else {
		options['fun'] = "punif";
	}
}

function doHeader () {
	echo ('rk.header ("Funci&oacute;n de ' + options['label'] + ' Uniforme", list ("M&iacute;nimo"= "' + options['min'] + '", "M&aacute;ximo" = "' + options['max'] + '"))\n');
}

function doFunCall () {
	echo (options['fun'] + '(x, min=' + options['min'] + ', max=' + options['max'] + ')');
}

