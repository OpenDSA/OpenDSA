$(document).ready(function () {
  "use strict";
  var empty = [];
  empty.length = 10;
  var av = new JSAV("linProbeCON1");
  // Create an array object under control of JSAV library
  var arr = av.ds.array(empty, {indexed: true});

  av.umsg("The simplest collsion resolution method is called linear probing. We simply move to the right in the table from the home slot, wrapping around to the beginning if necessary.");
  av.displayInit();

  av.umsg("Starting with an empty table of size 10, we will insert the values 9877, 9050, 2037, 1059, and 7200 in that order using the simple mod hash function.");
  av.step();

  av.umsg("Insert a record with key value 9877 into position 7.");
  arr.value(7, 9877);
  arr.highlight(7);
  av.step();

  av.umsg("Insert a record with key value 9050 into position 0.");
  arr.unhighlight(7);
  arr.value(0, 9050);
  arr.highlight(0);
  av.step();

  av.umsg("Insert a record with key value 2037. The hash function takes this to slot 7.");
  arr.unhighlight(0);
  arr.highlight(7);
  av.step();

  av.umsg("Since slot 7 is already full, we probe to slot 8.");
  arr.unhighlight(7);
  arr.highlight(8);
  av.step();

  av.umsg("Slot 8 is free, so insert the record there.");
  arr.value(8, 2037);
  av.step();

  av.umsg("Insert a record with key value 1059 into position 9.");
  arr.unhighlight(8);
  arr.value(9, 1059);
  arr.highlight(9);
  av.step();

  av.umsg("Insert a record with key value 7200. The hash function takes this to slot 0.");
  arr.unhighlight(9);
  arr.highlight(0);
  av.step();

  av.umsg("Since slot 0 is already full, we probe to slot 1.");
  arr.unhighlight(0);
  arr.highlight(1);
  av.step();

  av.umsg("Slot 1 is free, so insert the record there.");
  arr.value(1, 7200);
  av.recorded();
});
