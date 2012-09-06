// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, y, data, groups;

function getName(x){
	return x.split('"')[1];
}

function preprocess(){
	// add requirements etc. here
	echo('require(car)\n');
}


function calculate () {
	y = getName(getValue("y"));
	x = getName(getValue("x")); 
	data = getValue("y").split('[[')[0];
	if (getValue("grouped")){
		groups = ' | ' + getName(getValue("groups"));
	}
	
	
/*	
	var type = "";
	if (getValue ("manual_type") == "true") {
		type = getValue ("custom_type");
	} else {
		type = "c ('" + getValue ("pointtype") + "')";
	}
	var col = getValue ("col");
	var pch = getValue ("pch");
	var cex = getValue ("cex");

// verification (is this needed?) ?>
	echo ('if (length(Xvars) != length(Yvars)) {\n');
	echo ('	stop("Unequal number of X and Y variables given")\n');
	echo ('}\n');

	echo ('# find range of X/Y values needed\n');
	echo ('Xrange <- range (c (Xvars), na.rm=TRUE)\n');
	echo ('Yrange <- range (c (Yvars), na.rm=TRUE)\n');
	echo ('\n');
	echo ('type <- rep (' + type + ', length.out=length (Xvars));\n');
	echo ('col <- rep (' + col + ', length.out=length (Xvars));\n');
	echo ('cex <- rep (' + cex + ', length.out=length (Xvars));\n');
	echo ('pch <- rep (' + pch + ', length.out=length (Xvars));\n');
	*/
}

function printout () {
	doPrintout (true);
}

function preview () {
	calculate ();
	doPrintout (false);
}

function doPrintout (full) {
	if (full) {
		echo ('rk.header ("Scatterplot", parameters = list ("X variable", rk.get.description(' + getValue("x") + "), 'Y variable', rk.get.description(" + getValue("y") +  ')))\n');
		echo ('rk.graph.on()\n');
		echo ('\n');
	}
	echo ('scatterplot(' + y + '~' + x + groups + ', reg.line=' + getValue("regression") + ', smooth=' + getValue("smooth") + ', spread=' + getValue("spread") + getValue ("plotoptions.code.printout") + ', data=' + data + ')\n');
	if (full) {
		echo ('\n');
		echo ('rk.graph.off()\n');
	}
}


