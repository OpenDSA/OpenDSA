// Written by Xiaolin Zhou
// inverted list
$(document).ready(function() {
  "use strict";
  var av_name = "InvListCON";
  var av = new JSAV(av_name);

  //position variables
  var yPos = 5;
  var xPos = 180;

  //label on top for primary & seconday
  av.label("Secondary ", {left: xPos + 10, top: yPos});
  av.label("Primary ", {left: xPos + 320, top: yPos});

  //height and width variables for left table first column
  var leftBoxWidth = 100;
  var leftBoxHeight = 30;

  //left box first column
  av.label("Key", {left: xPos + 29, top: yPos + 15});
  av.g.rect(xPos, yPos + 50, leftBoxWidth, leftBoxHeight);//.css({fill: "white"});
  av.g.rect(xPos, yPos + 50 + leftBoxHeight, leftBoxWidth, leftBoxHeight);//.css({fill: "white"});
  av.g.rect(xPos, yPos + 50 + leftBoxHeight * 2, leftBoxWidth, leftBoxHeight);//.css({fill: "white"});


  //height and width variable for left table second and fourth column
  var boxHeightAndWidth = 30;

  //left box second column
  av.label("Index", {left: xPos + leftBoxWidth - 5, top: yPos + 15});
  av.g.rect(xPos + leftBoxWidth, yPos + 50, boxHeightAndWidth, boxHeightAndWidth);//.css({fill: "white"});
  av.g.rect(xPos + leftBoxWidth, yPos + 50 + leftBoxHeight, boxHeightAndWidth, boxHeightAndWidth);//.css({fill: "white"});
  av.g.rect(xPos + leftBoxWidth, yPos + 50 + leftBoxHeight * 2, boxHeightAndWidth, boxHeightAndWidth);//.css({fill: "white"});


  //right table left column variables
  var rightBoxWidth = 90;
  var rightBoxHeight = 30;

  //right box first column
  av.label("Key", {left: xPos + 330, top: yPos + 15});
  av.g.rect(xPos + 300, yPos + 50, rightBoxWidth, rightBoxHeight);//.css({fill: "white"});
  av.g.rect(xPos + 300, yPos + 50 + rightBoxHeight, rightBoxWidth, rightBoxHeight);//.css({fill: "white"});
  av.g.rect(xPos + 300, yPos + 50 + rightBoxHeight * 2, rightBoxWidth, rightBoxHeight);//.css({fill: "white"});
  av.g.rect(xPos + 300, yPos + 50 + rightBoxHeight * 3, rightBoxWidth, rightBoxHeight);//.css({fill: "white"});
  av.g.rect(xPos + 300, yPos + 50 + rightBoxHeight * 4, rightBoxWidth, rightBoxHeight);//.css({fill: "white"});
  av.g.rect(xPos + 300, yPos + 50 + rightBoxHeight * 5, rightBoxWidth, rightBoxHeight);//.css({fill: "white"});
  av.g.rect(xPos + 300, yPos + 50 + rightBoxHeight * 6, rightBoxWidth, rightBoxHeight);//.css({fill: "white"});
  av.g.rect(xPos + 300, yPos + 50 + rightBoxHeight * 7, rightBoxWidth, rightBoxHeight);//.css({fill: "white"});

  //right box second column
  av.label("Next", {left: xPos + 295 + rightBoxWidth, top: yPos + 15});
  av.g.rect(xPos + 300 + rightBoxWidth, yPos + 50, boxHeightAndWidth, boxHeightAndWidth);//.css({fill: "white"});
  av.g.rect(xPos + 300 + rightBoxWidth, yPos + 50 + rightBoxHeight, boxHeightAndWidth, boxHeightAndWidth);//.css({fill: "white"});
  av.g.rect(xPos + 300 + rightBoxWidth, yPos + 50 + rightBoxHeight * 2, boxHeightAndWidth, boxHeightAndWidth);//.css({fill: "white"});
  av.g.rect(xPos + 300 + rightBoxWidth, yPos + 50 + rightBoxHeight * 3, boxHeightAndWidth, boxHeightAndWidth);//.css({fill: "white"});
  av.g.rect(xPos + 300 + rightBoxWidth, yPos + 50 + rightBoxHeight * 4, boxHeightAndWidth, boxHeightAndWidth);//.css({fill: "white"});
  av.g.rect(xPos + 300 + rightBoxWidth, yPos + 50 + rightBoxHeight * 5, boxHeightAndWidth, boxHeightAndWidth);//.css({fill: "white"});
  av.g.rect(xPos + 300 + rightBoxWidth, yPos + 50 + rightBoxHeight * 6, boxHeightAndWidth, boxHeightAndWidth);//.css({fill: "white"});
  av.g.rect(xPos + 300 + rightBoxWidth, yPos + 50 + rightBoxHeight * 7, boxHeightAndWidth, boxHeightAndWidth);//.css({fill: "white"});

  //arrows
  //first arrow
  av.g.line(305,  70, 450, 70,
            {"arrow-end": "classic-wide-long", "stroke-width": 1});
  //second arrow
  av.g.line(305,  100, 450, 100,
            {"arrow-end": "classic-wide-long", "stroke-width": 1});
  //third arrow
  av.g.line(305,  130, 350, 130,
            {"stroke-width": 1});
  av.g.line(350, 130, 350, 160,
            {"stroke-width": 1});
  av.g.line(350, 160, 450, 160,
            {"arrow-end": "classic-wide-long", "stroke-width": 1});

  //arrows at right box
  //connect 0 and 4
  av.g.line(xPos + 325 + rightBoxWidth, 70, xPos + 345 + rightBoxWidth, 70, {"stroke-width": 1});
  av.g.line(xPos + 345 + rightBoxWidth, 70, xPos + 345 + rightBoxWidth, 185, {"stroke-width": 1});
  av.g.line(xPos + 345 + rightBoxWidth, 185, xPos + 330 + rightBoxWidth, 185,
            {"arrow-end": "classic-wide-long", "stroke-width": 1});

  //connect 1 and 6
  av.g.line(xPos + 325 + rightBoxWidth, 100, xPos + 355 + rightBoxWidth, 100,
            {"stroke-width": 1, "stroke-dasharray": "- "});
  av.g.line(xPos + 355 + rightBoxWidth, 100, xPos + 355 + rightBoxWidth, 245,
            {"stroke-width": 1, "stroke-dasharray": "- "});
  av.g.line(xPos + 355 + rightBoxWidth, 245, xPos + 330 + rightBoxWidth, 245,
            {"arrow-end": "classic-wide-long", "stroke-width": 1, "stroke-dasharray": "- "});

  //connect 4 and 5
  av.g.line(xPos + 325 + rightBoxWidth, 195, xPos + 345 + rightBoxWidth, 195, {"stroke-width": 1});
  av.g.line(xPos + 345 + rightBoxWidth, 195, xPos + 345 + rightBoxWidth, 215, {"stroke-width": 1});
  av.g.line(xPos + 345 + rightBoxWidth, 215, xPos + 330 + rightBoxWidth, 215,
            {"arrow-end": "classic-wide-long", "stroke-width": 1});

  //connect 5 and 7
  av.g.line(xPos + 325 + rightBoxWidth, 225, xPos + 345 + rightBoxWidth, 225, {"stroke-width": 1});
  av.g.line(xPos + 345 + rightBoxWidth, 225, xPos + 345 + rightBoxWidth, 285, {"stroke-width": 1});
  av.g.line(xPos + 345 + rightBoxWidth, 285, xPos + 330 + rightBoxWidth, 285,
            {"arrow-end": "classic-wide-long", "stroke-width": 1});

  //connect 6 and 2
  av.g.line(xPos + 325 + rightBoxWidth, 255, xPos + 365 + rightBoxWidth, 255,
            {"stroke-width": 1, "stroke-dasharray": "- "});
  av.g.line(xPos + 365 + rightBoxWidth, 255, xPos + 365 + rightBoxWidth, 130,
            {"stroke-width": 1, "stroke-dasharray": "- "});
  av.g.line(xPos + 365 + rightBoxWidth, 130, xPos + 330 + rightBoxWidth, 130,
            {"arrow-end": "classic-wide-long", "stroke-width": 1, "stroke-dasharray": "- "});

  //text in left boxes
  av.label("Jones", {left: xPos + 10, top: yPos + 40});
  av.label("Smith", {left: xPos + 10, top: yPos + 40 + leftBoxHeight});
  av.label("Zukowski", {left: xPos + 10, top: yPos + 40 + leftBoxHeight * 2});

  //text in left boxes right column
  av.label("0", {left: xPos + leftBoxWidth + 10, top: yPos + 40});
  av.label("1", {left: xPos + leftBoxWidth + 10, top: yPos + 40 + leftBoxHeight});
  av.label("3", {left: xPos + leftBoxWidth + 10, top: yPos + 40 + leftBoxHeight * 2});

  //test next to the right boxes
  av.label("0", {left: xPos + 280, top: yPos + 40});
  av.label("1", {left: xPos + 280, top: yPos + 40 + rightBoxHeight});
  av.label("2", {left: xPos + 280, top: yPos + 40 + rightBoxHeight * 2});
  av.label("3", {left: xPos + 280, top: yPos + 40 + rightBoxHeight * 3});
  av.label("4", {left: xPos + 280, top: yPos + 40 + rightBoxHeight * 4});
  av.label("5", {left: xPos + 280, top: yPos + 40 + rightBoxHeight * 5});
  av.label("6", {left: xPos + 280, top: yPos + 40 + rightBoxHeight * 6});
  av.label("7", {left: xPos + 280, top: yPos + 40 + rightBoxHeight * 7});

  //text\slash in right boxes
  av.label("AA10", {left: xPos + 325, top: yPos + 40});
  av.label("AX33", {left: xPos + 325, top: yPos + 40 + rightBoxHeight});
  av.label("ZX45", {left: xPos + 325, top: yPos + 40 + rightBoxHeight * 2});
  av.label("ZQ99", {left: xPos + 325, top: yPos + 40 + rightBoxHeight * 3});
  av.label("AB12", {left: xPos + 325, top: yPos + 40 + rightBoxHeight * 4});
  av.label("AB39", {left: xPos + 325, top: yPos + 40 + rightBoxHeight * 5});
  av.label("AX35", {left: xPos + 325, top: yPos + 40 + rightBoxHeight * 6});
  av.label("FF37", {left: xPos + 325, top: yPos + 40 + rightBoxHeight * 7});

  //text in right boxes right column
  av.label("4", {left: xPos + 300 + leftBoxWidth, top: yPos + 40});
  av.label("6", {left: xPos + 300 + leftBoxWidth, top: yPos + 40 + leftBoxHeight});
  av.g.line(xPos + 300 + rightBoxWidth, yPos + 140, xPos + 330 + rightBoxWidth, yPos + 110,
            {"stroke-width": 1});
  av.g.line(xPos + 300 + rightBoxWidth, yPos + 170, xPos + 330 + rightBoxWidth, yPos + 140,
            {"stroke-width": 1});
  av.label("5", {left: xPos + 300 + leftBoxWidth, top: yPos + 40 + leftBoxHeight * 4});
  av.label("7", {left: xPos + 300 + leftBoxWidth, top: yPos + 40 + leftBoxHeight * 5});
  av.label("2", {left: xPos + 300 + leftBoxWidth, top: yPos + 40 + leftBoxHeight * 6});
  av.g.line(xPos + 300 + rightBoxWidth, yPos + 290, xPos + 330 + rightBoxWidth, yPos + 260,
            {"stroke-width": 1});
  av.displayInit();
  av.recorded();
});
