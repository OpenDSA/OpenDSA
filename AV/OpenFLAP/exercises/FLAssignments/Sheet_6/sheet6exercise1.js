function customGenerator() {
  //Change the flag and ReWrite here
}





function checkRule(str) {
  var b = (str.split('b')).length - 1;
  if (b % 3 == 0 && str.indexOf("aab") == -1) {
    return true;
  } else {
    return false;
  }
}