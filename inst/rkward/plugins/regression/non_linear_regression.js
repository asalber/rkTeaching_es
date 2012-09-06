// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var equation;
var modelname;
var model;

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
	if (model == "cuadratic"){
		formula += y + ' ~ ' + x + ' + I(' + x + '^2)';
		equation += y + ' = c0 + c1' + x + ' + c2' + x + '^2';
	}
	else if (model == "cubic"){
		formula += y + ' ~ ' + x +	' + I(' + x + '^2) + I(' + x + '^3)';
		equation += y + ' = c0 + c1' + x + ' + c2' + x + '^2 + c3' + x + '^3';
	}
	else if (model == "potential"){
		formula += 'log(' + y + ') ~ log(' + x + ')';
		equation += 'log(' + y + ') = c0 + c1log(' + x + ')';
	}
	else if (model == "exponential"){
		formula += 'log(' + y + ') ~ ' + x;
		equation += 'log(' + y + ') = c0 + c1' + x;
	}
	else if (model == "logarithmic"){
		formula += y + ' ~ log(' + x + ')';
		equation += y + ' = c0 + c1log(' + x + ')';
	}
	else if (model == "inverse"){
		formula += y + ' ~ I(1/' + x + ')';
		equation += y + ' = c0 + c1/' + x;
	}
	else if (model == "sigmoid"){
		formula += 'log(' + y + ') ~ I(1/' + x + ')';
		equation += 'log(' + y + ') = c0 + c1/' + x;
	}
	model = model.substr(0,1).toUpperCase() + model.substr(1);
	equation += '"';
	echo ('assign("' + modelname + '", lm (' + formula + ', data=' + data + '), .GlobalEnv)\n');
	echo ('results <- summary(' + modelname + ')\n');
}

function printout () {
	echo ('rk.header ("' + model + ' Regression", parameters=list("Dependent variable", rk.get.description(' + getValue("y") + "), 'Independent variable', rk.get.description(" + getValue("x") + '), "Model name", "' + modelname + '", "Model equation", ' + equation + '))\n');
	echo ('rk.print(results)\n');
}

