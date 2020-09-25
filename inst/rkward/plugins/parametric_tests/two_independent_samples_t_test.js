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
  grouped = getBoolean("grouped");
  groups = getList("groups");
  factor = getString("factor");
  factorName = getString("factor.shortname");
  population1 = getString("population1");
  population2 = getString("population2");
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
    echo('resultvar <- dlply(' + dataframe + ', ".groups", function(df) var.test(df[[' + quote(variableName) + ']][df[[' + quote(factorName) + ']]==' + population1 + '], df[[' + quote(variableName) + ']][df[[' + quote(factorName) + ']]==' + population2 + '], conf.level=0.95))\n');
    echo('resultnovareq <- dlply(' + dataframe + ', ".groups", function(df) t.test(df[[' + quote(variableName) + ']][df[[' + quote(factorName) + ']]==' + population1 + '], df[[' + quote(variableName) + ']][df[[' + quote(factorName) + ']]==' + population2 + ']' + options + ', var.equal=FALSE))\n');
    echo('resultvareq <- dlply(' + dataframe + ', ".groups", function(df) t.test(df[[' + quote(variableName) + ']][df[[' + quote(factorName) + ']]==' + population1 + '], df[[' + quote(variableName) + ']][df[[' + quote(factorName) + ']]==' + population2 + ']' + options + ', var.equal=TRUE))\n');
  } else {
    // Non-grouped mode
    echo('resultvar <- var.test (' + variable + '[' + factor + '==' + population1 + '], ' + variable + '[' + factor + '==' + population2 + '], conf.level=0.95)\n');
    echo('resultnovareq <- t.test (' + variable + '[' + factor + '==' + population1 + '], ' + variable + '[' + factor + '==' + population2 + ']' + options + ', var.equal=FALSE)\n');
    echo('resultvareq <- t.test (' + variable + '[' + factor + '==' + population1 + '], ' + variable + '[' + factor + '==' + population2 + ']' + options + ', var.equal=TRUE)\n');
  }
}

