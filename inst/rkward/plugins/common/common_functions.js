// Functions that get de data frame name from variables in the form dataframe[["variable"]]
function getDataframe(vars) {
    if (Array.isArray(vars)) {
        return vars.join().split('[[')[0];
    } else {
        return vars.split('[[')[0];
    }
}
