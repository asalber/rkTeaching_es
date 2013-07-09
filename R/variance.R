variance <- function(x, na.rm = FALSE) {
	if (na.rm==TRUE) x <- na.omit(x) 
	return(sum(x^2)/length(x)-mean(x,na.rm=na.rm)^2)
}

