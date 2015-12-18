$(document).ready(function () {
  "use strict";

  var empty = [];
  var permarray = [0, 3, 7, 6, 1, 4, 9, 2, 5, 8];
  var countup = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  empty.length = 10;
  var av = new JSAV("collisionCON3");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(empty, {indexed: true});
  var perm = av.ds.array(permarray, {indexed: true, visible: false});

  av.umsg("Let's see an example of collision resolution using pseudorandom probing on a hash table of size 10 using the simple mod hash function.");
  av.displayInit();

  av.umsg("We need to first define a random permutation of the values 1 to M-1 that all inserts and searches will use. This is shown in the <code>permuation</code> array, so that you can see it during the whole slideshow.");
  perm.show();
  av.label("Permutation:", {before: perm, top: 70});
  av.step();

  av.umsg("Insert a record with key value 157.");
  arr.highlight(7);
  arr.value(7, 157);
  av.step();

  av.umsg("Insert a record with key value 273.");
  arr.unhighlight(7);
  arr.highlight(3);
  arr.value(3, 273);
  av.step();

  av.umsg("Insert a record with key value 17. Unfortunately there is already a value in slot 7.");
  arr.unhighlight(3);
  arr.highlight(7);
  av.step();

  av.umsg("So now we look in the permuation array for the value at position perm[1], and add that value to the home slot index (which is 7), to get a value of 10 % 10, which is slot 0.");
  arr.unhighlight(7);
  arr.highlight(0);
  arr.value(0, 17);
  av.step();

  av.umsg("Insert a record with key value 913. Unfortunately there is already a value in slot 3.");
  arr.unhighlight(0);
  arr.highlight(3);
  av.step();

  av.umsg("So now we look in the permuation array for the value at position perm[1], and add that value to the home slot index (which is 3), to get a value of 6.");
  arr.unhighlight(3);
  arr.highlight(6);
  arr.value(6, 913);
  av.step();

  av.umsg("Insert a record with key value 110. Unfortunately there is already a value in slot 0.");
  arr.unhighlight(6);
  arr.highlight(0);
  av.step();

  av.umsg("So now we look in the permuation array for the value at position perm[1], and add that value to the home slot index (which is 0), to get a value of 3. Unfortunately, slot 3 is full as well!");
  arr.unhighlight(0);
  arr.highlight(3);
  av.step();

  av.umsg("So now we look in the permuation array for the value at position perm[2], and add that value to the home slot index (which is 0), to get a value of 7. Unfortunately, slot 7 is full as well!");
  arr.unhighlight(3);
  arr.highlight(7);
  av.step();

  av.umsg("So now we look in the permuation array for the value at position perm[3], and add that value to the home slot index (which is 0), to get a value of 6. Unfortunately, slot 6 is full as well!");
  arr.unhighlight(7);
  arr.highlight(6);
  av.step();

  av.umsg("So now we look in the permuation array for the value at position perm[4], and add that value to the home slot index (which is 0), to get a value of 1. Finally!");
  arr.unhighlight(6);
  arr.highlight(1);
  arr.value(1, 110);
  av.step();

  av.umsg("Of course, any permutation is possible. Even one that gives us a bad probe sequence, such as the same as we would get from linear probing. But this will almost never happen in practice, since any given permutation is expected to appear once in n! tries.");
  var i;
  arr.unhighlight(1);
  for (i = 0; i < 10; i++) { arr.value(i, ""); }
  for (i = 0; i < 10; i++) { perm.value(i, i); }
  av.recorded();
});
