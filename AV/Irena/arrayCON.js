/*global JSAV, document */
// Written by Irena Shaffer

$(document).ready(function() {
  "use strict";
  var av = new JSAV("arrayCON", {animationMode: "none"});

  av.label("$A_z$ = ", {left: 310, top: 105});
  av.ds.matrix([["$1$", "$1$", "$1$", "$1$"], ["$1$", "$i$", "$-1$", "$-i$"],
    ["$1$", "$-1$", "$1$", "$-1$"], ["$1$", "$-i$", "$-1$", "$i$"]], {left: 350, top: 25});

  var xLab = 368;
  var yLab = 35;
  av.label("$x^0$", {left: xLab});
  av.label("$x^1$", {left: xLab + 45});
  av.label("$x^2$", {left: xLab + 45 * 2});
  av.label("$x^3$", {left: xLab + 45 * 3});

  av.label("$z^0 = 1$", {left: xLab + 45 * 4, top: yLab});
  av.label("$z^1 = i$", {left: xLab + 45 * 4, top: yLab + 45});
  av.label("$z^2 = -1$", {left: xLab + 45 * 4, top: yLab + 45 * 2});
  av.label("$z^3 = -i$", {left: xLab + 45 * 4, top: yLab + 45 * 3});

  av.displayInit();
  av.recorded();
});
