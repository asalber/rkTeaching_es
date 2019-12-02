// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var variable, newvar, rules;

function preprocess(){
	// add requirements etc. here
	echo("require(car)\n");
}

function calculate () {
	variable = getString("variable");
	newvar = getString("save")
	rules = getString("rules");
	rules = rules.replace(/\n/gi,'; ');
	echo ('.GlobalEnv$' + newvar + ' <- car::recode(' + variable + ", '" + rules + "'");
	if (getBoolean("asfactor")) echo (', as.factor=TRUE');
	else echo (', as.factor=FALSE');
	echo (')\n');	
}

function printout () {
	echo ('rk.header ("Recodificaci&oacute;n de variable", parameters=list("Variable recodificada" = rk.get.description(' + variable + "), 'Reglas de recodificaci&oacute;n' = '" + rules + "', 'Nueva variable' = rk.get.description(" + newvar + ")))\n");
}

