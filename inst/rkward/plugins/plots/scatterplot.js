// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, y, data, groups, equation, typemodel;

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
	if (getValue("groups_frame.checked")){
		groups = ' | ' + getName(getValue("groups"));
	}
	else {
		groups ='';
	}
	filter = '';
	var filter2 = ''; 
	if (getValue("filter_frame.checked")){
		filter = ', subset=' + getValue("filter");
		var filter2 = '[' + data + '$' + getValue("filter") + ']';
	}
	if (getValue("regression_frame.checked")){
		echo('minx <- min(na.omit(' + getValue("x") + filter2 + '))\n');
		echo('maxx <- max(na.omit(' + getValue("x") + filter2 + '))\n');
		echo('xvalues <- seq(minx, maxx, length.out=100)\n');
		equation =  '"';
		var formula = '';
		var model = getValue("model");
		if (model == "cuadratic"){
			typemodel='Cuadr&aacute;tica';
			formula += y + ' ~ ' + x + ' + I(' + x + '^2)';
			echo('model <- lm(' + formula + ', data=' + data + ', subset=' + getValue("filter") + ')\n');
			echo('yvalues <- predict(model, data.frame(' + x + '=xvalues))\n');
	
			//echo('equation <- paste("' + y + '", " = ", round(model$coefficients[1],4), "+", round(model$coefficients[2],4),"' + x + '", "+", round(model$coefficients[3],4),"' + x + '", "^2", sep="")\n');
		}
		else if (model == "cubic"){
			typemodel='C&uacute;bica';
			formula += y + ' ~ ' + x +	' + I(' + x + '^2) + I(' + x + '^3)';
			echo('model <- lm(' + formula + ', data=' + data + ', subset=' + getValue("filter") + ')\n');
			echo('yvalues <- predict(model, data.frame(' + x + '=xvalues))\n');
		}
		else if (model == "potential"){
			typemodel='Potencial';
			formula += 'log(' + y + ') ~ log(' + x + ')';
			echo('model <- lm(' + formula + ', data=' + data + ', subset=' + getValue("filter") + ')\n');
			echo('yvalues <- exp(predict(model, data.frame(' + x + '=xvalues)))\n');
		}
		else if (model == "exponential"){
			typemodel='Exponencial';
			formula += 'log(' + y + ') ~ ' + x;
			//equation += 'log(' + y + ') = c0 + c1' + x;
			echo('model <- lm(' + formula + ', data=' + data + ', subset=' + getValue("filter") + ')\n');
			echo('yvalues <- exp(predict(model, data.frame(' + x + '=xvalues)))\n');
		}
		else if (model == "logarithmic"){
			typemodel='Logar&iacute;tmica';
			formula += y + ' ~ log(' + x + ')';
			echo('model <- lm(' + formula + ', data=' + data + ', subset=' + getValue("filter") + ')\n');
			echo('yvalues <- predict(model, data.frame(' + x + '=xvalues))\n');
			//equation += y + ' = c0 + c1log(' + x + ')';
		}
		else if (model == "inverse"){
			typemodel='Inversa';
			formula += y + ' ~ I(1/' + x + ')';
			echo('model <- lm(' + formula + ', data=' + data + ', subset=' + getValue("filter") + ')\n');
			echo('yvalues <- predict(model, data.frame(' + x + '=xvalues))\n');
			//equation += y + ' = c0 + c1/' + x;
		}
		else if (model == "sigmoid"){
			typemodel='Sigmoidal';
			formula += 'log(' + y + ') ~ I(1/' + x + ')';
			echo('model <- lm(' + formula + ', data=' + data + ', subset=' + getValue("filter") + ')\n');
			echo('yvalues <- exp(predict(model, data.frame(' + x + '=xvalues)))\n');
			//equation += 'log(' + y + ') = c0 + c1/' + x;
		}
	}
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
		echo ('rk.header ("Diagrama de dispersi&oacute;n", parameters = list ("Variable X" = rk.get.description(' + getValue("x") + "), 'Variable Y' = rk.get.description(" + getValue("y") +  ')');
		if (getValue("groups_frame.checked")){
			echo(', "Grupos seg&uacute;n" = rk.get.description(' + getValue("groups") + ')');
		}
		if (getValue("filter_frame.checked")){
			echo(", 'Filtro' = '" + getValue("filter") + "'");
		}
		if (getValue("regression_frame.checked")){
			echo(', "Curva de regresi&oacute;n" = "' + typemodel + '"');
		}
		echo("))\n");
		echo ('rk.graph.on()\n');
		echo ('\n');
	}
	//echo('layout(rbind(1,2), heights=c(8,1))\n');
	echo('scatterplot(' + y + '~' + x + groups + filter + ', reg.line=' + getValue("regression") + ', smooth=' + getValue("smooth") + ', spread=' + getValue("spread") + ', boxplot=FALSE' + getValue ("plotoptions.code.printout") + ', data=' + data + ')\n');
	if (getValue("regression_frame.checked")){
		echo('lines(xvalues,yvalues,col="red")\n');
		//echo('par(mar=c(0, 0, 0, 0))\n');
		//echo('plot.new()\n');
		//echo('legend("left", equation,col="red")\n');
	}
	if (full) {
		echo ('\n');
		echo ('rk.graph.off()\n');
	}
}


