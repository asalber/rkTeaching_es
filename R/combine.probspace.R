#' Combining independent probability spaces
#'
#' \code{combine.probspace} combine two o more independent probability spaces.  
#'
#' @param spaces is a vector of probability spaces
#' @export a probability space that is the combination of all the cases in the given probability spaces.  
#' @examples 
#' s1 <- rolldie(3, makespace = TRUE)
#' s2 <- tosscoin(2, makespace=TRUE)
#' combine.probspace(s1,s2)

combine.probspace <- function (...) {
	require(prob)
	require(Hmisc)
	spaces <- llist(...)
	noprobspace <- !sapply(spaces, is.probspace)
	if (sum(noprobspace,na.rm=TRUE)>0)
		stop(paste(c(names(noprobspace[noprobspace]), " are not probability spaces"), collapse=", "))
	probs <- sapply(spaces, function(x) x[["probs"]])
	spaces <- lapply(spaces, function(x) x[!(names(x) %in% c("probs"))])
	spaces <- Reduce(function(...) merge(..., by=NULL), spaces)
	probs <- as.vector(Reduce(function(...) outer(...), probs))
	spaces[["probs"]] <- probs
	return(spaces)
}
