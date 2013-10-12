// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var size, prob;

include ('plot_dist_common.js');

function getParameters() {
	size = getString ("size");
	prob = getString ("prob");
	setDistParameters()
		if (density) {
		fun = "dbinom";
	} else {
		fun = "pbinom";
	}
	min = 0;
	max = parseInt(getString("size"));
	n = max+1;
}

function doHeader () {
	echo ('rk.header ("Funci&oacute;n de ' + label + ' Binomial B(' + size + ',' + prob + ')", list ("N&uacute;mero de repeticiones"= "' + size + '", "Probabilidad de &eacute;xito" = "' + prob + '"))\n');
}

function doFunCall () {
	echo('ylim <- max(' + fun + '(seq(' + min + ',' + max + '), size=' + size + ', prob=' + prob + '))\n');
	echo('p <- qplot(c(' + min + ',' + max + '), geom="blank") + stat_function(fun=' + fun + ', colour="#FF5555", n=' + n + ', geom="point", size=I(3), args=list(size=' + size + ', prob=' + prob + ')) + ylim(0,ylim)');
}

