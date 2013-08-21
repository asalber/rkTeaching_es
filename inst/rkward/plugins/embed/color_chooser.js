// author: Alfredo Sánchez Alberca (asalber@ceu.es)

function printout () {
	var color = getString("color")
	if (color != ''){
		color = '"' + color + '"';
	}
	echo(color);
}
