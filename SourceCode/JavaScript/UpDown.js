// run this using node, as in: node UpDown.js
var runs = 1000000;
updown();

function updown() {
  var i, j;
  var count = 1000;
  console.log("Doing " + count + " times");

  var time1 = new Date();
  var sum1 = 0;
  for (i=0; i<runs; i++)
    for (j=0; j<count; j++)
      { sum1++; }
  var time2 =  new Date();
  var sum2 = 0;
  for (i=runs; i != 0; i--)
    for (j=count; j != 0; j--)
      { sum2++; }
  var time3 = new Date();

  console.log("Up time is " + (time2-time1) +
          ", down time is " + (time3-time2));
  if (sum1 === sum2) {
    console.log("Sum1 and Sum2 are " + sum1);
  } else {
    console.log("Oops, sum1 is " + sum1 + " and sum2 is " + sum2);
  }
}
