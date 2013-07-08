// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var options;

include ('plot_dist_common.js');

function getParameters () {
	options['lambda'] = getString("lambda");
	options['min'] = 0;
	options['max'] = 2*options['lambda']+5;
	options['n'] = options['max'] - options['min'] + 1;


	if (options['is_density']) {
		options['fun'] = "dpois";
		options['label'] = 'probabilidad';
	} else {
		options['fun'] = "ppois";
		options['label'] = 'distribuci&oacute;n';
	}
}

function doHeader () {
	echo ('rk.header ("Funci&oacute;n de ' + options['label'] + ' Poisson", list ("Media"= "' + options['lambda'] + '"))\n');
}

function doFunCall () {
	echo (options['fun'] + '(x, lambda=' + options['lambda'] + ')');
}

