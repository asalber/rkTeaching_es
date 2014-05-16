#' Covariance 
#' 
#' This function calculates the covariance of two vectors 
#' @param x, y numerical vectors
#' @param ... expressions evaluated in the context of \code{x} and \code{y} and passed to other called functions
#' @keywords covariance
#' @export 
#' @examples
#' covariance(rnorm(10),rnorm(10))

## Revise to adapt to missing data 
covariance <- function(x,y,...) {
	return (mean(x*y,...)-mean(x,...)*mean(y,...))
}

