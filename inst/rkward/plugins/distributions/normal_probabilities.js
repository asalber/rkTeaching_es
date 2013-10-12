// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var q, mean, sd, tail;

function calculate () {
	mean = getString("mean");
	sd = getString("sd");
	q = 'c(' + getString("q").replace (/[, ]+/g, ", ") + ')';
	tail = getString("tail");
	echo ('result <- (pnorm(q = ' + q + ', mean = ' + mean + ', sd = ' + sd + ', ' + tail + '))\n');
}

function printout () {
	echo ('rk.header ("Probabilidad acumulada Normal N(' + mean + ',' + sd + ')", list ("Media" = "' + mean + '", "Desviaci&oacute;n t&iacute;pica" = "' + sd + '", "Cola de acumulaci&oacute;n" = ');
	if (tail=="lower.tail=TRUE" )
		echo('"Izquierda (&lt;)"));\n');
	else
		echo('"Derecha (&gt;)"));\n');
	echo ('rk.results(list("Valores" = ' + q + ', "Probabilidades acumuladas" = result))\n');
	// Plot
	if (getBoolean("plot")){
		if (tail=="lower.tail=TRUE" ){
			echo('x <- seq(' + mean + '-3*' + sd + ',' + q + '[1], length.out= 100)\n');
		} else {
			echo('x <- seq(' + q + '[1],' + mean + '+3*' + sd + ', length.out= 100)\n');
		}
		echo('y <- dnorm(x,' + mean + ',' + sd + ')\n');
		echo('rk.graph.on()\n');
		echo('try ({\n');
		echo('p <- qplot(x=c(' + mean + '-3*' + sd + ',' + mean + '+3*' + sd + '), geom="blank") + geom_area(aes(x=c(x[1],x,x[100]), c(0,y,0)), fill=I("#FF9999"), alpha=0.5) + stat_function(fun=dnorm, colour="#FF5555", args=list(mean=' + mean + ', sd=' + sd + ')) + xlab(expression(italic("X"))) + ylab(expression(paste("Densidad ",italic(f(x))))) + scale_x_continuous(breaks=c(' + mean + ',' + q + '[1]))'); 
		//echo('	curve(dnorm(x, mean=' + mean + ', sd=' + sd + '), from=' + mean + '-3*' + sd + ', to=' + mean + '+3*' + sd + ', n= 100 ,  , )');
		if (tail=="lower.tail=TRUE" ){
			echo(' + labs(title=paste("P(X<",' + q + '[1], ")=", round(result[1],4)))\n');
		} else {
			echo(' + labs(title=paste("P(X>",' + q + '[1], ")=", round(result[1],4)))\n');
		}
		//echo('p + axis(side=1,' + q + '[1])\n');
		echo('print(p)\n');
		//echo('	lines (x, y, type="l")\n');
		//echo(' 	abline(h=0, col="gray")\n');
		echo ('})\n');
		echo('rk.graph.off()\n');
	}
}
