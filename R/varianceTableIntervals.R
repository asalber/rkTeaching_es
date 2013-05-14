varianceTableIntervals <- function(x,breaks = "Sturges"){
	h<-hist(x,breaks,plot=FALSE)
	t<-as.data.frame(table(cut(x,breaks=h$breaks)))
	ni<-t$Freq
	nf<-length(ni)
	z<-rep(0,4*nf)
	dim(z)<-c(nf,4)
	z[,1]<-h$mids
	z[,2]<-ni
	z[,3]<-z[,1]*z[,2]
	z[,4]<-z[,1]^2*z[,2]
	z<-rbind(z,c(NA, sum(z[,2]), sum(z[,3]), sum(z[,4])))
	colnames(z)<-c("xi","ni","xi*ni","xi^2*ni")
	rownames(z)<-c(as.character(t$Var1),"Sum")
	return(z)
}

