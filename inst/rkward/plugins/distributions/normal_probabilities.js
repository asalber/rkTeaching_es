// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var q, mean, sd, tail;

function calculate () {
	mean = getString("mean");
	sd = getString("sd");
	q = "c(" + getString("q").replace (/[, ]+/g, ", ") + ")";
	tail = getString("tail");
	echo ('result <- (pnorm(q = ' + q + ', mean = ' + mean + ', sd = ' + sd + ', ' + tail + '))\n');
}

function printout () {
	echo ('rk.header ("Probabilidad acumulada Normal", list ("Media" = "' + mean + '", "Desviaci&oacute;n t&iacute;pica" = "' + sd + '", "Cola de acumulaci&oacute;n" = ');
	if (tail=="lower.tail=TRUE" )
		echo('"Izquierda (&lt;)"));\n');
	else
		echo('"Derecha (&gt;)"));\n');
	echo ('rk.results (list("Valores" = ' + q + ', "Probabilidades acumuladas" = result))\n');
	if (getBoolean("plot")){
		if (tail=="lower.tail=TRUE" ){
			echo('x <- seq(' + mean + '-3*' + sd + ',' + q + '[1], length.out= 100)\n');
			echo('y <- dnorm(x,' + mean + ',' + sd + ')\n');
		} else {
			echo('x <- seq(' + q + '[1],' + mean + '+3*' + sd + ', length.out= 100)\n');
			echo('y <- dnorm(x,' + mean + ',' + sd + ')\n');
		}
		echo('rk.graph.on()\n');
		echo('try ({\n');
		echo('	curve(dnorm(x, mean=' + mean + ', sd=' + sd + '), from=' + mean + '-3*' + sd + ', to=' + mean + '+3*' + sd + ', n= 100 ,  xlab=expression(italic("X")), ylab=expression(paste("Densidad ",italic(f(x))))');
		if (tail=="lower.tail=TRUE" ){
			echo(', main=paste("P(X<",' + q + '[1], ")=", round(result[1],4)))\n');
		} else {
			echo(', main=paste("P(X>",' + q + '[1], ")=", round(result[1],4)))\n');
		}
		echo('	polygon(c(x[1],x,x[100]), c(0,y,0), col="coral", lty=0)\n');
		echo('	lines (x, y, type="l")\n');
		echo('	axis(side=1,' + q + '[1])\n');
		echo(' 	abline(h=0, col="gray")\n');
		echo ('})\n');
		echo('rk.graph.off()\n');
	}
}
