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


//Array-Based list insertion
(function ($) {
  var jsav = new JSAV('AlistIntroCON');

  $("#AlistIntroCON").on("jsav-message", function() {
    // invoke MathJax to do conversion again
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
  });

  var arr = jsav.ds.array(arrValues, {indexed: true, layout: 'array'});
  bgColor(arr);

  jsav.umsg('Class <code>AList</code> stores the list elements in the first <code>listSize</code> contiguous array positions. In this example, <code>listSize</code> is 5.');
  arr.highlight([0, 1, 2, 3, 4]);
  jsav.displayInit();

  jsav.umsg('Array positions correspond to list positions. In other words, the element at position <i>i</i> in the list is stored at array cell <i>i</i>. Here, the element at position 3 in the list (and index 3 in the array) is highlighted.');
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


// Show off the private data members
(function ($) {
  var jsav = new JSAV('AlistVarsCON');
  var pseudo = jsav.code({
      url: '../../../SourceCode/Processing/Lists/AList.pde',
      lineNumbers: false,
      startAfter: '/* *** ODSATag: AListVars *** */',
      endBefore: '/* *** ODSAendTag: AListVars *** */'
    });
  jsav.umsg('Let\'s take a look at the private data members for class <code>AList</code>.');
  jsav.displayInit();

  jsav.umsg('First, notice that class <code>AList</code> implements the <code>List</code> interface. This means that <code>AList</code> is required to give implementations for all of the methods listed as part of the <code>List</code> interface.');
  pseudo.highlight(1);
  jsav.step();

  pseudo.unhighlight(1);
  pseudo.highlight(2);
  jsav.umsg('The first of the private data members is <code>listArray</code>, the array which holds the list elements. Because <code>listArray</code> must be allocated at some fixed size, the size of the array must be known when the list object is created.');
  jsav.step();
  pseudo.unhighlight(2);
  pseudo.highlight(3);
  jsav.umsg('An optional parameter is declared for the <code>AList</code> constructor. With this parameter, the user can indicate the maximum number of elements permitted in the list. If no parameter is given, then it takes the value <code>defaultSize</code>, which is assumed to be a suitably defined constant value.');
  jsav.step();
  pseudo.unhighlight(2);
  pseudo.highlight(3);
  jsav.umsg('Because each list can have a differently sized array, each list must remember its maximum permitted size. Data member <code>maxSize</code> serves this purpose.');
  jsav.step();
  pseudo.unhighlight(3);
  pseudo.highlight(4);
  jsav.umsg('At any given time the list actually holds some number of elements that can be less than the maximum allowed by the array. This value is stored in <code>listSize</code>.');
  jsav.step();
  pseudo.unhighlight(4);
  pseudo.highlight(5);
  jsav.umsg('Data member <code>curr</code> stores the current position.');
  jsav.step();
  pseudo.unhighlight(5);
  jsav.umsg('Because <code>listArray</code>, <code>maxSize</code>, <code>listSize</code>, and <code>curr</code> are all declared to be <code>private</code>, they may only be accessed by methods of Class <code>AList</code>.');
  jsav.recorded();
}(jQuery));
