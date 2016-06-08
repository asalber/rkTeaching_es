#' t.test.rk.interpretation
#' Function that prints the interpretation of the t.test procedure in HTML format.
#'
#' @param result is the result of the t.test procedure.
#' @param conf.int is a boolean indicating if the information about the confidence interval must be printed.
#'
#' @return
#' @export
#'
#' @examples
rk.interpretation.t.test <- function (result, conf.int=TRUE){
  require(R2HTML)
  conclusion <- NULL
  interpretation.test <- NULL
  interpretation.int <- NULL
  observation <- NULL
  # Very significant differences
  if (result$p.value < 0.01){ 
    conclusion <- '<span  style="color:green">Se rechaza la hipótesis nula con nivel de significación 0.01.</span>'
    interpretation.test <- sprintf(
      'Como el p-valor del test T para la media poblacional %f es menor que 0.01 <em>se rechaza la hipótesis nula 
con un nivel de significación 0.01</em> y se concluye que <em>hay pruebas muy significativas de que la media 
de la variable %s es %s %i</em>.<br/>
Observe, no obstante, que una diferencia estadísticamente significativa no necesariamente supone
una diferencia relevante en el dominio de aplicación.', 
      result$p.value,
      strsplit(result$data.name, "\\\"")[[1]][2],
      ifelse(result$alternative == "two.sided", "distinta de", ifelse(result$alternative == "greater", "mayor que", "menor que")),
      result$null.value)
  } else if(result$p.value < 0.05) {
    # Significant differences
    conclusion <- '<span  style="color:orange">Se rechaza la hipótesis nula con nivel de significación 0.05.</span>'
    interpretation.test <- sprintf(
      'Como el p-valor del test T para la media poblacional %f es menor que 0.05 <em>se rechaza la hipótesis nula 
con un nivel de significación 0.05</em> y se concluye que <em>hay pruebas significativas de que la media 
de la variable %s es %s %i</em>.<br/>
Observe, no obstante, que una diferencia estadísticamente significativa no necesariamente supone
una diferencia relevante en el dominio de aplicación.', 
    result$p.value,
    strsplit(result$data.name, "\\\"")[[1]][2],
    ifelse(result$alternative == "two.sided", "distinta de", ifelse(result$alternative == "greater", "mayor que", "menor que")),
    result$null.value)
  } else {
    # Non-significant differences
    conclusion <- '<span  style="color:red">No se puede rechazar la hipótesis nula con nivel de significación 0.05.</span>'
    interpretation.test <- sprintf(
      'Como el p-valor del test T para la media poblacional %f es mayor que 0.05 <em>no se puede rechazar la hipótesis nula 
con un nivel de significación 0.05</em> y se concluye que <em>no hay pruebas significativas de que la media 
de la variable %s es %s %i</em>.', 
    result$p.value,
    strsplit(result$data.name, "\\\"")[[1]][2],
    ifelse(result$alternative == "two.sided", "distinta de", ifelse(result$alternative == "greater", "mayor que", "menor que")),
    result$null.value)
  }
  if (conf.int){
    if (result$alternative == "two.sided"){
      interpretation.int <- sprintf(
        'El intervalo de confianza indica además que la media poblacional de la variable %s está entre %f y %f 
con una confianza del %i%%.',
        strsplit(result$data.name, "\\\"")[[1]][2],
        result$conf.int[1],
        result$conf.int[2],
        attr(result[["conf.int"]],"conf.level")*100
      )
    } else if (result$alternative == "greater"){
      interpretation.int <- sprintf(
        'El intervalo de confianza indica además que la media poblacional de la variable %s es mayor que %f 
con una confianza del %i%%.',
        strsplit(result$data.name, "\\\"")[[1]][2],
        result$conf.int[1],
        attr(result[["conf.int"]],"conf.level")*100
      )
    } else {
      interpretation.int <- sprintf(
        'El intervalo de confianza indica además que la media poblacional de la variable %s es menor que %f 
con una confianza del %i%%.',
        strsplit(result$data.name, "\\\"")[[1]][2],
        result$conf.int[2],
        attr(result[["conf.int"]],"conf.level")*100
      )
    }
  }
  if (result[["parameter"]] < 9) {
    observation <- '<b>Observación</b>. Como el tamaño muestral es menor que 10 debería aplicar un test no paramétrico.'
  } else if (result[["parameter"]] < 29) {
    observation <- '<b>Observación</b>. Como el tamaño muestral es menor que 30 debería aplicar un test de normalidad 
para asegurarse de que la población tiene una distribución normal.'
  }
  # Print to html file
  htmlfile <- rk.get.output.html.file()
  HTML.title("Conclusión", file=htmlfile)
  HTML(conclusion, file=htmlfile)
  if (!is.null(observation)) HTML(observation, file=htmlfile)
  HTML('<div><button class="interpretation">Mostrar interpretación</button></div> <div id="interpretation" style="display:none">', file=htmlfile)
  HTML(interpretation.test, file=htmlfile)
  if (!is.null(interpretation.int)) HTML(interpretation.int, file=htmlfile)
  HTML('</div>', file=htmlfile)
}
