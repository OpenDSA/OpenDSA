var emptystring = String.fromCharCode(955),
  	variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var ParseHelper = function(productions, m, jsav) {
	this.init(productions, m, jsav);
}

var helperProto = ParseHelper.prototype;

helperProto.init = function(productions, m, jsav) {
	this.productions = productions;
	this.m;
	this.jsav;
  this.parseTableDisplay;  // the parse table
	this.parseTree;          // parse tree shown during parsing slideshows
	this.parseTable;					// parse table used for pasing
	this.conflictTable;			// used for SLR parsing conflicts
	this.ffTable;            // table for FIRST and FOLLOW sets
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

// click handler for the FIRST/FOLLOW table
helperProto.firstFollowHandler = function(table, index) {
	// ignore if first row (headers)
	if (index === 0) { return; }
	var prev = table.value(index, arrayStep);
	prev = prev.replace(/,/g, "");
	// create input box
	$('#firstinput').remove();
	var createInput = "<input type='text' id='firstinput' value="+prev+">";
	$('body').append(createInput);
	var offset = table._arrays[index]._indices[arrayStep].element.offset();
	var topOffset = offset.top;
	var leftOffset = offset.left;
	var w = $(table._arrays[index]._indices[arrayStep].element).width();
	var fi = $('#firstinput');
	fi.offset({top: topOffset, left: leftOffset});
	fi.outerHeight($('.jsavvalue').height());
	fi.width(w);
	fi.focus();
	// finalize changes when enter key is pressed
	fi.keyup(function(event){
		if(event.keyCode == 13){
			var firstInput = $(this).val();
			firstInput = firstInput.split("");
			// read ! as lambda
			for (var i = 0; i < firstInput.length; i++) {
				if (firstInput[i] === '!') {
					firstInput[i] = emptystring;
				}
			}
			firstInput = _.uniq(firstInput).join(',');
			ffTable.value(index, arrayStep, firstInput);
			layoutTable(ffTable, arrayStep);
			fi.remove();
		}
	});
}

// Function to transition from editing FIRST sets to editing FOLLOW sets
helperProto.continueToFollow = function(firsts, follows) {
	$('#firstinput').remove();
	var incorrect = this.checkTable(firsts, follows);
	// provide option to complete the FIRST sets automatically
	if (incorrect.length > 0) {
		var confirmed = confirm('The following sets are incorrect: ' + incorrect + '.\nFix automatically?');
		if (confirmed) {
			for (var i = 1; i < ffTable._arrays.length; i++) {
				var a = ffTable._arrays[i].value(0);
				ffTable.value(i, 1, firsts[a]);
			}
			layoutTable(ffTable);
		} else {
			return false;
		}
	}
	$(ffTable.element).off();
	$('#followbutton').hide();
	jsav.umsg('Define FOLLOW sets. $ is the end of string character.');
	arrayStep = 2;
	ffTable.click(firstFollowHandler);
	return true;
};

/*
Function to check if FIRST / FOLLOW sets are correct (either FIRST sets or FOLLOW sets).
Returns a list of the incorrect variables.
*/
helperProto.checkTable = function(firsts, follows) {
	var checker;
	// arrayStep can be 1 or 2
	if (arrayStep === 1) {
		checker = firsts;
	} else {
		checker = follows;
	}
	var incorrect = [];
	for (var i = 1; i < ffTable._arrays.length; i++) {
		var a = ffTable._arrays[i];
		var fvar = a.value(0);
		var fset = a.value(arrayStep);
		var check1 = checker[fvar];
		var check2 = fset.split(',');
		var inter = _.intersection(check1, check2);
		if (inter.length !== check1.length || inter.length !== check2.length) {
			incorrect.push(fvar);
		} 
	} 
	return incorrect
};
