// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var sd, conflevel, error, errortype;

function preprocess () {
	echo('require(rkTeaching)\n');
}

function calculate () {
	p = getString("p");
	conflevel = getString("conflevel");
	error = getString("error");
	echo('result <- sampleSizeOneProportion(p=' + p + ', sig.level= 1-' + conflevel + ', error=' + error + ')\n');
}

function printout () {
	echo ('rk.header ("C&aacute;lculo del tama&ntilde;o muestral para estimar una proporci&oacute;n", ');
	echo ('parameters=list ("Estimaci&oacute;n de la proporci&oacute;n poblacional" = "' + p + '", "Nivel de confianza" ="' + conflevel + '", "Error" = "&#177;' + error + '"))\n');
	echo ('rk.results (list("Tama&ntilde;o muestral necesario"= result$n))\n');
}


