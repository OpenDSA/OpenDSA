// Initial state of a linked list when using a header node
(function ($) {
  var jsav = new JSAV('llistInitCON', { 'animationMode': 'none' });

  // Relative offsets
  var leftMargin = 367;
  var topMargin = 50;

  var l = jsav.ds.list({
      'nodegap': 30,
      'top': topMargin,
      left: leftMargin
    });
  l.addFirst('null').addFirst('null');
  l.layout();

  // Head
  var head = setPointer('head', l.get(0));
  
  // Curr
  var curr = setPointer('curr', l.get(1));
  // Tail
  var tail = setPointer('tail', l.get(1), 'right');
  // Diagonal slash
  var slash = l.get(1).odsa_addTail();
  // Vertical bar
  var bar = l.get(1).odsa_addVLine();
  jsav.recorded();
}(jQuery));
