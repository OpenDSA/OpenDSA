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
  av.label("Secondary ", {left: xPos + 10, top: yPos - 5});
  av.label("Primary ", {left: xPos + 325, top: yPos - 5});

  //height and width variables for left table first column
  var leftBoxWidth = 100;
  var leftBoxHeight = 30;

  //left box first column
  av.label("Key", {left: xPos + 30, top: yPos + 15});
  //av.label("Jones", {left: xPos - 160, top: yPos + 100});
  av.g.rect(xPos, yPos + 50, leftBoxWidth, leftBoxHeight).css({fill: "white"});
  av.g.rect(xPos, yPos + 50 + leftBoxHeight, leftBoxWidth, leftBoxHeight).css({fill: "white"});
  av.g.rect(xPos, yPos + 50 + leftBoxHeight*2, leftBoxWidth, leftBoxHeight).css({fill: "white"});
  

  //height and width variable for left table second and fourth column
  var boxHeightAndWidth = 30;

  //left box second column
  av.g.rect(xPos + leftBoxWidth, yPos + 50, boxHeightAndWidth, boxHeightAndWidth).css({fill: "white"});
  av.g.rect(xPos + leftBoxWidth, yPos + 50 + leftBoxHeight, boxHeightAndWidth, boxHeightAndWidth).css({fill: "white"});
  av.g.rect(xPos + leftBoxWidth, yPos + 50 + leftBoxHeight*2, boxHeightAndWidth, boxHeightAndWidth).css({fill: "white"});


  //right table left column variables
  var rightBoxWidth = 90;
  var rightBoxHeight = 30;

  //right box first column
  av.label("Key", {left: xPos + 330, top: yPos + 15});
  av.g.rect(xPos + 300, yPos + 50, rightBoxWidth, rightBoxHeight).css({fill: "white"});
  av.g.rect(xPos + 300, yPos + 50 + rightBoxHeight, rightBoxWidth, rightBoxHeight).css({fill: "white"});
  av.g.rect(xPos + 300, yPos + 50 + rightBoxHeight*2, rightBoxWidth, rightBoxHeight).css({fill: "white"});
  av.g.rect(xPos + 300, yPos + 50 + rightBoxHeight*3, rightBoxWidth, rightBoxHeight).css({fill: "white"});

  av.g.rect(xPos + 300, yPos + 50 + rightBoxHeight*5, rightBoxWidth, rightBoxHeight).css({fill: "white"});
  av.g.rect(xPos + 300, yPos + 50 + rightBoxHeight*6, rightBoxWidth, rightBoxHeight).css({fill: "white"});
  av.g.rect(xPos + 300, yPos + 50 + rightBoxHeight*7, rightBoxWidth, rightBoxHeight).css({fill: "white"});

  av.g.rect(xPos + 300, yPos + 50 + rightBoxHeight*9, rightBoxWidth, rightBoxHeight).css({fill: "white"});


  //arrows
  av.g.line(325,  80, 469, 80,
            {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.g.line(325,  115, 473, 208,
            {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.g.line(325,  150, 471, 330,
            {"arrow-end": "classic-wide-long", "stroke-width": 2});

  av.displayInit();
  av.recorded();
});
