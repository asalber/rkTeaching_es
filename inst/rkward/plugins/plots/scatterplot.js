// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, y, data, groups, pointcolor, pointsymbol, facet, smooth, se, smoothcolor, legend, regression, model, formula, equation, typemodel;

function preprocess(){
	echo('require(rk.Teaching)\n');
	echo('require(plyr)\n');
	echo('require(ggplot2)\n');
}


function calculate () {
	// Load variables
	x = getString("x");
	xname = getString("x.shortname");
	y = getString("y");
	yname = getString("y.shortname");
	data = x.split('[[')[0];
	xlab = ', xlab="' + xname + '"';
	ylab = ', ylab="' + yname + '"';
	// Set point color
	pointcolor = getString("pointcolor.code.printout");
	if (pointcolor!='') {
		pointcolor = ', colour=I(' + pointcolor + ')';
	}
	else {
		pointcolor = ', colour=I("#FF9999")'; // Defauklt bar color
	}
	// Set point symbol
	pointsymbol = getString("pointsymbol.code.printout");
	if (pointsymbol!='') {
		pointsymbol = ', shape=I(' + pointsymbol + ')';
	}
	// Set point size
	pointsize = ', size=I(' + getString("pointsize") + ')';
    // Filter
	echo(getString("filter_embed.code.calculate"));
	// Set grouped mode
	facet = '';
	smoothcolor = '';
	legend = '';
	if (getBoolean("grouped")) {
		groups = getList("groups");
		groupsname = getList("groups.shortname");
		echo(data + ' <- transform(' + data + ', groups=interaction(' + data + '[,c(' + groupsname.map(quote) + ')]))\n');	
		if (getString("position")==='faceted') {
			facet = ' + facet_grid(.~groups)';
		}
		else {
			pointcolor = ', colour=groups';
			smoothcolor = ', colour=groups';
			legend = ' + scale_colour_hue("' + groupsname.join('.') + '")';
		}
	}
	// Set regression confidence strip
	if (getBoolean("confidentstrip")){
		se = ', ymin=inf.conf.int.95, ymax=sup.conf.int.95';
	}
	else {
		se = '';
	}
	regression = getBoolean("linear") | getBoolean("cuadratic") | getBoolean("cubic") | getBoolean("potential") | getBoolean("exponential") | getBoolean("logarithmic")  | getBoolean("inverse") | getBoolean("sigmoid")
	smooth='';
	model = [];
	formula='';
	if (regression) {
		echo('df <- data.frame(x=' + x + ', y=' + y);
		if (getBoolean("grouped")) {
			echo(', groups=' + data + '[["groups"]]');
		}
		echo(')\n');
		smooth = '+ scale_linetype("Ajuste de regresi\u00f3n")';
	}
	if (getBoolean("linear")){
		if (getBoolean("grouped")) {
			echo('df_linear <- ddply(df,"groups",function(df) predictions(lm(y~x,data=df),seq(min(df[["x"]]), max(df[["x"]]), length.out=100),interval="confidence"))\n');
		}
		else {
			echo('df_linear <- predictions(lm(y~x,data=df),seq(min(df[["x"]]), max(df[["x"]]), length.out=100),interval="confidence")\n');
		}
		smooth += ' + geom_smooth(aes(x=x, y=pred.y' + se + smoothcolor + ', linetype="Lineal"), data=df_linear, stat="identity")';
		model.push('Lineal (' + yname + ' = a+b*' + xname + ')');
	}
	if (getBoolean("cuadratic")){
		if (getBoolean("grouped")) {
			echo('df_cuadratic <- ddply(df,"groups",function(df) predictions(lm(y~x+I(x^2),data=df),seq(min(df[["x"]]), max(df[["x"]]), length.out=100),interval="confidence"))\n');
		}
		else {
			echo('df_cuadratic <- predictions(lm(y~x+I(x^2),data=df),seq(min(df[["x"]]), max(df[["x"]]), length.out=100),interval="confidence")\n');
		}
		smooth += ' + geom_smooth(aes(x=x, y=pred.y' + se + smoothcolor + ', linetype="Cuadr\u00e1tico"), data=df_cuadratic, stat="identity")';
		model.push('Cuadr&aacute;tico (' + yname + ' = a+b*' + xname + '+c*' + xname + '^2)');
	}
	if (getBoolean("cubic")){
		if (getBoolean("grouped")) {
			echo('df_cubic <- ddply(df,"groups",function(df) predictions(lm(y~x+I(x^2)+I(x^3),data=df),seq(min(df[["x"]]), max(df[["x"]]), length.out=100),interval="confidence"))\n');
		}
		else {
			echo('df_cubic <- predictions(lm(y~x+I(x^2)+I(x^3),data=df),seq(min(df[["x"]]), max(df[["x"]]), length.out=100),interval="confidence")\n');
		}
		smooth += ' + geom_smooth(aes(x=x, y=pred.y' + se + smoothcolor + ', linetype="C\u00fabico"), data=df_cubic, stat="identity")';
		model.push('C&uacute;bico (' + yname + ' = a+b*' + xname + '+c*' + xname + '^2+d*' + xname + '^3)');
	}
	if (getBoolean("potential")){
		if (getBoolean("grouped")) {
			echo('df_potential <- ddply(df,"groups",function(df) predictions(lm(log(y)~log(x),data=df),seq(min(df[["x"]]), max(df[["x"]]), length.out=100),interval="confidence"))\n');
			echo('df_potential[,-2:-1]=exp(df_potential[,-2:-1])\n');
			echo('names(df_potential)[3]="pred.y"\n');
		}
		else {
			echo('df_potential <- predictions(lm(log(y)~log(x),data=df),seq(min(df[["x"]]), max(df[["x"]]), length.out=100),interval="confidence")\n');
			echo('df_potential[,-1]=exp(df_potential[,-1])\n');
			echo('names(df_potential)[2]="pred.y"\n');
		}
		smooth += ' + geom_smooth(aes(x=x, y=pred.y' + se + smoothcolor + ', linetype="Potencial"), data=df_potential, stat="identity")';
		model.push('Potencial (' + yname + ' = a*' + xname + '^b)');
	}
	if (getBoolean("exponential")){
		if (getBoolean("grouped")) {
			echo('df_exponential <- ddply(df,"groups",function(df) predictions(lm(log(y)~x,data=df),seq(min(df[["x"]]), max(df[["x"]]), length.out=100),interval="confidence"))\n');
			echo('df_exponential[,-2:-1]=exp(df_exponential[,-2:-1])\n');
			echo('names(df_exponential)[3]="pred.y"\n');
		}
		else {
			echo('df_exponential <- predictions(lm(log(y)~x,data=df),seq(min(df[["x"]]), max(df[["x"]]), length.out=100),interval="confidence")\n');
			echo('df_exponential[,-1]=exp(df_exponential[,-1])\n');
			echo('names(df_exponential)[2]="pred.y"\n');
		}
		smooth += ' + geom_smooth(aes(x=x, y=pred.y' + se + smoothcolor + ', linetype="Exponencial"), data=df_exponential, stat="identity")';
		model.push('Exponencial (' + yname + ' = exp(a+b*' + xname + '))');
	}
	if (getBoolean("logarithmic")){
		if (getBoolean("grouped")) {
			echo('df_logarithmic <- ddply(df,"groups",function(df) predictions(lm(y~log(x),data=df),seq(min(df[["x"]]), max(df[["x"]]), length.out=100),interval="confidence"))\n');
		}
		else {
			echo('df_logarithmic <- predictions(lm(y~log(x),data=df),seq(min(df[["x"]]), max(df[["x"]]), length.out=100),interval="confidence")\n');
		}
		smooth += ' + geom_smooth(aes(x=x, y=pred.y' + se + smoothcolor + ', linetype="Logar\u00edtmico"), data=df_logarithmic, stat="identity")';
		model.push('Logar&iacute;tmico (' + yname + ' = a+b*log(' + xname + '))');
	}
	if (getBoolean("inverse")){
		if (getBoolean("grouped")) {
			echo('df_inverse <- ddply(df,"groups",function(df) predictions(lm(y~I(1/x),data=df),seq(min(df[["x"]]), max(df[["x"]]), length.out=100),interval="confidence"))\n');
		}
		else {
			echo('df_inverse <- predictions(lm(y~I(1/x),data=df),seq(min(df[["x"]]), max(df[["x"]]), length.out=100),interval="confidence")\n');
		}
		smooth += ' + geom_smooth(aes(x=x, y=pred.y' + se + smoothcolor + ', linetype="Inverso"), data=df_inverse, stat="identity")';
		model.push('Inverso (' + yname + ' = a+b/' + xname + ')');
	}
	if (getBoolean("sigmoid")){
		if (getBoolean("grouped")) {
			echo('df_sigmoid <- ddply(df,"groups",function(df) predictions(lm(log(y)~I(1/x),data=df),seq(min(df[["x"]]), max(df[["x"]]), length.out=100),interval="confidence"))\n');
			echo('df_sigmoid[,-2:-1]=exp(df_sigmoid[,-2:-1])\n');
			echo('names(df_sigmoid)[3]="pred.y"\n');
		}
		else {
			echo('df_sigmoid <- predictions(lm(log(y)~I(1/x),data=df),seq(min(df[["x"]]), max(df[["x"]]), length.out=100),interval="confidence")\n');
			echo('df_sigmoid[,-1]=exp(df_sigmoid[,-1])\n');
			echo('names(df_sigmoid)[2]="pred.y"\n');
		}
		smooth += ' + geom_smooth(aes(x=x, y=pred.y' + se + smoothcolor + ', linetype="Sigmoidal"), data=df_sigmoid, stat="identity")';
		model.push('Sigmoidal (' + yname + ' = exp(a+b/' + xname + '))');
	}
}

