// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, y, xname, yname, data, groups, groupsname, equation, modelname, model, typemodel, filter;

function preprocess(){
	echo('require(plyr)\n');
}

function calculate () {
    // Filter
	echo(getString("filter_embed.code.calculate"));
	// Load variables
	y = getString("y");
	yname = getString("y.shortname");
	x = getString("x"); 
	xname = getString("x.shortname"); 
	data = y.split('[[')[0];
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
	// Grouped mode
	if (getBoolean("grouped")) {
		groups = getList("groups");
		groupsname = getList("groups.shortname");
		echo(data + ' <- transform(' + data + ', .groups=interaction(' + data + '[,c(' + groupsname.map(quote) + ')]))\n');
		echo('result <- dlply(' + data + ', ".groups", function(df) lm(' +  formula + ', data=df))\n');
		// Save model
		if (getBoolean("save.active")){
			modelname = getString("save");
			echo('for (i in 1:length(result)){\n');
			echo('\t assign(paste("' + modelname + '", names(result)[i], sep="."), result[[i]], .GlobalEnv)\n');
			echo('}\n');
		}
		echo('result <- lapply(result,summary)\n');
	}
	else{
		echo ('result <- lm (' + formula + ', data=' + data + ')\n');
		// Save model
		if (getBoolean("save.active")){
			modelname = getString("save");
			echo ('assign("' + modelname + '", result, .GlobalEnv)\n');
		}
		echo('result <- summary(result)\n');
	}
}

