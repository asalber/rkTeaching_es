// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var dni;

function preprocess(){
	echo('require(rkTeaching)\n');
	// add requirements etc. here
}

function calculate () {
	dni = getValue("dni");
	echo('data(perdida.progenitores, package="rkTeaching")\n');
	echo('set.seed(' + dni + ')\n');
	echo('perdida.progenitores$Somatizacion <- perdida.progenitores$Somatizacion + round(runif(length(perdida.progenitores$Somatizacion),-2,2))\n');
	echo('perdida.progenitores$Obsesion <- perdida.progenitores$Obsesion + round(runif(length(perdida.progenitores$Obsesion),-2,2))\n');
	echo('perdida.progenitores$Sensibilidad <- perdida.progenitores$Sensibilidad + round(runif(length(perdida.progenitores$Sensibilidad),-2,2))\n');
	echo('perdida.progenitores$Depresion <- perdida.progenitores$Depresion + round(runif(length(perdida.progenitores$Depresion),-2,2))\n');
	echo('perdida.progenitores$Ansiedad <- perdida.progenitores$Ansiedad + round(runif(length(perdida.progenitores$Ansiedad),-2,2))\n');
	echo('perdida.progenitores$Hostilidad <- perdida.progenitores$Hostilidad + round(runif(length(perdida.progenitores$Hostilidad),-2,2))\n');
	echo('perdida.progenitores$Fobia <- perdida.progenitores$Fobia + round(runif(length(perdida.progenitores$Fobia),-2,2))\n');
	echo('perdida.progenitores$Paranoias <- perdida.progenitores$Paranoias + round(runif(length(perdida.progenitores$Paranoias),-2,2))\n');
	echo('perdida.progenitores$Psicotico <- perdida.progenitores$Psicotico + round(runif(length(perdida.progenitores$Psicotico),-2,2))\n');
	echo('perdida.progenitores$Global <- perdida.progenitores$Global + round(runif(length(perdida.progenitores$Global),-2,2))\n');
	echo('perdida.progenitores$Vulnerabilidad <- perdida.progenitores$Vulnerabilidad + round(runif(length(perdida.progenitores$Vulnerabilidad),-2,2))\n');
	echo('perdida.progenitores$Vulnerabilidad.muerte <- perdida.progenitores$Vulnerabilidad.muerte + round(runif(length(perdida.progenitores$Vulnerabilidad.muerte),-2,2))\n');
	echo('perdida.progenitores$Apoyo <- perdida.progenitores$Apoyo + round(runif(length(perdida.progenitores$Apoyo),-2,2))\n');

	echo('.GlobalEnv$perdida.progenitores.' + dni + '<- perdida.progenitores\n');
	echo('rm(perdida.progenitores,envir=.GlobalEnv)\n');
}

function printout () {
	echo('rk.header ("Datos del trabajo de estad&iacute;stica", parameters=list("Nombre del conjunto de datos" = "perdida.progenitores.' + dni + '"))\n');
	echo('rk.print("Se ha generado un nuevo conjunto de datos en el espacio de trabajo.")\n');
}

