iqrange <- function (x, na.rm=FALSE){
	return (quantile(x, probs =0.75, names=FALSE, na.rm = na.rm) - quantile(x, probs =0.25, names=FALSE, na.rm = na.rm))
}

