function checkRule(str) {
  if (str.charAt(0) == "T") {
    str = str.substr(1)
    return true;
  } else {
    str = str.substr(1)
    return false;
  }
}

function customGenerator() {
  if (trueCounter < trueStringLimit) {
    var num = randomNumber(0, 6);
    str = "T";
    if (num == 0) {
      str += "a";
      str += possibleCase(0, 4);
    } else if (num == 1) {
      str += "bb";
      str += possibleCase(0, 4);
    } else if (num == 2) {
      str += "ba";
      str += possibleCase(0, 4);
    } else if (num == 3) {
      str += "aa";
      str += possibleCase(0, 4);
      str += "a";
    } else if (num == 4) {
      str += "aa";
      str += possibleCase(0, 4);
      str += "b";
    } else if (num == 5) {
      str += "ab";
      str += possibleCase(0, 4);
      str += "b";
    } else {
      str += "ab";
      str += possibleCase(0, 4);
      str += "a";
    }
    return str;
  } else if (falseCounter < falseStringLimit) {

    str = "F";
    var num1 = randomNumber(0, 4);
    if (num1 == 0) {
      var num = randomNumber(0, 8);
      if (num % 2 == 0) {
        for (var i = 0; i < num; i++) {
          str += "a"
        }
      }
    } else if (num1 == 1) {
      str += "b";
      str += possibleCase(0, 4);
    } else if (num1 == 2) {
      str += "aa";
      str += possibleCase(0, 4);
    } else {
      str += "ab";
      str += possibleCase(0, 4);
    }
    if (falseCounter == 0) {
      str = "F";
      return str;
    }
  }
  return str;
}

function possibleCase(min, max) {
  var ramdomStr = ""
  var num = randomNumber(0, 3);
  if (num == 0) {
    for (var a = 0; a < num; a++) {
      ramdomStr += "ab";
    }
  } else if (num == 1) {
    for (var a = 0; a < num; a++) {
      ramdomStr += "ba";
    }
  } else if (num == 2) {
    for (var a = 0; a < num; a++) {
      ramdomStr += "aa";
    }
  } else {
    for (var a = 0; a < num; a++) {
      ramdomStr += "bb";
    }
  }
  return ramdomStr;
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