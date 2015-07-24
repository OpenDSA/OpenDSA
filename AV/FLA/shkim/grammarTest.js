/*
Grammar demo.
This is a large file - should be split up into multiple files.
It may even be better to move the proofs into separate demos.
*/
(function ($) {
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
      parseTree,          // parse tree shown during parsing slideshows
      ffTable,            // table for FIRST and FOLLOW sets
      arrayStep,          // the position of FIRST or FOLLOW cells
      selectedNode,       // used for FA/graph editing
      modelDFA,           // DFA used to build SLR parse table
      builtDFA;           // DFA created by the user

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
      var d = x.split(String.fromCharCode(8594));
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
    } else if ($('.jsavmatrix').hasClass('editMode')) {
      // ignore if the user clicked an arrow
      if (index2 === 1) {
        return;
      }
      var prev = this.value(index, index2);
      // create an input box for editing the cell
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
      // finalize the changes to the grammar when the enter key is pressed
      fi.keyup(function(event){
        if(event.keyCode == 13){
          var input = $(this).val();
          var regex = new RegExp(emptystring, g);
          input = input.replace(regex, "");
          if (input === "" && index2 === 2) {
            input = emptystring;
          }
          if (index2 === 0 && (input.length !== 1 || variables.indexOf(input) === -1)) {
            alert('Invalid left-hand side.');
            return;
          }
          if (index2 === 0 && _.find(arr, function(x) { return x[0] === input && x[2] === arr[index][2];})) {
            alert('This production already exists.');
            return;
          }
          if (index2 === 2 && _.find(arr, function(x) { return x[0] === arr[index][0] && x[2] === input;})) {
            alert('This production already exists.');
            return;
          }
          if (index2 === 0 && !arr[index][2]) {
            m.value(index, 2, emptystring);
            arr[index][2] = emptystring;
          }
          m.value(index, index2, input);
          arr[index][index2] = input;
          // adding a new production
          addProduction(index);
          layoutTable(m, 2);
          fi.remove();
        }
      });
    }
  };
  // Function to check to see if a new row should be added and lengthen the array
  var addProduction = function (index) {
    if (m.value(index, 0) && index === lastRow) {
      // if array out of bounds, double the array size and recreate the matrix
      if (lastRow === arr.length - 1 || lastRow === arr.length) {
        var l = arr.length;
        for (var i = 0; i < l; i++) {
          arr.push(['', arrow, '']);
        }
        m = init();
        $('.jsavmatrix').addClass('editMode');
      } 
      m._arrays[lastRow + 1].show();
      lastRow++;
    }
  };

  m = init();
  $('.jsavmatrix').addClass("editMode");

  //=================================
  // Parsing

  // brute force parsing
  var bfParse = function () {
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
    startParse();
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

  // Function to check if the parse table is correct and transition
  var checkParseTable = function (parseTableDisplay, parseTable) {
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

  // click handler for the FIRST/FOLLOW table
  var firstFollowHandler = function (index) {
    // ignore if first row (headers)
    if (index === 0) { return; }
    var prev = this.value(index, arrayStep);
    prev = prev.replace(/,/g, "");
    // create input box
    $('#firstinput').remove();
    var createInput = "<input type='text' id='firstinput' value="+prev+">";
    $('body').append(createInput);
    var offset = this._arrays[index]._indices[arrayStep].element.offset();
    var topOffset = offset.top;
    var leftOffset = offset.left;
    var w = $(this._arrays[index]._indices[arrayStep].element).width();
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
  };

  // click handler for the parse table
  var parseTableHandler = function (index, index2, e) { 
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

  // Function to transition from editing FIRST sets to editing FOLLOW sets
  var continueToFollow = function (firsts, follows) {
    $('#firstinput').remove();
    var incorrect = checkTable(firsts, follows);
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

  // LL(1) parsing
  var llParse = function () {
    var firsts = {};
    var follows = {};
    var productions = _.map(_.filter(arr, function(x) { return x[0]}), function(x) {return x.slice();});
    if (productions.length === 0) {
      alert('No grammar.');
      return;
    }
    var pDict = {};     // a dictionary mapping left sides to right sides
    for (var i = 0; i < productions.length; i++) {
      if (!(productions[i][0] in pDict)) {
        pDict[productions[i][0]] = [];
      }
      pDict[productions[i][0]].push(productions[i][2]);
    }
    var derivers = {};  // variables that derive lambda
    var counter = 0;
    while (removeLambdaHelper(derivers, productions)) {
      counter++;
      if (counter > 500) {
        console.log(counter);
        break;
      }
    };
    // variables
    var v = {};
    // terminals
    var t = {};
    for (var i = 0; i < productions.length; i++) {
      var x = productions[i];
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

    // populate firsts and follows sets
    for (var i = 0; i < v.length; i++) {
      firsts[v[i]] = first(v[i], pDict, derivers).sort();
    }
    for (var i = 0; i < v.length; i++) {
      follows[v[i]] = follow(v[i], productions, pDict, derivers).sort();
    }
    /*
    parseTable is the parse table, while parseTableDisplay is the matrix displayed to the user.
    parseTableDisplay includes the row/column headers (which are ignored by the click handler).
    */
    var parseTable = [];
    for (var i = 0; i < v.length; i++) {
      var a = [];
      for (var j = 0; j < t.length; j++) {
        a.push("");
      }
      parseTable.push(a);
    }
    // fill in parseTable
    for (var i = 0; i < productions.length; i++) {
      var pFirst = first(productions[i][2], pDict, derivers);
      var vi = v.indexOf(productions[i][0]);
      for (var j = 0; j < pFirst.length; j++) {
        var ti = t.indexOf(pFirst[j]);
        if (pFirst[j] !== emptystring && ti !== -1) {
          // exit parsing if a parse table conflict is found
          if (parseTable[vi][ti] && parseTable[vi][ti] !== productions[i][2]) {
            alert('This grammar is not LL(1)!');
            return;
          }
          parseTable[vi][ti] = productions[i][2];
        } 
      }
      if (pFirst.indexOf(emptystring) !== -1) {
        var pFollow = follows[productions[i][0]];
        for (var j = 0; j < pFollow.length; j++) {
          var ti = t.indexOf(pFollow[j]);
          if (pFollow[j] !== emptystring && ti !== -1) {
            // exit parsing if a parse table conflict is found
            if (parseTable[vi][ti] && parseTable[vi][ti] !== productions[i][2]) {
              alert('This grammar is not LL(1)!');
              return;
            }
            parseTable[vi][ti] = productions[i][2];
          }
        }
      }
    }
    startParse();
    $('#followbutton').show();
    $('.jsavcontrols').hide();
    $(m.element).css("margin-left", "auto");
    // $(m.element).css('position', 'absolute');

    // create the table for FIRST and FOLLOW sets
    var ffDisplay = [];
    ffDisplay.push(["", "FIRST", "FOLLOW"]);
    for (var i = 0; i < v.length; i++) {
      var vv = v[i];
      ffDisplay.push([vv, "", ""]);
    }
    jsav.umsg('Define FIRST sets. ! is '+emptystring+'.');
    ffTable = new jsav.ds.matrix(ffDisplay);
    // ffTable = new jsav.ds.matrix(ffDisplay, {left: "30px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
    arrayStep = 1;
    ffTable.click(firstFollowHandler);

    $('#followbutton').click(function () {
      var check = continueToFollow(firsts, follows); 
      if (check) {
        $('#parsetablebutton').show();
      }
    });

    // Function to check FOLLOW set and transition to parse table editing
    var continueToParseTable = function () {
      $('#firstinput').remove();
      var incorrect = checkTable(firsts, follows);
      // provide option to complete FOLLOW sets automatically
      if (incorrect.length > 0) {
        var confirmed = confirm('The following sets are incorrect: ' + incorrect + '.\nFix automatically?');
        if (confirmed) {
          for (var i = 1; i < ffTable._arrays.length; i++) {
            var a = ffTable._arrays[i].value(0);
            ffTable.value(i, 2, follows[a]);
          }
          layoutTable(ffTable);
        } else {
          return;
        }
      } 
      $(ffTable.element).off();
      $('#parsetablebutton').hide();
      $('#parsereadybutton').show();
      jsav.umsg('Fill entries in parse table. ! is '+emptystring+'.');
      var pTableDisplay = [];
      pTableDisplay.push([""].concat(t));
      for (var i = 0; i < v.length; i++) {
        var toPush = [v[i]];
        for (var j = 0; j < parseTable[i].length; j++) {
          toPush.push('');
        }
        pTableDisplay.push(toPush);
      }
      parseTableDisplay = new jsav.ds.matrix(pTableDisplay);
      parseTableDisplay.click(parseTableHandler);
    };
    $('#parsetablebutton').click(continueToParseTable);
    $('#parsereadybutton').click(function() {
      checkParseTable(parseTableDisplay, parseTable);
    });

    // do the parsing
    var continueParse = function () {
      var inputString = prompt('Input string');
      if (inputString === null) {
        return;
      }
      startParse();
      $(m.element).css("margin-left", "auto");
      //$(m.element).css('position', 'absolute');
      var pTableDisplay = [];
      pTableDisplay.push([""].concat(t));
      for (var i = 0; i < v.length; i++) {
        pTableDisplay.push([v[i]].concat(parseTable[i]));
      }
      //jsav.label('Grammar', {relativeTo: m, anchor: "center top", myAnchor: "center bottom"});
      parseTableDisplay = new jsav.ds.matrix(pTableDisplay);
      layoutTable(parseTableDisplay);
      //parseTableDisplay = new jsav.ds.matrix(pTableDisplay, {left: "30px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
      var remainingInput = inputString + '$';
      // display remaining input and the parse stack
      jsav.umsg('<mark>' + remainingInput[0] + '</mark>' + remainingInput.substring(1) + ' | <mark>' + productions[0][0] + '</mark>');
      jsav.displayInit();
      parseTree = new jsav.ds.tree();

      var next;
      var parseStack = [parseTree.root(productions[0][0])];

      jsav.umsg('<mark>' + remainingInput[0] + '</mark>' + remainingInput.substring(1) + ' | ');
      var accept = true;
      
      parseTree.layout();
      counter = 0;
      while (true) {
        counter++;
        if (counter > 500) {
          console.warn(counter);
          break;
        }
        next = parseStack.pop();
        if (!next) {
          break;
        }
        var vi = v.indexOf(next.value());
        var ti = t.indexOf(remainingInput[0])
        // if the terminal on the stack and the next terminal in the input do not match, the string is rejected
        if (vi === -1 && next.value() !== remainingInput[0]) {
          accept = false;
          break;
        }
        jsav.step();
        // if terminal:
        if (vi !== -1) {
          var toAdd = parseTable[vi][ti];
          if (!toAdd) {
            accept = false;
            break;
          }
          for (var j = 0; j < parseTableDisplay._arrays.length; j++) {
            parseTableDisplay._arrays[j].unhighlight();
          }
          // highlight the relevant cell in the parse table (offset by 1 due to row/column headers)
          parseTableDisplay.highlight(vi + 1, ti + 1);
          var temp = [];
          // create parse tree nodes
          for (var i = 0 ; i < toAdd.length; i++) {
            // note: .child(x, y) creates a child node but returns the parent
            var n = next.child(i, toAdd[i]).child(i);
            if (v.indexOf(toAdd[i]) === -1) {
              n.addClass('terminal');
            }
            if (toAdd[i] !== emptystring) {
              temp.unshift(n);
            }
          }
          parseStack = parseStack.concat(temp);
          parseTree.layout();
        } else if (next.value() === remainingInput[0]) {
            remainingInput = remainingInput.substring(1);
        } 
        jsav.umsg('<mark>' + remainingInput[0] + '</mark>' + remainingInput.substring(1) + ' | '
         + _.map(parseStack, function(x, k) {
          if (k === parseStack.length - 1) {return '<mark>'+x.value()+'</mark>';} return x.value();}));
      }
      jsav.step();
      if (accept && remainingInput[0] === '$' && !next) {
        jsav.umsg('"' + inputString + '" accepted');
      } else {
        jsav.umsg('"' + inputString + '" rejected');
      }
      for (var j = 0; j < parseTableDisplay._arrays.length; j++) {
        parseTableDisplay._arrays[j].unhighlight();
      }
      jsav.recorded();
    };
    // allow user to parse repeatedly with different inputs
    $('#parsebutton').click(continueParse);
  };

  // SLR(1) parsing helpers:
  // click handler for the nodes of the DFA being built
  var dfaHandler = function (e) {
    if (selectedNode) {
      selectedNode.unhighlight();
    }
    if ($('.jsavgraph').hasClass('addfinals')) {
      this.toggleClass('final');
    } else if ($('.jsavgraph').hasClass('movenodes')) {
      this.highlight();
      selectedNode = this;
      jsav.umsg("Click to place node");
      e.stopPropagation();
    } else {
      this.highlight();
      // if node clicked is the toNode for the new edge
      // check for goto set
      if(selectedNode && localStorage['slrdfareturn']) {
        var newItemSet = localStorage['slrdfareturn'].replace(/,/g, '<br>');
        if (this.stateLabel() === newItemSet) {
          builtDFA.addEdge(selectedNode, this, {weight: localStorage['slrdfasymbol']});
          builtDFA.layout();
          jsav.umsg("Build the DFA: Click a state.");
          selectedNode.unhighlight();
          this.unhighlight();
          selectedNode = null;
          return;
        } else {
          alert('Incorrect.');
          this.unhighlight();
          return;
        }
      }
      // if node clicked is fromNode
      var pr = prompt('Grammar symbol for the transition?');
      if (!pr) {
        this.unhighlight();
        return;
      }
      var bEdges = this.getOutgoing();
      for (var i = 0; i < bEdges.length; i++) {
        if (bEdges[i].weight().split('<br>').indexOf(pr) !== -1) {
          alert('Transition already created.');
          this.unhighlight();
          return;
        }
      }
      selectedNode = this;
      var nodes = modelDFA.nodes();
      var checkNode;
      for (var next = nodes.next(); next; next = nodes.next()) {
        // get state label of the hidden node:
        var modelItems = next._stateLabel.element[0].innerHTML.split('<br>');
        // get state label of the visible node:
        var builtItems = this.stateLabel().split('<br>');
        // find the model node corresponding to the selected node:
        var inter = _.intersection(modelItems, builtItems);
        if (inter.length === modelItems.length && inter.length === builtItems.length) {
          checkNode = next;
          break;
        } 
      }
      // find model edge corresponding to transition to be built
      var edges = checkNode.getOutgoing();
      for (var i = 0; i < edges.length; i++) {
        var w = edges[i].weight().split('<br>');
        if (w.indexOf(pr) !== -1) {
          // open goto window for user to fill out the item set
          var productions = _.filter(arr, function(x) {return x[0];});
          localStorage['slrdfaproductions'] = ["S'" + arrow + productions[0][0]].concat(_.map(productions, function(x) {return x.join('');}));
          localStorage['slrdfaitemset'] = this.stateLabel().split('<br>');
          localStorage['slrdfasymbol'] = pr;
          window.open('slrGoTo.html', '', 'width = 800, height = 750, screenX = 300, screenY = 25');
          jsav.umsg('Place the new node.');
          break;
        }
      }
      e.stopPropagation();
    }
      
  };

  // click handler for the DFA graph window/canvas
  var graphHandler = function (e) {
    // if moving nodes
    if ($('.jsavgraph').hasClass('movenodes')) {
      var nodeX = selectedNode.element.width()/2.0,
          nodeY = selectedNode.element.height()/2.0;
      $(selectedNode.element).offset({top: e.pageY - nodeY, left: e.pageX - nodeX});
      builtDFA.layout();
      selectedNode.unhighlight();
      selectedNode = null;
      e.stopPropagation();
      jsav.umsg("Click a node.");
    } else {
      // if adding initial node
      if (localStorage['slrdfareturn'] && localStorage['slrdfasymbol'] === 'initial') {
        var builtInitial = builtDFA.addNode({left: 50, top: 50}),
            nodeX = builtInitial.element.width()/2.0,
            nodeY = builtInitial.element.height()/2.0;
        $(builtInitial.element).offset({top: e.pageY - nodeY, left: e.pageX - nodeX});
        builtDFA.makeInitial(builtInitial);
        builtInitial.stateLabel(localStorage['slrdfareturn'].replace(/,/g, '<br>'));
        builtDFA.layout();
        localStorage.removeItem('slrdfareturn');
        localStorage.removeItem('slrdfasymbol');
        jsav.umsg('Build the DFA: Click a state.');
        return;
      }
      // if user has determined the next item set and is ready to place the new DFA node
      if(selectedNode && localStorage['slrdfareturn']) {
        var newItemSet = localStorage['slrdfareturn'].replace(/,/g, '<br>');
        var newItemSetArr = newItemSet.split('<br>');
        // check to see if the toNode has already been created
        var nodes = builtDFA.nodes();
        for (var next = nodes.next(); next; next = nodes.next()) {
          var sla = next.stateLabel().split('<br>');
          var inter = _.intersection(sla, newItemSetArr);
          if (inter.length === sla.length && inter.length === newItemSetArr.length) {
            alert('The node already exists!');
            return;
          }
        }
        // add new node
        var newNode = builtDFA.addNode(),
            nodeX = newNode.element.width()/2.0,
            nodeY = newNode.element.height()/2.0;
        $(newNode.element).offset({top: e.pageY - nodeY, left: e.pageX - nodeX});
        newNode.stateLabel(newItemSet);
        builtDFA.addEdge(selectedNode, newNode, {weight: localStorage['slrdfasymbol']});
        builtDFA.layout();
        jsav.umsg("Build the DFA: Click a state.");
        selectedNode.unhighlight();
        selectedNode = null;
      }
    }
  };

  /*
  SLR(1) parsing
  Does not check to see if the grammar is correct format.
  Does not check for parse table conflicts!
  JFLAP allows users to choose which to use during conflicts.
  */
  var slrParse = function () {
    var productions = _.map(_.filter(arr, function(x) { return x[0]}), function(x) {return x.slice();});
    if (productions.length === 0) {
      alert('No grammar.');
      return;
    }
    // variables:
    var v = {};
    // terminals:
    var t = {};
    for (var i = 0; i < productions.length; i++) {
      var x = productions[i];
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
    // terminals + variables:
    var tv = t.concat(v);
    // variables + terminals:
    var vt = v.concat(t);
    var parseTable = [];
    for (var i = 0; i < productions.length; i++) {
      var a = [];
      for (var j = 0; j < tv.length; j++) {
        a.push("");
      }
      parseTable.push(a);
    }
    
    startParse();
    $(m.element).css("margin-left", "auto");
    // $(m.element).css('position', 'absolute');

    var slrM = [[0, "S'", arrow, productions[0][0]]];
    for (var i = 0; i < productions.length; i++) {
      var prod = productions[i];
      slrM.push([i+1, prod[0], prod[1], prod[2]]);
    }
    if (m) {
      m.clear();
    }
    m = jsav.ds.matrix(slrM, {style: "table"});
    layoutTable(m);

    var ffDisplay = [];
    ffDisplay.push(["", "FIRST", "FOLLOW"]);
    for (var i = 0; i < v.length; i++) {
      var vv = v[i];
      ffDisplay.push([vv, "", ""]);
    }
    jsav.umsg('Define FIRST sets. ! is '+emptystring+'.');
    ffTable = new jsav.ds.matrix(ffDisplay);
    // ffTable = new jsav.ds.matrix(ffDisplay, {left: "30px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
    arrayStep = 1;

    // build DFA to model the parsing stack
    modelDFA = jsav.ds.fa({width: '90%', height: 440, layout: 'automatic'});
    var sNode = modelDFA.addNode();
    modelDFA.makeInitial(sNode);
    sNode.stateLabel("S'"+arrow+dot+productions[0][0]);
    var nodeStack = [sNode];
    while (nodeStack.length > 0) {
      var nextNode = nodeStack.pop();
      nextNode.addClass('slrvisited');
      var items = addClosure(nextNode.stateLabel().split('<br>'), productions);
      nextNode.stateLabel(items.join('<br>'));
      for (var i = 0; i < vt.length; i++) {
        var symbol = vt[i];
        var nextItems = addClosure(goTo(items, symbol), productions);
        if (nextItems.length > 0) {
          var nodes = modelDFA.nodes();
          var toNode = null;
          // check if node has already been created
          for (var next = nodes.next(); next; next = nodes.next()) {
            var curItems = next.stateLabel().split('<br>');
            var inter = _.intersection(curItems, nextItems);
            if (inter.length === curItems.length && inter.length === nextItems.length) {
              toNode = next;
            } 
          }
          if (!toNode) {
            toNode = modelDFA.addNode();
            toNode.stateLabel(nextItems.join('<br>'));
          }
          modelDFA.addEdge(nextNode, toNode, {weight: symbol});
          if (!toNode.hasClass('slrvisited')) {
            nodeStack.push(toNode);
          }
        }
      }
    }
    // add final states
    var nodes = modelDFA.nodes();
    for (var next = nodes.next(); next; next = nodes.next()) {
      var items = next.stateLabel().split('<br>');
      for (var i = 0; i < items.length; i++) {
        var r = items[i];
        if (r[r.length - 1] === dot) {
          next.addClass('final');
          break;
        }
      }
    }
    modelDFA.layout();

    // use DFA to generate the parse table
    var pDict = {};     // a dictionary mapping left sides to right sides
    for (var i = 0; i < productions.length; i++) {
      if (!(productions[i][0] in pDict)) {
        pDict[productions[i][0]] = [];
      }
      pDict[productions[i][0]].push(productions[i][2]);
    }
    var derivers = {};  // variables that derive lambda
    var counter = 0;
    while (removeLambdaHelper(derivers, productions)) {
      counter++;
      if (counter > 500) {
        console.log(counter);
        break;
      }
    };
    // get FIRSTs and FOLLOWs
    var firsts = {};
    for (var i = 0; i < v.length; i++) {
      firsts[v[i]] = first(v[i], pDict, derivers).sort();
    }
    var follows = {};
    for (var i = 0; i < v.length; i++) {
      follows[v[i]] = follow(v[i], productions, pDict, derivers).sort();
    }

    // add the extra S' -> S production
    pDict["S'"] = productions[0][0];
    if (productions[0][0] in derivers) {
      derivers["S'"] = true;
    }
    productions.unshift(["S'", arrow, productions[0][0]]);

    // Create parse table using the DFA
    // Does not check for conflicts!
    nodes.reset();
    var index = 0;
    for (var next = nodes.next(); next; next = nodes.next()) {
      var row = [];
      for (var j = 0; j < tv.length; j++) {
        row.push("");
      }
      parseTable.push(row);
      var edges = next.getOutgoing();
      for (var i = 0; i < edges.length; i++) {
        var w = edges[i].weight().split('<br>');
        for (var j = 0; j < w.length; j++) {
          var ti = t.indexOf(w[j]);
          if (ti !== -1) {
            parseTable[index][ti] = 's' + edges[i].end().value().substring(1);
          } else {
            var vi = tv.indexOf(w[j]);
            parseTable[index][vi] = edges[i].end().value().substring(1);
          }
        }
      }
      if (next.hasClass('final')) {
        var l = next.stateLabel().split('<br>');
        var rItem = null;
        var rk = null;
        for (var i = 0; i < l.length; i++){
          if (l[i].indexOf(dot) === l[i].length - 1) {
            rItem = l[i].substring(0, l[i].length-1);
            if (!rItem.split(arrow)[1]) {
              rItem = rItem + emptystring;
            }
            break;
          }
        }
        if (rItem.substr(0, 2) === "S'") {
          var ti = tv.indexOf('$');
          parseTable[index][ti] = 'acc';
        } else {
          for (var i = 0; i < productions.length; i++) {
            if (productions[i].join('') === rItem) {
              rk = i;
              break;
            }
          }
          var followSet = follows[productions[rk][0]];
          for (var i = 0; i < followSet.length; i++) {
            var ti = tv.indexOf(followSet[i]);
            parseTable[index][ti] = 'r' + rk;
          }
        }
      }
      index++;
    }
    modelDFA.hide();
    $('#followbutton').show();
    $('.jsavcontrols').hide();

    // interactable FIRST/FOLLOW, same as LL parsing
    ffTable.click(firstFollowHandler);
    $('#followbutton').click(function () {
      var check = continueToFollow(firsts, follows);
      if (check) {
        $('#slrdfabutton').show();
      }
    });
    // Function to check FOLLOW sets and initialize the DFA
    var continueToDFA = function () {
      $('#firstinput').remove();
      var incorrect = checkTable(firsts, follows);
      // provide option to complete the FOLLOW sets automatically
      if (incorrect.length > 0) {
        var confirmed = confirm('The following sets are incorrect: ' + incorrect + '.\nFix automatically?');
        if (confirmed) {
          for (var i = 1; i < ffTable._arrays.length; i++) {
            var a = ffTable._arrays[i].value(0);
            ffTable.value(i, 2, follows[a]);
          }
          layoutTable(ffTable);
        } else {
          return;
        }
      }
      $(ffTable.element).off();
      $('#slrdfabutton').hide();
      $('#parsetablebutton').show();
      jsav.umsg('Build the DFA: Click a state.');
      // create the DFA
      builtDFA = jsav.ds.fa({width: '90%', height: 440});
      builtDFA.click(dfaHandler);
      $('.jsavgraph').click(graphHandler);
      $('#av').append($('#dfabuttons'));
      $('#dfabuttons').show();
      var pr = confirm("Would you like to define the initial set yourself?");
      if (pr) {
        // user fills out the initial set in the goTo window and adds the initial node to the graph manually
        localStorage['slrdfaproductions'] = _.map(productions, function(x) {return x.join('');});
        localStorage['slrdfasymbol'] = 'initial';
        window.open('slrGoTo.html', '', 'width = 800, height = 750, screenX = 300, screenY = 25');
        jsav.umsg("Add the initial node.");
      } else {
        // initial state is added automatically
        var builtInitial = builtDFA.addNode({left: 50, top: 50});
        builtDFA.makeInitial(builtInitial);
        builtInitial.stateLabel(modelDFA.initial._stateLabel.element[0].innerHTML);
        builtDFA.layout();
      }
    };
    $('#slrdfabutton').click(continueToDFA);

    // Function to check the DFA and transition to the parse table
    var continueToParseTable = function () {
      var edges1 = modelDFA.edges();
      var edges2 = builtDFA.edges();
      var tCount1 = 0,
          tCount2 = 0,
          correctFinals = true;
      for (var next = edges1.next(); next; next = edges1.next()) {
        tCount1 = tCount1 + next.weight().split('<br>').length;
      }
      for (var next = edges2.next(); next; next = edges2.next()) {
        tCount2 = tCount2 + next.weight().split('<br>').length;
      }
      var bNodes = builtDFA.nodes();
      for (var next = bNodes.next(); next; next = bNodes.next()) {
        var nis = next.stateLabel().split('<br>');
        var ff = _.find(nis, function(x) {return x[x.length - 1] === dot; });
        if (ff && !next.hasClass('final')) {
          correctFinals = false;
          break;
        }
        if (!ff && next.hasClass('final')) {
          correctFinals = false;
          break;
        }
      }
      // if the number of transitions and number of nodes match, and final nodes are correct
      if (tCount1 !== tCount2 || modelDFA.nodeCount() !== builtDFA.nodeCount() || !correctFinals) {
        var confirmed = confirm('Not finished!\nFinish automatically?');
        // "finish automatically" = displaying the model DFA. This changes the layout.
        if (confirmed) {
          builtDFA.clear();
          modelDFA.show();
        } else {
          return;
        }
      } 
      $('#dfabuttons').hide();
      $('#movedfabutton').remove();
      $('#parsetablebutton').hide();
      $('#parsereadybutton').show();
      jsav.umsg('Fill entries in parse table. ! is '+emptystring+'.');
      // initialize parse table display
      var pTableDisplay = [];
      pTableDisplay.push([""].concat(tv));
      for (var i = 0; i < modelDFA.nodeCount(); i++) {
        var toPush = [i];
        for (var j = 0; j < parseTable[i].length; j++) {
          toPush.push('');
        }
        pTableDisplay.push(toPush);
      }
      //jsav.label('Grammar', {relativeTo: m, anchor: "center top", myAnchor: "center bottom"});
      parseTableDisplay = new jsav.ds.matrix(pTableDisplay);
      parseTableDisplay.click(parseTableHandler);
    };
    $('#parsetablebutton').click(continueToParseTable);
    $('#parsereadybutton').click(function() {
      checkParseTable(parseTableDisplay, parseTable);
    });

    // do the parsing
    var continueParse = function () {
      var inputString = prompt('Input string');
      if (inputString === null) {
        return;
      }
      startParse();
      var slrM = [];
      for (var i = 0; i < productions.length; i++) {
        var prod = productions[i];
        slrM.push([i, prod[0], prod[1], prod[2]]);
      }
      if (m) {
        m.clear();
      }
      m = jsav.ds.matrix(slrM, {style: "table"});
      layoutTable(m);
      var pTableDisplay = [];
      pTableDisplay.push([""].concat(tv));
      for (var i = 0; i < modelDFA.nodeCount(); i++) {
        pTableDisplay.push([i].concat(parseTable[i]));
      }
      //parseTableDisplay = new jsav.ds.matrix(pTableDisplay, {left: "30px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
      $(m.element).css("margin-left", "auto");
      $(m.element).css("margin-top", "0px");
      parseTableDisplay = new jsav.ds.matrix(pTableDisplay);
      layoutTable(parseTableDisplay);
      // The parse 'tree' is a directed graph with layered output. This allows the tree to be built bottom up
      parseTree = new jsav.ds.graph({layout: "layered", directed: true});
      parseTree.element.addClass('parsetree');
      var remainingInput = inputString + '$';
      var parseStack = [0];
      var currentRow = 0;
      var accept = false;
      var displayOrder = [];
      jsav.umsg(remainingInput + ' | ' + productions[1][0]);
      
      jsav.displayInit();
      // m.hide();
      // parseTableDisplay.hide();
      jsav.umsg(remainingInput + ' | ');
      
      counter = 0;
      while (true) {
        counter++;
        if (counter > 500) {
          console.warn(counter);
          break;
        }
        // index of the lookahead
        var lookAhead = tv.indexOf(remainingInput[0]);
        // parse table entry to be processed
        var entry = parseTable[currentRow][lookAhead];
        for (var j = 0; j < m._arrays.length; j++) {
          m.unhighlight(j);
        }
        for (var j = 0; j < parseTableDisplay._arrays.length; j++) {
          parseTableDisplay.unhighlight(j);
        }
        parseTableDisplay.highlight(currentRow+1, lookAhead+1);
        if (!entry) {
          break;
        } 
        if (entry === 'acc') {
          accept = true;
          jsav.step();
          break;
        }
        if (entry[0] === 's') {             // shift
          // add parse tree node, and add items to the stack
          var term = parseTree.addNode(remainingInput[0]);
          term.addClass('terminal');
          parseStack.push(term);
          displayOrder.push(term);
          currentRow = Number(entry.substring(1));
          parseStack.push(currentRow);
          remainingInput = remainingInput.substring(1);
          parseTree.layout();
        } else if (entry[0] === 'r') {      // reduce
          var pIndex = Number(entry.substring(1));
          var p = productions[pIndex];
          m.highlight(pIndex);
          if (p[2] === emptystring) {
            var lNode = parseTree.addNode(emptystring);
            lNode.addClass('terminal');
            parseTree.layout();
            jsav.step();
            var par = parseTree.addNode(p[0]);
            parseTree.addEdge(par, lNode);
            var n = currentRow;
          } else {
            var par = parseTree.addNode(p[0]);
            var childs = [];
            for (var i = p[2].length - 1; i >= 0; i--) {
              parseStack.pop();
              childs.unshift(parseStack.pop());
            }
            for (var i = 0; i < childs.length; i++) {
              parseTree.addEdge(par, childs[i]);
            }
            var n = parseStack[parseStack.length - 1];
          }
          parseTree.layout();
          jsav.umsg(remainingInput + ' | '
           + _.map(parseStack, function(x, k) {
            if (typeof x === 'number' || typeof x === 'string') {
              return x;
            }
            return x.value();}));
          jsav.step();
          parseStack.push(par);
          displayOrder.push(par);
          currentRow = Number(parseTable[n][tv.indexOf(p[0])]);
          for (var j = 0; j < parseTableDisplay._arrays.length; j++) {
            parseTableDisplay.unhighlight(j);
          }
          parseTableDisplay.highlight(n+1, tv.indexOf(p[0]) + 1);
          parseStack.push(currentRow);
          parseTree.layout();
        }
        jsav.umsg(remainingInput + ' | '
         + _.map(parseStack, function(x, k) {
          if (typeof x === 'number' || typeof x === 'string') {
            return x;
          }
          return x.value();}));
        jsav.step();
      }
      if (accept) {
        jsav.umsg('"' + inputString + '" accepted');
      } else {
        jsav.umsg('"' + inputString + '" rejected');
      }
      jsav.recorded();
    };
    $('#parsebutton').click(continueParse);
  };
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

  var replaceCharAt = function (str, index, ch) {
    if (index < 0 || index > str.length - 1) {
      return str;
    } else {
      return str.substring(0, index) + ch + str.substring(index + 1);
    }
  };

  // gets FIRST set
  var first = function (str, pDict, lambdaVars) {
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
        for (var i = 0; i < strings.length; i++) {
          if (strings[i][0] !== str) {
            ret = _.union(ret, first(strings[i], pDict, lambdaVars));
          } else if (str in lambdaVars) {
            ret = _.union(ret, first(strings[i].substring(1), pDict, lambdaVars));
          }
        }
        return ret;
      }
    } else if (str.length > 1) {
      if (!(str[0] in lambdaVars)) {
        return first(str[0], pDict, lambdaVars);
      } else {
        return _.union(_.without(first(str[0], pDict, lambdaVars), emptystring), first(str.substring(1), pDict, lambdaVars));
      }
    }
  };
  // gets FOLLOW set
  var follow = function (str, productions, pDict, lambdaVars) {
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
              ret = _.union(ret, follow(productions[i][0], productions, pDict, lambdaVars));
            }
          } else {
            var nextSymbol = first(p.substring(j + 1), pDict, lambdaVars);
            ret = _.union(ret, _.without(nextSymbol, emptystring));
            if (nextSymbol.indexOf(emptystring) !== -1) {
              if (productions[i][0] !== str) {
                ret = _.union(ret, follow(productions[i][0], productions, pDict, lambdaVars));
              }
            }
          }
        }
      }
    }
    return ret;
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

  /*
  Function to find lambda-deriving variables.
  A variable derives lambda if it directly produces lambda or if its right side is
  composed only of lambda-deriving variables.
  Used during parsing as well.
  */
  var removeLambdaHelper = function (set, productions) {
    for (var i = 0; i < productions.length; i++) {
      if (productions[i][2] === emptystring || _.every(productions[i][2], function(x) { return x in set;})) {
        if (!(productions[i][0] in set)) {
          set[productions[i][0]] = true;
          return true;
        } 
      }
    }
    return false;
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
      if (!$('.jsavgraph').hasClass('movenodes')) {
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
      } else {      // selecting node to move
        if (selectedNode) {
          selectedNode.unhighlight();
        }
        this.highlight();
        selectedNode = this;
      }
      e.stopPropagation();
    };
    // handler for the graph window, for moving nodes
    var convertGraphHandler = function (e) {
      if (selectedNode && $('.jsavgraph').hasClass('movenodes')) {
        var nodeX = selectedNode.element.width()/2.0,
            nodeY = selectedNode.element.height()/2.0;
        $(selectedNode.element).offset({top: e.pageY - nodeY, left: e.pageX - nodeX});
        selectedNode.stateLabelPositionUpdate();
        var edges = builtDFA.edges();
        for (var next = edges.next(); next; next = edges.next()) {
          if (next.start().equals(selectedNode) || next.end().equals(selectedNode)) {
            next.layout();
          }
        }
        selectedNode.unhighlight();
        selectedNode = null;
        e.stopPropagation();
      }
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
    var toggleMove = function () {
      if ($('.jsavgraph').hasClass('movenodes')) {
        $('.jsavgraph').removeClass('movenodes');
        this.value = 'Move states';
      } else {
        $('.jsavgraph').addClass('movenodes');
        this.value = 'Add transitions';
      }
    };
    builtDFA.click(convertDfaHandler);
    $('.jsavgraph').click(convertGraphHandler);
    m.click(convertGrammarHandler);
    $('#av').append($('#convertmovebutton'));
    $('#convertmovebutton').click(toggleMove);
    $('#convertmovebutton').show();
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
  function serializeGrammar (g) {
    var text = '<?xml version="1.0" encoding="UTF-8"?>';
    text = text + "<structure>";
    text = text + "<type>grammar</type>"
    for (var i = 0; i < g.length; i++) {
      text = text + "<production>";
      text = text + "<left>" + g[i][0] + "</left>";
      text = text + "<right>" + g[i][2] + "</right>";
      text = text + "</production>";
    }
    text = text + "</structure>"
    return text;
  };
  // Function to save and download the grammar
  var saveFile = function () {
    var productions = _.filter(arr, function(x) { return x[0]});
    if (productions.length === 0) {
      alert('No grammar.');
      return;
    }
    var downloadData = "text/xml;charset=utf-8," + encodeURIComponent(serializeGrammar(productions));
    $('#download').html('<a href="data:' + downloadData + '" target="_blank" download="grammar.xml">Download Grammar</a>');
    $('#download a')[0].click();
  };

  // Loading:
  // Function to read the loaded XML file and create the grammar
  var parseFile = function (text) {
    var parser,
        xmlDoc;
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

  //=================================
  // Buttons for editing the SLR DFA
  $('#movebutton').click(function() {
    $('.jsavgraph').removeClass('addfinals');
    $('.jsavgraph').removeClass('builddfa');
    $('.jsavgraph').addClass('movenodes');
    jsav.umsg('Click a node.');
  });
  $('#finalbutton').click(function() {
    $('.jsavgraph').removeClass('movenodes');
    $('.jsavgraph').removeClass('builddfa');
    $('.jsavgraph').addClass('addfinals');
    jsav.umsg('Click a node to toggle final state.');
  });
  $('#gotobutton').click(function() {
    $('.jsavgraph').removeClass('addfinals');
    $('.jsavgraph').removeClass('movenodes');
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
    if (parseTableDisplay) { parseTableDisplay.clear();}
    if (modelDFA) { modelDFA.clear();}
    if (builtDFA) { builtDFA.clear();}
    if (tGrammar) { tGrammar.clear();}
    if (backup) {
      arr = _.map(backup.split(','), function(x) { 
        var d = x.split(String.fromCharCode(8594));
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
}(jQuery));
