// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var x, xname, data, freq, n, category, p, type, test, confint, conflevel, hypothesis;

function preprocess () {
  echo('require(rk.Teaching)\n');
}

function calculate () {
  // Load options
  p = getString("proportion");
	confint = getBoolean("confint_frame.checked");
	conflevel = getString("conflevel");
	hypothesis = getString("hypothesis");
	var options = ', alternative="' + hypothesis + '", p=' + p ;
	if (confint) {
		options += ", conf.level=" + conflevel;
	}
	type = getString("type");
	if (type=="binomial"){
		test = "Binomial exacto";
	} else if (type=="normal_correction"){
	  test = "Aproximaci&oacute;n normal con correcci&oacute;n por continuidad";
	}	else {
	  test = "Aproximaci&oacute;n normal sin correcci&oacute;n por continuidad";
	}
  // Manual frequencies
	if (getBoolean("manual.checked")){
		freq = getString("freq");
		n = getString("n");
		echo ('freq <- ' + freq + '\n');
		echo ('n <- ' + n + '\n');
		category='';
		if (type=="binomial"){
		  echo('result <- binom.test (freq, n'+ options + ')\n');
	  } else if (type=="normal_correction"){
		  echo('result <- prop.test (freq, n'+ options + ')\n');
	  }	else {
		  echo('result <- prop.test (freq, n'+ options + ', correct=FALSE)\n');
	  }
	}	else {
	// Non-manual frequencies  
		// Filter
		echo(getString("filter_embed.code.calculate"));
		// Load variables
		x = getString("variable");
		xname = getString("variable.shortname");
	  data = x.split('[[')[0];
		category = getString("category");
		// Strip doble quotes from category
		category = category.replace(/"/g, ""); 
		// Grouped mode
	  if (getBoolean("grouped")) {
		  groups = getList("groups");
		  groupsname = getList("groups.shortname");
		  echo(data + ' <- transform(' + data + ', .groups=interaction(' + data + '[,c(' + groupsname.map(quote) + ')]))\n');
		  if (type=="binomial"){
		    echo('result <- dlply(' + data + ', ".groups", function(df) binom.test.category(df[["' + xname + '"]], "' + category + '"' + options + '))\n');
	    } else if (type=="normal_correction"){
		    echo('result <- dlply(' + data + ', ".groups", function(df) prop.test.category(df[["' + xname + '"]], "' + category + '"' + options + '))\n');
	    }	else {
		    echo('result <- dlply(' + data + ', ".groups", function(df) prop.test.category(df[["' + xname + '"]], "' + category + '"' + options + ', correct=FALSE))\n');
	    }
	  } else {
	  // Non-grouped mode
	    if (type=="binomial"){
		    echo('result <- binom.test.category('+ x + ', "' + category + '"' + options + ')\n');
	    } else if (type=="normal_correction"){
		    echo('result <- prop.test.category('+ x + ', "' + category + '"' + options + ')\n');
	    }	else {
		    echo('result <- prop.test.category('+ x + ', "' + category + '"' + options + ', correct=FALSE)\n');
	    }
	  }
	}	
}

function printout () {
	echo ('rk.header ("Test para ');
	if (getBoolean("manual.checked")){
		echo ('una proporci&oacute;n", parameters=list ("Frecuencia muestral" = freq, "Tama&ntilde;o muestral" = n');
	}
	else{
		echo ('la proporci&oacute;n de ' + getString("variable.shortname") + '=' + category + '", parameters=list ("Variable" = rk.get.description(' + x + '), "Proporci&oacute;n de" = "' + category + '"' + getString("filter_embed.code.printout"));		
	}
	echo(', "Hip&oacute;tesis nula" = "proporci&oacute;n ' + category + ' = ' + p + '"');
	if (hypothesis=="two.sided"){
		echo(', "Hip&oacute;tesis alternativa" = "proporci&oacute;n ' + category + ' &ne; ' + p + '"');
	}
	else if (hypothesis=="greater") {
		echo(', "Hip&oacute;tesis alternativa" = "proporci&oacute;n ' + category + ' &gt; ' + p + '"');
	}
    else {
    	echo(', "Hip&oacute;tesis alternativa" = "proporci&oacute;n ' + category + ' &lt; ' + p + '"');
    }
	echo(', "Tipo de prueba" = "' + test + '"');
	if (confint) {
		echo (', "Nivel de confianza del intervalo" = "' + conflevel + '"');
	}
	echo('))\n');
  // Grouped mode
	if (getBoolean("grouped")){
		echo('for (i in 1:length(result)){\n');
		echo('\t rk.header(paste("Grupo ' + groupsname.join('.') + ' = ", names(result)[i]),level=3)\n');
	  echo ('rk.results (list(');
	  echo ('"Proporci&oacute;n estimada " = result[[i]]$estimate, ');
	  if (type!="binomial"){
		  echo ('"Grados de libertad" = result[[i]]$parameter, ');
		  echo ('"Estad&iacute;stico Chi" = result[[i]]$statistic, ');
	  }
	  echo ('"p-valor" = result[[i]]$p.value');
	  if (confint) {
		  echo (', "Nivel de confianza %" = (100 * attr(result[[i]]$conf.int, "conf.level"))');
		  echo (', "Intervalo de confianza para la proporci&oacute;n" = result[[i]]$conf.int');
	  }
	  echo ('))\n');
  	echo ('}\n');	
	} else {
  // Non-grouped mode
    echo ('rk.results (list(');
	  echo ('"Proporci&oacute;n estimada " = result$estimate, ');
	  if (type!="binomial"){
		  echo ('"Grados de libertad" = result$parameter, ');
		  echo ('"Estad&iacute;stico Chi" = result$statistic, ');
	  }
	  echo ('"p-valor" = result$p.value');
	  if (confint) {
		  echo (', "Nivel de confianza %" = (100 * attr(result$conf.int, "conf.level"))');
		  echo (', "Intervalo de confianza para la proporci&oacute;n" = result$conf.int');
	  }
	  echo ('))\n');
	}
}

