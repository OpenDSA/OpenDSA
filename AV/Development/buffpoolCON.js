// slide show for example 9.4.1
(function ($) {
  var jsav = new JSAV("buffpoolS1CON");
  var arr = jsav.ds.array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], {layout: "vertical"});
  var buffer_pool = jsav.ds.array(["", "", "", "", ""], {layout: "vertical", indexed: true, left: 600, top: 40});
  jsav.label("Secondary Storage (On Disk)", {left: 120, top: 300});
  jsav.label("Main Memory (in RAM)", {left: 550, top: 300});
  jsav.umsg("Using LRU replacement scheme. The following series of memory request occurs: 9 0 1 7 6 6 8 1 3 5 1 7 1");
  jsav.displayInit();

  jsav.umsg("Buffer Pool will store sector 9 in main memory");
  buffer_pool.value(4, 9);
  jsav.step();

  jsav.umsg("Buffer Pool will store sector 0 in main memory");
  buffer_pool.value(3, 0);
  jsav.step();

  jsav.umsg("Buffer Pool will store sector 1 in main memory");
  buffer_pool.value(2, 1);
  jsav.step();

  jsav.umsg("Buffer Pool will store sector 7 in main memory");
  buffer_pool.value(1, 7);
  jsav.step();

  jsav.umsg("Buffer Pool will store sector 6 in main memory");
  buffer_pool.value(0, 6);
  jsav.step();

  jsav.umsg("Another request for sector 6 can be served without reading any new data into memory. And since buffer 0 stores sector 6, the blocks in the buffer pool need not be moved.");
  jsav.step();
  
  jsav.umsg("The next request, for sector 8, requires emptying the contents of the least recently used buffer (the sector in position 4), which is sector 9. So sector 9's data are removed from the buffer pool, the other sectors in the pool are shifted down one step, and sector 8 is read into the buffer at position 0.");
  buffer_pool.value(0, 8);
  buffer_pool.value(1, 6);
  buffer_pool.value(2, 7);
  buffer_pool.value(3, 1);
  buffer_pool.value(4, 0);
  jsav.step();

  jsav.umsg("The next request is for sector 1. Since sector 1 is already in the buffer pool (in position 3), it need not be read in from disk. The buffer pool is reorganized to put sector 1 at the top.");
  buffer_pool.value(0, 1);
  buffer_pool.value(1, 8);
  buffer_pool.value(2, 6);
  buffer_pool.value(3, 7);
  buffer_pool.value(4, 0);
  jsav.step();

  jsav.umsg("Processing further requests 3, 5, 1, 7, 1 will leave the buffer pool as shown.");
  buffer_pool.value(0, 1);
  buffer_pool.value(1, 7);
  buffer_pool.value(2, 5);
  buffer_pool.value(3, 3);
  buffer_pool.value(4, 8);
  jsav.recorded();

}(jQuery));

// slide show for example 9.4.2
(function ($) {
  var jsav = new JSAV("buffpoolS2CON");
  var on_disk = jsav.ds.array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], {layout: "vertical"});
  var buffer_pool = jsav.ds.array([1, 7, 5, 3, 8], {layout: "vertical", indexed: true, left: 600, top: 40});
  jsav.label("Secondary Storage (On Disk)", {left: 120, top: 300});
  jsav.label("Main Memory (in RAM)", {left: 550, top: 300});
  jsav.umsg("Assume that sectors 1, 7, 5, 3, and 8 are currently in the buffer pool, stored in this order, and that we use the LRU buffer replacement strategy. ")
  jsav.displayInit();
  jsav.step();

  jsav.umsg("If a request for Sector 9 is then received, then one sector currently in the buffer pool must be replaced. Because the buffer containing Sector 8 is the least recently used buffer");
  jsav.step();

  jsav.umsg("Contents of sector 8 will be copied back to disk. The contents of Sector 9 are then copied into this buffer, and it is moved to the front of the Buffer Pool");
  buffer_pool.value(0, 9);
  buffer_pool.value(1, 1);
  buffer_pool.value(2, 7);
  buffer_pool.value(3, 5);
  buffer_pool.value(4, 8);
  jsav.step();

  jsav.umsg("If the next memory request were to sector 5, then no data would need to be read from disk. Istead, the buffer already containing Sector 5 would be moved to the front of the buffer pool");
  buffer_pool.value(0, 5);
  buffer_pool.value(1, 9);
  buffer_pool.value(2, 1);
  buffer_pool.value(3, 7);
  buffer_pool.value(4, 8);
  jsav.recorded();
}(jQuery));

// Diagram used for examples
(function ($) {
  var jsav = new JSAV("buffpoolS3CON", {animationMode: "none"});
  var arr = jsav.ds.array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], {layout: "vertical"});
  var buffer_pool = jsav.ds.array([1, 7, 5, 3, 8], {layout: "vertical", indexed: true, left: 600, top: 40});
  jsav.label("Secondary Storage (On Disk)", {left: 120, top: 300});
  jsav.label("Main Memory (in RAM)", {left: 550, top: 300});
}(jQuery));
