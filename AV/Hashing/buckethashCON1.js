// Title: Bucket Hashing Slideshow
// Author: Cliff Shaffer
// Institution: Virginia Tech
// Features: Algorithm Visualization
// Keyword: Bucket Hashing
// Natural Language: en
// Programming Language: N/A
/* Description: Slideshow showing the basic hash method of hashing to any free position within a computed bucket. */

$(document).ready(function () {
  "use strict";
  // Convenience function for setting another type of highlight
  // (will be used for showing which elements will be compared during sort)
  var setGray = function (a, index) {
    a.css(index, {"background-color": "#eee" });
  };

  var empty = [];
  var empty2 = [];
  var i;
  var offset = 74;
  var stepsize = 58;

  for (i = 0; i < 10; i++) { empty[i] = ""; }
  for (i = 0; i < 8; i++) { empty2[i] = ""; }
  var av = new JSAV('buckethashCON1');
  var arr = av.ds.array(empty, {indexed: true, center: false,
                            layout: "vertical", left: 20});
  for (i = 0; i < 4; i++) {
    av.g.line(15, offset + (i * stepsize), 80, offset + (i * stepsize), {"stroke-width": 2});
  }
  setGray(arr, [0, 1, 4, 5, 8, 9]);
  av.umsg("Demonstration of bucket hash for an array of size 10 storing 5 buckets, each two slots in size. The alternating gray and white cells indicate the buckets.");
  av.label("<b style='color:#0b0;'>B0</b>", {left: 80, top: 22});
  av.label("<b style='color:#0b0;'>B1</b>", {left: 80, top: 84});
  av.label("<b style='color:#0b0;'>B2</b>", {left: 80, top: 146});
  av.label("<b style='color:#0b0;'>B3</b>", {left: 80, top: 208});
  av.label("<b style='color:#0b0;'>B4</b>", {left: 80, top: 270});
  av.displayInit();
  var overflow = av.ds.array(empty2, {indexed: false, center: false,
                            layout: "vertical", top: 50, left: 150});
  av.label("Overflow", {before: overflow, left: 140, top: 20});
  av.umsg("We also need an overflow 'bucket' of infinite capacity to hold records from buckets in the main hash table that fill up.");
  av.step();
  av.umsg("As usual for our examples, we use a simple mod operation for our hash function.");
  av.step();
  av.umsg("Start by inserting a record with key value 8.");
  av.step();
  av.umsg("Since there are 5 buckets, we take 8 % 5 to get 3. Put this into the top of bucket 3, which is slot 6 of the table.");
  arr.highlight(6);
  arr.value(6, 8);
  av.step();
  av.umsg("Now insert a record with key value 30.");
  arr.unhighlight(6);
  av.step();
  av.umsg("Since there are 5 buckets, we take 30 % 5 to get 0. Put this into the top of bucket 0, which is slot 0 of the table.");
  arr.highlight(0);
  arr.value(0, 30);
  av.step();
  av.umsg("Now insert a record with key value 23.");
  arr.unhighlight(0);
  setGray(arr, 0);
  av.step();
  av.umsg("Since there are 5 buckets, we take 23 % 5 to get 3. Put this into the first empty slot in bucket 3, which is slot 7 of the table.");
  arr.highlight(7);
  arr.value(7, 23);
  av.step();
  av.umsg("Now insert a record with key value 48.");
  arr.unhighlight(7);
  av.step();
  av.umsg("Since there are 5 buckets, we take 48 % 5 to get 3. Put this into the first empty slot in bucket 3... but there are no more slots available for bucket 3.");
  av.step();
  av.umsg("So put it in the first available slot in the overflow array.");
  overflow.highlight(0);
  overflow.value(0, 48);
  av.step();
  av.umsg("Now insert a record with key value 20.");
  overflow.unhighlight(0);
  av.step();
  av.umsg("Since there are 5 buckets, we take 20 % 5 to get 0. Put this into the first free slot of bucket 0, which is slot 1 of the table.");
  arr.highlight(1);
  arr.value(1, 20);
  av.step();
  av.umsg("Now insert a record with key value 25.");
  arr.unhighlight(1);
  setGray(arr, 1);
  av.step();
  av.umsg("Since there are 5 buckets, we take 25 % 5 to get 0. Put this into the first empty slot in bucket 0... but there are no more slots available for bucket 0.");
  av.step();
  av.umsg("So put it in the first available slot in the overflow array.");
  overflow.highlight(1);
  overflow.value(1, 25);
  av.step();
  av.umsg("When looking for a record, we first take its hash value, and then search the resulting bucket.");
  overflow.unhighlight(1);
  av.step();
  av.umsg("When searching for key value 20, we search bucket 20 % 5 which is bucket 0.");
  av.step();
  av.umsg("First check slot 0");
  arr.highlight(0);
  av.step();
  av.umsg("Then check slot 1, and we have found it.");
  arr.unhighlight(0);
  setGray(arr, 0);
  arr.highlight(1);
  av.step();
  av.umsg("When searching for key value 25, we search bucket 25 % 5 which is bucket 0.");
  arr.unhighlight(1);
  setGray(arr, 1);
  av.step();
  av.umsg("First check slot 0.");
  arr.highlight(0);
  av.step();
  av.umsg("Then check slot 1.");
  arr.unhighlight(0);
  setGray(arr, 0);
  arr.highlight(1);
  av.step();
  arr.unhighlight(1);
  setGray(arr, 1);
  av.umsg("Since we have not found it, and since the bucket is full, we have to look through the overflow array.");
  av.step();
  av.umsg("Check slot 0.");
  overflow.highlight(0);
  av.step();
  av.umsg("Check slot 1, and we have found it.");
  overflow.highlight(1);
  overflow.unhighlight(0);
  setGray(arr, 0);
  av.recorded();
});
