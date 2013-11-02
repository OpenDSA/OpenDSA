"use strict";
/*global alert: true, ODSA */

(function ($) {
  var jsav;

  function runit() {
    var i;
    jsav = new JSAV($('.avcontainer'));
	jsav.umsg('In slide 1');
	jsav.step();
	jsav.umsg('In slide 2');
	var q = jsav.question("MS", "Life is good?");
    q.addChoice("Of course", {correct: true});
    q.addChoice("Certainly", {correct: true});
    q.addChoice("No way!");
    q.show();
	jsav.step();
	jsav.umsg('In slide 3');
	jsav.step();
	jsav.recorded();
  }
  
  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#runit').click(runit);
  //$('#help').click(help);
  $('#reset').click(ODSA.AV.reset);
}(jQuery));
