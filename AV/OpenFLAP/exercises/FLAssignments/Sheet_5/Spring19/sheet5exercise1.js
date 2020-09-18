function checkRule(str) {
  var a = (str.split('a')).length - 1;
  var b = (str.split('b')).length - 1;

  if (a == b) {
    return true;
  } else {
    return false;
  }
}

function customGenerator() {
  if (trueCounter == 0) {
    return str;
  } else {
    str = subStringFun(str, "a", 0, 5);
    str = subStringFun(str, "b", 0, 8);
    str = subStringFun(str, "a", 0, 5);
  }
  return str;
}

function subStringFun(str, letter, min, max) {
  var num = randomNumber(min, max);
  for (var a = 0; a < num; a++) {
    str += letter;
  }
  return str;
}