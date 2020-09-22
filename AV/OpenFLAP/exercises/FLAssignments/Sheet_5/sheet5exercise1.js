function checkRule(str) {
  var n = (str.split('a')).length - 1;
  var m = (str.split('b')).length - 1;
  if (m >= n && (m - n) % 2 == 1) {
    return true;
  } else {
    return false;
  }
}

function customGenerator() {
  if (falseCounter == 0) {
    return str;
  } else {
    str = subStringFun(str, "a", 0, 10)
    str = subStringFun(str, "b", 0, 10)
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