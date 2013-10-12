// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var df1, df2;

include ('plot_dist_common.js');

function getParameters () {
	df1 = getString("df1");
	df2 = getString("df2");
	min = 0;
	if(parseFloat(df2)<5){
		max = 10
	}
	else{
		max = parseFloat(df2)/(parseFloat(df2)-2)+4*Math.sqrt(2*Math.pow(parseFloat(df2),2)*(parseFloat(df1)+parseFloat(df2)-2)/(parseFloat(df1)*Math.pow((parseFloat(df2)-2),2)*(parseFloat(df2)-4)));
	}
	setContParameters();
	if (density) {
		fun = "df";
	} else {
		fun = "pf";
	}
}

function doHeader () {
	echo ('rk.header ("Funci&oacute;n de ' + label + ' F de Fisher F(' + df1 + ',' + df2 + ')", list ("Grados de libertad del numerador"= "' + df1 + '", "Grados de libertad del denominador" = "' + df2 + '"))\n');
}

function doFunCall () {
	echo ('p <- qplot(c(' + min + ',' + max + '), geom="blank") + stat_function(fun=' + fun + ', colour="#FF5555", n=201, args=list(df1=' + df1 + ', df2=' + df2 + '))');
}

