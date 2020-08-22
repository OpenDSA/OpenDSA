function customGenerator() {
  //Change the flag and ReWrite here
}




function checkRule(str) {
  var a = (str.split('a')).length - 1;
  var b = (str.split('b')).length - 1;
  if (a % b == 0 && a / b == 2) {
    return true;
  } else {
    return false;
  }
}