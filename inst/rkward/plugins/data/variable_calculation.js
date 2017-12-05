// author: Alfredo Sánchez Alberca (asalber@ceu.es)

// globals
var data,
    variable,
    expresion;

function preprocess() {
    // add requirements etc. here
}

function calculate() {
    variable = getString("save");
    data = getString("dataframe");
    expresion = getString("expression");
    // Create a new variable from a formula
    echo('.GlobalEnv$' + variable + ' <- with(' + data + ', ' + expresion + ')\n');
    // Clean the label of the new variable
    echo('\t attr(.GlobalEnv$' + variable + ',".rk.meta") = NULL\n');
}

function printout() {
    echo('rk.header ("C&aacute;lculo de variable", parameters=list("Conjunto de datos" = "' + data + '", "Nueva variable"= rk.get.description(' + variable + '), "Expresi&oacute;n" = "' + expresion + '"))\n');
}
