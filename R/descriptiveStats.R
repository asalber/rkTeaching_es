descriptiveStats <- function (data, groups, statistics = c("min", "max", "mean", "median", "Mode", "variance", "unvariance", "stdev", "sd", "cv", "ran", "iqrange", "skewness", "kurtosis", "quantiles"),
		quantiles = c(0, 0.25, 0.5, 0.75, 1), na.rm=TRUE) 
{
	if (!require(abind)) stop("abind package missing")
	if (!require(e1071)) stop("e1071 package missing")
	data <- as.data.frame(data)
	if (!missing(groups)) groups <- as.factor(groups)
	variables <- names(data)
	statistics <- match.arg(statistics, c("min", "max", "mean", "median", "Mode", "variance", "unvariance", "stdev", "sd", "cv", "ran", "iqrange", "skewness", "kurtosis", "quantiles"), several.ok = TRUE)
	ngroups <- if (missing(groups)) 1 else length(grps <- levels(groups))
	quantiles <- if ("quantiles" %in% statistics) quantiles else NULL
	quants <- if (length(quantiles) >= 1) paste(100 * quantiles, "%", sep = "") else NULL
	nquants <- length(quants)
	stats <- c(c("min", "max", "mean", "median", "Mode", "variance", "unbiased.variance", "sd", "unbiased.sd", "coef.variation", "range", "iq.range", "skewness", "kurtosis")
					[c("min", "max", "mean", "median", "Mode", "variance", "unvariance", "stdev", "sd", "cv", "ran", "iqrange", "skewness", "kurtosis") %in% statistics], quants)
	nstats <- length(stats)
	nvars <- length(variables)
	result <- list()
	if ((ngroups == 1) && (nvars == 1) && (length(statistics) == 1)) {
		table <- matrix(0, nvars, nstats)
		if (statistics == "quantiles") {
			.q <- quantile(data[, variables], probs = quantiles, na.rm = na.rm)
			table[1,] <- .q
			colnames(table) <- names(.q)
		}
		else {
			table[1,] <- do.call(statistics, list(data[, variables], na.rm = na.rm))
			colnames(table) <- statistics
		}
		rownames(table) <- ""
		NAs <- sum(is.na(data[, variables]))
		n <- nrow(data) - NAs
		result$type <- 1
	}
	else if ((ngroups > 1) && (nvars == 1) && (length(statistics) == 1)) {
		if (statistics == "quantiles") {
			table <- matrix(unlist(tapply(data[, variables], groups, quantile, probs = quantiles, na.rm = na.rm)), ngroups, nquants, byrow = TRUE)
			rownames(table) <- grps
			colnames(table) <- quants
		}
		else table <- tapply(data[, variables], groups, statistics, na.rm = na.rm)
		NAs <- tapply(data[, variables], groups, function(x) sum(is.na(x)))
		n <- table(groups) - NAs
		result$type <- 2
	}
	else if ((ngroups == 1)) {
		table <- matrix(0, nvars, nstats)
		rownames(table) <- if (length(variables) > 1) variables	else ""
		colnames(table) <- stats
		if ("min" %in% stats) 
			table[, "min"] <- min(data[, variables], na.rm = na.rm)
		if ("max" %in% stats) 
			table[, "max"] <- max(data[, variables], na.rm = na.rm)
		if ("mean" %in% stats) 
			table[, "mean"] <- mean(data[, variables], na.rm = na.rm)
		if ("median" %in% stats) 
			table[, "median"] <- median(data[, variables], na.rm = na.rm)
		if ("Mode" %in% stats) 
			table[, "Mode"] <- Mode(data[, variables])
		if ("variance" %in% stats) 
			table[, "variance"] <- variance(data[, variables], na.rm = na.rm)
		if ("unbiased.variance" %in% stats) 
			table[, "unbiased.variance"] <- unvariance(data[, variables], na.rm = na.rm)
		if ("sd" %in% stats) 
			table[, "sd"] <- stdev(data[, variables], na.rm = na.rm)
		if ("unbiased.sd" %in% stats) 
			table[, "unbiased.sd"] <- sd(data[, variables], na.rm = na.rm)
		if ("coef.variation" %in% stats) 
			table[, "coef.variation"] <- cv(data[, variables], na.rm = na.rm)
		if ("range" %in% stats) 
			table[, "range"] <- ran(data[, variables], na.rm = na.rm)
		if ("iq.range" %in% stats) 
			table[, "iq.range"] <- iqrange(data[, variables], na.rm = na.rm)
		if ("skewness" %in% stats) 
			table[, "skewness"] <- apply(as.matrix(data[, variables]), MARGIN = 2, skewness, na.rm = na.rm)
		if ("kurtosis" %in% stats) 
			table[, "kurtosis"] <- apply(as.matrix(data[, variables]), MARGIN = 2, kurtosis, na.rm = na.rm)
		if ("quantiles" %in% statistics) 
			table[, quants] <- t(apply(data[, variables, drop = FALSE], 2, quantile, probs = quantiles, na.rm = na.rm))
		NAs <- colSums(is.na(data[, variables, drop = FALSE]))
		n <- nrow(data) - NAs
		result$type <- 3
	}
	else {
		table <- array(0, c(ngroups, nstats, nvars), dimnames = list(Group = grps, Statistic = stats, Variable = variables))
		NAs <- matrix(0, nvars, ngroups)
		rownames(NAs) <- variables
		colnames(NAs) <- grps
		for (variable in variables) {
			if ("min" %in% stats) 
				table[, "min", variable] <- tapply(data[, variable], groups, min, na.rm = na.rm)
			if ("max" %in% stats) 
				table[, "max", variable] <- tapply(data[, variable], groups, max, na.rm = na.rm)
			if ("mean" %in% stats) 
				table[, "mean", variable] <- tapply(data[, variable], groups, mean, na.rm = na.rm)
			if ("median" %in% stats) 
				table[, "median", variable] <- tapply(data[, variable], groups, median, na.rm = na.rm)
			if ("Mode" %in% stats) 
				table[, "Mode", variable] <- tapply(data[, variable], groups, Mode)
			if ("variance" %in% stats) 
				table[, "variance", variable] <- tapply(data[, variable], groups, variance, na.rm = na.rm)
			if ("unbiased.variance" %in% stats) 
				table[, "unbiased.variance", variable] <- tapply(data[, variable], groups, unvariance, na.rm = na.rm)
			if ("sd" %in% stats) 
				table[, "sd", variable] <- tapply(data[, variable], groups, stdev, na.rm = na.rm)
			if ("unbiased.sd" %in% stats) 
				table[, "unbiased.sd", variable] <- tapply(data[, variable], groups, sd, na.rm = na.rm)
			if ("coef.variation" %in% stats) 
				table[, "coef.variation", variable] <- tapply(data[, variable], groups, cv, na.rm = na.rm)
			if ("range" %in% stats) 
				table[, "range", variable] <- tapply(data[, variable], groups, ran, na.rm = na.rm)
			if ("iq.range" %in% stats) 
				table[, "iq.range", variable] <- tapply(data[, variable], groups, iqrange, na.rm = na.rm)
			if ("skewness" %in% stats) 
				table[, "skewness", variable] <- tapply(data[, variable], groups, skewness, na.rm = na.rm)
			if ("kurtosis" %in% stats) 
				table[, "kurtosis", variable] <- tapply(data[, variable], groups, kurtosis, na.rm = na.rm)
			if ("quantiles" %in% statistics) {
				res <- matrix(unlist(tapply(data[, variable], groups, quantile, probs = quantiles, na.rm = na.rm)), ngroups, nquants, byrow = TRUE)
				table[, quants, variable] <- res
			}
			NAs[variable, ] <- tapply(data[, variable], groups, function(x) sum(is.na(x)))
		}
		if (nstats == 1) 
			table <- table[, 1, ]
		if (nvars == 1) 
			table <- table[, , 1]
		n <- table(groups)
		n <- matrix(n, nrow = nrow(NAs), ncol = ncol(NAs), byrow = TRUE)
		n <- n - NAs
		result$type <- 4
	}
	result$table <- table
	result$statistics <- statistics
	result$n <- n
	if (any(NAs > 0)) 
		result$NAs <- NAs
	class(result) <- "descriptiveStats"
	return(result)
}


