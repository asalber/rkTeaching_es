//author: Alfredo Sánchez Alberca (asalber@ceu.es)

function preprocess() {
}

function calculate() {
	echo ('install.packages("' + getString("file") + '", repos=NULL)\n');
}


