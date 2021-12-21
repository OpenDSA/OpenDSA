


const myForm = document.getElementById("myForm");
const realFile = document.getElementById("real-file");
var data = JSON.parse(realFile); //this goes through the JSON file that is being passed in and stores it as a array called data 
var dataFiltered = null;
var dataSorted = null;
//data needs to be filtered to only have click events in it and it also needs to be sorted based on action-time

var i = 0;
var myIFrame = document.getElementById('exerciseLoadIframe'); //stores the iframe in a local variable 


for(let j = 0; j < data.length; j ++) { //this for loop goes through and only adds in click events 
  if(data[j].name == "click") {
    dataFiltered[j] = data[j];
  }
}

function compare( a, b ) {
  if ( a.action_time < b.action_time ){
    return -1;
  }
  if ( a.action_time > b.action_time ){
    return 1;
  }
  return 0;
}

dataSorted = dataFiltered.sort( compare ); //this sorts the array so all the click events are now in order of time they were clicked 





/* we don't need this anymore because this converts from csv to array 
function csvToArray(str, delimeter = /[\n\r\s]+/) {
  var headers = str.slice(0, str.indexOf("\n")).split(delimeter);
  var rows = str.slice(str.indexOf("\n") + 1).split(delimeter); //takes in all the row elements as data 
  var arr = rows.map(function(row) {
    var values = row.split(delimeter);
    var el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
    });
    return arr;
  }
*/

/* don't need a fileReader object to be created anymore 
myForm.addEventListener("submit", function(e) { //this prevents the browsers default submit behavior 
  e.preventDefault();
  const input = realFile.files[0]; //takes the first file in 
  const reader = new FileReader(); //intitalizes a new file reader 

  reader.onload = function (e) {
    const text = e.target.result;
    data = csvToArray(text);
    console.log(JSON.stringify(data));
  }

  reader.readAsText(input);
});
*/


/*
*** this is a clickHandler function that takes in multiple different events 
function clickHandler() {
  if(i == data.length) {
    alert('You have reached the end of the events'); //throws an alert() if they have reached the end of the events to account for error state 
  }
  else {
    var name = JSON.stringify(data[i][0]) //this takes the name element of this current element and turns it into a string
    if ((name === "jsav-ddl-change") | (name === "jsav-text-entry")) { //if its a text entry or ddl change it jsut prints to the console
      console.log(data[i][1]);
    }
    else {
    myIFrame.contentDocument.getElementById(data[i]["id"]).click(); //if it is actually a click element it performs the click operation
    i++;
    }
  }
}
*/ 


function clickHandler() {
  if(i == data.length) {
    alert('You have reached the end of the events'); //throws an alert() if they have reached the end of the events to account for error state 
  }
  else {
    myIFrame.contentDocument.getElementById(data[i]["description"]).click(); //not sure what to put here because the id is within the description 
    }
  }

function reset() {
  i = 0;
}
