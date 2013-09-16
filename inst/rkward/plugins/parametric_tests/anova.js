// globals
var design, dep, data, within, between, caseid, sumsq, dep_name, within_name, between_name, caseid_name, sumsq_type;

function preprocess () {
	echo('require(ez)\n');
	echo('require(nlme)\n');
	echo('require(multcomp)\n');
}

function calculate () {
	// Filter
	echo(getString("filter_embed.code.calculate"));
	// Load variables
	data = getString("dataframe");
	design = getString("design");
	dep = getString("dep");
	dep_name = getValue("dep.shortname");
	caseid = getString("caseid");
	caseid_name = getValue("caseid.shortname");
	within = getList("within");
	within_name = getList("within.shortname").join(", ");
	n_within = within.lenght;
	between = getList("between");
	between_name = getList("between.shortname").join(", ");
	sumsq_type = getString("sumsqtype");
	var heterocedasticity = getString("heterocedasticity");
	sumsq = getBoolean("sumsq");
	//var vrslObsrvdvrShortname = getValue("vrsl_Obsrvdvr.shortname").split("\n").join(", ");
	if(sumsq_type == 3) {
	echo('# Establecer contrastes para sumas de cuadrados de tipo III\n');
	echo('options(contrasts=c("contr.sum","contr.poly"))\n');
	}
	if(caseid == '' & design == 'between') {
		echo('# ezANOVA requiere una variable con el identificador de usuario\n');
		echo(data + ' <- cbind(' + data + ', subjectid=factor(1:nrow(' + data + ')))\n');
	}
	echo('anova.results <- ezANOVA(data=' + data + '[!is.na(' + data + '$' + dep_name + '),], dv=.(' + dep_name +')');
	if(caseid) {
		echo(', wid=' + caseid_name);
	} else if(design == 'between') {
		echo(', wid=.(subjectid)');
	}
	if(within != '' & design !='between'){
		echo(', within=.(' + within_name + ')');
	}
	if(between != '' & design !='within'){
		echo(', between=.(' + between_name + ')');
	}
	if(sumsq_type != 2) {
		echo(', type=' + sumsq_type);
	}
	if(heterocedasticity != "false") {
		echo(', white.adjust="' + heterocedasticity + '"');
	}
	if(sumsq) {
		echo(', detailed=TRUE');
	} 
	echo(', return_aov=TRUE)\n');
	if (getString("pairwise")){
		if (design=='between'){
			echo('pairs <- TukeyHSD(anova.results[["aov"]])\n');
		}
		if (design=='within'){
			echo('pairs <- glht(lme(' + dep_name + '~' + within_name + ', data = ' + data + '[!is.na('  + data + '$' + dep_name + '),], random = ~1|' + caseid_name + '), linfct = mcp(' + within_name + '= "Tukey"))\n');
		}
		if (design=='mixed'){
			echo('pairs <- glht(lme(' + dep_name + '~' + between_name + '*' + within_name + ', data = ' + data + '[!is.na('  + data + '$' + dep_name + '),], random = ~1|' + caseid_name + '), linfct = mcp(' + between_name + '= "Tukey", ' + within_name + '= "Tukey"))\n');
		}
	}
}

