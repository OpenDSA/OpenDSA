(function ($) {
  var variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var jsav = new JSAV("av");
  var arrow = "&rarr;",
      lastRow = 8,          // index of the last visible row
      arr = new Array(20),
      m,
      parseTable,
      parseTree;

  var lambda = String.fromCharCode(955),
      epsilon = String.fromCharCode(949),
      square = String.fromCharCode(9633),
      emptystring = lambda;
  if (localStorage["grammar"]) {
    arr = _.map(localStorage['grammar'].split(','), function(x) { 
      var d = x.split("&rarr;")
      d.splice(1, 0, arrow);
      return d;
    });
    lastRow = arr.length;
    arr.push(["", arrow, ""]);
  } else {
    for (var i = 0; i < arr.length; i++) {
      arr[i] = ["", arrow, ""];
    }
    arr[0] = ['S', arrow, 'aA'];
    arr[1] = ['S', arrow, 'bA'];
    arr[2] = ['S', arrow, 'aC'];
    arr[3] = ['A', arrow, 'B'];
    arr[4] = ['B', arrow, 'qvC'];
    arr[5] = ['C', arrow, 'x'];
    arr[6] = ['B', arrow, 'y'];
    arr[7] = ['A', arrow, emptystring];
  }
  var init = function () {
      var m2 = jsav.ds.matrix(arr, {style: "table"});
      for (var i = lastRow + 1; i < arr.length; i++) {
        m2._arrays[i].hide();
      }
      m2.addClass(lastRow, 0, "next");
      m2.addClass(lastRow, 2, "next");
      m2.layout();
      m2.on('click', matrixClickHandler);
      return m2;
  };
  
  var matrixClickHandler = function(index) {
    if ($('.jsavmatrix').hasClass('deleteMode') && index !== lastRow) {
      // recreates the matrix when deleting a row...
      arr.splice(index, 1);
      lastRow--;
      m.clear();
      m = jsav.ds.matrix(arr, {style: "table"});
      for (var i = lastRow + 1; i < arr.length; i++) {
        m._arrays[i].hide();
      }
      m.on('click', matrixClickHandler);
      m.layout();
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
        var self = this;
        if (lastRow === arr.length - 1) {
          var l = arr.length;
          for (var i = 0; i < l; i++) {
            arr.push(['', arrow, '']);
          }
          m.clear();
          m = jsav.ds.matrix(arr, {style: "table"});
          self = m;
          for (var i = lastRow + 1; i < arr.length; i++) {
            self._arrays[i].hide();
          }
          m.on('click', matrixClickHandler);
          $('.jsavmatrix').addClass('editMode');
        } 
        self._arrays[lastRow + 1].show();
        lastRow++;
        self.layout();
      }
      //console.log(arr.length);
    }
  };
  m = init();
  $('.jsavmatrix').addClass("editMode");

  var bfParse = function() {
    var inputString = prompt('Input string', 'aqvx');
    if (inputString === null) {
      return;
    }
    if (parseTree) {
      parseTree.clear();
      jsav.clear();
      jsav = new JSAV("av");
      m = init();
    }
    if (parseTable) { parseTable.clear();}
    $(".jsavmatrix").removeClass('editMode');
    $(".jsavmatrix").removeClass('deleteMode');
    $("#mode").html('');
    $('#editbutton').hide();
    $('#deletebutton').hide();
    $('#convertRLGbutton').hide();
    $('#convertCFGbutton').hide();
    $('.jsavcontrols').show();
    $('#backbutton').show();
    $(m.element).css("margin-left", "50px");
    m._arrays[lastRow].hide();

    var productions = _.filter(arr, function(x) { return x[0]});
    var table = {};
    var sententials = [];
    var next;
    
    for (var i = 0; i < productions.length; i++) {
      m._arrays[i].unhighlight();
    }

    for (var i = 0; i < productions.length; i++) {
      if (productions[i][0] === productions[0][0]) {
        sententials.push(productions[i][2]);
        table[productions[i][2]] = [i, ''];
      }
    }
    if (sententials.length === 0) {
      alert('There is no start variable');
      return;
    }
    var counter = 0;
    while (true) {
      counter++;
      if (counter > 5000) {
        console.warn("infinite loop (probably)");
        break;
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
          _.map(productions, function(x, k) { 
            if (x[0] === c) {
              var r = x[2];
              if (r === emptystring) {
                r = "";
              }
              var s = replaceCharAt(next, i, r);
              if (sententials.indexOf(s) === -1 && _.filter(s, function(x) {
                return variables.indexOf(x) === -1;
              }).length <= inputString.length) {
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
      var results = [];
      counter = 0;
      while (table[temp]) {
        counter++;
        if (counter > 500) {
          console.warn("infinite loop (probably)");
          break;
        }
        var rp = productions[table[temp][0]].join("");
        results.push([rp, temp]);
        temp = table[temp][1];
      }
      results.reverse();
      //jsav.label('Derivation Table');
      parseTable = new jsav.ds.matrix(results, {left: "30px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
      //jsav.label('Tree');
      parseTree = new jsav.ds.tree({left: "30px", relativeTo: parseTable, anchor: "right top"});
      temp = [parseTree.root(productions[0][0])];

      var displayOrder = [];
      for (var i = 0; i < results.length; i++) {
        var p = results[i][0];
        var n;
        var temp2;
        var rem;
        var d = [];
        for (var j = temp.length - 1; j >= 0; j--) {
          //console.log(temp[j].value());
          if (temp[j].value() === p[0].charAt(0)) {
            temp2 = temp[j];
            rem = j;
            break;
          }
        }
        temp.splice(rem, 1);
        for (var j = 7; j < p.length; j++) {
          var par = temp2.child(j - 7, p[j]).child(j-7)
          if (variables.indexOf(p[j]) !== -1) {
            temp.push(par);
          } 
          d.push(par);
        }
        displayOrder.push(d);
      }

      parseTree.layout();
      parseTree.root().hide();
      parseTree.root().show({recursive: false});
      for (var i = 0; i < results.length; i++) {
        parseTable._arrays[i].hide();
      }
      jsav.displayInit();
      for (var i = 0; i < results.length; i++) {
        jsav.step();
        for (var j = 0; j < m._arrays.length; j++) {
          m._arrays[j].unhighlight();
        }
        var val = parseTable.value(i, 1);
        m._arrays[table[val][0]].highlight();
        parseTable._arrays[i].show();
        var temp2 = displayOrder.shift();
        for (var j = 0; j < temp2.length; j++) {
          temp2[j].show({recursive: false});
        }
      }
      jsav.step();
      var leaves = getLeaves(parseTree.root());
      for (var j = 0; j < m._arrays.length; j++) {
          m._arrays[j].unhighlight();
        }
      for (var i = 0; i < leaves.length; i++) {
        leaves[i].highlight();
      }
      jsav.recorded();

    } else {
      jsav.umsg('"' + inputString + '" rejected');
      $('button').show();
      $('.jsavcontrols').hide();
      $('#backbutton').hide();
      $(m.element).css("margin-left", "auto");
      m._arrays[lastRow].show();
    }

  }; 

  var replaceCharAt = function (str, index, ch) {
    if (index < 0 || index > str.length-1) {
      return str;
    } else {
      return str.substring(0, index) + ch + str.substring(index + 1);
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

  var getLeaves = function(node) {
    var arr = [];
    if (node.childnodes == false) {
      return arr.concat(node);
    } else { 
      for (var i = 0; i < node.childnodes.length; i++) {
        arr = arr.concat(getLeaves(node.child(i)));
      }
      return arr;
    }
  };

  $('#editbutton').click(editMode);
  $('#deletebutton').click(deleteMode);
  $('#bfpbutton').click(bfParse);
  $('#convertRLGbutton').click(function () {
    var productions=_.filter(arr, function(x) { return x[0]});
    localStorage['grammar'] = _.map(productions, function(x) {return x.join('');});
    window.open('RLGtoFA.html', '', 'width = 800, height = 750, screenX = 300, screenY = 25');
  });
  $('#convertCFGbutton').click(function () {
    var productions=_.filter(arr, function(x) { return x[0]});
    localStorage['grammar'] = _.map(productions, function(x) {return x.join('');});
    window.open('CFGtoNPDA.html', '', 'width = 800, height = 750, screenX = 300, screenY = 25');
  });
  $('#backbutton').click(function () {
    if (parseTree) {
      parseTree.clear();
      jsav.clear();
      jsav = new JSAV("av");
      m = init();
    }
    if (parseTable) { parseTable.clear();}
    jsav.umsg('');
    $('button').show();
    $('.jsavcontrols').hide();
    $('#backbutton').hide();
    $(m.element).css("margin-left", "auto");
  });

}(jQuery));