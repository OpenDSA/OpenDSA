$(document).ready(function () {
  "use strict";
  var empty = [];
  empty.length = 10;
  var av = new JSAV("linProbeCON2");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(empty, {indexed: true});

  av.umsg("Consider the situation where we left off in the last slide show. If at this point we wanted to insert the value 3348, we would have to probe all the way to slot 2.");
  arr.value(0, 9050);
  arr.value(1, 7200);
  arr.value(7, 9877);
  arr.value(8, 2037);
  arr.value(9, 1059);
  arr.highlight(2);
  av.displayInit();

  av.umsg("This might seem like an extreme case, but in fact this illustrates a persistent problem, in that linear probing violates a basic goal of a collision resolution method.");
  arr.unhighlight(2);
  av.step();

  av.umsg("Collision resolution methods should have the goal of making every free slot in the table be equally likely to get the next record. But consider where keys inserted into the table will hash to.");
  av.step();

  av.umsg("A key hashed to slot 0 will probe to slot 2. A key hashed to slot 1 will probe to slot 2. A key hashed to slot 2 will stay in slot 2. In fact, a key hashed to any of the highlighted positions will end up in slot 2.");
  arr.highlight([0, 1, 7, 8, 9]);
  av.step();

  av.umsg("In contrast, only keys hashed directly to slot 3 will end up in slot 3.");
  arr.highlight(3);
  arr.unhighlight([0, 1, 7, 8, 9]);
  av.step();

  av.umsg("Here are the probabilities for each empty slot of getting the next record. Obviously, they are not balanced.");
  arr.unhighlight(3);
  av.label("60%", {left: 294, top: -20});
  av.label("10%", {left: 341, top: -20});
  av.label("10%", {left: 386, top: -20});
  av.label("10%", {left: 432, top: -20});
  av.label("10%", {left: 478, top: -20});
  av.step();

  av.umsg("In other words, clustering tends to lead to more clustering, because we tend to put new records next to old ones.");
  av.recorded();
});
