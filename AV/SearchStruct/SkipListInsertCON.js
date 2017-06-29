/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "SkipListInsertCON";
//  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;

var jsav = new JSAV(av_name, {left: 250});

  // Slide 1
  jsav.umsg("Now we will illustrate skip list insertion");
  var ll = new SkipList(jsav);
  jsav.displayInit();

  // Slide 2
  jsav.umsg("The skip list is initialized with a header node at level 0, whose forward pointers are set to null.");
  jsav.step();

  // Slide 3
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
