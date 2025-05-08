// Title: LRU Introduction Slideshow
// Author: Cliff Shaffer
// Institution: Virginia Tech
// Features: Algorithm Visualization
// Keyword: Buffer Pool; Least Recently Used
// Natural Language: en
// Programming Language: N/A
/* Description: Slideshow illustrating the Least Recently Used replacement heuristic. */

/*global ODSA */
"use strict";
$(document).ready(function () {

  function writelines() {
    var i;
    for (i = 0; i < 5; i++) {
      lines[i].movePoints(lLeft-10, buffTop+70+i*arrdist,
                          lRight, buffTop+30+blocks[i]*buffdist);
    }
  }

  function blockswap(i, j) {
    var temp = blocks[i];
    blocks[i] = blocks[j];
    blocks[j] = temp;
  }

  var av_name = "LRUCON";
  var interpret = ODSA.UTILS.loadConfig({"av_name": av_name}).interpreter;
  var av = new JSAV(av_name);

  var bpLeft = 400;
  var buffTop = 0;
  var buffdist = 50;
  var arrdist = 30;
  var lLeft = 450;  
  var lRight = 600;

  var arr = av.ds.array(["AAAAAA", "BBBBBB", "CCCCCC", "DDDDDD", "EEEEEE", "FFFFFF", "GGGGGG", "HHHHHH", "IIIIII", "JJJJJJ"],
			{layout: "vertical", indexed: true, top: 0, left: 150 });
  arr.addClass(true, "buffer");
  var buffer_pool = av.ds.array(["", "", "", "", ""],
                                {layout: "vertical", indexed: true,
                                 top: 40, left: bpLeft });
  av.label("Disk File", {left: 180, top: 295});
  av.label("Buffer Pool", {left: 390, top: 295});
  av.label("Buffers", {left: 630, top: 295});
  var arrB0 = av.ds.array([""], {top: buffTop, left: lRight});
  arrB0.addClass(true, "buffer");
  var arrB1 = av.ds.array([""], {top: buffTop+1*buffdist, left: lRight});
  arrB1.addClass(true, "buffer");
  var arrB2 = av.ds.array([""], {top: buffTop+2*buffdist, left: lRight});
  arrB2.addClass(true, "buffer");
  var arrB3 = av.ds.array([""], {top: buffTop+3*buffdist, left: lRight});
  arrB3.addClass(true, "buffer");
  var arrB4 = av.ds.array([""], {top: buffTop+4*buffdist, left: lRight});
  arrB4.addClass(true, "buffer");
  var lines = [];
  var blocks = [0, 1, 2, 3, 4];

  for (var i = 0; i < 5; i++) {
    lines[i] = av.g.line(0, 0, 0, 0, {"stroke-width": 2});
  }

  // Slide 1
  av.umsg("Here is an example of buffer pool replacement using the LRU replacement heuristic. The following series of memory requests will be processed: 9 0 1 7 6 6 0 8 1");
  writelines();
  av.displayInit();

  // Slide 2
  av.umsg("The first request is to block 9. This is not in the buffer pool, so it gets read into the first free buffer.");
  buffer_pool.value(0, 9);
  av.effects.copyValue(arr, 9, arrB0, 0);
  arr.addClass(9, "processing");
  buffer_pool.addClass(0, "processing");
  arrB0.addClass(0, "processing");
  av.step();

  // Slide 3
  av.umsg("The next request is to block 0. This is not in the buffer pool, so it goes to into the next free buffer. But since we are using LRU replacement, we then need to move it to the top of the buffer pool.");
  blockswap(0, 1);
  buffer_pool.value(1, 0);
  buffer_pool.swap(0, 1);
  av.effects.copyValue(arr, 0, arrB1, 0);
  writelines();
  arr.removeClass(9, "processing");
  arrB0.removeClass(0, "processing");
  arr.addClass(0, "processing");
  arrB1.addClass(0, "processing");
  av.step();

  // Slide 4
  av.umsg("The next request is to block 1. This is not in the buffer pool, so it goes to into the next free buffer. But since we are using LRU replacement, we then need to move it to the top of the buffer pool.");
  buffer_pool.value(2, 1);
  blockswap(2, 1);
  blockswap(1, 0);
  buffer_pool.swap(2, 1);
  buffer_pool.swap(1, 0);
  av.effects.copyValue(arr, 1, arrB2, 0);
  writelines();
  arr.removeClass(0, "processing");
  arrB1.removeClass(0, "processing");
  arr.addClass(1, "processing");
  arrB2.addClass(0, "processing");
  av.step();

  // Slide 5
  av.umsg("The next request is to block 7. This is not in the buffer pool, so it goes to into the next free buffer. But since we are using LRU replacement, we then need to move it to the top of the buffer pool.");
  buffer_pool.value(3, 7);
  blockswap(3, 2);
  blockswap(2, 1);
  blockswap(1, 0);
  buffer_pool.swap(3, 2);
  buffer_pool.swap(2, 1);
  buffer_pool.swap(1, 0);
  av.effects.copyValue(arr, 7, arrB3, 0);
  writelines();
  arr.removeClass(1, "processing");
  arrB2.removeClass(0, "processing");
  arr.addClass(7, "processing");
  arrB3.addClass(0, "processing");
  av.step();

  // Slide 6
  av.umsg("The next request is to block 6. This is not in the buffer pool, so it goes to into the next free buffer. But since we are using LRU replacement, we then need to move it to the top of the buffer pool.");
  buffer_pool.value(4, 6);
  blockswap(4, 3);
  blockswap(3, 2);
  blockswap(2, 1);
  blockswap(1, 0);
  buffer_pool.swap(4, 3);
  buffer_pool.swap(3, 2);
  buffer_pool.swap(2, 1);
  buffer_pool.swap(1, 0);
  av.effects.copyValue(arr, 6, arrB4, 0);
  writelines();
  arr.removeClass(7, "processing");
  arrB3.removeClass(0, "processing");
  arr.addClass(6, "processing");
  arrB4.addClass(0, "processing");
  av.step();

  // Slide 7
  av.umsg("Another request for block 6 can be served without reading any new data into memory. And since buffer 0 stores block 6 (it is the least recently used block), the blocks in the buffer pool need not be moved.");
  arr.removeClass(6, "processing");
  av.step();
  
  // Slide 8
  av.umsg("A request for block 0 can be served without reading any new data into memory.");
  buffer_pool.removeClass(0, "processing");
  arrB4.removeClass(0, "processing");
  buffer_pool.addClass(3, "processing");
  arrB1.addClass(0, "processing");
  av.step();

  av.umsg("But since we are using LRU replacement, we still need to move it to the top of the buffer pool.");
  blockswap(3, 2);
  blockswap(2, 1);
  blockswap(1, 0);
  buffer_pool.swap(3, 2);
  buffer_pool.swap(2, 1);
  buffer_pool.swap(1, 0);
  writelines();
  buffer_pool.removeClass(3, "processing");
  buffer_pool.addClass(0, "processing");
  av.step();
  
  // Slide 9
  av.umsg("The next request, for block 8, requires emptying the contents of the least recently used buffer (the block in position 4), which is block 9. So block 9's data are removed from the buffer pool, the other blocks in the pool shift down one step, and block 8 is read into the buffer now at position 0.");
  buffer_pool.value(4, 8);
  blockswap(4, 3);
  blockswap(3, 2);
  blockswap(2, 1);
  blockswap(1, 0);
  buffer_pool.swap(4, 3);
  buffer_pool.swap(3, 2);
  buffer_pool.swap(2, 1);
  buffer_pool.swap(1, 0);
  av.effects.copyValue(arr, 8, arrB0, 0);
  writelines();
  arrB1.removeClass(0, "processing");
  arr.addClass(8, "processing");
  arrB0.addClass(0, "processing");
  av.step();

  // Slide 10
  av.umsg("The next request is for block 1 again. Since block 1 is already in the buffer pool (in position 4), it need not be read in from disk. The buffer pool is reorganized to put block 1 at the top.");
  blockswap(4, 3);
  blockswap(3, 2);
  blockswap(2, 1);
  blockswap(1, 0);
  buffer_pool.swap(4, 3);
  buffer_pool.swap(3, 2);
  buffer_pool.swap(2, 1);
  buffer_pool.swap(1, 0);
  writelines();
  arr.removeClass(8, "processing");
  arrB0.removeClass(0, "processing");
  arr.addClass(1, "processing");
  arrB2.addClass(0, "processing");
  av.recorded();
});
