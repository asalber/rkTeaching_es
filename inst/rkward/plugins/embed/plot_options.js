//author: Alfredo Sánchez Alberca (asalber@ceu.es)

function prepareLabel (labelname) {
	var label = getString(labelname).split('\n');
	label = label.join('\\n');
	if (label!='') {
		if (!getBoolean(labelname + '_expression')) {
			label = quote(label); 
		}
	}
	return label;
}
	
function preprocess () {
}

function calculate () {
	var ggplotoptions = '';
	// X axe
	// X axi label
	var xlab = prepareLabel("xlab");
	if (xlab!='') {
		xlab = ' + xlab(' + xlab + ')';
	}
	// X range
	var xminvalue = getString("xminvalue");
	var xmaxvalue = getString("xmaxvalue");
	var xlim = '';
	if ((xminvalue != '') && (xmaxvalue != '')) {
		xlim = 'xlim=c(' + xminvalue + ',' + xmaxvalue + ')';
	}
	// X ticks labels orientation
	var x_lab_orientation = getString("x_lab_orientation");
	if (x_lab_orientation!=='') {
		x_lab_orientation = ' + theme(axis.text.x=element_text(angle=' + x_lab_orientation + ', vjust=0.5))';
	} 

	
	// Y axe
	// X axi label
	var ylab = prepareLabel("ylab");
	if (ylab!='') {
		ylab = ' + ylab(' + ylab + ')';
	}
	// Y range
	var yminvalue = getString("yminvalue");
	var ymaxvalue = getString("ymaxvalue");
	var ylim = '';
	if ((yminvalue != '') && (ymaxvalue != '')) {
		ylim = 'ylim=c(' + yminvalue + ',' + ymaxvalue + ')';
	}
	
	var coord = ' + coord_cartesian(' + xlim + ',' + ylim + ')';
			
	// Y ticks labels orientation
	var y_lab_orientation = getString("y_lab_orientation");
	if (y_lab_orientation!=='') {
		y_lab_orientation = ' + theme(axis.text.y=element_text(angle=' + y_lab_orientation + ', hjust=0.5))';
	}
	
	// flip axis
	var flip_axis = '';
	if (getBoolean("flip_axis")) {
		flip_axis = ' + coord_flip()';
	}

	// legend
	var legend = getString("legend");
	if (legend != '') {
		legend = ' + theme(legend.position="' + legend + '")';
	}
	
	// grid
	var grid_horizontal_major = '';
	if (!getBoolean("grid_horizontal_major")) {
		grid_horizontal_major = ' + theme(panel.grid.major.x=element_blank())';
	}
	var grid_horizontal_minor = '';
	if (!getBoolean("grid_horizontal_minor")) {
		grid_horizontal_minor = ' + theme(panel.grid.minor.x=element_blank())';
	}
	var grid_vertical_major = '';
	if (!getBoolean("grid_vertical_major")) {
		grid_vertical_major = ' + theme(panel.grid.major.y=element_blank())';
	}
	var grid_vertical_minor = '';
	if (!getBoolean("grid_vertical_minor")) {
		grid_vertical_minor = ' + theme(panel.grid.minor.y=element_blank())';
	}
	var grid_background_color = getString("grid_background_color.code.printout");
	if (grid_background_color!='') {
		grid_background_color = ' + theme(panel.background=element_rect(fill=' + grid_background_color + '))';
	}
	var grid_major_line_color = getString("grid_major_line_color.code.printout");
	if (grid_major_line_color!='') {
		grid_major_line_color = ' + theme(panel.grid.major=element_line(colour=' + grid_major_line_color + '))';
	}
	var grid_minor_line_color = getString("grid_minor_line_color.code.printout");
	if (grid_minor_line_color!='') {
		grid_minor_line_color = ' + theme(panel.grid.minor=element_line(colour=' + grid_minor_line_color + '))';
	}
	
	ggplotoptions =  xlab + ylab + coord + flip_axis + x_lab_orientation + y_lab_orientation + legend + grid_horizontal_major + grid_horizontal_minor + grid_vertical_major + grid_vertical_minor + grid_major_line_color + grid_minor_line_color + grid_background_color;
	echo (ggplotoptions);
}

function printout () {
	// main title 
	var main = prepareLabel('main');
	if (main!=''){
		main = ', main=' + main;
	}

	// X axi log transformation
	var log='';
	if (getBoolean("xlog")) {
		log = ', log="x"';
	}
	// Y axi log transformation
	if (getBoolean("ylog")) {
		log = ', log="y"';
		if (getBoolean("xlog")) {
			log = ', log="xy"';
		}
	}
	// make option string
	options = main + log;
	echo (options);
}

