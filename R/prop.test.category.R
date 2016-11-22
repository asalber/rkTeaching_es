
#' Proportion test from for a category of a variable
#'
#' @param x is a vector.
#' @param category is the value for the category to estimate the proportion.
#' @param ... 
#'
#' @return a list with the output of the proportion test.
#' @export
#'
#' @examples
prop.test.category <- function (x, category, ...){
  freq <- length(x[x==category])
  n <- length(x)
  return(prop.test(freq, n, ...))
}