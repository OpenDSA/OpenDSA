"use strict";
// Written by Cliff Shaffer
$(document).ready(function () {
  var av = new JSAV("TOHfigCON", {animationMode: "none"});

  var left = 160;

  av.g.rect(left +   0, 120, 245, 10);
  av.g.rect(left +  40,  30,   5, 90);
  av.g.rect(left + 120,  30,   5, 90);
  av.g.rect(left + 200,  30,   5, 90);

  av.g.rect(left + 10, 110, 65, 10).css({fill: "gray"});
  av.g.rect(left + 15, 100, 55, 10).css({fill: "gray"});
  av.g.rect(left + 20,  90, 45, 10).css({fill: "gray"});
  av.g.rect(left + 25,  80, 35, 10).css({fill: "gray"});
  av.g.rect(left + 30,  70, 25, 10).css({fill: "gray"});
  av.g.rect(left + 35,  60, 15, 10).css({fill: "gray"});

  av.g.rect(left + 280, 120, 245, 10);
  av.g.rect(left + 320,  30,   5, 90);
  av.g.rect(left + 400,  30,   5, 90);
  av.g.rect(left + 480,  30,   5, 90);
  av.g.rect(left + 290, 110,  65, 10).css({fill: "gray"});
  av.g.rect(left + 375, 110,  55, 10).css({fill: "gray"});
  av.g.rect(left + 380, 100,  45, 10).css({fill: "gray"});
  av.g.rect(left + 385,  90,  35, 10).css({fill: "gray"});
  av.g.rect(left + 390,  80,  25, 10).css({fill: "gray"});
  av.g.rect(left + 395,  70,  15, 10).css({fill: "gray"});

  av.label("1",  {left: left +  37, top: -15});
  av.label("2",  {left: left + 117, top: -15});
  av.label("3",  {left: left + 197, top: -15});
  av.label("1",  {left: left + 317, top: -15});
  av.label("2",  {left: left + 397, top: -15});
  av.label("3",  {left: left + 477, top: -15});

  av.label("(a)",  {left: left + 112, top: 125});
  av.label("(b)",  {left: left + 391, top: 125});
});
