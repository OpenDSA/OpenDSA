function checkRule(str) {
  if (str.charAt(0) == "T") {
    str = str.substr(1);
    return true;
  } else {
    str = str.substr(1);
    return false;
  }
}

function customGenerator() {

  if (trueCounter < trueStringLimit) {
    str = "T";
    str = subStringFun(str, "aa", 1, 3);
    str += "bb";
    str = subStringFun(str, str, 0, 2);
    if (trueCounter == 0) {
      str = "T";
    }
  } else if (falseCounter < falseStringLimit) {
    str = "F";
    var casenum = randomNumber(0, 3);
    if (casenum == 1) {
      var randomnum = randomNumber(0, 14);
      while (randomnum % 2 == 0) {
        randomnum = randomNumber(0, 14);
      }
      str = addsubString(str, "a", randomnum)
      str += "bb";
    } else if (casenum == 2) {
      str = subStringFun(str, "a", 1, 5);
      str = subStringFun(str, "b", 3, 10);
    } else {
      str = subStringFun(str, "b", 1, 10);
    }
  }
  return str;
}

function addsubString(str, letter, repeat) {
  if (letter.charAt(0) == "T" || letter.charAt(0) == "F") {
    letter = letter.substr(1);
  }
  for (var a = 0; a < repeat; a++) {
    str += letter;
  }
  return str;
}

function subStringFun(str, letter, min, max) {
  if (letter.charAt(0) == "T" || letter.charAt(0) == "F") {
    letter = letter.substr(1);
  }
  var num = randomNumber(min, max);
  for (var a = 0; a < num; a++) {
    str += letter;
  }
  return str;
}