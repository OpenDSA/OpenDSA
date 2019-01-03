var SLang = {};
var slideshowCorrent = true;
var getRightSideValue = function(context, lineText){
  var result = {
    value: 0
  };

  var linesplit = lineText.split('=');
  linesplit = linesplit[linesplit.length-1].replace(';', '').trim();

  if(linesplit.indexOf('{') !== -1){
    result.value = linesplit.replace('{','').replace('}','').split(',');
    for(var i = 0; i < result.value.length; i++){
      result.value[i] = result.value[i].trim();
    }
    result.string = linesplit;
  }
  else{
    var rhsSplit = linesplit.split(' ');

    var operator = null;
    for(var i = 0; i < rhsSplit.length; i++){
      if(isOperator(rhsSplit[i])){
        operator = rhsSplit[i];
      }
      else{
        var val = getValueOfVar(context, rhsSplit[i]).value;
        if(operator === null){
          result.value = val;
        }
        else{
          result.value = performOperation(result.value, val, operator);
        }
      }
    }

    result.value = [result.value];
  }
  return result;
}

var getIndexFromString = function(str){
  if(str.indexOf("[") == -1 || str.lastIndexOf("]") == -1){
    return 0;
  }
  return str.substring(
                        str.indexOf("[")+1,
                        str.lastIndexOf("]")
                      )
}

var getValueOfVar = function(contextArr, varName){
  var result = {
    value: null,
    index: -1,
    arrIndex: -1
  };
  var arrIndex = -1;
  if(!isNaN(parseInt(varName))){
    result.value = parseInt(varName);
    return result;
  }

  if(varName.indexOf && varName.indexOf('[') !== -1){
    arrIndex = getIndexFromString(varName);
    varName = varName.substring(0,varName.indexOf("["));
  }

  for(var i = 0; i < contextArr.length && result.index == -1; i++){
    if(typeof contextArr[i][varName] != 'undefined'){
      result.value = contextArr[i][varName];
      if(result.value.size() == 1){
        arrIndex = 0;
      }
      else if(varName+'-index' in contextArr[i]){
        arrIndex = contextArr[i][varName+'-index'];
      }
      result.index = i;
    }
  }

  if(arrIndex != -1){
    result.arrIndex = getValueOfVar(contextArr, arrIndex).value;
    result.value = result.value.value(result.arrIndex);
  }

  return result;
}

var performOperation = function(op1, op2, operator){
  if(operator == '+'){
    return parseInt(op1) + parseInt(op2);
  }
  else if(operator == '-'){
    return op1 - op2;
  }
  else{
    return op1 * op2;
  }
}

var isOperator = function(ch){
  return ch === '+' || ch === '-' || ch === '*';
}

var getVarNamesFromPrototype = function(proto){
  var results = [];
  var split = insideParentheses(proto).split(',');
  for(var i=0; i<split.length; i++){
    var paramsplit = split[i].split(' ');
    results.push(paramsplit[paramsplit.length-1]);
  }
  return results;
}

var insideParentheses = function(str){
  var r = /\(([^)]+)\)/.exec(str.trim());
  return r[r.length-1];
}

var unhighlightElements = function(vars){
  for (var v in vars) {
    vars[v].unhighlight(true);
  }
};

$(document).ready(function() {
  CallByAllFive.init();
});
