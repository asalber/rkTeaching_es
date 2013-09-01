frequencyTableIntervals <- function(data, variable, breaks, right=FALSE, include.lowest=TRUE, center=FALSE, width=FALSE, groups=NULL){
	require(plyr)
	if (!is.data.frame(data)) {
		stop("data must be a data frame")
	}
	if (!variable %in% colnames(data)) {
		stop(paste(variable, "is not a column of data frame"))
	}
	if (!is.numeric(data[[variable]])) {
		stop(paste(variable, "must be numeric"))
	}
	if (!is.null(groups)) {
		for (i in 1:length(groups)) {
			if (!groups[i] %in% colnames(data)) {
				stop(paste(groups[i], "is not a column of data frame", data))
			}
			if (!is.factor(data[[groups[i]]])) {
				stop(paste(groups[i], "is not a factor"))
			}
		}
	}
	if (is.null(groups)){
		result <- tabulateFrequenciesIntervals(data=data, variable=variable, breaks=breaks, right=right, include.lowest=include.lowest, center=center, width=width)
	}
	else {
		f <- function(df){
			tabulateFrequenciesIntervals(data=df, variable=variable, breaks=breaks, right=right, include.lowest=include.lowest, center=center, width=width)
		}
		result <- dlply(data, groups, f)
	}
	return(result)
}

tabulateFrequenciesIntervals <- function(data, variable, breaks, right=FALSE, include.lowest=TRUE, center=FALSE, width=FALSE) {
	centers <- (breaks[-1]+breaks[-length(breaks)])/2
	result <- data
	for (i in 1:length(centers)) {
		result[nrow(result)+1,] <- NA
		result[nrow(result),variable] <- centers[i]
	}
	result <- transform(result, clases=cut(result[[variable]], breaks=breaks, right=right, include.lowest=include.lowest))
	result <- count(result, "clases")
	colnames(result)[1] <- paste("Clases",variable,sep=".")
	colnames(result)[2] <- "Frec.Abs."
	result[["Frec.Abs."]] <- result[["Frec.Abs."]] - rep(1,length(centers))
	if (center) {
		result[["Centro"]] <- centers
	}
	if (width) {
		result[["Amplitud"]] <- breaks[-1]-breaks[-length(breaks)]
	}
	if (center | width) {
		result <- cbind(result[,names(result)!="Frec.Abs."], Frec.Abs.=result[["Frec.Abs."]])
	}
	result <- mutate(result, Frec.Rel.=Frec.Abs./sum(Frec.Abs.), Frec.Abs.Acum.=cumsum(Frec.Abs.), Frec.Rel.Acum.=cumsum(Frec.Rel.))
	return(result)
}