function printout () {
	echo ('rk.header ("Regresi&oacute;n ' + typemodel +  ' de ' + yname + ' sobre ' + getList("x.shortname").join(', ') + '", parameters=list("Variable dependiente" = rk.get.description(' + y + "), 'Variable independiente'= rk.get.description(" + x + ')' + getString("filter_embed.code.printout"));
	if (getBoolean("grouped")) {
		echo(', "Variable de agrupaci&oacute;n" = rk.get.description(' + groups + ', paste.sep=", ")');
	}
	if (getBoolean("save.active")){
		echo(', "Nombre del modelo" = "' + modelname + '"');
	}
	echo("))\n");
	// Grouped mode
	if (getBoolean("grouped")){
		echo('for (i in 1:length(result)){\n');
		echo('\t rk.header(paste("Grupo ' + groupsname.join('.') + ' = ", names(result)[i]),level=3)\n');
		// Ecuación del modelo
		echo('\t rk.header ("Ecuaci&oacute;n del modelo",level=4)\n'); 
		if (model == "linear"){
			echo('rk.print (c("' + yname + '", " = ", round(result[[i]][[i]]$coeff[1,1],4), " + ", round(result[[i]]$coeff[2,1],4), "' + xname + '"))\n');
		}
		if (model == "cuadratic"){
			echo('rk.print (c("' + yname + '", " = ", round(result[[i]]$coeff[1,1],4), " + ", round(result[[i]]$coeff[2,1],4), "' + xname + ' + ", round(result[[i]]$coeff[3,1],4), "' + xname + '^2"))\n');
		}
		if (model == "cubic"){
			echo('rk.print (c("' + yname + '", " = ", round(result[[i]]$coeff[1,1],4), " + ", round(result[[i]]$coeff[2,1],4), "' + xname + ' + ", round(result[[i]]$coeff[3,1],4), "' + xname + '^2 + ", round(result[[i]]$coeff[4,1],4), "' + xname + '^3"))\n');
		}
		if (model == "potential"){
			echo('rk.print (c("log(' + yname + ')", " = ", round(result[[i]]$coeff[1,1],4), " + ", round(result[[i]]$coeff[2,1],4), "log(' + xname + ')"))\n');
		}
		if (model == "exponential"){
			echo('rk.print (c("log(' + yname + ')", " = ", round(result[[i]]$coeff[1,1],4), " + ", round(result[[i]]$coeff[2,1],4), "' + xname + '"))\n');
		}
		if (model == "logarithmic"){
			echo('rk.print (c("' + yname + '", " = ", round(result[[i]]$coeff[1,1],4), " + ", round(result[[i]]$coeff[2,1],4), "log(' + xname + ')"))\n');
		}
		if (model == "inverse"){
			echo('rk.print (c("' + yname + '", " = ", round(result[[i]]$coeff[1,1],4), " + ", round(result[[i]]$coeff[2,1],4), "/ ' + xname + '"))\n');
		}
		if (model == "sigmoid"){
			echo('rk.print (c("log(' + yname + ')", " = ", round(result[[i]]$coeff[1,1],4), " + ", round(result[[i]]$coeff[2,1],4), "/ ' + xname + '"))\n');
		}
		// Estimaciones del modelo 
		echo('\t rk.header ("Coeficientes del modelo",level=4)\n');
		echo('rk.results (list(');
		echo('"Coeficiente" = rownames(result[[i]]$coeff)');
		echo(', "Estimaci&oacute;n" = result[[i]]$coeff[,1]');
		echo(', "Error est&aacute;ndar" = result[[i]]$coeff[,2]');
		echo(', "Estad&iacute;stico t" = result[[i]]$coeff[,3]');
		echo(', "p-valor" = result[[i]]$coeff[,4]))\n');
		// Ajuste del modelo
		echo('\t rk.header ("Ajuste del modelo", level=4)\n');
		echo('rk.results (list(');
		echo('"R<sup>2</sup>" = result[[i]]$r.squared,');
		echo('"R<sup>2</sup> ajustado" = result[[i]]$adj.r.squared,');
		echo('"Estad&iacute;stico F" = result[[i]]$fstatistic[1],');
		echo('"p-valor" = pf(result[[i]]$fstatistic[1],result[[i]]$fstatistic[2],result[[i]]$fstatistic[3],lower.tail=FALSE)))\n');
		echo('}\n');
	}
	else{
		// Ecuación del modelo
		echo('rk.header ("Ecuaci&oacute;n del modelo",level=4)\n'); 
		if (model == "linear"){
			echo('rk.print (c("' + yname + '", " = ", round(result$coeff[1,1],4), " + ", round(result$coeff[2,1],4), "' + xname + '"))\n');
		}
		if (model == "cuadratic"){
			echo('rk.print (c("' + yname + '", " = ", round(result$coeff[1,1],4), " + ", round(result$coeff[2,1],4), "' + xname + ' + ", round(result$coeff[3,1],4), "' + xname + '^2"))\n');
		}
		if (model == "cubic"){
			echo('rk.print (c("' + yname + '", " = ", round(result$coeff[1,1],4), " + ", round(result$coeff[2,1],4), "' + xname + ' + ", round(result$coeff[3,1],4), "' + xname + '^2 + ", round(result$coeff[4,1],4), "' + xname + '^3"))\n');
		}
		if (model == "potential"){
			echo('rk.print (c("log(' + yname + ')", " = ", round(result$coeff[1,1],4), " + ", round(result$coeff[2,1],4), "log(' + xname + ')"))\n');
		}
		if (model == "exponential"){
			echo('rk.print (c("log(' + yname + ')", " = ", round(result$coeff[1,1],4), " + ", round(result$coeff[2,1],4), "' + xname + '"))\n');
		}
		if (model == "logarithmic"){
			echo('rk.print (c("' + yname + '", " = ", round(result$coeff[1,1],4), " + ", round(result$coeff[2,1],4), "log(' + xname + ')"))\n');
		}
		if (model == "inverse"){
			echo('rk.print (c("' + yname + '", " = ", round(result$coeff[1,1],4), " + ", round(result$coeff[2,1],4), "/ ' + xname + '"))\n');
		}
		if (model == "sigmoid"){
			echo('rk.print (c("log(' + yname + ')", " = ", round(result$coeff[1,1],4), " + ", round(result$coeff[2,1],4), "/ ' + xname + '"))\n');
		}
		// Estimaciones del modelo 
		echo('rk.header ("Coeficientes del modelo",level=4)\n');
		echo('rk.results (list(');
		echo('"Coeficiente" = rownames(result$coeff)');
		echo(', "Estimaci&oacute;n" = result$coeff[,1]');
		echo(', "Error est&aacute;ndar" = result$coeff[,2]');
		echo(', "Estad&iacute;stico t" = result$coeff[,3]');
		echo(', "p-valor" = result$coeff[,4]))\n');
		// Ajuste del modelo
		echo('rk.header ("Ajuste del modelo", level=4)\n');
		echo('rk.results (list(');
		echo('"R<sup>2</sup>" = result$r.squared,');
		echo('"R<sup>2</sup> ajustado" = result$adj.r.squared,');
		echo('"Estad&iacute;stico F" = result$fstatistic[1],');
		echo('"p-valor" = pf(result$fstatistic[1],result$fstatistic[2],result$fstatistic[3],lower.tail=FALSE)))\n');
	}
}

