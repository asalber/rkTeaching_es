//author: Alfredo Sánchez Alberca (asalber@ceu.es)

function preprocess(){
	// add requirements etc. here
	echo('require(TeachingExtras)\n');
}

function printout () {
	doPrintout (true);
}

function preview () {
	doPrintout (false);
}

// internal helper functions
function doPrintout (full) {
	var n = getValue("size");
	var p = getValue("prob")
	
	if (full) {
		echo ('rk.header ("Small Numbers Law", parameters=list ("Binomial Trials" = ' + n + ', "Binomial Success probability" = ' + p + '"Poisson mean" = ' + n*p + '))\n');
		echo ('\n');
		echo ('rk.graph.on ()\n');
	}

	echo ('try ({\n');
	echo ('n <- ' +  n + '\n');
	echo ('p <- ' +  p + '\n');
	echo ('mu <- p*n\n');
	echo ('sd <- sqrt(n*p*(1-p))\n');
	echo ('plot( seq(0,n), dpois( seq(0,n), mu ), type="h", xlim=c(-1,n+1), xlab="x", ylab="Probability", ylim=range(0,dpois( seq(0,n), mu), dbinom(seq(0,n),n,p)))\n');
	echo ('points( seq(0,n), dpois( seq(0,n), mu ), pch=16, col="blue")\n');
	echo ('points( seq(0,n), dbinom( seq(0,n), n, p), type="h")\n');
	echo ('abline(h=0)\n');
	echo ('points( seq(0,n), dbinom( seq(0,n), n, p), pch=18, col="red" )\n');
	echo ('title( paste("Mean =",round(mu,3),"Std. Dev. =",round(sd,3)))\n');
	echo ('legend("topright", c("Binomial", "Poisson"), col = c("red","blue"), pch = c(18,16), merge = TRUE)\n');

	echo ('})\n');
	if (full) {
		echo ('rk.graph.off ()\n');
	}
}


