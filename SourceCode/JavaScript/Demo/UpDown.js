"use strict";
/*global console */
// run this using node, as in: node UpDown.js
var runs = 1000000;

function updown() {
  var i, j;
  var count = 1000;
  console.log("Doing " + count + " times");

  var time1 = new Date();
  var sum1 = 0;
  for (i = 0; i < runs; i++) {
    for (j = 0; j < count; j++)
      { sum1++; }
  }
  var time2 =  new Date();
  var sum2 = 0;
  for (i = runs; i > 0; i--) {
    for (j = count; j > 0; j--)
      { sum2++; }
  }
  var time3 = new Date();
  var sum3 = 0;
  for (i = runs; i !== 0; i--) {
    for (j = count; j !== 0; j--)
      { sum3++; }
  }
  var time4 = new Date();

  var sum4 = 0; i = 0;
  while (i !== runs) {
    j = 0;
    while (j !== count)
      { sum4++; j++; }
    i++;
  }
  var time5 = new Date();

  var sum5 = 0; i = 0;
  while (i < runs) {
    j = 0;
    while (j < count)
      { sum5++; j++; }
    i++;
  }
  var time6 = new Date();

  console.log("Up time is " + (time2 - time1) +
          ", down time is " + (time3 - time2));
  console.log("Check vs. zero time is " + (time4-time3));
  console.log("While loop time is " + (time5-time4));
  console.log("While loop 2 time is " + (time6-time5));
  console.log("Sum1 is " + sum1 + ", sum2 is " + sum2 + ", sum 3 is " + sum3);
  console.log("Sum4 is " + sum4);
  console.log("Sum5 is " + sum5);
}

updown();
