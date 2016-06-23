var emptystring = String.fromCharCode(955);

var GrammarTools = function() {
	this.init();
}

var toolProto = GrammarTools.prototype;

toolProto.init = function() {
}

toolProto.removeLambdaHelper = function(set, productions) {
  /*
  Function to find lambda-deriving variables.
  A variable derives lambda if it directly produces lambda or if its right side is
  composed only of lambda-deriving variables.
  Used during parsing as well.
  */
	for (var i = 0; i < productions.length; i++) {
		if (productions[i][2] === emptystring || _.every(productions[i][2], function(x) { return x in set;})) {
			if (!(productions[i][0] in set)) {
				set[productions[i][0]] = true;
				return true;
			} 
		}
	}
	return false;
}

// Function to fix all table column widths
toolProto.layout = function(mat, index) {
	// if column index is given, does layout for that column, otherwise lays out all columns
	if (typeof index === 'undefined') {
		for (var i = 0; i < mat._arrays[0]._indices.length; i++) {
			this.layoutColumn(mat, i);
		}
	} else {
		this.layoutColumn(mat, index);
	}
	mat.layout();
};

toolProto.layoutColumn = function(mat, index) {
	var maxWidth = 100;     // default cell size
	for (var i = 0; i < mat._arrays.length; i++) {
		var cell = mat._arrays[i]._indices[index].element;
		if ($(cell).width() > maxWidth) {
			maxWidth = $(cell).width();
		}
	}
	if (maxWidth > 100) {
		for (var i = 0; i < mat._arrays.length; i++) {
			var cell = mat._arrays[i]._indices[index].element;
			$(cell).find('.jsavvalue').width(maxWidth);
		}
	}
};
