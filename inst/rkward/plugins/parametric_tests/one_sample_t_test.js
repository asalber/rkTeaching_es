// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, xname, mean, confint, conflevel, hypothesis, data, groups, groupsname;

function preprocess () {
  echo('require(rk.Teaching)\n');
}

function calculate () {
	// Filter
	echo(getString("filter_embed.code.calculate"));
	// Load variables
	x = getString("variable");
	xname = getString("variable.shortname");
	data = x.split('[[')[0];
	mean = getString("mean");
	confint = getBoolean ("confint_frame.checked");
	conflevel = getString ("conflevel");
	hypothesis = getString ("hypothesis");
	var options = ', alternative="' + hypothesis + '", mu=' + mean ;
	if (confint) {
		options += ", conf.level=" + conflevel;
	}
	// Grouped mode
	if (getBoolean("grouped")) {
		groups = getList("groups");
		groupsname = getList("groups.shortname");
		echo(data + ' <- transform(' + data + ', .groups=interaction(' + data + '[,c(' + groupsname.map(quote) + ')]))\n');
		echo('result <- dlply(' + data + ', ".groups", function(df) t.test(df[["' + xname + '"]]' + options + '))\n');
	} else {
	// Non-grouped mode
		echo('result <- t.test (' + x + options + ')\n');
	}
}

function printout () {
	echo ('rk.header ("Test T para la media de ' + getString("variable.shortname") + '", ');
	echo ('parameters=list ("Variable" = rk.get.description(' + x + ')' + getString("filter_embed.code.printout") + ', "Hip&oacute;tesis nula" = paste("media ", rk.get.short.name(' + x + '), "= ' + mean + '")');
	if (hypothesis=="two.sided"){
		echo(', "Hip&oacute;tesis alternativa" = paste("media &ne; ' + mean + '")');
	}
	else if (hypothesis=="greater") {
		echo(', "Hip&oacute;tesis alternativa" = paste("media &gt; ' + mean + '")');
	}
    else {
    	echo(', "Hip&oacute;tesis alternativa" = paste("media &lt; ' + mean + '")');
    }
	if (confint) {
		echo (', "Nivel de confianza del intervalo" = "' + conflevel + '"');
	}
	echo('))\n');
	// Grouped mode
	if (getBoolean("grouped")){
		echo('for (i in 1:length(result)){\n');
		echo('\t rk.header(paste("Grupo ' + groupsname.join('.') + ' = ", names(result)[i]),level=3)\n');
		echo ('\t rk.results (list(');
	  echo ('"Variable" = rk.get.short.name(' + x + '), ');
	  echo ('"Media estimada" = result[[i]]$estimate, ');
	  echo ('"Grados de libertad" = result[[i]]$parameter, ');
	  echo ('"Estad&iacute;stico t" = result[[i]]$statistic, ');
	  echo ('"p-valor" = result[[i]]$p.value');
	  if (confint) {
		  echo (', "Nivel de confianza %" = (100 * attr(result[[i]]$conf.int, "conf.level"))');
		  echo (', "Intervalo de confianza para la media" = result[[i]]$conf.int');
		  echo ('))\n');
	    echo ('rk.interpretation.t.test(result[[i]])\n');
  	} else {
  	  echo ('))\n');
	    echo ('rk.interpretation.t.test(result[[i]], conf.int=FALSE)\n');
  	}
	  echo ('}\n');	
	} else {
	  // Non-grouped mode
		echo ('rk.results (list(');
	  echo ('"Variable" = rk.get.short.name(' + x + '), ');
	  echo ('"Media estimada" = result$estimate, ');
	  echo ('"Grados de libertad" = result$parameter, ');
	  echo ('"Estad&iacute;stico t" = result$statistic, ');
	  echo ('"p-valor" = result$p.value');
	  if (confint) {
		  echo (', "Nivel de confianza %" = (100 * attr(result$conf.int, "conf.level"))');
		  echo (', "Intervalo de confianza para la media" = result$conf.int');
		  echo ('))\n');
	    echo ('rk.interpretation.t.test(result)\n');
	  } else {
	    echo ('))\n');
	    echo ('rk.interpretation.t.test(result, conf.int=FALSE)\n');
	  }
	}
}


