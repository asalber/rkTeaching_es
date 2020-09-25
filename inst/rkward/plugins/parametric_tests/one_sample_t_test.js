// author: Alfredo Sánchez Alberca (asalber@ceu.es)

include("../common/common_functions.js")
include("../common/filter.js")

// globals
var dataframe,
  variable,
  variableName,
  grouped, 
  groups,
  groupsName,
  mean,
  getConfInt,
  confLevel,
  hypothesis;

function setGlobalVars() {
  variable = getString("variable");
  variableName = getString("variable.shortname");
  dataframe = getDataframe(variable);
  grouped = getBoolean("grouped");
  groups = getList("groups");
  groupsName = getList("groups.shortname");
  mean = getString("mean");
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
  var options = ', alternative="' + hypothesis + '", mu=' + mean;
  // Confidence interval
  if (getConfInt) {
    options += ", conf.level=" + confLevel;
  }
  // Set grouped mode
  if (grouped) {
    echo(dataframe + ' <- transform(' + dataframe + ', .groups=interaction(' + dataframe + '[,c(' + groupsName.map(quote) + ')]))\n');
    echo(dataframe + ' <- ' + dataframe + '[!is.na(' + dataframe + '[[".groups"]]),]\n');
    echo('result <- dlply(' + dataframe + ', ".groups", function(df) t.test(df[[' + quote(variableName) + ']]' + options + '))\n');
  } else {
    echo('result <- t.test (' + variable + options + ')\n');
  }
}

function printout() {
  // Header
  header = new Header(i18n("Contraste T para la media de %1", variableName));
  header.add(i18n("Conjunto de datos"), dataframe);
  header.add(i18n("Variable contrastada"), variableName);
  header.add(i18n("Hipótesis nula"), i18n("Media de %1 = %2", variableName, mean));
  if (hypothesis == "two.sided") {
    header.add(i18n("Hipótesis alternativa"), i18n("Mean &ne; %1", mean));
  } else if (hypothesis == "greater") {
    header.add(i18n("Hipótesis alternativa"), i18n("Mean &gt; %1", mean));
  } else {
    header.add(i18n("Hipótesis alternativa"), i18n("Mean &lt; %1", mean));
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
  if (getBoolean("grouped")){
    echo('for (i in 1:length(result)){\n');
    echo('\trk.header(paste(' + i18n("Grupo %1 =", groupsName.join('.')) + ', names(result)[i]), level=3)\n');
    echo('\trk.results (list(');
    echo(i18n("Variable") + ' = ' + quote(variableName) + ', ');
    echo(i18n("Media estimada") + ' = result[[i]]$estimate, ');
    echo(i18n("Grados de libertad") + ' = result[[i]]$parameter, ');
    echo(i18n("Estadístico T") + ' = result[[i]]$statistic, ');
    echo(i18n("p-valor") + ' = result[[i]]$p.value');
    if (getConfInt) {
      echo(', ' + i18n("Nivel de confianza %") + ' = (100 * attr(result[[i]]$conf.int, "conf.level"))');
      echo(', ' + i18n("Intervalo de confianza<br/>para la media") + ' = result[[i]]$conf.int');
    }
    echo('))}\n');
  } else {
    // Non-grouped mode
    echo('rk.results(list(');
    echo(i18n("Variable") + ' = ' + quote(variableName) + ', ');
    echo(i18n("Media estimada") + ' = result$estimate, ');
    echo(i18n("Grados de libertad") + ' = result$parameter, ');
    echo(i18n("Estadístico t") + ' = result$statistic, ');
    echo(i18n("p-valor") + ' = result$p.value');
    if (getConfInt) {
      echo(', ' + i18n("Nivel de confianza %") + ' = (100 * attr(result$conf.int, "conf.level"))');
      echo(', ' + i18n("Intervalo de confianza<br/>para la media") + ' = result$conf.int');
    }
    echo('))\n');
  }
}
