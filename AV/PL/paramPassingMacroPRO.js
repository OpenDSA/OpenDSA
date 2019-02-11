"use strict";
/*global alert: true, ODSA */
$(document).ready(function () {
  // Relative offsets
  var leftMargin = 25;
  var topMargin = 200;
  var currentTopMargin = 0;
  var labelMargin = 10;
  var jsavArrayOffset = 6;
  var lineHeight = 40;
  var boxWidth = 150;
  var boxPadding = 5;
  var codeLines;
  var pseudo;
  var pseudoO;
  var fooIndex, mainIndex;
  var classVars = {};
  var classLabels = {};
  var mainVars = {};
  var mainLabels = {};
  var mainVarNum = 0;
  var fooVarNames = [];
  var fooVars = {};
  var fooLabels = {};
  var currentLineMain = 0;
  var currentLineMainO = 0;
  var currentLineFoo = 0;
  var currentLineOld = 0;
  var highlightedLine;
  var output = '';
  var jsavElements;

  var initialArrays;

  function unhighlightAll(){
    unhighlightElements(classVars);
    unhighlightElements(mainVars);
    unhighlightElements(fooVars);
  }

  function replaceMultiple(find,replace, str){
    var replacePrint = false;
    if(str !== 'print' && str.trim().startsWith('print')){
      replacePrint = replaceMultiple(find,replace,'print');
    }
    for(var i=0; i<Math.min(find.length,replace.length);i++){
      str = str.replace(new RegExp(find[i].trim(), 'g'),replace[i].trim());
    }
    if(replacePrint){
      str = str.replace(replacePrint,'print');
    }
    return str;
  }

  function arrayFromObj(jsavStuff){
    var retArr = [];
    for(var level in jsavStuff){
      for (var variable in jsavStuff[level]){
        retArr.push(jsavStuff[level][variable]);
      }
    }
    return retArr;
  }

  function clickHandler(jsavArr){
    return function(index){
      unhighlightAll();
      var valInput = $('#answer');
      var answer = valInput.val().replace(/\s+/g, '');
      valInput.val('');
      jsavArr.highlight(index);
      jsavArr.value(index, parseInt(answer));
      exer.gradeableStep();
      pseudo.setCurrentLine(++highlightedLine);
      pseudoO.setCurrentLine(++currentLineOld);
      valInput.focus();
    }
  }

  //removes all jsav elements and resets other vars
  function clearAllJsavObj(){
    if(jsavElements){
      jsavElements.forEach(function(element) {
        element.clear();
      });
    }
    jsavElements = [];
    currentTopMargin = 0;
    mainVarNum = 0;
    mainIndex = null;

    fooIndex = mainIndex = null;
    classVars = {};
    classLabels = {};
    mainVars = {};
    mainLabels = {};
    mainVarNum = 0;
    fooVarNames = [];
    fooVars = {};
    fooLabels = {};
    currentLineMain = 0;
    currentLineMainO = 0;
    currentLineFoo = 0;
    currentLineOld = 0;
    output = '';
    initialArrays = {
      classVars: {},
      mainVars: {}
    };
  }

  // Process About button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring('By Macro proficiency exercise', 'Cory Sanin'));
  }

  // generates the model answer
  function modelSolution(modeljsavAV) {
    var currentTopMargin = 0;
    var topMargin = 0;
    var classVars = {};
    var mainVars = {};
    var labelobj;
    var currentLine = fooIndex;
    function unhighlightAll(){
      unhighlightElements(classVars);
      unhighlightElements(mainVars);
    }

    var pseudo = modeljsavAV.code(codeLines,
      {left: leftMargin, top: topMargin, lineNumbers: false}
    );
    jsavElements.push(pseudo);

    //run foo()
    for(var arr in initialArrays.classVars){
      labelobj = modeljsavAV.label(arr,
        {
          relativeTo:pseudo, anchor:"right top", myAnchor:"left top",
          left: leftMargin, top: currentTopMargin
        }
      );
      classVars[arr] = modeljsavAV.ds.array(initialArrays.classVars[arr],
        {
          indexed: initialArrays.classVars[arr].length > 1,relativeTo:labelobj, anchor:"right top",
          myAnchor:"left top", left: labelMargin,
          top:-1*jsavArrayOffset
        }
      );
      jsavElements.push(classVars[arr], labelobj);
      currentTopMargin += lineHeight;
    }
    currentTopMargin += lineHeight;
    jsavElements.push(modeljsavAV.label("main",
      {
        relativeTo:pseudo, anchor:"right top", myAnchor:"left top",
        left: leftMargin, top: currentTopMargin
      }
    ));
    currentTopMargin += lineHeight;
    var numVars = Object.keys(initialArrays.mainVars).length;

    jsavElements.push(modeljsavAV.g.rect(2*leftMargin+pseudo.element[0].clientWidth,
                            currentTopMargin+topMargin,
                            boxWidth,
                            lineHeight*numVars+boxPadding*numVars
                     ));
    for(arr in initialArrays.mainVars){
      labelobj = modeljsavAV.label(arr,
        {
          relativeTo:pseudo, anchor:"right top", myAnchor:"left top",
          left: leftMargin+3, top: currentTopMargin
        }
      );
      mainVars[arr] = modeljsavAV.ds.array(initialArrays.mainVars[arr],
        {
          indexed: initialArrays.mainVars[arr].length > 1,relativeTo:labelobj, anchor:"right top",
          myAnchor:"left top", left: labelMargin,
          top:-1*jsavArrayOffset
        }
      );
      jsavElements.push(mainVars[arr], labelobj);
    }
    for(var arr in initialArrays.fooVars){
      labelobj = modeljsavAV.label(arr,
        {
          relativeTo:pseudo, anchor:"right top", myAnchor:"left top",
          left: leftMargin+boxWidth+3*boxPadding, top: currentTopMargin
        }
      );
      fooVars[arr] = modeljsavAV.ds.array(initialArrays.fooVars[arr],
        {
          indexed: initialArrays.fooVars[arr].length > 1,relativeTo:labelobj, anchor:"right top",
          myAnchor:"left top", left: labelMargin,
          top:-1*jsavArrayOffset
        }
      );
      jsavElements.push(fooVars[arr], labelobj);
      currentTopMargin += lineHeight;
    }
    pseudo.setCurrentLine(currentLine);


    modeljsavAV.displayInit();


    var contexts = [mainVars,classVars];
    currentLineMain = mainIndex;
    while(codeLines[++currentLineMain].indexOf('print') === -1){//JSAV runs this twice- copy currentLineMain into function
      unhighlightAll();
      pseudo.setCurrentLine(++currentLine);
      var split = codeLines[currentLineMain].trim().split('=');

      var rhs = getRightSideValue([mainVars, classVars], codeLines[currentLineMain]);

      var lhs = split[0].trim();
      var mainDestContext = typeof mainVars[lhs.charAt(0)] != 'undefined';
      var destination = (mainDestContext)?mainVars:classVars;
      var destIndex = 0;
      var destStr = lhs.charAt(0);
      if(lhs.length > 1){
        destIndex = getValueOfVar(
                                    contexts,
                                    getIndexFromString(lhs)
                                 ).value;
        destStr += '['+destIndex+']';
      }

      destination[lhs.charAt(0)].value(destIndex,rhs.value);
      destination[lhs.charAt(0)].highlight(destIndex);

      var outMsg = ((mainDestContext)?'main':'the global scope')+"'s "+destStr+
                    ' is set to the value of '+rhs.value;

      modeljsavAV.umsg(outMsg);

      modeljsavAV.gradeableStep();
    }

    var jsavArrs = {
      classVars,
      mainVars
    }

    return arrayFromObj(jsavArrs);
  }

  // Process reset button: Re-initialize everything
  function initialize() {
    CallByAllFive.init();
    clearAllJsavObj();
    av.umsg("");

    codeLines = CallByAllFive.expression.split('<br />');
    var macroCodeLines = [];
    var i=0;
    while(codeLines[i].indexOf('void foo') == -1){
      macroCodeLines.push(codeLines[i++]);
    }
    currentLineFoo = i + 1;
    var fooCodeLines = [codeLines[i]];
    while(codeLines[i].indexOf('}') == -1){
      fooCodeLines.push(codeLines[++i]);
    }
    while(++i < codeLines.length){
      if(codeLines[i].indexOf('int main') !== -1){
        currentLineMain = i + 1;
        currentLineMainO = currentLineMain;
        currentLineOld = currentLineMainO;
      }
      if(codeLines[i].indexOf('foo') !== -1){
        var fooKeys = getVarNamesFromPrototype(fooCodeLines[0]);
        var mainVals = insideParentheses(codeLines[i]).split(',');
        fooIndex = macroCodeLines.length;
        for(var j=1; j<fooCodeLines.length-1; j++){
          macroCodeLines.push(replaceMultiple(fooKeys, mainVals, fooCodeLines[j]));
        }
      }
      else{
        macroCodeLines.push(codeLines[i]);
      }
    }

    pseudoO = av.code(codeLines,
      {left: leftMargin, top: topMargin, lineNumbers: false}
    );

    codeLines = macroCodeLines;

    pseudo = av.code(codeLines, {
        relativeTo:pseudoO, anchor:'right top', myAnchor:'left top',
        left: leftMargin, top: 0, lineNumbers: false
      }
    );

    for(var i = 0; i < codeLines.length; i++){
      if(mainIndex != null){
        if(codeLines[i].trim().startsWith('int')){
          mainVarNum++;
        }
      }
      if(codeLines[i].indexOf('int main') !== -1){
        currentLineMain = mainIndex = i + 1;
      }
    }
    jsavElements.push(pseudo, pseudoO);

    for(var i = 0; i < mainIndex - 1; i++){
      if(codeLines[i]){
        var name = codeLines[i].split(' ')[1].charAt(0);
        var varVal = getRightSideValue([classVars], codeLines[i]);
        classLabels[name] = av.label(name,
          {
            relativeTo:pseudo, anchor:"right top", myAnchor:"left top",
            left: leftMargin, top: currentTopMargin
          }
        );
        classVars[name] = av.ds.array(varVal.value,
          {
            indexed: varVal.value.length > 1,relativeTo:classLabels[name], anchor:"right top",
            myAnchor:"left top", left: labelMargin,
            top:-1*jsavArrayOffset
          }//right center and left center don't work for arrays larger than 1.
           //JSAV please fix
        );
        initialArrays.classVars[name] = varVal.value.slice();
        jsavElements.push(classLabels[name],classVars[name])
        currentTopMargin += lineHeight;
      }
    }
    currentTopMargin += lineHeight;

    jsavElements.push(av.label("main",
      {
        relativeTo:pseudo, anchor:"right top", myAnchor:"left top",
        left: leftMargin, top: currentTopMargin
      }
    ));

    currentTopMargin += lineHeight;

    var numVars = mainVarNum;

    jsavElements.push(
      av.g.rect(3*leftMargin+pseudo.element[0].clientWidth+pseudoO.element[0].clientWidth,
      currentTopMargin+202, //JSAV Nonsense
      boxWidth,
      lineHeight*numVars+boxPadding*numVars
     ));

    while(currentLineMain < fooIndex){
      if(codeLines[currentLineMain]){
        var mainVarName = codeLines[currentLineMain].trim().split(' ')[1].charAt(0);
        var varVal = getRightSideValue([mainVars, classVars],
                                       codeLines[currentLineMain]);
        mainLabels[mainVarName] = av.label(mainVarName,
          {
            relativeTo:pseudo, anchor:"right top", myAnchor:"left top",
            left: leftMargin+boxPadding, top: currentTopMargin
          }
        );
        mainVars[mainVarName] = av.ds.array(varVal.value,
          {
            indexed: varVal.value.length > 1,relativeTo:mainLabels[mainVarName],
            anchor:"right top", myAnchor:"left top", left: labelMargin,
            top:-1*jsavArrayOffset
          }//JSAV please fix
        );
        initialArrays.mainVars[mainVarName] = varVal.value.slice();
        jsavElements.push(mainLabels[mainVarName], mainVars[mainVarName]);
        currentTopMargin += lineHeight;
      }

      currentLineMain += 2;
      currentLineOld = fooIndex;

      highlightedLine = currentLineMain;
      pseudo.setCurrentLine(highlightedLine);
      pseudoO.setCurrentLine(currentLineOld);

    }

    var jsavArrs = {
      classVars,
      mainVars
    }

    for(var key in jsavArrs){
      for(var vararr in jsavArrs[key]){
        vararr = jsavArrs[key][vararr]
        vararr.click(clickHandler(vararr));
      }
    }

    return arrayFromObj(jsavArrs);
  }

  // function that will be called by the exercise if continuous feedback mode
  // is used and the fix errors mode is on.
  function fixState(modelState) {
    pseudo.setCurrentLine(highlightedLine);
    var current = arrayFromObj({classVars, mainVars, fooVars});
    for(var i = 0; i < modelState.length && i < current.length; i++){
      for(var j = 0; j < current[i].size(); j++) {
        current[i].value(j, modelState[i].value(j));
        if(modelState[i].isHighlight(j)){
          current[i].highlight(j);
        }
        else{
          current[i].unhighlight(j);
        }
      }
    }


  }

   // Connect the action callbacks to the HTML entities
   $('#help').click(help);
   $('#about').click(about);

   var config = ODSA.UTILS.loadConfig(),
       interpret = config.interpreter,       // get the interpreter
       settings = config.getSettings();      // Settings for the AV

   var av = new JSAV($('.avcontainer'), {settings: settings});

   var exer = av.exercise(modelSolution, initialize,
                {compare: {"class": "jsavhighlight"},
                 controls: $('.jsavexercisecontrols'), fix: fixState});


   exer.reset();

   window.exer = exer;

})
