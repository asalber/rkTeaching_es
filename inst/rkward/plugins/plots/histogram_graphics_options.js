//author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var histcalcoptions;
var histplotoptions;
var headeroptions;

function makeCodes () {
	histcalcoptions = ", breaks=";
	histplotoptions = "";
	headeroptions = "";
	var var1 = getValue ("var1");

	var histbreaks = getValue ("histbreaksFunction");
	headeroptions += ', "Break points", "';
	if (histbreaks == "cells") {
		histcalcoptions += getValue ("histbreaks_ncells");
		headeroptions += 'Approximately ' + getValue ("histbreaks_ncells") + ' cells"';
	} else if (histbreaks == "int") {
		histcalcoptions += "seq (floor (min (" + var1 + ", na.rm=TRUE))-0.5, ceiling (max (" + var1 + ", na.rm=TRUE))+0.5)";
		headeroptions += 'Integers"';
	} else if (histbreaks == "vec") {
		histcalcoptions += "(function(x) {y = extendrange(x,f=0.1); seq(from=y[1], to=y[2], length=" + getValue ("histbreaks_veclength") + ")})(" + var1 + ")";
		headeroptions += 'Equally spaced vector of length ' + getValue ("histbreaks_veclength") + '"';
	} else {
		histcalcoptions += "\"" + histbreaks + "\"";
		headeroptions += histbreaks + '"';
	}

	var right = getValue ("rightclosed");
	if (right) {
		headeroptions += ', "Right closed", "TRUE"';
		histcalcoptions += ", right=TRUE";
	} else {
		headeroptions += ', "Right closed", "FALSE"';
		histcalcoptions += ", right=FALSE";
	}

	var inclowest = getValue ("include_lowest");
	if (!inclowest) {
		headeroptions += ', "Include in lowest cell", "FALSE"';
		histcalcoptions += ", include.lowest=FALSE";
	} else {
		headeroptions += ', "Include in lowest cell", "TRUE"';
	}

	var rel = getValue ("rel");
	if (rel) {
		histplotoptions += ", rel=TRUE";
		headeroptions += ', "Relative frequency", "Yes"';
	} else {
		headeroptions += ', "Relative frequency", "No"';
	}
	
	var cum = getValue ("cum");
	if (cum) {
		histplotoptions += ", cum=TRUE";
		headeroptions += ', "Cumulative frequency", "Yes"';
	} else {
		headeroptions += ', "Cumulative frequency", "No"';
	}

	var poly = getValue ("poly");
	if (poly) {
		histplotoptions += ", poly=TRUE";
		headeroptions += ', "Polygon", "Yes"';
	} else {
		headeroptions += ', "Polygon", "No"';
	}

	var addbars = getValue ("addtoplot");
	if (addbars) histplotoptions += ", add=TRUE";

	var labels = getValue ("barlabels");
	if (labels) histplotoptions += ", labels=TRUE";

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
}

function preprocess () {
	makeCodes();

	echo (headeroptions);
}

function calculate () {
	// makeCodes() has already run

	echo (histcalcoptions);
}

function printout () {
	// makeCodes() has already run

	echo (histplotoptions);
}

