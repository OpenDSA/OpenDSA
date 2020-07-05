'use strict';
// ******************************************************************************
// ******************************************************************************
// If the true or false cases precentage are very low, do not use these 
// function. Eg. There are 2^10 possible strings and only 10 true cases, 
// please hardcode the true cases in json file, and correct the "trueCounter" 
// in corresponding html file otherwise it will take a long time to 
// generate correct true cases.
// ******************************************************************************
// ******************************************************************************
var trueStringLimit = totalTrueCases;
var falseStringLimit = totalFalseCases;
var caseCounter = trueCounter + falseCounter;
var testCaseList = [];

function addtoTestCase(str, obj, TorF) {
  testCaseList.push(str);
  var current = {};
  var inobj = obj[0].testCases;
  if (TorF == 1) {
    current[str] = true;
    inobj[caseCounter] = current;
  } else if (TorF == 0) {
    current[str] = false;
    inobj[caseCounter] = current;
  }
  caseCounter++;
}


function addtoGrammarTestCase(str, obj, TorF) {
  testCaseList.push(str);
  var current = {};
  if (TorF == 1) {
    current[str] = true;
    obj[caseCounter] = current;
  } else if (TorF == 0) {
    current[str] = false;
    obj[caseCounter] = current;
  }
  caseCounter++;
}


function randomStringGenerate(testCase, flag) {
  str = stringGenerate();
  var copy = str;
  if (copy.charAt(0) == "T" || copy.charAt(0) == "F") {
    copy = copy.substr(1);
  }
  if (testCaseList.indexOf(copy) == -1) {

    if (checkRule(str)) {
      if (str.charAt(0) == "T") {
        str = str.substr(1);
      }
      // if (str != "" || caseCounter == 0) {
      if (trueCounter < trueStringLimit) {
        if (flag == 0) {
          addtoTestCase(str, testCase, 1);
        } else {
          addtoGrammarTestCase(str, testCase, 1);
        }
        trueCounter++;
        // }

      }
    } else {
      if (str.charAt(0) == "F") {
        str = str.substr(1)
      }
      // if (str != "" || caseCounter == 0) {
      if (falseCounter < falseStringLimit) {
        if (flag == 0) {
          addtoTestCase(str, testCase, 0);
        } else {
          addtoGrammarTestCase(str, testCase, 0);
        }
        falseCounter++;
      }

      // }
    }
  }
}

function generateTestCase(testCase, flag) {
  if (typeof Object.keys(testCase) !== 'undefined' && Object.keys(testCase).length > 0) {
      var a = Object.getOwnPropertyNames(testCase[0]);
  }

  if (a != "No_Lambda" && a != "No_Unit" && a != "No_Useless") {
    for (var b = 0;
      (trueCounter < trueStringLimit) || (falseCounter < falseStringLimit); b++) {
      str = "";
      randomStringGenerate(testCase, flag);

    }
  }
}

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}