/*global ODSA */
"use strict";
// Written by Mohammed Farghally and Cliff Shaffer
// Upper Bounds definition
$(document).ready(function () {
  var av_name = "UpperBoundCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
      interpret = config.interpreter;       // get the interpreter
  var av = new JSAV(av_name);
  var arr;
  var arr_values = [];
  var topAlign = 80;
  var leftAlign = 10;
  var rectWidth = 155;
  var rectHeight = 200;
  var arraySize = 7;
  var slideNumber = 1;
  
  // Slide 1
  av.umsg(interpret("Slide "+slideNumber++));
  av.displayInit();

  //Slide 2
  av.umsg(interpret("Slide "+slideNumber++));
  av.step();

  //Slide 3
  av.umsg(interpret("Slide "+slideNumber++), {preserve: true});
  var nLabel = av.label("|---------------------------- $n$ ----------------------------|", {left : leftAlign + 25, top : topAlign + 60});
  var count = 0;
  while(count < arraySize){
    var value = Math.round(Math.random() * 10) + 1;
    if(arr_values.indexOf(value) === -1){
      arr_values[count] = value;  
      count++;
    }
  }
  arr = av.ds.array(arr_values, {"left": leftAlign, "top": topAlign, "indexed": true});
  av.step();

  //Slide 4
  av.umsg(interpret("Slide "+slideNumber++), {preserve: true});
  av.step();

  //Slide 5
  av.umsg(interpret("Slide "+slideNumber++), {preserve: true, color:"red"});
  av.step();

  //Slide 6
  av.umsg(interpret("Slide "+slideNumber++));
  av.step();

  //Slide 7
  av.umsg(interpret("Slide "+slideNumber++), {preserve: true});
  var pointer = av.pointer("$k$", arr.index(0));
  av.step();

  //Slide 8
  av.umsg(interpret("Slide "+slideNumber++), {preserve: true});
  pointer.target(arr.index(arraySize -1));
  av.step();

  //Slide 9
  av.umsg(interpret("Slide "+slideNumber++), {preserve: true});
  pointer.target(arr.index(parseInt(arraySize/2)));
  av.step(); 

  //Slide 10
  av.umsg(interpret("Slide "+slideNumber++));
  pointer.target(arr.index(0));
  arr.css(0, {"background-color": "green"});
  av.step();

  //Slide 11
  av.umsg(interpret("Slide "+slideNumber++), {preserve: true});
  av.step();

  //Slide 12
  av.umsg(interpret("Slide "+slideNumber++));
  var indices = [];
  pointer.target(arr.index(parseInt(arraySize - 1)));
  for(var i = 0; i < parseInt(arraySize); i++){
    indices[i] = i;
  }
  arr.css(indices ,{"background-color": "red"});
  av.step();

  //Slide 13
  av.umsg(interpret("Slide "+slideNumber++), {preserve: true});
  av.step();

  //Slide 14
  av.umsg(interpret("Slide "+slideNumber++));
  for(i = 0; i < parseInt(arraySize); i++){
    arr.css(i, {"background-color": "white"});
  }
  pointer.target(arr.index(parseInt(arraySize/2)));
  arr.unhighlight();
  for(i = 0; i <= parseInt(arraySize/2); i++){
    arr.highlight(i);
  }
  av.step();

  //Slide 15
  av.umsg(interpret("Slide "+slideNumber++), {preserve: true});
  av.step();

  //Slide 16
  av.umsg(interpret("Slide "+slideNumber++), {color: "green"});
  arr.hide();
  nLabel.hide();
  pointer.hide();
  av.step();

  //Slide 17
  av.umsg(interpret("Slide "+slideNumber++), {preserve: true});
  topAlign = 15;
  var arr1 = av.ds.array(arr_values, {"left": leftAlign, "top": topAlign + 20, "indexed": true});
  var pointer1 = av.pointer("$k$", arr1.index(0));
  arr1.css([0], {"background-color":"green"});
  var label1 = av.label("$O(1)$ in the <b><u>Best Case.</u></b>",  {"top": topAlign + 25, "left": leftAlign + 395});
 
  var arr2 = av.ds.array(arr_values, {"left": leftAlign, "top": topAlign + 130, "indexed": true});
  var pointer2 = av.pointer("$k$", arr2.index(arraySize - 1));
  arr2.css(indices, {"background-color":"red"});
  var label2 = av.label("$O(n)$ in the <b><u>Worst Case</u></b>.",  {"top": topAlign + 135, "left": leftAlign + 395});

  var arr3 = av.ds.array(arr_values, {"left": leftAlign, "top": topAlign + 240, "indexed": true});
  var pointer3 = av.pointer("$k$", arr3.index(parseInt(arraySize/2)));
  for(i = 0; i <= parseInt(arraySize/2); i++){
    arr3.highlight(i);
  }
  var label3 = av.label("$O(n)$ in the <b><u>Average Case</u></b>.",  {"top": topAlign + 245, "left": leftAlign + 395});
  av.step();

  av.recorded();
});
