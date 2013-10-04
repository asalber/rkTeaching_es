# Translation of function rk.results of package rkWard to Spanish
# Alfredo Sánchez Alberca (asalber@ceu.es)

rk.header <- function (title, parameters = list(), level = 1, toc = NULL) 
{
	sink(rk.get.output.html.file(), append = TRUE)
	on.exit(sink())
	if (!isTRUE(options(".rk.suppress.toc")[[1]])) {
		header.id <- format(Sys.time(), "%Y-%m-%d_%H:%M:%OS6")
		header.title <- format(Sys.time(), "%Y-%m-%d&nbsp;%H:%M:%S")
		cat("<h", level, "><a id=\"", header.id, "\" name=\"", 
				header.id, "n\" title=\"", header.title, "\">", title, 
				"</a></h", level, ">\n", sep = "")
		if (isTRUE(toc) || (is.null(toc) && level <= 4)) {
			cat("<script type=\"text/javascript\">\n\t<!--\n\t\taddToTOC('", 
					header.id, "','", level, "');\n\t// -->\n</script>\n", 
					sep = "")
		}
	}
	else {
		cat("<h", level, ">", title, "</h", level, ">\n", sep = "")
	}
	if (length(parameters)) {
		if (is.null(names(parameters))) {
			s <- seq.int(1, length(parameters), by = 2)
			pnames <- as.character(parameters[s])
			parameters <- parameters[s + 1]
		}
		else {
			pnames <- names(parameters)
		}
		cat("<h", level + 1, ">Par&aacute;metros</h", level + 1, ">\n<ul>", 
				sep = "")
		for (i in 1:length(parameters)) {
			cat("<li>", pnames[i], ": ", parameters[[i]], "</li>\n", 
					sep = "")
		}
		cat("</ul>\n")
	}
#	if (level == 1) 
#		cat(.rk.date())
	cat("<br />\n")
}

