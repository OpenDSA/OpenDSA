$(document).ready(function () {
  "use strict";
  var empty = [];
  empty.length = 16;
  var av = new JSAV("collisionCON8");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(empty, {indexed: true});

  av.umsg("Now we try the alternate second hash function. Use a hash table of size M = 16 (a power of 2), our primary hash function is a simple mod on the table size (as usual), and our secondary hash function is h<sub>2</sub>(k) = (((k/M) % (M/2)) * 2) + 1.");
  av.label("h<sub>2</sub>(k) = (((k/M) % (M/2)) * 2) + 1", {top: 85, left: 315});
  av.displayInit();

  av.umsg("Insert 55. 55 % 16 = 7.");
  arr.highlight(7);
  arr.value(7, 55);
  av.step();

  av.umsg("Insert 39. 39 % 16 = 7. This causes a collision at slot 7.");
  av.step();

  av.umsg("Compute h<sub>2</sub>(39) = ((39/16) % 8) * 2 + 1 = 5. So we will now do linear probing by steps of 5. Slot 7 + 5 = 12 is checked first, and it is empty.");
  arr.unhighlight(7);
  arr.highlight(12);
  arr.value(12, 39);
  av.step();

  av.umsg("Insert 92. 92 % 16 = 12. This causes a collision at slot 12.");
  av.step();

  av.umsg("Compute h<sub>2</sub>(92) = ((92/16) % 8) * 2 + 1 = 11. So we will now do linear probing by steps of 11. Slot (12 + 11) % 16 = 7 is checked first. Since this contains a value, we get another collision.");
  arr.unhighlight(12);
  arr.highlight(7);
  av.step();

  av.umsg("Step forward by 11 again. (7 + 11) % 16 = 2, so check slot 2. This is empty.");
  arr.unhighlight(7);
  arr.highlight(2);
  arr.value(2, 46);
  av.recorded();
});
