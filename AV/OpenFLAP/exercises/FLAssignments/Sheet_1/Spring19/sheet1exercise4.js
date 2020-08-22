function customGenerator() {
  //Change the flag and ReWrite here
}



function checkRule(str) {
  var n = (str.split('a')).length - 1;
  var m = (str.split('b')).length - 1;
  if ((n % 2 == 0 && m % 2 == 0) || (n % 2 == 1 && m % 2 == 1)) {
    return true;
  } else {
    return false;
  }
}