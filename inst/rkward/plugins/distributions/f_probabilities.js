// author: Alfredo Sánchez Alberca (asalber@ceu.es)

var q, df1, df2, tail, fun;

function calculate () {
	df1 = getString("df1");
	df2 = getString("df2");
	q = "c (" + getString("q").replace (/[, ]+/g, ", ") + ")";
	tail = getString("tail");
	echo ('result <- (pf(q = ' + q + ', df1 = ' + df1 + ', df2 = ' + df2 + ', ' + tail + '))\n');
	if(parseFloat(df2)<5){
		max = 10
	}
	else{
		max = parseFloat(df2)/(parseFloat(df2)-2)+4*Math.sqrt(2*Math.pow(parseFloat(df2),2)*(parseFloat(df1)+parseFloat(df2)-2)/(parseFloat(df1)*Math.pow((parseFloat(df2)-2),2)*(parseFloat(df2)-4)));
	}
}

function printout () {
	echo ('rk.header ("Probabilidad acumulada F de Fisher F(' + df1 + ',' + df2 + ')", list ("Grados de libertad del numerador" = "' + df1 + '", "Grados de libertad del denominador" = "' + df2 + '", "Cola de acumulaci&oacute;n" = ');
	if (tail=="lower.tail=TRUE" )
		echo('"Izquierda (&lt;)"));\n');
	else
		echo('"Derecha (&gt;)"));\n');
	echo ('rk.results (list("Valores" = ' + q + ', "Probabilidades acumuladas" = result))\n');
	// Plot
	if (getBoolean("plot")){
		if (tail=="lower.tail=TRUE" ){
			echo('x <- seq(0,' + q + '[1], length.out= 100)\n');
		} else {
			echo('x <- seq(' + q + '[1],' + max + ', length.out= 100)\n');
		}
		echo('y <- df(x,' + df1 + ',' + df2 + ')\n');
		echo('rk.graph.on()\n');
		echo('try ({\n');
		echo('p <- qplot(x=c(0, ' + max + '), geom="blank") + geom_area(aes(x=c(x[1],x,x[100]), c(0,y,0)), fill=I("#FF9999"), alpha=0.5) + stat_function(fun=df, colour="#FF5555", n=201, args=list(df1=' + df1 + ', df2=' + df2 + ')) + xlab(expression(italic("X"))) + ylab(expression(paste("Densidad ",italic(f(x))))) + scale_x_continuous(breaks=c(' + q + '[1]))'); 
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
