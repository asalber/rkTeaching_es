// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var options;

include ('plot_dist_common.js');

function getParameters () {
	options['size'] = getString ("size");
	options['prob'] = getString ("prob");
	options['min'] = 0;
	options['max'] = getString ("size");
	options['n'] = options['max'] - options['min'] + 1;


	if (options['is_density']) {
		options['fun'] = 'dbinom';
		options['label'] = 'probabilidad'; 
	} else {
		options['fun'] = 'pbinom';
		options['label'] = 'distribuci&oacute;n';
	}
}

function doHeader () {
	echo ('rk.header ("Funci&oacute;n de ' + options['label'] + ' Binomial", list ("N&uacute;mero de repeticiones"= "' + options['size'] + '", "Probabilidad de &eacute;xito" = "' + options['prob'] + '"))\n');
}

function doFunCall () {
	echo (options['fun'] + '(x, size=' + options['size'] + ', prob=' + options['prob'] + ')');
}

