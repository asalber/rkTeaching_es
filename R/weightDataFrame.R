weightDataFrame <- function(data, freq){
  reps <- data[[freq]]
  data[[freq]] <- NULL 
  m <- as.matrix(data)
  result <- as.vector(m)
  result <- matrix(rep(result,rep(reps,ncol(m))),sum(reps),ncol(m));
  result <- as.data.frame(result);
  colnames(result) <- colnames(data)
  return(result)
}