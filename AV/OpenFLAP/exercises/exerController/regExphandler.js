'use strict'
// ******************************************************************************

var testCaseList5 = [];
var mark = 0;
var markPos = 0;
var tempFlag;
var checkAllstar;
var emptyStr;
/**
 * Add strings alone with true or false to the test cases
 *
 * @param str  Testing string
 *
 * @param TorF True or false
 *
 * @param obj  Object that contain all info
 */
function addtoTestCase(str, obj, TorF) {
  testCaseList5.push(str);
  var current = {};
  if (tempFlag != 1) {
    var inobj = obj.testCases;
    if (TorF == 1) {
      current[str] = true;
      inobj[caseCounter] = current;
    } else if (TorF == 0) {
      current[str] = false;
      inobj[caseCounter] = current;
    }
  } else {
    if (TorF == 1) {
      current[str] = true;
      obj.testCases[caseCounter] = current;
    } else if (TorF == 0) {
      current[str] = false;
      obj.testCases[caseCounter] = current;
    }
  }
  caseCounter++;
}

/**
 * Given a regular expression, this will return the subexpressions that,
 * when ored together, will result in the expression.
 *
 * @param expression  the regular expression
 *
 * @return an array of the subexpressions
 */
var or = function (expression) {
  var se = []; // Subexpressions.
  var start = 0,
    level = 0
  for (var i = 0; i < expression.length; i++) {
    if (expression.charAt(i) == '(') level++;
    if (expression.charAt(i) == ')') level--;
    if (expression.charAt(i) != '+') continue;
    if (level != 0) continue;
    // First level or!
    se.push(delambda(expression.substring(start, i)))
    start = i + 1;
  }
  se.push(delambda(expression.substring(start)))
  return se;
}

/**
 * Given a regular expression, this will return the subexpressions that,
 * when concatenated together, will result in the expression.
 *
 * @param expression
 *            the regular expression
 * @return an array of the subexpressions
 */
var cat = function (expression) {
  var se = []; // Subexpressions.
  var start = 0,
    level = 0
  for (var i = 0; i < expression.length; i++) {
    var c = expression.charAt(i);
    if (c == ')') {
      level--;
      continue;
    }
    if (c == '(') level++;
    if (!(c == '(' && level == 1) && level != 0) continue;
    if (c == '+') {
      // Hum. That shouldn't be...
      alert('Error in the code. Sorry~');
    }
    if (c == '*') continue;
    // Not an operator, and on the first level!
    if (i == 0) continue;
    se.push(delambda(expression.substring(start, i)));
    start = i;
  }
  se.push(delambda(expression.substring(start)));
  return se;
}

/**
 * Given a string, returns the string, or the empty string if the string is
 * the lambda string.
 *
 * @param string
 *            the string to possibly replace
 * @return the string, or the empty string if the string is the lambda
 *         string
 */
var delambda = function (string) {
  return string == lambda ? '' : string;
}

/**
 * CheckREG for checking regular expression alone with the string
 *
 * @param rule
 *            The regular expression
 * @param str
 *            Testing string
 * @return true or false
 */
function checkREG(rule, str) {

  var res = helperREG(rule, str, 2, 0);
  if (res == str.length && mark == 0) {
    return true;
  } else {
    return false;
  }
}

/**
 * helpfunction for reorder the regular expression
 */
function checkAfterOr(indexm, indexm1, m, obj, copy1, copy2) {
  for (var a = 0; a < indexm1.length; a++) {
    var inerpos = indexm.indexOf(indexm1[a]);
    if (inerpos != -1) {
      indexm.splice(inerpos, 1);
    }
  }
  if (indexm.length == 0) {
    obj[m] = copy2;
    obj[m + 1] = copy1;
  }
  return obj;
}

/**
 * remove the parentheses.
 * (a+b) ==> a+b
 *
 * @param str
 *            part of the regular expression
 * @return string
 */
