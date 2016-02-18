"use strict";

$(document).ready(function () {


    JSAV.init();

    //create the JSAV object
    var av = new JSAV("JustinRandom");
    //initialize the array
    var theArray = [];
    //insert random integers in the array
    for(i = 0; i < 11; i++){
      theArray.push(Math.floor(Math.random() * 100));
    }
    //sort the array to prepare for randomizer. 
    theArray.sort();
    var arr = av.ds.array(theArray, {indexed: true});
    av.umsg("This is presorted and random array visualization. The numbers "
      +"below the structure indicate array indices.");
    // Note: av.displayInit() will not affect the number of slides.
    // All that it will do is affect what you get to see on the
    // initial slide.
    av.displayInit();
    //slide (#2)
    av.umsg("Each step in the randization is a swap of two indices. Every index is visited and swapped with a randomly generated index from Math.random().", {preserve: false});
    
    //slide (#3)
    for(i = 0; i < 11; i++){
      av.step();
      var swapWith = parseInt((Math.random() * 11));
      arr.swap(parseInt(i),swapWith, true);
      av.umsg("In this step the swap was for index " + i + "  and this it swapped with " + swapWith);
    }
    av.recorded();

});
