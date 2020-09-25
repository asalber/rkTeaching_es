// author: Alfredo Sánchez Alberca (asalber@ceu.es)

include("../common/common_functions.js")
include("../common/filter.js")

// globals
var dataframe,
  variable,
  variableName,
  factor,
  factorName,
  population1,
  population2,
  groups,
  groupsName,
  getConfInt,
  confLevel,
  hypothesis;

function setGlobalVars() {
  variable = getString("variable");
  variableName = getString("variable.shortname");
  dataframe = getDataframe(variable);
  factor = getString("factor");
  factorName = getString("factor.shortname");
  population1 = getString("population1");
  population2 = getString("population2");
  grouped = getBoolean("grouped");
  groups = getList("groups");
  groupsName = getList("groups.shortname");
  getConfInt = getBoolean("frameConfInt.checked");
  confLevel = getString("confLevel");
  hypothesis = getString("hypothesis");
}

function preprocess() {
  setGlobalVars();
  echo('require(plyr)\n');
}

function calculate() {
  // Filter
  filter();
  // Test settings
  var options = ", alternative=\"" + hypothesis + "\"";
  // Confidence interval
  if (getConfInt) {
    options += ", conf.level=" + confLevel;
  }
  // Grouped mode
  if (grouped) {
    echo(dataframe + ' <- transform(' + dataframe + ', .groups=interaction(' + dataframe + '[,c(' + groupsName.map(quote) + ')]))\n');
    echo(dataframe + ' <- ' + dataframe + '[!is.na(' + dataframe + '[[".groups"]]),]\n');
    echo('result <- dlply(' + dataframe + ', ".groups", function(df) var.test(df[[' + quote(variableName) + ']][df[[' + quote(factorName) + ']]==' + population1 + '], df[[' + quote(variableName) + ']][df[[' + quote(factorName) + ']]==' + population2 + '],' + options + '))\n');
  } else {
    // Non-grouped mode
    echo('result <- var.test (' + variable + '[' + factor + '==' + population1 + '], ' + variable + '[' + factor + '==' + population2 + ']' + options + ')\n');
  }
}

function printout() {
  // Header
  header = new Header(i18n("Contraste F de comparación de las varianzas de %1 según %2", variableName, factorName));
  header.add(i18n("Conjunto de datos"), dataframe);
  header.add(i18n("Comparación de"), i18n("%1 según %2", variableName, factorName));
  header.add(i18n("Hipótesis nula"), i18n("Varianza %1 = Varianza %2", population1, population2));
  if (hypothesis == "two.sided") {
    header.add(i18n("Hipótesis alternativa"), i18n("Varianza %1 &ne; Varianza %2", population1, population2));
  } else if (hypothesis == "greater") {
    header.add(i18n("Hipótesis alternativa"), i18n("Varianza %1 &gt; Varianza %2", population1, population2));
  } else {
    header.add(i18n("Hipótesis alternativa"), i18n("Varianza %1 &lt; Varianza %2", population1, population2));
  }
  if (getConfInt) {
    header.add(i18n("Nivel de confianza del intervalo"), confLevel);
  }
  if (grouped) {
    header.add(i18n("Variable(s) de agrupación"), groupsName.join(", "));
  }
  if (filtered) {
    header.addFromUI("condition");
  }
  header.print();
  // Grouped mode
  if (grouped) {
    echo('for (i in 1:length(result)){\n');
    echo('\t rk.header(paste(' + i18n("Group %1 =", groupsName.join('.')) + ', names(result)[i]), level=3)\n');
    echo('rk.results(list(');
    echo(i18n("Variable") + ' = "' + variableName + '", ');
    echo(i18n("Poblaciones") + ' = c(' + population1 + ', ' + population2 + '), ');
    echo(i18n("Cociente de varianzas estimado") + ' = result[[i]]$estimate, ');
    echo(i18n("Grados de libertad") + ' = result[[i]]$parameter, ');
    echo(i18n("Estadístico F") + ' = result[[i]]$statistic, ');
    echo(i18n("p-valor") + ' = result[[i]]$p.value');
    if (getConfInt) {
      echo(', ' + i18n("Nivel de confianza %") + ' = (100 * attr(result[[i]]$conf.int, "conf.level"))');
      echo(', ' + i18n("Intervalo de confianza para<br/>el cociente de varianzas") + ' = result[[i]]$conf.int');
    }
    echo('))}\n');
  } else {
    // Non-grouped mode
    echo('rk.results(list(');
    echo(i18n("Variable") + ' = "' + variableName + '", ');
    echo(i18n("Poblaciones") + ' = c(' + population1 + ', ' + population2 + '), ');
    echo(i18n("Cociente de varianzas estimado") + ' = result$estimate, ');
    echo(i18n("Grados de libertad") + ' = result$parameter, ');
    echo(i18n("Estadístico F") + ' = result$statistic, ');
    echo(i18n("p-valor") + ' = result$p.value');
    if (getConfInt) {
      echo(', ' + i18n("Nivel de confianza %") + ' = (100 * attr(result$conf.int, "conf.level"))');
      echo(', ' + i18n("Intervalo de confianza para<br/>el cociente de varianzas") + ' = result$conf.int');
    }
    echo('))\n');
  }
}
