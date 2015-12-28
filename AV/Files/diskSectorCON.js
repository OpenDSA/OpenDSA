$(document).ready(function() {
  "use strict";
  var av = new JSAV("diskSector", {"animationMode": "none"});

  var atop = 5;
  var aleft = 200;

  av.g.rect(aleft +   0, atop + 40,  75, 50);
  av.g.rect(aleft + 100, atop + 40, 100, 50);
  av.g.rect(aleft + 250, atop + 40,  75, 50);
  av.g.rect(aleft + 350, atop + 40, 100, 50);

  av.label("Sector", {top: atop + 30, left: aleft + 10});
  av.label("Header", {top: atop + 45, left: aleft + 10});
  av.label("Sector", {top: atop + 30, left: aleft + 260});
  av.label("Header", {top: atop + 45, left: aleft + 260});

  av.label("Sector", {top: atop + 30, left: aleft + 130});
  av.label("Data",   {top: atop + 45, left: aleft + 130});
  av.label("Sector", {top: atop + 30, left: aleft + 380});
  av.label("Data",   {top: atop + 45, left: aleft + 380});

  av.label("Intersector Gap",  {top: atop - 10, left: aleft + 175});
  av.label("Intrasector Gap ", {top: atop + 90, left: aleft + 47});

  av.g.line(aleft + 87,  atop + 105,  aleft + 87, atop + 75,
            {'arrow-end': 'classic-wide-long', 'stroke-width' : 2});
  av.g.line(aleft + 225,  atop + 25,  aleft + 225, atop + 55,
            {'arrow-end': 'classic-wide-long', 'stroke-width' : 2});
  av.displayInit();
  av.recorded();
});