print.descriptiveStats <- function (x, ...) 
{
	NAs <- x$NAs
	table <- x$table
	n <- x$n
	statistics <- x$statistics
	switch(x$type, "1" = {
				if (!is.null(NAs)) {
					table <- cbind(table, n, NAs)
					colnames(table)[length(table) - 1:0] <- c("n", "NA")
				}
				print(table)
			}, "2" = {
				if (statistics == "quantiles") {
					table <- cbind(table, n)
					colnames(table)[ncol(table)] <- "n"
					if (!is.null(NAs)) {
						table <- cbind(table, NAs)
						colnames(table)[ncol(table)] <- "NA"
					}
				}
				else {
					table <- rbind(table, n)
					rownames(table)[c(1, nrow(table))] <- c(statistics, "n")
					if (!is.null(NAs)) {
						table <- rbind(table, NAs)
						rownames(table)[nrow(table)] <- "NA"
					}
					table <- t(table)
				}
				print(table)
			}, "3" = {
				table <- cbind(table, n)
				colnames(table)[ncol(table)] <- "n"
				if (!is.null(NAs)) {
					table <- cbind(table, NAs)
					colnames(table)[ncol(table)] <- "NA"
				}
				print(table)
			}, "4" = {
				if (length(dim(table)) == 2) {
					table <- cbind(table, t(n))
					colnames(table)[ncol(table)] <- "n"
					if (!is.null(NAs)) {
						table <- cbind(table, t(NAs))
						colnames(table)[ncol(table)] <- "NA"
					}
					print(table)
				}
				else {
					table <- abind(table, t(n), along = 2)
					dimnames(table)[[2]][dim(table)[2]] <- "n"
					if (!is.null(NAs)) {
						table <- abind(table, t(NAs), along = 2)
						dimnames(table)[[2]][dim(table)[2]] <- "NA"
					}
					nms <- dimnames(table)[[3]]
					for (name in nms) {
						cat("\nVariable:", name, "\n")
						print(table[, , name])
					}
				}
			})
	invisible(x)
}

