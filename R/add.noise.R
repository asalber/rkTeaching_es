add.noise <- function (x, dist="norm", seed=NULL, rate=1){
	if (!is.null(seed)) set.seed(seed)
	sd=sd(x)
	if (dist=="norm"){
		return(x + rnorm(length(x),sd=sd)/rate)
	}
	if (dist=="unif"){
		return(x + runif(length(x),min=3*sd,max=3*sd)/rate)
	}
}

