"use strict";
//Possible positions for Array-Based list
(function ($) {
  $(document).ready(function () {
    var jsav = new JSAV("listADTposCON");
    var arrPositions = [' ', 5, 7, 3, 9, ' '];

    //calculate left margin for the JSAV array object
    var canvasWidth = $('.jsavcanvas').width();
    var arrWidth3 = arrPositions.length * 65;
    var leftMargin3 = (canvasWidth - arrWidth3) / 2;
    var i;
    var arrowArray = [];
    var arr = jsav.ds.array(arrPositions, {
      indexed: false,
      layout: 'array'
    }).hide();

    jsav.umsg('Since insertions take place at the current position, and since we want to be able to insert to the front or the back of the list as well as anywhere in between, there are actually $n+1$ possible "current positions" when there are $n$ elements in the list');
    jsav.displayInit();
    arr.show();
    for (i = 0; i < 5; i++) {
      arrowArray[i] = jsav.g.line(leftMargin3 + 65 + 65 * i, 0, leftMargin3 + 65 + 65 * i, 25, {
	'arrow-end': 'classic-wide-long',
	'opacity': 0,
	'stroke-width': 2
      });
    }
    jsav.umsg('Here is a list with 4 elements');
    jsav.step();
    for (i = 0; i < 5; i++) {
      arrowArray[i].show();
    }
    jsav.umsg('The arrows show the five possible positions for "current"');
    jsav.step();
    jsav.recorded();
  });
}(jQuery));
