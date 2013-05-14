regcomp <- function(y,x, models=c("linear", "cuadratic", "cubic", "potential", "exponential", "logarithmic", "inverse", "sigmoid"), subset=NULL){
	if ("linear" %in% models){
		m <- lm(y~x,subset=subset)
		r <- c(summary(m)$r.squared)
		p <- c(pf(q=c(summary(m)$fstatistic["value"]),df1=summary(m)$fstatistic["numdf"],df2=summary(m)$fstatistic["dendf"],lower.tail=FALSE))
	}
	if ("cuadratic" %in% models){
		m <- lm(y~x+I(x^2),subset=subset)
		r <- c(r,summary(m)$r.squared)
		p <- c(p,pf(q=c(summary(m)$fstatistic["value"]),df1=summary(m)$fstatistic["numdf"],df2=summary(m)$fstatistic["dendf"],lower.tail=FALSE))	
	}
	if ("cubic" %in% models){
		m <- lm(y~x+I(x^2)+I(x^3),subset=subset)
		r <- c(r,summary(m)$r.squared)
		p <- c(p,pf(q=c(summary(m)$fstatistic["value"]),df1=summary(m)$fstatistic["numdf"],df2=summary(m)$fstatistic["dendf"],lower.tail=FALSE))
	}
	if ("potential" %in% models){
		m <- lm(log(y)~log(x),subset=subset)
		r <- c(r,summary(m)$r.squared)
		p <- c(p,pf(q=c(summary(m)$fstatistic["value"]),df1=summary(m)$fstatistic["numdf"],df2=summary(m)$fstatistic["dendf"],lower.tail=FALSE))
	}
	if ("exponential" %in% models){
		m <- lm(log(y)~x,subset=subset)
		r <- c(r,summary(m)$r.squared)
		p <- c(p,pf(q=c(summary(m)$fstatistic["value"]),df1=summary(m)$fstatistic["numdf"],df2=summary(m)$fstatistic["dendf"],lower.tail=FALSE))
	}
	if ("logarithmic" %in% models){
		m <- lm(y~log(x),subset=subset)
		r <- c(r,summary(m)$r.squared)
		p <- c(p,pf(q=c(summary(m)$fstatistic["value"]),df1=summary(m)$fstatistic["numdf"],df2=summary(m)$fstatistic["dendf"],lower.tail=FALSE))
	}
	if ("inverse" %in% models){
		m <- lm(y~I(1/x),subset=subset)
		r <- c(r,summary(m)$r.squared)
		p <- c(p,pf(q=c(summary(m)$fstatistic["value"]),df1=summary(m)$fstatistic["numdf"],df2=summary(m)$fstatistic["dendf"],lower.tail=FALSE))
	}
	if ("sigmoid" %in% models){
		m <- lm(log(y)~I(1/x),subset=subset)
		r <- c(r,summary(m)$r.squared)
		p <- c(p,pf(q=c(summary(m)$fstatistic["value"]),df1=summary(m)$fstatistic["numdf"],df2=summary(m)$fstatistic["dendf"],lower.tail=FALSE))
	}
	t <- data.frame(models,r,p)
	t <- t[order(-r),]
	t <- as.matrix(t)
	colnames(t) <- c("Model","R-squared","P-value")
	rownames(t) <- rep("",nrow(t))
	return(t)
}
