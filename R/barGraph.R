barGraph <- function(x, rel=FALSE, cum=FALSE, poly=FALSE, ...){
   if(cum){  
      if(rel){
		  freq = cumsum(x)/sum(x)
		  .x = barplot(freq, ...)[,1]
	  }
      else{
		  freq = cumsum(x)
		  .x = barplot(freq, ...)[,1] 
	  }
		 
	  if(poly){
		  n=length(freq)
		  .x = c(rep(.x, rep(2,n)), .x[n]+(.x[n]-.x[n-1])/2)
		  .y = c(0,rep(freq, rep(2, n)))
		  lines(.x,.y)
	 }
   }
   else{
      if(rel){
		 freq = x/sum(x)
		 .x = barplot(freq, ...)[,1]
	  }   
      else{
		  freq = x
		  .x = barplot(freq, ...)[,1]
	  }
        
	  if(poly){
		 lines(.x,freq)
	 }
   }
}