function printout () {
	//Título y parámetros
	echo('rk.header("ANOVA", ');
	echo('parameters=list ("Variable dependiente"= rk.get.description(' + dep + ')');
	if(between != "" & design !="within"){
		echo(', "Factores entre individuos" = rk.get.description(' + between + ', paste.sep=", ")');
	}
	if(within != "" & design !="between"){
		echo(', "Factores dentro de los individuos" = rk.get.description(' + within + ', paste.sep=", ")');
	}
	echo(getString("filter_embed.code.printout")); 
	echo(', "Sumas de cuadrados" = "Tipo ' + sumsq_type + '"))\n');
	// Resultado ANOVA
	echo('rk.results(list(');
	echo('"Fuente de variaci&oacute;n" = anova.results[["ANOVA"]][["Effect"]]');
	echo(', "Gl num" = anova.results[["ANOVA"]][["DFn"]]');
	echo(', "Gl den" = anova.results[["ANOVA"]][["DFd"]]');
	if(sumsq){
		echo(', "Suma cuadrados num" = anova.results[["ANOVA"]][["SSn"]]');
		echo(', "Suma cuadrados den" = anova.results[["ANOVA"]][["SSd"]]');
	}
	echo(', "Estad&iacute;stico F" = anova.results[["ANOVA"]][["F"]]');
	echo(', "p-valor" = anova.results[["ANOVA"]][["p"]]');
	echo('))\n');
	// Resultado test de esfericidad e Mauchly (para medidas repetidas)
	echo("if(\"Mauchly's Test for Sphericity\" %in% names(anova.results)){\n");
	echo('\trk.header("Test de esfericidad de Mauchly", level=3)\n');
	echo('\trk.results(list(');
	echo("\"Fuente de variaci&oacute;n\" = anova.results[[\"Mauchly's Test for Sphericity\"]][[\"Effect\"]]");
	echo(", \"Estad&iacute;stico W\" = anova.results[[\"Mauchly's Test for Sphericity\"]][[\"W\"]]");
	echo(", \"p-valor\" = anova.results[[\"Mauchly's Test for Sphericity\"]][[\"p\"]]");
	echo('))\n}\n');	
	// Resultado correcciones de esfericidad
	echo('if("Sphericity Corrections" %in% names(anova.results)){\n');
	echo('\trk.header("Correcci&oacute;n de esfericidad", level=3)\n');
	echo('\trk.results(list(');
	echo('"Fuente de variaci&oacute;n" = anova.results[["Sphericity Corrections"]][["Effect"]]');
	echo(', "Epsilon Greenhouse-Geisser" = anova.results[["Sphericity Corrections"]][["GGe"]]');
	echo(', "p-valor corregido G-G" = anova.results[["Sphericity Corrections"]][["p[GG]"]]');
	echo(', "Epsilon Huynh-Feldt" = anova.results[["Sphericity Corrections"]][["HFe"]]');
	echo(', "p-valor corregido H-F" = anova.results[["Sphericity Corrections"]][["p[HF]"]]');
	echo('))\n}\n');	
	// Resultado test de homogeneidad de varianzas de Levene
	echo("if(\"Levene's Test for Homogeneity of Variance\" %in% names(anova.results)){\n");
	echo('\trk.header("Test de homogeneidad de varianzas de Levene", level=3)\n');
	echo('\trk.results(list(');
	echo("\"Gl num\" = anova.results[[\"Levene's Test for Homogeneity of Variance\"]][[\"DFn\"]]");
	echo(", \"Gl den\" = anova.results[[\"Levene's Test for Homogeneity of Variance\"]][[\"DFd\"]]");
	echo(", \"Suma cuadrados num\" = anova.results[[\"Levene's Test for Homogeneity of Variance\"]][[\"SSn\"]]");
	echo(", \"Suma cuadrados den\" = anova.results[[\"Levene's Test for Homogeneity of Variance\"]][[\"SSd\"]]");
	echo(", \"Esta&iacute;stico F\" = anova.results[[\"Levene's Test for Homogeneity of Variance\"]][[\"SSn\"]]");
	echo(", \"p-valor\" = anova.results[[\"Levene's Test for Homogeneity of Variance\"]][[\"p\"]]");
	echo('))\n}\n');
	// Resultado comparación por pares
	if (getBoolean("pairwise")){
		echo('rk.header("Compaparaci&oacute;n por pares",level=3)\n');
		if (design=='between'){
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
		else {
			echo('rk.header("Contrastes de comparaci&oacute;n de medias (Tukey)",level=4)\n');
			echo('rk.results(list(');
			echo('"Pares" = names(summary(pairs)$test$coefficients)');
			echo(', "Estimaci&oacute;n" = summary(pairs)$test$coefficients');
			echo(', "Error Est&aacute;ndar" = summary(pairs)$test$sigma');
			echo(', "Estad&iacute;stico t" = summary(pairs)$test$tstat');
			echo(', "p-valor" = summary(pairs)$test$pvalues');
			echo('))\n');
			echo('rk.header("Intervalos de confianza para la diferencia de medias",level=4)\n');
			echo('rk.results(list(');
			echo('"Pares" = rownames(confint(pairs)$confint)');
			echo(', "Estimaci&oacute;n" = confint(pairs)$confint[,1]');
			echo(', "L&iacute;mite inferior" = confint(pairs)$confint[,2]');
			echo(', "L&iacute;mite superior" = confint(pairs)$confint[,3]');
			echo('))\n');
		}
	}
	if (getBoolean("pairwise_plot")){
		echo ('rk.graph.on()\n');
		echo('par(las=1,mar=c(4,8,6,0))\n');
		echo('plot(pairs)\n');
		//echo('title(main="Intervalos de confianza del 95%\n para la diferencia de medias")\n');
		//echo('plot(pairs,main="Intervalos de confianza del 95%\n para la diferencia de medias", xlab="Diferencia de ' + dep_name + '")\n');
		echo ('rk.graph.off()\n');
	}
}


