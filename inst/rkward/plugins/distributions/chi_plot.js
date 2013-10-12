// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var df;

include ('plot_dist_common.js');

function getParameters () {
	df = getString("df");
	min = 0;
	max = parseFloat(df)+4*Math.sqrt(2*parseFloat(df));
	setContParameters();
	if (density) {
		fun = "dchisq";
	} else {
		fun = "pchisq";
	}
}

function doHeader () {
	echo ('rk.header ("Funci&oacute;n de ' + label + ' Chi-cuadrado &#967;(' + df + ')", list ("Grados de libertad"= "' + df + '"))\n');
}

function doFunCall () {
	echo ('p <- qplot(c(' + min + ',' + max + '), geom="blank") + stat_function(fun=' + fun + ', colour="#FF5555", args=list(df=' + df + '))');
}

