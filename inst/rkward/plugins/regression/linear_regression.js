// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var y;
var data;
var x;
var equation;
var depvars;
var modelname;

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
	echo ('assign("' + modelname + '", lm (' + formula + ', data=' + data + '), .GlobalEnv)\n');
	echo ('results <- summary(' + modelname + ')\n');
}

function printout () {
	echo ('rk.header ("Linear Regression", parameters=list("Dependent variable", rk.get.description(' + y + "), 'Independent variables', " + depvars + ', "Model name", "' + modelname + '", "Model equation", ' + equation + '))\n');
	echo ('rk.print(results)\n');
}

