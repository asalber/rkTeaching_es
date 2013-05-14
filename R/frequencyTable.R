frequencyTable <- function(x){
	t<-as.data.frame(table(x))
	ni<-t$Freq
	n<-sum(ni)
	fi<-ni/n
	nf<-length(ni)
	if (is.numeric(x)) {
		Ni<-cumsum(ni)
		Fi<-Ni/n
		z<-rep(0,4*nf)
		dim(z)<-c(nf,4)
		z[,1]<-ni
		z[,2]<-fi
		z[,3]<-Ni
		z[,4]<-Fi
		colnames(z)<-c("Abs.Freq.","Rel.Freq.","Cum.Abs.Freq.","Cum.Rel.Freq.")
	}
	else {
		z<-rep(0,2*nf)
		dim(z)<-c(nf,2)
		z[,1]<-ni
		z[,2]<-fi
		colnames(z)<-c("Abs.Freq.","Rel.Freq.")
	}
	rownames(z)<-t$x
	return(z)
}