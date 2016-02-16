"use strict";

$(document).ready(function () {
    JSAV.init();

    var av = new JSAV("AustinArrayScramble");
    var theArray = [1, 2, 3, 4, 5];
    var arr = av.ds.array(theArray, {indexed: true});
    // Note: av.displayInit() will not affect the number of slides.
    // All that it will do is affect what you get to see on the
    // initial slide.
    av.displayInit();
    // We are now starting a new slide (#2)
    av.umsg("At each step the array will swap. This is done by swapping the current element with a random number generated from the length of elements in the array", {preserve: true});
    av.umsg("To keep the array from swapping trying to swap an element to its current index or to the last place it was swapped to, we keeping generating a random until it is different")
    var prevRand;
    for(var i = 0; i < theArray.length; i++){
      var rand;
      while(rand == prevRand || rand == i){
        rand = Math.floor(Math.random() * theArray.length);
      }
      arr.swap(rand,i);
      av.step();
      prevRand = rand; 
    }
    // We are now starting a new slide (#3)
    av.umsg("Viola! The array is now scrambled");
    av.recorded();
    // If you add av.umsg after av.recorded, it will add new slides in
    // ways that you probably do not expect and probably cannot
    // control in the way that you want. As av.recorded() rewinds the
    // slideshow, the new slides would go to the beginning of the slideshow.
    // So, unless you are trying to add slides on-the-fly
    // interactively, you don't want to do this.
    // av.umsg("Text after av.recorded()");
});