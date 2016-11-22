/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "SkipListInsertExplainCON";
//  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;

  var jsav = new JSAV(av_name);
  jsav.umsg("Illustration of Skip List insertion");
  var ll = new SkipList(jsav);
  jsav.displayInit();
  jsav.umsg("inserting initial value 10, assuming random level retutn 1");
  ll.insert(new KVPair(10, "A"), 1);
  jsav.step();
  jsav.umsg("inserting value 20, assuming random level retutn 0");
  ll.insert(new KVPair(20, "B"), 0);
  jsav.step();
  jsav.umsg("inserting value 5, assuming random level retutn 0");
  ll.insert(new KVPair(5, "C"), 0);
  jsav.step();
  jsav.umsg("inserting value 2, assuming random level retutn 3");
  ll.insert(new KVPair(2, "D"), 3);
  jsav.step();
  jsav.umsg("final Step, inserting value 30, assuming random level retutn 2");
  ll.insert(new KVPair(30, "D"), 2);
  jsav.step();
  jsav.recorded();
});
