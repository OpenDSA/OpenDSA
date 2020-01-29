// Written by Chinmayee Schandra, Spring 2020
// Two dimensional linear index
$(document).ready(function() {
  "use strict";
  var avname = "TwoDArrCON";
  var av;
  av = new JSAV(avname);
  //positions for table
  var x = 240;
  var y = 10;
  //dimensions for name rectangle
  var nHeight = 30;
  var nWidth = 90;
  //creates name rectangles
  av.g.rect(x, y, nWidth, nHeight);
  av.g.rect(x, y + nHeight, nWidth, nHeight);
  av.g.rect(x, y + nHeight * 2, nWidth, nHeight);
  //rest of the rectangles
  var xPos = x + nWidth;
  var yPos = y;
  //dimensions of rectanlge
  var height = 30;
  var width = 70;
  //first row rectangle
  av.g.rect(xPos, yPos, width, height);
  av.g.rect(xPos + width, yPos, width, height);
  av.g.rect(xPos + 2 * width, yPos, width, height);
  av.g.rect(xPos + 3 * width, yPos, width, height);
  //second row rectangles
  yPos = y + 30;
  av.g.rect(xPos, yPos, width, height);
  av.g.rect(xPos + width, yPos, width, height);
  av.g.rect(xPos + 2 * width, yPos, width, height);
  av.g.rect(xPos + 3 * width, yPos, width, height);

  //third row rectangles
  yPos += 30;
  av.g.rect(xPos, yPos, width, height);
  av.g.rect(xPos + width, yPos, width, height);
  av.g.rect(xPos + 2 * width, yPos, width, height);
  av.g.rect(xPos + 3 * width, yPos, width, height);
  //labesl for names
  av.label("Jones", {left: x + 25, top: y + 20 - nHeight});
  av.label("Smith", {left: x + 25, top: y + 20});
  av.label("Zukowski", {left: x + 15, top: y + 20 + nHeight});
  //labesl for first coloumn
  av.label("AA10", {left: x + 35 + width, top: y + 20 - nHeight});
  av.label("AX33", {left: x + 35 + width, top: y + 20});
  av.label("ZQ99", {left: x + 35 + width, top: y + 20 + nHeight});
  //labesl for second coloumn
  av.label("AB12", {left: x + 35 + 2 * width, top: y + 20 - nHeight});
  av.label("AX35", {left: x + 35 + 2 * width, top: y + 20});
  //labesl for third coloumn
  av.label("AB39", {left: x + 35 + 3 * width, top: y + 20 - nHeight});
  av.label("ZX45", {left: x + 35 + 3 * width, top: y + 20});
  //labesl for fourth coloumn
  av.label("FF37", {left: x + 35 + 4 * width, top: y + 20 - nHeight});
  av.displayInit();
  av.recorded();
});
