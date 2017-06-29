/*global ODSA */
$(document).ready(function() {
    "use strict";
    var av_name = "SkipListRmvCON";
//    var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  
    var jsav = new JSAV(av_name, {left: 200});
	isStepShown(false);
    var ll = new SkipList(jsav);
    ll.insert(new KVPair(10, "A"), 0);
    ll.insert(new KVPair(30, "B"), 1);
    ll.insert(new KVPair(20, "C"), 2);
    ll.insert(new KVPair(25, "D"), 0);
 	jsav.umsg("The remove operation is similar to insertion in that it also uses an update array to search for the position of the key in the skip list before removing it.");
    jsav.displayInit();
    isStepShown(true);
    jsav.umsg("Lets remove the record with key 25. Note that this key is in the middle of the skip list, which involves updating nodes with pointers pointing to it.");
    ll.removeKey(25);
    jsav.step();
    jsav.umsg("Now lets remove the record with key 20. As usual, any nodes with pointers pointing to it need to be adjusted.");
    ll.removeKey(20);
    jsav.step();
    jsav.umsg("Lets remove the record with key 30.");
    ll.removeKey(30);
    jsav.step();
    jsav.umsg("Finally, Lets remove the record with key 10.");
    ll.removeKey(10);
    jsav.recorded();
   });
