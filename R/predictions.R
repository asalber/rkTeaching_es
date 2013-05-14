predictions <- function(regModel, data, interval="none", ...){
	nvars <- length(regModel$model)
	xnames <- names(regModel$model)[2:nvars]
	xnames <- gsub("I\\(","",xnames)
	xnames <- gsub("1/","",xnames)
	xnames <- gsub("log\\(","",xnames)
	xnames <- gsub("\\)","",xnames)
	yname <- names(regModel$model)[1]
	d <- data.frame(data)
	names(d) <- xnames
	t <- predict(regModel,d,interval=interval,...)
	t <- cbind(d,t)
	t <- as.matrix(t)
	if (interval == "none") {
		colnames(t) <- c(xnames,paste("prediction(",yname,")",sep=""))
	}
	else {
		colnames(t) <- c(xnames,paste("prediction(",yname,")",sep=""),"lwr.conf.int.95%", "upr.conf.int.95%")
	}
	rownames(t) <- rep("",nrow(t))
	return(t)
}