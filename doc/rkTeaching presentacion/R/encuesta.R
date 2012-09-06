#ANALISIS DE LOS DATOS DE LA ENCUESTA COMPARATIVA ENTRE SPSS Y RKTEACHINGEXTRAS

#Carga de datos
setwd("/media/datos/ceu/docencia/practicas/rkTeachingExtras/rkTeachingExtras presentacion/R")
load (file="../datos/encuesta.RData", envir=globalenv())
temp = data.frame(facilidad=c(encuesta[["facilidadSPSS"]],encuesta[["facilidadR"]]),programa=rep(c("SPSS","rkTeachingExtras"),c(40,40)))
library(TeachingExtras)
#Diagrama de barras de facilidad de uso por programas
x11()
options(digits=1)
par(cex.lab=1.2)
counts <- table(temp[["programa"]], temp[["facilidad"]])
barGraph(counts, beside=TRUE, col=rainbow (if(is.matrix(counts)) dim(counts) else length(counts)), xlab="Facilidad de uso (1=más difícil, 5=más fácil)", main="Facilidad de uso de SPSS vs rkTeachingExtras")
dev.copy2eps(file="../img/barras_facilidad.eps")
dev.off()

#Histograma hombres y mujeres
library(Hmisc)
x11()
options(digits=1)
par(cex.lab=1.2)
out <- histbackback(encuesta[["tiempoR"]],encuesta[["tiempoSPSS"]], xlim=c(-15,15), main = 'Tiempo de aprendizaje de rkTeachingExtras vs SPSS', xlab=c("rkTeachingExtras", "SPSS"), ylab="Tiempo (min)")
abline(v= (-8:8)*2 , col ="gray" , lty =3) 
barplot(-out$left, col="coral" , horiz=TRUE, space=0, add=TRUE, axes=FALSE) 
barplot(out$right, col="royalblue1", horiz=TRUE, space=0, add=TRUE, axes=FALSE) 
dev.copy2eps(file="../img/histograma_aprendizaje.eps", width=5, height=5, pointsize=10)
#dev.off()

#comparación de tiempo de aprendizaje entre rkTeachingExtras y SPSS
t.test (encuesta[["tiempoSPSS"]], encuesta[["tiempoR"]], alternative="greater", paired=TRUE, conf.level=0.95)