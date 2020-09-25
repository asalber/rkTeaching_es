// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var vars;

function preprocess(){
	echo('require(rkTeaching)\n');
}

function calculate () {
	echo ('x <- ' + getString("x") + '\n');
	echo ('sum <- round(sum(x, na.rm=TRUE),4) \n');
	echo ('sum2 <- round(sum(x^2, na.rm=TRUE),4) \n');
	echo ('n <- sum(!is.na(x)) \n');
	echo ('mean <- round(sum/n,4) \n');
	echo ('variance <- round(sum2/n-mean^2,4) \n');
	echo ('sd <- round(sqrt(variance),4) \n');
	echo ('cv <- round(sd/mean,4) \n');
	echo ('sum3 <- round(sum((x-mean)^3, na.rm=TRUE),4) \n');
	echo ('g1 <- round(sum((x-mean)^3)/(n*sd^3),4) \n');
	echo ('sum4 <- round(sum((x-mean)^4, na.rm=TRUE),4) \n');
	echo ('g2 <- round(sum((x-mean)^4)/(n*sd^4)-3,4) \n');
}

function printout () {
	echo ('rk.header ("Estad&iacute;stica Descriptiva (c&aacute;lculo detallado)", parameters=list("Variable",  rk.get.description(' + getValue("x") + ')))\n');
	if (getBoolean("skewness") && getBoolean("kurtosis")){
		echo('table <- skewnessKurtosisTable(x)\n');
		echo('rk.results(setNames(list(table[,1],table[,2],table[,3],table[,4],table[,5],table[,6],table[,7]),c("\\\\(x_i\\\\)","\\\\(n_i\\\\)","\\\\(x_in_i\\\\)","\\\\(x_i^2n_i\\\\)","\\\\(x_i-\\\\bar x\\\\)","\\\\((x_i-\\\\bar x)^3n_i\\\\)","\\\\((x_i-\\\\bar x)^4n_i\\\\)")))\n');
		echo('rk.header ("Media",level=3)\n');
		echo('rk.print("F&oacute;rmula de la media: \\\\[\\\\bar{x} = \\\\frac{\\\\sum x_in_i}{n}\\\\]")\n');
		echo('rk.print(paste("C&aacute;lculo de la media: \\\\[\\\\bar{x}=\\\\frac{", sum, "}{", n, "}= ", mean, "\\\\]", sep=""))\n');
		echo('rk.header ("Varianza y desviaci&oacute;n t&iacute;pica",level=3)\n');
		echo('rk.print("F&oacute;rmula de la varianza: \\\\[s^2 = \\\\frac{\\\\sum x_i^2n_i}{n}-\\\\bar{x}^2\\\\]")\n');
		echo('rk.print(paste("C&aacute;lculo de la varianza: \\\\[s^2=\\\\frac{", sum2, "}{", n, "}-", mean, "^2 = ", variance, "\\\\]", sep=""))\n');
		echo('rk.print("F&oacute;rmula de la desviaci&oacute;n t&iacute;pica: \\\\[s = \\\\sqrt{s^2}\\\\]")\n');
		echo('rk.print(paste("C&aacute;lculo de la desviaci&oacute;n t&iacute;pica: \\\\[s=\\\\sqrt{", variance, "}=", sd, "\\\\]", sep=""))\n');
		echo('rk.header ("Coeficiente de asimetr&iacute;a",level=3)\n');
		echo('rk.print("F&oacute;rmula del coeficiente de asimetr&iacute;a: \\\\[g_1 = \\\\frac{\\\\sum (x_i-\\\\bar x)^3n_i/n}{s^3}\\\\]")\n');
		echo('rk.print(paste("C&aacute;lculo del coeficiente de asimetr&iacute;a: \\\\[g_1=\\\\frac{", sum3, "/", n, "}{", sd, "^3} = ", g1, "\\\\]", sep=""))\n');
		echo('rk.header ("Coeficiente de apuntamiento",level=3)\n');
		echo('rk.print("F&oacute;rmula del coeficiente de apuntamiento: \\\\[g_2 = \\\\frac{\\\\sum (x_i-\\\\bar x)^4n_i/n}{s^4}-3\\\\]")\n');
		echo('rk.print(paste("C&aacute;lculo del coeficiente de apuntamiento: \\\\[g_2=\\\\frac{", sum4, "/", n, "}{", sd, "^4}-3 = ", g2, "\\\\]", sep=""))\n');
	} else if (getBoolean("kurtosis")){
		echo('table <- kurtosisTable(x)\n');
		echo('rk.results(setNames(list(table[,1],table[,2],table[,3],table[,4],table[,5],table[,6]),c("\\\\(x_i\\\\)","\\\\(n_i\\\\)","\\\\(x_in_i\\\\)","\\\\(x_i^2n_i\\\\)","\\\\(x_i-\\\\bar x\\\\)","\\\\((x_i-\\\\bar x)^4n_i\\\\)")))\n');
		echo('rk.header ("Media",level=3)\n');
		echo('rk.print("F&oacute;rmula de la media: \\\\[\\\\bar{x} = \\\\frac{\\\\sum x_in_i}{n}\\\\]")\n');
		echo('rk.print(paste("C&aacute;lculo de la media: \\\\[\\\\bar{x}=\\\\frac{", sum, "}{", n, "}= ", mean, "\\\\]", sep=""))\n');
		echo('rk.header ("Varianza y desviaci&oacute;n t&iacute;pica",level=3)\n');
		echo('rk.print("F&oacute;rmula de la varianza: \\\\[s^2 = \\\\frac{\\\\sum x_i^2n_i}{n}-\\\\bar{x}^2\\\\]")\n');
		echo('rk.print(paste("C&aacute;lculo de la varianza: \\\\[s^2=\\\\frac{", sum2, "}{", n, "}-", mean, "^2 = ", variance, "\\\\]", sep=""))\n');
		echo('rk.print("F&oacute;rmula de la desviaci&oacute;n t&iacute;pica: \\\\[s = \\\\sqrt{s^2}\\\\]")\n');
		echo('rk.print(paste("C&aacute;lculo de la desviaci&oacute;n t&iacute;pica: \\\\[s=\\\\sqrt{", variance, "}=", sd, "\\\\]", sep=""))\n');
		echo('rk.header ("Coeficiente de apuntamiento",level=3)\n');
		echo('rk.print("F&oacute;rmula del coeficiente de apuntamiento: \\\\[g_2 = \\\\frac{\\\\sum (x_i-\\\\bar x)^4n_i/n}{s^4}-3\\\\]")\n');
		echo('rk.print(paste("C&aacute;lculo del coeficiente de apuntamiento: \\\\[g_2=\\\\frac{", sum4, "/", n, "}{", sd, "^4}-3 = ", g2, "\\\\]", sep=""))\n');
	} else if (getBoolean("skewness")){
		echo('table <- skewnessTable(x)\n');
		echo('rk.results(setNames(list(table[,1],table[,2],table[,3],table[,4],table[,5],table[,6]),c("\\\\(x_i\\\\)","\\\\(n_i\\\\)","\\\\(x_in_i\\\\)","\\\\(x_i^2n_i\\\\)","\\\\(x_i-\\\\bar x\\\\)","\\\\((x_i-\\\\bar x)^3n_i\\\\)")))\n');
		echo('rk.header ("Media",level=3)\n');
		echo('rk.print("F&oacute;rmula de la media: \\\\[\\\\bar{x} = \\\\frac{\\\\sum x_in_i}{n}\\\\]")\n');
		echo('rk.print(paste("C&aacute;lculo de la media: \\\\[\\\\bar{x}=\\\\frac{", sum, "}{", n, "}= ", mean, "\\\\]", sep=""))\n');
		echo('rk.header ("Varianza y desviaci&oacute;n t&iacute;pica",level=3)\n');
		echo('rk.print("F&oacute;rmula de la varianza: \\\\[s^2 = \\\\frac{\\\\sum x_i^2n_i}{n}-\\\\bar{x}^2\\\\]")\n');
		echo('rk.print(paste("C&aacute;lculo de la varianza: \\\\[s^2=\\\\frac{", sum2, "}{", n, "}-", mean, "^2 = ", variance, "\\\\]", sep=""))\n');
		echo('rk.print("F&oacute;rmula de la desviaci&oacute;n t&iacute;pica: \\\\[s = \\\\sqrt{s^2}\\\\]")\n');
		echo('rk.print(paste("C&aacute;lculo de la desviaci&oacute;n t&iacute;pica: \\\\[s=\\\\sqrt{", variance, "}=", sd, "\\\\]", sep=""))\n');
		echo('rk.header ("Coeficiente de asimetr&iacute;a",level=3)\n');
		echo('rk.print("F&oacute;rmula del coeficiente de asimetr&iacute;a: \\\\[g_1 = \\\\frac{\\\\sum (x_i-\\\\bar x)^3n_i/n}{s^3}\\\\]")\n');
		echo('rk.print(paste("C&aacute;lculo del coeficiente de asimetr&iacute;a: \\\\[g_1=\\\\frac{", sum3, "/", n, "}{", sd, "^3} = ", g1, "\\\\]", sep=""))\n');
	} else if (getBoolean("cv")){
		echo('table <- varianceTable(x)\n');
		echo('rk.results(setNames(list(table[,1],table[,2],table[,3],table[,4]),c("\\\\(x_i\\\\)","\\\\(n_i\\\\)","\\\\(x_in_i\\\\)","\\\\(x_i^2n_i\\\\)")))\n');
		echo('rk.header ("Media",level=3)\n');
		echo('rk.print("F&oacute;rmula de la media: \\\\[\\\\bar{x} = \\\\frac{\\\\sum x_in_i}{n}\\\\]")\n');
		echo('rk.print(paste("C&aacute;lculo de la media: \\\\[\\\\bar{x}=\\\\frac{", sum, "}{", n, "}= ", mean, "\\\\]", sep=""))\n');
		echo('rk.header ("Varianza y desviaci&oacute;n t&iacute;pica",level=3)\n');
		echo('rk.print("F&oacute;rmula de la varianza: \\\\[s^2 = \\\\frac{\\\\sum x_i^2n_i}{n}-\\\\bar{x}^2\\\\]")\n');
		echo('rk.print(paste("C&aacute;lculo de la varianza: \\\\[s^2=\\\\frac{", sum2, "}{", n, "}-", mean, "^2 = ", variance, "\\\\]", sep=""))\n');
		echo('rk.print("F&oacute;rmula de la desviaci&oacute;n t&iacute;pica: \\\\[s = \\\\sqrt{s^2}\\\\]")\n');
		echo('rk.print(paste("C&aacute;lculo de la desviaci&oacute;n t&iacute;pica: \\\\[s=\\\\sqrt{", variance, "}=", sd, "\\\\]", sep=""))\n');
		echo('rk.header ("Coeficiente de variaci&oacute;n",level=3)\n');
		echo('rk.print("F&oacute;rmula del coeficiente de variaci&oacute;n: \\\\[cv = \\\\frac{s}{\\\\bar x}\\\\]")\n');
		echo('rk.print(paste("C&aacute;lculo del coeficiente de variaci&oacute;n: \\\\[cv=\\\\frac{", sd, "}{", mean, "}= ", cv, "\\\\]", sep=""))\n');
	} else if (getBoolean("variance")){
		echo('table <- varianceTable(x)\n');
		echo('rk.results(setNames(list(table[,1],table[,2],table[,3],table[,4]),c("\\\\(x_i\\\\)","\\\\(n_i\\\\)","\\\\(x_in_i\\\\)","\\\\(x_i^2n_i\\\\)")))\n');
		echo('rk.header ("Media",level=3)\n');
		echo('rk.print("F&oacute;rmula de la media: \\\\[\\\\bar{x} = \\\\frac{\\\\sum x_in_i}{n}\\\\]")\n');
		echo('rk.print(paste("C&aacute;lculo de la media: \\\\[\\\\bar{x}=\\\\frac{", sum, "}{", n, "}= ", mean, "\\\\]", sep=""))\n');
		echo('rk.header ("Varianza y desviaci&oacute;n t&iacute;pica",level=3)\n');
		echo('rk.print("F&oacute;rmula de la varianza: \\\\[s^2 = \\\\frac{\\\\sum x_i^2n_i}{n}-\\\\bar{x}^2\\\\]")\n');
		echo('rk.print(paste("C&aacute;lculo de la varianza: \\\\[s^2=\\\\frac{", sum2, "}{", n, "}-", mean, "^2 = ", variance, "\\\\]", sep=""))\n');
		echo('rk.print("F&oacute;rmula de la desviaci&oacute;n t&iacute;pica: \\\\[s = \\\\sqrt{s^2}\\\\]")\n');
		echo('rk.print(paste("C&aacute;lculo de la desviaci&oacute;n t&iacute;pica: \\\\[s=\\\\sqrt{", variance, "}=", sd, "\\\\]", sep=""))\n');
	} else if (getBoolean("mean")){
		echo('table <- meanTable(x)\n');
		echo('rk.results(setNames(list(table[,1],table[,2],table[,3]),c("\\\\(x_i\\\\)","\\\\(n_i\\\\)","\\\\(x_in_i\\\\)")))\n');
		echo('rk.header ("Media",level=3)\n');
		echo('rk.print("F&oacute;rmula de la media: \\\\[\\\\bar{x} = \\\\frac{\\\\sum x_in_i}{n}\\\\]")\n');
		echo('rk.print(paste("C&aacute;lculo de la media: \\\\[\\\\bar{x}=\\\\frac{", sum, "}{", n, "}= ", mean, "\\\\]", sep=""))\n');
	} 
}

