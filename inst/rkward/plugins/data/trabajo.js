// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var dni;

function preprocess(){
	echo('require(rkTeaching)\n');
	// add requirements etc. here
}

function calculate () {
	dni = getValue("dni");
	echo('data(hipertension, package="rkTeaching")\n');
	echo('set.seed(' + dni + ')\n');
	echo('hipertension$ESTRES <- NULL\n')
	echo('hipertension$EDAD <- hipertension$EDAD + round(runif(length(hipertension$EDAD),-2,2))\n');
	echo('hipertension$PESO <- hipertension$PESO + round(runif(length(hipertension$PESO),-2,2))\n');
	echo('hipertension$PAD_INI <- hipertension$PAD_INI + round(runif(length(hipertension$PAD_INI),-2,2))\n');
	echo('hipertension$PAD_FIN <- hipertension$PAD_FIN + round(runif(length(hipertension$PAD_FIN),-2,2))\n');
	echo('hipertension$PAS_INI <- hipertension$PAS_INI + round(runif(length(hipertension$PAS_INI),-2,2))\n');
	echo('hipertension$PAS_FIN <- hipertension$PAS_FIN + round(runif(length(hipertension$PAS_FIN),-2,2))\n');
	echo('.GlobalEnv$hipertension.' + dni + '<- hipertension\n');
	echo('rm(hipertension,envir=.GlobalEnv)\n');
}

function printout () {
	echo('rk.header ("Datos del trabajo de estad&iacute;stica", parameters=list("Nombre del conjunto de datos" = "hipertension.' + dni + '"))\n');
	echo('rk.print("Se ha generado un nuevo conjunto de datos en el espacio de trabajo.")\n');
}

