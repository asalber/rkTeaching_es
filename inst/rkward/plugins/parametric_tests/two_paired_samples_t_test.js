// author: Alfredo Sánchez Alberca (asalber@ceu.es)

include("../common/common_functions.js")
include("../common/filter.js")

// globals
var dataframe,
  x,
  xName,
  y,
  yName,
  grouped,
  groups,
  groupsName,
  getConfInt,
  confInt,
  confLevel,
  hypothesis;

function setGlobalVars() {
  x = getString("x");
  xName = getString("x.shortname");
  y = getString("y");
  yName = getString("y.shortname");
  dataframe = getDataframe(x);
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
  var options = ', alternative="' + hypothesis + '", paired=TRUE';
  // Confidence interval
  if (getConfInt) {
    options += ", conf.level=" + confLevel;
  }
  // Grouped mode
  if (grouped) {
    echo(dataframe + ' <- transform(' + dataframe + ', .groups=interaction(' + dataframe + '[,c(' + groupsName.map(quote) + ')]))\n');
    echo(dataframe + ' <- ' + dataframe + '[!is.na(' + dataframe + '[[".groups"]]),]\n');
    echo('result <- dlply(' + dataframe + ', ".groups", function(df) t.test(df[[' + quote(xName) + ']], df[[' + quote(yName) + ']]' + options + '))\n');
  } else {
    // Non-grouped mode
    echo('result <- t.test (' + x + ', ' + y + options + ')\n');
  }
}

function printout() {
  // Header
  header = new Header(i18n("Contraste T para la media de %1 - %2", xName, yName));
  header.add(i18n("Conjunto de datos"), dataframe);
  header.add(i18n("Comparación de"), i18n("%1 con %2", xName, yName));
  header.add(i18n("Hipótesis nula"), i18n("Media de %1 = Media de %2", xName, yName));
  if (hypothesis == "two.sided") {
    header.add(i18n("Hipótesis alternativa"), i18n("Media de %1 &ne; Media de %2", xName, yName));
  } else if (hypothesis == "greater") {
    header.add(i18n("Hipótesis alternativa"), i18n("Media de %1 &gt; Media de %2", xName, yName));
  } else {
    header.add(i18n("Hipótesis alternativa"), i18n("Media de %1 &lt; Media de %2", xName, yName));
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
    echo('rk.results (list(');
    echo(i18n("Variable") + ' = "' + xName + ' - ' + yName + '", ');
    echo(i18n("Media de la diferencia estimada") + ' = result[[i]]$estimate, ');
    echo(i18n("Grados de libertad") + ' = result[[i]]$parameter, ');
    echo(i18n("Estadístico t") + ' = result[[i]]$statistic, ');
    echo(i18n("p-valor") + ' = result[[i]]$p.value');
    if (getConfInt) {
      echo(', ' + i18n("Nivel de confianza %") + ' = (100 * attr(result[[i]]$conf.int, "conf.level"))');
      echo(', ' + i18n("Intervalo de confianza para<br/>la media de la diferencia") + ' = result[[i]]$conf.int');
    }
    echo('))}\n');
  } else {
    // Non-grouped mode
    echo('rk.results (list(');
    echo(i18n("Variable") + ' = "' + xName + ' - ' + yName + '", ');
    echo(i18n("Media de la diferencia estimada") + ' = result$estimate, ');
    echo(i18n("Grados de libertad") + ' = result$parameter, ');
    echo(i18n("Estadístico t") + ' = result$statistic, ');
    echo(i18n("p-valor") + ' = result$p.value');
    if (getConfInt) {
      echo(', ' + i18n("Nivel de confianza %") + ' = (100 * attr(result$conf.int, "conf.level"))');
      echo(', ' + i18n("Intervalo de confianza para<br/>la media de la diferencia") + ' = result$conf.int');
    }
    echo('))\n');
  }
}
