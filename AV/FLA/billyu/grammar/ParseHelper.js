var emptystring = String.fromCharCode(955),
  	variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var ParseHelper = function(productions) {
	this.init(productions);
}

var helperProto = ParseHelper.prototype;

helperProto.init = function(productions) {
	this.productions = productions;
}

helperProto.getDict = function() {
	var pDict = [];
	for (var i = 0; i < this.productions.length; i++) {
		if (!(this.productions[i][0] in pDict)) {
			pDict[this.productions[i][0]] = [];
		}
		pDict[this.productions[i][0]].push(this.productions[i][2]);
	}
	return pDict;
}

helperProto.gatherVT = function() {
	// variables
	var v = {};
	// terminals
	var t = {};
	for (var i = 0; i < this.productions.length; i++) {
		var x = this.productions[i];
		v[x[0]] = true;
		for (var j = 0; j < x[2].length; j++) {
			if (variables.indexOf(x[2][j]) !== -1) {
				v[x[2][j]] = true;
			} else if (x[2][j] !== emptystring) {
				t[x[2][j]] = true;
			}
		}
	}
	v = Object.keys(v);
	v.sort();
	t = Object.keys(t);
	t.sort();
	t.push('$');
	return {v: v, t: t};
}

helperProto.first = function(str, pDict, lambdaVars) {
	if (!str) {
		return [];
	}
	if (str === emptystring) {
		return [emptystring];
	} if (str.length === 1){
		if (variables.indexOf(str) === -1) {
			return [str];
		} else {
			var ret = [];
			var strings = pDict[str];
			if (!strings) {
				alert("Error: this grammar is not LL(1)");
				return;
			}
			for (var i = 0; i < strings.length; i++) {
				if (strings[i][0] !== str) {
					ret = _.union(ret, this.first(strings[i], pDict, lambdaVars));
				} else if (str in lambdaVars) {
					ret = _.union(ret, this.first(strings[i].substring(1), pDict, lambdaVars));
				}
			}
			return ret;
		}
	} else if (str.length > 1) {
		if (!(str[0] in lambdaVars)) {
			return this.first(str[0], pDict, lambdaVars);
		} else {
			return _.union(_.without(this.first(str[0], pDict, lambdaVars), emptystring), this.first(str.substring(1), pDict, lambdaVars));
		}
	}
}

helperProto.follow = function(str, productions, pDict, lambdaVars) {
	var ret = [];
	if (str === productions[0][0]) {
		ret.push('$');
	}
	for (var i = 0; i < productions.length; i++) {
		var p = productions[i][2] + '$';
		for (var j = 0; j < p.length - 1; j++) {
			if (p[j] === str) {
				if (j === p.length - 2) {
					if (productions[i][0] !== str) {
						ret = _.union(ret, this.follow(productions[i][0], productions, pDict, lambdaVars));
					}
				} else {
					var nextSymbol = this.first(p.substring(j + 1), pDict, lambdaVars);
					ret = _.union(ret, _.without(nextSymbol, emptystring));
					if (nextSymbol.indexOf(emptystring) !== -1) {
						if (productions[i][0] !== str) {
							ret = _.union(ret, this.follow(productions[i][0], productions, pDict, lambdaVars));
						}
					}
				}
			}
		}
	}
	return ret;
}
