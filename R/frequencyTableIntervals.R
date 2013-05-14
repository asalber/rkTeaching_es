frequencyTableIntervals <- function(x, breaks="Sturges", right=FALSE, include.lowest=TRUE){
	h<-hist(x, breaks, right=right, include.lowest=include.lowest, plot=FALSE)
	t<-as.data.frame(table(cut(x, breaks=h$breaks, right=right, include.lowest=include.lowest)))
	ni<-t$Freq
	n<-sum(ni)
	fi<-ni/n
	Ni<-cumsum(ni)
	Fi<-Ni/n
	nc<-length(ni)
	z<-rep(0,5*nc)
	dim(z)<-c(nc,5)
	z[,1]<-h$mids
	z[,2]<-ni
	z[,3]<-fi
	z[,4]<-Ni
	z[,5]<-Fi
	colnames(z)<-c("Class.Mark", "Abs.Freq", "Rel.Freq.", "Cum.Abs.Freq.", "Cum.Rel.Freq.")
	rownames(z)<-t$Var1
	return(z)
}

