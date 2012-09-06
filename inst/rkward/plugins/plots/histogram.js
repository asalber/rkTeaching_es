//author: Alfredo Sánchez Alberca (asalber@ceu.es)

function preprocess(){
	// add requirements etc. here
	echo('require(TeachingExtras)\n');
}

function printout () {
	doPrintout (true);
}

function preview () {
	doPrintout (false);
}

// internal helper functions
function doPrintout (full) {
	var var1 = getValue ("var1");
	
	if (full) {
		echo ('rk.header ("Histograma", parameters=list ("Variable", rk.get.description (' + var1 + ')' + getValue ("histogram_opt.code.printout") + getValue ("cells.code.printout") + '))\n');
		echo ('\n');
		echo ('rk.graph.on ()\n');
	}
	
	var histplotoptions="";
	var histlty = getValue ("histlinetype");
	histplotoptions += ", lty=" + "\"" + histlty + "\"";

	var histbordercol = "";
	if (histlty != "blank") {
		var density = getValue ("density");
		histplotoptions += ", density=" + density;
		if (density > 0) histplotoptions += ", angle=" + getValue ("angle");
		if (getValue ("doborder")) {
			histbordercol = getValue ("histbordercol.code.printout");
		} else {
			histbordercol = ", border=FALSE";
		}
	}

	var histfillcol = "";
	if (getValue ("usefillcol")) histfillcol = getValue ("histfillcol.code.printout");

	histplotoptions += histbordercol + histfillcol;

	echo ('try ({\n');
	echo ('histGraph(' + var1 + getValue ("histogram_opt.code.calculate") + getValue ("cells.code.calculate") + histplotoptions + getValue ("plotoptions.code.printout") + ')\n');
	var plotdensity = getValue ("histogram_opt.plotdensity");
	if (plotdensity){
		var bw =  getValue ("histogram_opt.bw");
		var adjust = getValue ("histogram_opt.adjust");
		var narm = getValue ("histogram_opt.narm");
		var resolution = getValue ("histogram_opt.resolution");
		echo ('lines(density(' + var1 + ', bw="' + bw + '", adjust = ' + adjust + ', na.rm=' + narm + ', n = ' + resolution + ')' + getValue ("histogram_opt.col_density.code.printout") + ')\n');
	}

	
	var plot_adds = getValue ("plotoptions.code.calculate");
	if (plot_adds.length > 0) {
		echo ('\n');
		// print the grid() related code
		printIndented ("\t", plot_adds);
	}

	echo ('})\n');
	if (full) {
		echo ('rk.graph.off ()\n');
	}
}


