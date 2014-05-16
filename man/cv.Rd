\name{cv}
\alias{cv}
\title{Coeficiente de variación}
\usage{
cv(x, na.rm = FALSE)
}
\arguments{
  \item{x}{a numeric vector.}

  \item{na.rm}{a logical value indicating whether NA values
  should be stripped before the computation proceeds.}
}
\description{
\code{cv} calcula el coeficiente de variación de Pearson
que se define como la desviación típica dividida entre el
valor absoluto de la media.
}
\examples{
cv(rnorm(1000,mean=1,sd=1))
}

