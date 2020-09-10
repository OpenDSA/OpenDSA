function customGenerator() {
  //Change the flag and ReWrite here
}



function checkRule(str) {
  var b = (str.split('b')).length - 1;
  var c = (str.split('c')).length - 1;
  if ((b + c) == 3) {
    return true;
  } else {
    return false;
  }
}