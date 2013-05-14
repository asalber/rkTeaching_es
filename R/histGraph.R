histGraph <- function(x, breaks="Sturges", freq=TRUE, rel=FALSE, cum=FALSE, poly=FALSE, right=FALSE, ...){
	if (freq){
		h <- hist(x, breaks=breaks, right=right, plot=FALSE)
		if(cum){
			if(rel){
				h$counts <- cumsum(h$counts)/sum(h$counts) 
				plot(h, ylab="Cumulative relative frequency", ...)
			}
			else{
				h$counts <- cumsum(h$counts) 
				plot(h, ylab="Cumulative frequency", ...)
			}
			if(poly){
				xx<-h$breaks
				yy<-c(0,h$counts)
				lines(xx,yy)
			}
		}
		else{
			if(rel){
				h$counts <- h$counts/sum(h$counts) 
				plot(h, ylab="Relative frequency", ...)
			}
			else
				plot(h, ylab="Frequency", ...)
			
			if (poly){
				xx<-h$mids
				zz<-h$breaks
				x1<-xx[1]-zz[2]+zz[1]
				z<-length(zz)
				x2<-xx[z-1]+zz[z]-zz[z-1]
				xx<-c(x1,xx,x2)
				yy<-c(0,h$counts,0)
				lines(xx,yy)
			}				
		}
	}
	else {
		hist(x, breaks=breaks, freq=FALSE, right=right)
	}
}

