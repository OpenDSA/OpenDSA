/*global ODSA */
$(document).ready(function() {
    "use strict";
    var av_name = "SkipListRmvCON";
//    var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  
    var jsav = new JSAV(av_name);
	isStepShown(false);
    var ll = new SkipList(jsav);
    ll.insert(new KVPair(0, "D"));
    ll.insert(new KVPair(4, "F"));
    ll.insert(new KVPair(1, "A"));
    ll.insert(new KVPair(2, "G"));
    ll.insert(new KVPair(3, "C"));
    ll.insert(new KVPair(9, "B"));
	jsav.umsg("The removal step is similar to the insertion process in a way that it also use an update array to search for the position of the key in the Skip List before removing it. Click next to see removal of different keys");
    jsav.displayInit();
    isStepShown(true);
    jsav.umsg("Lets remove key 1. Note that this key is in the middle wich involve update pointers before and after it.");
    ll.removeKey(1);
    jsav.step();
    jsav.umsg("Now lets remove key 9. This is an end removal and only the pointer before this key need to be updated.");
    ll.removeKey(9);
    jsav.step();
    jsav.umsg("Lets remove key 0, an middle removal");
    ll.removeKey(0);
    jsav.step();
    jsav.umsg("Finally, Lets remove key 2, another middle removal");
    ll.removeKey(2);
    jsav.recorded();
   });
