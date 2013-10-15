Mode <- function(x, na.rm=TRUE, ...) {
	if (na.rm){
		x <- x[!is.na(x)]
	}
	xval <- unique(x)
	xval[which.max(tabulate(match(x,xval)))]
}