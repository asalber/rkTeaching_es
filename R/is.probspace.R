#' Chequeo de espacios probabilísticos 
#'
#' \code{is.probspace} check if a data.frame is a probability space. 
#' This is a rewrite of the \code{\link[prob]{is.probspace}} function of package \code{\link{prob}}, to check if the probability sum is less than 1. 
#'
#' @param x a data frame or a list of class ps. 
#' @export logical
#' @examples 
#' S <- rolldie(3, makespace = TRUE)
#' is.probspace(S)

is.probspace <- function (x) {
	if (any(class(x) == "ps")) 
		return(TRUE)
	if (!is.data.frame(x) | is.null(x[["probs"]])) 
		return(FALSE)
	if (any(x[["probs"]] < 0)) 
		return(FALSE)
	if (sum(x[["probs"]])>1)
		return(FALSE)
	return(TRUE)
}
