plotModel <- function(x, y, curve="linear", subset=TRUE, col="red", lty=1, ...){
	minx <- min(na.omit(x[subset]))
	maxx <- max(na.omit(x[subset]))
	miny <- min(na.omit(y[subset]))
	maxy <- max(na.omit(y[subset]))
	xvalues <- seq(minx, maxx, length.out=100)
	if (curve=="linear"){
		model <- lm(y~x, subset=subset)
		yvalues <- predict(model, data.frame(x=xvalues))
		equation <- bquote(.(deparse(substitute(y)))==.(round(model$coefficients[1],4))+.(round(model$coefficients[2],4))%.%.(deparse(substitute(x))))
	}
	else if (curve=="cuadratic"){
		model <- lm(y~x+I(x^2), subset=subset)
		yvalues <- predict(model, data.frame(x=xvalues))
		equation <- bquote(.(deparse(substitute(y)))==.(round(model$coefficients[1],4))+.(round(model$coefficients[2],4))%.%.(deparse(substitute(x)))+.(round(model$coefficients[3],4))%.%.(deparse(substitute(x)))^2)
	}
	else if (curve=="cubic"){
		model <- lm(y~x+I(x^2)+I(x^3), subset=subset)
		yvalues <- predict(model, data.frame(x=xvalues))
		equation <- bquote(.(deparse(substitute(y)))==.(round(model$coefficients[1],4))+.(round(model$coefficients[2],4))%.%.(deparse(substitute(x)))+.(round(model$coefficients[3],4))%.%.(deparse(substitute(x)))^2+.(round(model$coefficients[4],4))%.%.(deparse(substitute(x)))^3)
	}
	else if (curve=="potential"){
		model <- lm(log(y)~log(x), subset=subset)
		yvalues <- exp(predict(model, data.frame(x=xvalues)))
		equation <- bquote(.(deparse(substitute(y)))==.(round(exp(model$coefficients[1]),4))%.%.(deparse(substitute(x)))^.(round(model$coefficients[2],4)))
	}
	else if (curve=="exponential"){
		model <- lm(log(y)~x, subset=subset)
		yvalues <- exp(predict(model, data.frame(x=xvalues)))
		equation <- bquote(.(deparse(substitute(y)))==exp(.(round(model$coefficients[1],4))+.(round(model$coefficients[2],4))%.%.(deparse(substitute(x)))))
	}
	else if (curve=="logarithmic"){
		model <- lm(y~log(x), subset=subset)
		yvalues <- predict(model, data.frame(x=xvalues))
		equation <- bquote(.(deparse(substitute(y)))==.(round(model$coefficients[1],4))+.(round(model$coefficients[2],4))%.%log(.(deparse(substitute(x)))))
	}
	else if (curve=="inverse"){
		model <- lm(y~I(1/x), subset=subset)
		yvalues <- predict(model, data.frame(x=xvalues))
		equation <- bquote(.(deparse(substitute(y)))==.(round(model$coefficients[1],4))+.(round(model$coefficients[2],4))/.(deparse(substitute(x))))
	}
	else if (curve=="scurve"){
		model <- lm(log(y)~I(1/x), subset=subset)
		yvalues <- exp(predict(model, data.frame(x=xvalues)))
		equation <- bquote(.(deparse(substitute(y)))==exp(.(round(model$coefficients[1],4))+.(round(model$coefficients[2],4))/.(deparse(substitute(x)))))
	}
	else{
		message("You must select a valid model")
		return()
	}
	layout(rbind(1,2), heights=c(1,8))
	par(mar=c(0, 0, 0, 0))
	plot.new()
	r2 <- bquote(R^2==.(round(summary(model)$r.squared,2)))
	legend("left", as.expression(bquote(.(equation)~~~~.(r2))), col=col, lty=lty)
	plot(y~x, subset=subset, ...)
	lines(xvalues,yvalues,col=col,lty=lty)
	return()
}