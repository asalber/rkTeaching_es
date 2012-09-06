// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var variable, newvar, rules;

function preprocess(){
	// add requirements etc. here
	echo("require(car)\n");
}

function calculate () {
	variable = getValue("var");
	newvar = getValue("save")
	rules = getValue("rules");
	rules = rules.replace(/\n/gi,'; ');
	echo ('.GlobalEnv$' + newvar + ' <- recode(' + variable + ", '" + rules + "'");
	if (getValue("asfactor")) echo (', as.factor.result=TRUE');
	echo (')\n');	
}

function printout () {
	echo ('rk.header ("Recodificaci&oacute;n de variable", parameters=list("Variable recodificada" = rk.get.description(' + variable + "), 'Reglas de recodificaci&oacute;n' = '" + rules + "', 'Nueva variable' = rk.get.description(" + newvar + ")))\n");
}

