// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, y, data, equation, depvars, modelname, filter;

function getName(x){
	return x.split('"')[1];
}

function calculate () {
	y = getValue("y");
	data = y.split('[[')[0];
	x = getValue("x"); 
	xs = x.split('\n');
	equation =  "'" + getName(y) + ' = ';
	depvars = 'paste(';
	modelname="regression.model";
	if (getValue("save","active")){
		modelname = getValue("save");
	}
	var intercept = "";
	if (!getValue ("intercept.state.numeric")){
		intercept = "0 + ";
	}
	else {
		equation += 'c0'; 
	}
	xs = x.split('\n');
	var formula = getName(y) + ' ~' + intercept;
	for (i=0; i<xs.length; i++){
		formula += ' + ' + getName(xs[i]);
		equation += ' + c' + (i+1) + '*' + getName(xs[i]);
		depvars += 'rk.get.description(' + xs[i] + '),';
	}
	depvars += 'sep=", ")';
	equation += "'";
	filter = '';
	if (getValue("filter_frame.checked")){
		filter = ', subset=' + getValue("filter");
	}
	echo ('assign("' + modelname + '", lm (' + formula + ', data=' + data + filter + '), .GlobalEnv)\n');
	echo ('results <- summary(' + modelname + ')\n');
}

function printout () {
	echo('rk.header ("Regresi&oacute;n Lineal", parameters=list("Variable dependiente" = rk.get.description(' + y + "), 'Variables independientes' = " + depvars + ', "Nombre del modelo" = "' + modelname + '", "Ecuaci&oacute;n del modelo" = ' + equation);
	if (getValue("filter_frame.checked")){
		echo(", 'Filtro' = '" + getValue("filter") + "'");
	}
	echo("))\n");
	//echo ('rk.print(results)\n');
	echo('rk.header ("Ecuaci&oacute;n del modelo",level=3)\n'); // REVISAR PARA REGRESIÓN MÚLTIPLE
	echo('rk.print (c(rk.get.description(' + y + '), " = ", round(results$coeff[1,1],4),"+",round(results$coeff[2,1],4),"*",' + depvars +'))\n');
	echo('rk.header ("Coeficientes del modelo",level=3)\n');
	echo('rk.results (list(');
	echo('"Coeficiente" = c("T&eacute;rmino independiente",rk.get.description('+ x +')),');
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