function printout() {
  // Header
  header = new Header(i18n("Contraste T de comparación de las medias de %1 según %2", variableName, factorName));
  header.add(i18n("Conjunto de datos"), dataframe);
  header.add(i18n("Comparación de"), i18n("%1 según %2", variableName, factorName));
  header.add(i18n("Hipótesis nula"), i18n("Media de %1 = Media de %2", population1, population2));
  if (hypothesis == "two.sided") {
    header.add(i18n("Hipótesis alternativa"), i18n("Media de %1 &ne; Media de %2", population1, population2));
  } else if (hypothesis == "greater") {
    header.add(i18n("Hipótesis alternativa"), i18n("Media de %1 &gt; Media de %2", population1, population2));
  } else {
    header.add(i18n("Hipótesis alternativa"), i18n("Media de %1 &lt; Media de %2", population1, population2));
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
    echo('for (i in 1:length(resultvar)){\n');
    echo('\t rk.header(paste(' + i18n("Group %1 =", groupsName.join('.')) + ', names(resultvar)[i]), level=3)\n');
    // F test for comparison of variances
    echo('\t rk.header(' + i18n("Contraste F para la comparación de varianzas") + ', level=4)\n');
    echo('rk.results(list(');
    echo(i18n("Variable") + ' = "' + variableName + '", ');
    echo(i18n("Poblaciones") + ' = c(' + population1 + ', ' + population2 + '), ');
    echo(i18n("Cociente de varianzas estimado") + ' = resultvar[[i]]$estimate, ');
    echo(i18n("Grados de libertad") + ' = resultvar[[i]]$parameter, ');
    echo(i18n("Estadístico F") + ' = resultvar[[i]]$statistic, ');
    echo(i18n("p-valor") + ' = resultvar[[i]]$p.value');
    if (getConfInt) {
      echo(', ' + i18n("Nivel de confianza %") + ' = (100 * attr(resultvar[[i]]$conf.int, "conf.level"))');
      echo(', ' + i18n("Intervalo de confianza para<br/>el cociente de varianzas") + ' = resultvar[[i]]$conf.int');
    }
    echo('))\n');
    // T-test for comparison of means
    // Non equal variances
    echo('rk.header ("Contraste T suponiendo varianzas diferentes",level=4)\n');
    echo('rk.results(list(');
    echo(i18n("Variable") + ' = "' + variableName + '", ');
    echo(i18n("Poblaciones") + ' = c(' + population1 + ', ' + population2 + '), ');
    echo(i18n("Medias estimadas") + ' = resultnovareq[[i]]$estimate, ');
    echo(i18n("Grados de libertad") + ' = resultnovareq[[i]]$parameter, ');
    echo(i18n("Estadístico t") + ' = resultnovareq[[i]]$statistic, ');
    echo(i18n("p-valor") + ' = resultnovareq[[i]]$p.value');
    if (getConfInt) {
      echo(', ' + i18n("Nivel de confianza %") + ' = (100 * attr(resultnovareq[[i]]$conf.int, "conf.level"))');
      echo(', ' + i18n("Intervalo de confianza para<br/>la diferencia de medias") + ' = resultnovareq[[i]]$conf.int');
    }
    echo('))\n');
    echo('rk.header ("Contraste T suponiendo varianzas iguales",level=4)\n');
    echo('rk.results(list(');
    echo(i18n("Variable") + ' = "' + variableName + '", ');
    echo(i18n("Poblaciones") + ' = c(' + population1 + ', ' + population2 + '), ');
    echo(i18n("Medias estimadas") + ' = resultvareq[[i]]$estimate, ');
    echo(i18n("Grados de libertad") + ' = resultvareq[[i]]$parameter, ');
    echo(i18n("Estadístico t") + ' = resultvareq[[i]]$statistic, ');
    echo(i18n("p-valor") + ' = resultvareq[[i]]$p.value');
    if (getConfInt) {
      echo(', ' + i18n("Nivel de confianza %") + ' = (100 * attr(resultvareq[[i]]$conf.int, "conf.level"))');
      echo(', ' + i18n("Intervalo de confianza para<br/>la diferencia de medias") + ' = resultvareq[[i]]$conf.int');
    }
    echo('))}\n');
  } else {
    // Non-grouped mode
    // F test for comparison of variances
    echo('rk.header(' + i18n("Contraste F para la comparación de varianzas") + ', level=4)\n');
    echo('rk.results(list(');
    echo(i18n("Variable") + ' = "' + variableName + '", ');
    echo(i18n("Poblaciones") + ' = c(' + population1 + ', ' + population2 + '), ');
    echo(i18n("Cociente de varianzas estimado") + ' = resultvar$estimate, ');
    echo(i18n("Grados de libertad") + ' = resultvar$parameter, ');
    echo(i18n("Estadístico F") + ' = resultvar$statistic, ');
    echo(i18n("p-valor") + ' = resultvar$p.value');
    if (getConfInt) {
      echo(', ' + i18n("Nivel de confianza %") + ' = (100 * attr(resultvar$conf.int, "conf.level"))');
      echo(', ' + i18n("Intervalo de confianza para<br/>el cociente de varianzas") + ' = resultvar$conf.int');
    }
    echo('))\n');
    // T-test for comparison of means
    //  Non equal variances
    echo('rk.header ("Contraste T suponiendo varianzas diferentes",level=4)\n');
    echo('rk.results(list(');
    echo(i18n("Variable") + ' = "' + variableName + '", ');
    echo(i18n("Poblaciones") + ' = c(' + population1 + ', ' + population2 + '), ');
    echo(i18n("Medias estimadas") + ' = resultnovareq$estimate, ');
    echo(i18n("Grados de libertad") + ' = resultnovareq$parameter, ');
    echo(i18n("Estadístico t") + ' = resultnovareq$statistic, ');
    echo(i18n("p-valor") + ' = resultnovareq$p.value');
    if (getConfInt) {
      echo(', ' + i18n("Nivel de confianza %") + ' = (100 * attr(resultnovareq$conf.int, "conf.level"))');
      echo(', ' + i18n("Intervalo de confianza para<br/>la diferencia de medias") + ' = resultnovareq$conf.int');
    }
    echo('))\n');
    echo('rk.header ("Contraste T suponiendo varianzas iguales",level=4)\n');
    echo('rk.results(list(');
    echo(i18n("Variable") + ' = "' + variableName + '", ');
    echo(i18n("Poblaciones") + ' = c(' + population1 + ', ' + population2 + '), ');
    echo(i18n("Medias estimadas") + ' = resultvareq$estimate, ');
    echo(i18n("Grados de libertad") + ' = resultvareq$parameter, ');
    echo(i18n("Estadístico t") + ' = resultvareq$statistic, ');
    echo(i18n("p-valor") + ' = resultvareq$p.value');
    if (getConfInt) {
      echo(', ' + i18n("Nivel de confianza %") + ' = (100 * attr(resultvareq$conf.int, "conf.level"))');
      echo(', ' + i18n("Intervalo de confianza para<br/>la diferencia de medias") + ' = resultvareq$conf.int');
    }
    echo('))\n');
  }
}
