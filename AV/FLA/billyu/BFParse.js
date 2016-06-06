(function($) {
  var variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var jsav = new JSAV("av");
  var arrow = String.fromCharCode(8594),
      lastRow,            // index of the last visible row (the empty row)
      arr,                // the grammar
      backup = null,      // a copy of the original grammar (as a string) before it is transformed
      m,                  // the grammar table
      tGrammar,           // transformed grammar
      derivationTable,    // the derivation table shown during brute-force parsing
      parseTableDisplay,  // the parse table
      parseTree = null,          // parse tree shown during parsing slideshows
      ffTable,            // table for FIRST and FOLLOW sets
      arrayStep,          // the position of FIRST or FOLLOW cells
      selectedNode,       // used for FA/graph editing
      modelDFA,           // DFA used to build SLR parse table
      builtDFA,           // DFA created by the user
			tests;
	
  var lambda = String.fromCharCode(955),
      epsilon = String.fromCharCode(949),
      square = String.fromCharCode(9633),
      dot = String.fromCharCode(183),
      emptystring = lambda;
  /*
				$.ajax({
  				url: "./LLTests.json",
  				dataType: 'json',
  				async: false,
  				success: function(data) {
						tests = data;
  				}
				});

  */
  
  // Function to lay out a single column width
  var layoutColumn = function (mat, index) {
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
  // Function to fix all table column widths
  var layoutTable = function (mat, index) {
    // if column index is given, does layout for that column, otherwise lays out all columns
    if (typeof index === 'undefined') {
      for (var i = 0; i < mat._arrays[0]._indices.length; i++) {
        layoutColumn(mat, i);
      }
    } else {
      layoutColumn(mat, index);
    }
    mat.layout();
  };

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
    return m2;
  };

  //=================================
  // Parsing

  // brute force parsing
  function bfParse() {
    // get productions (gets a clone of the grammar with the empty rows removed)
    var productions = _.map(_.filter(arr, function(x) { return x[0]}), function(x) {return x.slice();});
    if (productions.length === 0) {
      alert('No grammar.');
      return;
    }
    jsav.umsg('Parsing');
    var inputString = prompt('Input string');
    if (inputString === null) {
      return;
    }
    startParse(m, parseTree);
    $('#bfpbutton').show();
    /*
    Set the height of the canvas manually:
    Auto height does not factor in the heights of JSAV elements created with "relativeTo" turned on
    */
    $('.jsavcanvas').height(450);
    var table = {};   // maps each sentential form to the rule that produces it
    var sententials = [];
    var next;
    
    for (var i = 0; i < productions.length; i++) {
      m._arrays[i].unhighlight();
    }
    // assume the first production is the start variable
    for (var i = 0; i < productions.length; i++) {
      if (productions[i][0] === productions[0][0]) {
        if (productions[i][2] === emptystring) {
          sententials.push('');
          table[''] = [i, ''];
        } else {
          sententials.push(productions[i][2]);
          table[productions[i][2]] = [i, ''];
        }
      }
    }
    var derivers = {};  // variables that derive lambda
    var counter = 0;
    // find lambda deriving variables
    while (removeLambdaHelper(derivers, productions)) {
      counter++;
      if (counter > 500) {
        console.log(counter);
        break;
      }
    };
    derivers = Object.keys(derivers);

    // parse
    counter = 0;
    while (true) {
      counter++;
      // ask the user to continue if parsing is taking a long time
      if (counter > 5000) {
        console.warn(counter);
        var confirmed = confirm('This is taking a while. Continue?');
        if (confirmed) {
          counter = 0;
        } else {
          break;
        }
      }
      next = sententials.pop();
      // stop parsing if the input string has been derived or if there are no more derivations
      if (next === inputString) {
        break;
      }
      if (!next) { 
        break;
      }
      var c = null;
      // go through the sentential form
      for (var i = 0; i < next.length; i++) {
        c = next[i];
        // when a variable has been found, add its derivable sentential forms to be parsed
        if (variables.indexOf(c) !== -1) {
          // find productions for the variable
          _.each(productions, function(x, k) { 
            if (x[0] === c) {
              var r = x[2];
              if (r === emptystring) {
                r = "";
              }
              // new sentential form
              var s = replaceCharAt(next, i, r);
              // pruning
              var keep = true;
              var prefix = "";
              var suffix = "";
              for (var j = 0; j < s.length; j++) {
                if (inputString.indexOf(s[j]) === -1 && variables.indexOf(s[j]) === -1) {
                  keep = false;
                  break;
                }
                if (variables.indexOf(s[j]) !== -1) {
                  break;
                }
                prefix = prefix + s[j];
              }
              for (var j = s.length - 1; j >= 0; j--) {
                if (variables.indexOf(s[j]) !== -1) {
                  break;
                }
                suffix = s[j] + suffix;
              }
              // prune if prefix/suffix do not match the input string
              if (prefix !== inputString.substr(0, prefix.length) || 
                suffix !== inputString.substring(inputString.length - suffix.length)) {
                keep = false;
              }
              // prune if the new sentential form is already in the queue
              else if (sententials.indexOf(s) !== -1) {
                keep = false;
              }
              /*
              prune if the number of terminals and non-lambda deriving variables is
              greater than the length of the input string
              */
              else if (_.filter(s, function(x) {
                  return variables.indexOf(x) === -1 || derivers.indexOf(x) === -1;
                }).length > inputString.length) {
                keep = false;
              }
              if (keep) {
                sententials.unshift(s);
              }
              // keep track of which production a sentential form is coming from
              if (!(s in table)) {
                table[s] = [k, next];
              }
            }
          });
        }
      }
    }
    console.log(counter);
    if (next === inputString) {
      jsav.umsg('"' + inputString + '" accepted');
      var temp = next;
      var results = [];   // derivation table
      counter = 0;
      // go through the map of sentential forms to productions in order to get the trace
      do {                // handles the case where inputstring is the emptystring
        counter++;
        if (counter > 500) {
          console.warn(counter);
          break;
        }
        var rp = productions[table[temp][0]].join("");
        results.push([rp, temp]);
        temp = table[temp][1];
      } while (table[temp] && temp);
      results.reverse();
      // set up display
      jsav.label('Grammar', {relativeTo: m, anchor: "center top", myAnchor: "center bottom"});
      derivationTable = new jsav.ds.matrix(results, {left: "30px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
      jsav.label('Derivation Table', {relativeTo: derivationTable, anchor: "center top", myAnchor: "center bottom"});
      parseTree = new jsav.ds.tree({left: "30px", relativeTo: derivationTable, anchor: "right top"});
      jsav.label('Parse Tree', {left: "" + $('.jsavtree').width() / 2.0 + "px", relativeTo: parseTree, anchor: "center top", myAnchor: "left bottom"});
      temp = [parseTree.root(productions[0][0])];

      var displayOrder = [];  // order in which to display the nodes of the parse tree
      // create the parse tree using the derivation table
      for (var i = 0; i < results.length; i++) {
        var p = results[i][0];
        var n;
        var temp2;
        var rem;
        var d = [];
        // find parent node
        for (var j = temp.length - 1; j >= 0; j--) {
          if (temp[j].value() === p.split(arrow)[0]) {
            temp2 = temp[j];
            rem = j;
            break;
          }
        }
        temp.splice(rem, 1);
        p = p.split(arrow)[1];
        var temp3 = [];
        // add children
        for (var j = 0; j < p.length; j++) {
          var par = temp2.child(j, p[j]).child(j);
          if (variables.indexOf(p[j]) !== -1) {
            temp3.unshift(par);
          } else {
            par.addClass('terminal');
          }
          d.push(par);
        }
        temp = temp.concat(temp3);
        displayOrder.push(d);
      }

      layoutTable(derivationTable);
      parseTree.layout();
      // hide the whole tree except for the start node and hide the derivation table
      parseTree.root().hide();
      parseTree.root().show({recursive: false});
      for (var i = 0; i < results.length; i++) {
        derivationTable._arrays[i].hide();
      }
      // create slideshow stepping through derivation table and parse tree
      jsav.displayInit();
      for (var i = 0; i < results.length; i++) {
        jsav.step();
        for (var j = 0; j < m._arrays.length; j++) {
          m._arrays[j].unhighlight();
        }
        var val = derivationTable.value(i, 1);
        // highlight productions in the grammar while tracing
        m._arrays[table[val][0]].highlight();
        derivationTable._arrays[i].show();
        var temp2 = displayOrder.shift();
        for (var j = 0; j < temp2.length; j++) {
          temp2[j].show({recursive: false});
        }
      }
      jsav.recorded();
    } else {
      // if string is rejected, automatically return to the editor
      $('#backbutton').click();
      jsav.umsg('"' + inputString + '" rejected');
    }
  }; 
  /*
  Function to check if FIRST / FOLLOW sets are correct (either FIRST sets or FOLLOW sets).
  Returns a list of the incorrect variables.
  */
  var checkTable = function (firsts, follows) {
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

	// sets up window for proofs
  var startParse = function () {
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
    $('#backbutton').show();
    $('#bfpbutton').hide();
    $('#llbutton').hide();
    $('#slrbutton').hide();
    $('#files').hide();
    $(m.element).css("margin-left", "50px");
    m._arrays[lastRow].hide();
  };

	var parseXML = function (xmlDoc) {
    var xmlDoc;
    if (xmlDoc.getElementsByTagName("type")[0].childNodes[0].nodeValue !== 'grammar') {
      alert('File does not contain a grammar.');
    } else {
      arr = [];
      var xmlElem = xmlDoc.getElementsByTagName("production");
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
    }
    // clear input
    var loaded = $('#loadfile');
    loaded.wrap('<form>').closest('form').get(0).reset();
    loaded.unwrap();
    return;
  };

	$.ajax({
			url: "./grammarTests.xml",
			dataType: 'xml',
			async: false,
			success: function(data) {
				tests = data;
			}
		});
	parseXML(tests);
	bfParse();
}(jQuery));
