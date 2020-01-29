/*document for JSAv*/
// written by Chinmayee Schandra

$(document).ready(function() {
  "use strict";
  var avname = "2DLinearIndex";

  var av;
  var leftAlign = 200;
  var topAlign = 30;

  av = new JSAV(avname);


  //positions for table
  var x = 100;
  var y = 20;

  //dimensions for name rectangle
  var nHeight = 30;
  var nWidth = 80;

  //creates name rectangles
  av.g.rect(x, y, nWidth, nHeight).css({fill: "white"})
  av.g.rect(x, y + nHeight, nWidth, nHeight).css({fill: "white"});
  av.g.rect(x, y + nHeight*2, nWidth, nHeight).css({fill: "white"});

  //rest of the rectangles
  var xPos = x + nWidth;
  var yPos = y;

  //dimensions of rectanlge
  var height = 30;
  var width = 50;

  //first rwo rectangle
  av.g.rect(xPos, yPos, width, height).css({fill: "white"});
  av.g.rect(xPos + width, yPos, width, height).css({fill : "white"});
  av.g.rect(xPos + 2*width. yPos, width, height).css({fill: "white"});
  
  //second row rectangles
  yPos = y + 30;

  av.g.rect(xPos, yPos, width, height).css({fill: "white"});
  av.g.rect(xPos + width, yPos, width, height).css({fill : "white"});
  av.g.rect(xPos + 2*width. yPos, width, height).css({fill: "white"});

  //third row rectangles
  yPos += 30;

  av.g.rect(xPos, yPos, width, height).css({fill: "white"});
  av.g.rect(xPos + width, yPos, width, height).css({fill : "white"});
  av.g.rect(xPos + 2*width. yPos, width, height).css({fill: "white"});

  av.displayInit();
  av.recorded();
});


