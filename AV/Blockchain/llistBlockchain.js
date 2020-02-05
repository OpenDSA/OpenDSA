/*global ODSA */
// Written by Jesse Terrazas and Bailey Spell
// Step-by-step simulation of a blockchain
$(document).ready(function() {
    "use strict";
    var av_name = "llistBlockchain";
    var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
    var av = new JSAV(av_name);
  
    // Set up the list
    var l = av.ds.list({nodegap: 30, top: 35, left: 257});
    l.addFirst("Block Number: 0 \n Hash:0000000000000000000000000000000000000000000000000000000000000000");
    l.layout();
  
    // Set up the various pointers
    // var head = av.pointer("head", l.get(0));
    // head.hide();
    // var curr = av.pointer("curr", l.get(2));
    // curr.hide();
    // var tail = av.pointer("tail", l.get(4));
    // tail.hide();
  
    // Slide 1
    av.umsg(interpret("sc1"));
    av.displayInit();
  
    // Slide 2
    av.umsg(interpret("sc2"));
    l.addLast("Block Number: 1 \n Previous:0000000000000000000000000000000000000000000000000000000000000000 \n Nonce:hello \n data:hello \n Hash:");
    l.layout();
    av.step();
  
    // Slide 3
    av.umsg(interpret("sc3"));
    // l.remove(2);
    //l.layout();
    av.step();

    // Slide 4
    av.umsg(interpret("sc4"));
    av.step();

    // Slide 5
    av.umsg(interpret("sc5"));
    av.step();

    // Slide 6
    av.umsg(interpret("sc6"));

    av.recorded();
  });
  