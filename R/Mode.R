Mode <- function(data, ...) {
	x <- unique(data)
	x[which.max(tabulate(match(data,x)))]
}