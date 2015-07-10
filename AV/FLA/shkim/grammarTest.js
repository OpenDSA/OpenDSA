(function ($) {
  var variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var jsav = new JSAV("av");
  var arrow = String.fromCharCode(8594),
      lastRow,          // index of the last visible row
      arr,              // the grammar
      backup = null,    // a copy of the original grammar (as a string) before it is transformed
      m,
      tGrammar,         // transformed grammar
      derivationTable,
      parseTableDisplay,
      parseTree,
      ffTable,          // table for FIRST and FOLLOW sets
      arrayStep,  
      selectedNode,     // used for FA/graph editing
      modelDFA,         // DFA used to build SLR parse table
      builtDFA;         // DFA created by the user to try to build the modelDFA

  var lambda = String.fromCharCode(955),
      epsilon = String.fromCharCode(949),
      square = String.fromCharCode(9633),
      dot = String.fromCharCode(183),
      emptystring = lambda;

  if (localStorage["grammar"]) {
    arr = _.map(localStorage['grammar'].split(','), function(x) { 
      var d = x.split(String.fromCharCode(8594));
      d.splice(1, 0, arrow);
      return d;
    });
    lastRow = arr.length;
    arr.push(["", arrow, ""]);
    localStorage.removeItem('grammar');
  } else {
    arr = new Array(20);    // arbitrary array size
    for (var i = 0; i < arr.length; i++) {
      arr[i] = ["", arrow, ""];
    }
    // arr[0] = ['S', arrow, 'aA'];
    // arr[1] = ['S', arrow, 'bA'];
    // arr[2] = ['S', arrow, 'aC'];
    // arr[3] = ['A', arrow, 'B'];
    // arr[4] = ['B', arrow, 'qvC'];
    // arr[5] = ['C', arrow, 'x'];
    // arr[6] = ['B', arrow, 'y'];
    // arr[7] = ['A', arrow, emptystring];
    // arr[8] = ['', arrow, ''];
    // lastRow = 8;

    // remove lambda productions example:
    arr[0] = ['S', arrow, 'EBCA'];
    arr[1] = ['A', arrow, 'aAa'];
    arr[2] = ['A', arrow, emptystring];
    arr[3] = ['B', arrow, 'bB'];
    arr[4] = ['B', arrow, emptystring];
    arr[5] = ['C', arrow, 'B'];
    arr[6] = ['D', arrow, 'AB']; 
    arr[7] = ['E', arrow, 'a'];
    arr[8] = ['', arrow, ''];
    lastRow = 8;

    // remove unit productions example:
    // arr[0] = ['S', arrow, 'Aa'];
    // arr[1] = ['S', arrow, 'A'];
    // arr[2] = ['A', arrow, 'C'];
    // arr[3] = ['B', arrow, 'b'];
    // arr[4] = ['C', arrow, 'B'];
    // arr[5] = ['C', arrow, 'cCc'];
    // arr[6] = ['', arrow, ''];
    // lastRow = 6;

    // remove useless productions example:
    // arr[0] = ['S', arrow, 'AaB'];
    // arr[1] = ['S', arrow, 'Aa'];
    // arr[2] = ['S', arrow, 'dDc'];
    // arr[3] = ['A', arrow, 'AAa'];
    // arr[4] = ['A', arrow, 'a'];
    // arr[5] = ['B', arrow, 'bB'];
    // arr[6] = ['B', arrow, 'bBb']; 
    // arr[7] = ['C', arrow, 'cD'];
    // arr[8] = ['D', arrow, 'aAb'];
    // arr[9] = ['', arrow, ''];
    // lastRow = 9;

    // chomsky example:
    // arr[0] = ['S', arrow, 'ABAB'];
    // arr[1] = ['A', arrow, 'Aa'];
    // arr[2] = ['A', arrow, 'a'];
    // arr[3] = ['B', arrow, 'bb'];
    // arr[4] = ['', arrow, ''];
    // lastRow = 4;

    // FIRST example:
    // arr[0] = ['S', arrow, 'BAc'];
    // arr[1] = ['A', arrow, 'Aa'];
    // arr[2] = ['A', arrow, 'a'];
    // arr[3] = ['B', arrow, 'AB'];
    // arr[4] = ['B', arrow, 'bB'];
    // arr[5] = ['B', arrow, 'd'];
    // arr[6] = ['', arrow, ''];
    // lastRow = 6;

    // LL(1) example:
    // arr[0] = ['S', arrow, 'ABcC'];
    // arr[1] = ['A', arrow, 'aA'];
    // arr[2] = ['A', arrow, emptystring];
    // arr[3] = ['B', arrow, 'bbB'];
    // arr[4] = ['B', arrow, emptystring];
    // arr[5] = ['C', arrow, 'BA'];
    // arr[6] = ['', arrow, ''];
    // lastRow = 6;

    // SLR(1) examples:
    // arr[0] = ['S', arrow, 'A'];
    // arr[1] = ['A', arrow, 'aaA'];
    // arr[2] = ['A', arrow, 'b'];
    // arr[3] = ['', arrow, ''];
    // lastRow = 3;

    // arr[0] = ['S', arrow, 'ABc'];
    // arr[1] = ['A', arrow, 'Aa'];
    // arr[2] = ['A', arrow, emptystring];
    // arr[3] = ['B', arrow, 'BS'];
    // arr[4] = ['B', arrow, 'b'];
    // arr[5] = ['', arrow, ''];
    // lastRow = 5;
  }
  
  // initializes/reinitializes the grammar display
  var init = function () { 
    if (m) {
      m.clear();
    }
    var m2 = jsav.ds.matrix(arr, {style: "table"});
    for (var i = lastRow + 1; i < arr.length; i++) {
      m2._arrays[i].hide();
    }
    m2.layout();
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
      if (index2 === 1) {
        return;
      }
      var prev = this.value(index, index2);
      $('#firstinput').remove();
      var createInput = "<input type='text' id='firstinput' value="+prev+">";
      $('body').append(createInput);
      var offset = this._arrays[index]._indices[index2].element.offset();
      var topOffset = offset.top;
      var leftOffset = offset.left;
      $('#firstinput').offset({top: topOffset, left: leftOffset});
      $('#firstinput').outerHeight($('.jsavvalue').height());
      $('#firstinput').width($('.jsavvalue').width());
      $('#firstinput').focus();
      $('#firstinput').keyup(function(event){
        if(event.keyCode == 13){
          var input = $(this).val();
          if (input === "" && index2 === 2) {
            input = emptystring;
          }
          m.value(index, index2, input);
          arr[index][index2] = input;
          expandArray(index);
          $('#firstinput').remove();
        }
      });
    }
  };
  // if array out of bounds, double the array size and recreate the matrix
  var expandArray = function (index) {
    if (m.value(index, 0) && index === lastRow) {
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
      m.layout();
    }
  };

  m = init();
  $('.jsavmatrix').addClass("editMode");

  //=================================
  // parsing

  // brute force parsing
  var bfParse = function () {
    jsav.umsg('Parsing');
    var inputString = prompt('Input string');
    if (inputString === null) {
      return;
    }
    startParse();
    $('#bfpbutton').show();
    var productions = _.map(_.filter(arr, function(x) { return x[0]}), function(x) {return x.slice();});
    var table = {};   // maps each sentential form to the rule that produces it
    var sententials = [];
    var next;
    
    for (var i = 0; i < productions.length; i++) {
      m._arrays[i].unhighlight();
    }
    // assume the first production is the start variable
    for (var i = 0; i < productions.length; i++) {
      if (productions[i][0] === productions[0][0]) {
        sententials.push(productions[i][2]);
        table[productions[i][2]] = [i, ''];
      }
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
    derivers = Object.keys(derivers);

    counter = 0;
    while (true) {
      counter++;
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
      if (next === inputString) {
        break;
      }
      if (!next) { 
        break;
      }
      var c = null;
      for (var i = 0; i < next.length; i++) {
        c = next[i];
        if (variables.indexOf(c) !== -1) {
          _.each(productions, function(x, k) { 
            if (x[0] === c) {
              var r = x[2];
              if (r === emptystring) {
                r = "";
              }
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
              // prune if the number of terminals and non-lambda deriving variables is
              // greater than the length of the input string
              else if (_.filter(s, function(x) {
                  return variables.indexOf(x) === -1 || derivers.indexOf(x) === -1;
                }).length > inputString.length) {
                keep = false;
              }
              if (keep) {
                sententials.unshift(s);
              }
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
      while (table[temp]) {
        counter++;
        if (counter > 500) {
          console.warn(counter);
          break;
        }
        var rp = productions[table[temp][0]].join("");
        results.push([rp, temp]);
        temp = table[temp][1];
      }
      results.reverse();
      jsav.label('Grammar', {relativeTo: m, anchor: "center top", myAnchor: "center bottom"});
      derivationTable = new jsav.ds.matrix(results, {left: "30px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
      jsav.label('Derivation Table', {relativeTo: derivationTable, anchor: "center top", myAnchor: "center bottom"});
      parseTree = new jsav.ds.tree({left: "30px", relativeTo: derivationTable, anchor: "right top"});
      //console.log($('.jsavtree').width())
      jsav.label('Parse Tree', {left: "" + $('.jsavtree').width() / 2.0 + "px", relativeTo: parseTree, anchor: "center top", myAnchor: "left bottom"});
      temp = [parseTree.root(productions[0][0])];

      var displayOrder = [];  // order in which to display the nodes of the parse tree
      for (var i = 0; i < results.length; i++) {
        var p = results[i][0];
        var n;
        var temp2;
        var rem;
        var d = [];
        // find parent node
        for (var j = temp.length - 1; j >= 0; j--) {
          //console.log(temp[j].value());
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

      parseTree.layout();
      parseTree.root().hide();
      parseTree.root().show({recursive: false});
      for (var i = 0; i < results.length; i++) {
        derivationTable._arrays[i].hide();
      }
      jsav.displayInit();
      for (var i = 0; i < results.length; i++) {
        jsav.step();
        for (var j = 0; j < m._arrays.length; j++) {
          m._arrays[j].unhighlight();
        }
        var val = derivationTable.value(i, 1);
        m._arrays[table[val][0]].highlight();
        derivationTable._arrays[i].show();
        var temp2 = displayOrder.shift();
        for (var j = 0; j < temp2.length; j++) {
          temp2[j].show({recursive: false});
        }
      }
      // jsav.step();
      // var leaves = getLeaves(parseTree.root());
      // for (var j = 0; j < m._arrays.length; j++) {
      //     m._arrays[j].unhighlight();
      //   }
      // for (var i = 0; i < leaves.length; i++) {
      //   leaves[i].highlight();
      // }
      jsav.recorded();
    } else {
      // if string is rejected, automatically return to the editor
      jsav.umsg('"' + inputString + '" rejected');
      endParse();
    }
  }; 

  // checks if FIRST / FOLLOW sets are correct (either FIRST sets or FOLLOW sets)
  var checkTable = function (firsts, follows) {
    var checker;
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

  // checks if the parse table is correct
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
    if (index === 0) { return; }
    var prev = this.value(index, arrayStep);
    prev = prev.replace(/,/g, "");
    //console.log(prev)
    $('#firstinput').remove();
    var createInput = "<input type='text' id='firstinput' value="+prev+">";
    $('body').append(createInput);
    var offset = this._arrays[index].element.offset();
    var topOffset = offset.top;
    var leftOffset = offset.left;
    var w = $('.jsavvalue').width();
    $('#firstinput').offset({top: topOffset, left: leftOffset + arrayStep*w});
    $('#firstinput').outerHeight($('.jsavvalue').height());
    $('#firstinput').width(w);
    $('#firstinput').focus();
    $('#firstinput').keyup(function(event){
      if(event.keyCode == 13){
        var firstInput = $(this).val();
        firstInput = firstInput.split("");
        for (var i = 0; i < firstInput.length; i++) {
          if (firstInput[i] === '!') {
            firstInput[i] = emptystring;
          }
        }
        firstInput = _.uniq(firstInput).join(',');
        ffTable.value(index, arrayStep, firstInput);
        $('#firstinput').remove();
      }
    });
  };

  // click handler for the parse table
  // note: attach to each array of the table
  var parseTableHandler = function (index) {    
    if (index === 0) { return; }
    var self = this;
    var prev = this.value(index);
    $('#firstinput').remove();
    var createInput = "<input type='text' id='firstinput' value="+prev+">";
    $('body').append(createInput);
    var offset = this._indices[index].element.offset();
    var topOffset = offset.top;
    var leftOffset = offset.left;
    $('#firstinput').offset({top: topOffset, left: leftOffset});
    $('#firstinput').outerHeight($('.jsavvalue').height());
    $('#firstinput').width($('.jsavvalue').width());
    $('#firstinput').focus();
    $('#firstinput').keyup(function(event){
      if(event.keyCode == 13){
        var firstInput = $(this).val();
        firstInput = firstInput.replace(/!/g, emptystring);
        self.value(index, firstInput);
        $('#firstinput').remove();
      }
    });
  };

  // transitions from editing FIRST sets to editing FOLLOW sets
  var continueToFollow = function (firsts, follows) {
    $('#firstinput').remove();
    var incorrect = checkTable(firsts, follows);
    if (incorrect.length > 0) {
      var confirmed = confirm('The following sets are incorrect: ' + incorrect + '.\nFix automatically?');
      if (confirmed) {
        for (var i = 1; i < ffTable._arrays.length; i++) {
          var a = ffTable._arrays[i].value(0);
          ffTable.value(i, 1, firsts[a]);
        }
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
    var pDict = {};
    // a dictionary mapping left sides to right sides
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
    var v = {};
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

    findFirstsAndFollows(productions, firsts, follows, v, pDict, derivers);
    
    var parseTable = [];
    for (var i = 0; i < v.length; i++) {
      var a = [];
      for (var j = 0; j < t.length; j++) {
        a.push("");
      }
      parseTable.push(a);
    }
    for (var i = 0; i < productions.length; i++) {
      var pFirst = first(productions[i][2], pDict, derivers);
      var vi = v.indexOf(productions[i][0]);
      for (var j = 0; j < pFirst.length; j++) {
        var ti = t.indexOf(pFirst[j]);
        if (pFirst[j] !== emptystring && ti !== -1) {
          if (parseTable[vi][ti] && parseTable[vi][ti] !== productions[i][2]) {
            alert('This grammar is not LL(1)!');
            return;
          }
          parseTable[vi][ti] = productions[i][2];
        } 
      }
      if (pFirst.indexOf(emptystring) !== -1) {
        //var pFollow = follow(productions[i][0]);
        var pFollow = follows[productions[i][0]];
        for (var j = 0; j < pFollow.length; j++) {
          var ti = t.indexOf(pFollow[j]);
          if (pFollow[j] !== emptystring && ti !== -1) {
            if (parseTable[vi][ti] && parseTable[vi][ti] !== productions[i][2]) {
              alert('This grammar is not LL(1)!');
              return;
            }
            parseTable[vi][ti] = productions[i][2];
          }
        }
      }
    }
    // for (var i = 0; i < parseTable.length; i++) {
    //   console.log(""+parseTable[i])
    // }

    startParse();
    $('#followbutton').show();
    $('.jsavcontrols').hide();
    ffDisplay = [];
    ffDisplay.push(["", "FIRST", "FOLLOW"]);
    for (var i = 0; i < v.length; i++) {
      var vv = v[i];
      ffDisplay.push([vv, "", ""]);
    }
    jsav.umsg('Define FIRST sets. ! is the lambda character.');
    ffTable = new jsav.ds.matrix(ffDisplay, {left: "30px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
    arrayStep = 1;
    
    ffTable.click(firstFollowHandler);
    $('#followbutton').click(function () {
      var check = continueToFollow(firsts, follows); 
      if (check) {
        $('#parsetablebutton').show();
      }
    });

    var continueToParseTable = function () {
      $('#firstinput').remove();
      var incorrect = checkTable(firsts, follows);
      if (incorrect.length > 0) {
        var confirmed = confirm('The following sets are incorrect: ' + incorrect + '.\nFix automatically?');
        if (confirmed) {
          for (var i = 1; i < ffTable._arrays.length; i++) {
            var a = ffTable._arrays[i].value(0);
            ffTable.value(i, 2, follows[a]);
          }
        } else {
          return;
        }
      } 
      $(ffTable.element).off();
      $('#parsetablebutton').hide();
      $('#parsereadybutton').show();
      jsav.umsg('Fill entries in parse table. ! is the lambda character.');
      var pTableDisplay = [];
      pTableDisplay.push([""].concat(t));
      for (var i = 0; i < v.length; i++) {
        var toPush = [v[i]];
        for (var j = 0; j < parseTable[i].length; j++) {
          toPush.push('');
        }
        pTableDisplay.push(toPush);
        //pTableDisplay.push([v[i]].concat(parseTable[i]));
      }
      //jsav.label('Grammar', {relativeTo: m, anchor: "center top", myAnchor: "center bottom"});
      parseTableDisplay = new jsav.ds.matrix(pTableDisplay);
      for (var i = 1; i < parseTableDisplay._arrays.length; i++) {
        parseTableDisplay._arrays[i].click(parseTableHandler);
      }
    };
    $('#parsetablebutton').click(continueToParseTable);
    $('#parsereadybutton').click(function() {
      checkParseTable(parseTableDisplay, parseTable);
    });

    var continueParse = function () {
      var inputString = prompt('Input string');
      if (inputString === null) {
        return;
      }
      startParse();
      var pTableDisplay = [];
      pTableDisplay.push([""].concat(t));
      for (var i = 0; i < v.length; i++) {
        pTableDisplay.push([v[i]].concat(parseTable[i]));
      }
      //jsav.label('Grammar', {relativeTo: m, anchor: "center top", myAnchor: "center bottom"});
      parseTableDisplay = new jsav.ds.matrix(pTableDisplay, {left: "30px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
      var remainingInput = inputString + '$';
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
        if (vi === -1 && next.value() !== remainingInput[0]) {
          accept = false;
          break;
        }
        jsav.step();
        if (vi !== -1) {
          var toAdd = parseTable[vi][ti];
          if (!toAdd) {
            accept = false;
            break;
          }
          for (var j = 0; j < parseTableDisplay._arrays.length; j++) {
            parseTableDisplay._arrays[j].unhighlight();
          }
          parseTableDisplay.highlight(vi + 1, ti + 1);
          var temp = [];
          for (var i = 0 ; i < toAdd.length; i++) {
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
    $('#parsebutton').click(continueParse);
  };

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

      if(selectedNode && localStorage['slrdfareturn']) {
        var newItemSet = localStorage['slrdfareturn'].replace(/,/g, '<br>');
        if (this.stateLabel() === newItemSet) {
          builtDFA.addEdge(selectedNode, this, {weight: localStorage['slrdfasymbol']});
          builtDFA.layout();
          jsav.umsg("Build the DFA.");
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
        console.log(next);
        console.log(next._stateLabel);
        var modelItems = next._stateLabel.element[0].innerHTML.split('<br>');
        var builtItems = this.stateLabel().split('<br>');
        var inter = _.intersection(modelItems, builtItems);
        if (inter.length === modelItems.length && inter.length === builtItems.length) {
          checkNode = next;
          break;
        } 
      }
      var edges = checkNode.getOutgoing();
      for (var i = 0; i < edges.length; i++) {
        var w = edges[i].weight().split('<br>');
        if (w.indexOf(pr) !== -1) {
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

  // click handler for the DFA graph window
  var graphHandler = function (e) {
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
      if(selectedNode && localStorage['slrdfareturn']) {
        var newItemSet = localStorage['slrdfareturn'].replace(/,/g, '<br>');
        var newItemSetArr = newItemSet.split('<br>');
        var nodes = builtDFA.nodes();
        for (var next = nodes.next(); next; next = nodes.next()) {
          var sla = next.stateLabel().split('<br>');
          var inter = _.intersection(sla, newItemSetArr);
          if (inter.length === sla.length && inter.length === newItemSetArr.length) {
            alert('The node already exists!');
            return;
          }
        }
        var newNode = builtDFA.addNode(),
            nodeX = newNode.element.width()/2.0,
            nodeY = newNode.element.height()/2.0;
        $(newNode.element).offset({top: e.pageY - nodeY, left: e.pageX - nodeX});
        newNode.stateLabel(newItemSet);
        builtDFA.addEdge(selectedNode, newNode, {weight: localStorage['slrdfasymbol']});
        builtDFA.layout();
        jsav.umsg("Build the DFA.");
        selectedNode.unhighlight();
        selectedNode = null;
      }
    }
  };

  // SLR(1) parsing
  var slrParse = function () {
    var productions = _.map(_.filter(arr, function(x) { return x[0]}), function(x) {return x.slice();});
    var v = {};
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
    var tv = t.concat(v);
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
        //console.log(""+nextItems);
        if (nextItems.length > 0) {
          var nodes = modelDFA.nodes();
          var toNode = null;
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
    var pDict = {};
    // a dictionary mapping left sides to right sides
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
    var firsts = {};
    for (var i = 0; i < v.length; i++) {
      firsts[v[i]] = first(v[i], pDict, derivers).sort();
    }
    // for (key in firsts) {
    //   console.log(key+":"+firsts[key]);
    // }
    var follows = {};
    for (var i = 0; i < v.length; i++) {
      follows[v[i]] = follow(v[i], productions, pDict, derivers).sort();
    }
    // for (key in follows) {
    //   console.log(key +":" + follows[key])
    // }
    pDict["S'"] = productions[0][0];
    if (productions[0][0] in derivers) {
      derivers["S'"] = true;
    }
    productions.unshift(["S'", arrow, productions[0][0]]);

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
    ffDisplay = [];
    ffDisplay.push(["", "FIRST", "FOLLOW"]);
    for (var i = 0; i < v.length; i++) {
      var vv = v[i];
      ffDisplay.push([vv, "", ""]);
    }
    jsav.umsg('Define FIRST sets. ! is the lambda character.');
    ffTable = new jsav.ds.matrix(ffDisplay, {left: "30px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
    arrayStep = 1;
    
    ffTable.click(firstFollowHandler);
    $('#followbutton').click(function () {
      var check = continueToFollow(firsts, follows);
      if (check) {
        $('#slrdfabutton').show();
      }
    });
    // check FOLLOW sets and initialize the DFA
    var continueToDFA = function () {
      $('#firstinput').remove();
      var incorrect = checkTable(firsts, follows);
      if (incorrect.length > 0) {
        var confirmed = confirm('The following sets are incorrect: ' + incorrect + '.\nFix automatically?');
        if (confirmed) {
          for (var i = 1; i < ffTable._arrays.length; i++) {
            var a = ffTable._arrays[i].value(0);
            ffTable.value(i, 2, follows[a]);
          }
        } else {
          return;
        }
      }
      $(ffTable.element).off();
      $('#slrdfabutton').hide();
      $('#parsetablebutton').show();
      jsav.umsg('Build the DFA.');
      //modelDFA.hide();
      builtDFA = jsav.ds.fa({width: '90%', height: 440});
      builtDFA.click(dfaHandler);
      $('.jsavgraph').click(graphHandler);
      $('#av').append($('#dfabuttons'));
      $('#dfabuttons').show();
      var pr = confirm("Would you like to define the initial set yourself?");
      if (pr) {
        localStorage['slrdfaproductions'] = _.map(productions, function(x) {return x.join('');});
        localStorage['slrdfasymbol'] = 'initial';
        window.open('slrGoTo.html', '', 'width = 800, height = 750, screenX = 300, screenY = 25');
        $('#dfabuttons').append("<input type='button' id='addinitialbutton' value='Add Initial'>");
        jsav.umsg("Add the initial node.");
        $('#addinitialbutton').click(function() {
          if (localStorage['slrdfareturn']) {
            var builtInitial = builtDFA.addNode({left: 50, top: 50});
            builtDFA.makeInitial(builtInitial);
            builtInitial.stateLabel(localStorage['slrdfareturn'].replace(/,/g, '<br>'));
            builtDFA.layout();
            $('#addinitialbutton').remove();
            localStorage.removeItem('slrdfareturn');
            jsav.umsg('Build the DFA.');
          }
        });
      } else {
        var builtInitial = builtDFA.addNode({left: 50, top: 50});
        builtDFA.makeInitial(builtInitial);
        builtInitial.stateLabel(modelDFA.initial._stateLabel.element[0].innerHTML);
        builtDFA.layout();
      }
    };
    $('#slrdfabutton').click(continueToDFA);

    // check DFA and transition to the parse table
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
      if (tCount1 !== tCount2 || modelDFA.nodeCount() !== builtDFA.nodeCount() || !correctFinals) {
        var confirmed = confirm('Not finished!\nFinish automatically?');
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
      jsav.umsg('Fill entries in parse table. ! is the lambda character.');
      var pTableDisplay = [];
      pTableDisplay.push([""].concat(tv));
      for (var i = 0; i < modelDFA.nodeCount(); i++) {
        var toPush = [i];
        for (var j = 0; j < parseTable[i].length; j++) {
          toPush.push('');
        }
        pTableDisplay.push(toPush);
        //pTableDisplay.push([v[i]].concat(parseTable[i]));
      }
      //jsav.label('Grammar', {relativeTo: m, anchor: "center top", myAnchor: "center bottom"});
      parseTableDisplay = new jsav.ds.matrix(pTableDisplay);
      for (var i = 1; i < parseTableDisplay._arrays.length; i++) {
        parseTableDisplay._arrays[i].click(parseTableHandler);
      }
    };
    $('#parsetablebutton').click(continueToParseTable);
    $('#parsereadybutton').click(function() {
      checkParseTable(parseTableDisplay, parseTable);
    });

    var continueParse = function () {
      var inputString = prompt('Input string');
      if (inputString === null) {
        return;
      }
      startParse();
      var pTableDisplay = [];
      pTableDisplay.push([""].concat(tv));
      for (var i = 0; i < modelDFA.nodeCount(); i++) {
        pTableDisplay.push([i].concat(parseTable[i]));
      }
      //parseTableDisplay = new jsav.ds.matrix(pTableDisplay, {left: "30px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
      $(m.element).css("margin-left", "auto");
      $(m.element).css("margin-top", "0px");
      parseTableDisplay = new jsav.ds.matrix(pTableDisplay);
      parseTree = new jsav.ds.graph({layout: "layered", directed: true});
      parseTree.element.addClass('parsetree');
      var remainingInput = inputString + '$';
      var parseStack = [0];
      var currentRow = 0;
      var accept = false;
      var displayOrder = [];
      jsav.umsg(remainingInput + ' | ' + productions[1][0]);
      
      jsav.displayInit();
      // modelDFA.hide();
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
        var lookAhead = tv.indexOf(remainingInput[0]);
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
        if (entry[0] === 's') {
          var term = parseTree.addNode(remainingInput[0]);
          term.addClass('terminal');
          parseStack.push(term);
          displayOrder.push(term);
          currentRow = Number(entry.substring(1));
          parseStack.push(currentRow);
          remainingInput = remainingInput.substring(1);
          parseTree.layout();
        } else if (entry[0] === 'r') {
          var pIndex = Number(entry.substring(1));
          var p = productions[pIndex];
          m.highlight(pIndex - 1);
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
          //console.log(n)
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
            // console.log(newItem);
            // console.log(""+itemsStack);
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
    //$('#transformations').hide();
    $('#transformbutton').hide();
    $('.jsavcontrols').show();
    $('#backbutton').show();
    $('#bfpbutton').hide();
    $('#llbutton').hide();
    $('#slrbutton').hide();
    $(m.element).css("margin-left", "50px");
    m._arrays[lastRow].hide();
  };
  var endParse = function () {
    if (parseTree) {parseTree.clear();}
    if (derivationTable) { derivationTable.clear();}
    if (ffTable) { ffTable.clear();}
    if (parseTableDisplay) { parseTableDisplay.clear();}
    if (modelDFA) { modelDFA.clear();}
    if (builtDFA) { builtDFA.clear();}
    if (tGrammar) { tGrammar.clear();}
    $('button').show();
    //$('#transformations').show();
    $('#transformbutton').show();
    $('.jsavcontrols').hide();
    $('#backbutton').hide();
    $('.parsingbutton').hide();
    $(m.element).css("margin-left", "auto");
    m._arrays[lastRow].show();
    $('.jsavmatrix').addClass("editMode");
  };

  var replaceCharAt = function (str, index, ch) {
    if (index < 0 || index > str.length - 1) {
      return str;
    } else {
      return str.substring(0, index) + ch + str.substring(index + 1);
    }
  };

  var findFirstsAndFollows = function (productions, firsts, follows, v, pDict, lambdaVars) {
    for (var i = 0; i < v.length; i++) {
      firsts[v[i]] = first(v[i], pDict, lambdaVars).sort();
    }
    // for (var i in firsts) {
    //   console.log(i + ":" + firsts[i]);
    // }
    for (var i = 0; i < v.length; i++) {
      follows[v[i]] = follow(v[i], productions, pDict, lambdaVars).sort();
    }
    // console.log('follow');
    // for (var i in follows) {
    //   console.log(i + ":" + follows[i]);
    // }
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
            //console.log(nextSymbol);
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
  // transformations (automatic)

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
      alert('The start variable derives lambda');
    }
    var transformed = [];
    productions = _.filter(productions, function(x) { return x[2] !== emptystring;});
    transformed = transformed.concat(productions);
    for (var i = 0; i < productions.length; i++) {
      var p = productions[i];
      var v = _.uniq(_.filter(p[2], function(x) { return x in derivers;}));  // remove lambda productions
      if (v.length > 0) {
        v = v.join('');
        for (var j = v.length - 1; j >= 0; j--) {
          // remove all combinations of lambda-deriving variables
          var n = getCombinations(v, j + 1);
          for (var next = n.next(); next.value; next = n.next()) {
            var regex = new RegExp('[' + next.value.join('') + ']','g');
            var replaced = p[2].replace(regex, "");
            if (replaced) {
              transformed.push([p[0], arrow, replaced]);
            }
          }
        }
      }
    }
    // for (var i = 0; i < transformed.length; i++) {
    //   console.log("" + transformed[i]);
    // }
    // arr = transformed;
    // lastRow = arr.length;
    // arr.push(["", arrow, ""]);
    // m = init();
    // $('.jsavmatrix').addClass('editMode');
    var ret = _.map(transformed, function(x) {return x.join('');});
    // localStorage['grammar'] = ret;
    // window.open('grammarTest.html', '');
    return ret;
  };

  // NOTE: this function is used during parsing as well
  var removeLambdaHelper = function (set, productions) {
    // a variable derives lambda if it directly produces lambda or if its right side is
    // composed only of lambda-deriving variables
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

  // creates a generator for the combinations of variables to remove
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
    })
    // for (var i = 0; i < productions.length; i++) {
    //   console.log(""+productions[i]);
    // }
    // console.log(productions.length);
    var ret = _.map(productions, function(x) {return x.join('');});
    // localStorage['grammar'] = ret;
    // window.open('grammarTest.html', '');
    return ret;
  };

  // finds a unit production and adds one of the replacement productions
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
      pDict[transformed[i][0]] = pDict[transformed[i][0]].concat(r);
    }
    var visited = {};
    visited[start] = true;
    // find reachable variables and map them in pDict
    findReachable(start, pDict, visited);
    // remove unreachable productions
    transformed = _.filter(transformed, function(x) { return x[0] === start || pDict[start].indexOf(x[0]) !== -1;});
    // for (var i = 0; i < transformed.length; i++) {
    //   console.log(""+transformed[i]);
    // }
    // console.log(transformed.length);
    var ret = _.map(transformed, function(x) {return x.join('');});
    // localStorage['grammar'] = ret;
    // window.open('grammarTest.html', '');
    return ret;
  };
  // finds a deriver
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

  var convertToChomsky = function () {
    var v = {};
    // find all the variables in the grammar
    var productions = _.map(_.filter(arr, function(x) { return x[0];}), function(x) { return x.slice();});
    for (var i = 0; i < productions.length; i++) {
      var x = productions[i];
      x[2] = x[2].split("");
      v[x[0]] = true;
      for (var j = 0; j < x[2].length; j++) {
        if (variables.indexOf(x[2][j]) !== -1) {
          v[x[2][j]] = true;
        }
      }
    }
    var tempVars = [];
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
    // break productions down into pairs of variables
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
    var newVariables = _.difference(variables.split(""), Object.keys(v));
    for (var i = 0; i < productions.length; i++) {
      var x = productions[i];
      x[2] = x[2].join(""); 
      //console.log(""+x);
    }
    var toExport = true;
    var ret =  _.map(productions, function(x) {return x.join('');});
    // localStorage['grammar'] = ret;
    //console.log(productions.length);

    // translate temporary variables for export
    // for (var i = 0; i < tempVars.length; i++) {
    //   if (i >= newVariables.length) {
    //     // alert('Too large to export!');
    //     toExport = false;
    //     break;
    //   } 
    //   var re = tempVars[i].replace(/[\(\)]/g, "\\$&");
    //   var regex = new RegExp(re, 'g');
    //   for (var j = 0; j < productions.length; j++) {
    //     productions[j][0] = productions[j][0].replace(regex, newVariables[i]);
    //     productions[j][2] = productions[j][2].replace(regex, newVariables[i]);
    //   }
    // }
    // var ret2;
    // if (toExport) {
      // ret2 = _.map(productions, function(x) { return x.join('');});
      // localStorage['grammar'] = _.map(productions, function(x) {return x.join('');});
      // window.open('grammarTest.html', '');
    // } 
    // else {
    //   // if there are too many variables to export, instead creates a table with the temporary variables
    //   window.open('npdaTable.html', '', 'width = 600, height = 625, screenX = 500, screenY = 25');
    // }
    return ret;
  };

  //=================================
  // transformations (interactive)

  // checks to see if a step should be skipped
  var checkTransform = function (strP, g) {
    var inter = _.intersection(strP, g);
    if (inter.length === strP.length && inter.length === g.length) {
      return true;
    }
    return false;
  };

  var transformGrammar = function () {
    var noLambda = removeLambda();
    var noUnit = removeUnit();
    var noUseless = removeUseless();
    var fullChomsky = convertToChomsky();

    var productions = _.map(_.filter(arr, function(x) { return x[0];}), function(x) { return x.slice();});
    var strP = _.map(productions, function(x) {return x.join('');});
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
    var transformed = noLambda;
    var tArr = [].concat(productions);
    tArr.push(["", arrow, ""]);
    var builtLambdaSet = [];
    var findLambdaHandler = function (index) {
      var vv = this.value(index, 0);
      var found = builtLambdaSet.indexOf(vv);
      if ((vv in derivers) && found === -1) {
        builtLambdaSet.push(vv);
        jsav.umsg(vv + ' added! Set that derives lambda: [' + builtLambdaSet + ']');
        if (builtLambdaSet.length === Object.keys(derivers).length) {
          m.element.off();
          continueLambda();
        }
      } else if (!(vv in derivers)) {
        jsav.umsg(vv + ' does not derive lambda. Set that derives lambda: [' + builtLambdaSet + ']');
      } else if (found !== -1) {
        jsav.umsg(vv + ' already selected! Set that derives lambda: [' + builtLambdaSet + ']');
      }
    };
    var removeLambdaHandler = function (index, index2) {
      if (this.value(index, 0)) {
        if (this.value(index, 2) === emptystring) {
          tArr.splice(index, 1);
          var tempG = jsav.ds.matrix(tArr);
          tGrammar.clear();
          tGrammar = tempG;
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
        //tGrammar = jsav.ds.matrix(tArr, {left: "50px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
        tGrammar.click(removeLambdaHandler);
      }
      if (tArr.length - 1 === transformed.length && !_.find(tArr, function(x){return x[2]===emptystring})) {
        var confirmed = confirm('Grammar completed; export?');
        if (confirmed) {
          localStorage['grammar'] = transformed;
          window.open('grammarTest.html', '');
        }
        arr = tArr;
        lastRow = arr.length - 1;
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
    var continueLambda = function () {
      jsav.umsg("Modify the grammar to remove lambdas. Set that derives lambda: [" + builtLambdaSet + ']');
      //$(m.element).css("margin-left", "50px");
      tGrammar = jsav.ds.matrix(tArr);
      //tGrammar = jsav.ds.matrix(tArr, {left: "50px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
      tGrammar.click(removeLambdaHandler);
    };
    m.click(findLambdaHandler);
    jsav.umsg("Removing &lambda;-productions: Select variables that derive lambda.");
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
    modelDFA = jsav.ds.graph({layout: "layered", directed: true});
    // modelDFA.css('display', 'inline-block')
    // m.element.css('display', 'inline-block')
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
    var removeUnitHandler = function (index, index2, e) {
      if (this.value(index, 0)) {
        if (this.value(index, 2).length === 1 && variables.indexOf(this.value(index, 2)) !== -1) {
          tArr.splice(index, 1);
          var tempG = jsav.ds.matrix(tArr);
          tGrammar.clear();
          tGrammar = tempG;
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
    var continueUnit = function () {
      jsav.umsg('Modify the grammar to remove unit productions.');
      tGrammar = jsav.ds.matrix(tArr);
      //tGrammar = jsav.ds.matrix(tArr, {top: "50px", relativeTo: modelDFA, anchor: "left bottom", myAnchor: "left top"});
      tGrammar.click(removeUnitHandler);
      //$('.jsavcanvas').height(modelDFA.element.height() + 150 + tGrammar.element.height());
    };
    jsav.umsg('Removing unit productions: Complete unit production visualization.');
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
    var builtDeriveSet = [];
    var findDeriveHandler = function (index) {
      var vv = this.value(index, 0);
      var found = builtDeriveSet.indexOf(vv);
      if ((vv in derivers) && found === -1) {
        builtDeriveSet.push(vv);
        jsav.umsg(vv + ' added! Variables that predicate terminals: [' + builtDeriveSet + ']');
        if (builtDeriveSet.length === Object.keys(derivers).length) {
          m.element.off();
          continueUseless();
        }
      } else if (!(vv in derivers)) {
        jsav.umsg(vv + ' does not predicate terminals. Variables that predicate terminals: [' + builtDeriveSet + ']');
      } else if (found !== -1) {
        jsav.umsg(vv + ' already selected! Variables that predicate terminals: [' + builtDeriveSet + ']');
      }
    };
    var removeUselessHandler = function (index, index2, e) {
      if (this.value(index, 0)) {
        if (noUseless.indexOf(this.value(index,0) + arrow + this.value(index,2)) === -1) {
          tArr.splice(index, 1);
          var tempG = jsav.ds.matrix(tArr);
          tGrammar.clear();
          tGrammar = tempG;
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
    //console.log(tCount);
    selectedNode = null;
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
      jsav.umsg('Complete dependency graph. Variables that predicate terminals: [' + builtDeriveSet + ']')
    };
    var continueUselessSecond = function () {
      jsav.umsg('Modify the grammar to remove useless productions.');
      tGrammar = jsav.ds.matrix(tArr);
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

    var tArr = [].concat(productions);
    // Right sides are arrays
    _.each(tArr, function(x) { x[2] = x[2].split('');});
    var varCounter = 1;

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
      for (var i = 0; i < r.length; i++) {
        if (variables.indexOf(r[i]) === -1) {
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
        //tGrammar = jsav.ds.matrix(_.map(tArr,function(x){return [x[0], x[1], x[2].join('')];}), {left: "50px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
        tGrammar.click(chomskyHandler);
        for (var i = 0; i < sliceIn.length + 1; i++) {
          tGrammar.highlight(index + i);
        }
      } else {
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
        var c = confirm('All productions completed.\nExport?');
        if (c) {
          attemptExport();
        }
        for (var i = 0; i < tGrammar._arrays.length; i++) {
          tGrammar.unhighlight(i);
        }
      }
    };
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
    //tGrammar = jsav.ds.matrix(_.map(tArr,function(x){return [x[0], x[1], x[2].join('')];}), {left: "50px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
    tGrammar.click(chomskyHandler);

    jsav.umsg('Converting to Chomsky Normal Form: convert productions of the grammar on the right.');
  };

  //=================================
  // conversions

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

  $('#convertRLGbutton').click(function () {
    if (!checkRightLinear()) {
      alert('The grammar is not right-linear!');
      return;
    }
    var productions=_.filter(arr, function(x) { return x[0];});
    localStorage['grammar'] = _.map(productions, function(x) {return x.join('');});
    window.open('RLGtoFA.html', '', 'width = 800, height = 750, screenX = 300, screenY = 25');
  });
  $('#convertCFGbutton').click(function () {
    var productions=_.filter(arr, function(x) { return x[0];});
    localStorage['grammar'] = _.map(productions, function(x) {return x.join('');});
    window.open('CFGtoNPDA.html', '', 'width = 800, height = 750, screenX = 300, screenY = 25');
  });
  //=================================
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
    jsav.umsg('Build the DFA.');
  });
  //=================================
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
    m = init();
    $('#firstinput').remove();
    $('#temp').remove();
    jsav.umsg('');
    $('button').show();
    //$('#transformations').show();
    $('#transformbutton').show();
    $('.jsavcontrols').hide();
    $('#backbutton').hide();
    $('.parsingbutton').off();
    $('.parsingbutton').hide();
    $(m.element).css("margin-left", "auto");
    $('.jsavmatrix').addClass("editMode");
  });
  $('#editbutton').click(editMode);
  $('#deletebutton').click(deleteMode);
  $('#bfpbutton').click(bfParse);
  $('#llbutton').click(llParse);
  $('#slrbutton').click(slrParse);
  // $('#lambdabutton').click(removeLambda);
  // $('#unitbutton').click(removeUnit);
  // $('#uselessbutton').click(removeUseless);
  // $('#chomskybutton').click(convertToChomsky);
  $('#transformbutton').click(transformGrammar);
}(jQuery));
