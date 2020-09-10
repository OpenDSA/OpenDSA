function checkRule(str) {
  var a = (str.split('a')).length - 1;
  var b = (str.split('b')).length - 1;
  if ((a + b) % 2 == 1) {
    return true;
  } else {
    return false;
  }
}

function customGenerator() {
  str = subStringFun(str, "a", 0, 7);
  str = subStringFun(str, "b", 0, 7);
  return str;
}

function subStringFun(str, letter, min, max) {
  var num = randomNumber(min, max);
  for (var a = 0; a < num; a++) {
    str += letter;
  }
  if (falseCounter == 0) {
    return "";
  }
  return str;
}