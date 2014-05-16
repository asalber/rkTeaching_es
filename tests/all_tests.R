require(rkwardtests)

## add your test suite files, to this vector:
testsuites <- c (
		"data_tests.R")

rktest.makeplugintests (testsuites=testsuites, outfile="make_plugintests.txt")