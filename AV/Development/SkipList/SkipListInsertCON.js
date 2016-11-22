/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "SkipListInsertCON";
  //var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  
  var jsav = new JSAV(av_name);
  jsav.umsg(" Illustration of the Skip List concept. A simple linked list.");
  var ll = new SkipList(jsav);
  isStepShown(false);
  var a = new KVPair(5, "A");
  var b = new KVPair(25, "B");
  var d2 = new KVPair(30, "D");
  var c = new KVPair(31, "C");
  var d = new KVPair(42, "D");
  var g = new KVPair(58, "G");
  var h = new KVPair(62, "H");
  var i = new KVPair(69, "I");
  ll.insert(a, 0);
  ll.insert(b, 0);
  ll.insert(d2,0);
  ll.insert(c, 0);
  ll.insert(d, 0);
  ll.insert(g, 0);
  ll.insert(h, 0);
  ll.insert(i, 0);
  jsav.displayInit();
  jsav.umsg(" Augmenting the linked list with additional pointers at every other node");
  ll.removeKey(25);
  ll.removeKey(31);
  ll.removeKey(58);
  ll.removeKey(69);
  //--------------------------augment height of node
  ll.insert(b, 1);
  ll.insert(c, 1);
  ll.insert(g, 1);
  ll.insert(i, 1);
  //---------------------search
  jsav.step();
  isStepShown(true);
  jsav.umsg("Let's find node with value 62");
  ll.search(62);
  jsav.step();
  //---------------------ideal SkipList O(logn)
  jsav.umsg(" The ideal Skip List, guaranteeing O(logn) search time.");
  isStepShown(false);
  ll.removeKey(31);
  ll.removeKey(69);
  ll.insert(c, 2);
  ll.insert(i, 2);
  jsav.step();
  jsav.umsg("Let's find node with value 62 again");
  isStepShown(true);
  ll.search(62);
  jsav.recorded();
});
