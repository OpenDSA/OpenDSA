
/* old attempts 
input = ['param7', 'param3', 'param2', 'param3', 'param7', 'param5', 'param3', 'param2', 'param8', 'param3', 'param7', 'param6', 'param4']; //this was the original list of events that you wanted 
function clickHandler() {
  for(var counter = 0; counter < input.length; counter++) {
    document.getElementById(input[counter]).click();
    sleep(2000);
  }
}
setInterval(myFunction, 1000);

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
*/

var i = 0;
var myIFrame = document.getElementById('exerciseLoadIframe'); //stores the iframe in a local variable 
var input = ['param7', 'param3', 'param2', 'param3', 'param7', 'param5', 'param3', 'param2', 'param8', 'param3', 'param7', 'param6', 'param4']; //this was the original list of events that you wanted 

function clickHandler() {
  if(i == input.length) {
    alert('You have reached the end of the events'); //throws an alert() if they have reached the end of the events to account for error state 
  }
  else {
    myIFrame.contentDocument.getElementById(input[i]).click(); 
    i++;
  }
}

function reset() {
  i = 0;
}
 
//this function reloads the page after the iframe url has been stored as a variable 
//var myIFrameURL = document.getElementById('excerciseLoadIframe').contentWindow.location.href //this should store the URL of the iframe in a variable in emulator.js
/*function reload() {
  document.getElementById('exerciseLoadIframe').src += '';
}
buttonRefresher.onclick = reload;
*/
