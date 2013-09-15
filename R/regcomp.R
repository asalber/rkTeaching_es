regcomp <- function(y,x, models=c("linear", "cuadratic", "cubic", "potential", "exponential", "logarithmic", "inverse", "sigmoid"), subset=NULL){
	if (length(models)==0){
		stop("You must select at least a model type")
	}
	names = c()
	if ("linear" %in% models){
		names <- c(names,"Lineal")
		m <- lm(y~x,subset=subset)
		r <- c(summary(m)$r.squared)
		p <- c(pf(q=c(summary(m)$fstatistic["value"]),df1=summary(m)$fstatistic["numdf"],df2=summary(m)$fstatistic["dendf"],lower.tail=FALSE))
	}
	if ("cuadratic" %in% models){
		names <- c(names,"Cuadr&aacute;tico")
		m <- lm(y~x+I(x^2),subset=subset)
		r <- c(r,summary(m)$r.squared)
		p <- c(p,pf(q=c(summary(m)$fstatistic["value"]),df1=summary(m)$fstatistic["numdf"],df2=summary(m)$fstatistic["dendf"],lower.tail=FALSE))	
	}
	if ("cubic" %in% models){
		names <- c(names,"C&uacute;bico")
		m <- lm(y~x+I(x^2)+I(x^3),subset=subset)
		r <- c(r,summary(m)$r.squared)
		p <- c(p,pf(q=c(summary(m)$fstatistic["value"]),df1=summary(m)$fstatistic["numdf"],df2=summary(m)$fstatistic["dendf"],lower.tail=FALSE))
	}
	if ("potential" %in% models){
		names <- c(names,"Potencial")
		m <- lm(log(y)~log(x),subset=subset)
		r <- c(r,summary(m)$r.squared)
		p <- c(p,pf(q=c(summary(m)$fstatistic["value"]),df1=summary(m)$fstatistic["numdf"],df2=summary(m)$fstatistic["dendf"],lower.tail=FALSE))
	}
	if ("exponential" %in% models){
		names <- c(names,"Exponencial")
		m <- lm(log(y)~x,subset=subset)
		r <- c(r,summary(m)$r.squared)
		p <- c(p,pf(q=c(summary(m)$fstatistic["value"]),df1=summary(m)$fstatistic["numdf"],df2=summary(m)$fstatistic["dendf"],lower.tail=FALSE))
	}
	if ("logarithmic" %in% models){
		names <- c(names,"Logar&iacute;tmico")
		m <- lm(y~log(x),subset=subset)
		r <- c(r,summary(m)$r.squared)
		p <- c(p,pf(q=c(summary(m)$fstatistic["value"]),df1=summary(m)$fstatistic["numdf"],df2=summary(m)$fstatistic["dendf"],lower.tail=FALSE))
	}
	if ("inverse" %in% models){
		names <- c(names,"Inverso")
		m <- lm(y~I(1/x),subset=subset)
		r <- c(r,summary(m)$r.squared)
		p <- c(p,pf(q=c(summary(m)$fstatistic["value"]),df1=summary(m)$fstatistic["numdf"],df2=summary(m)$fstatistic["dendf"],lower.tail=FALSE))
	}
	if ("sigmoid" %in% models){
		names <- c(names,"Sigmoidal")
		m <- lm(log(y)~I(1/x),subset=subset)
		r <- c(r,summary(m)$r.squared)
		p <- c(p,pf(q=c(summary(m)$fstatistic["value"]),df1=summary(m)$fstatistic["numdf"],df2=summary(m)$fstatistic["dendf"],lower.tail=FALSE))
	}
	t <- data.frame(names,r,p)
	t <- t[order(-r),]
	colnames(t) <- c("Modelo","R<sup>2</sup>","P-valor")
	rownames(t) <- rep(NULL,nrow(t))
	return(t)
}
