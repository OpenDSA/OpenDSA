$(document).ready(function () {
  var variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var jsav = new JSAV("av");
  var arrow = String.fromCharCode(8594),
      lastRow,            // index of the last visible row (the empty row)
      arr,                // the grammar
      backup = null,      // a copy of the original grammar (as a string) before it is transformed
      m,                  // the grammar table
			parseTableDisplay,  // the parse table
			parseTree,          // parse tree shown during parsing slideshows
			parseTable,					// parse table used for pasing
			conflictTable,			// used for SLR parsing conflicts
			ffTable,            // table for FIRST and FOLLOW sets
      tGrammar,           // transformed grammar
      derivationTable,    // the derivation table shown during brute-force parsing
      arrayStep,          // the position of FIRST or FOLLOW cells
      selectedNode,       // used for FA/graph editing
      modelDFA,           // DFA used to build SLR parse table
      builtDFA,           // DFA created by the user
			type, 							// type of parsing, can be bf, ll, slr
			grammars,						// stores grammar exercises, xml
			currentExercise = 0,// current exercise index
			multiple = false,		// if multiple grammar editing is enabled
			fi,									// input box for matrix
			row,							// row number for input box
			col;							// column number for input box

  var lambda = String.fromCharCode(955),
      epsilon = String.fromCharCode(949),
      square = String.fromCharCode(9633),
      dot = String.fromCharCode(183),
      emptystring = lambda;
  /*
  If there is a grammar in local storage, load that grammar.
  This is used to import grammars from certain proofs.
  */
  if (localStorage["grammar"]) {
    // the grammar is saved as a string of a list of strings:
    // turn each production into an array containing the left side, arrow, and right side
    arr = _.map(localStorage['grammar'].split(','), function(x) { 
      var d = x.split(arrow);
      d.splice(1, 0, arrow);
      return d;
    });
    lastRow = arr.length;
    // add an empty row for editing purposes (clicking the empty row allows the user to add productions)
    arr.push(["", arrow, ""]);
    // clear the grammar from local storage to prevent it from being loaded by other grammar tests
    localStorage.removeItem('grammar');
  } else {
    arr = new Array(20);    // arbitrary array size
    for (var i = 0; i < arr.length; i++) {
      arr[i] = ["", arrow, ""];
    }
    lastRow = 0;
  }
  
  // Function to initialize/reinitialize the grammar display
  var init = function () { 
    if (m) {
      m.clear();
    }
    var m2 = jsav.ds.matrix(arr, {style: "table"});
    // hide all of the empty rows
    for (var i = lastRow + 1; i < arr.length; i++) {
      m2._arrays[i].hide();
    }
    layoutTable(m2, 2);
    m2.on('click', matrixClickHandler);
    return m2;
  };
  
  // handler for grammar editing
  var matrixClickHandler = function(index, index2) {	
    if ($('.jsavmatrix').hasClass('deleteMode') && index !== lastRow) {
      // recreates the matrix when deleting a row...
      arr.splice(index, 1);
      lastRow--;
      m = init();
      $('.jsavmatrix').addClass('deleteMode');
    } 
		else if ($('.jsavmatrix').hasClass('editMode')) {
			defocus();
			if (index2 != 1)
				focus(index, index2);
    }
  };

	var focus = function(index, index2) {
		row = index; col = index2;
		createInputBoxForCell(row, col);
		// finalize the changes to the grammar when the enter key is pressed
		var validKeys = [13, 9, 37, 38, 39, 40];
		// keys for functions
		fi.keyup(function(event){
			var keyCode = event.keyCode;
			if (validKeys.indexOf(keyCode) !== -1) {
				var input = $(this).val();
				input = emptyInputToEmptyString(input, index, index2);

				if (!validInput(input, index, index2)) return;

				fi.remove();
				m.value(index, index2, input);
				arr[index][index2] = input;
				layoutTable(m, 2);
				handleArrowKeysOnFocus(keyCode, index, index2);
			}
		});
	}

	var emptyInputToEmptyString = function(string, index, index2) {
		var input = string;
		var regex = new RegExp(emptystring, g);
		input = input.replace(regex, "");
		input = input.replace(regex, "!");
		if (input === "" && index2 === 2) {
			input = emptystring;
		}
		return input;
	}

	var validInput = function(input, index, index2) {
		var inputtingLeft = index2 == 0;
		var falseLength = input.length !== 1;
		var notVariable = variables.indexOf(input) == -1;
		if (inputtingLeft && (falseLength || notVariable)) {
			alert('Invalid left-hand side.');
			return false;
		}	

		var inputtingRight = index2 == 2;
		var alreadyExists = _.find(arr, function(x) { 
												var leftEqual = x[0] == arr[index][0];
												var rightEqual = x[2] == input;
												var notSameRow = arr.indexOf(x) !== index;
												return leftEqual && rightEqual && notSameRow;
											})
		if (inputtingRight && alreadyExists) {
			alert('This production already exists.');
			return false;
		}
		return true;
	}

	var createInputBoxForCell = function(index, index2) {
		var prev = m.value(index, index2);
		$('#firstinput').remove();
		var createInput = "<input type='text' id='firstinput' onfocus='this.value = this.value;' value="+prev+">";
		$('body').append(createInput);
		var offset = m._arrays[index]._indices[index2].element.offset();
		var topOffset = offset.top;
		var leftOffset = offset.left;
		fi = $('#firstinput');
		fi.offset({top: topOffset, left: leftOffset});
		fi.outerHeight($('.jsavvalue').height());
		fi.width($(m._arrays[index]._indices[index2].element).width());
		fi.focus();
	}

	var handleArrowKeysOnFocus = function(keyCode, index, index2) {
		switch (keyCode) {
			case 13:
				if (index2 == 0) {
					focus(index, 2);
				}
				else {
					// adding a new production
					var newProduction = addProduction(index);
					layoutTable(m);
					if (newProduction) {
						focus(index + 1, 0);
					}
				}
				break;
			case 37:
				if (index2 == 2) {
					focus(index, 0);
				}
				break;	
			case 38:
				if (index > 0) {
					focus(index - 1, index2);
				}
				break;	
			case 39:
				if (index2 == 0) {
					focus(index, 2);
				}
				break;	
			case 40:
				var newProduction = addProduction(index);
				layoutTable(m);
				if (newProduction) {
					focus(index + 1, 0);
				}
				else {
					focus(index + 1, index2);
				}
				break;	
			default:
				break;
		}
	}

	// fired when document is clicked
	// saves current fi input value
	function defocus(e) {
		if (e && $(e.target).hasClass("jsavvaluelabel")) return;
		if (e && $(e.target).attr('id') == "firstinput") return;
		if (!fi || !fi.is(':visible')) return;

		var input = fi.val();
		input = emptyInputToEmptyString(input, row, col);

		if (!validInput(input, row, col)) return;

		fi.remove();
		m.value(row, col, input);
		arr[row][col] = input;
		layoutTable(m, 2);
	}

  // Function to check to see if a new row should be added and lengthen the array
  var addProduction = function (index) {
    if (m.value(index, 0) && index == lastRow) {
      // if array out of bounds, double the array size and recreate the matrix
      if (lastRow == arr.length - 1 || lastRow == arr.length) {
        var l = arr.length;
        for (var i = 0; i < l; i++) {
          arr.push(['', arrow, '']);
        }
        m = init();
        $('.jsavmatrix').addClass('editMode');
      } 
			if (!arr[index][2]) {
				arr[index][2] = lambda;
				m.value(index, 2, lambda);
			}
      m._arrays[lastRow + 1].show();
      lastRow++;
			return true;
    }
		return false;
  };

  // LL(1) parsing
  var llParse = function () {
		llController = new LLParseController(arr, jsav, m, {startParse: startParse});
;
		llController.startParsing();
  };

	// brute force parsing
	function bfParse() {
		var bfController = new BFParseController(arr, jsav, m, {startParse: startParse});

		bfController.startParsing();
  }; 

  /*
  SLR(1) parsing
  allows users to choose which to use during conflicts.
  */
  var slrParse = function () {
		var slrController = new SLRParseController(arr, jsav, m, {startParse: startParse});
		slrController.startParsing();
  };

	var startParse = function() {
		// sets up window for proofs
		if (parseTree) {
			parseTree.clear();
			jsav.clear();
			jsav = new JSAV("av");
			m = init();
		}
		if (derivationTable) { derivationTable.clear();}
		if (ffTable) { ffTable.clear();}
		if (parseTableDisplay) { parseTableDisplay.clear();}
		if (modelDFA) { modelDFA.clear();}
		if (builtDFA) { builtDFA.clear();}
		if (tGrammar) { tGrammar.clear();}
		$("#firstinput").remove();
		$(".jsavmatrix").removeClass('editMode');
		$(".jsavmatrix").removeClass('deleteMode');
		$("#mode").html('');
		$('#editbutton').hide();
		$('#deletebutton').hide();
		$('#convertRLGbutton').hide();
		$('#convertCFGbutton').hide();
		$('#transformbutton').hide();
		$('.jsavcontrols').show();
		$('#bfpbutton').hide();
		$('#llbutton').hide();
		$('#slrbutton').hide();
		$('#files').hide();
		$(m.element).css("margin-left", "50px");
		m._arrays[lastRow].hide();
	}

  // Function to add closure to an item set
  var addClosure = function (items, productions) {
    // takes an array of strings
    var itemsStack = [];
    for (var i = items.length - 1; i >= 0; i--) {
      itemsStack.push(items[i]);
    }
    var next = itemsStack.pop();
    var counter = 0;
    while (next) {
      counter++;
      if(counter>500) {
        console.warn(counter);
        break;
      }
      var di = next.indexOf(dot);
      if (di !== next.length - 1 && variables.indexOf(next[di + 1]) !== -1) {
        for (var j = 0; j < productions.length; j++) {
          if (productions[j][0] === next[di + 1]) {
            var r = productions[j][2];
            if (r === emptystring) {
              r = "";
            }
            var newItem = productions[j][0] + productions[j][1] + dot + r;
            if (items.indexOf(newItem) === -1) {
              itemsStack.unshift(newItem);
              items.push(newItem);
            }
          }
        }
      }
      next = itemsStack.pop();
    }
    return items;
  };

  // gets productions with the dot shifted over
  var goTo = function (items, symbol) {
    // takes an array of strings
    var newItems = [];
    for (var i = 0; i < items.length; i++) {
      var r = items[i];
      for (var j = r.indexOf(arrow); j < r.length; j++) {
        if (r[j] === symbol && r[j - 1] === dot) {
          newItems = _.union(newItems, [r.substring(0, j - 1) + symbol + dot + r.substring(j + 1)]);
        }
      }
    }
    return newItems;
  };

  var replaceCharAt = function (str, index, ch) {
    if (index < 0 || index > str.length - 1) {
      return str;
    } else {
      return str.substring(0, index) + ch + str.substring(index + 1);
    }
  };

  var getLeaves = function(node) {
    var leaves = [];
    if (node.childnodes == false) {
      return leaves.concat(node);
    } else { 
      for (var i = 0; i < node.childnodes.length; i++) {
        leaves = leaves.concat(getLeaves(node.child(i)));
      }
      return leaves;
    }
  };

  // change editing modes
  var editMode = function() {
    $('.jsavmatrix').addClass("editMode");
    $('.jsavmatrix').removeClass("deleteMode");
    $("#mode").html('Editing');
  };
  var deleteMode = function() {
    $('#firstinput').remove();
    $('.jsavmatrix').addClass("deleteMode");
    $('.jsavmatrix').removeClass("editMode");
    $("#mode").html('Deleting');
  };

  //=================================
  // Transformations (automatic)

  // remove lambda productions
  var removeLambda = function () {
    var derivers = {};  // variables that derive lambda
    var productions = _.map(_.filter(arr, function(x) { return x[0];}), function(x) { return x.slice();});
    var counter = 0;
    // find lambda-deriving variables
    while (removeLambdaHelper(derivers, productions)) {
      counter++;
      if (counter > 500) {
        console.log(counter);
        break;
      }
    };
    if (productions[0][0] in derivers) {
      alert('The start variable derives '+emptystring+'.');
    }
    var transformed = [];
    // remove lambda productions
    productions = _.filter(productions, function(x) { return x[2] !== emptystring;});
    transformed = transformed.concat(productions);
    for (var i = 0; i < productions.length; i++) {
      var p = productions[i];
      // find lambda deriving variables in right hand side
      var v = _.filter(p[2], function(x) { return x in derivers;});
      if (v.length > 0) {
        v = v.join('');
        for (var j = v.length - 1; j >= 0; j--) {
          // remove all combinations of lambda-deriving variables
          var n = getCombinations(v, j + 1);
          for (var next = n.next(); next.value; next = n.next()) {
            var replaced = p[2];
            for (var k = 0; k < next.value.length; k++) {
              replaced = replaced.replace(next.value[k], "");
            }
            // if not a lambda production
            if (replaced && !_.find(transformed, function(x) {return x[0] === p[0] && x[2] === replaced})) {
              transformed.push([p[0], arrow, replaced]);
            }
          }
        }
      }
    }
    var ret = _.map(transformed, function(x) {return x.join('');});
    return ret;
  };

  // check if browser supports generators
  var isGeneratorSupported = function () {
    try {
      eval("(function*(){})()");
      return true;
    } catch(err){
      console.log(err);
      console.log("No generator support.");
      return false;
    }
  }
  // creates a generator for the combinations of variables to remove
  if (isGeneratorSupported()) {
    /*
    Generator function. 
    Getting combinations should be reimplemented since generators do no have universal browser support.
    */
    var getCombinations = function* (str, l) {
      for (var i = 0; i < str.length; i++) {
        if (l === 1) {
          yield [str[i]];
        } else {
          var n = getCombinations(str.substring(i + 1), l - 1);
          for (var next = n.next(); next.value; next = n.next()) {
            yield [str[i]].concat(next.value);
          }
        }
      }
    };
  }

  // remove unit productions
  var removeUnit = function () {
    var productions = _.map(_.filter(arr, function(x) { return x[0];}), function(x) { return x.slice();});
    var pDict = {};
    // a dictionary mapping left sides to right sides
    for (var i = 0; i < productions.length; i++) {
      if (!(productions[i][0] in pDict)) {
        pDict[productions[i][0]] = [];
      }
      pDict[productions[i][0]].push(productions[i][2]);
    }
    var counter = 0;
    while (removeUnitHelper(productions, pDict)) {
      counter++;
      if (counter > 500) {
        console.log(counter);
        break;
      }
    };
    // remove original unit productions
    productions = _.filter(productions, function(x) {
      return !(x[2].length === 1 && variables.indexOf(x[2]) !== -1);
    });
    var ret = _.map(productions, function(x) {return x.join('');});
    return ret;
  };

  // Function to find a unit production and add one of the replacement productions
  var removeUnitHelper = function (productions, pDict) {
    for (var i = 0; i < productions.length; i++) {
      if (productions[i][2].length === 1 && variables.indexOf(productions[i][2]) !== -1) {
        var p = pDict[productions[i][2]];
        var n;
        for (var j = 0; j < p.length; j++) {
          if (p[j].length === 1 && variables.indexOf(p[j]) !== -1) {
            continue;
          } else if (!_.find(productions, function(x){ return x[0] === productions[i][0] && x[2] === p[j];})) {
            n = p[j];
            break;
          }
        }
        if (n) {
          productions.push([productions[i][0], arrow, n]);
          pDict[productions[i][0]].push(n);
          return true;
        }
      }
    }
    return false;
  };

  // remove useless productions
  var removeUseless = function () {
    var derivers = {};  // variables that derive a string of terminals
    var productions = _.map(_.filter(arr, function(x) { return x[0];}), function(x) { return x.slice();});
    var counter = 0;
    while (findDerivable(derivers, productions)) {
      counter++;
      if (counter > 500) {
        console.log(counter);
        break;
      }
    };
    var transformed = [];
    // remove productions which do not derive a string of terminals
    for (var i = 0; i < productions.length; i++) {
      if (_.every(productions[i][2], function(x) { return x in derivers || variables.indexOf(x) === -1;})) {
        transformed.push(productions[i]);
      }
    }
    var pDict = {};   // dictionary to hold reachable variables
    var start = transformed[0][0];
    for (var i = 0; i < transformed.length; i++) {
      if (!(transformed[i][0] in pDict)) {
        pDict[transformed[i][0]] = [];
      }
      // map left hand side to the variables in the right hand side
      var r = _.uniq(_.filter(transformed[i][2], function(x) {return variables.indexOf(x) !== -1;}));
      pDict[transformed[i][0]] = _.union(pDict[transformed[i][0]], r);
    }
    var visited = {};
    visited[start] = true;
    // find reachable variables and map them in pDict
    findReachable(start, pDict, visited);
    // remove unreachable productions
    transformed = _.filter(transformed, function(x) { return x[0] === start || pDict[start].indexOf(x[0]) !== -1;});
    var ret = _.map(transformed, function(x) {return x.join('');});
    return ret;
  };
  // Function to get variables which can derive a string of terminals
  var findDerivable = function (set, productions) {
    for (var i = 0; i < productions.length; i++) {
      if (_.every(productions[i][2], function(x) { return x in set || variables.indexOf(x) === -1;})) {
        if (!(productions[i][0] in set)) {
          set[productions[i][0]] = true;
          return true;
        }
      }
    }
    return false;
  };
  // dfs on the dictionary
  var findReachable = function (start, pDict, visited) {
    for (var i = 0; i < pDict[start].length; i++) {
      if (!(pDict[start][i] in visited)) {
        visited[pDict[start][i]] = true;
        findReachable(pDict[start][i], pDict, visited);
        pDict[start] = _.union(pDict[start], pDict[pDict[start][i]]);
      }
    }
  };

  // convert to Chomsky Normal Form
  var convertToChomsky = function () {
    var v = {};
    // find all the variables in the grammar
    var productions = _.map(_.filter(arr, function(x) { return x[0];}), function(x) { return x.slice();});
    for (var i = 0; i < productions.length; i++) {
      var x = productions[i];
      // change RHS to an array
      x[2] = x[2].split("");
      v[x[0]] = true;
      for (var j = 0; j < x[2].length; j++) {
        if (variables.indexOf(x[2][j]) !== -1) {
          v[x[2][j]] = true;
        }
      }
    }
    // an array of all the temporary variables
    var tempVars = [];
    // counter for D(n) variables
    var varCounter = 1;
    // replace terminals with equivalent variables where necessary
    for (var i = 0; i < productions.length; i++) {
      if (productions[i][2].length === 1 && variables.indexOf(productions[i][2][0]) === -1) {
        continue;
      } else {
        var r = productions[i][2];
        for (var j = 0; j < r.length; j++) {
          if (r[j].length === 1 && variables.indexOf(r[j]) === -1) {
            var temp = "B(" + r[j] + ")";
            if (!_.find(productions, function(x) { return x[0] === temp;})) {
              productions.push([temp, arrow, [r[j]]]);
              tempVars.push(temp);
            }
            r[j] = temp;
          }
        }
      }
    }
    // Function to break productions down into pairs of variables
    var chomskyHelper = function () {
      for (var i = 0; i < productions.length; i++) {
        var r = productions[i][2];
        if (r.length === 1 && variables.indexOf(r[0]) === -1) {
          continue;
        } else if (r.length > 2) {
          var temp = "D(" + varCounter + ")";
          var temp2 = r.splice(1, r.length - 1, temp);
          var present = _.find(productions, function(x) { return x[0].length > 1 && x[2].join('') === temp2.join('');});
          if (present) {
            r[1] = present[0];
          } else {
            productions.push([temp, arrow, temp2]);
            tempVars.push(temp);
            varCounter++;
          }
          return true;
        }
      }
      return false;
    };
    var counter = 0;
    while (chomskyHelper()) {
      counter++;
      if (counter > 500) {
        console.log(counter);
        break;
      }
    }
    for (var i = 0; i < productions.length; i++) {
      var x = productions[i];
      x[2] = x[2].join(""); 
    }
    var ret =  _.map(productions, function(x) {return x.join('');});
    return ret;
  };

  //=================================
  // Transformations (interactive)

  // Function to check to see if a step should be skipped
  var checkTransform = function (strP, g) {
    var inter = _.intersection(strP, g);
    if (inter.length === strP.length && inter.length === g.length) {
      return true;
    }
    return false;
  };
  // Function to start grammar transformation
  var transformGrammar = function () {
    if (typeof getCombinations === "undefined") {
      console.error("No generator support.");
      return;
    }
    var productions = _.map(_.filter(arr, function(x) { return x[0];}), function(x) { return x.slice();});
    if (productions.length === 0) {
      alert('No grammar.');
      return;
    }
    // apply each transformation to the original grammar to find which step to start with
    var noLambda = removeLambda();
    var noUnit = removeUnit();
    var noUseless = removeUseless();
    var fullChomsky = convertToChomsky();
    var strP = _.map(productions, function(x) {return x.join('');});
    // store original grammar for reloading later
    backup = ""+strP;

    if (!checkTransform(strP, noLambda)) {
      interactableLambdaTransform(noLambda);
    } else if (!checkTransform(strP, noUnit)) {
      interactableUnitTransform(noUnit);
    } else if (!checkTransform(strP, noUseless)) {
      interactableUselessTransform(noUseless);
    } else if (!checkTransform(strP, fullChomsky)) {
      interactableChomsky(fullChomsky);
    } else {
      backup = null;
      jsav.umsg('Grammar already in Chomsky Normal Form.');
    }
  };

  var interactableLambdaTransform = function (noLambda) {
    var productions = _.map(_.filter(arr, function(x) { return x[0];}), function(x) { return x.slice();});
    m = init();
    startParse();
    $('.jsavcontrols').hide();
    $(m.element).css("margin-left", "auto");
    var derivers = {};  // variables that derive lambda
    var counter = 0;
    // find lambda-deriving variables
    while (removeLambdaHelper(derivers, productions)) {
      counter++;
      if (counter > 500) {
        console.log(counter);
        break;
      }
    };
    var transformed = noLambda;           // the finished transformation, as a reference
    var tArr = [].concat(productions);    // the transformed grammar, for the user to finish
    tArr.push(["", arrow, ""]);
    var builtLambdaSet = [];              // the set of lambda-deriving variables, for the user to create
    // handler for the table for finding the lambda-deriving variables
    var findLambdaHandler = function (index) {
      for (var i = 0; i < this._arrays.length; i++) {
        this.unhighlight(i);
      }
      this.highlight(index);
      var vv = this.value(index, 0);
      var found = builtLambdaSet.indexOf(vv);
      if ((vv in derivers) && found === -1) {
        builtLambdaSet.push(vv);
        jsav.umsg(vv + ' added! Set that derives '+emptystring+': [' + builtLambdaSet + ']');
        if (builtLambdaSet.length === Object.keys(derivers).length) {
          for (var i = 0; i < m._arrays.length; i++) {
            m.unhighlight(i);
          }
          m.element.off();
          continueLambda();
        }
      } else if (!(vv in derivers)) {
        jsav.umsg(vv + ' does not derive '+emptystring+'. Set that derives '+emptystring+': [' + builtLambdaSet + ']');
      } else if (found !== -1) {
        jsav.umsg(vv + ' already selected! Set that derives '+emptystring+': [' + builtLambdaSet + ']');
      }
    };
    // handler for the table for removing lambda-productions and adding equivalent productions
    var removeLambdaHandler = function (index, index2) {
      if (this.value(index, 0)) {
        if (this.value(index, 2) === emptystring) {
          tArr.splice(index, 1);
          // creating the new table before deleting the previous one keeps the window in the same position
          var tempG = jsav.ds.matrix(tArr);
          tGrammar.clear();
          tGrammar = tempG;
          layoutTable(tGrammar, 2);
          //tGrammar = jsav.ds.matrix(tArr, {left: "50px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
          tGrammar.click(removeLambdaHandler);
        } else {
          alert('This production should not be deleted.');
          return;
        }
      } else {
        var input1 = prompt('Left side?');
        if (!input1) {
          return;
        }
        var input2 = prompt('Right side?');
        if (!input2) {
          return;
        }
        var toAdd = input1 + arrow + input2;
        if (transformed.indexOf(toAdd) === -1) {
          alert('This production is not part of the reformed grammar.');
          return;
        } if (_.map(tArr, function(x) {return x.join('');}).indexOf(toAdd) !== -1) {
          alert('This production is already in the grammar.');
          return;
        }
        tArr[index] = [input1, arrow, input2];
        tArr.push(["", arrow, ""]);
        var tempG = jsav.ds.matrix(tArr);
        tGrammar.clear();
        tGrammar = tempG;
        layoutTable(tGrammar, 2);
        //tGrammar = jsav.ds.matrix(tArr, {left: "50px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
        tGrammar.click(removeLambdaHandler);
      }
      if (tArr.length - 1 === transformed.length && !_.find(tArr, function(x){return x[2]===emptystring})) {
        var confirmed = confirm('Grammar completed; export?');
        // if export, open the completed grammar in a new tab
        if (confirmed) {
          localStorage['grammar'] = transformed;
          window.open('grammarTest.html', '');
        }
        arr = tArr;
        lastRow = arr.length - 1;
        // check which step to proceed to
        if (!tArr[0][0]) {
          jsav.umsg("Null start variable; transformation finished.");
          return;
        }
        var strT = _.map(tArr, function(x) {return x.join('')});
        var noUnit = removeUnit();
        if (!checkTransform(strT, noUnit)) {
          interactableUnitTransform(noUnit);
          return;
        }
        var noUseless = removeUseless();
        if (!checkTransform(strT, noUseless)) {
          interactableUselessTransform(noUseless);
          return;
        }
        var fullChomsky = convertToChomsky();
        if (!checkTransform(strT, fullChomsky)) {
          interactableChomsky(fullChomsky);
          return;
        } else {
          jsav.umsg("Grammar transformation finished.");
        }
      }
    };
    // transition from finding lambda-deriving variables to modifying the grammar
    var continueLambda = function () {
      jsav.umsg("Modify the grammar to remove "+emptystring+". Set that derives "+emptystring+": [" + builtLambdaSet + ']');
      //$(m.element).css("margin-left", "50px");
      tGrammar = jsav.ds.matrix(tArr);
      layoutTable(tGrammar, 2);
      //tGrammar = jsav.ds.matrix(tArr, {left: "50px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
      tGrammar.click(removeLambdaHandler);
    };
    m.click(findLambdaHandler);
    jsav.umsg("Removing "+emptystring+"-productions: Select variables that derive "+emptystring+".");
  };

  var interactableUnitTransform = function (noUnit) {
    var productions = _.map(_.filter(arr, function(x) { return x[0];}), function(x) { return x.slice();});
    m = init();
    startParse();
    $('.jsavcontrols').hide();
    var v = [];
    for (var i = 0; i < productions.length; i++) {
      if (v.indexOf(productions[i][0]) === -1) {
        v.push(productions[i][0]);
      }
    }
    $(m.element).css("margin-left", "auto");
    modelDFA = jsav.ds.graph({layout: "layered", directed: true});    //VDG
    //modelDFA.css('display', 'inline-block')
    //m.element.css('display', 'inline-block')
    //$('#av').css('text-align', 'center')
    //modelDFA = jsav.ds.graph({left: "50px", relativeTo: m, anchor: "right top", myAnchor: "left top", layout: "layered", directed: true});
    for (var i = 0; i < v.length; i++) {
      modelDFA.addNode(v[i]);
    }
    modelDFA.layout();
    var unitProductions = _.filter(productions, function(x) { 
      return x[2].length === 1 && variables.indexOf(x[2]) !== -1;
    });
    selectedNode = null;
    // handler for the VDG for adding transitions
    var unitVdgHandler = function () {
      this.highlight();
      if (selectedNode) {
        var self = this;
        if (selectedNode.value() === this.value()) {
          selectedNode.unhighlight();
          self.unhighlight();
          selectedNode = null;
          return;
        }
        if (_.find(unitProductions, function(x) {return x[0] === selectedNode.value() && x[2] === self.value();})) {
          var newEdge = modelDFA.addEdge(selectedNode, self);
          if (newEdge) { modelDFA.layout();}
          jsav.umsg('Transition added.');
          if (modelDFA.edgeCount() === unitProductions.length) {
            modelDFA.element.off();
            selectedNode.unhighlight();
            self.unhighlight();
            selectedNode = null;
            continueUnit();
            return;
          }
        } else {
          jsav.umsg('Transition is not part of VDG.');
        }
        selectedNode.unhighlight();
        self.unhighlight();
        selectedNode = null;
      } else {
        selectedNode = this;
      }
    };
    var tArr = [].concat(productions);
    tArr.push(["", arrow, ""]);
    // handler for the table for removing unit productions and adding equivalent productions
    var removeUnitHandler = function (index, index2, e) {
      if (this.value(index, 0)) {
        // delete production
        if (this.value(index, 2).length === 1 && variables.indexOf(this.value(index, 2)) !== -1) {
          tArr.splice(index, 1);
          var tempG = jsav.ds.matrix(tArr);
          tGrammar.clear();
          tGrammar = tempG;
          layoutTable(tGrammar, 2);
          //tGrammar = jsav.ds.matrix(tArr, {top: "50px", relativeTo: modelDFA, anchor: "left bottom", myAnchor: "left top"});
          tGrammar.click(removeUnitHandler);
        } else {
          alert('This production should not be deleted.');
          return;
        }
      } else {
        var input1 = prompt('Left side?');
        if (!input1) {
          return;
        }
        var input2 = prompt('Right side?');
        if (!input2) {
          return;
        }
        var toAdd = input1 + arrow + input2;
        if (noUnit.indexOf(toAdd) === -1) {
          alert('This production is not part of the reformed grammar.');
          return;
        } if (_.map(tArr, function(x) {return x.join('');}).indexOf(toAdd) !== -1) {
          alert('This production is already in the grammar.');
          return;
        }
        tArr[index] = [input1, arrow, input2];
        tArr.push(["", arrow, ""]);
        var tempG = jsav.ds.matrix(tArr);
        tGrammar.clear();
        tGrammar = tempG;
        layoutTable(tGrammar, 2);
        //tGrammar = jsav.ds.matrix(tArr, {top: "50px", relativeTo: modelDFA, anchor: "left bottom", myAnchor: "left top"});
        tGrammar.click(removeUnitHandler);
      }
      if (tArr.length - 1 === noUnit.length && !_.find(tArr, function(x){return x[2].length === 1 && variables.indexOf(x[2]) !== -1})) {
        var confirmed = confirm('Grammar completed; export?');
        if (confirmed) {
          localStorage['grammar'] = noUnit;
          window.open('grammarTest.html', '');
        }
        arr = tArr;
        lastRow = arr.length - 1;
        if (!tArr[0][0]) {
          jsav.umsg("Null start variable; transformation finished.");
          return;
        }
        var strT = _.map(tArr, function(x) {return x.join('')});
        var noUseless = removeUseless();
        if (!checkTransform(strT, noUseless)) {
          interactableUselessTransform(noUseless);
          return;
        }
        var fullChomsky = convertToChomsky();
        if (!checkTransform(strT, fullChomsky)) {
          interactableChomsky(fullChomsky);
          return;
        } else {
          jsav.umsg("Grammar transformation finished.");
        }
      }
    };
    // transition from creating VDG to modifying the grammar
    var continueUnit = function () {
      jsav.umsg('Modify the grammar to remove unit productions. Click on unit productions to remove them and click on the empty row to add new productions.');
      tGrammar = jsav.ds.matrix(tArr);
      layoutTable(tGrammar, 2);
      //tGrammar = jsav.ds.matrix(tArr, {top: "50px", relativeTo: modelDFA, anchor: "left bottom", myAnchor: "left top"});
      tGrammar.click(removeUnitHandler);
      //$('.jsavcanvas').height(modelDFA.element.height() + 150 + tGrammar.element.height());
    };
    jsav.umsg('Removing unit productions: Complete unit production visualization by adding edges to indicate rules between variables.');
    modelDFA.click(unitVdgHandler);
  };

  var interactableUselessTransform = function (noUseless) {
    var productions = _.map(_.filter(arr, function(x) { return x[0];}), function(x) { return x.slice();});
    m = init();
    startParse();
    $('.jsavcontrols').hide();
    $(m.element).css("margin-left", "auto");

    var derivers = {};  // variables that derive a string of terminals
    var counter = 0;
    while (findDerivable(derivers, productions)) {
      counter++;
      if (counter > 500) {
        console.log(counter);
        break;
      }
    };
    var builtDeriveSet = [];      // set of terminal-deriving variables, for the user to create
    // handler for the table for finding terminal-deriving variables
    var findDeriveHandler = function (index) {
      for (var i = 0; i < this._arrays.length; i++) {
        this.unhighlight(i);
      }
      this.highlight(index);
      var vv = this.value(index, 0);
      var found = builtDeriveSet.indexOf(vv);
      if ((vv in derivers) && found === -1) {
        builtDeriveSet.push(vv);
        jsav.umsg(vv + ' added! Variables that predicate terminals: [' + builtDeriveSet + ']');
        if (builtDeriveSet.length === Object.keys(derivers).length) {
          for (var i = 0; i < m._arrays.length; i++) {
            m.unhighlight(i);
          }
          m.element.off();
          continueUseless();
        }
      } else if (!(vv in derivers)) {
        jsav.umsg(vv + ' does not predicate terminals. Variables that predicate terminals: [' + builtDeriveSet + ']');
      } else if (found !== -1) {
        jsav.umsg(vv + ' already selected! Variables that predicate terminals: [' + builtDeriveSet + ']');
      }
    };
    // handler for the table for removing unreachable productions
    var removeUselessHandler = function (index, index2, e) {
      if (this.value(index, 0)) {
        if (noUseless.indexOf(this.value(index,0) + arrow + this.value(index,2)) === -1) {
          tArr.splice(index, 1);
          var tempG = jsav.ds.matrix(tArr);
          tGrammar.clear();
          tGrammar = tempG;
          layoutTable(tGrammar, 2);
          //tGrammar = jsav.ds.matrix(tArr, {top: "50px", relativeTo: modelDFA, anchor: "left bottom", myAnchor: "left top"});
          tGrammar.click(removeUselessHandler);
        } else {
          alert('This production should not be deleted.');
          return;
        }
      } 
      if (tArr.length - 1 === noUseless.length && !_.find(tArr, function(x){return x[2].length === 1 && variables.indexOf(x[2]) !== -1})) {
        var confirmed = confirm('Grammar completed; export?');
        if (confirmed) {
          localStorage['grammar'] = noUseless;
          window.open('grammarTest.html', '');
        }
        arr = tArr;
        lastRow = arr.length - 1;
        if (!tArr[0][0]) {
          jsav.umsg("Null start variable; transformation finished.");
          return;
        }
        var strT = _.map(tArr, function(x) {return x.join('')});
        var fullChomsky = convertToChomsky();
        if (!checkTransform(strT, fullChomsky)) {
          interactableChomsky(fullChomsky);
          return;
        } else {
          jsav.umsg("Grammar transformation finished.");
        }
      }
    };

    var tArr = [].concat(productions);
    tArr = _.filter(tArr, function(x) { 
      return x[0] in derivers && _.every(x[2], function(y) {return variables.indexOf(y) === -1 || y in derivers});
    });
    tArr.push(["", arrow, ""]);
    // find transitions of the VDG
    var tProductions = {}; 
    for (var i = 0; i < productions.length; i++) {
      var vv = productions[i][0];
      var r = productions[i][2];
      if (vv in derivers) {
        if (!(vv in tProductions)) {
          tProductions[vv] = [];
        }
        for (var j = 0; j < r.length; j++) {
          if (variables.indexOf(r[j]) !== -1 && tProductions[vv].indexOf(r[j]) === -1) {
            if (r[j] !== vv && r[j] in derivers){
              tProductions[vv].push(r[j]);
            }
          }
        }
      }
    }
    var tCount = 0;
    for (var i in tProductions) {
      tCount = tCount + tProductions[i].length;
    } 
    selectedNode = null;
    // handler for the VDG for adding transitions
    var uselessVdgHandler = function () {
      this.highlight();
      if (selectedNode) {
        var self = this;
        if (selectedNode.value() === this.value()) {
          selectedNode.unhighlight();
          self.unhighlight();
          selectedNode = null;
          return;
        }
        if (_.find(productions, function(x) {return x[0] === selectedNode.value() && x[2].indexOf(self.value()) !== -1;})) {
          var newEdge = modelDFA.addEdge(selectedNode, self);
          if (newEdge) { modelDFA.layout();}
          jsav.umsg('Transition added.');
          if (modelDFA.edgeCount() === tCount) {
            modelDFA.element.off();
            selectedNode.unhighlight();
            self.unhighlight();
            selectedNode = null;
            continueUselessSecond();
            return;
          }
        } else {
          jsav.umsg('Transition is not part of VDG.');
        }
        selectedNode.unhighlight();
        self.unhighlight();
        selectedNode = null;
      } else {
        selectedNode = this;
      }
    };
    // transition from finding terminal-deriving variables to creating the VDG
    var continueUseless = function () {
      //$(m.element).css("margin-left", "50px");
      modelDFA = jsav.ds.graph({layout: "layered", directed: true});
      //modelDFA = jsav.ds.graph({left: "50px", relativeTo: m, anchor: "right top", myAnchor: "left top", layout: "layered", directed: true});
      var da = Object.keys(derivers);
      for (var i = 0; i < da.length; i++) {
        modelDFA.addNode(da[i]);
      }
      modelDFA.layout();
      modelDFA.click(uselessVdgHandler);
      jsav.umsg('Complete dependency graph by adding edges between variables. Variables that predicate terminals: [' + builtDeriveSet + ']')
    };
    // transition from VDG to removing useless productions
    var continueUselessSecond = function () {
      jsav.umsg('Modify the grammar to remove useless productions. Click on unreachable productions to remove them.');
      tGrammar = jsav.ds.matrix(tArr);
      layoutTable(tGrammar, 2);
      //tGrammar = jsav.ds.matrix(tArr, {top: "50px", relativeTo: modelDFA, anchor: "left bottom", myAnchor: "left top"});
      tGrammar.click(removeUselessHandler);
    };
    jsav.umsg('Removing useless productions: Select variables that derive terminals.');
    m.click(findDeriveHandler);
  };

  var interactableChomsky = function (fullChomsky) {
    var productions = _.map(_.filter(arr, function(x) { return x[0];}), function(x) { return x.slice();});
    m = init();
    startParse();
    $('.jsavcontrols').hide();

    $(m.element).css("margin-left", "auto");
    //$(m.element).css("margin-left", "15%");
    $(m.element).css('position', 'absolute');

    // array holding the productions
    var tArr = [].concat(productions);
    // Right sides are arrays (unlike the matrix, where RHS is a string)
    _.each(tArr, function(x) { x[2] = x[2].split('');});
    var varCounter = 1;

    // handler for the table for converting productions
    var chomskyHandler = function (index) {
      for (var i = 0; i < this._arrays.length; i++) {
        this.unhighlight(i);
      }
      this.highlight(index);
      var r = tArr[index][2];
      if (r.length === 1 && variables.indexOf(r[0]) === -1) {
        jsav.umsg('Conversion unneeded.');
        return;
      }
      if (r.length === 2 && variables.indexOf(r[0][0]) !== -1 && variables.indexOf(r[1][0]) !== -1) {
        jsav.umsg('Conversion unneeded.');
        return;
      }
      var sliceIn = [];
      // replace terminals
      for (var i = 0; i < r.length; i++) {
        if (r[i].length === 1 && variables.indexOf(r[i]) === -1) {
          var tempB = "B(" + r[i] + ")";
          if (!_.find(tArr.concat(sliceIn), function(x) {return x[0] === tempB;})) {
            sliceIn.push([tempB, arrow, [r[i]]]);
          }
          r[i] = tempB;
        }
      }
      if (sliceIn.length > 0) {
        tArr = tArr.slice(0, index + 1).concat(sliceIn).concat(tArr.slice(index+1));
        var tempG = jsav.ds.matrix(_.map(tArr,function(x){return [x[0], x[1], x[2].join('')];}));
        tGrammar.clear();
        tGrammar = tempG;
        layoutTable(tGrammar, 2);
        //tGrammar = jsav.ds.matrix(_.map(tArr,function(x){return [x[0], x[1], x[2].join('')];}), {left: "50px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
        tGrammar.click(chomskyHandler);
        for (var i = 0; i < sliceIn.length + 1; i++) {
          tGrammar.highlight(index + i);
        }
      } else {
        // replace variables
        var tempD = "D(" + varCounter + ")";
        var temp2 = r.splice(1, r.length - 1, tempD);
        var present = _.find(tArr, function(x) { return x[0].length > 1 && x[2].join('') === temp2.join('');});
        if (present) {
          r[1] = present[0];
        } else {
          tArr.splice(index + 1, 0, [tempD, arrow, temp2]);
          varCounter++;
          var tempG = jsav.ds.matrix(_.map(tArr,function(x){return [x[0], x[1], x[2].join('')];}));
          tGrammar.clear();
          tGrammar = tempG;
          layoutTable(tGrammar, 2);
          //tGrammar = jsav.ds.matrix(_.map(tArr,function(x){return [x[0], x[1], x[2].join('')];}), {left: "50px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
          tGrammar.click(chomskyHandler);
          tGrammar.highlight(index);
          tGrammar.highlight(index + 1);
        }
      }
      jsav.umsg('Converted.');
      if (tArr.length === fullChomsky.length) {
        jsav.umsg('All productions completed.');
        tGrammar.element.off();
        var c = confirm('All productions completed.\nExport? Exporting will rename the variables.');
        if (c) {
          attemptExport();
        }
        for (var i = 0; i < tGrammar._arrays.length; i++) {
          tGrammar.unhighlight(i);
        }
      }
    };
    // attempts to convert and export the completed CNF grammar
    var attemptExport = function () {
      var tempVars = [];
      for (var i = 0; i < tArr.length; i++) {
        if (tArr[i][0].length > 1 && tArr[i][0][0] === 'B') {
          tempVars.push(tArr[i][0]);
        }
      }
      var newVariables = _.difference(variables.split(""), _.map(tArr, function(x) {return x[0];}));
      if (tempVars.length + varCounter > newVariables.length) {
        alert('Too large to export!');
        return;
      }
      tempVars.sort();
      var iOffset = tempVars.length;
      for (var i = 1; i < varCounter + 1; i++) {
        tempVars.push("D(" + i + ")");
      }
      _.each(tArr, function(x) {x[2] = x[2].join('');});
      for (var i = 0; i < tempVars.length; i++) {
        var re = tempVars[i].replace(/[\(\)]/g, "\\$&");
        var regex = new RegExp(re, 'g');
        for (var j = 0; j < tArr.length; j++) {
          tArr[j][0] = tArr[j][0].replace(regex, newVariables[i]);
          tArr[j][2] = tArr[j][2].replace(regex, newVariables[i]);
        }
      }
      localStorage['grammar'] = _.map(tArr, function(x) {return x.join('');});
      window.open('grammarTest.html', '');
    };

    tGrammar = jsav.ds.matrix(_.map(tArr,function(x){return [x[0], x[1], x[2].join('')];}));
    layoutTable(tGrammar, 2);
    //tGrammar = jsav.ds.matrix(_.map(tArr,function(x){return [x[0], x[1], x[2].join('')];}), {left: "50px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
    tGrammar.click(chomskyHandler);

    jsav.umsg('Converting to Chomsky Normal Form: convert productions of the grammar on the right by clicking on them.');
  };

  //=================================
  // Conversions

  // Function to check if the grammar is right-linear
  var checkRightLinear = function () {
    var productions = _.filter(arr, function(x) { return x[0]});
    for (var i = 0; i < productions.length; i++) {
      var r = productions[i][2];
      for (var j = 0; j < r.length; j++) {
        if (variables.indexOf(r[j]) !== -1 && j !== r.length - 1) {
          return false;
        }
      }
    }
    return true;
  };

  // download finished FA/PDA
  var serializeGraphToXML = function (graph) {
    var text = '<?xml version="1.0" encoding="UTF-8"?>';
      text = text + "<structure>";
      text = text + "<type>fa</type>"
      text = text + "<automaton>"
      var nodes = graph.nodes();
      for (var next = nodes.next(); next; next = nodes.next()) {
        var left = next.position().left;
        var top = next.position().top;
        var i = next.hasClass("start");
        var f = next.hasClass("final");
        var label = next.stateLabel();
        text = text + '<state id="' + next.value().substring(1) + '" name="' + next.value() + '">';
        text = text + '<x>' + left + '</x>';
        text = text + '<y>' + top + '</y>';
        if (label) {
          text = text + '<label>' + label + '</label>';
        }
        if (i) {
          text = text + '<initial/>';
        }
        if (f) {
          text = text + '<final/>';
        }
        text = text + '</state>';
      }
      var edges = graph.edges();
      for (var next = edges.next(); next; next = edges.next()) {
        var fromNode = next.start().value().substring(1);
        var toNode = next.end().value().substring(1);
        var w = next.weight().split('<br>');
        for (var i = 0; i < w.length; i++) {
          text = text + '<transition>';
          text = text + '<from>' + fromNode + '</from>';
          text = text + '<to>' + toNode + '</to>';
          if (w[i] === emptystring) {
            text = text + '<read/>';
          } else {
            text = text + '<read>' + w[i] + '</read>';
          }
          text = text + '</transition>';
        }
      }
      text = text + "</automaton></structure>"
      return text;
  };
  var exportConvertedFA = function () {
    var downloadData = "text/xml;charset=utf-8," + encodeURIComponent(serializeGraphToXML(builtDFA));
    $('#download').html('<a href="data:' + downloadData + '" target="_blank" download="fa.xml">Download FA</a>');
    $('#download a')[0].click();
    $('#download').html('');
  };
  var serializePDAToXML = function (graph) {
    var text = '<?xml version="1.0" encoding="UTF-8"?>';
      text = text + "<structure>";
      text = text + "<type>pda</type>"
      text = text + "<automaton>"
      var nodes = graph.nodes();
      for (var next = nodes.next(); next; next = nodes.next()) {
        var left = next.position().left;
        var top = next.position().top;
        var i = next.hasClass("start");
        var f = next.hasClass("final");
        var label = next.stateLabel();
        text = text + '<state id="' + next.value().substring(1) + '" name="' + next.value() + '">';
        text = text + '<x>' + left + '</x>';
        text = text + '<y>' + top + '</y>';
        if (label) {
          text = text + '<label>' + label + '</label>';
        }
        if (i) {
          text = text + '<initial/>';
        }
        if (f) {
          text = text + '<final/>';
        }
        text = text + '</state>';
      }
      var edges = graph.edges();
      for (var next = edges.next(); next; next = edges.next()) {
        var fromNode = next.start().value().substring(1);
        var toNode = next.end().value().substring(1);
        var w = next.weight().split('<br>');
        for (var i = 0; i < w.length; i++) {
          text = text + '<transition>';
          text = text + '<from>' + fromNode + '</from>';
          text = text + '<to>' + toNode + '</to>';
          var wSplit = w[i].split(":");
          if (wSplit[0] === emptystring) {
            text = text + '<read/>';
          } else {
            text = text + '<read>' + wSplit[0] + '</read>';
          }
          if (wSplit[1] === emptystring) {
            text = text + '<pop/>';
          } else {
            text = text + '<pop>' + wSplit[1] + '</pop>';
          }
          if (wSplit[2] === emptystring) {
            text = text + '<push/>';
          } else {
            text = text + '<push>' + wSplit[2] + '</push>';
          }
          text = text + '</transition>';
        }
      }
      text = text + "</automaton></structure>"
      return text;
  };
  var exportConvertedPDA = function () {
    var downloadData = "text/xml;charset=utf-8," + encodeURIComponent(serializePDAToXML(builtDFA));
      $('#download').html('<a href="data:' + downloadData + '" target="_blank" download="pda.xml">Download PDA</a>');
      $('#download a')[0].click();
  };

  // interactive converting right-linear grammar to FA
  var convertToFA = function () {
    if (!checkRightLinear()) {
      alert('The grammar is not right-linear!');
      return;
    }
    var productions = _.filter(arr, function(x) { return x[0];});
    startParse();
    $('.jsavcontrols').hide();
    $(m.element).css("margin-left", "auto");
    jsav.umsg('Complete the FA.');
    // keep a map of variables to FA states
    var nodeMap = {};
    builtDFA = jsav.ds.fa({width: '90%', height: 440, layout: "automatic"});
		builtDFA.enableDragging();
    var newStates = [];     // variables
    for (var i = 0; i < productions.length; i++) {
      newStates.push(productions[i][0]);
      newStates = newStates.concat(_.filter(productions[i][2], function(x) {return variables.indexOf(x) !== -1;}));
    }
    newStates = _.uniq(newStates);
    // create FA states
    for (var i = 0; i < newStates.length; i++) {
      var n = builtDFA.addNode();
      nodeMap[newStates[i]] = n;
      if (i === 0) {
        builtDFA.makeInitial(n);
      }
      n.stateLabel(newStates[i]);
    }
    // add final state
    var f = builtDFA.addNode();
    // nodeMap[emptystring] = f;
    f.addClass("final");
    builtDFA.layout();
    selectedNode = null;
    
    // check if FA is finished; if it is, ask if the user wants to export the FA
    var checkDone = function () {
      var edges = builtDFA.edges();
      var tCount = 0;
      for (var next = edges.next(); next; next = edges.next()) {
        var w = next.weight().split('<br>');
        tCount = tCount + w.length;
      }
      if (tCount === productions.length) {
        var confirmed = confirm('Finished! Export?');
        if (confirmed) {
          exportConvertedFA();
        }
      }
    };
    // handler for the nodes of the FA
    var convertDfaHandler = function (e) {
      // adding transitions
			this.highlight();
			if (selectedNode) {
				var t = prompt('Terminal to transition on?');
				if (t === null) {
					selectedNode.unhighlight();
					selectedNode = null;
					this.unhighlight();
					return;
				}
				var lv = selectedNode.stateLabel();
				var rv = this.stateLabel();
				// check if valid transition
				for (var i = 0; i < productions.length; i++) {
					var r = productions[i][2];
					var add = false;
					if (rv && productions[i][0] === lv && r[r.length - 1] === rv && r.substring(0, r.length - 1) === t) {
						add = true;
					}
					if (productions[i][0] === lv && this.hasClass('final') && (r === t || (r === emptystring && t === ""))) {
						add = true;
					}
					if (add) {
						m.highlight(i);
						var newEdge = builtDFA.addEdge(selectedNode, this, {weight: t});
						selectedNode.unhighlight();
						selectedNode = null;
						this.unhighlight();
						if (newEdge) { 
							newEdge.layout();
							checkDone();
						}
						return;
					}
				}
				alert('That transition is not correct.');
				selectedNode.unhighlight();
				selectedNode = null;
				this.unhighlight();
			} else {
				selectedNode = this;
			}
			e.stopPropagation();
    };
    
    // handler for the grammar table: clicking a production will create the appropriate transition
    var convertGrammarHandler = function (index) {
      this.highlight(index);
      var l = this.value(index, 0);
      var r = this.value(index, 2);
      var nodes = builtDFA.nodes();
      if (variables.indexOf(r[r.length - 1]) === -1) {
        var newEdge = builtDFA.addEdge(nodeMap[l], f, {weight: r});
      } else {
        var newEdge = builtDFA.addEdge(nodeMap[l], nodeMap[r[r.length - 1]], {weight: r.substring(0, r.length - 1)});
      }
      if (newEdge) {
        newEdge.layout();
        checkDone();
      }
    };

    builtDFA.click(convertDfaHandler);
    m.click(convertGrammarHandler);
    $('#av').append($('#convertmovebutton'));
  };

  // interactive converting context-free grammar to NPDA
  var convertToPDA = function () {
    var productions = _.filter(arr, function(x) { return x[0];});
    startParse();
    $('.jsavcontrols').hide();
    $(m.element).css("margin-left", "auto");
    jsav.umsg('Complete the NPDA.');
    builtDFA = jsav.ds.fa({width: '90%', height: 440});
    var gWidth = builtDFA.element.width(),
        gHeight = builtDFA.element.height();
    var a = builtDFA.addNode({left: 0.17 * gWidth, top: 0.87 * gHeight}),    
        b = builtDFA.addNode({left: 0.47 * gWidth, top: 0.87 * gHeight}),
        c = builtDFA.addNode({left: 0.77 * gWidth, top: 0.87 * gHeight});
    builtDFA.makeInitial(a);
    c.addClass('final');
    var startVar = productions[0][0];
    builtDFA.addEdge(a, b, {weight: emptystring + ':Z:' + startVar + 'Z'});
    builtDFA.addEdge(b, c, {weight: emptystring + ':Z:' + emptystring});
    // add a transition for each terminal
    for (var i = 0; i < productions.length; i++) {
      var t = productions[i][2].split("");
      for (var j = 0; j < t.length; j++) {
        if (variables.indexOf(t[j]) === -1 && t[j] !== emptystring) {
          builtDFA.addEdge(b, b, {weight: t[j] + ':' + t[j] + ':' + emptystring});
        }
      }
    }
    var bEdge = builtDFA.getEdge(b, b);
    $(bEdge._label.element[0]).css('font-size', '1.4em');
    builtDFA.layout();

    var pCount = 0;
    var labelHeight = $(bEdge._label.element[0]).height();
    // handler for the grammar table
    var convertGrammarHandler = function (index) {
      this.highlight(index);
      var l = this.value(index, 0);
      var r = this.value(index, 2);
      var newEdge = builtDFA.addEdge(b, b, {weight: emptystring + ':' + this.value(index, 0) + ':' + this.value(index, 2)});
      if (newEdge) {
        newEdge.layout();
        pCount++;
        // scale graph window
        if ($(newEdge._label.element[0]).offset().top < $('.jsavgraph').offset().top) {
          var h = $(".jsavgraph").height();
          var newLabelHeight = $(newEdge._label.element[0]).height();
          var graphOffset = (newLabelHeight - labelHeight) / pCount;
          $(".jsavgraph").height(h + graphOffset);
          var nodeY = $(b.element).offset().top;
          $(a.element).offset({top: nodeY + graphOffset});
          $(b.element).offset({top: nodeY + graphOffset});
          $(c.element).offset({top: nodeY + graphOffset});
          builtDFA.layout();
        }
        if (pCount === productions.length) {
          var confirmed = confirm('Finished! Export?');
          if (confirmed) {
            exportConvertedPDA();
          }
        }
      }
    };
    m.click(convertGrammarHandler);
  };

  //=================================
  // Files

  // Saving:
  // Function to encode grammar to XML
  function serializeGrammar () {
		var productions = _.filter(arr, function(x) { return x[0]});
    if (productions.length == 0) {
			if (multiple) {
				return "<grammar></grammar>";
			}
			else {
				return "<?xml version='1.0' encoding='UTF-8'?><structure><type>grammar</type></structure>";
			}
    }
    var text = "";
		if (!multiple) {
			text = text + '<?xml version="1.0" encoding="UTF-8"?>';
    	text = text + "<structure>";
    	text = text + "<type>grammar</type>"
		}
		else {
			text = text + "<grammar>";
		} 
    for (var i = 0; i < productions.length; i++) {
      text = text + "<production>";
      text = text + "<left>" + productions[i][0] + "</left>";
      text = text + "<right>" + productions[i][2] + "</right>";
      text = text + "</production>";
    }
		if (multiple) {
			text = text + "</grammar>";
		}
		else {
    	text = text + "</structure>"
		}
    return text;
  };

  // Function to save and download the grammar
  var saveFile = function () {
		var downloadData = "text/xml; charset=utf-8,";
		if (!multiple) {
    	downloadData += encodeURIComponent(serializeGrammar());
		}
		else {
			grammars[currentExercise] = serializeGrammar();
			var data = '<?xml version="1.0" encoding="UTF-8"?><structure><type>grammar</type>';
			_.each(grammars, function(grammar) {
				data += grammar;
			});
			data += "</structure>";
			downloadData += encodeURIComponent(data);
		}
    $('#download').html('<a href="data:' + downloadData + '" target="_blank" download="grammar.xml">Download Grammar</a>');
    $('#download a')[0].click();
  };

  // Loading:
  // Function to read the loaded XML file and create the grammar
	// @param condition: whether text is of the form "<grammar>...</grammar>"
	//									used for parsing a grammar in multiple mode
	//									"exer": LL, BF, SLR parsing exercises
	//									"multiple": multiple grammar editing
  var parseFile = function (text, condition) {
    var parser,
        xmlDoc,
				xmlElem;
		if (!condition) {
			if (window.DOMParser) {
				parser=new DOMParser();
				xmlDoc=parser.parseFromString(text,"text/xml");
			} else {
				xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
				xmlDoc.async=false;
				xmlDoc.loadXML(text);
			}
			if (xmlDoc.getElementsByTagName("type")[0].childNodes[0].nodeValue !== 'grammar') {
				alert('File does not contain a grammar.');
				return;
			} else {
				xmlElem = xmlDoc.getElementsByTagName("production");
			}
		}
		else if (condition == "exer") {
			xmlElem = text.getElementsByTagName("production");
		} 
		else if (condition == "multiple") {
			if (window.DOMParser) {
				parser=new DOMParser();
				xmlDoc=parser.parseFromString(text,"text/xml");
			} else {
				xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
				xmlDoc.async=false;
				xmlDoc.loadXML(text);
			}
			xmlElem = xmlDoc.getElementsByTagName("production");
		}
		else {
			alert("unknown error");
		}
			arr = [];
      for (var i = 0; i < xmlElem.length; i++) {
        var l = xmlElem[i].getElementsByTagName("left")[0].childNodes[0].nodeValue;
        var r = xmlElem[i].getElementsByTagName("right")[0].childNodes[0].nodeValue;
        var row = [l, arrow, r];
        arr.push(row);
      }
      lastRow = arr.length;
      // add an empty row for editing purposes (clicking the empty row allows the user to add productions)
      arr.push(["", arrow, ""]);
      m = init();
      $('.jsavmatrix').addClass("editMode");
    // clear input
    var loaded = $('#loadfile');
    loaded.wrap('<form>').closest('form').get(0).reset();
    loaded.unwrap();
    return;
  };

  // Function for reading the XML file
  var waitForReading = function (reader) {
    reader.onloadend = function(event) {
        var text = event.target.result;
        parseFile(text);
    }
  };
  // Function to load in an XML file
  var loadFile = function () {
    var loaded = document.getElementById('loadfile');
    var file = loaded.files[0],
        reader = new FileReader();
    waitForReading(reader);
    reader.readAsText(file);
  };

  // Function to check if the SLR parse table is correct and transition
  function checkslrParseTable(parseTableDisplay, parseTable) {
    $('#firstinput').remove();
    var incorrect = false;
    for (var i = 1; i < parseTableDisplay._arrays.length; i++) {
      var ptr = parseTableDisplay._arrays[i];
      ptr.unhighlight();
      for (var j = 1; j < ptr._indices.length; j++) {
				// check conflict table first to avoid mistaken the students
				var wrongEntry = false;
				if (conflictTable[i - 1] && conflictTable[i - 1][j - 1]) {
        	if (conflictTable[i-1][j-1].indexOf(parseTableDisplay.value(i, j)) == -1) {
          	parseTableDisplay.highlight(i, j);
          	incorrect = true;
						wrongEntry = true;
					}
        }
				else if (parseTable[i-1][j-1] !== parseTableDisplay.value(i, j)) {
					parseTableDisplay.highlight(i, j);
					incorrect = true;
					wrongEntry = true;
				}
				if (!wrongEntry) {
					parseTable[i-1][j-1] = parseTableDisplay.value(i, j);
				}
      }
    }
    // provide option to automatically complete the parse table
    if (incorrect) {
			var container = document.getElementById("container");
			container.scrollTop = container.scrollHeight;
			window.scrollTo(0,document.body.scrollHeight);
      var confirmed = confirm('Highlighted cells are incorrect.\nFix automatically?');
      if (confirmed) {
        for (var i = 1; i < parseTableDisplay._arrays.length; i++) {
          for (var j = 1; j < ptr._indices.length; j++) {
						var wrong = parseTableDisplay.isHighlight(i, j);
						parseTableDisplay.unhighlight(i, j);
						// when current entry is wrong && there is a conflict
						if (wrong && conflictTable[i-1] && conflictTable[i-1][j-1] && conflictTable[i-1][j-1].length > 1) {
							// there is a conflict, either reduce-reduce or reduce-shift
							parseTableDisplay.highlight(i, j);
						}
            parseTableDisplay.value(i, j, parseTable[i-1][j-1]);
          }
        }
        layoutTable(parseTableDisplay);
      } else {
        return;
      }
    }
    $('#parsereadybutton').hide();
    $('#parsebutton').show();
		$temp = $('<div>').attr({"align":"center"});
		$temp.append($('#parsebutton'));
		$temp.insertBefore($('.jsavcanvas .jsavmatrix:last-child'));
    jsav.umsg("");
    $('.jsavarray').off();
  };

	// check for the correctness of parse table of LL
	var checkllParseTable = function (parseTableDisplay, parseTable) {
    $('#firstinput').remove();
    var incorrect = false;
    for (var i = 1; i < parseTableDisplay._arrays.length; i++) {
      var ptr = parseTableDisplay._arrays[i];
      ptr.unhighlight();
      for (var j = 1; j < ptr._indices.length; j++) {
        if (parseTable[i-1][j-1] !== parseTableDisplay.value(i, j)) {
          parseTableDisplay.highlight(i, j);
          incorrect = true;
        }
      }
    }
    // provide option to automatically complete the parse table
    if (incorrect) {
			var container = document.getElementById("container");
			container.scrollTop = container.scrollHeight;
      var confirmed = confirm('Highlighted cells are incorrect.\nFix automatically?');
      if (confirmed) {
        for (var i = 1; i < parseTableDisplay._arrays.length; i++) {
          var ptr = parseTableDisplay._arrays[i];
          ptr.unhighlight();
          for (var j = 1; j < ptr._indices.length; j++) {
            parseTableDisplay.value(i, j, parseTable[i-1][j-1]);
          }
        }
        layoutTable(parseTableDisplay);
      } else {
        return;
      }
    }
    $('#parsereadybutton').hide();
    $('#parsebutton').show();
    jsav.umsg("");
    $('.jsavarray').off();
  };

	// click handler for conflict resolving menu choice button
	function choiceClickHandler() {
		var $menu = $(this).parent();
		var i = $menu.attr('i');
		var j = $menu.attr('j');
		parseTable[i-1][j-1] = $(this).attr('value');
		parseTableDisplay.value(i, j, parseTable[i-1][j-1]);	// NOT WORKING
		$('.jsavmatrixtable:eq(2)').children().eq(i).children().eq(j).children().first().children().first().text(parseTable[i-1][j-1]);
		// I had no choice
		$menu.hide();
	}

	// parse table click handler for LL
	function llparseTableHandler(index, index2, e) { 
    // ignore if first row or column   
    if (index === 0 || index2 === 0) { return; }
    var self = this;
    var prev = this.value(index, index2);
    // create input box
    $('#firstinput').remove();
    var createInput = "<input type='text' id='firstinput' value="+prev+">";
    $('body').append(createInput);
    var offset = this._arrays[index]._indices[index2].element.offset();
    var topOffset = offset.top;
    var leftOffset = offset.left;
    var fi = $('#firstinput');
    fi.offset({top: topOffset, left: leftOffset});
    fi.outerHeight($('.jsavvalue').height());
    fi.width($(this._arrays[index]._indices[index2].element).width());
    fi.focus();
    // finalize changes when enter key is pressed
    fi.keyup(function(event){
      if(event.keyCode == 13){
        var firstInput = $(this).val();
        firstInput = firstInput.replace(/!/g, emptystring);
        self.value(index, index2, firstInput);
        layoutTable(self, index2);
        fi.remove();
      }
    });
  };

  // click handler for the SLR parse table
  function slrparseTableHandler (index, index2, e) { 
    // ignore if first row or column   
		$('#firstinput').remove();
    if (index === 0 || index2 === 0) { return; }
		if (conflictTable[index-1] && conflictTable[index-1][index2-1] && conflictTable[index-1][index2-1].length > 1) {
			$('.conflictMenu').remove();
			var offsetX = e.pageX;
			var offsetY = e.pageY;
			var $chooseConflict = $("<div>", {class: "conflictMenu"});
			_.each(conflictTable[index-1][index2-1], function(choice) {$chooseConflict.append("<input type='button' value='" + choice + "' class='choice'/><br>");});
			// in order to pass indices of matrix
			$chooseConflict.attr({"i": index, "j": index2});
			$chooseConflict.css({"position": "absolute", top: offsetY, left: offsetX});
			$chooseConflict.show();
			$('#container').append($chooseConflict);
			$('.choice').off('click').click(choiceClickHandler);
			return;
		}
    var self = this;
    var prev = this.value(index, index2);
		if (!prev) return;
    // create input box
    var createInput = "<input type='text' id='firstinput' value="+prev+" onfocus='this.value = this.value;'>";
    $('body').append(createInput);
    var offset = this._arrays[index]._indices[index2].element.offset();
    var topOffset = offset.top;
    var leftOffset = offset.left;
    var fi = $('#firstinput');
    fi.offset({top: topOffset, left: leftOffset});
    fi.outerHeight($('.jsavvalue').height());
    fi.width($(this._arrays[index]._indices[index2].element).width());
    fi.focus();
    // finalize changes when enter key is pressed
    fi.keyup(function(event){
      if(event.keyCode == 13){
        var firstInput = $(this).val();
        firstInput = firstInput.replace(/!/g, emptystring);
        self.value(index, index2, firstInput);
        layoutTable(self, index2);
        fi.remove();
      }
    });
  };

	function bruteForceParse () {
		var serializedGrammar = "";
		for (var i = 0; i < arr.length && arr[i][0] !== ""; i++) {
			serializedGrammar = serializedGrammar + arr[i][0] + arrow + arr[i][2] + ",";
		}	
		serializedGrammar = serializedGrammar.substring(0, serializedGrammar.length - 1);
		localStorage["grammar"] = serializedGrammar;
		console.log(localStorage["grammar"]);
		window.open("./BFParse.html");
	}

  //=================================
  // Buttons for editing the SLR DFA
  $('#finalbutton').click(function() {
    $('.jsavgraph').removeClass('builddfa');
    $('.jsavgraph').addClass('addfinals');
    jsav.umsg('Click a node to toggle final state.');
  });
  $('#gotobutton').click(function() {
    $('.jsavgraph').removeClass('addfinals');
    $('.jsavgraph').addClass('builddfa');
    jsav.umsg('Build the DFA: Click a state.');
  });
  //=================================
  // Button for exiting a proof (parsing or transformation)
  $('#backbutton').click(function () {
    if (parseTree) {
      parseTree.clear();
      jsav.clear();
      jsav = new JSAV("av");
    }
    if (derivationTable) { derivationTable.clear();}
    if (ffTable) { ffTable.clear();}
		parseTable = [];
		$('.conflictMenu').remove();
    if (parseTableDisplay) { parseTableDisplay.clear();}
    if (modelDFA) { modelDFA.clear();}
    if (builtDFA) { builtDFA.clear();}
    if (tGrammar) { tGrammar.clear();}
    if (backup) {
      arr = _.map(backup.split(','), function(x) { 
        var d = x.split(arrow);
        d.splice(1, 0, arrow);
        return d;
      });
      lastRow = arr.length;
      arr.push(["", arrow, ""]);
      backup = null;
    }
    $('.jsavcanvas').height("auto");
    $('#movebutton').off();
    $('#finalbutton').off();
    $('#gotobutton').off();
    $('#dfabuttons').hide();
    $('#convertmovebutton').off();
    $('#convertmovebutton').hide();
    m = init();
    $('#firstinput').remove();
    $('#temp').remove();
    jsav.umsg('');
    $('button').show();
    $('#transformbutton').show();
    $('.jsavcontrols').hide();
    $('#backbutton').hide();
    $('.parsingbutton').off();
    $('.parsingbutton').hide();
    $('#files').show();
    $(m.element).css("margin-left", "auto");
    $('.jsavmatrix').addClass("editMode");
  });
  $('#editbutton').click(editMode);
  $('#deletebutton').click(deleteMode);
  $('#bfpbutton').click(bfParse);
  $('#llbutton').click(llParse);
  $('#slrbutton').click(slrParse);
  $('#transformbutton').click(transformGrammar);
  $('#loadfile').on('change', loadFile);
  $('#savefile').click(saveFile);
  $('#convertRLGbutton').click(convertToFA);
  $('#convertCFGbutton').click(convertToPDA);
	$('#multipleButton').click(toggleMultiple);
	$('#addExerciseButton').click(addExercise);
	$(document).click(defocus);
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			$('#firstinput').remove();
			fi = null;
		}
	});

	function onLoadHandler() {
		type = $("h1").attr('id');
		$('#loadFile').hide();
		$('#saveFile').hide();	
		$('#backbutton').hide();
		$('.multiple').hide();
		$('#addExerciseButton').hide();
		if (type == "editor") {
			m = init();
  		$('.jsavmatrix').addClass("editMode");
			return;
		}
		$.ajax({
			url: "../exercises/grammarTests.xml",
			dataType: 'xml',
			async: true,
			success: function(data) {
				grammars = data.getElementsByTagName("grammar");
				initQuestionLinks();
				updateExercise(0);
				switch (type) {
				case "bf":
					bfParse();
					break;
				case "ll":
					llParse();
					break;
				case "slr":
					slrParse();
					break;
				default:
					break;
				}
				m = init();
  			$('.jsavmatrix').addClass("editMode");
			}
		});
	}

	function initQuestionLinks() {
		$("#exerciseLinks").html("");
		//not from localStorage but from XML file
		if (grammars) {
			for (i = 0; i < grammars.length; i++) {
				$("#exerciseLinks").append("<a href='#' id='" + i + "' class='links'>" + (i+1) + "</a>");
			}			
			$('.links').click(toExercise);
		}
 	}
	
	function updateQuestionLinks() {
		$(".links").removeClass("currentExercise");
		$("#" + currentExercise).addClass("currentExercise");
	}
	
	function updateExercise(index) {
		currentExercise = index;
		if (multiple) {
			parseFile(grammars[index], "multiple");
		}
		else {
			parseFile(grammars[index], "exer");
		}
		updateQuestionLinks();
	}	

	function toExercise() {
		$('#firstinput').remove();
		grammars[currentExercise] = serializeGrammar();
		var index = $(this).attr('id');
		updateExercise(index);
	}

	function toggleMultiple() {
		multiple = !multiple;
		if (multiple) {
			$('#addExerciseButton').show();
			$('#loadfile').hide();
			$('.multiple').show();
			$('#firstinput').remove();
			grammars = [];
			grammars.push(serializeGrammar());
			initQuestionLinks();
			updateQuestionLinks();
		}
		else {
			$('.multiple').hide();
			$('#addExerciseButton').hide();
			$('#loadfile').show();
		}
	}

	function addExercise() {
		grammars.push("<grammar></grammar>");
		initQuestionLinks();
		updateQuestionLinks();
	}

	onLoadHandler();
});
