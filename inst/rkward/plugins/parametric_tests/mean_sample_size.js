// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var sd, conflevel, error, errortype;

function preprocess () {
	echo('require(rkTeaching)\n');
}

function calculate () {
	sd = getString("sd");
	conflevel = getString("conflevel");
	error = getString("error");
	errortype = getString("error_type");	
	echo('result <- sampleSizeOneMean(mean=, sd=' + sd + ', sig.level= 1-' + conflevel + ', error=' + error + ',error.type="' + errortype + '")\n');
}

function printout () {
	echo ('rk.header ("C&aacute;lculo del tama&ntilde;o muestral para estimar una media", ');
	echo ('parameters=list ("Desviaci&oacute;n t&iacute;pica poblacional" = "' + sd + '", "Nivel de confianza" ="' + conflevel + '", "Error" = "&#177;' + error );
	if (errortype=="relative") echo (' %');
	echo('"))\n');
	echo ('rk.results (list("Tama&ntilde;o muestral necesario"= result$n))\n');
}


