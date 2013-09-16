descriptiveStats <- function (data, groups=NULL, statistics = c("min", "max", "mean", "median", "Mode", "variance", "unvariance", "stdev", "sd", "cv", "ran", "iqrange", "skewness", "kurtosis", "quantiles"),
		quantiles = c(0, 0.25, 0.5, 0.75, 1), na.rm=TRUE) {
	require(e1071)
	require(plyr)
	data <- as.data.frame(data)
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
	statistics <- match.arg(statistics, c("min", "max", "mean", "median", "Mode", "variance", "unvariance", "stdev", "sd", "cv", "ran", "iqrange", "skewness", "kurtosis", "quantiles"), several.ok = TRUE)
	stats <- c(c(min, max, mean, median, Mode, variance, unvariance, stdev, sd, cv, ran, iqrange, skewness, kurtosis)
					[c("min", "max", "mean", "median", "Mode", "variance", "unvariance", "stdev", "sd", "cv", "ran", "iqrange", "skewness", "kurtosis") %in% statistics])
	names <- c(c("Min", "Max", "Media", "Mediana", "Moda", "Varianza", "Cuasivarianza", "Desv.T&iacute;pica", "Cuasidesv.T&iacute;pica", "Coef.Variaci&oacute;n", "Rango", "Rango.Intercuart&iacute;lico", "Coef.Asimetr&iacute;a", "Coef.Apuntamiento")
					[c("min", "max", "mean", "median", "Mode", "variance", "unvariance", "stdev", "sd", "cv", "ran", "iqrange", "skewness", "kurtosis") %in% statistics])
	nmissing <- function(x) sum(is.na(x))
	nnomissing <- function(x) sum(!is.na(x))
	f <- function(df) {
		table <- colwise(each(stats))(df,na.rm=na.rm)
		if ("quantiles" %in% statistics) {
			quantnames <- if (length(quantiles) >= 1) paste(100 * quantiles, "%", sep = "") else NULL
			table <- rbind(table,colwise(quantile)(df,probs=quantiles,na.rm=na.rm))
			names <- c(names, quantnames)
		}
		table <- rbind(table,colwise(each(nmissing,nnomissing))(df))
		names <- c(names, "Perdidos", "V&aacute;lidos")
		rownames(table) <- names
		table <- as.data.frame(t(table))
	}
	if (is.null(groups)){
		result <- f(data)
	}
	else {
		result <- dlply(data,groups,f)
	}
	return(result)	
}
