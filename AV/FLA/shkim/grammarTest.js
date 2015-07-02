(function ($) {
  var variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var jsav = new JSAV("av");
  var arrow = String.fromCharCode(8594),
      lastRow = 8,          // index of the last visible row
      arr = new Array(20),
      m,
      derivationTable,
      parseTableDisplay,
      parseTree,
      modelDFA;

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

    // remove lambda productions example:
    // arr[0] = ['S', arrow, 'EBCA'];
    // arr[1] = ['A', arrow, 'aAa'];
    // arr[2] = ['A', arrow, emptystring];
    // arr[3] = ['B', arrow, 'bB'];
    // arr[4] = ['B', arrow, emptystring];
    // arr[5] = ['C', arrow, 'B'];
    // arr[6] = ['D', arrow, 'AB']; 
    // arr[7] = ['E', arrow, 'a'];

    // remove unit productions example:
    // arr[0] = ['S', arrow, 'Aa'];
    // arr[1] = ['S', arrow, 'A'];
    // arr[2] = ['A', arrow, 'C'];
    // arr[3] = ['B', arrow, 'b'];
    // arr[4] = ['C', arrow, 'B'];
    // arr[5] = ['C', arrow, 'cCc'];
    //lastRow = 6;

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
    // lastRow = 9;

    // chomsky example:
    // arr[0] = ['S', arrow, 'ABAB'];
    // arr[1] = ['A', arrow, 'Aa'];
    // arr[2] = ['A', arrow, 'a'];
    // arr[3] = ['B', arrow, 'bb'];
    // lastRow = 4;

    // FIRST example:
    // arr[0] = ['S', arrow, 'BAc'];
    // arr[1] = ['A', arrow, 'Aa'];
    // arr[2] = ['A', arrow, 'a'];
    // arr[3] = ['B', arrow, 'AB'];
    // arr[4] = ['B', arrow, 'bB'];
    // arr[5] = ['B', arrow, 'd'];
    // lastRow = 6;

    // LL(1) example:
    // arr[0] = ['S', arrow, 'ABcC'];
    // arr[1] = ['A', arrow, 'aA'];
    // arr[2] = ['A', arrow, emptystring];
    // arr[3] = ['B', arrow, 'bbB'];
    // arr[4] = ['B', arrow, emptystring];
    // arr[5] = ['C', arrow, 'BA'];
    // lastRow = 6;

    // SLR(1) examples:
    // arr[0] = ['S', arrow, 'A'];
    // arr[1] = ['A', arrow, 'aaA'];
    // arr[2] = ['A', arrow, 'b'];
    // lastRow = 3;

    arr[0] = ['S', arrow, 'ABc'];
    arr[1] = ['A', arrow, 'Aa'];
    arr[2] = ['A', arrow, emptystring];
    arr[3] = ['B', arrow, 'BS'];
    arr[4] = ['B', arrow, 'b'];
    lastRow = 5;
  }
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
  
  var matrixClickHandler = function(index) {
    if ($('.jsavmatrix').hasClass('deleteMode') && index !== lastRow) {
      // recreates the matrix when deleting a row...
      arr.splice(index, 1);
      lastRow--;
      m = init();
      $('.jsavmatrix').addClass('deleteMode');
    } else if ($('.jsavmatrix').hasClass('editMode')) {
      this.highlight(index);
      var input1 = prompt('Left-hand side?', this.value(index, 0));
      if (input1 === null) {
        this.unhighlight(index);
        return;
      }
      var input2 = prompt('Right-hand side?', this.value(index, 2));
      if (input2 === null) {
        this.unhighlight(index);
        return;
      }
      if (input1 === "") {
        input1 = emptystring;
      }
      if (input2 === "") {
        input2 = emptystring;
      }
      this.value(index, 0, input1);
      arr[index][0] = input1;
      this.value(index, 2, input2);
      arr[index][2] = input2;
      this.unhighlight(index);
      if (index === lastRow) {
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
        m.layout();
      }
      //console.log(arr.length);
    }
  };
  m = init();
  $('.jsavmatrix').addClass("editMode");

  // parsing
  var bfParse = function () {
    jsav.umsg('Parsing');
    var inputString = prompt('Input string');
    if (inputString === null) {
      return;
    }
    startParse();
    $('#llbutton').hide();
    $('#slrbutton').hide();
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

  // LL(1)
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
    var pTableDisplay = [];
    pTableDisplay.push([""].concat(t));
    for (var i = 0; i < v.length; i++) {
      pTableDisplay.push([v[i]].concat(parseTable[i]));
    }
    
    var inputString = prompt('Input string');
    if (inputString === null) {
      return;
    }
    startParse();
    $('#bfpbutton').hide();
    $('#slrbutton').hide();
    //jsav.label('Grammar', {relativeTo: m, anchor: "center top", myAnchor: "center bottom"});
    parseTableDisplay = new jsav.ds.matrix(pTableDisplay, {left: "30px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
    //jsav.label('Derivation Table', {relativeTo: derivationTable, anchor: "center top", myAnchor: "center bottom"});
    
    var remainingInput = inputString + '$';
    jsav.umsg('<mark>' + remainingInput[0] + '</mark>' + remainingInput.substring(1) + ' | <mark>' + productions[0][0] + '</mark>');
    jsav.displayInit();
    parseTree = new jsav.ds.tree();
    //parseTree = new jsav.ds.tree({left: "30px", relativeTo: derivationTable, anchor: "right top"});

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

  // SLR(1)
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
    var inputString = prompt('Input string');
    if (inputString === null) {
      return;
    }
    startParse();
    $("#llbutton").hide();
    $("#bfpbutton").hide();

    // build DFA to model the parsing stack
    modelDFA = jsav.ds.fa({width: '45%', height: 440, layout: 'automatic'});
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
    // var firsts = {};
    // for (var i = 0; i < v.length; i++) {
    //   firsts[v[i]] = first(v[i], pDict, derivers).sort();
    // }
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
    var pTableDisplay = [];
    pTableDisplay.push([""].concat(tv));
    for (var i = 0; i < modelDFA.nodeCount(); i++) {
      pTableDisplay.push([i].concat(parseTable[i]));
    }
    //parseTableDisplay = new jsav.ds.matrix(pTableDisplay, {left: "30px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
    parseTableDisplay = new jsav.ds.matrix(pTableDisplay);
    parseTree = new jsav.ds.graph({layout: "layered", directed: true});
    parseTree.element.addClass('parsetree');
    jsav.displayInit();
    modelDFA.hide();
    m.hide();
    parseTableDisplay.hide();
    var remainingInput = inputString + '$';
    var parseStack = [0];
    var currentRow = 0;
    var accept = false;
    var displayOrder = [];
    counter = 0;
    while (true) {
      counter++;
      if (counter > 500) {
        console.warn(counter);
        break;
      }
      var lookAhead = tv.indexOf(remainingInput[0]);
      var entry = parseTable[currentRow][lookAhead];
      if (!entry) {
        break;
      } 
      if (entry === 'acc') {
        accept = true;
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
        parseStack.push(par);
        displayOrder.push(par);
        currentRow = parseTable[n][tv.indexOf(p[0])];
        parseStack.push(currentRow);
        parseTree.layout();
      }
      jsav.step();
    }
    if (accept) {
      jsav.umsg('"' + inputString + '" accepted');
    } else {
      jsav.umsg('"' + inputString + '" rejected');
    }
    jsav.recorded();
  };
  var addClosure = function (items, productions) {
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

  var startParse = function () {
    if (parseTree) {
      parseTree.clear();
      jsav.clear();
      jsav = new JSAV("av");
      m = init();
    }
    if (derivationTable) { derivationTable.clear();}
    if (parseTableDisplay) { parseTableDisplay.clear();}
    if (modelDFA) { modelDFA.clear();}
    $(".jsavmatrix").removeClass('editMode');
    $(".jsavmatrix").removeClass('deleteMode');
    $("#mode").html('');
    $('#editbutton').hide();
    $('#deletebutton').hide();
    $('#convertRLGbutton').hide();
    $('#convertCFGbutton').hide();
    $('#transformations').hide();
    $('.jsavcontrols').show();
    $('#backbutton').show();
    $(m.element).css("margin-left", "50px");
    m._arrays[lastRow].hide();
  };
  var endParse = function () {
    if (parseTree) {parseTree.clear();}
    if (derivationTable) { derivationTable.clear();}
    if (parseTableDisplay) { parseTableDisplay.clear();}
    if (modelDFA) { modelDFA.clear();}
    $('button').show();
    $('#transformations').show();
    $('.jsavcontrols').hide();
    $('#backbutton').hide();
    $(m.element).css("margin-left", "auto");
    m._arrays[lastRow].show();
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
    $('.jsavmatrix').addClass("deleteMode");
    $('.jsavmatrix').removeClass("editMode");
    $("#mode").html('Deleting');
  };

  //=================================
  // transformations

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
    localStorage['grammar'] = _.map(transformed, function(x) {return x.join('');});
    window.open('grammarTest.html', '');
  };
  var removeLambdaHelper = function (set, productions) {
    // a variable derives lambda if it directly produces lambda or if its right side is
    // composed only of lambda-deriving variables
    // NOTE: this function is used during brute force parsing as well
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
  var getCombinations = function* (str, l) {
    // creates a generator for the combinations of variables to remove
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
    localStorage['grammar'] = _.map(productions, function(x) {return x.join('');});
    window.open('grammarTest.html', '');
  };
  var removeUnitHelper = function (productions, pDict) {
    // finds a unit production and adds one of the replacement productions
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
    localStorage['grammar'] = _.map(transformed, function(x) {return x.join('');});
    window.open('grammarTest.html', '');
  };
  var findDerivable = function (set, productions) {
    // finds a deriver
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
  var findReachable = function (start, pDict, visited) {
    // dfs on the dictionary
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
    localStorage['grammar'] = _.map(productions, function(x) {return x.join('');});
    //console.log(productions.length);

    // translate temporary variables for export
    for (var i = 0; i < tempVars.length; i++) {
      if (i >= newVariables.length) {
        alert('Too large to export!');
        toExport = false;
        break;
      } 
      var re = tempVars[i].replace(/[\(\)]/g, "\\$&");
      var regex = new RegExp(re, 'g');
      for (var j = 0; j < productions.length; j++) {
        productions[j][0] = productions[j][0].replace(regex, newVariables[i]);
        productions[j][2] = productions[j][2].replace(regex, newVariables[i]);
      }
    }
    if (toExport) {
      localStorage['grammar'] = _.map(productions, function(x) {return x.join('');});
      window.open('grammarTest.html', '');
    } else {
      // if there are too many variables to export, instead creates a table with the temporary variables
      window.open('npdaTable.html', '', 'width = 600, height = 625, screenX = 500, screenY = 25');
    }
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
  $('#backbutton').click(function () {
    if (parseTree) {
      parseTree.clear();
      jsav.clear();
      jsav = new JSAV("av");
      m = init();
    }
    if (derivationTable) { derivationTable.clear();}
    if (parseTableDisplay) { parseTableDisplay.clear();}
    if (modelDFA) { modelDFA.clear();}
    jsav.umsg('');
    $('button').show();
    $('#transformations').show();
    $('.jsavcontrols').hide();
    $('#backbutton').hide();
    $(m.element).css("margin-left", "auto");
  });
  $('#editbutton').click(editMode);
  $('#deletebutton').click(deleteMode);
  $('#bfpbutton').click(bfParse);
  $('#llbutton').click(llParse);
  $('#slrbutton').click(slrParse);
  $('#lambdabutton').click(removeLambda);
  $('#unitbutton').click(removeUnit);
  $('#uselessbutton').click(removeUseless);
  $('#chomskybutton').click(convertToChomsky);
}(jQuery));
