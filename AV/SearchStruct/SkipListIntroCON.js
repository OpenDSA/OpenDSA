/*global ODSA */
$(document).ready(function() {
  "use strict";
  var av_name = "SkipListIntroCON";
  //var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  
  var jsav = new JSAV(av_name);

  // Slide 1
  jsav.umsg("Here we will illustrate the Skip List concept. We start with a simple linked list whose nodes are ordered by key value. To search this list requires that we move down the list one node at a time, visiting O(n) nodes in the average case.");
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

  // Slide 2
  jsav.umsg("Now, consider the effect of augmenting the linked list with additional pointers at every other node. If we add a pointer to every other node, that lets us skip alternating nodes, cutting the work roughly in half.");
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

  // Slide 3
  jsav.umsg("We will define nodes with a single pointer as level 0 Skip List nodes, and nodes with two pointers as level 1 Skip List nodes.");
  jsav.step();

  // Slide 4
  jsav.umsg("Now, let's find node with value 62. We begin by following the level 1 pointers until a value greater than the search key has been found.");
  jsav.step();

  ll.search(62);
  jsav.step();

  //---------------------ideal SkipList O(logn)
  jsav.umsg("We can extend this concept, making deeper nodes to skip greater distances in lnger lists. The ideal Skip List will guarantee O(logn) search time by skipping half way through the list on the first step, a quarter on the second step, and so on.");
  isStepShown(false);
  ll.removeKey(31);
  ll.removeKey(69);
  ll.insert(c, 2);
  ll.insert(i, 2);
  jsav.step();

  jsav.umsg("Let's find the node with value 62 again");
  isStepShown(true);
  ll.search(62);
  jsav.recorded();
});
