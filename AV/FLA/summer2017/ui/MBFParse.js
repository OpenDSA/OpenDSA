$(document).ready(function () {
  var variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var jsav = new JSAV("av");
  var arrow = String.fromCharCode(8594),
      lastRow,            // index of the last visible row (the empty row)
      arr,                // the grammar
      backup = null,      // a copy of the original grammar (as a string) before it is transformed
      m,                  // the grammar table
      derivationTable,    // the derivation table shown during brute-force parsing
      parseTableDisplay,  // the parse table
      parseTree,          // parse tree shown during parsing slideshows
      parseTable,         // parse table used for pasing
      ffTable,            // table for FIRST and FOLLOW sets
      type,               // type of parsing, can be bf, ll, slr
      grammars;           // stores grammar exercises, xml

  var lambda = String.fromCharCode(955);
  var productions = JSON.parse(localStorage.getItem('grammars'));
  m = jsav.ds.matrix(productions, {style: "table"});

  $('#helpbutton').click(displayHelp);
  $('#addinputbutton').click(addInput);
  $('#deleterowbutton').click(deleteRow);
  $('#runinputsbutton').click(runMultiInputs);
  $('#clearbutton').click(clearAll);
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

  function displayHelp(){
    alert(document.getElementById('helpInfo').innerHTML);
  }

  function addInput(){
  //a button for the user to add a row to input in the table for multiple brute force parsing
    var myTable = document.getElementById("table");
    var numRow = myTable.rows.length;
    $("#table").last().append("<tr><<td><div contenteditable id='input" + (numRow-1) + "'></div></td><td><output id='output" + (numRow-1) + "'></output></td></tr>");
  }

  function deleteRow(){
  //a button for the user to delete a row to input in the table for multiple brute force parsing
    var myTable = document.getElementById("table");
    var numRow = myTable.rows.length;
    if(numRow>2){
      document.getElementById("table").deleteRow(numRow-1);
    }
  }

  function clearAll(){
    window.location.href = "";
  }

  function runMultiInputs(){
  //allow user to run multiple inputs for multiple brute force parsing


    var myTable = document.getElementById('table');
    var numRow = myTable.rows.length;
    for (i = 0; i < numRow - 1; i++){
      var input = document.getElementById("input"+i).innerHTML;
      if(!(input == "")){
        if(input === "!"){
          document.getElementById("input"+i).innerHTML = lambda;
        }
        if(stringAccepted(input)[0]){
          document.getElementById("output"+i).value = "Accept";
          document.getElementById("output"+i).onclick = function(){
            var inputString = document.getElementById("input" + this.id.slice(-1)).innerHTML;
            displayTree(inputString);
          };
        }else{
          document.getElementById("output"+i).value = "Reject";
        }
      }
    }
  }

  // returns [true, next] if input is accepted from brute force parsing, [false, next] otherwise
  function stringAccepted(inputString){
    if(inputString === "!"){
      inputString = "";
    }
    var productions = JSON.parse(localStorage.getItem('grammars'));
    var table = {};   // maps each sentential form to the rule that produces it
    var sententials = [];
    var next;

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
    return [next === inputString, next];
  }

  var replaceCharAt = function (str, index, ch) {
    if (index < 0 || index > str.length - 1) {
      return str;
    } else {
      return str.substring(0, index) + ch + str.substring(index + 1);
    }
  };

  //display parse tree in multiple brute force parse page if clicked on the accepted input
  function displayTree(inputString){
    var productions = JSON.parse(localStorage.getItem("grammars"));
    jsav.umsg('Parsing');
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

    //if(stringAccepted(inputString)){
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
      // derivationTable = new jsav.ds.matrix(results, {left: "30px", relativeTo: m, anchor: "right top", myAnchor: "left top"});

      derivationTable = new jsav.ds.matrix(results, {style: "table"});
      // parseTree = new jsav.ds.tree({left: "30px", relativeTo: derivationTable, anchor: "right top"});
      parseTree = new jsav.ds.tree();
      temp = [parseTree.root(productions[0][0])];
      $("#bfpbutton").hide();

      console.log("derivation table: " + derivationTable);

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
    }
  }

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



    $('#deleterowbutton').hide();
    $('#addinputbutton').hide();
    $('#runinputsbutton').hide();

    $('#clearbutton').hide();

    $('.jsavcontrols').show();
    if (type !== "ll" && type !== "slr") $('#backbutton').show();
    $('#bfpbutton').hide();
    $('#mbfpbutton').hide();

    $('#files').hide();

  }

  function removeLambdaHelper (set, productions) {
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

  // Function to fix all table column widths
  function layoutTable (mat, index) {
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

  // Function to lay out a single column width
  function layoutColumn (mat, index) {
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

  // Function to initialize/reinitialize the grammar display
  var init = function () {
    if (m) {
      m.clear();
    }
    var m2 = jsav.ds.matrix(productions, {style: "table"});
    // hide all of the empty rows
    for (var i = lastRow + 1; i < productions.length; i++) {
      m2._arrays[i].hide();
    }
    layoutTable(m2, 2);
    return m2;
  };

});
