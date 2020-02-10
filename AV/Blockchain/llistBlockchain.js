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
    l.addFirst("Block Number: 0 <br/> <br/> <br/> <br/> Hash:0000000000");
    l.layout();
  
    // Slide 1
    av.umsg(interpret("sc1"));
    av.displayInit();
  
    // Slide 2
    av.umsg(interpret("sc2"));
    l.addLast("Block Number: 1 <br/> Previous:0000000000 <br/> Nonce:? <br/> Data:First Block <br/> Hash:?");
    //$(".jsavvaluelabel").html("<br>");
    
    l.layout();
    av.step();
  
    // Slide 3
    av.umsg(interpret("sc3"));
    l.get(1).value("Block Number: 1 <br/> Previous:0000000000 <br/> Nonce:124950 <br/> Data:First Block <br/> Hash:?");
    av.step();

    // Slide 4
    av.umsg(interpret("sc4"));
    l.get(1).value("Block Number: 1 <br/> Previous:0000000000 <br/> Nonce:124950 <br/> Data:First Block <br/> Hash:0000f2387d");
    // Hash : 0000f2387d33d6fbcbff5bde1388a93f0af5e202fd6b8e2939440024567f84c0
    av.step();

    // Slide 5
    av.umsg(interpret("sc5"));
    l.addLast("Block Number: 2 <br/> Previous:0000f2387d <br/> Nonce:3278 <br/> Data:Second Block <br/> Hash:0000cfce29");
    // Hash: 0000cfce292fd014ce887bbd65663c309ed7f0cda186dd070c225fd5ef34654c
    l.layout();
    av.step();

    // Slide 6
    av.umsg(interpret("sc5"));
    l.addLast("Block Number: 3 <br/> Previous:0000cfce29 <br/> Nonce:842 <br/> Data:Third Block <br/> Hash:0000b33dc6");
    // Hash: 0000b33dc608b62838f4b882f40114fcf067aeae6a3f74b104920031b256fad8
    l.layout();
    av.step();

    // Slide 6
    av.umsg(interpret("sc6"));
    l.addLast("Block Number: 4 <br/> Previous:0000b33dc6 <br/> Nonce:182684 <br/> Data:Fourth Block <br/> Hash:0000571ca7");
    // Hash: 0000571ca76adedbb3e436a5122d033ca4b4627731a3be55ba913ff382aedebb
    l.layout();
    av.recorded();
  });
  