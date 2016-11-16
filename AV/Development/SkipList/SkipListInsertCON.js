/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "SkipListInsertCON";
//  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;

  var jsav = new JSAV(av_name);
  jsav.umsg("We start with an empty SkipList");
  var ll = new SkipList(jsav);
  jsav.displayInit();
  jsav.umsg("adding one key-value pair (1, A)");
  ll.insert(new KVPair(1, "A"));
  jsav.step();
  jsav.umsg("adding another key-value pair (9, B)");
  ll.insert(new KVPair(9, "B"));
  jsav.step();
  jsav.umsg("adding another key-value pair (3, C)");
  ll.insert(new KVPair(3, "C"));
  jsav.step();
  jsav.umsg("adding another key-value pair (0, D)");
  ll.insert(new KVPair(0, "D"), null, 1);
  jsav.step();
  jsav.umsg("adding duplicate key-value pair (0, D)");
  ll.insert(new KVPair(0, "D"));
  jsav.step();
  jsav.umsg("adding another key-value pair (4, F)");
  ll.insert(new KVPair(4, "F"));
  jsav.step();
  jsav.recorded();
});
