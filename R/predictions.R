predictions <- function(regModel, data, interval="none", ...){
	nvars <- length(regModel$model)
	xnames <- names(regModel$model)[2:nvars]
	xnames <- gsub("I\\(","",xnames)
	xnames <- gsub("1/","",xnames)
	xnames <- gsub("log\\(","",xnames)
	xnames <- gsub("\\)","",xnames)
	yname <- names(regModel$model)[1]
	d <- data.frame(data)
	names(d) <- xnames[1]
	t <- predict(regModel,d,interval=interval,...)
	t <- cbind(d,t)
	if (interval == "none") {
		names(t) <- c(xnames[1],paste("pred.",yname,sep=""))
	}
	else {
		names(t) <- c(xnames[1],paste("pred.",yname,sep=""),"inf.conf.int.95", "sup.conf.int.95")
	}
	return(t)
}