$(document).ready(function () {
  var variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var jsav = new JSAV("av");
  var inputString,
      startSymbol,
      productions,
      fi,
      oldrow,
      oldcol,
      tableState = true, //boolean value, true if table is not flipped (triangle's 90 degree angle on upperleft corner), false if flipped
      finalrow, //depending on the table, this value could either be inputString.length-1, or 0 (if the table is flipped upside down)
      table, //table with the answer
      userTable, //has the same value as jsavParseTable, but just for backend use
      jsavParseTable, //table that the user could see and input
      tableWidth = 380,
      currentStep = 0; //for the step function

  var arrow = String.fromCharCode(8594),
      lambda = String.fromCharCode(955),
      epsilon = String.fromCharCode(949),
      square = String.fromCharCode(9633),
      dot = String.fromCharCode(183),
      emptystring = lambda;


  var productions = JSON.parse(localStorage.getItem('grammars'));
  startSymbol = productions[0][0];
  var grammars = jsav.ds.matrix(productions, {style: "table"});
  grammars.layout();

  function enterInput() {
    inputString = prompt('Input string');
    if (inputString !== null) {
      var jsavArry = jsav.ds.array(inputString.split(''));
      jsavArry.layout();
      jsavArry.css({"width": tableWidth});
      jsavArry.css({"min-height": "0px"});
      jsavArry.css({"height": "30px"})
      cykParse();
    }MCB, room 122
  };

  function cykParse() {
    if (productions.length === 0) {
      alert('No grammar.');
      return;
    }
    jsav.umsg('Please input your answer');
    var inputLength = inputString.length;
    var nonterminals = getNonTerminals();
    var terminals = getTerminals();
    finalrow = inputLength - 1;

    //initialize the 2d (3d) array
    // var table = new Array(inputLength);
    // for (var s = 0; s < inputLength; s++) {
    //   table[s] = new Array(inputLength);
    //   for(var i = 0; i < nonterminals.size; i++){
    //     table[s][i] = new Array(nonterminals.size);
    //   }
    // }

    //table will be the one with the correct answer, while userTable will be used for user to input, 
    table = new Array(inputLength);
    userTable = new Array(inputLength);
    for (var s = 0; s < inputLength; s++) {
      table[s] = new Array(inputLength-s);
      userTable[s] = new Array(inputLength-s);
      for(var i = 0; i < inputLength-s; i++){
        table[s][i] = new Array();
        userTable[s][i] = new Array();
      }
    }

    var unitProductions = _.filter(productions, function(x) {
      return x[2].length === 1 && variables.indexOf(x[2]) === -1;
    });
    //the first row, unit productions
    for (var s = 0; s < inputLength; s++) {
      unitProductions.forEach(function(production) {
        if(production[2] == inputString.charAt(s)){
          table[0][s].push(production[0]);
        }
      });
    }
    var otherProductions = _.filter(productions, function(x) {
      return x[2].length === 2;
    });
    for (var l = 2; l <= inputString.length; l++) { //l is length of the span
      for (var s = 0; s <= inputString.length - l; s++) {  //s is the start of the span
        e = s + l - 1; //e is the end of the span
        for (var p = s; p <= e - 1; p++) { //p is where the partition is
            otherProductions.forEach(function(production) {
              // other productions are in the form of A -> BC
              var A = production[0];
              var B = production[2].charAt(0);
              var C = production[2].charAt(1);
              if(table[p-s][s].includes(B) && table[l-p+s-2][p+1].includes(C)) {
                if(!table[l-1][s].includes(A)){
                  table[l-1][s].push(A);
                }
              }
            });
        }
      }
    }

    initCYKParseTable(userTable);
    checkAcceptance(table);
  };

  function checkAcceptance(table) {
    //As long as the finalrow contains the starting state, the string is accepted
    if(table[finalrow][0].includes(startSymbol)) {
      alert('Input accepted');
    }else{
      alert('Input not accpeted');
    }
  };

  //initialize the parsetable
  var initCYKParseTable = function (table) {
      jsavParseTable = jsav.ds.matrix(table);
      layoutCYKParseTable();
      jsavParseTable.on('click', cykParseTableHandler);
  };

  //a special layout function for CYK parse table, shows only half of the matrix.
  function layoutCYKParseTable() {
    jsavParseTable.layout();
    for (var i = 0; i < jsavParseTable._arrays.length; i++) {
      var arry = jsavParseTable._arrays[i].element;
      arry.css({"width": tableWidth}); //the width is currently hardcoded to ensure left align, need to change in the future
    }
  };
  
  //Set the values of the parse table accourding to the argument, instead of creating a new matrix
  function setCYKParseTable(table) {
    for(var r = 0; r < table.length; r++){
      for(var c = 0; c < table[r].length; c++){
        jsavParseTable._arrays[r].value(c, table[r][c]);
      }
    }
  };

  //flip the table and userTable, not the JSAV one
  function flipTable() {
    var tempTable = new Array(inputString.length);
    var tempUserTable = new Array(inputString.length);

    for(var r = 0; r < table.length; r++) {
      tempTable[table.length-r-1] = table[r];
      tempUserTable[table.length-r-1] = userTable[r];
    }

    table = tempTable;
    userTable = tempUserTable;
    jsavParseTable.clear();
    initCYKParseTable(userTable);
    //if not flipped (tableState is true), then flip it
    if(tableState){
      tableState = false;
      finalrow = 0;
      checkAnswerFromTo(inputString.length - currentStep, inputString.length - 1);
    }else{
      tableState = true;
      finalrow = inputString.length-1;
      checkAnswerFromTo(0, currentStep - 1);
    }

  };


  //for user interactions
  var cykParseTableHandler = function(row, col) {
      if (fi) {
        var input = fi.val();
        //If user didn't input anything, and there already exists info in that cell, do nothing
        if (input === "" && userTable[oldrow][oldcol].length > 0) {
           input = userTable[oldrow][oldcol];
        }
        fi.remove();
        //String coercion, convert input to string before split
        input = input + '';
        var inputArry = input.split(',');
        jsavParseTable.value(oldrow, oldcol, inputArry);
        userTable[oldrow][oldcol] = inputArry;
        layoutCYKParseTable(jsavParseTable);
        checkAnswer(oldrow, oldcol);
      }

      var offset = jsavParseTable._arrays[row]._indices[col].element.offset();
      var topOffset = offset.top;
      var leftOffset = offset.left;
      $('#firstinput').remove();
      var createInput = "<input type='text' id='firstinput' onfocus='this.value = this.value;'>";
      $('body').append(createInput);
      fi = $('#firstinput');
      fi.offset({top: topOffset, left: leftOffset});
      fi.outerHeight($('.jsavvalue').height());
      fi.width($(jsavParseTable._arrays[row]._indices[col].element).width());
      fi.focus();

      //need these in order to update the table correctly
      oldrow = row;
      oldcol = col;

  };

  //check the user input against the answer from a smaller row number to a bigger row number (inclusive);
  function checkAnswerFromTo(smallerRow, biggerRow) {
  	for(var r = smallerRow; r <= biggerRow; r++ ){
  		checkAnswerInRow(r);
  	}
  };

  //check the user input against the answer in a specific row
  function checkAnswerInRow(row) {
  	for(var col = 0; col < userTable[row].length; col++){
  		checkAnswer(row, col);
  	}
  }

  //check the user input against the answer at a specific index
  function checkAnswer(row, col) {
    if(!checkAnswerHelper(row, col)){
      jsavParseTable._arrays[row].css([col], {"color": "red", "background-color": "#eee", "background-image": "url(texturedbackground.jpg)"});
    } else {
      jsav.umsg('Please continue to input your answer');
      jsavParseTable._arrays[row].css([col], {"color": "green", "background-color": "#ffffff", "background-image": "none"});
      if(table[finalrow][0].includes(startSymbol) && checkAnswerHelper(finalrow, 0)) {
        jsav.umsg('Accepted!');
      }
    }
  };
  function checkAnswerHelper(row, col) {
    //Need two for loops to check both directions
    for(var i = 0; i < table[row][col].length; i++){
      if(!jsavParseTable.value(row, col).includes(table[row][col][i])){
        return false;
      }
    }
    for(var i = 0; i < jsavParseTable.value(row,col).length; i++){
      if(jsavParseTable.value(row,col)[i] == ''){
      	continue;
      }
      if(!table[row][col].includes(jsavParseTable.value(row,col)[i])){
        return false;
      }
    }
    return true;
  };

  //return a set of unique terminals on the right side
  function getTerminals() {
    // var productions = _.filter(arr, function(x) { return x[0]});
    var set = new Set();
    for (var i = 0; i < productions.length; i++) {
      var rhs = productions[i][2];
      for(var k = 0; k < rhs.length; k++){
        if(variables.indexOf(rhs.charAt(k)) === -1 && !(set.has(rhs.charAt(k)))) {
          set.add(rhs.charAt(k));
        }
      }
    }
    return set;
  };

  //return a set of unique variables (non-terminals) on the left side
  function getNonTerminals() {
    // var productions = _.filter(arr, function(x) { return x[0]});
    var set = new Set();
    for (var i = 0; i < productions.length; i++) {
      var lhs = productions[i][0];
      for(var k = 0; k < lhs.length; k++){
        if(variables.indexOf(lhs.charAt(k)) !== -1 && !(set.has(lhs.charAt(k)))) {
          set.add(lhs.charAt(k));
        }
      }
    }
    return set;
  };


  // fired when document is clicked
  // saves current fi input value
  function defocus(e) {
    if ($(e.target).hasClass("jsavvaluelabel")) return;
    if ($(e.target).attr('id') == "firstinput") return;
    if (!fi || !fi.is(':visible')) return;
    var input = fi.val();
    //String coercion, convert input to string before split
    input = input + '';
    var inputArry = input.split(',');
    //If user didn't input anything, and there already exists info in that cell, do nothing
    if (input === "" && userTable[oldrow][oldcol].length > 0) {
      input = userTable[oldrow][oldcol];
    }
    fi.remove();
    jsavParseTable.value(oldrow, oldcol, inputArry);
    userTable[oldrow][oldcol] = inputArry;
    layoutCYKParseTable(jsavParseTable);
    checkAnswer(oldrow, oldcol);
  };

  function completeCYKTable(){
  	for(var i = 0; i < table.length; i++){
  		userTable[i] = table[i].slice();
  	}
    setCYKParseTable(userTable);
    for(var row = 0; row < table.length; row++) {
    	checkAnswerInRow(row);
    }
  };

  function step(){
    // adjustedStep to adjust for flipped table;
    var adjustedStep = currentStep;
    if(!tableState){
      adjustedStep = inputString.length - currentStep - 1;
    }
    if(currentStep < table.length){
      userTable[adjustedStep] = table[adjustedStep].slice();
      setCYKParseTable(userTable);
      checkAnswerInRow(adjustedStep);
      currentStep++;
    }
  };


//////////////////////////////////////////
// Animation Stuff

  var timerID;
  var counter;

  //click a cell, then click the animate button
  function animate() {
    // $('.jsavcontrols').show();
    var i = 0;
    //this setInterval has to put function(){} to make it work
    timerID = setInterval(function() {animationHelper();}, 1000);
  };

  function animationHelper() {
    if(counter === undefined) {
      counter = 0;
    }
    //for normal unflipped table
    var row1 = counter;
    var row2 = oldrow-counter-1;
    //if table is flipped
    if(!tableState){
      row1 = inputString.length-1-counter;
      row2 = oldrow+counter+1;
    }
    //two conditions, one for flipped table
    if((tableState && (counter >= oldrow)) || (!tableState && (row2 >= inputString.length))){
      unhighlightPrevious();
      counter = 0;
      clearInterval(timerID);
    }else{
      //if previously highlighted other cells, unhighlight them
      if(counter >= 1){
        unhighlightPrevious();
      }
      jsavParseTable.highlight(row1, oldcol);
      jsavParseTable.highlight(row2, oldcol+counter+1);
      counter++;
    };

    function unhighlightPrevious() {
      var prevRow1 = row1-1;
      var prevRow2 = row2+1;
      //if table is flipped
      if(!tableState){
        prevRow1 = row1+1;
        prevRow2 = row2-1;
      }
      jsavParseTable.unhighlight(prevRow1, oldcol);
      jsavParseTable.unhighlight(prevRow2, oldcol+counter);
    }
  };
  

/////////////////////////////////////////////
// Derivation stuff

  function Node(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  };

  var treeRoot = new Node();
  var derivationArry = new Array();
  var jsavTree;

  function getDerivation() {
    jsav.umsg('Click the control buttons to see the derivation tree');
    $('.jsavcontrols').show();
    jsavParseTable.hide();

    treeRoot.value = startSymbol;
    getDerivationHelper(startSymbol, inputString.length-1, 0, treeRoot);

    jsavTree = jsav.ds.binarytree();
    jsavTree.root(startSymbol);
    jsavTree.layout();
    traverseBF(treeRoot);
    jsav.recorded();
  };

  //Traverse the tree in breadth first
  function traverseBF(treeRoot) {
    //Array serves as queue, unshift is enqueue, pop is dequeue
    var q = new Array();
    var jsavQ = new Array();
    q.unshift(treeRoot);
    jsavQ.unshift(jsavTree.root());
    while (q.length > 0) {
      var node = q.pop();
      var jsavNode = jsavQ.pop();
      if(node.left === null && node.right === null){
        continue;
      }
      if(node.left != null){
        jsavNode.left(node.left.value);
        jsavQ.unshift(jsavNode.left());
        q.unshift(node.left);
      }
      if(node.right === null){
        jsavNode.right(0).hide();
        jsavNode.left().highlight();
      }else {
        jsavNode.right(node.right.value);
        jsavQ.unshift(jsavNode.right());
        q.unshift(node.right);
      }
      jsavTree.layout();
      jsav.step();
    }
  }


  //Build the derivation tree in preorder traversal (root, left, right) 
  function getDerivationHelper(nonterminal, currentRow, currentCol, currentNode) {
    //base case, currentRow is 0, meaning it includes terminal
    if(currentRow === 0){
      //push the nonterminal and the terminal to the arry
      currentNode.value = nonterminal;
      derivationArry.push(nonterminal);
      currentNode.left = new Node(inputString.charAt(currentCol));
      derivationArry.push(inputString.charAt(currentCol));
      return;
    }
    //else, push the nonterminals
    for(var i = 0; i < productions.length; i++) {
      // find the productions with the nonterminal we want
      if(productions[i][0][0] == nonterminal){
        for(var r = 0; r < currentRow; r++){
          if(table[r][currentCol].includes(productions[i][2][0]) 
            && table[currentRow-r-1][currentCol+r+1].includes(productions[i][2][1])) {
            //root
            currentNode.value = nonterminal;
            currentNode.left = new Node();
            currentNode.right = new Node();
            derivationArry.push(nonterminal);
            //left
            getDerivationHelper(productions[i][2][0], r, currentCol, currentNode.left);
            //right
            getDerivationHelper(productions[i][2][1], currentRow-r-1, currentCol+r+1, currentNode.right);
            return;
          }
        }
      }
    }
  };


////////////////////////////////////////////////

  $('#inputbutton').click(enterInput);
  $('#completebutton').click(completeCYKTable);
  $('#stepbutton').click(step);
  $('#animatebutton').click(animate);
  $('#flipbutton').click(flipTable);
  $('#derivationbutton').click(getDerivation);

  $("#help").dialog({autoOpen: false});
  $("#helpbutton").click(function() {
    $("#help").dialog({
      dialogClass: "alert",
      width: 300,
      height: 100
    });
    $("#help").dialog("open");
  });

  $(document).click(defocus);



});
