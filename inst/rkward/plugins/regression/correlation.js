// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var missing;
var method;
var p;

function preprocess() {
}

function calculate () {
	method = getValue("method");
	p = getValue ("p");
	var exclude_whole = "";
	var vars = trim (getValue ("x"));
	missing = getValue ("missing");
	if (missing == "pairwise") {
		exclude_whole = false;
			missing = '"pairwise.complete.obs"';
	} else {
		exclude_whole = true;
		missing = '"complete.obs"';
	}

	echo ('# building data frame\n');
	echo ('data.list <- rk.list (' + vars.split ("\n").join (", ") + ')\n');
	echo ('# Non-numeric variables will be treated as ordered data and transformed into numeric ranks\n');
	echo ('transformed.vars <- list()\n');
	echo ('for (i in names(data.list)) {\n');
	echo ('	if(!is.numeric(data.list[[i]])){\n');
	echo ('		before.vars <- as.character(unique(data.list[[i]]))\n');
	echo ('		data.list[[i]] <- xtfrm(data.list[[i]])\n');
	echo ('		after.vars <- unique(data.list[[i]])\n');
	echo ('		names(after.vars) <- before.vars\n');
	echo ('		# Keep track of all transformations\n');
	echo ('		transformed.vars[[i]] <- data.frame(rank=sort(after.vars))\n');
	echo ('	} else {}\n');
	echo ('}\n');
	echo ('# Finally combine the actual data\n');
	echo ('data <- as.data.frame (data.list, check.names=FALSE)\n');
	echo ('\n');
	echo ('# calculate correlation matrix\n');
	echo ('result <- cor (data, use=' + missing + ', method="' + method + '")\n');
	if (p) {
		echo ('# calculate matrix of probabilities\n');
		echo ('result.p <- matrix (nrow = length (data), ncol = length (data), dimnames=list (names (data), names (data)))\n');
		if (exclude_whole) {
			echo ('# as we need to do pairwise comparisons for technical reasons,\n');
			echo ('# we need to exclude incomplete cases first to match the use="complete.obs" parameter in cor()\n');
			echo ('data <- data[complete.cases (data),]\n');
		} else {}
		echo ('for (i in 1:length (data)) {\n');
		echo ('	for (j in i:length (data)) {\n');
		echo ('		if (i != j) {\n');
		echo ('			t <- cor.test (data[[i]], data[[j]], method="' + method + '")\n');
		echo ('			result.p[i, j] <- t$p.value\n');
		echo ('			result.p[j, i] <- sum (complete.cases (data[[i]], data[[j]]))\n');
		echo ('		}\n');
		echo ('	}\n');
		echo ('}\n');
	}
}

function printout () {
	echo ('rk.header ("Matriz de Correlaci&oacute;n", parameters=list ("M&eacute;todo" = "' + method + '", "Exclusi&oacute;n de casos con valores omitidos" = ' + missing + '))\n');
	echo ('rk.header ("Coeficientes de correlaci&oacute;n", level=3)\n');
	echo ('rk.results (data.frame (result, check.names=FALSE), titles=c ("Coeficientes", names (data)))\n');
	if (p) {	
		echo ('rk.header ("p-valor y tama&ntilde;o de la muestra", level=3)\n');
		echo ('rk.results (data.frame (result.p, check.names=FALSE), titles=c ("n \\\\ p", names (data)))\n');
	}
	echo ('if(length(transformed.vars) > 0){\n');
	echo ('	rk.header("Variables tratadas como rangos num&eacute;ricos", level=3)\n');
	echo ('	for (i in names(transformed.vars)) {\n');
	echo ('		rk.print(paste("Variable:", i))\n');
	echo ('		rk.results(transformed.vars[[i]], titles=c("Valor original", "Rango asignado"))\n');
	echo ('	}\n');
	echo ('}\n');
}


