// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, y, xname, yname, data, intercept, modelname;


function calculate () {
    // Filter
	echo(getString("filter_embed.code.calculate"));
	// Load variables
	y = getString("y");
	yname = getString("y.shortname");
	data = y.split('[[')[0];
	x = getList("x");
	xname = getList("x.shortname");
	// Set intercept
	intercept = '';
	if (!getBoolean("intercept")){
		intercept = "0";
	}
	// Set regression formula
	var formula = yname + '~' + intercept;
	for (i=0; i<x.length; i++){
		formula += '+' + xname[i];
	}
	// Calculate model
	if (getBoolean("save.active")){
		modelname = getString("save");
		echo ('assign("' + modelname + '", lm (' + formula +  ', data=' + data + '), .GlobalEnv)\n');
		echo ('results <- summary(' + modelname + ')\n');
	}
	else{
		echo ('results <- summary(lm (' + formula + ', data=' + data + '))\n');
	}
}

function printout () {
	echo('rk.header ("Regresi&oacute;n Lineal", parameters=list("Variable dependiente" = rk.get.description(' + y + '), "Variables independientes" = rk.get.description(' + x + ', paste.sep=", ")' + getString("filter_embed.code.printout"));
	if (getBoolean("save.active")){
		echo(', "Nombre del modelo" = "' + modelname + '"');
	}
	echo("))\n");
	// Ecuación del modelo
	echo('rk.header ("Ecuaci&oacute;n del modelo",level=3)\n'); 
	if (getBoolean("intercept")){
		echo('rk.print (c("' + yname + '", " = ", paste(round(results$coeff[1,1],4), paste(round(results$coeff[-1,1],4), rownames(results$coeff)[-1], collapse=" + "), sep=" + ")))\n');
	}
	else{
		echo('rk.print (c("' + yname + '", " = ", paste(round(results$coeff[,1],4), rownames(results$coeff), collapse=" + ")))\n');
	}
	// Estimaciones
	echo('rk.header ("Coeficientes del modelo",level=3)\n');
	echo('rk.results (list(');
    if (getBoolean("intercept")){
    	echo('"Coeficiente" = c("T&eacute;rmino independiente", rownames(results$coeff)[-1])');
    }
    else{
    	echo('"Coeficiente" = rownames(results$coeff)');
    }
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

