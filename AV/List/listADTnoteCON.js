"use strict";
//listADT insertion
(function ($) {
  $(document).ready(function () {
    var jsav = new JSAV("listADTnoteCON");
    var arrPositions = ['<', 20, ',', 23, '|', 12, ',', 15, '>', '', '', '', ''];
    var length = arrPositions.length;
    var curr = 4;

    //calculate left margin for the JSAV array object
    var canvasWidth = $('.jsavcanvas').width();
    var arrWidth3 = (length - 4) * 40;
    var leftMargin3 = (canvasWidth - arrWidth3) / 2;

    //Hidden jsav array for copyValue animation
    var temp = [ '10', '|', '17' ];
    var arr1 = jsav.ds.array(temp, {
      indexed: false,
      layout: 'array'
    }).hide();
    arr1.css({ left: 10 });

    //jsav array object of the sildeshow
    var arr = jsav.ds.array(arrPositions, {
      indexed: false,
      layout: 'array'
    });
    arr.css({ top: 10 });

    jsav.umsg('We can make our list display notation more clear by showing the position of the current element. We will use a vertical bar like this:');
    jsav.displayInit();

    jsav.umsg('This example shows a list of four elements, with the current position being to the right of the bar at element 12');
    jsav.step();

    var i;
    for (i = length - 3; i > curr; i--) {
      jsav.effects.copyValue(arr, i, arr, i + 2);
    }
    jsav.effects.copyValue(arr1, 0, arr, curr + 1);
    arr.value(curr + 2, ',');
    jsav.umsg('Given this configuration, calling insert with value 10 will change the list to be:');
    arr.css([5], { 'color': 'red' });
    jsav.step();

    //  jsav.effects.copyValue(arr1, 1, arr, 10);
    arr.value(4, ',');
    arr.value(10, '|');
    arr.value(11, '>');
    arr.css([5], { 'color': 'black' });
    jsav.umsg('Here is another example, showing the current position set to allow insertion at the end of the list');
    jsav.step();

    jsav.effects.copyValue(arr, 11, arr, 12);
    jsav.effects.copyValue(arr1, 2, arr, 11);
    jsav.umsg('Here is the result of inserting 17');
    arr.css([11], { 'color': 'red' });
    jsav.step();

    jsav.umsg('The current element is now 17');
    jsav.step();
    jsav.recorded();
  });
}(jQuery));
