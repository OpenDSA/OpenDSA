var latexit = "http://latex.codecogs.com/svg.latex?";
var arr;
$(document).ready(function () {
  "use strict";
  var variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var jsav = new JSAV("av");
  var arrow = String.fromCharCode(8594),
      lastRow,            // index of the last visible row (the empty row)
      //arr,                // the grammar
      backup = null,      // a copy of the original grammar (as a string) before it is transformed
      m,                  // the grammar table
      type = $("h1").attr('id'),               // type of parsing, can be bf, ll, slr
      grammars,           // stores grammar exercises, xml
      currentExercise = 0,// current exercise index
      multiple = false,   // if multiple grammar editing is enabled
      fi,                 // input box for matrix
      row,              // row number for input box
      col,              // column number for input box
      isCFG = false;    // if the input is CFG

  var parenthesis = "(";

  var lambda = String.fromCharCode(955),
      epsilon = String.fromCharCode(949),
      square = String.fromCharCode(9633),
      dot = String.fromCharCode(183),
      emptystring = lambda;
  /*
  If there is a grammar in local storage, load that grammar.
  This is used to import grammars from certain proofs.
  */
  //do not look at the storage if the editor is for an exercise
  if (type == null && localStorage["grammar"]) {
    // the grammar is saved as a string of a list of strings:
    // turn each production into an array containing the left side, arrow, and right side
    // arr = _.map(localStorage['grammar'].split(','), function(x) {
    //   var d = x.split(arrow);
    //   d.splice(1, 0, arrow);
    //   return d;
    // });
    arr = JSON.parse(localStorage.getItem("grammar"));
    lastRow = arr.length;
    // add an empty row for editing purposes (clicking the empty row allows the user to add productions)
    //arr.push(["S", arrow, "jZ"]);
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
    if(type !== "transformation")
      m2.on('click', matrixClickHandler);
    return m2;
  };

  // handler for grammar editing
  var matrixClickHandler = function(index, index2) {
    console.log("row: " + row + " index: " + index + " col: " + col + " index2: " + index2 + " fi: " + fi + " m: " + m + " arr: " + arr);

    // if ((row != index || col != index2) && fi) {

    if (fi) {
      var input = fi.val();
      var regex = new RegExp(emptystring, g);
      input = input.replace(regex, "");
      input = input.replace(regex, "!");
      if (input === "" && col == 2) {
        input = emptystring;
      }
      if (input === "" && col === 0) {
        alert('Invalid left-hand side.');
      }
      if (col == 2 && _.find(arr, function(x) { return x[0] == arr[row][0] && x[2] == input && arr.indexOf(x) !== row;})) {
        alert('This production already exists.');
      }
      fi.remove();
      m.value(row, col, input);
      arr[row][col] = input;
      layoutTable(m, 2);
    }
    if ($('.jsavmatrix').hasClass('deleteMode')) {
      if(index === 0){
        alert("Can't delete the last row");
        return;
      }
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
      focus(index, index2);
    } else if ($('.jsavmatrix').hasClass('addrowMode')) {
      addRow(index);
    }

  };


  function addRow(index){
    var newProduction = addProduction(index);
    layoutTable(m);
    // if (newProduction) {
    //   focus(index + 1, 0);
    // }
  }

  function focus(index, index2) {
    row = index; col = index2;
    var prev = m.value(index, index2);
    // create an input box for editing the cell
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
    // finalize the changes to the grammar when the enter key is pressed
    var validKeys = [13, 9, 37, 38, 39, 40];
    // keys for functions
    fi.keyup(function(event){
      var keyCode = event.keyCode;
      if (validKeys.indexOf(keyCode) !== -1) {
        var input = $(this).val();
        var regex = new RegExp(emptystring, g);
        input = input.replace(regex, "");
        input = input.replace(regex, "!");
        // if (input === "" && index2 === 2) {
        //   input = emptystring;
        // }
        // if (input === "" && col === 0) {
        //   alert('Invalid left-hand side.');
        //   return;
        // }
        // if (index2 == 2 && _.find(arr, function(x) { return x[0] == arr[index][0] && x[2] == input && arr.indexOf(x) !== index;})) {
        //   alert('This production already exists.');
        //   return;
        // }
        fi.remove();
        m.value(index, index2, input);
        arr[index][index2] = input;
        layoutTable(m, 2);
        switch (keyCode) {
          case 13:
            if (index2 == 0) {
              focus(index, 2);
            }
            else {
              // adding a new production
              addRow(index);
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
    });
  }

  // fired when document is clicked
  // saves current fi input value
  function defocus(e) {
    if ($(e.target).hasClass("jsavvaluelabel")) return;
    if ($(e.target).attr('id') == "firstinput") return;
    if (!fi || !fi.is(':visible')) return;
    var input = fi.val();
    var regex = new RegExp(emptystring, g);
    input = input.replace(regex, "");
    input = input.replace(regex, "!");
    if (input == "" && col == 2) {
      input = emptystring;
    }
    if (input === "" && col === 0) {
      alert('Invalid left-hand side.');
      return;
    }
    if (col == 2 && _.find(arr, function(x) { return x[0] == arr[row][0] && x[2] == input && arr.indexOf(x) !== row;})) {
      alert('This production already exists.');
      return;
    }
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


  // change editing modes
  var editMode = function() {
    $('.jsavmatrix').addClass("editMode");
    $('.jsavmatrix').removeClass("deleteMode");
    $('.jsavmatrix').removeClass("addrowMode");
    $("#mode").html('Editing');
  };
  var deleteMode = function() {
    $('#firstinput').remove();
    $('.jsavmatrix').addClass("deleteMode");
    $('.jsavmatrix').removeClass("addrowMode");
    $('.jsavmatrix').removeClass("editMode");
    $("#mode").html('Deleting');
  };
  var addrowMode = function(){
    $('.jsavmatrix').addClass("addrowMode");
    $('.jsavmatrix').removeClass("deleteMode");
    $('.jsavmatrix').removeClass("editMode");
    $("#mode").html('Adding');
  }


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
    $('#download').html('<a href="data:' + downloadData + '" target="_blank" download="grammar.jff">Download Grammar</a>');
    $('#download a')[0].click();
  };

  // Loading:
  // Function to read the loaded XML file and create the grammar
  // @param condition: whether text is of the form "<grammar>...</grammar>"
  //                  used for parsing a grammar in multiple mode
  //                  "exer": LL, BF, SLR parsing exercises
  //                  "multiple": multiple grammar editing
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

  // Function to lay out a single column width
  function layoutColumn (mat, index) {
    var maxWidth = 100;     // default cell size
    /*for (var i = 0; i < mat._arrays.length; i++) {
        var cell = mat._arrays[i]._indices[index].element;
        if ($(cell).width() > maxWidth) {
          maxWidth = $(cell).width();
        }
    }*/
    for (var i = 0; i < mat._arrays.length; i++) {
      if (typeof mat._arrays[i]._indices[index] !== undefined){
        var cell = mat._arrays[i]._indices[index].element;
        if ($(cell).width() > maxWidth) {
          maxWidth = $(cell).width();
        }
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


  // Button for exiting a proof (parsing or transformation)
  $('#helpbutton').click(displayHelp);
  $('#editbutton').click(editMode);
  $('#deletebutton').click(deleteMode);
  $('#addrowbutton').click(addrowMode);
  $('#loadfile').on('change', loadFile);
  $('#savefile').click(saveFile);
  $('#identifybutton').click(identifyGrammar);
  $('#clearbutton').click(clearAll);
  $('#completeallbutton').hide();
  $('#startTransform').click(startTransform);
  $(document).click(defocus);
  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      $('#firstinput').remove();
      fi = null;
    }
  });

  function onLoadHandler() {
    $('#loadFile').hide();
    $('#saveFile').hide();
    $('#addExerciseButton').hide();
    $('#startTransform').hide();
    $('#back').hide();
    if (type == "editor") {
      m = init();
      $('.jsavmatrix').addClass("editMode");
      return;
    }
  }

  onLoadHandler();


  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////

  function displayHelp(){
    alert(document.getElementById('helpInfo').innerHTML);
  }

  function isRegularGrammar(){
    return (checkRightLinear() || checkLeftLinear());
  }

  function checkLeftLinear(){
    var productions = _.filter(arr, function(x) { return x[0]});
    for (var i = 0; i < productions.length; i++) {
      //r is the RHS
      var r = productions[i][2];
      for (var j = 0; j < r.length; j++) {
        if (variables.indexOf(r[j]) !== -1 && j !== 0) {
          return false;
        }
      }
    }
    return true;
  }

  function isContextFreeGrammar(){
    var productions = _.filter(arr, function(x) { return x[0]});
    for (var i = 0; i < productions.length; i++) {
      var lhs = productions[i][0];
      if (lhs.length !== 1 || variables.indexOf(lhs) === -1) {
        return false;
      }
    }
    return true;
  }


  function checkLHSVariables(){
    //check if there is more than one variable on the LHS
    var productions = _.filter(arr, function(x) { return x[0]});
    for (var i = 0; i < productions.length; i++) {
      var lhs = productions[i][0];
      if (lhs.length !== 1) {
        return true;
      } else if (variables.indexOf(lhs) === -1){
        return true;
      }
    }
    return false;
  }

  function clearAll(){
    window.location.href="";
  }

  function startTransform(){
    for (var i = 0; i < arr.length; i++){
      if (arr[i][0] == '' && arr[i][2] == '')
      {
        continue;
      }
      jsav.ds.array(arr[i]);
    }
    document.getElementById('startTransform').disabled = true;
  }

  function identifyGrammar() {
    if (arr.length == 0)
    {
      alert('Please enter your productions');
      return;
    }
    if(isContextFreeGrammar()){
      alert('This grammar is a Context-Free Grammar, you can go to the next step');
      isCFG = true;

      $('#helpbutton').hide();
      $('#editbutton').hide();
      $('#deletebutton').hide();
      $('#addrowbutton').hide();
      $('#loadfile').hide();
      $('#savefile').hide();
      $('#identifybutton').hide();
      $('#clearbutton').hide();
      $('.jsavmatrix').hide();
      $('#startTransform').show();
      $('#back').show();
      //document.getElementById("editor").innerHTML = 'First step:';
      $("#mode").html('After confirming the grammar is context free grammar, we need to remove some producitons as the following order:\n' +
          '1. lambda production\n 2. unit production\n 3. useless production\n');
      return;
    }
    else {
      alert('The CNF (Chomsky Normal Form) can only accept CFG (context free grammar), please chnage the grammar to CFG');
      return;
    }
  }
});
