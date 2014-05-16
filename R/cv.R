#' Coeficiente de variación
#'
#' \code{cv} calcula el coeficiente de variación de Pearson que se define como la desviación típica dividida entre el valor absoluto de la media.
#'
#' @param x a numeric vector. 
#' @param na.rm a logical value indicating whether NA values should be stripped before the computation proceeds.
#' @export 
#' @examples
#' cv(rnorm(1000,mean=1,sd=1))

cv <- function(x, na.rm = FALSE) {
	return (stdev(x, na.rm=na.rm)/abs(mean(x, na.rm=na.rm)))
}