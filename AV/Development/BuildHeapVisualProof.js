"use strict";
/*global alert: true, ODSA, console */

(function ($) {
  var av;
  var rect;
  var arr = [];
  var numNodes = 31;
  var bh;
  var slider1;
  var slider2;
  function runit() {
    av = new JSAV($(".avcontainer"));
    for (var i = 0; i < numNodes; i++) {
      arr.push("");
    }
    bh = av.ds.binheap(arr, {left: 150, top: 10, nodegap: 15});
	bh.element.hide();
    av.label("depth 4",  {"top": "140px", "left": "85px"});
    av.label("depth 3",  {"top": "100px", "left": "85px"});
    av.label("depth 2",  {"top": "68px", "left": "85px"});
    av.label("depth 1",  {"top": "36px", "left": "85px"});
    av.label("depth 0",  {"top": "4px", "left": "85px"});
    slider1 = av.g.rect(150, 138, 515, 20).css({"fill": "green"});
    slider1.hide();
    av.umsg("Let's look at a visualization to explain why the cost for buildheap should be &theta;(n).");
    av.displayInit();

    slider1.show();
    slider1.css({"opacity": 0.3});
    av.umsg("At depth 4 there are 2<sup>4</sup> = 16 nodes. Each requires no work since all the nodes are leaves.");
    av.step();

    slider1.translate(0, -30);
    av.umsg("At depth 3 there are 2<sup>3</sup> = 8 nodes. Each requires 1 unit of work, since each is 1 step from the bottom.");
    av.g.rect(10, 300, 200, 20);
    av.label("1",  {"top": "300px", "left": "0px"});
    av.label("2^3",  {"top": "320px", "left": "100px"});
    av.step();
	
    slider1.translate(0, -32);
    av.umsg("At depth 2 there are 2<sup>2</sup> = 4 nodes. Each requires 2 units of work, since each is 2 steps from the bottom.");
    av.g.rect(210, 300, 100, 20);
    av.g.rect(210, 280, 100, 20);
    av.label("2^2",  {"top": "320px", "left": "250px"});
    av.step();
	
    slider1.translate(0, -32);
    av.umsg("At depth 1 there are 2<sup>1</sup> = 2 nodes. Each requires 3 units of work, since each is 3 steps from the bottom.");
    av.g.rect(310, 300, 50, 20);
    av.g.rect(310, 280, 50, 20);
    av.g.rect(310, 260, 50, 20);
    av.label("2",  {"top": "320px", "left": "330px"});
    av.step();
	
    slider1.translate(0, -32);
    av.umsg("At depth 0 there is a single node that requires 4 units of work, since it is 4 steps from the bottom.");
    av.g.rect(360, 300, 25, 20);
    av.g.rect(360, 280, 25, 20);
    av.g.rect(360, 260, 25, 20);
    av.g.rect(360, 240, 25, 20);
    av.label("1",  {"top": "320px", "left": "370px"});
    av.label("}",  {"top": "235px", "left": "390px"}).css({'font-size': '70px', "text-align": "center"});
    av.label("depth",  {"top": "240px", "left": "410px"});

    av.step();

    av.umsg('Rearrange the rectangles...');
    slider2 = av.g.rect(0, 300, 400, 20).css({"fill": "green"});
    slider2.css({"opacity": 0.3});
    av.g.rect(430, 300, 200, 20);
    av.g.rect(630, 300, 100, 20);
    av.g.rect(730, 300, 50, 20);
    av.g.rect(780, 300, 25, 20);
    av.label("2^3",  {"top": "320px", "left": "520px"});
    av.label("2^2",  {"top": "320px", "left": "670px"});
    av.label("2",  {"top": "320px", "left": "750px"});
    av.label("1",  {"top": "320px", "left": "790px"});
    av.label("1",  {"top": "300px", "left": "420px"});
    av.step();
	
    slider2.translate(0, -20);
    av.g.rect(430, 280, 100, 20);
    av.g.rect(530, 280, 50, 20);
    av.g.rect(580, 280, 25, 20);
    av.label("1",  {"top": "280px", "left": "420px"});
    av.step();
	
    slider2.translate(0, -20);
    av.g.rect(630, 280, 50, 20);
    av.g.rect(680, 280, 25, 20);
    av.step();
	
    slider2.translate(0, -20);
    av.g.rect(730, 280, 25, 20);
    av.step();
	
    av.g.rect(605, 280, 25, 20).css({"fill": "black"});
    av.g.rect(705, 280, 25, 20).css({"fill": "black"});
    av.g.rect(755, 280, 25, 20).css({"fill": "black"});
    av.g.rect(780, 280, 25, 20).css({"fill": "black"});
    av.label("-1",  {"top": "260px", "left": "610px"});
    av.label("-1",  {"top": "260px", "left": "710px"});
    av.label("-1",  {"top": "260px", "left": "760px"});
    av.label("-1",  {"top": "260px", "left": "785px"});
    av.step();
    av.umsg("The total area of the resulting shape is bounded by 2 X (8+4+2+1) = 30 = 2 X (2<sup>4</sup> - 1).");
    av.step();
    av.umsg("We have n=31 nodes, and so the total amount of work required is  &theta;(n).");
	
    av.recorded();
  }

  function about() {
    var mystring = "Build heap running time visual proof\nWritten by Mohammed Fawzy and Cliff Shaffer\nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nWritten during February, 2014\nJSAV library version " + JSAV.version();
    alert(mystring);
  }

  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#runit').click(runit);
  $('#reset').click(ODSA.AV.reset);
}(jQuery));
