$(document).ready(function () {
  "use strict";

  var empty = [];
  empty.length = 10;
  var av = new JSAV("collisionCON6");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(empty, {indexed: true});

  av.umsg("Unfortunately, quadratic probing has the disadvantage that typically not all hash table slots will be on the probe sequence.");
  av.displayInit();

  av.umsg("Using p(K, i) = i<sup>2</sup> gives particularly inconsistent results.");
  av.step();

  av.umsg("Think of any number, and square it. The result will end in 0, 1, 4, 5, 6, or 9. Thus these are the only slots that can be reached by the probe sequence for a key value that hashes to slot 0.");
  arr.highlight([0, 1, 4, 5, 6, 9]);
  av.recorded();
});
