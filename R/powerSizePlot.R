powerSizePlot <- function (delta=NULL, sd=1, sig.level=0.05, type="one.sample" , alternative="two.sided", ...){
	pow = seq(0.5,0.99,0.001)
	n=0
	for (i in 1:length(pow)) n[i]= power.t.test(delta=delta, sd=sd, sig.level=sig.level, power=pow[i], type=type, alternative=alternative, ...)$n
	plot(pow,n,type="n", main=paste("Curve power for detecting a difference of ", delta, " with sig. level ", sig.level,sep=""), 
			sub = paste("Alternative hypothesis: ", alternative), xlab="Power of test", ylab="Sample size")
	lines(pow,n,col="red")
}
