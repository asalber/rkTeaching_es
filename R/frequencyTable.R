frequencyTable <- function(data, variable, groups=NULL, decimals=4){
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
		result <- na.omit(data[variable])
		result <- count(result, variable)
		colnames(result)[2] <- "Frec.Abs."
		result <- mutate(result,Frec.Rel.=round(Frec.Abs./sum(Frec.Abs.),decimals),Frec.Abs.Acum.=cumsum(Frec.Abs.),Frec.Rel.Acum.=round(Frec.Abs.Acum./sum(Frec.Abs.),decimals))
	}
	else {
		f <- function(df){
			output <- na.omit(df[variable])
			output <- count(output,variable)
			colnames(output)[2] <- "Frec.Abs."
			mutate(output,Frec.Rel.=round(Frec.Abs./sum(Frec.Abs.),decimals),Frec.Abs.Acum.=cumsum(Frec.Abs.),Frec.Rel.Acum.=round(Frec.Abs.Acum./sum(Frec.Abs.),decimals))
		}
		result <- dlply(data,groups,f)
	}
	return(result)
}