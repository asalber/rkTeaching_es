#' Interquartile range
#'
#' This function calculates the interquartile range of a vector (third quartile minus first quartile).
#'
#' @param x numerical vector.
#' @param na.rm a logical value indicating whether NA values should be stripped before the computation proceeds.
#' @return a numerical value that is the interquartile range of \code{x}.
#' @keywords interquartile range
#' @export
#' @examples
#' iqrange(rnorm(100))

iqrange <- function (x, na.rm=FALSE){
	return (quantile(x, probs =0.75, names=FALSE, na.rm = na.rm) - quantile(x, probs =0.25, names=FALSE, na.rm = na.rm))
}

