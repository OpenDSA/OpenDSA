$(document).ready(function() {
  "use strict";
  var av_name = "paramPassingByVal";

  var av = new JSAV(av_name);

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
  var fooVarNames = [];
  var fooVars = {};
  var fooLabels = {};
  var currentLineMain = 0;
  var currentLineFoo = 0;
  var unhighlightAll = function(){
    unhighlightElements(classVars);
    unhighlightElements(mainVars);
    unhighlightElements(fooVars);
  }

  av.umsg("main() begins execution.");

  var codeLines = CallByAllFive.expression.split('<br />');
  for(var i = 0; i < codeLines.length; i++){
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
  var mainBox = av.g.rect(2*leftMargin+pseudo.element[0].clientWidth,
                          currentTopMargin,
                          boxWidth,
                          lineHeight*2+boxPadding*2
                        );
  var fooBox = av.g.rect(2*leftMargin+pseudo.element[0].clientWidth+boxWidth+
                            boxPadding*2,
                          currentTopMargin,
                          boxWidth,
                          lineHeight*2+boxPadding*2
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

  av.umsg("foo is called, with a copy of main's "+mainVarName+
          " and "+name+"["+mainVars[mainVarName].value(0)+"] passed in.");//,{preserve: false}

  pseudo.setCurrentLine(++currentLineMain);

  av.step();

  fooVarNames = getVarNamesFromPrototype(codeLines[currentLineFoo-1]);

  fooLabels[fooVarNames[0]] = av.label(fooVarNames[0],
    {
      relativeTo:pseudo, anchor:"right top", myAnchor:"left top",
      left: leftMargin+boxWidth+3*boxPadding, top: currentFooTopMargin
    }
  );
  fooVars[fooVarNames[0]] = av.ds.array(varVal.value,
    {
      indexed: false,relativeTo:fooLabels[fooVarNames[0]], anchor:"right top",
      myAnchor:"left top", left: labelMargin,
      top:-1*jsavArrayOffset
    }
  );

  currentFooTopMargin += lineHeight;

  fooLabels[fooVarNames[1]] = av.label(fooVarNames[1],
    {
      relativeTo:pseudo, anchor:"right top", myAnchor:"left top",
      left: leftMargin+boxWidth+3*boxPadding, top: currentFooTopMargin
    }
  );
  fooVars[fooVarNames[1]] = av.ds.array(
    [classVars[name].value(varVal.value[0])],
    {
      indexed: false,relativeTo:fooLabels[fooVarNames[1]], anchor:"right top",
      myAnchor:"left top", left: labelMargin,
      top:-1*jsavArrayOffset
    }
  );

  av.umsg("foo's "+fooVarNames[0]+" is initialized to the value "+varVal.value+
          " and foo's "+fooVarNames[1]+" is initialized to "+
          classVars[name].value(varVal.value[0])+".");

  fooLabel.show();
  fooBox.show();

  pseudo.setCurrentLine(currentLineFoo++);

  av.step();

  //run foo()
  var contexts = [fooVars,classVars];
  while(codeLines[currentLineFoo-1].indexOf('print') === -1){
    unhighlightAll();
    var split = codeLines[currentLineFoo-1].trim().split('=');

    var rhs = getRightSideValue([fooVars, classVars], codeLines[currentLineFoo-1]);
    /*var rhs = split[split.length - 1].trim();
    var fooSourceContext = typeof fooVars[rhs.charAt(0)] != 'undefined';
    var source = (fooSourceContext)?fooVars:classVars;

    var rhsSplit = rhs.split(' ');
    var rhsIndex = 0;
    if(rhsSplit[0].length > 1){
      rhsIndex = getIndexFromString(rhsSplit[0]);
    }*/

    var lhs = split[0].trim();
    var fooDestContext = typeof fooVars[lhs.charAt(0)] != 'undefined';
    var destination = (fooDestContext)?fooVars:classVars;
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

    var outMsg = ((fooDestContext)?'foo':'main')+"'s "+destStr+
                  ' set to the value of '+rhs.value;

    av.umsg(outMsg);
    pseudo.setCurrentLine(currentLineFoo++);
    av.step();
  }
  //foo() print lines
  var printVar = function(currentLine, context){
    var split = currentLine.trim().split(' ');
    var varname = split[split.length - 1].replace(';','');
    return 'In this context, '+varname+' is '+
      getValueOfVar(
        context,
        varname
      ).value;
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
  //main() print lines
  while(codeLines[currentLineMain-1].indexOf('}') === -1){
    av.umsg(printVar(codeLines[currentLineMain-1],contexts));
    pseudo.setCurrentLine(currentLineMain++);
    av.step();
  }

  av.recorded();

});
