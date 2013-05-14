sampleSizeOneMean <- function(mean=NULL, sd=1, sig.level=0.05, error=0.1, error.type=c("absolute", "relative")) {
	if (is.null(sig.level) || !is.numeric(sig.level) || any(sig.level<0 | sig.level>1))
		stop(sQuote("sig.level"), " must be numeric in [0, 1]")
	error.type <- match.arg(error.type)
	terror <- switch(error.type, absolute = 1, relative = 2)
	if (terror == 2){
		if (is.null(mean))
			stop(sQuote("mean"), " must be stablished with relative error")
		error = mean*error
	}
	body <- quote({
				qt(sig.level/2, n-1, lower = TRUE) * sd / sqrt(n) + error
			})	
	n <- uniroot(function(n) eval(body), c(2+1e-10, 1e+07))$root
	METHOD <- "Sample size for one normal mean estimation"
	structure(list(n = n, mean=mean, sig.level = sig.level, error = error, method = METHOD), class = "power.htest")
}



