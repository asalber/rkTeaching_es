samples <- function(x=c(0,1), nsamples= 1, size=1, sums=FALSE, means=FALSE, replace=TRUE, ...){
	data<-rep(0,nsamples*size)
	dim(data)<-c(size,nsamples)
	for(i in 1:nsamples) data[,i] <- sample(x,size=size,replace=replace,...)
	data <- as.data.frame(data)
	if (means==TRUE) aux <- rowMeans(data)
	if (sums==TRUE) data[,"sum"] = rowSums(data)
	if (means==TRUE) data[,"mean"] = aux
	return(data)
}