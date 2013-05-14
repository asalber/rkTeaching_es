covariance <- function(x,y) {
	return (mean(x*y)-mean(x)*mean(y))
}