/*global ODSA */
// Written by Aditya Tikhe
// inverted list
$(document).ready(function() {
  "use strict";
  var av_name = "InvListCON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;
  var av;
  var leftAlign = 150;
  var topAlign = 10;

  av = new JSAV(av_name);



  //position variables 
  var yPos = 20;
  var xPos = 180;

  //label on top for primary & seconday 
  av.label("Secondary ", {left: xPos + 10, top: yPos});
  av.label("Primary ", {left: xPos + 350, top: yPos});

  //height and width variables for left table first column
  var leftBoxWidth = 100;
  var leftBoxHeight = 30;

  //left box first column
  av.label("Key", {left: xPos + 30, top: yPos + 50});
  //av.label("Jones", {left: xPos - 160, top: yPos + 100});
  av.g.rect(xPos, yPos + 100, leftBoxWidth, leftBoxHeight).css({fill: "white"});
  av.g.rect(xPos, yPos + 100 + leftBoxHeight, leftBoxWidth, leftBoxHeight).css({fill: "white"});
  av.g.rect(xPos, yPos + 100 + leftBoxHeight*2, leftBoxWidth, leftBoxHeight).css({fill: "white"});
  

  //height and width variable for left table second and fourth column
  var boxHeightAndWidth = 30;

  //left box second column
  av.label("Index", {left: xPos + leftBoxWidth, top: yPos + 50});
  av.g.rect(xPos + leftBoxWidth, yPos + 100, boxHeightAndWidth, boxHeightAndWidth).css({fill: "white"});
  av.g.rect(xPos + leftBoxWidth, yPos + 100 + leftBoxHeight, boxHeightAndWidth, boxHeightAndWidth).css({fill: "white"});
  av.g.rect(xPos + leftBoxWidth, yPos + 100 + leftBoxHeight*2, boxHeightAndWidth, boxHeightAndWidth).css({fill: "white"});


  //right table left column variables
  var rightBoxWidth = 90;
  var rightBoxHeight = 30;

  //right box first column
  av.label("Key", {left: xPos + 330, top: yPos + 50});
  av.g.rect(xPos + 300, yPos + 100, rightBoxWidth, rightBoxHeight).css({fill: "white"});
  av.label("0", {left: xPos + 278, top: yPos + 93});
  av.g.rect(xPos + 300, yPos + 100 + rightBoxHeight, rightBoxWidth, rightBoxHeight).css({fill: "white"});
  av.label("1", {left: xPos + 278, top: yPos + 93 + rightBoxHeight});
  av.g.rect(xPos + 300, yPos + 100 + rightBoxHeight*2, rightBoxWidth, rightBoxHeight).css({fill: "white"});
  av.label("2", {left: xPos + 278, top: yPos + 93 + rightBoxHeight*2});
  av.g.rect(xPos + 300, yPos + 100 + rightBoxHeight*3, rightBoxWidth, rightBoxHeight).css({fill: "white"});
  av.label("3", {left: xPos + 278, top: yPos + 93 + rightBoxHeight*3});
  av.g.rect(xPos + 300, yPos + 100 + rightBoxHeight*4, rightBoxWidth, rightBoxHeight).css({fill: "white"});
  av.label("4", {left: xPos + 278, top: yPos + 93 + rightBoxHeight*4});
  av.g.rect(xPos + 300, yPos + 100 + rightBoxHeight*5, rightBoxWidth, rightBoxHeight).css({fill: "white"});
  av.label("5", {left: xPos + 278, top: yPos + 93 + rightBoxHeight*5});
  av.g.rect(xPos + 300, yPos + 100 + rightBoxHeight*6, rightBoxWidth, rightBoxHeight).css({fill: "white"});
  av.label("6", {left: xPos + 278, top: yPos + 93 + rightBoxHeight*6});
  av.g.rect(xPos + 300, yPos + 100 + rightBoxHeight*7, rightBoxWidth, rightBoxHeight).css({fill: "white"});
  av.label("7", {left: xPos + 278, top: yPos + 93 + rightBoxHeight*7});

  //right box second column
  av.label("Index", {left: xPos + 383, top: yPos + 50});
  av.g.rect(xPos + rightBoxWidth + 300, yPos + 100, boxHeightAndWidth, boxHeightAndWidth).css({fill: "white"});
  av.g.rect(xPos + rightBoxWidth + 300, yPos + 100 + rightBoxHeight, boxHeightAndWidth, boxHeightAndWidth).css({fill: "white"});
  av.g.rect(xPos + rightBoxWidth + 300, yPos + 100 + rightBoxHeight*2, boxHeightAndWidth, boxHeightAndWidth).css({fill: "white"});
  av.g.rect(xPos + rightBoxWidth + 300, yPos + 100 + rightBoxHeight*3, boxHeightAndWidth, boxHeightAndWidth).css({fill: "white"});
  av.g.rect(xPos + rightBoxWidth + 300, yPos + 100 + rightBoxHeight*4, boxHeightAndWidth, boxHeightAndWidth).css({fill: "white"});
  av.g.rect(xPos + rightBoxWidth + 300, yPos + 100 + rightBoxHeight*5, boxHeightAndWidth, boxHeightAndWidth).css({fill: "white"});
  av.g.rect(xPos + rightBoxWidth + 300, yPos + 100 + rightBoxHeight*6, boxHeightAndWidth, boxHeightAndWidth).css({fill: "white"});
  av.g.rect(xPos + rightBoxWidth + 300, yPos + 100 + rightBoxHeight*7, boxHeightAndWidth, boxHeightAndWidth).css({fill: "white"});

  //arrows
  av.g.line(325,  137, 436, 137,
            {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.g.line(325,  165, 436, 165,
            {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.g.line(325,  191, 436, 225,
            {"arrow-end": "classic-wide-long", "stroke-width": 2});

  av.displayInit();
  av.recorded();
});
