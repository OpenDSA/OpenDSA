// ******************************************************************************
// ******************************************************************************
function customGenerator() {
  //Change the flag and ReWrite here
}



function checkRule(str) {
  
  var positions = new Array();
  var pos = str.indexOf("bba");
  while (pos > -1) {
    positions.push(pos);
    pos = str.indexOf("bba", pos + 1);
  }
  var i;
  for (i = 0; i < positions.length; i++) {
    if (positions[i] % 2 == 0) {
      return true;
    } 
  }
  if (str == "") {
    return false;
  }else{
    return false;
  }
}