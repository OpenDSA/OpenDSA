'use strict';

//array values for AlistCON1, AlistCON2
var arrValues = [13, 12, 20, 8, 3, "", "", ""];

//elements size of array in AlistCON1, AlistCON2
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


//Array-Based list deletion
(function ($) {
  var jsav = new JSAV('AlistRemoveCON'),
      leftMargin = 5,
      nodeWidth = 30,
      arrow1_x = 25 + nodeWidth;


  // Create an array object under control of JSAV library
  var arr = jsav.ds.array(arrValues, {
      indexed: true,
      layout: 'array',
      left: leftMargin,
      top: 20
    });

  var pseudo = jsav.code({
      url: '../../../SourceCode/Processing/Lists/AList.pde',
      lineNumbers: false,
      startAfter: '/* *** ODSATag: AListRemove *** */',
      endBefore: '/* *** ODSAendTag: AListRemove *** */'
    });

  //vertical arrow pointing to current position
  var arrow1 = jsav.g.line(arrow1_x, 10, arrow1_x, 35, {
      'arrow-end': 'classic-wide-long',
      'opacity': 0,
      'stroke-width': 2
    });

  //horizontal arrow in step 4
  var arrow2 = jsav.g.line(arrow1_x + 100, 20, arrow1_x + 20, 20, {
      'arrow-end': 'classic-wide-long',
      'opacity': 0,
      'stroke-width': 2
    });

  //label for current position in step 1
  var label = jsav.label('curr', {
      before: arr,
      left: arrow1_x - 10,
      top: -10
    });
  label.hide();

  //array "it" for holding the copied element
  var arrItValues = [''];
  var arrIt = jsav.ds.array(arrItValues, {
      indexed: false,
      layout: 'array',
      left: leftMargin + (nodeWidth + 2) * 3,
      top: 90
    });
  var labelIt = jsav.label('it', {
      before: arrIt,
      left: 85,
      top: 110
    });

  arrIt.hide();
  labelIt.hide();

  //sets the background of empty elements to gray
  bgColor(arr);
  jsav.umsg('Here is a list containing five elements. We will remove the value 12 in position 1 of the array, which is the current position');
  arr.highlight([1]);
  label.show();
  arrow1.show();
  pseudo.highlight(1);
  jsav.displayInit();

  arrIt.show();
  labelIt.show();
  jsav.effects.copyValue(arr, 1, arrIt, 0);
  arr.value(1, '');
  arr.unhighlight([1]);
  pseudo.unhighlight(1);
  pseudo.highlight(4);
  jsav.umsg('Copy  the  element to be deleted');
  jsav.step();

  // shift elements after current position one position to the left
  var i;
  for (i = 2; i < itemsSize; i++) {
    jsav.effects.copyValue(arr, i, arr, i - 1);
  }
  arr.css([itemsSize - 1], { 'background-color': '#eee' });
  arr.value(itemsSize - 1, '');
  arrow2.show();
  arr.unhighlight([1]);
  pseudo.unhighlight(4);
  pseudo.highlight(5);
  pseudo.highlight(6);
  arr.highlight([1, 2, 3]);
  jsav.umsg('Shift all elements after current element one position to the left');
  jsav.step();

  pseudo.unhighlight(5);
  pseudo.unhighlight(6);
  pseudo.highlight(7);
  arr.unhighlight([1, 2, 3]);
  jsav.umsg('Decrease the list size by 1, from 5 to 4');
  arrow2.hide();
  jsav.step();

  arrIt.highlight([0]);
  pseudo.unhighlight(7);
  pseudo.highlight(8);
  jsav.umsg('Return the deleted element');
  jsav.step();

  jsav.umsg('Since we might have to shift all of the remaining elements, deletion from an array-based list is &theta;(<i>n</i>) in the worst case if there are <i>n</i> elements in the list');
  jsav.recorded();  //
}(jQuery));


// Append visualization
(function ($) {
  var jsav = new JSAV('AlistAppendCON');
  var pseudo = jsav.code({
      url: '../../../SourceCode/Processing/Lists/AList.pde',
      lineNumbers: false,
      startAfter: '/* *** ODSATag: AListAppend *** */',
      endBefore: '/* *** ODSAendTag: AListAppend *** */'
    });
  var arr = jsav.ds.array(arrValues, {
      indexed: true,
      layout: 'array',
      top: 12,
      left: 10
    }).hide();
  var arrow1 = jsav.g.line(180, 3, 180, 28, {
      'arrow-end': 'classic-wide-long',
      'opacity': 100,
      'stroke-width': 2
    });
  arrow1.hide();
  var label = jsav.label('Append 23', {
      before: arr,
      left: 140,
      top: -20
    }).hide();

  var arrMS = jsav.ds.array([8], {
      indexed: false,
      layout: 'array',
      left: 100,
      top: 70
    });
  arrMS.hide();
  var labelMaxSize = jsav.label('maxSize', {
      before: arrMS,
      left: 33,
      top: 89
    });
  labelMaxSize.hide();

  var arrLS = jsav.ds.array([5], {
      indexed: false,
      layout: 'array',
      left: 100,
      top: 105
    });
  arrLS.hide();
  var labelListSize = jsav.label('listSize', {
      before: arrLS,
      left: 42,
      top: 124
    });
  labelListSize.hide();

  jsav.umsg('Inserting at the tail of the list is easy');
  jsav.displayInit();

  arr.show();
  arr.highlight(5);
  arrow1.show();
  label.show();
  pseudo.highlight(1);
  jsav.umsg('We will append the value 23');
  arrMS.show();
  labelMaxSize.show();
  arrLS.show();
  labelListSize.show();
  jsav.step();

  pseudo.unhighlight(1);
  pseudo.highlight(2);
  jsav.umsg('First check that the array has a free slot');
  arrMS.highlight(0);
  arrLS.highlight(0);
  jsav.step();

  jsav.umsg('Now simply insert the value into the empty position, and update <code>listSize</code>');
  pseudo.unhighlight(2);
  pseudo.highlight(3);
  arrLS.value(0, 6);
  arrMS.unhighlight(0);
  arr.value(5, '23');
  jsav.step();

  jsav.umsg('The append operation therefore requires &theta;(1) time');
  arr.unhighlight(5);
  arrLS.unhighlight(0);
  pseudo.unhighlight(3);
  jsav.recorded();
}(jQuery));
