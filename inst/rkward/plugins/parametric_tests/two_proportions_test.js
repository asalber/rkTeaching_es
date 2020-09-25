// author: Alfredo Sánchez Alberca (asalber@ceu.es)

include("../common/common_functions.js")
include("../common/filter.js")

// globals
var dataframe,
  variable,
  variableName,
  category,
  factor,
  factorName,
  population1,
  population2,
  grouped,
  groups,
  groupsName,
  manualFreq,
  freq1,
  n1,
  freq2,
  n2,
  type,
  getConfInt,
  confLevel,
  hypothesis;

function setGlobalVars() {
  variable = getString("variable");
  variableName = getString("variable.shortname");
  dataframe = getDataframe(variable);
  category = getString("category");
  factor = getString("factor");
  factorName = getString("factor.shortname");
  population1 = getString("population1");
  population2 = getString("population2");
  grouped = getBoolean("grouped");
  groups = getList("groups");
  groupsName = getList("groups.shortname");
  manualFreq = getBoolean("manual.checked");
  freq1 = getString("freq1");
  n1 = getString("n1");
  freq2 = getString("freq2");
  n2 = getString("n2");
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
  var options = ', alternative="' + hypothesis + '"';
  if (getConfInt) {
    options += ', conf.level=' + confLevel;
  }
  if (type == "normal") {
    options += ', correct=FALSE';
  }
  // Manual frequency
  if (manualFreq) {
    echo('result <- prop.test(c(' + freq1 + ',' + freq2 + '),c(' + n1 + ',' + n2 + ')' + options + ')\n');
  } else {
    // Non-manual frequency
    // Filter
    filter();
    // Set grouped mode
    if (grouped) {
      echo(dataframe + ' <- transform(' + dataframe + ', .groups=interaction(' + dataframe + '[,c(' + groupsName.map(quote) + ')]))\n');
      echo(dataframe + ' <- ' + dataframe + '[!is.na(' + dataframe + '[[".groups"]]),]\n');
      echo('result <- dlply(' + dataframe + ', ".groups", function(df){\n\tfreq <- table(df[[' + quote(variableName) + ']], df[[' + quote(factorName) + ']])\n');
      echo('\tprop.test(c(freq[[' + category + ',' + population1 + ']], freq[[' + category + ',' + population2 + ']]), c(sum(freq[,' + population1 + ']), sum(freq[,' + population2 + ']))' + options + ')\n})\n');
    } else {
      echo('freq <- table(' + variable + ',' + factor + ')\n');
      echo('result <- prop.test(c(freq[[' + category + ',' + population1 + ']], freq[[' + category + ',' + population2 + ']]), c(sum(freq[,' + population1 + ']), sum(freq[,' + population2 + ']))' + options + ')\n');
    }
  }
}

function printout() {
  if (manualFreq) {
    header = new Header(i18n("Contraste de comparación de dos proporciones"));
    header.add(i18n("Hipótesis nula"), i18n("Proporción 1 = proportion 2"));
    if (hypothesis == "two.sided") {
      header.add(i18n("Hipótesis alternativa"), i18n("Proporción 1 &ne; proportion 2"));
    } else if (hypothesis == "greater") {
      header.add(i18n("Hipótesis alternativa"), i18n("Proporción 1 &gt; proportion 2"));
    } else {
      header.add(i18n("Hipótesis alternativa"), i18n("Proporción 1 &lt; proportion 2", p));
    }
  } else {
    header = new Header(i18n("Contraste de comparación de las proporciones de %1 = %2 en %3 y %4", variableName, category, population1, population2));
    header.add(i18n("Conjunto de datos"), dataframe);
    header.add(i18n("Variable contrastada"), variableName);
    header.add(i18n("Hipótesis nula"), i18n("Proporción %1 = proporción %2", population1, population2));
    if (hypothesis == "two.sided") {
      header.add(i18n("Hipótesis alternativa"), i18n("Proporción %1 &ne; proporción %2", population1, population2));
    } else if (hypothesis == "greater") {
      header.add(i18n("Hipótesis alternativa"), i18n("Proporción %1 &gt; proporción %2", population1, population2));
    } else {
      header.add(i18n("Hipótesis alternativa"), i18n("Proporción %1 &lt; proporción %2", population1, population2));
    }
  }
  if (type == "normal_correction") {
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
    echo(i18n("Proporción estimada") + ' = result[[i]]$estimate[1], ');
    echo(i18n("Proporción estimada") + ' = result[[i]]$estimate[2], ');
    echo(i18n("Grados de libertad") + ' = result[[i]]$parameter, ');
    echo(i18n("Estadístico chi") + ' = result[[i]]$statistic, ');
    echo(i18n("p-valor") + ' = result[[i]]$p.value');
    if (getConfInt) {
      echo(', ' + i18n("Nivel de confianza %") + ' = (100 * attr(result[[i]]$conf.int, "conf.level"))');
      echo(', ' + i18n("Intervalo de confianza para<br/>la diferencia de proporciones") + ' = result[[i]]$conf.int');
    }
    echo('))}\n');
  } else {
    // Non-grouped mode
    echo('rk.results (list(');
    if (manualFreq) {
      echo(i18n("Proporción estimada 1") + ' = result$estimate[1], ');
      echo(i18n("Proporción estimada 2") + ' = result$estimate[2], ');
    } else {
      echo(i18n("Proporción estimada en %1", population1) + ' = result$estimate[1], ');
      echo(i18n("Proporción estimada en %1", population2) + ' = result$estimate[2], ');
    }
    echo(i18n("Grados de libertad") + ' = result$parameter, ');
    echo(i18n("Estadístico chi") + ' = result$statistic, ');
    echo(i18n("p-valor") + ' = result$p.value');
    if (getConfInt) {
      echo(', ' + i18n("Nivel de confianza %") + ' = (100 * attr(result$conf.int, "conf.level"))');
      echo(', ' + i18n("Intervalo de confianza para<br/>la diferencia de proporciones") + ' = result$conf.int');
    }
    echo('))\n');
  }
}
