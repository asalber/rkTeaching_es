// Function that filters a data frame applying a condition.
function filter() {
    filtered = getBoolean("filter");
    if (filtered) {
        var condition = getString("condition");
        echo(dataframe + ' <- subset(' + dataframe + ', subset=' + condition + ')\n');
    }
}
