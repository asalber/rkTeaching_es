//author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var options;
var baroptions;
var plotoptions;
var headeroptions;

function preprocess () {
}

function set_options() {
	var var1 = getValue ("vars");
	// first fetch all relevant options
	options = new Array();

	options['rel'] = getValue("rel");
	options['cum'] = getValue("cum");
	options['poly'] = getValue("poly");
	options['grouped'] = getValue("grouped");
	options['grouping'] = getValue ("grouping");
	if (options['grouping'] == "juxtaposed") {
		options['juxtaposed'] = true;
		options['labels'] = getValue ("labels");
		if (options['labels']) {
			options['place'] = getValue ("place");
		}
	} else {
		options['labels'] = false;
		options['juxtaposed'] = false;
	}
	options['legend'] = getValue ("legend");

	baroptions = "";
	plotoptions = "";
	headeroptions = "";
	headeroptions += '"Variable", rk.get.description (' + var1 + ')';
	if (options['grouped']) headeroptions += ', "Grouping", "' + options['grouping'] + '"';
	if (options['rel']){
		headeroptions += ', "Relative frequency", "Yes"';
		baroptions += ', rel=TRUE';
	} else {
		headeroptions += ', "Relative frequency", "No"';
	}
	if (options['cum']){
		headeroptions += ', "Cumulative frequency", "Yes"';
		baroptions += ', cum=TRUE';
	} else {
		headeroptions += ', "Cumulative frequency", "No"';
	}
	if (options['poly']){
		headeroptions += ', "Polygon", "Yes"';
		baroptions += ', poly=TRUE';
	} else {
		headeroptions += ', "Polygon", "No"';
	}
	if (options['juxtaposed']) baroptions += ', beside=TRUE';
	if (options['legend']) baroptions += ', legend.text=TRUE';
	if (options['labels']) baroptions += ', ylim = yrange';
	//Colors
	options['colors'] = getValue ("colors");
	if (options['colors'] == 'rainbow') {
		plotoptions = ', col=rainbow (if(is.matrix(counts)) dim(counts) else length(counts))';
	}
}




function printout () {
	doPrintout (true);
}

function preview () {
	doPrintout (false);
}

function getName(x){
	return x.split('"')[1];
}

function doPrintout (full) {
	var vars = getValue ("vars").split ("\n");
	var title = 'paste(';
	for (i=0; i<vars.length; i++){
		title += 'rk.get.description(' + vars[i] + '),';
	}
	title += 'sep=", ")'; 
	
	vars = vars.join(", ");
	
	var radius = getValue ("radius");
	var angle = getValue ("angle");
	var angle_inc = getValue ("angle_inc");
	var density = getValue ("density");
	var density_inc = getValue ("density_inc");
	var col = getValue ("colors");
	var clockwise = getValue ("clockwise");
	var clockwise_header = "";
	var names_mode = getValue ("names_mode");

	var options = ", clockwise =" + clockwise;
	if ((density >= 0) || (density_inc != 0)) options += ", density =" + density;
	if (density_inc != 0) options += " + " + density_inc + " * 0:length (x)";
	if ((density > 0) || density_inc != 0) {
		options += ", angle =" + angle;
		if (angle_inc != 0) options += " + " + angle_inc + " * 0:length (x)";
	}
	if (radius != 0.8) options += ", radius=" + radius;
	if (col == "rainbow") options += ", col=rainbow (if(is.matrix(x)) dim(x) else length(x))";
	else if (col == "grayscale") options += ", col=gray.colors (if(is.matrix(x)) dim(x) else length(x))";
	options += getValue ("plotoptions.code.printout");

	var plotpre = getValue ("plotoptions.code.preprocess");
	var plotpost = getValue ("plotoptions.code.calculate");

	

	if (full) {
		echo ('rk.header ("Diagrama de sectores", parameters=list ("Variable(s)"=' + title + '))\n');
		echo ('\n');
		echo ('rk.graph.on ()\n');
	}

	echo ('try ({\n');
	if (plotpre.length > 0) printIndented ("\t", plotpre);
	if (names_mode == "rexp") {
		echo ("\tnames(x) <- " + getValue ("names_exp") + "\n");
	} else if (names_mode == "custom") {
		echo ("\tnames(x) <- c (\"" + str_replace (";", "\", \"", trim (getValue ("names_custom"))) + "\")\n");
	}
	
	
	echo ('pie(table(interaction(' + vars + '))' + options + ')\n');
	if (plotpost.length > 0) printIndented ("\t", plotpost);
	echo ('})\n');
	if (full) {
		echo ('rk.graph.off ()\n');
	}
}

