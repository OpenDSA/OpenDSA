/*global ODSA */
$(document).ready(function() {
    "use strict";
    var av_name = "SkipListRmvCON";
//    var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  
    var jsav = new JSAV(av_name, {left: 200});
	isStepShown(false);
    var ll = new SkipList(jsav);
    ll.insert(new KVPair(0, "D"));
    ll.insert(new KVPair(4, "F"));
    ll.insert(new KVPair(1, "A"));
    ll.insert(new KVPair(2, "G"));
    ll.insert(new KVPair(3, "C"));
    ll.insert(new KVPair(9, "B"));
	jsav.umsg("The remove operation is similar to insertion in that it also uses an update array to search for the position of the key in the Skip List before removing it.");
    jsav.displayInit();
    isStepShown(true);
    jsav.umsg("Lets remove the record with key 1. Note that this key is in the middle of the Skip List, wich involves updating nodes with pointers pointing to it.");
    ll.removeKey(1);
    jsav.step();
    jsav.umsg("Now lets remove the record with key 9. As usual, any nodes with pointers pointing to it need to be adjusted.");
    ll.removeKey(9);
    jsav.step();
    jsav.umsg("Lets remove the record with key 0.");
    ll.removeKey(0);
    jsav.step();
    jsav.umsg("Finally, Lets remove the record with key 2.");
    ll.removeKey(2);
    jsav.recorded();
   });
