// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var umin, umax, range;

include ('plot_dist_common.js');

function getParameters () {
	umin = getString("min");
	umax = getString("max");
	range = parseFloat(umax)-parseFloat(umin);
	min = parseFloat(umin)-range/10;
	max = parseFloat(umax)+range/10;
	setContParameters();
}

function doHeader () {
	echo ('rk.header ("Funci&oacute;n de ' + label + ' Uniforme continua U(' + umin + ',' + umax + ')", list ("M&iacute;nimo"= "' + umin + '", "M&aacute;ximo" = "' + umax + '"))\n');
}

function doFunCall () {
	echo('')
	if (density) {
		echo ('p <- qplot(x=c(' + min + ',' + umin + ',' + umin + ',' + umax + ',' + umax + ',' + max + '), y=c(0,0,' + 1/range + ',' + 1/range + ',0,0), geom="line", colour=I("#FF5555"))');
	}
	else {
		echo ('p <- qplot(x=c(' + min + ',' + umin + ',' + umax + ',' + max + '), y=c(0,0,1,1), geom="line", colour=I("#FF5555"))');
	}
}
