#' RKWard file names
#' 
#' @export
"rk.get.tempfile.name" <- function (prefix="image", extension=".jpg") {
  return (.rk.do.plain.call ("get.tempfile.name", c (prefix, extension)))
}

#' @export
#' @rdname rk.get.tempfile.name
"rk.get.workspace.url" <- function () {
  res <- .rk.do.plain.call ("getWorkspaceUrl")
  if (length (res)) res
  else NULL
}

#' @export
#' @rdname rk.get.tempfile.name
"rk.get.output.html.file" <- function () {
  return (.rk.variables$.rk.output.html.file)
}

#' @export
#' @rdname rk.get.tempfile.name
"rk.set.output.html.file" <- function (x, additional.header.contents = getOption ("rk.html.header.additions"), style=c ("regular", "preview"), css = getOption ("rk.output.css.file")) {
  stopifnot (is.character (x))
  style <- match.arg (style)
  oldfile <- rk.get.output.html.file ()
  assign (".rk.output.html.file", x, .rk.variables)
  
  if (!file.exists (x)) {
    .rk.cat.output (paste ("<?xml version=\"1.0\" encoding=\"", .Call ("rk.locale.name", PACKAGE="(embedding)"), "\"?>\n", sep=""))
    .rk.cat.output ("<html><head>\n<title>RKWard Output</title>\n")
    if (!is.null (css)) {
      cssfilename <- paste (sub ("\\.[^.]*$", "", basename (x)), ".css", sep="")
      .rk.cat.output (paste ("<link rel=\"StyleSheet\" type=\"text/css\" href=\"", cssfilename, "\"/>\n", sep=""))
      cssfile <- file.path (dirname (x), cssfilename)
      if (!file.copy (css, cssfile, overwrite=TRUE)) {
        warning ("Failed to copy CSS file ", css, " to ", cssfile)
      }
    }
    # the next part defines a JavaScript function to add individual results to a global table of contents menu in the document
    if (style != "preview") {
      .rk.cat.output (paste ("\t<script type=\"text/javascript\">
                             <!--
                             function addToTOC(id, level){
                             var fullHeader = document.getElementById(id);
                             var resultsTOC = document.getElementById('RKWardResultsTOCShown');
                             var headerName = fullHeader.getAttribute('name');
                             var headerText = fullHeader.firstChild.data;
                             var headerTitle = fullHeader.getAttribute('title');
                             var newDiv = document.createElement('div');
                             // create new anchor for TOC
                             var newAnchor = '<a href=\"#' + headerName + '\" title=\"' + headerTitle + '\"';
                             // indent anchor depending on header level
                             if(level > 1){
                             newDiv.style.textIndent = level-1 + 'em';
                             newDiv.className = 'level' + level;
                             newAnchor = '&bull; ' + newAnchor + '>' + headerText + '</a>';
                             } else {
                             newAnchor = newAnchor + '>' + headerText + '</a>';
                             }
                             newDiv.innerHTML = newAnchor;
                             resultsTOC.appendChild(newDiv);
                             }
                             function switchVisible(show, hide) {
                             document.getElementById(show).style.display = 'inline';
                             document.getElementById(hide).style.display = 'none';
                             }
                             function showMLevel(nodes){
                             for(var i=0; i < nodes.length; i++) {
                             nodes[i].style.display = 'block';
                             }
                             }
                             function hideMLevel(nodes){
                             for(var i=0; i < nodes.length; i++) {
                             nodes[i].style.display = 'none';
                             }
                             }
                             function maxLevel(level){
                             if(level > 5){
                             return false;
                             }
                             for(var i=1; i < 6; i++) {
                             if(i <= level){
                             showMLevel(document.getElementsByClassName('level' + i));
                             } else {
                             hideMLevel(document.getElementsByClassName('level' + i));
                             }
                             }
                             }
                             // -->\n\t</script>\n", sep=""))
      # positioning of the TOC is done by CSS, default state is hidden
      # see $SRC/rkward/pages/rkward_output.css
    }
    
    if (!is.null (additional.header.contents)) .rk.cat.output (as.character (additional.header.contents))
    .rk.cat.output ("</head>\n<body>\n")
    if (style != "preview") {
      # an empty <div> where the TOC menu gets added to dynamically, and a second one to toggle show/hide
      .rk.cat.output (paste (
        "<div id=\"RKWardResultsTOCShown\" class=\"RKTOC\">\n",
        "\t<a onclick=\"javascript:switchVisible('RKWardResultsTOCHidden','RKWardResultsTOCShown'); return false;\" href=\"\" class=\"toggleTOC\">Hide TOC</a>\n",
        "\t<span class=\"right\"><a href=\"#top\" class=\"toggleTOC\">Go to top</a></span>\n<br />",
        "\t\t<span class=\"center\">\n\t\t\t<a onclick=\"javascript:maxLevel('1'); return false;\" href=\"\" title=\"TOC level 1\">1</a> &bull;\n",
        "\t\t\t<a onclick=\"javascript:maxLevel('2'); return false;\" href=\"\" title=\"TOC level 2\">2</a> &bull;\n",
        "\t\t\t<a onclick=\"javascript:maxLevel('3'); return false;\" href=\"\" title=\"TOC level 3\">3</a> &bull;\n",
        "\t\t\t<a onclick=\"javascript:maxLevel('4'); return false;\" href=\"\" title=\"TOC level 4\">4</a>\n\t\t</span>\n",
        "\t<!-- the TOC menu goes here -->\n</div>\n",
        "<div id=\"RKWardResultsTOCHidden\" class=\"RKTOC RKTOChidden\">\n",
        "\t<a onclick=\"javascript:switchVisible('RKWardResultsTOCShown','RKWardResultsTOCHidden'); return false;\" href=\"\" class=\"toggleTOC\">Show TOC</a>\n",
        "\t<span class=\"right\"><a href=\"#top\" class=\"toggleTOC\">Go to top</a></span>\n",
        "</div>\n", sep=""))
    }
  }
  
  # needs to come after initialization, so initialization alone does not trigger an update during startup
  .rk.do.plain.call ("set.output.file", x, synchronous=FALSE)
  invisible (oldfile)
  }

# Internal helper function to extract file names of images used in html files.
# Almost definitely, this could be simplified, but I'll leave that as an exercise to the reader ;-)
# Note that this uses heuristics, rather than real parsing
".rk.get.images.in.html.file" <- function (file) {
  lines <- readLines (file)
  lines <- grep ("<(img|object)", lines, ignore.case=TRUE, value=TRUE)
  files <- character (0)
  for (line in lines) {
    slines <- strsplit (line, "<")[[1]]
    for (sline in slines) {
      sline <- toupper (sline)
      if (substring (sline, 0, 3) == "IMG") {
        parts <- strsplit (sline, "SRC")[[1]]
        if (length (parts) < 2) next
        parts <- strsplit (parts[2], "\"")[[1]]
        if (length (parts) < 2) next
        files <- c (files, parts[2])
      } else if (substring (sline, 0, 6) == "OBJECT") {
        parts <- strsplit (sline, "DATA")[[1]]
        if (length (parts) < 2) next
        parts <- strsplit (parts[2], "\"")[[1]]
        if (length (parts) < 2) next
        files <- c (files, parts[2])
      }
    }
  }
  files
}

#' @export
#' @rdname rk.get.tempfile.name
"rk.flush.output" <- function (x=rk.get.output.html.file (), flush.images=TRUE, ask=TRUE, ...) {
  images <- character (0)
  if (flush.images) images <- .rk.get.images.in.html.file (x)
  
  desc <- x
  if (length (images)) {
    desc <- paste (x, ", along with ", length (images), " image files", sep="")
  }
  
  if (isTRUE (ask)) {
    if (!rk.show.question (paste ("Do you really want to flush the output file (", desc, ")?\nIt will not be possible to restore it.", sep=""))) stop ("Aborted by user")
  }
  
  unlink (x)
  try (
    for (image in images) {
      unlink (image)
    }
  )
  header <- '<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>

<script type="text/javascript">
  $(document).ready(function(){ 
    $(".interpretation").on("click",function(){
      $(this).parent().next().toggle("fast");
      if ($(this).text()=="Mostrar interpretación")
        $(this).text("Ocultar interpretación");
      else
        $(this).text("Mostrar interpretación");
    });
  });
</script>\n'
  options(rk.html.header.additions=header)
  
  rk.set.output.html.file (x, ...)
}