function printout () {
	doPrintout(true);
}

function preview () {
	preprocess();
	calculate();
	doPrintout(false);
}

function doPrintout (full) {
	if (full) {
		echo ('rk.header ("Diagrama de dispersi&oacute;n", parameters = list ("Variable X" = rk.get.description(' + x + "), 'Variable Y' = rk.get.description(" + y +  ')' + getString("filter_embed.code.printout"));
		if (getBoolean("grouped")) {
			echo(', "Variable de agrupaci&oacute;n" = rk.get.description(' + groups + ', paste.sep=", ")');
		}
		if (regression){
			echo(', "Ajuste de regresi&oacute;n" = "' + model.join(', ') + '"');
		}
		echo("))\n");
		echo ('rk.graph.on()\n');
	}
	//echo('layout(rbind(1,2), heights=c(8,1))\n');
	//echo('scatterplot(' + y + '~' + x + groups + filter + ', reg.line=' + getValue("regression") + ', smooth=' + getValue("smooth") + ', spread=' + getValue("spread") + ', boxplot=FALSE' + getValue ("plotoptions.code.printout") + ', data=' + data + ')\n');
	echo('p <- qplot(' + xname + ', ' + yname + ', data=' + data + pointcolor + pointsymbol + pointsize + ')' + legend + smooth + facet + '\n');
    echo('print(p)\n');
	if (getValue("regression_frame.checked")){
		echo('lines(xvalues,yvalues,col="red")\n');
		//echo('par(mar=c(0, 0, 0, 0))\n');
		//echo('plot.new()\n');
		//echo('legend("left", equation,col="red")\n');
	}
	if (full) {
		echo ('rk.graph.off()\n');
	}
}


