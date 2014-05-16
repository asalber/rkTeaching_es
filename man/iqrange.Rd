\name{iqrange}
\alias{iqrange}
\title{Interquartile range}
\usage{
iqrange(x, na.rm = FALSE)
}
\arguments{
  \item{x}{numerical vector.}

  \item{na.rm}{a logical value indicating whether NA values
  should be stripped before the computation proceeds.}
}
\value{
a numerical value that is the interquartile range of
\code{x}.
}
\description{
This function calculates the interquartile range of a
vector (third quartile minus first quartile).
}
\examples{
iqrange(rnorm(100))
}
\keyword{interquartile}
\keyword{range}

