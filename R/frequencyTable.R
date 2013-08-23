frequencyTable <- function(data, variable, groups=NULL){
	require(plyr)
	if (!is.data.frame(data)) {
		stop("data must be a data frame")
	}
	if (!variable %in% colnames(data)) {
		stop(paste(variable, " is not a column of data frame"))
	}
	if (!is.null(groups)) {
		for (i in 1:length(groups)) {
			if (!groups[i] %in% colnames(data)) {
				stop(paste(groups[i], " is not a column of data frame", data))
			}
		}
	}
	if (is.null(groups)){
		result <- count(data, variable)
		colnames(result)[2] <- "Freq.Abs"
		result <- mutate(result,Freq.Rel=Freq.Abs/sum(Freq.Abs),Frec.Abs.Acum=cumsum(Freq.Abs),Frec.Rel.Acum=cumsum(Freq.Rel))
	}
	else {
		f <- function(df){
			output <- count(df,variable)
			colnames(output)[2] <- "Freq.Abs"
			mutate(output,Freq.Rel=Freq.Abs/sum(Freq.Abs),Frec.Abs.Acum=cumsum(Freq.Abs),Frec.Rel.Acum=cumsum(Freq.Rel))
		}
		result <- dlply(data,groups,f)
	}
	return(result)
}