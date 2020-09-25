// author: Alfredo Sánchez Alberca (asalber@ceu.es)
var spaces, save;

function preprocess(){
	echo('require(rkTeaching)\n');
}


function calculate () {
	spaces = getList("spaces");
	save= getString("save");
	echo('result <- combine.probspace(' + spaces + ')\n');
	echo ('assign("' + save + '", result, .GlobalEnv)\n');
}


function printout () {
	echo('rk.header ("Combinaci&oacute;n de espacios probabil&iacute;sticos independientes", parameters=list("Espacios probabil&iacute;sticos combinados" = "' + spaces + '", "Espacio probabil&iacute;stico resultante" = "' + save + '"))\n');
}
