//author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var options, baroptions, plotoptions, headeroptions;

function preprocess () {
	echo('require(rk.Teaching)\n');
}

function set_options() {
	var var1 = getValue ("var1");
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

	baroptions = '';
	plotoptions = '';
	headeroptions = '';
	headeroptions += '"Variable", rk.get.description (' + var1 + ')';
	if (options['grouped']) headeroptions += ', "Grouping", "' + options['grouping'] + '"';
	if (options['rel']){
		headeroptions += ', "Frecuencia relativa", "Si"';
		baroptions += ', rel=TRUE';
		plotoptions += ', ylab="Frecuencia relativa';
	} else {
		headeroptions += ', "Frecuencia relativa", "No"';
		plotoptions += ', ylab="Frecuencia absoluta';
	}
	if (options['cum']){
		headeroptions += ', "Frecuencia acumulada", "Si"';
		baroptions += ', cum=TRUE';
		plotoptions += ' acumulada"';
	} else {
		headeroptions += ', "Frecuencia acumulada", "No"';
		plotoptions += '"';
	}
	if (options['poly']){
		headeroptions += ', "Pol&iacute;gono", "Si"';
		baroptions += ', poly=TRUE';
	} else {
		headeroptions += ', "Pol&iacute;gono", "No"';
	}
	if (options['juxtaposed']) baroptions += ', beside=TRUE';
	if (options['legend']) baroptions += ', legend.text=TRUE';
	if (options['labels']) baroptions += ', ylim = yrange';
	//Colors
	options['colors'] = getValue ("colors");
	if (options['colors'] == 'rainbow') {
		plotoptions += ', col=rainbow (if(is.matrix(counts)) dim(counts) else length(counts))';
	}
}


function printout () {
	doPrintout (true);
}

function preview () {
	doPrintout (false);
}

function doPrintout (full) {
	set_options();
	// construct the main call to barplot
	var main_call = 'barGraph(counts' + baroptions + plotoptions;
	main_call += getValue ('plotoptions.code.printout');
	main_call += ")\n";

	var plot_pre = getValue ('plotoptions.code.preprocess');
	var plot_adds = getValue ('plotoptions.code.calculate');

	// now print everything as needed
	var var1 = getValue ("var1");
	var names_mode = getValue ("names_mode");
	var limit = getValue ("limit.checked");
	var limit_header = "";
	if (limit) limit_header = ", " + getValue ('limit_options.parameters');


	if (options['grouped']) {
		var groups = getValue ("groups").split ("\n");
		echo('counts <- table(' + var1 + ', ' + groups + ')\n');
	} else {
		echo('counts <- table(' + var1 + ')\n');
	}

	if (limit) {
		echo (getValue ('limit_options.code.calculate'));
	}

	if (names_mode == "rexp") {
		echo ("names(counts) <- " + getValue ("names_exp") + "\n");
	} else if (names_mode == "custom") {
		echo ("names(counts) <- c (\"" + str_replace (";", "\", \"", trim (getValue ("names_custom"))) + "\")\n");
	}

	if (full) {
		echo ('rk.header ("Diagrama de barras", list (' + headeroptions + limit_header + '))\n');
		echo ('\n');
		echo ('rk.graph.on ()\n');
	}

	echo ('try ({\n');
	echo (plot_pre);

	if (options['labels']) {
		echo ('# adjust the range so that the labels will fit\n');
		echo ('yrange <- range (counts, na.rm=TRUE) * 1.2\n');
		echo ('if (yrange[1] > 0) yrange[1] <- 0\n');
		echo ('if (yrange[2] < 0) yrange[2] <- 0\n');

		echo ("bplot <- ");
	}

	echo (main_call);

	if (options['labels']) {
		echo ('text (bplot,counts, labels=counts, pos=' + options['place'] + ', offset=.5)');
		echo ("\n");
	}

	echo (plot_adds);
	echo ('})\n');

	if (full) {
		echo ('rk.graph.off ()\n');
	}
}

