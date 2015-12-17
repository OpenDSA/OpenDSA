$(document).ready(function () {
  "use strict";
  var empty = [];
  empty.length = 11;
  var av = new JSAV("collisionCON7");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(empty, {indexed: true});

  av.umsg("Let's see what happens when we use a hash table of size M = 11 (a prime number), our primary hash function is a simple mod on the table size (as usual), and our secondary hash function is h<sub>2</sub>(k) = 1 + (k % (M-1)).");
  av.label("h<sub>2</sub>(k) = 1 + (k % (M-1))", {top: 85, left: 250});
  av.displayInit();

  av.umsg("Insert 55.");
  arr.highlight(0);
  arr.value(0, 55);
  av.step();

  av.umsg("Insert 66. This causes a collision at slot 0.");
  av.step();

  av.umsg("Compute h<sub>2</sub>(66) = 1 + (66 % 10) = 7. So we will now do linear probing by steps of 7. Slot 0 + 7 = 7 is checked first, and it is empty.");
  arr.unhighlight(0);
  arr.highlight(7);
  arr.value(7, 66);
  av.step();

  av.umsg("Insert 11. This causes a collision at slot 0.");
  arr.unhighlight(7);
  arr.highlight(0);
  av.step();

  av.umsg("Compute h<sub>2</sub>(11) = 1 + (11 % 10) = 2. So we will now do linear probing by steps of 2. Slot 0 + 2 = 2 is checked first, and it is empty.");
  arr.unhighlight(0);
  arr.highlight(2);
  arr.value(2, 11);
  av.step();

  av.umsg("Insert 24. This causes a collision at slot 2.");
  av.step();

  av.umsg("Compute h<sub>2</sub>(24) = 1 + (24 % 10) = 5. So we will now do linear probing by steps of 5. Slot 2 + 5 = 7 is checked first, and we get another collision.");
  arr.unhighlight(2);
  arr.highlight(7);
  av.step();
  
  av.umsg("Step again by 5 to slot 7 + 5 = 12 % 11 = 1. Slot 1 is free.");
  arr.unhighlight(7);
  arr.highlight(1);
  arr.value(1, 24);
  av.recorded();
});
