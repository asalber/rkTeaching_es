// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, y, xname, yname, equation, modelname, model, typemodel, filter;

function calculate () {
	y = getString("y");
	yname = getString("y.shortname");
	x = getString("x"); 
	xname = getString("x.shortname"); 
	var data = y.split('[[')[0];
	equation =  '"';
	var formula = '';
	model = getString("model");
	if (model == "linear"){
		typemodel = "Lineal"
		formula += yname + ' ~ ' + xname;
		equation += yname + ' = c0 + c1' + xname;
	}
	else if (model == "cuadratic"){
		typemodel = "Cuadr&aacute;tica"
		formula += yname + ' ~ ' + xname + ' + I(' + xname + '^2)';
		equation += yname + ' = c0 + c1' + xname + ' + c2' + xname + '^2';
	}
	else if (model == "cubic"){
		typemodel = "C&uacute;bica"
		formula += yname + ' ~ ' + xname +	' + I(' + xname + '^2) + I(' + xname + '^3)';
		equation += yname + ' = c0 + c1' + xname + ' + c2' + xname + '^2 + c3' + xname + '^3';
	}
	else if (model == "potential"){
		typemodel = "Potencial"
		formula += 'log(' + yname + ') ~ log(' + xname + ')';
		equation += 'log(' + yname + ') = c0 + c1log(' + xname + ')';
	}
	else if (model == "exponential"){
		typemodel = "Exponencial"
		formula += 'log(' + yname + ') ~ ' + xname;
		equation += 'log(' + yname + ') = c0 + c1' + xname;
	}
	else if (model == "logarithmic"){
		typemodel = "Logar&iacute;tmica"
		formula += yname + ' ~ log(' + xname + ')';
		equation += yname + ' = c0 + c1log(' + xname + ')';
	}
	else if (model == "inverse"){
		typemodel = "Inversa"
		formula += yname + ' ~ I(1/' + xname + ')';
		equation += yname + ' = c0 + c1/' + xname;
	}
	else if (model == "sigmoid"){
		typemodel = "Sigmoidal"
		formula += 'log(' + yname + ') ~ I(1/' + xname + ')';
		equation += 'log(' + yname + ') = c0 + c1/' + xname;
	}
	model = model.substr(0,1).toUpperCase() + model.substr(1);
	equation += '"';
	filter = '';
	if (getBoolean("filter_frame.checked")){
		filter = ', subset=' + getValue("filter");
	}
	if (getBoolean("save.active")){
		modelname = getString("save");
		echo('assign("' + modelname + '", lm (' + formula + ', data=' + data + filter + '), .GlobalEnv)\n');
		echo('results <- summary(' + modelname + ')\n');
	}
	else{
		echo('results <- summary(lm (' + formula + ', data=' + data + filter + '))\n');
	}
}

function printout () {
	echo ('rk.header ("Regresi&oacute;n ' + typemodel + '", parameters=list("Variable dependiente" = rk.get.description(' + y + "), 'Variable independiente'= rk.get.description(" + x + '), "Ecuaci&oacute;n del modelo" = ' + equation);
	if (getBoolean("save.active")){
		echo(', "Nombre del modelo" = "' + modelname + '"');
	}
	if (getBoolean("filter_frame.checked")){
		echo(", 'Filtro' = '" + getValue("filter") + "'");
	}
	echo("))\n");
	//echo ('rk.print(results)\n');
	echo('rk.header ("Coeficientes del modelo",level=3)\n');
	echo('rk.results (list(');
	echo('"Coeficiente" = rownames(results$coeff),');
	echo('"Estimaci&oacute;n" = results$coeff[,1],');
	echo('"Error est&aacute;ndar" = results$coeff[,2],');
	echo('"Estad&iacute;stico t" = results$coeff[,3],');
	echo('"p-valor" = results$coeff[,4]))\n');
	echo('rk.header ("Ajuste del modelo", level=3)\n');
	echo('rk.results (list(');
	echo('"R<sup>2</sup>" = results$r.squared,');
	echo('"R<sup>2</sup> ajustado" = results$adj.r.squared,');
	echo('"Estad&iacute;stico F" = results$fstatistic[1],');
	echo('"p-valor" = pf(results$fstatistic[1],results$fstatistic[2],results$fstatistic[3],lower.tail=FALSE)))\n');
}

