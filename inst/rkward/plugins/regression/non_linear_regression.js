// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, y, xname, yname, equation, modelname, model, typemodel, filter;

function calculate () {
    // Filter
	echo(getString("filter_embed.code.calculate"));
	// Load variables
	y = getString("y");
	yname = getString("y.shortname");
	x = getString("x"); 
	xname = getString("x.shortname"); 
	var data = y.split('[[')[0];
	var formula = '';
	model = getString("model");
	if (model == "linear"){
		typemodel = "Lineal"
		formula += yname + ' ~ ' + xname;
	}
	else if (model == "cuadratic"){
		typemodel = "Cuadr&aacute;tica"
		formula += yname + ' ~ ' + xname + ' + I(' + xname + '^2)';
	}
	else if (model == "cubic"){
		typemodel = "C&uacute;bica"
		formula += yname + ' ~ ' + xname +	' + I(' + xname + '^2) + I(' + xname + '^3)';
	}
	else if (model == "potential"){
		typemodel = "Potencial"
		formula += 'log(' + yname + ') ~ log(' + xname + ')';
	}
	else if (model == "exponential"){
		typemodel = "Exponencial"
		formula += 'log(' + yname + ') ~ ' + xname;
	}
	else if (model == "logarithmic"){
		typemodel = "Logar&iacute;tmica"
		formula += yname + ' ~ log(' + xname + ')';
	}
	else if (model == "inverse"){
		typemodel = "Inversa"
		formula += yname + ' ~ I(1/' + xname + ')';
	}
	else if (model == "sigmoid"){
		typemodel = "Sigmoidal"
		formula += 'log(' + yname + ') ~ I(1/' + xname + ')';
	}
	if (getBoolean("save.active")){
		modelname = getString("save");
		echo('assign("' + modelname + '", lm (' + formula + ', data=' + data + '), .GlobalEnv)\n');
		echo('results <- summary(' + modelname + ')\n');
	}
	else{
		echo('results <- summary(lm (' + formula + ', data=' + data + '))\n');
	}
}

function printout () {
	echo ('rk.header ("Regresi&oacute;n ' + typemodel + '", parameters=list("Variable dependiente" = rk.get.description(' + y + "), 'Variable independiente'= rk.get.description(" + x + ')' + getString("filter_embed.code.printout"));
	if (getBoolean("save.active")){
		echo(', "Nombre del modelo" = "' + modelname + '"');
	}
	echo("))\n");
	// Ecuación del modelo
	echo('rk.header ("Ecuaci&oacute;n del modelo",level=3)\n'); 
	if (model == "linear"){
		echo('rk.print (c("' + yname + '", " = ", round(results$coeff[1,1],4), " + ", round(results$coeff[2,1],4), "' + xname + '"))\n');
	}
	if (model == "cuadratic"){
		echo('rk.print (c("' + yname + '", " = ", round(results$coeff[1,1],4), " + ", round(results$coeff[2,1],4), "' + xname + ' + ", round(results$coeff[3,1],4), "' + xname + '^2"))\n');
	}
	if (model == "cubic"){
		echo('rk.print (c("' + yname + '", " = ", round(results$coeff[1,1],4), " + ", round(results$coeff[2,1],4), "' + xname + ' + ", round(results$coeff[3,1],4), "' + xname + '^2 + ", round(results$coeff[4,1],4), "' + xname + '^3"))\n');
	}
	if (model == "potential"){
		echo('rk.print (c("log(' + yname + ')", " = ", round(results$coeff[1,1],4), " + ", round(results$coeff[2,1],4), "log(' + xname + ')"))\n');
	}
	if (model == "exponential"){
		echo('rk.print (c("log(' + yname + ')", " = ", round(results$coeff[1,1],4), " + ", round(results$coeff[2,1],4), "' + xname + '"))\n');
	}
	if (model == "logarithmic"){
		echo('rk.print (c("' + yname + '", " = ", round(results$coeff[1,1],4), " + ", round(results$coeff[2,1],4), "log(' + xname + ')"))\n');
	}
	if (model == "inverse"){
		echo('rk.print (c("' + yname + '", " = ", round(results$coeff[1,1],4), " + ", round(results$coeff[2,1],4), "/ ' + xname + '"))\n');
	}
	if (model == "sigmoid"){
		echo('rk.print (c("log(' + yname + ')", " = ", round(results$coeff[1,1],4), " + ", round(results$coeff[2,1],4), "/ ' + xname + '"))\n');
	}
	
	// Estimaciones del modelo 
	echo('rk.header ("Coeficientes del modelo",level=3)\n');
	echo('rk.results (list(');
	echo('"Coeficiente" = rownames(results$coeff)');
	echo(', "Estimaci&oacute;n" = results$coeff[,1]');
	echo(', "Error est&aacute;ndar" = results$coeff[,2]');
	echo(', "Estad&iacute;stico t" = results$coeff[,3]');
	echo(', "p-valor" = results$coeff[,4]))\n');
	// Ajuste del modelo
	echo('rk.header ("Ajuste del modelo", level=3)\n');
	echo('rk.results (list(');
	echo('"R<sup>2</sup>" = results$r.squared,');
	echo('"R<sup>2</sup> ajustado" = results$adj.r.squared,');
	echo('"Estad&iacute;stico F" = results$fstatistic[1],');
	echo('"p-valor" = pf(results$fstatistic[1],results$fstatistic[2],results$fstatistic[3],lower.tail=FALSE)))\n');
}

