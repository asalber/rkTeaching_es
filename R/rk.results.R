# Correction of function rk.results of package rkWard

rk.results <- function (x, titles = NULL, print.rownames) 
{
	sink(rk.get.output.html.file(), append = TRUE)
	on.exit(sink())
	if (is.table(x) && (length(dim(x)) == 2)) {
		rows = dim(x)[1]
		cols = dim(x)[2]
		if (is.null(titles)) {
			titles <- names(dimnames(x))
		}
		rn <- dimnames(x)[[1]]
		if (!is.na(titles[1])) 
			rn <- paste(titles[1], "=", rn)
		cn <- dimnames(x)[[2]]
		if (!is.na(titles[2])) 
			cn <- paste(titles[2], "=", cn)
		titles <- c("", cn)
		x <- data.frame(cbind(x), stringsAsFactors = FALSE)
		rownames(x) <- as.character(rn)
		if (missing(print.rownames)) 
			print.rownames <- TRUE
	}
	if (is.list(x)) {
		if (is.data.frame(x)) {
			if (missing(print.rownames)) 
				print.rownames <- !isTRUE(all.equal(rownames(x), as.character(1:dim(x)[1])))
			if (isTRUE(print.rownames)) {
				x <- cbind(rownames(x), x, stringsAsFactors = FALSE)
				names(x)[1] <- ""
			}
		}
		if (is.null(titles)) {
			titles <- names(x)
		}
		cat("<table border=\"1\">\n<tr>")
		try({
					for (i in 1:length(x)) {
						cat('<th scope="col">', titles[i], "</th>", sep = "")
					}
					cat("</tr>\n")
					if (is.data.frame(x)) {
						for (row in 1:dim(x)[1]) {
							cat("<tr>")
							for (col in 1:dim(x)[2]) {
								cat(paste("<td>", x[row, col], "</td>", sep = ""))
							}
							cat("</tr>\n")
						}
					}
					else {
						cat("<tr>")
						for (col in x) {
							col <- as.vector(col)
							cat("<td>")
							for (row in 1:length(col)) {
								if (row != 1) 
									cat("<br/>")
								cat(col[row])
							}
							cat("</td>")
						}
						cat("</tr>\n")
					}
				})
		cat("</table>\n")
	}
	else if (is.vector(x)) {
		cat("<h3>", titles[1], ": ", sep = "")
		cat(x)
		cat("</h3>")
	}
	else {
		stop("uninmplemented")
	}
}



