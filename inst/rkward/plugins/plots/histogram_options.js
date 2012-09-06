//author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var plotoptions;
var headeroptions;

function makeCodes () {
	plotoptions = "";
	headeroptions = "";

	var density = getValue ("density");
	if (density) {
		plotoptions += ", freq=FALSE";
		headeroptions += ', "Escala", "Densidad"';
		var plotdensity = getValue ("plotdensity");
		if (plotdensity){
			var bw =  getValue ("bw");
			var adjust = getValue ("adjust");
			var narm = getValue ("narm");
			var resolution = getValue ("resolution");
			headeroptions += ', "Anchura de las bandas de densidad", "' + bw + '", "Density adjust", ' + adjust + ', "Density resolution", ' + resolution;
			if (narm='TRUE') headeroptions += ', "Eliminar valores desconocidos", "Yes"';
			else headeroptions += ', "Eliminar valores desconocidos", "No"';
		}
	} else {
		var rel = getValue ("rel");
		var cum = getValue ("cum");
		if (rel) {
			plotoptions += ", rel=TRUE";
			if (cum){
				plotoptions += ", cum=TRUE";
				headeroptions += ', "Escala", "Frecuencia relativa acumulada"';
			}
			else{
				headeroptions += ', "Escala", "Frecuencia relativa"';
			}
		} else {
			if (cum){
				plotoptions += ", cum=TRUE";
				headeroptions += ', "Escala", "Frecuencia absoluta acumulada"';
			}
			else{
				headeroptions += ', "Escala", "Frecuencia absoluta"';
			}
		}
			
		var poly = getValue ("poly");
		if (poly) {
			plotoptions += ", poly=TRUE";
			headeroptions += ', "Pol&iacute;gono", "Yes"';
		} else {
			headeroptions += ', "Pol&iacute;gono", "No"';
		}
	}
	// Frequency labels
	if (getValue ("freqlabels")) plotoptions += ", labels=TRUE";
}

function preprocess () {
	makeCodes();
	
}

function calculate () {
	// makeCodes() has already run
	echo (plotoptions);
}

function printout () {
	// makeCodes() has already run
	echo (headeroptions);
}

