// Garbage collection of lists
(function ($) {
  var jsav = new JSAV('listElementDeleteCON');
  // Relative offsets
  var leftMargin = 200;
  var topMargin = 25;
  // JSAV list
  var list1 = jsav.ds.list({
      'nodegap': 30,
      'center': false,
      'left': leftMargin,
      'top': topMargin
    });
  list1.addFirst('null').addFirst('').addFirst('').addFirst('').addFirst('').addFirst('null');
  list1.layout();
  list1.hide();

  var list2 = jsav.ds.list({
      'nodegap': 30,
      'center': false,
      'left': leftMargin,
      'top': topMargin + 100
    });
  list2.addFirst('null').addFirst('').addFirst('').addFirst('').addFirst('').addFirst('null');
  list2.layout();
  list2.hide();
  var curr = setPointer('curr', list1.get(0));
  var head = setPointer('head', list1.get(2));
  var tail = setPointer('tail', list1.get(5));


  jsav.umsg('The third issue that users of a list implementation must face is primarily of concern when programming in languages that do not support automatic garbage collection. ');
  jsav.displayInit();
  list1.show();
  var bigData = jsav.ds.array([
      'ID : 546457',
      'Name : Jake',
      'Phone : 5405642511',
      'Email : example@vt.edu',
      'Office : 212'
    ], {
      layout: 'vertical',
      top: 100,
      left: 10
    });
  var bigData1 = jsav.ds.array([
      'ID : 546213',
      'Name : Mike',
      'Phone : 5405642513',
      'Email : example@vt.edu',
      'Office : 212'
    ], {
      layout: 'vertical',
      top: 100,
      left: 210
    });
  var bigData2 = jsav.ds.array([
      'ID : 546805',
      'Name : John',
      'Phone : 5405642552',
      'Email : example@vt.edu',
      'Office : 212'
    ], {
      layout: 'vertical',
      top: 100,
      left: 410
    });
  var bigData3 = jsav.ds.array([
      'ID : 546991',
      'Name : Lucy',
      'Phone : 5405642568',
      'Email : example@vt.edu',
      'Office : 212'
    ], {
      layout: 'vertical',
      top: 100,
      left: 610
    });
  var listP1 = connect(list1.get(1), bigData);
  var listP2 = connect(list1.get(2), bigData1);
  var listP3 = connect(list1.get(3), bigData2);
  var listP4 = connect(list1.get(4), bigData3);
  jsav.umsg('That is how to deal with the memory of the objects stored on the list when the list is deleted or the clear method is called. In C++ for example, list destructor and the clear method are problematic in that there is a potential that they will be misused. ');
  jsav.step();

  listP1.hide();
  listP2.hide();
  listP3.hide();
  listP4.hide();
  list1.hide();
  bigData.highlight();
  bigData1.highlight();
  bigData2.highlight();
  bigData3.highlight();

  jsav.umsg('Deleting listArray in the array-based implementation, or deleting a link node in the linked list implementation, might remove the only reference to an object, leaving its memory space inaccessible. ');
  jsav.step();

  bigData.css({ top: 50 });
  bigData1.css({ top: 50 });
  bigData2.css({ top: 50 });
  bigData3.css({ top: 50 });
  jsav.umsg('Unfortunately, there is no way for the list implementation to know whether a given object is pointed to in another part of the program or not. Thus, the user of the list must be responsible for deleting these objects when that is appropriate.');
  //jsav.step();
  jsav.recorded();
}(jQuery));
