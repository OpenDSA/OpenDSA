function checkRule(str) {
  var i;
  if (str == "") {
    return true;
  }
  if (str.charAt(0) == "a") {
    if (str.charAt(1) != "b") {
      return false;
    }
  }
  if (str.charAt(str.length) == "a") {
    if (str.charAt(str.length - 1) != "b") {
      return false;
    }
  }
  for (i = 1; i < str.length - 1; i++) {
    if (str.charAt(i) == "a") {
      if (str.charAt(i - 1) == "b" || str.charAt(i + 1) == "b") {
        continue;
      } else {
        return false;
      }
    }
  }
  return true;
}

function customGenerator() {
  var str = "";
  var min = randomStringLength[0];
  var max = randomStringLength[1];
  var stringLength = Math.round(Math.random() * (max - min)) + min;
  for (var a = 0; a < stringLength; a++) {
    var pos = Math.round(Math.random() * (containLetters.length - 1));
    str += containLetters[pos];
  }
  if (caseCounter == 0) {
    str = "";
  }
  return str;
}