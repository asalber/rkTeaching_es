// author: Alfredo Sánchez Alberca (asalber@ceu.es)

include("../common/common_functions.js")
include("../common/filter.js")

// globals
var dataframe,
  variable,
  variableName,
  category,
  grouped,
  groups,
  groupsName,
  manualFreq,
  freq,
  n,
  p,
  type,
  getConfInt,
  confLevel,
  hypothesis;

function setGlobalVars() {
  variable = getString("variable");
  variableName = getString("variable.shortname");
  dataframe = getDataframe(variable);
  category = getString("category");
  grouped = getBoolean("grouped");
  groups = getList("groups");
  groupsName = getList("groups.shortname");
  manualFreq = getBoolean("manual.checked");
  freq = getString("freq");
  n = getString("n");
  p = getString("proportion");
  type = getString("type");
  getConfInt = getBoolean("frameConfInt.checked");
  confLevel = getString("confLevel");
  hypothesis = getString("hypothesis");
}

function preprocess() {
  setGlobalVars();
  echo('require(plyr)\n');
}

function calculate() {
  // Test settings
  var options = ', alternative="' + hypothesis + '", p=' + p;
  if (getConfInt) {
    options += ", conf.level=" + confLevel;
  }
  // Manual frequency
  if (manualFreq) {
    if (type == "binomial") {
      echo('result <- binom.test (' + freq + ',' + n +  options + ')\n');
    } else if (type == "normal_correction") {
      echo('result <- prop.test (' + freq + ',' + n +  options + ')\n');
    } else {
      echo('result <- prop.test (' + freq + ',' + n +  options + ', correct=FALSE)\n');
    }
  } else {
    // Non-manual frequency
    // Filter
    filter();
    // Set grouped mode
    if (grouped) {
      echo(dataframe + ' <- transform(' + dataframe + ', .groups=interaction(' + dataframe + '[,c(' + groupsName.map(quote) + ')]))\n');
      echo(dataframe + ' <- ' + dataframe + '[!is.na(' + dataframe + '[[".groups"]]),]\n');
      echo('result <- dlply(' + dataframe + ', ".groups", function(df){\n\tfreq <- table(df[[' +  quote(variableName) + ']])\n');
      if (type == "binomial") {
        echo('\tbinom.test(freq[[' + category + ']], sum(freq)' +  options + ')\n})\n');
      } else if (type == "normal_correction") {
        echo('\tprop.test(freq[[' + category + ']], sum(freq)' +  options + ')\n})\n');
      } else {
        echo('\tprop.test(freq[[' + category + ']], sum(freq)' +  options + ', correct=FALSE)\n})\n');
      }
    } else {
      echo('freq <- table(' + variable + ')\n');
      echo('result <-');
      if (type == "binomial") {
        echo('binom.test(freq[[' + category + ']], sum(freq)' +  options + ')\n');
      } else if (type == "normal_correction") {
        echo('prop.test(freq[[' + category + ']], sum(freq)' +  options + ')\n');
      } else {
        echo('prop.test(freq[[' + category + ']], sum(freq)' +  options + ', correct=FALSE)\n');
      }
    }
  }
}

function printout() {
  if (manualFreq) {
    header = new Header(i18n("Contraste para una proporción"));
    header.add(i18n("Hipótesis nula"), i18n("Proporción = %1", p));
    if (hypothesis == "two.sided") {
      header.add(i18n("Hipótesis alternativa"), i18n("Proporción &ne; %1", p));
    } else if (hypothesis == "greater") {
      header.add(i18n("Hipótesis alternativa"), i18n("Proporción &gt; %1", p));
    } else {
      header.add(i18n("Hipótesis alternativa"), i18n("Proporción &lt; %1", p));
    }
  } else {
    header = new Header(i18n("Contraste para la proporción de %1 = %2", variableName, category));
    header.add(i18n("Conjunto de datos"), dataframe);
    header.add(i18n("Variable contrastada"), variableName);
    header.add(i18n("Hipótesis nula"), i18n("Proporción de %1 = %2", category, p));
    if (hypothesis == "two.sided") {
      header.add(i18n("Hipótesis alternativa"), i18n("Proporción de %1 &ne; %2", category, p));
    } else if (hypothesis == "greater") {
      header.add(i18n("Hipótesis alternativa"), i18n("Proporción de %1 &gt; %2", category, p));
    } else {
      header.add(i18n("Hipótesis alternativa"), i18n("Proporción de %1 &lt; %2", category, p));
    }
  }
  if (type == "binomial") {
    header.add(i18n("Tipo de contraste"), i18n("Binomial exacto"));
  } else if (type == "normal_correction") {
    header.add(i18n("Tipo de contraste"), i18n("Aproximación normal con corrección de continuidad"));
  } else {
    header.add(i18n("Tipo de contraste"), i18n("Aproximación normal sin corrección de continuidad"));
  }
  if (getConfInt) {
    header.add(i18n("Nivel de confianza del intervalo"), confLevel);
  }
  if (!manualFreq) {
    if (grouped) {
      header.add(i18n("Variable(s) de agrupación"), groupsName.join(", "));
    }
    if (filtered) {
      header.addFromUI("condition");
    }
  }
  header.print();
  // Grouped mode
  if (!manualFreq & grouped) {
    echo('for (i in 1:length(result)){\n');
    echo('\t rk.header(paste(' + i18n("Group %1 =", groupsName.join('.')) + ', names(result)[i]), level=3)\n');
    echo('rk.results (list(');
    echo(i18n("Proporción estimada") + ' = result[[i]]$estimate, ');
    if (type != "binomial") {
      echo(i18n("Grados de libertad") + ' = result[[i]]$parameter, ');
      echo(i18n("Estadístico chi") + ' = result[[i]]$statistic, ');
    }
    echo(i18n("p-valor") + ' = result[[i]]$p.value');
    if (getConfInt) {
      echo(', ' + i18n("Nivel de confianza %") + ' = (100 * attr(result[[i]]$conf.int, "conf.level"))');
      echo(', ' + i18n("Intervalo de confianza<br/>para la proporción") + ' = result[[i]]$conf.int');
    }
    echo('))}\n');
  } else {
    // Non-grouped mode
    echo('rk.results (list(');
    echo(i18n("Proporción estimada") + ' = result$estimate, ');
    if (type != "binomial") {
      echo(i18n("Grados de libertad") + ' = result$parameter, ');
      echo(i18n("Estadístico chi") + ' = result$statistic, ');
    }
    echo(i18n("p-valor") + ' = result$p.value');
    if (getConfInt) {
      echo(', ' + i18n("Nivel de confianza %") + ' = (100 * attr(result$conf.int, "conf.level"))');
      echo(', ' + i18n("Intervalo de confianza<br/>para la proporción") + ' = result$conf.int');
    }
    echo('))\n');
  }
}
