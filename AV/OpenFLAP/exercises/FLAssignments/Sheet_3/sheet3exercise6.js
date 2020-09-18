function checkRule(str) {
  var n = (str.split('a')).length - 1;
  if (n % 3 == 0) {
    return true;
  } else {
    return false;
  }
}