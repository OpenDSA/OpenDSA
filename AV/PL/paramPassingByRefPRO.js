"use strict";
/*global alert: true, ODSA */
$(document).ready(function () {
  // Relative offsets
  var leftMargin = 25;
  var topMargin = 200;
  var currentTopMargin = 0;
  var currentFooTopMargin;
  var labelMargin = 10;
  var jsavArrayOffset = 6;
  var lineHeight = 40;
  var boxWidth = 150;
  var boxPadding = 5;
  var codeLines;
  var pseudo;
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
  var currentLineFoo = 0;
  var highlightedLine;
  var output = '';
  var jsavElements;

  var initialArrays;

  function unhighlightAll(){
    unhighlightElements(classVars);
    unhighlightElements(mainVars);
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
      valInput.focus();
    }
  }

  //removes all jsav elements and resets other vars
  function clearAllJsavObj(){
    if(jsavElements){
      jsavElements.forEach(function(element) {
        element.hide();
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
    currentLineFoo = 0;
    output = '';
    initialArrays = {
      classVars: {},
      mainVars: {},
      fooVars: {}
    };
  }

  // Process About button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring('By Reference proficiency exercise', 'Cory Sanin'));
  }

  // generates the model answer
  function modelSolution(modeljsavAV) {
    var currentTopMargin = 0;
    var topMargin = 0;
    var fooVars = {};
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
    for(arr in initialArrays.classVars){
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
          left: leftMargin, top: currentTopMargin
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
      if(arr.length > 1){
        fooVars[arr] = initialArrays.fooVars[arr];
      }
      else{
        var split = initialArrays.fooVars[arr].split(':');
        fooVars[arr] = ((split[0]==='mainVars')?mainVars:classVars)[split[1]];
        jsavElements.push(modeljsavAV.pointer(arr, ((split[0]==='mainVars')?mainVars:classVars)[split[1]],{
          targetIndex: initialArrays.fooVars[arr+'-index'],
          left: lineHeight
        }));
      }
    }

    pseudo.setCurrentLine(currentLine++);
    modeljsavAV.displayInit();

    var contexts = [fooVars,classVars];
    currentLineFoo = fooIndex;
    while(codeLines[currentLineFoo].indexOf('print') === -1){
      unhighlightAll();
      pseudo.setCurrentLine(currentLine++);
      var split = codeLines[currentLineFoo].trim().split('=');

      var rhs = getRightSideValue([fooVars, classVars], codeLines[currentLineFoo++]);

      var lhs = split[0].trim();
      var fooDestContext = typeof fooVars[lhs.charAt(0)] != 'undefined';
      var destination = (fooDestContext)?fooVars:classVars;
      var destIndex = 0;
      var destStr = lhs.charAt(0);
      if(destination === fooVars){
        destIndex = fooVars[lhs.charAt(0)+'-index']
      }
      else if(lhs.length > 1){
        destIndex = getValueOfVar(
                                    contexts,
                                    getIndexFromString(lhs)
                                  ).value;
        destStr += '['+destIndex+']';
      }

      destination[lhs.charAt(0)].highlight(destIndex);

      destination[lhs.charAt(0)].value(destIndex,rhs.value);

      var outMsg = ((fooDestContext)?'foo':'main')+"'s "+destStr+
                    ' is set to the value of '+rhs.value;

      modeljsavAV.umsg(outMsg);

      modeljsavAV.gradeableStep();
    }

    var jsavArrs = {
      classVars,
      mainVars,
    }

    return arrayFromObj(jsavArrs);
  }

  // Process reset button: Re-initialize everything
  function initialize() {
    CallByAllFive.init();
    clearAllJsavObj();
    av.umsg("");

    codeLines = CallByAllFive.expression.split('<br />');
    for(var i = 0; i < codeLines.length; i++){
      if(mainIndex != null){
        if(codeLines[i].trim().startsWith('int')){
          mainVarNum++;
        }
      }
      if(codeLines[i].indexOf('void foo') !== -1){
        currentLineFoo = fooIndex = i + 1; // +1 because JSAV
      }
      else if(codeLines[i].indexOf('int main') !== -1){
        currentLineMain = mainIndex = i + 1;
      }
    }

    pseudo = av.code(codeLines,
      {left: leftMargin, top: topMargin, lineNumbers: false}
    );
    jsavElements.push(pseudo)

    for(var i = 0; i < fooIndex - 1; i++){
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
          }
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

    fooVarNames = getVarNamesFromPrototype(codeLines[fooIndex-1]);
    var numVars = mainVarNum;

    //numVars = Math.max(numVars,/\(([^)]+)\)/)
    var mainBox = av.g.rect(2*leftMargin+pseudo.element[0].clientWidth,
                            currentTopMargin+topMargin,
                            boxWidth,
                            lineHeight*numVars+boxPadding*numVars
                          );
    jsavElements.push(mainBox);

    currentFooTopMargin = currentTopMargin;

    while(codeLines[currentLineMain].indexOf('foo') === -1){
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
          }
        );
        initialArrays.mainVars[mainVarName] = varVal.value.slice();
        jsavElements.push(mainLabels[mainVarName], mainVars[mainVarName])
        currentTopMargin += lineHeight;
      }
      currentLineMain++;
    }

    var fooPassedIn = getVarNamesFromPrototype(codeLines[currentLineMain++]);

    var fooPassedInValues = [];

    for(var i=0; i<fooPassedIn.length; i++){
      var target;
      var pIndex = 0;
      if(fooPassedIn[i] in mainVars){
        target = mainVars[fooPassedIn[i]]
      }
      else{
        target = classVars[fooPassedIn[i].split('[')[0]]
        pIndex = getValueOfVar(
          [mainVars,classVars],
          getIndexFromString(fooPassedIn[i])
        )['value']
      }
      fooLabels[fooVarNames[i]] = av.pointer(fooVarNames[i],target,{
        targetIndex: pIndex,
        left: lineHeight
      })
      fooVars[fooVarNames[i]] = target;
      fooVars[fooVarNames[i]+'-index'] = pIndex;
      initialArrays.fooVars[fooVarNames[i]] = ((fooPassedIn[i] in mainVars)?'mainVars':'classVars')+':'+fooPassedIn[i].charAt(0);
      initialArrays.fooVars[fooVarNames[i]+'-index'] = pIndex;
      jsavElements.push(fooLabels[fooVarNames[i]]);
    }

    highlightedLine = currentLineFoo+1;
    pseudo.setCurrentLine(highlightedLine);

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
    var current = arrayFromObj({classVars, mainVars});
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
