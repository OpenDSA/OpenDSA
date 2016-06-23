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
