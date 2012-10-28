// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var equation, modelname, model, typemodel, filter;

function getName(x){
	return x.split('"')[1];
}

function calculate () {
	modelname="regression.model";
	if (getValue("save","active")){
		modelname = getValue("save");
	}
	var y = getName(getValue("y"));
	var x = getName(getValue("x")); 
	var data = getValue("y").split('[[')[0];
	equation =  '"';
	var formula = '';
	model = getValue("model");
	if (model == "linear"){
		typemodel = "Lineal"
		formula += y + ' ~ ' + x;
		equation += y + ' = c0 + c1' + x;
	}
	else if (model == "cuadratic"){
		typemodel = "Cuadr&aacute;tica"
		formula += y + ' ~ ' + x + ' + I(' + x + '^2)';
		equation += y + ' = c0 + c1' + x + ' + c2' + x + '^2';
	}
	else if (model == "cubic"){
		typemodel = "C&uacute;bica"
		formula += y + ' ~ ' + x +	' + I(' + x + '^2) + I(' + x + '^3)';
		equation += y + ' = c0 + c1' + x + ' + c2' + x + '^2 + c3' + x + '^3';
	}
	else if (model == "potential"){
		typemodel = "Potencial"
		formula += 'log(' + y + ') ~ log(' + x + ')';
		equation += 'log(' + y + ') = c0 + c1log(' + x + ')';
	}
	else if (model == "exponential"){
		typemodel = "Exponencial"
		formula += 'log(' + y + ') ~ ' + x;
		equation += 'log(' + y + ') = c0 + c1' + x;
	}
	else if (model == "logarithmic"){
		typemodel = "Logar&iacute;tmica"
		formula += y + ' ~ log(' + x + ')';
		equation += y + ' = c0 + c1log(' + x + ')';
	}
	else if (model == "inverse"){
		typemodel = "Inversa"
		formula += y + ' ~ I(1/' + x + ')';
		equation += y + ' = c0 + c1/' + x;
	}
	else if (model == "sigmoid"){
		typemodel = "Sigmoidal"
		formula += 'log(' + y + ') ~ I(1/' + x + ')';
		equation += 'log(' + y + ') = c0 + c1/' + x;
	}
	model = model.substr(0,1).toUpperCase() + model.substr(1);
	equation += '"';
	filter = '';
	if (getValue("filter_frame.checked")){
		filter = ', subset=' + getValue("filter");
	}
	echo ('assign("' + modelname + '", lm (' + formula + ', data=' + data + filter + '), .GlobalEnv)\n');
	echo ('results <- summary(' + modelname + ')\n');
}

function printout () {
	echo ('rk.header ("Regresi&oacute;n ' + typemodel + '", parameters=list("Variable dependiente" = rk.get.description(' + getValue("y") + "), 'Variable independiente'= rk.get.description(" + getValue("x") + '), "Nombre del modelo" = "' + modelname + '", "Ecuaci&oacute;n del modelo" = ' + equation);
	if (getValue("filter_frame.checked")){
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

