"use strict";
/*global alert: true, ODSA */

(function ($) {
  var av;
 

function runit() {
    ODSA.AV.reset(true);

    // Validate the array values a user enters or generate an array of
    // random numbers < 100 of the size selected in the dropdown list
    // if none are provided
    var theArray = ODSA.AV.processArrayValues(100);

    // If theArray wasn't filled properly, we generate our own 
    if (!theArray) {
	theArray = [];
	for (i = 0; i < 12; i++) {
	    theArray.push(Math.trunc(50 * Math.random() + 10));
	}
    }

    av = new JSAV($('.avcontainer'));

    var arr = av.ds.array(theArray, {indexed: true});
    av.umsg("Text before displayInit()");
    // Note: av.displayInit() will not affect the number of slides.
    // All that it will do is affect what you get to see on the
    // initial slide.
    av.displayInit();
    // We are now starting a new slide (#2)
    av.umsg("... and text after displayInit()", {preserve: true});
    arr.swap(3,7);
    av.step();
    // We are now starting a new slide (#3)
    av.umsg("Text after av.step()");
    av.recorded();
    // If you add av.umsg after av.recorded, it will add new slides in
    // ways that you probably do not expect and probably cannot
    // control in the way that you want. As av.recorded() rewinds the
    // slideshow, the new slides would go to the beginning of the slideshow.
    // So, unless you are trying to add slides on-the-fly
    // interactively, you don't want to do this.
    // av.umsg("Text after av.recorded()");

}



function about() {
   alert("Simple array visualization");
}
  
function help() {
   alert("Help for simple array visualization");
}
  
// Initialize the arraysize dropdown list
ODSA.AV.initArraySize(10, 16, 12); // Between 10 and 16, with default at 12


// Connect action callbacks to the HTML entities
$('#about').click(about);
$('#runit').click(runit);
$('#help').click(help);
$('#reset').click(ODSA.AV.reset);
}(jQuery));
