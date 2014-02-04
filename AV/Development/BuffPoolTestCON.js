// testing creating a slide show for buffer pool

// slide show for example 9.4.1
(function ($) {
  var jsav = new JSAV("TestCON");
  var leftMargin = 20;
  var rightMargin = 20;
  var arr = jsav.ds.array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], {layout: "vertical"});
  var buffer_pool = jsav.ds.array(["", "", "", "", ""], {layout: "vertical", left: 600, top: 40});
  jsav.label("Secondary Storage (On Disk)", {left: 120, top: 475});
  jsav.label("Main Memory (in RAM)", {left: 550, top: 300});
  jsav.umsg("Using LRU replacement scheme. The following series of memory request occurs.\n9 0 1 7 6 6");
  jsav.displayInit();

  jsav.step();
  jsav.umsg("As with the array-based list implementation, listArray must be declared of fixed size when the stack is created. ");
  buffer_pool.value(4, 9);
  
  jsav.step();
  buffer_pool.value(3, 0);
  
  jsav.step();
  buffer_pool.value(2, 1);
  
  jsav.step();
  buffer_pool.value(1, 7);
  
  jsav.step();
  buffer_pool.value(0, 6);
  jsav.recorded();

}(jQuery));
