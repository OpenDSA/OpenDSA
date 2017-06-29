/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "SkipListInsertCON";
//  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;

var jsav = new JSAV(av_name, {left: 250});

  // Slide 1
  jsav.umsg("Now we will illustrate skip list insertion. The skip list is initialized with a header node of level 0, whose forward pointer is set to null. The top item shows the value associated with the skip list node. The head node is special so has the value \"Hd\".");
  var ll = new SkipList(jsav);
  jsav.displayInit();

  // Slide 2
  jsav.umsg("Now we will insert initial value 10, assuming randomLevel returns 0.");
  jsav.step();

  ll.insert(new KVPair(10, "A"), 0);
  jsav.step();

  jsav.umsg("Insert value 30, assuming randomLevel returns 1.");
  jsav.step();

  ll.insert(new KVPair(30, "B"), 1);
  jsav.step();

  jsav.umsg("Insert value 20, assuming randomLevel returns 2.");
  jsav.step();

  ll.insert(new KVPair(20, "C"), 2);
  jsav.step();

  jsav.umsg("Insert value 25, assuming randomLevel returns 0.");
  jsav.step();

  ll.insert(new KVPair(25, "D"), 0);
  jsav.step();

  jsav.recorded();
});
