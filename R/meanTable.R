meanTable <- function(x){
	t<-as.data.frame(table(x))
	ni<-t$Freq
	n<-sum(ni)
	nf<-length(ni)
	z<-rep(0,3*nf)
	dim(z)<-c(nf,3)
	z[,1]<-as.numeric(as.character(t$x))
	z[,2]<-ni
	z[,3]<-z[,1]*z[,2]
	z<-rbind(z,c("Suma", sum(z[,2]), sum(z[,3])))
	colnames(z)<-c("xi","ni","xi*ni")
	rownames(z)<-c(as.character(rep("",nf)),"Sum")
	return(z)
}