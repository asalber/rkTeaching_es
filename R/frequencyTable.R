frequencyTable <- function(data, variable, groups=NULL){
	require(plyr)
	if (!is.data.frame(data)) {
		stop("data must be a data frame")
	}
	if (!variable %in% colnames(data)) {
		stop(paste(variable, "is not a column of data frame"))
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
		result <- count(data, variable)
		colnames(result)[2] <- "Frec.Abs."
		result <- mutate(result,Frec.Rel.=Frec.Abs./sum(Frec.Abs.),Frec.Abs.Acum.=cumsum(Frec.Abs.),Frec.Rel.Acum.=cumsum(Frec.Rel.))
	}
	else {
		f <- function(df){
			output <- count(df,variable)
			colnames(output)[2] <- "Frec.Abs."
			mutate(output,Frec.Rel.=Frec.Abs./sum(Frec.Abs.),Frec.Abs.Acum.=cumsum(Frec.Abs.),Frec.Rel.Acum.=cumsum(Frec.Rel.))
		}
		result <- dlply(data,groups,f)
	}
	return(result)
}