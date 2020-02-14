
// Written by Aditya Tikhe
// inverted list
$(document).ready(function() {
  "use strict";
  var av_name = "InvListCON";

  var av;


  av = new JSAV(av_name);



  //position variables
  var yPos = 20;
  var xPos = 180;

  //label on top for primary & seconday
  av.label("Secondary ", {left: xPos + 10, top: yPos - 5});
  av.label("Primary ", {left: xPos + 325, top: yPos - 5});

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
  av.label("Index", {left: xPos + leftBoxWidth, top: yPos + 15});
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


  //arrows
  //first arrow
  av.g.line(305,  80, 455, 80,
            {"arrow-end": "classic-wide-long", "stroke-width": 2});
  //second arrow
  av.g.line(305,  115, 459, 115,
            {"arrow-end": "classic-wide-long", "stroke-width": 2});
  //third arrow
  av.g.line(305,  150, 350, 150,
            {"stroke-width": 2});
  av.g.line(350, 150, 350, 185,
            {"stroke-width": 2});
  av.g.line(350, 185, 460, 185,
            {"arrow-end": "classic-wide-long", "stroke-width": 2});


  //text in left boxes
  av.label("Jones", {left: xPos + 10, top: yPos + 45});
  av.label("Smith", {left: xPos + 10, top: yPos + 45 + leftBoxHeight});
  av.label("Zukowski", {left: xPos + 10, top: yPos + 45 + leftBoxHeight * 2});

  //text in left boxes right column
  av.label("0", {left: xPos + leftBoxWidth + 10, top: yPos + 45});
  av.label("1", {left: xPos + leftBoxWidth + 10, top: yPos + 45 + leftBoxHeight});
  av.label("3", {left: xPos + leftBoxWidth + 10, top: yPos + 45 + leftBoxHeight * 2});

  //text in right boxes
  av.label("AA10", {left: xPos + 325, top: yPos + 45});
  av.label("AB12", {left: xPos + 325, top: yPos + 45 + rightBoxHeight});
  av.label("AB39", {left: xPos + 325, top: yPos + 45 + rightBoxHeight * 2});
  av.label("FF37", {left: xPos + 325, top: yPos + 45 + rightBoxHeight * 3});
  av.label("AX33", {left: xPos + 325, top: yPos + 45 + rightBoxHeight * 4});
  av.label("AX35", {left: xPos + 325, top: yPos + 45 + rightBoxHeight * 5});
  av.label("ZX45", {left: xPos + 325, top: yPos + 45 + rightBoxHeight * 6});
  av.label("ZQ99", {left: xPos + 325, top: yPos + 45 + rightBoxHeight * 7});

  av.displayInit();
  av.recorded();
});
