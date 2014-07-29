#' A Standard Set of Playing Cards
#'
#' \code{cards} make the probabilistic space corresponding to draw a card from deck of playing cards.
#' This is a rewrite of the \code{\link[prob]{cards}} function of package \code{\link{prob}}, to incorporate spanish cards.  
#'
#' @param type a string indicating the type of cards (default "us").
#' @jokers a logical value indicating if jockers should be included. 
#' @param makespace a numeric vector. 
#' @export 
#' A data frame with columns rank and suit, and optionally a column of equally likely probs.
#' @examples
#' cards()
#' cards(makespace = TRUE)
#' # spanish cards
#' cards(type="es", 

cards <- function (type="us", jokers = FALSE, makespace = FALSE) 
{
	if (type=="es"){
		x <- c(1:7, "Sota", "Caballo", "Rey")
		y <- c("Bastos", "Copas", "Espadas", "Oros")
		res <- expand.grid(numero = x, palo = y)
	}
	else {
		x <- c(2:10, "J", "Q", "K", "A")
		y <- c("Club", "Diamond", "Heart", "Spade")
		res <- expand.grid(rank = x, suit = y)
		if (jokers) {
			levels(res$rank) <- c(levels(res$rank), "Joker")
			res <- rbind(res, data.frame(rank = c("Joker", "Joker"), 
							suit = c(NA, NA)))
		}
	}
	if (makespace) {
		res$probs <- rep(1, dim(res)[1])/dim(res)[1]
	}
	return(res)
}