function rmParentheses(str, pos) {
  return str.substr(1, str.length - pos);
}

/**
 * reorder the regular expression
 * b*ba ==> bb*a
 *
 * when b* follow by the same letter with star, reorder the regular expression.
 * So the check method can fit required letter first
 * @param sep
 *            part of the regular expression
 * @return string
 */
function reorder(sep) {
  for (var m = 0; m < sep.length - 1; m++) {
    if (
      sep[m] == sep[m + 1].substr(0, sep[m].length - 1) ||
      sep[m + 1] == sep[m].substr(0, sep[m].length - 1)
    ) {
      var temp = sep[m];
      sep[m] = sep[m + 1];
      sep[m + 1] = temp;
    } else if (sep[m].includes(')') && sep[m + 1].includes(')')) {
      var indexm;
      var indexm1;
      var copy1 = sep[m];
      var copy2 = sep[m + 1];
      if (sep[m].includes('*')) {
        indexm = rmParentheses(sep[m], 3);
        indexm1 = rmParentheses(sep[m + 1], 2);
      } else if (sep[m + 1].includes('*')) {
        continue;
      } else {
        indexm = rmParentheses(sep[m], 2);
        indexm1 = rmParentheses(sep[m + 1], 2);
      }
      indexm = or(indexm);
      indexm1 = or(indexm1);
      sep = checkAfterOr(indexm, indexm1, m, sep, copy1, copy2);
    }
  }
  return sep;
}

/**
 * Check form m position to the end of the regular expression
 * @param sep
 *            part of the regular expression
 * @param m
 *            check position
 * @return True/False
 */
function checkremindStar(sep, m) {
  for (m; m < sep.length; m++) {
    if (sep[m].charAt(sep[m].length - 1) != '*') {
      return false;
    }
  }
  return true;
}

/**
 * remove all *
 * @param rule
 *            part of the regular expression
 */
function lenthwithoudstar(rule) {
  return rule.replace(/\*/g, '');
}

/**
 * main method for checking whether a string conformed to a regular expression
 * @param rule
 *            regular expression
 * @param str
 *            check string
 * @param currentpos
 *            it is an iterative pointer point to the string.
 * @return iterative pointer position
 */
function helperREG(rule, str, pos, currentpos) {
  if (rule.charAt(0) == '(' && rule.charAt(rule.length - 1) == ')') {
    rule = rmParentheses(rule, pos);
  }
  var todoList = or(rule);
  var strCheckPos = currentpos;
  var record = strCheckPos;
  for (var i = 0; i < todoList.length; i++) {
    mark = 0;
    markPos = 0;
    strCheckPos = record;
    var sep = cat(todoList[i]);
    for (var m = 0; m < sep.length; m++) {
      var recordpos2 = strCheckPos;
      sep = reorder(sep);
      // a = a
      if (sep[m].length == 1 && str.charAt(strCheckPos) == sep[m]) {
        strCheckPos++;
      } else if (
        //a* = aaa
        sep[m].length == 2 &&
        sep[m].charAt(1) == '*' &&
        str.charAt(strCheckPos) == sep[m].charAt(0)
      ) {
        strCheckPos++;
        while (str.charAt(strCheckPos) == sep[m].charAt(0)) {
          strCheckPos++;
        }
      } else if (
        //(ab)* = aaa
        sep[m].charAt(sep[m].length - 1) == '*' &&
        sep[m].charAt(sep[m].length - 2) == ')'
      ) {
        while (strCheckPos < str.length) {
          var temp2 = rmParentheses(sep[m], 3);
          var recpos = strCheckPos;
          if (!temp2.includes('+') && !temp2.includes('*')) {
            var len = lenthwithoudstar(temp2).length;
            strCheckPos = helperREG(temp2, str, 3, strCheckPos);
            if (
              !checkremindStar(sep, markPos + 1) ||
              (strCheckPos >= recpos && !checkAllstar)
            ) {
              if (recpos + len == strCheckPos) {
                continue;
              } else {
                strCheckPos = recpos;
                break;
              }
            }
          } else {
            strCheckPos = helperREG(temp2, str, 3, strCheckPos);
          }
        }
        if (strCheckPos != str.length) {
          continue;
        }
      } else if (sep[m].charAt(sep[m].length - 1) == ')') {
        //(ab)
        strCheckPos = helperREG(sep[m], str, 2, strCheckPos);
      } else if (sep[m].charAt(sep[m].length - 1) == '*') {
        continue;
      }
      if (recordpos2 == strCheckPos) {
        checkAllstar = checkremindStar(sep, m);
      } else {
        checkAllstar = checkremindStar(sep, m + 1);
      }
      markPos = m;
      if (m != sep.length - 1 && !checkAllstar && strCheckPos == str.length && !emptyStr) {
        mark = -1
        break
      }
      if (emptyStr && i == todoList.length - 1 && !checkAllstar) {
        mark = -1
      }
      if (recordpos2 == strCheckPos || strCheckPos == str.length && !emptyStr) {
        break;
      }
    }
    if (strCheckPos == str.length && checkAllstar) {
      break;
    }
    if (i < todoList.length) {
      continue;
    }
  }
  return strCheckPos;
}

