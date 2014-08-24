// author: Alfredo Sánchez Alberca (asalber@ceu.es)
var probspace, event, conditioned, condition;

function preprocess(){
	echo('require(prob)\n');
}


function calculate () {
	probspace = getString("probspace");
	event = getString("event");
	conditioned = getBoolean("conditioned.state")
	condition = getString("condition")
	echo('results <- Prob(' + probspace + ', event=' + event);
	if (conditioned)
		echo(', given= ' + condition );
	echo(')\n');
		
}


function printout () {
	echo('rk.header("C&aacute;lculo de probabilidades", parameters=list("Espacio probabil&iacute;stico" = "' + probspace + '", "Suceso" = "' + event + '"))\n');
	echo ('rk.results(list("Suceso" = \'' + event + '\'');
	if (conditioned)
		echo(', "Condici&oacute;n" = \'' + condition + '\'');
	echo(', "Probabilidad" = results))\n');
}
