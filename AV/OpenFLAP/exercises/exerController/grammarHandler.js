var testCaseList4 = [];
/**
 * find all grammars that have same left hand variable
 *
 * @param rule
 *            all grammar rules
 * @param key
 *            Left hand terminal variable
 * @returns array that contains "Id, From, To, EdgeValue". 
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


/**
 * Ex:
 * tempRule: A -> aAb
 * String: acb
 * Return: c
 * 
 * @param tempRule
 *            Current grammar rule
 * @param str
 *            Traverse string
 * @returns 
 *            string after remove some chars.
 */
function cleanStr(tempRule, string) {
  while (true) {
    var tempChar = tempRule.charAt(0);
    if (tempChar != tempChar.toUpperCase() && tempChar == string.charAt(0)) {
      tempRule = tempRule.substring(0 + 1, tempRule.length);
      string = string.substring(0 + 1, string.length);
      continue;
    }
    break;
  }
  while (true) {
    var charinRule = tempRule.charAt(tempRule.length - 1);
    var charinStr = string.charAt(string.length - 1);
    if (charinRule != charinRule.toUpperCase() && charinRule == charinStr) {
      tempRule = tempRule.substring(0, tempRule.length - 1);
      string = string.substring(0, string.length - 1);
      continue;
    }
    break;
  }
  var char1 = tempRule.charAt(0);
  var char2 = tempRule.charAt(tempRule.length - 1);
  if (
    char1 != char1.toUpperCase() ||
    char2 != char2.toUpperCase() ||
    (char1 == '' && char2 == '' && string != '')
  ) {
    tempRule = 'False';
    string = 'False';
  }

  var obj = [];
  obj.push(tempRule);
  obj.push(string);
  return obj;
}



/**
 * Traverse Grammar
 *
 * @param rule
 *            Grammar rules 
 * @param string
 *            Traverse string
 * @param key
 *            left hand of current grammar
 * @param pos
 *            string traverse position pointer
 * 
 * @returns true or false
 * 
 */
var lambdaCheck = false;
var rem = '';
var finalCheck = false;

function grammarTrav(rule, string, flag, key, pos) {
  var backupPos = pos;
  var keyPackage = findSameKey(rule, key);
  var backRem = rem;
  for (var i = 0; i < keyPackage.length; i++) {
    rem = backRem;
    backRem = keyPackage[i][0];
    pos = backupPos;
    var tempRule = keyPackage[i][0];
    var rulePointer = 0;
    var backUpRulePointer;
    var aftClean = cleanStr(tempRule, string);
    if (aftClean[1] != 'False' && aftClean[0] != 'False') {
      string = aftClean[1];
      tempRule = aftClean[0];
      specialCase = true;
    } else {
      continue;
    }
    while (pos < string.length || tempRule.length > 0) {
      if (
        rulePointer + 1 > tempRule.length &&
        tempRule.length != 0 &&
        pos >= string.length
      ) {
        return pos;
      }
      var curChar = tempRule.charAt(rulePointer);

      if (curChar == '') {
        break;
      }
      if (curChar == curChar.toUpperCase()) {
        backUpRulePointer = rulePointer;
        rem = tempRule.substring(rulePointer + 1, tempRule.length) + rem;
        var tempV = grammarTrav(rule, string, flag, curChar, pos);

        if (tempV != -1) {
          pos = tempV;
        }
        rulePointer = backUpRulePointer + 1;
      } else {
        if (curChar == string.charAt(pos)) {
          pos = pos + 1;
          rulePointer = rulePointer + 1;
          lambdaCheck = false;
        } else {
          break;
        }
      }
    }
    if (pos == string.length) {
      break;
    }
  }
  if (pos == string.length && specialCase) {
    if (pos == 0) {
      finalCheck = true;
    }
    return true;
  } else {
    return false;
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

var specialCase
/**
 * Grammar traverse start funtion. 
 *
 * @param testCase
 *            object
 * @param str
 *            test string
 */
function graHandler(testCase, flag, string) {
  var rule = testCase.solution;
  testCaseList4 = testCase.testCases
  var key = 'S';
  finalCheck = false;
  if (string == "") {
    specialCase = false;
  }

  grammarTrav(rule, string, flag, key, 0);
  rem = '';
  gramAdd(testCase, finalCheck, string);
  return 0;
}