cv <- function(x, na.rm = FALSE) {
	return (stdev(x, na.rm=na.rm)/abs(mean(x, na.rm=na.rm)))
}