/**
 * help function for adding test cases to object
 * @param flag
 *            True/false flag
 * @param testCase
 *            object
 */
function checkAdd(flag, testCase) {
  if (flag) {
    if (str.charAt(0) == 'T') {
      str = str.substr(1);
    }
    if (loopkey(testCaseList5, str)) {
      return 0
    }
    if (trueCounter < trueStringLimit) {
      addtoTestCase(str, testCase, 1);
      trueCounter++;
    }
  } else {
    if (str.charAt(0) == 'F') {
      str = str.substr(1);
    }

    if (loopkey(testCaseList5, str)) {
      return 0
    } else if (falseCounter < falseStringLimit) {
      addtoTestCase(str, testCase, 0);
      falseCounter++;
    }
  }
}

function loopkey(testCases, str) {
  for (var name in testCases) {
    if (Object.keys(testCases[name]) == str) {
      return true;
    }
  }
  return false;
}
// /**
//  * random string generator help function
//  * @return string
//  */
// function stringGenerate() {
//   var min = randomStringLength[0];
//   var max = randomStringLength[1];
//   var stringLength = Math.round(Math.random() * (max - min)) + min;
//   for (var a = 0; a < stringLength; a++) {
//     var pos = Math.round(Math.random() * (containLetters.length - 1));
//     str += containLetters[pos];
//   }
//   if (caseCounter == 0) {
//     str = '';
//   }
//   return str;
// }

/**
 * dealing with regular expression
 * the testcases store at different position in the object
 *
 * @param testCase
 *            object
 * @param flag
 *            regular expression exercise or regular grammar exercise flag
 *
 */
function regExpHandler(testCase, flag) {
  var solu;
  var copy = str;
  testCaseList5 = testCase.testCases

  if (!loopkey(testCaseList5, copy)) {
    if (flag != 0) {
      if (testCase[0].solution != '') {
        testCase[0].solution = testCase[0].solution.split(' ').join('');
        testCase[0].solution = testCase[0].solution.replace(/\ /g, '');
        solu = checkREG(testCase[0].solution, str);
        checkAdd(solu, testCase);
      } else {
        checkAdd(checkRule(str), testCase);
      }
    } else {
      if (testCase.solution != '') {
        testCase.solution = testCase.solution.split(' ').join('');
        solu = checkREG(testCase.solution, str);
        checkAdd(solu, testCase);
      } else {
        checkAdd(checkRule(str), testCase);
      }
    }
  }
}



function hardcode(copyObj, flag, str) {
  checkAdd(checkRule(str), copyObj)
}


/**
 * produce random number
 */
function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}