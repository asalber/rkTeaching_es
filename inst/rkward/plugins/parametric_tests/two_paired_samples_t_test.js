// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, y, xname, yname, data, groups, groupsname, confint, conflevel, hypothesis;

function preprocess () {
  echo('require(rk.Teaching)\n');
}

function calculate () {
	// Filter
	echo(getString("filter_embed.code.calculate"));
	// Load variables
	x = getString("x");
	y = getString("y");
	xname = getString("x.shortname");
	yname = getString("y.shortname")
	data = x.split('[[')[0];
	confint = getBoolean("confint_frame.checked");
	conflevel = getString("conflevel");
	hypothesis = getString("hypothesis");
	var options = ', alternative="' + hypothesis + '", paired=TRUE';
	if (confint) {
		options += ", conf.level=" + conflevel;
	}
  // Grouped mode
	if (getBoolean("grouped")) {
		groups = getList("groups");
		groupsname = getList("groups.shortname");
		echo(data + ' <- transform(' + data + ', .groups=interaction(' + data + '[,c(' + groupsname.map(quote) + ')]))\n');
		echo('result <- dlply(' + data + ', ".groups", function(df) t.test(df[["' + xname + '"]], df[["' + yname + '"]]' + options + '))\n');
	} else {
	// Non-grouped mode
	  echo('result <- t.test (' + x + ', ' + y + options + ')\n');
	}
}

function printout () {
	echo ('rk.header ("Test T para la media de ' + getString("x.shortname") + ' - ' + getString("y.shortname") + '", ');
	echo ('parameters=list ("Comparaci&oacute;n de" = rk.get.description(' + x + '), "Con" = rk.get.description(' + y + ')' + getString("filter_embed.code.printout") + ', "Hip&oacute;tesis nula" = paste("media ", rk.get.short.name(' + x + '), " = media ", rk.get.short.name(' + y + '))');
	if (hypothesis=="two.sided"){
		echo(', "Hip&oacute;tesis alternativa" = paste("media ", rk.get.short.name(' + x + '), " &ne; media ", rk.get.short.name(' + y + '))');
	}
	else if (hypothesis=="greater") {
		echo(', "Hip&oacute;tesis alternativa" = paste("media ", rk.get.short.name(' + x + '), " &gt; media ", rk.get.short.name(' + y + '))');
	}
    else {
    	echo(', "Hip&oacute;tesis alternativa" = paste("media ", rk.get.short.name(' + x + '), " &lt; media ", rk.get.short.name(' + y + '))');
    }
	if (confint) {
		echo (', "Nivel de confianza del intervalo" = "' + conflevel + '"');
	}
	echo('))\n');
  // Grouped mode
	if (getBoolean("grouped")){
		echo('for (i in 1:length(result)){\n');
		echo('\t rk.header(paste("Grupo ' + groupsname.join('.') + ' = ", names(result)[i]),level=3)\n');
		echo ('rk.results (list(');
		echo ('"Variable" = paste(rk.get.short.name(' + x + '), "-", rk.get.short.name(' + y + ')), ');
	  echo ('"Diferencia media estimada" = result[[i]]$estimate, ');
	  echo ('"Grados de libertad" = result[[i]]$parameter, ');
	  echo ('"Estad&iacute;stico t" = result[[i]]$statistic, ');
	  echo ('"p-valor" = result[[i]]$p.value');
	  if (confint) {
		  echo (', "Nivel de confianza %" = (100 * attr(result[[i]]$conf.int, "conf.level"))');
		  echo (', "Intervalo de confianza para la media de la diferencia" = result[[i]]$conf.int');
		  echo ('))\n');
	    echo ('rk.interpretation.paired.t.test(result[[i]])\n');
	  } else {
	    echo ('))\n');
	    echo ('rk.interpretation.paired.t.test(result[[i]], conf.int=FALSE)\n');
	  }
	  echo('}\n');
	} else {
	  // Non-grouped mode
		echo ('rk.results (list(');
	  echo ('"Variable" = paste(rk.get.short.name(' + x + '), "-", rk.get.short.name(' + y + ')), ');
	  echo ('"Diferencia media estimada" = result$estimate, ');
	  echo ('"Grados de libertad" = result$parameter, ');
	  echo ('"Estad&iacute;stico t" = result$statistic, ');
	  echo ('"p-valor" = result$p.value');
	  if (confint) {
		  echo (', "Nivel de confianza %" = (100 * attr(result$conf.int, "conf.level"))');
		  echo (', "Intervalo de confianza para la media de la diferencia" = result$conf.int');
		  echo ('))\n');
		  echo ('rk.interpretation.paired.t.test(result)\n');
	  } else {
		  echo ('))\n');  
		  echo ('rk.interpretation.paired.t.test(result, conf.int=FALSE)\n');
	  }
	}
}


