// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var options;

include ('plot_dist_common.js');

function getParameters () {
	options['mean'] = getString("mean");
	options['sd'] = getString("sd");
	getContRangeParameters ();

	if (options['is_density']) {
		options['fun'] = "dnorm";
	} else {
		options['fun'] = "pnorm";
	}
}

function doHeader () {
	echo ('rk.header ("Funci&oacute;n de ' + options['label'] + ' Normal", list ("Media"= "' + options['mean'] + '", "Desviaci&oacute;n T&iacute;pica" = "' + options['sd'] + '"))\n');
}

function doFunCall () {
	echo (options['fun'] + '(x, mean=' + options['mean'] + ', sd=' + options['sd'] + ')');
}

