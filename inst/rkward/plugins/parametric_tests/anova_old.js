// globals
var design, dep, within, between, caseid, dep_name, within_name, between_name, caseid_name;

function preprocess () {
	//echo('require(multcomp)\n');
}

function calculate () {
	// read in variables from dialog
	var data = getValue("dataframe");
	design = getValue("design");
	dep = getValue("dep");
	caseid = getValue("caseid");
	within = getValue("within");
	between = getValue("between");
//	var vrslObsrvdvr = getValue("vrsl_Obsrvdvr");
	var sumsq_type = getValue("sumsqtype");
	var heterocedasticity = getValue("heterocedasticity");

	// the R code to be evaluated
	dep_name = getValue("dep.shortname");
	caseid_name = getValue("caseid.shortname");
	within_name = getValue("within.shortname").split("\n").join("*");
	between_name = getValue("between.shortname").split("\n").join("*");
	// var vrslObsrvdvrShortname = getValue("vrsl_Obsrvdvr.shortname").split("\n").join(", ");
	//if(sumsq_type == 3) {
	//	echo('# Establecer contrastes para sumas de cuadrados de tipo 3\n');
	//	echo('options(contrasts=c("contr.sum","contr.poly"))\n');
	//}
	//echo('# ezANOVA requiere una variable con el identificador de usuario\n');
	//echo(data + ' <- cbind(' + data + ', ez.id=factor(1:nrow(' + data + ')))\n');
	echo('anova.results <- aov(' + dep_name + ' ~ ');
	if(between != "" & design !="within"){
		echo(between_name);
	}
	if(within != "" & design !="between"){
		echo(within_name + '+Error(' + caseid_name + '/' + within_name + ')');
	}
	echo(', data=' + data + ')\n');
	//if(design == "between") {
	//	echo(', wid=ez.id');
	//}
	//if(within != "" & design != "between") {
	//	echo(', within=' + within_name);
	//}
	//if(between != "" & design != "within") {
	//	echo(', between=' + between_name);
	//}
	//if(sumsq_type != 2) {
	//	echo(', type=' + sumsq_type);
	//}
	//if(heterocedasticity != "false") {
	//	echo(', white.adjust="' + heterocedasticity + '"');
	//}
	//echo(', return_aov=TRUE)\n\n');
	if (getValue("pairwise")){
		//echo('pairs <- glht(anova.results, linfct = mcp(' + between_name + '= "Tukey"))\n');
		echo('pairs <- TukeyHSD(anova.results)\n');
	}
}

function printout () {
	echo('rk.header("ANOVA", ');
	echo('parameters=list ("Variable dependiente"= rk.get.description(' + dep + ')');
	if(between != "" & design !="within"){
		echo(', "Factores entre individuos" = rk.get.description(' + between.split("\n") + ', paste.sep=", ")');
	}
	if(within != "" & design !="between"){
		echo(', "Factores dentro de los individuos" = rk.get.description(' + within.split("\n") + ', paste.sep=", ")');
	}
	echo('))\n');
	if(between != "" & design !="within"){
		echo('rk.results(list(');
		echo('"Fuente de variaci&oacute;n" = rownames(summary(anova.results)[[1]])');
		echo(', "Suma de cuadrados" = summary(anova.results)[[1]][,2]');
		echo(', "Grados de libertad" = summary(anova.results)[[1]][,1]');
		echo(', "Cuadrados medios" = summary(anova.results)[[1]][,3]');
		echo(', "Estad&iacute;stico F" = summary(anova.results)[[1]][,4]');
		echo(', "p-valor" = summary(anova.results)[[1]][,5]');
		echo('))\n');
	}
	if(within != "" & design !="between"){
		echo('rk.print(summary(anova.results),digits=4)\n');
	}
	//echo('rk.print(summary(anova.results),digits=4)\n');
	//if (getValue("levene")){
	//	echo('rk.header("Test de Levene para la comparaci&oacute;n de varianzas", level=3)\n');
	//	echo('rk.print(anova.results[2][[1]],digist=4)\n')
	//}
	if (getValue("pairwise")){
		echo('rk.header("Compaparaci&oacute;n por pares",level=3)\n');
		//echo('rk.header("Contrastes de comparaci&oacute;n de medias (Tukey)",level=4)\n');
		//echo('rk.results(list(');
		//echo('"Pares" = names(summary(pairs)$test$coefficients)');
		//echo(', "Estimaci&oacute;n" = summary(pairs)$test$coefficients');
		//echo(', "Error Est&aacute;ndar" = summary(pairs)$test$sigma');
		//echo(', "Estad&iacute;stico t" = summary(pairs)$test$tstat');
		//echo(', "p-valor" = summary(pairs)$test$pvalues');
		//echo('))\n');
		//echo('rk.header("Intervalos de confianza para la diferencia de medias",level=4)\n');
		//echo('rk.results(list(');
		//echo('"Pares" = rownames(confint(pairs)$confint)');
		//echo(', "Estimaci&oacute;n" = confint(pairs)$confint[,1]');
		//echo(', "L&iacute;mite inferior" = confint(pairs)$confint[,2]');
		//echo(', "L&iacute;mite superior" = confint(pairs)$confint[,3]');
		//echo('))\n');
		echo('for(i in 1:length(pairs)){\n');
		echo('\t rk.header(paste("Intervalos de confianza para la diferencia de medias seg&uacute;n", names(pairs)[i]),level=4)\n');
		echo('rk.results(list(');
		echo('"Pares" = rownames(pairs[[i]])');
		echo(', "Diferencia de medias" = pairs[[i]][,1]');
		echo(', "L&iacute;mite inferior" = pairs[[i]][,2]');
		echo(', "L&iacute;mite superior" = pairs[[i]][,3]');
		echo(', "p-valor" = pairs[[i]][,4]');
		echo('))\n');
		echo('}\n');
	}
	if (getValue("pairwise_plot")){
		echo ('rk.graph.on()\n');
		echo('par(las=1,mar=c(4,8,6,0))\n');
		echo('plot(pairs)\n');
		//echo('title(main="Intervalos de confianza del 95%\n para la diferencia de medias")\n');
		//echo('plot(pairs,main="Intervalos de confianza del 95%\n para la diferencia de medias", xlab="Diferencia de ' + dep_name + '")\n');
		echo ('rk.graph.off()\n');
	}
}


