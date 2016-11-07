/*global ODSA */
$(document).ready(function() {
    "use strict";
    var av_name = "SkipListSrchCON";
    var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  
    var jsav = new JSAV(av_name);
    var ll = new SkipList(jsav);
    jsav.umsg("We start with an empty SkipList");
    jsav.displayInit();
    jsav.umsg("adding one key-value pair (1, A)");
    ll.insert(new KVPair(1, "A"));
    jsav.step();
    jsav.umsg("adding a duplicate key (1, H)");
    ll.insert(new KVPair(1, "H"));
    jsav.step();
    jsav.umsg("adding another key-value pair (2, G)");
    ll.insert(new KVPair(2, "G"));
    jsav.step();
    jsav.umsg("adding another key-value pair (5, E)");
    ll.insert(new KVPair(5, "E"));
    jsav.step();
    jsav.umsg("adding another key-value pair (6, F)");
    ll.insert(new KVPair(6, "F"));
    jsav.step();
    jsav.umsg("adding another key-value pair (7, G)");
    ll.insert(new KVPair(7, "G"));
    jsav.step();
    jsav.umsg("adding another key-value pair (9, B) ");
    ll.insert(new KVPair(9, "B"));
    jsav.step();
    jsav.umsg("Search for key 7");
    ll.search(7);
    jsav.step();
    jsav.umsg("Search for key 12");
    ll.search(12);
    jsav.step();
    jsav.recorded();
   });
