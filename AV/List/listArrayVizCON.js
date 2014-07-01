"use strict";

// There does not appear to be any compelling reason to split the list
// slideshows into two .js files like this.

//array values for examples
var arrValues = [13, 12, 20, 8, 3, '', '', ''];
//elements size of array
var itemsSize = 5;

//sets the backgroud of the array elements according to their values
function bgColor(array) {
  var i;
  for (i = 0; i < array.size(); i++) {
    if (array.value(i) === '') {
      array.css([i], { 'background-color': '#eee' });
    } else {
      array.css([i], { 'background-color': '#fff' });
    }
  }
}


//Array-Based list introduction
(function ($) {
  var jsav = new JSAV('AlistIntroCON');
  var arr = jsav.ds.array(arrValues, {indexed: true, layout: 'array'});
  bgColor(arr);

  jsav.umsg('Class <code>AList</code> stores the list elements in the first <code>listSize</code> contiguous array positions. In this example, <code>listSize</code> is 5.');
  arr.highlight([0, 1, 2, 3, 4]);
  jsav.displayInit();

  jsav.umsg('Array positions correspond to list positions. In other words, the element at position $i$ in the list is stored at array cell $i$. Here, the element at position 3 in the list (and index 3 in the array) is highlighted.');
  arr.unhighlight([0, 1, 2, 3, 4]);
  arr.highlight(3);
  jsav.step();

  jsav.umsg('The head of the list is always at position 0.');
  arr.unhighlight(3);
  arr.highlight(0);
  jsav.step();

  jsav.umsg('Random access to any element in the list quite easy. Given some position in the list, the value of the element in that position can be accessed directly.');
  arr.unhighlight(0);
  jsav.step();

  jsav.umsg("Thus, access to any element using the <code>moveToPos</code> method followed by the <code>getValue</code> method takes $\\Theta(1)$ time.");
  jsav.recorded();
}(jQuery));
