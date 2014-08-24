#' Probability space of a repeated random experiment
#'
#' \code{repeat.probspace} build the probability space of the independent repetition of a random experiment.  
#'
#' @param probspace is a vector of probability spaces
#' @nrep the number of repetition of the experiment
#' @export a probability space corresponding to the rep repetitions of the experiment with probability space probspace  
#' @examples 
#' library(prob)
#' s <- probspace(tosscoin(1), probs=c(0.7,0.3))
#' repeat.probspace(s,3)

repeat.probspace <- function (probspace, nrep=1) {
	require(prob)
	require(Hmisc)
	# Check if probspace is a probability space
	if (!is.probspace(probspace))
		stop(paste(deparse(substitute(probspace)), "is not a probability space"))
	# Save variables names of probspace 
	vars <- names(probspace[!(names(probspace) %in% c("probs"))])
	# Replicate probspace nrep times
	spaces <- rep(list(probspace),nrep)
	# Extract probability columns from probability spaces
	probs <- lapply(spaces, function(x) x[["probs"]])
	# Extract non probability columns from probability spaces
	spaces <- lapply(spaces, function(x) x[!(names(probspace) %in% c("probs"))])
	# Combine cases of probability spaces 
	spaces <- Reduce(function(...) merge(..., by=NULL), spaces)
	# Rename variables of combined probability space
	vars <- paste(vars,as.vector(sapply(1:nrep, rep, length(vars))),sep=".")
	names(spaces) <- vars
	# Multipliy probabilities of probability spaces
	probs <- as.vector(Reduce(function(...) outer(...), probs))
	# Add new probabilities to the combined probability space
	spaces[["probs"]] <- probs
	return(spaces)
}
