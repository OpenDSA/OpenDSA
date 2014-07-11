// Homogeneous vs. non-homgeneous lists.
(function ($) {
  var jsav = new JSAV('listElementTypeCON');
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


  jsav.umsg('A second issue faced by implementors of a list class (or any other data structure that stores a collection of user-defined data elements) is whether the elements stored are all required to be of the same type. This is known as homogeneity in a data structure.');
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
  jsav.umsg('In some applications, the user would like to define the class of the data element that is stored on a given list, and then never permit objects of a different class to be stored on that same list.');
  jsav.step();

  listP1.hide();
  listP2.hide();
  listP3.hide();
  listP4.hide();
  list1.get(2).value(5);
  list1.get(4).value('true');
  bigData.css({ left: 170 });
  bigData1.css({ left: 400 });
  bigData2.hide();
  bigData3.hide();
  connect(list1.get(1), bigData);
  connect(list1.get(3), bigData1);

  jsav.umsg('In other applications, the user would like to permit the objects stored on a single list to be of differing types.');
  jsav.step();
  jsav.recorded();
}(jQuery));
