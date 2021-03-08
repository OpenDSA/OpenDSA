'use strict'
var trueStringLimit;
var falseStringLimit;
var tempFlag;
var randomStringLength;
var trueCounter; 
var falseCounter; 
var containLetters;
var caseCounter; 
//For TM
var tmtotalTestCases;
var tmCasesCounter;
var str = '';

/**
 * find all id that start from the tag ID
 *
 * @param xmlDoc
 *            FA machine
 * @param tag
 *            some specific tag: 'initial', 'final'.
 * @returns tag ID
 */
function findbytag(xmlDoc, tag) {
  var temp = [];
  var list = $(xmlDoc).find('automaton').children();
  var counter = 0;
  while (list[counter].localName != 'transition') {
    if (list[counter].children.hasOwnProperty('2')) {
      var t = list[counter].children[2].localName;
      if (t == tag) {
        temp.push(list[counter].attributes[0].nodeValue);
      }
    }
    if (list[counter].children.hasOwnProperty('3')) {
      var f = list[counter].children[3].localName;
      if (f == tag) {
        temp.push(list[counter].attributes[0].nodeValue);
      }
    }
    counter++;
  }
  return temp;
}


function loopkey(testCases, str) {
  for (var name in testCases) {
    if (Object.keys(testCases[name]) == str) {
      return true;
    }
  }
  return false;
}



function stringGenerate() {
  var min = randomStringLength[0];
  var max = randomStringLength[1];
  var stringLength = Math.round(Math.random() * (max - min)) + min;
  for (var a = 0; a < stringLength; a++) {
    var pos = Math.round(Math.random() * (containLetters.length - 1));
    str += containLetters[pos];
  }
  if (caseCounter == 0) {
    str = '';
  }
  return str;
}

function count(obj,tag){
  var counter = 0;
  var searchFrom = obj.testCases;
  for(var i =0;i<searchFrom.length;i++){
    for (const [key, value] of Object.entries(searchFrom[i])) {
      if(key != "ShowTestCase" && value == tag){
        counter = counter +1;
      }
    }
  }
    return counter;

}

function generateTestCase(exObj, flag) {
  var copyObj;
  if (flag == 1) {
    copyObj = exObj;
  } else {
    copyObj = exObj[0];
  }
  trueStringLimit = copyObj.totalTrueCases;
  falseStringLimit = copyObj.totalFalseCases;
  trueCounter = count(copyObj,true);
  falseCounter = count(copyObj,false);
  caseCounter = trueCounter + falseCounter;
  containLetters = copyObj.containLetters;
  randomStringLength = copyObj.randomStringLength;
  tmtotalTestCases = copyObj.totalTestCases;
  tmCasesCounter= copyObj.hardCodeCasesCounter;
  tempFlag = flag;
  var checkcases;
  if (
    typeof Object.keys(exObj) !== 'undefined' &&
    Object.keys(exObj).length > 0
  ) {
    checkcases = Object.getOwnPropertyNames(copyObj);
  }
  if (checkcases != 'No_Lambda' && checkcases != 'No_Unit' && checkcases != 'No_Useless') {
    for (
      var b = 0; trueCounter < trueStringLimit || falseCounter < falseStringLimit || tmCasesCounter<tmtotalTestCases; b++
    ) {
      if (
        copyObj.exerciseType == 'DFA' ||
        copyObj.exerciseType == 'NFA' 
      ) {
          dfaNfaHandler(copyObj);
      } else if (copyObj.exerciseType == 'PDA') {
          pdaHandler(copyObj);
      } else if (copyObj.exerciseType == 'REGEXP') {
          regExpHandler(copyObj, flag);
      } else if (copyObj.exerciseType == 'GRAMMAR') {
          graHandler(copyObj);
      } else if (copyObj.exerciseType == "TM") {
        str = stringGenerate();
        tmHandler(copyObj, str);
      } else {
          alert('exercise type error. Check json file!');
      }
    }
  }
}



function addtoTestCase(str, obj, result) {
  var current = {};
  if (tempFlag != 1) {
    var inobj = obj.testCases;
    if (result) {
      current[str] = true;
      inobj[caseCounter] = current;
    } else {
      current[str] = false;
      inobj[caseCounter] = current;
    }
  } else {
    if (result) {
      current[str] = true;
      obj.testCases[caseCounter] = current;
    } else {
      current[str] = false;
      obj.testCases[caseCounter] = current;
    }
  }
  caseCounter++;
}
