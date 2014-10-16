/*global ODSA */
"use strict";
$(document).ready(function () {
  var av_name = "buffpoolS1CON";
  var interpret = ODSA.UTILS.loadConfig({"av_name": av_name}).interpreter;

  var av = new JSAV(av_name);
  var arr = av.ds.array(["AA", "BB", "CC", "DD", "EE", "FF", "GG", "HH", "II", "JJ"], {layout: "vertical", indexed: true, });
  var buffer_pool = av.ds.array(["", "", "", "", ""], {layout: "vertical", indexed: true, left: 600, top: 40});
  av.label("Secondary Storage (On Disk)", {left: 120, top: 300});
  av.label("Main Memory (in RAM)", {left: 550, top: 300});
  av.umsg("Using LRU replacement scheme. The following series of memory request occurs: 9 0 1 7 6 6 8 1 3 5 1 7 1");
  av.displayInit();

  av.umsg("Buffer Pool will store sector 9 in main memory");
  //  buffer_pool.value(4, 9);
  av.effects.copyValue(arr, 9, buffer_pool, 4);
  av.step();

  av.umsg("Buffer Pool will store sector 0 in main memory");
  buffer_pool.value(3, 0);
  av.step();

  av.umsg("Buffer Pool will store sector 1 in main memory");
  buffer_pool.value(2, 1);
  av.step();

  av.umsg("Buffer Pool will store sector 7 in main memory");
  buffer_pool.value(1, 7);
  av.step();

  av.umsg("Buffer Pool will store sector 6 in main memory");
  buffer_pool.value(0, 6);
  av.step();

  av.umsg("Another request for sector 6 can be served without reading any new data into memory. And since buffer 0 stores sector 6, the blocks in the buffer pool need not be moved.");
  av.step();
  
  av.umsg("The next request, for sector 8, requires emptying the contents of the least recently used buffer (the sector in position 4), which is sector 9. So sector 9's data are removed from the buffer pool, the other sectors in the pool are shifted down one step, and sector 8 is read into the buffer at position 0.");
  buffer_pool.value(0, 8);
  buffer_pool.value(1, 6);
  buffer_pool.value(2, 7);
  buffer_pool.value(3, 1);
  buffer_pool.value(4, 0);
  av.step();

  av.umsg("The next request is for sector 1. Since sector 1 is already in the buffer pool (in position 3), it need not be read in from disk. The buffer pool is reorganized to put sector 1 at the top.");
  buffer_pool.value(0, 1);
  buffer_pool.value(1, 8);
  buffer_pool.value(2, 6);
  buffer_pool.value(3, 7);
  buffer_pool.value(4, 0);
  av.step();

  av.umsg("Processing further requests 3, 5, 1, 7, 1 will leave the buffer pool as shown.");
  buffer_pool.value(0, 1);
  buffer_pool.value(1, 7);
  buffer_pool.value(2, 5);
  buffer_pool.value(3, 3);
  buffer_pool.value(4, 8);
  av.recorded();
});
