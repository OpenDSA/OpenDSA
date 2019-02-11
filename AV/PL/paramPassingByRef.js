/* global first_time, document, console, $, JSAV */

(function ($) {
//$(document).ready(function() {
  "use strict";
//   var av_name = "paramPassingByRef";
// 
//   var av = new JSAV(av_name);

function do_everything() {
    
   ODSA.AV.reset(true);
   var av_name = $('.avcontainer');
   var av = new JSAV(av_name);
    CallByAllFive.init();

  // Relative offsets
  var leftMargin = 25;
  var topMargin = 0;
  var currentTopMargin = topMargin;
  var currentFooTopMargin;
  var labelMargin = 10;
  var jsavArrayOffset = 6;
  var lineHeight = 40;
  var boxWidth = 150;
  var boxPadding = 5;
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
  var output = '';
  var unhighlightAll = function(){
    unhighlightElements(classVars);
    unhighlightElements(mainVars);
  }

  av.umsg("main() begins execution.");

  var codeLines = CallByAllFive.expression.split('<br />');
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

  var pseudo = av.code(codeLines,
    {left: leftMargin, top: topMargin, lineNumbers: false}
  );

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
        }//right center and left center don't work for arrays larger than 1.
         //JSAV please fix
      );
      currentTopMargin += lineHeight;
    }
  }
  currentTopMargin += lineHeight;


  av.label("main",
    {
      relativeTo:pseudo, anchor:"right top", myAnchor:"left top",
      left: leftMargin, top: currentTopMargin
    }
  );

  var fooLabel = av.label("foo",
    {
      relativeTo:pseudo, anchor:"right top", myAnchor:"left top",
      left: leftMargin+boxWidth+boxPadding*2, top: currentTopMargin
    }
  );
  fooLabel.hide();

  currentTopMargin += lineHeight;

  fooVarNames = getVarNamesFromPrototype(codeLines[fooIndex-1]);
  var numVars = mainVarNum;

  //numVars = Math.max(numVars,/\(([^)]+)\)/)
  var mainBox = av.g.rect(2*leftMargin+pseudo.element[0].clientWidth,
                          currentTopMargin,
                          boxWidth,
                          lineHeight*numVars+boxPadding*numVars
                        );
  var fooBox = av.g.rect(2*leftMargin+pseudo.element[0].clientWidth+boxWidth+
                            boxPadding*2,
                          currentTopMargin,
                          boxWidth,
                          lineHeight*numVars+boxPadding*numVars
                        );
  fooBox.hide();

  currentFooTopMargin = currentTopMargin;

  pseudo.setCurrentLine(currentLineMain);

  av.displayInit();
  av.step();

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
        }//JSAV please fix
      );
      currentTopMargin += lineHeight;
    }
    av.umsg("main's "+mainVarName+" is initialized to "+varVal.value[0]+".");

    pseudo.setCurrentLine(++currentLineMain);

    av.step();
  }

  var fooPassedIn = getVarNamesFromPrototype(codeLines[currentLineMain]);

  av.umsg("foo is called, with a reference to main's "+fooPassedIn[0]+
          " and "+fooPassedIn[1]+" passed in.");//,{preserve: false}

  pseudo.setCurrentLine(++currentLineMain);

  av.step();

  var fooPassedInValues = [];

  for(var i=0; i<fooPassedIn.length; i++){
    fooPassedInValues.push(getValueOfVar([mainVars, classVars], fooPassedIn[i])['value']);
  }

  for(var i=0; i<fooVarNames.length; i++){
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
  }

  av.umsg("foo's "+fooVarNames[0]+" points to "+fooPassedIn[0]+
          " and foo's "+fooVarNames[1]+" points to "+
          fooPassedIn[1]+".");

  pseudo.setCurrentLine(currentLineFoo++);

  av.step();

  //run foo()
  var contexts = [fooVars,classVars];
  while(codeLines[currentLineFoo-1].indexOf('print') === -1){
    unhighlightAll();
    var split = codeLines[currentLineFoo-1].trim().split('=');

    var rhs = getRightSideValue([fooVars, classVars], codeLines[currentLineFoo-1]);

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

    av.umsg(outMsg);
    pseudo.setCurrentLine(currentLineFoo++);
    av.step();
  }
  //foo() print lines
  var printVar = function(currentLine, context){
    var split = currentLine.trim().split(' ');
    var varname = split[split.length - 1].replace(';','');
    var varVal = getValueOfVar(
      context,
      varname
    ).value;
    output += ((output == '')?output:' ')+varVal;
    return 'In this context, '+varname+' is '+ varVal;
  }
  unhighlightAll();
  while(codeLines[currentLineFoo-1].indexOf('}') === -1){
    av.umsg(printVar(codeLines[currentLineFoo-1],contexts));
    pseudo.setCurrentLine(currentLineFoo++);
    av.step();
  }
  av.umsg('Return to main');
  pseudo.setCurrentLine(currentLineMain++);
  av.step();
  contexts = [mainVars, classVars];
  //main() print lines
  while(codeLines[currentLineMain-1].indexOf('}') === -1){
    av.umsg(printVar(codeLines[currentLineMain-1],contexts));
    pseudo.setCurrentLine(currentLineMain++);
    av.step();
  }

  av.recorded();

  if(CallByAllFive.byrefOutput != output){
    alert("byref error");
  }


} // End do_everything
    
    function about() {
	alert("Generate a (randomized) illustration of call-by-reference parameter passing.");
    };
    
    function help() {
	alert("Click the generate button each time you want to launch a new slide show.");
    };
    
    $('#about').click(about);
    $('#help').click(help);
    $('#genprog').click(do_everything);
    $('#reset').click(ODSA.AV.reset);

//    if (first_time) { console.log("Hello"); do_everything(); first_time = false; }

}(jQuery));

//});
