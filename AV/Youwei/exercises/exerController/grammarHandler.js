var testCaseList4 = [];
var check;
/**
 * find all grammars that have same left hand variable
 *
 * @param rule
 *            all grammar rules
 * @param key
 *            Left hand terminal variable
 */
function findSameKey(rule, key) {
  var pack = [];
  for (var i = 0; i < rule.length; i++) {
    if (Object.getOwnPropertyNames(rule[i]) == key) {
      pack.push(Object.values(rule[i]));
    }
  }
  return pack;
}

function hasUpperCase(str) {
  if (/[A-Z]/.test(str)) {
    const regex = /[A-Z]/g;
    const found = str.match(regex);
    return found[0];
  } else {
    return '0';
  }
}

function insertString(str1, str2, pos) {
  let origString = str1;
  let stringToAdd = str2;
  let indexPosition = pos;
  return (newString =
    origString.slice(0, indexPosition) +
    stringToAdd +
    origString.slice(indexPosition));
}

// function falseCases(rule) {
//   var res;
//   var tempStr;
//   do {
//     tempStr = stringGenerate();
//     res = travGram(rule, tempStr, 0);
//   } while (res);
//   return tempStr;
// }

// function travGram(rule, tempStr, pos) {
//   var keyPackage = findSameKey(rule, key);
// }

function grammarTrav(rule, key) {
  var operation = Math.floor(Math.random() * rule.length * 3 + 1);
  var keyPackage = findSameKey(rule, key);
  var index = Math.floor(Math.random() * keyPackage.length);
  var str = keyPackage[index][0];
  for (var i = 1; i < operation; i++) {
    var letter = hasUpperCase(str);
    if (letter != '0') {
      keyPackage = findSameKey(rule, letter);
      index = Math.floor(Math.random() * keyPackage.length);
      str2 = keyPackage[index][0];
      str = str.replace(letter, str2);
    } else {
      break;
    }
  }
  if (hasUpperCase(str) != '0') {
    check = false;
    // str = falseCases(rule);
  } else {
    check = true;
  }
  return str;
}

/**
 * random string generator help function
 * @return string
 */
function stringGenerate() {
  var min = randomStringLength[0];
  var max = randomStringLength[1];
  var stringLength = Math.round(Math.random() * (max - min)) + min;
  for (var a = 0; a < stringLength; a++) {
    var pos = Math.round(Math.random() * (containLetters.length - 1));
    str += containLetters[pos];
  }
  return str;
}

function loopkey(testCases, str) {
  for (var name in testCases) {
    if (Object.keys(testCases[name]) == str) {
      return true;
    }
  }
  return false;
}

/**
 * add string to testCases
 *
 * @param testCase
 *            tastcases
 * @param result
 *            true/false for the current string
 * @param str
 *            string
 */
function gramAdd(testCase, result, str) {
  if (testCase.testCases.indexOf(str) == -1) {
    if (result) {
      if (trueCounter < trueStringLimit && !loopkey(testCaseList4, str)) {
        testCaseList4.push(str);
        addtoTestCase(str, testCase, 1);
        trueCounter++;
      }
    } else {
      if (falseCounter < falseStringLimit && !loopkey(testCaseList4, str)) {
        testCaseList4.push(str);
        addtoTestCase(str, testCase, 0);
        falseCounter++;
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
/**
 * Grammar traverse start funtion.
 *
 * @param testCase
 *            object
 */
function graHandler(testCase) {
  var rule = testCase.solution;
  testCaseList4 = testCase.testCases;
  check = false;
  var str = grammarTrav(rule, 'S');
  gramAdd(testCase, check, str);
  return 0;
}
