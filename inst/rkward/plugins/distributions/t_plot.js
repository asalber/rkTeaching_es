// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var df;

include ('plot_dist_common.js');

function getParameters () {
	df = getString("df");
	min = -3.5;
	max = 3.5;
	setContParameters();
	if (density) {
		fun = "dt";
	} else {
		fun = "pt";
	}
}

function doHeader () {
	echo ('rk.header ("Funci&oacute;n de ' + label + ' T de student T(' + df + ')", list ("Grados de libertad"= "' + df + '"))\n');
}

function doFunCall () {
	echo ('p <- qplot(c(' + min + ',' + max + '), geom="blank") + stat_function(fun=' + fun + ', colour="#FF5555", args=list(df=' + df + '))');
}


