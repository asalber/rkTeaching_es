// author: Alfredo Sánchez Alberca (asalber@ceu.es)

include("../common/common_functions.js")
include("../common/filter.js")

// globals
var dataframe,
  variable,
  variableName,
  factor,
  factorName,
  groups,
  groupsName,
  center;

function setGlobalVars() {
  variable = getString("variable");
  variableName = getString("variable.shortname");
  dataframe = getDataframe(variable);
  factor = getString("factor");
  factorName = getString("factor.shortname");
  grouped = getBoolean("grouped");
  groups = getList("groups");
  groupsName = getList("groups.shortname");
  center = getString("center");
}

function preprocess() {
  setGlobalVars();
  echo('require(car)\n');
  echo('require(plyr)\n');
}

function calculate() {
  // Filter
  filter();
  // Test settings
  var options = ', center=' + center;
  // Grouped mode
  if (grouped) {
    echo(dataframe + ' <- transform(' + dataframe + ', .groups=interaction(' + dataframe + '[,c(' + groupsName.map(quote) + ')]))\n');
    echo(dataframe + ' <- ' + dataframe + '[!is.na(' + dataframe + '[[".groups"]]),]\n');
    echo('result <- dlply(' + dataframe + ', ".groups", function(df) leveneTest(df[[' + quote(variableName) + ']], df[[' + quote(factorName) + ']]' + options + '))\n');
  } else {
    // Non-grouped mode
    echo('result <- leveneTest(' + variable + ', ' + factor + options + ')\n');
  }
}

function printout() {
  // Header
  header = new Header(i18n("Contraste de Levene para la comparación de las varianzas de %1 según %2", variableName, factorName));
  header.add(i18n("Conjunto de datos"), dataframe);
  header.add(i18n("Comparación de"), i18n("%1 según %2", variableName, factorName));
  header.add(i18n("Hipótesis nula"), i18n("No existen diferencias significativas entre las varianzas de las poblaciones"));
  header.add(i18n("Hipótesis alternativa"), i18n("Existen diferencias significativas entre las varianzas de al menos dos poblaciones"));
  if (center == "median") {
    header.add(i18n("Variabilidad con respecto a la"), i18n("Mediana"));
  } else {
    header.add(i18n("Variabilidad con respecto a la"), i18n("Media"));
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
    echo(i18n("Poblaciones definidas por") + ' = "' + factorName + '", ');
    echo(i18n("Grados de libertad") + ' = result[[i]]$Df, ');
    echo(i18n("Estadístico F") + ' = result[[i]][["F value"]][1], ');
    echo(i18n("p-valor") + ' = result[[i]][["Pr(>F)"]][1]');
    echo('))}\n');
  } else {
    // Non-grouped mode
    echo('rk.results(list(');
    echo(i18n("Variable") + ' = "' + variableName + '", ');
    echo(i18n("Poblaciones definidas por") + ' = "' + factorName + '", ');
    echo(i18n("Grados de libertad") + ' = result$Df, ');
    echo(i18n("Estadístico F") + ' = result[["F value"]][1], ');
    echo(i18n("p-valor") + ' = result[["Pr(>F)"]][1]');
    echo('))\n');
  }
}
