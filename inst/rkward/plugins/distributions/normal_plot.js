// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var mean, sd, fun;

include ('plot_dist_common.js');

function getParameters () {
	mean = getString("mean");
	sd = getString("sd");
	min = parseFloat(mean)-3*parseFloat(sd);
	max = parseFloat(mean)+3*parseFloat(sd);
	setContParameters();
	if (density) {
		fun = "dnorm";
	} else {
		fun = "pnorm";
	}
}

function doHeader () {
	echo ('rk.header ("Funci&oacute;n de ' + label + ' Normal N(' + mean + ',' + sd + ')", list ("Media"= "' + mean + '", "Desviaci&oacute;n T&iacute;pica" = "' + sd + '"))\n');
}

function doFunCall () {
	echo ('p <- qplot(c(' + min + ',' + max + '), geom="blank") + stat_function(fun=' + fun + ', colour="#FF5555", args=list(mean=' + mean + ', sd=' + sd + '))');
}

