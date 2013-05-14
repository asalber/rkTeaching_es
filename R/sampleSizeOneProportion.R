sampleSizeOneProportion <- function(p=0.5, sig.level=0.05, error=0.1, N=NULL) {
	if (is.null(sig.level) || !is.numeric(sig.level) || any(sig.level<0 | sig.level>1))
		stop(sQuote("sig.level"), " must be numeric in [0, 1]")
	body <- quote({
				qnorm(sig.level/2, lower = TRUE) * sqrt(p * (1-p)/n) + error
			})	
	n <- uniroot(function(n) eval(body), c(2+1e-10, 1e+07))$root
	if (!is.null(N))
		n <- n*N/(n+N-1)
	METHOD <- "Sample size for one proportion"
	NOTE <- "Using Normal approximation for Binomial"
	structure(list(n = n, p=p, sig.level = sig.level, error = error, Population.size = N, method = METHOD, note = NOTE), class = "power.htest")
}



