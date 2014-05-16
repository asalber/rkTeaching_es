suite <- new ("RKTestSuite", id="data_tests",
	# list here libraries which are needed by all (or at least most) tests
	# in this suite
	libraries = c ("rk.Teaching"),
	# initCalls are run *before* any tests. Use this to set up the environment
	initCalls = list (
		function () {
			# prepare some different files for loading
			library ("rk.Teaching")
			assign("notas.curso", rk.Teaching::notas.curso, pos=globalenv())
		}
	## the tests
	), tests = list (
		new ("RKTest", id="filter_mujeres", call=function () {
			suppressWarnings(rk.call.plugin ("rkTeaching::filter", condition.text="sexo==\"mujer\"", dataframe.available="notas.curso", save.objectname="notas.curso.mujeres", save.parent=".GlobalEnv", variables_frame.checked="0", submit.mode="submit"))
		}),		
		new ("RKTest", id="filter_suspensos", call=function () {
					rk.call.plugin ("rkTeaching::filter", condition.text="notaA<5", dataframe.available="notas.curso", save.objectname="notas.curso.suspensos", save.parent=".GlobalEnv", variables_frame.checked="0", submit.mode="submit")
		}),		
		new ("RKTest", id="filter_hombres_aprobados", call=function () {
					rk.call.plugin ("rkTeaching::filter", condition.text="sexo==\"hombre\" & notaA >=5", dataframe.available="notas.curso", save.objectname="notas.curso.hombres.aprobados", save.parent=".GlobalEnv", variables_frame.checked="0", submit.mode="submit")
		}),	
		new ("RKTest", id="filter_variables_sexo_notaA", call=function () {
					rk.call.plugin ("rkTeaching::filter", condition.text="", dataframe.available="notas.curso", save.objectname="notaA.curso", save.parent=".GlobalEnv", variables.available="notas.curso[[\"sexo\"]]\nnotas.curso[[\"notaA\"]]", variables_frame.checked="1", submit.mode="submit")		})		
	), postCalls = list (
			function(){rm("notas.curso", pos=globalenv())}
	)	# like initCalls: run after all tests to clean up. Empty in this case.
)