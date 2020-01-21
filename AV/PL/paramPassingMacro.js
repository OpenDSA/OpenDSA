/* global first_time, document, console, $, JSAV */

(function ($) {
//$(document).ready(function() {
  "use strict";
//   var av_name = "paramPassingMacro";
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
  var currentLineMainO = 0;
  var currentLineOld = 0;
  var output = '';
  var unhighlightAll = function(){
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

  av.umsg("This is the original code.");

  var codeLines = CallByAllFive.expression.split('<br />');

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

  var pseudoO = av.code(codeLines,
    {left: leftMargin, top: topMargin, lineNumbers: false}
  );

  var codeLinesO = codeLines;
  codeLines = macroCodeLines;

  var pseudo = av.code(codeLines, {
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

  pseudo.hide();

  currentFooTopMargin = currentTopMargin;

  av.displayInit();
  av.step();

//   av.umsg("In macro expansion, the function is spliced in main. "+
//           "Then code is executed like normal.");

    av.umsg("Macro expansion results in the code on the right.   Notice that the text of "+
	    "the arguments has been substituted for the function's parameters (Step 1), and then " +
	    "the text of the resulting code has been spliced into main (Step 2).");
    
  pseudo.show();

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

  currentTopMargin += lineHeight;

  var numVars = mainVarNum;

  var mainBox = av.g.rect(3*leftMargin+pseudo.element[0].clientWidth+pseudoO.element[0].clientWidth,
                          currentTopMargin,
                          boxWidth,
                          lineHeight*numVars+boxPadding*numVars
                        );

  av.step();

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
      currentTopMargin += lineHeight;
    }
    av.umsg("main's "+mainVarName+" is initialized to "+varVal.value[0]+".");

    pseudo.setCurrentLine(++currentLineMain);
    pseudoO.setCurrentLine(++currentLineOld);

    av.step();
  }

  //run main()
  var contexts = [mainVars,classVars];
  currentLineMain++;
  while(codeLines[currentLineMain-1].indexOf('print') === -1){
    unhighlightAll();
    var split = codeLines[currentLineMain-1].trim().split('=');

    var rhs = getRightSideValue([mainVars, classVars], codeLines[currentLineMain-1]);

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

    destination[lhs.charAt(0)].highlight(destIndex);

    destination[lhs.charAt(0)].value(destIndex,rhs.value);

    var outMsg = ((mainDestContext)?'main\'s':'the global scope\'s')+" "+destStr+
                  ' is set to the value of '+rhs.value;

    av.umsg(outMsg);
    pseudo.setCurrentLine(currentLineMain++);
    if(codeLinesO[currentLineOld].indexOf('foo') !== -1){
      currentLineMainO = currentLineOld;
      currentLineOld = currentLineFoo;
    }
    pseudoO.setCurrentLine(++currentLineOld);
    av.step();
  }

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
  while(codeLines[currentLineMain-1].indexOf('}') === -1){
    av.umsg(printVar(codeLines[currentLineMain-1],contexts));
    pseudo.setCurrentLine(currentLineMain++);
    if(codeLinesO[currentLineOld].indexOf('}') !== -1){
      currentLineOld = ++currentLineMainO;
    }
    pseudoO.setCurrentLine(++currentLineOld);
    av.step();
  }

  av.recorded();


  if(CallByAllFive.bymacOutput != output){
    alert("bymacro error");
  }

} // End do_everything
    
    function about() {
	alert("Generate a (randomized) illustration of macro-style parameter passing.");
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
