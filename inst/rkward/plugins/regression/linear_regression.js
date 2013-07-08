// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, y, xname, yname, data, equation, depvars, depvarsnames, modelname, filter;


function calculate () {
	y = getString("y");
	yname = getString("y.shortname");
	data = y.split('[[')[0];
	x = getList("x");
	xname = getList("x.shortname");
	equation =  "'" + yname + ' = ';
	depvars = 'paste(';
	depvarsnames='';
	var intercept = "";
	if (!getValue ("intercept.state.numeric")){
		intercept = "0 + ";
	}
	else {
		equation += 'c0'; 
	}
	var formula = yname + ' ~' + intercept;
	for (i=0; i<x.length; i++){
		formula += ' + ' + xname[i];
		equation += ' + c' + (i+1) + '*' + xname[i];
		depvars += 'rk.get.description(' + x[i] + '),';
		depvarsnames += ',"' + xname[i] + '"';
	}
	depvars += 'sep=", ")';
	equation += "'";
	filter = '';
	if (getBoolean("filter_frame.checked")){
		filter = ', subset=' + getValue("filter");
	}
	if (getBoolean("save.active")){
		modelname = getString("save");
		echo ('assign("' + modelname + '", lm (' + formula + ', data=' + data + filter + '), .GlobalEnv)\n');
		echo ('results <- summary(' + modelname + ')\n');
	}
	else{
		echo ('results <- summary(lm (' + formula + ', data=' + data + filter + '))\n');
	}
}

function printout () {
	echo('rk.header ("Regresi&oacute;n Lineal", parameters=list("Variable dependiente" = rk.get.description(' + y + "), 'Variables independientes' = " + depvars + ', "Ecuaci&oacute;n del modelo" = ' + equation);
	if (getBoolean("save.active")){
		echo(', "Nombre del modelo" = "' + modelname + '"');
	}
	if (getBoolean("filter_frame.checked")){
		echo(", 'Filtro' = '" + getString("filter") + "'");
	}
	echo("))\n");
	//echo ('rk.print(results)\n');
	echo('rk.header ("Ecuaci&oacute;n del modelo",level=3)\n'); // REVISAR PARA REGRESIÓN MÚLTIPLE
	echo('rk.print (c("' + yname + '", " = ", round(results$coeff[1,1],4),"+",round(results$coeff[2,1],4),"*"' + depvarsnames +'))\n');
	echo('rk.header ("Coeficientes del modelo",level=3)\n');
	echo('rk.results (list(');
	echo('"Coeficiente" = c("T&eacute;rmino independiente"' + depvarsnames + '),');
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

