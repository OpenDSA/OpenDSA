/*global ODSA, JSAV, document */
"use strict";
$(document).ready(function() {
  var av_name = "binsortS1CON";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;

  var theArray = [];
  var empty = [];
  var i;
  var av = new JSAV(av_name);

  empty.length = 10;
  for (i = 0; i < 10; i++) {
    theArray[i] = i;
  }
  ODSA.UTILS.permute(theArray);

  // Create an array object under control of JSAV library
  var arrA = av.ds.array(theArray, {indexed: true});
  av.label("A", {before: arrA, top: -9, left: 240});
  var arrB = av.ds.array(empty, {indexed: true});
  av.label("B", {before: arrB, top: 68, left: 240});

  av.umsg(interpret("av_c1"));
  av.displayInit();

  for (i = 0; i < theArray.length; i++) {
    av.umsg(interpret("av_c2") + arrA.value(i) + interpret("av_c3") + i +
            interpret("av_c4") + arrA.value(i) + interpret("av_c5"));
    av.effects.moveValue(arrA, i, arrB, arrA.value(i));
    av.step();
  }
  av.umsg(interpret("av_c6"));
  av.recorded();
});
