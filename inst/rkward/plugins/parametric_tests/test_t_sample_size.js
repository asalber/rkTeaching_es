// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var delta, sd, siglevel, power, type, h1;

function preprocess () {
}


function calculate () {
	delta = getValue("delta");
	sd = getValue("sd");
	siglevel = getValue("siglevel");
	power = getValue("power");
	type = getValue ("type");
	h1 = getValue("h1")
	echo('result <- power.t.test(delta=' + delta + ', sd=' + sd + ', sig.level=' + siglevel + ', power=' + power + ', type="' + type + '", alternative="' + h1 + '")\n');
}

function printout () {
	echo ('rk.header ("C&aacute;lculo del tama&ntilde;o muestral para el test t", parameter=list(');
	if (type=="one.sample") echo ('"Tipo de prueba" = "Contraste para una muestra"');
	else if (type=="two.sample") echo ('"Tipo de prueba" = "Contraste para dos muestras independientes"');
	else echo ('"Tipo de prueba" = "Contraste para dos muestras pareadas"');
	if (h1=="two.sided") echo (', "Hip&oacute;tesis alternativa" = "Bilateral"');
	else echo (', "Hip&oacute;tesis alternativa" = "Unilateral"');
	echo (', "Diferencia entre las medias" = "' + delta + '", "Desviaci&oacute;n t&iacute;pica" = "' + sd + '", "Nivel de significaci&oacute;n" ="' + siglevel + '", "Potencia" = "' + power + '"))\n');

	echo ('rk.results (list("Tama&ntilde;o muestral necesario"= result$n))\n');
}