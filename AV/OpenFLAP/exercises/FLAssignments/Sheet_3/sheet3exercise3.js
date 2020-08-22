function customGenerator() {
  //Change the flag and ReWrite here
}



function checkRule(str) {
  var positions = new Array();
  var pos = str.indexOf("bbb");
  while (pos > -1) {
    positions.push(pos);
    pos = str.indexOf("bbb", pos + 1);
  }
  if (positions.length == 1) {
    return true;
  } else {
    return false;
  }
}