// Written by Jun Yang and Cliff Shaffer
// Diagram showing Two stacks implemented within in a single array.
$(document).ready(function() {
  "use strict";
  var av = new JSAV("lstackTwostackCON", {animationMode: "none"});
  // Relative offsets
  var leftMarg = 180;
  var topMarg = 40;
  av.g.rect(leftMarg, topMarg, 500, 31);
  av.g.line(leftMarg + 31, topMarg, leftMarg + 31, topMarg + 31);
  av.g.line(leftMarg + 31 * 2, topMarg, leftMarg + 31 * 2, topMarg + 31);
  for (var i = 0; i < 4; i++) {
    av.g.line(leftMarg + 376 + 31 * i, topMarg,
              leftMarg + 376 + 31 * i, topMarg + 31);
  }
  av.label("top1", {left: leftMarg + 20, top: topMarg - 55});
  av.g.line(leftMarg + 30, topMarg - 20, leftMarg + 45, topMarg - 2,
            {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.label("top2", {left: leftMarg + 376 + 20, top: topMarg - 55});
  av.g.line(leftMarg + 376 + 30, topMarg - 20, leftMarg + 376 + 15, topMarg - 2,
            {"arrow-end": "classic-wide-long", "stroke-width": 2});
  av.g.line(leftMarg + 82, topMarg + 16, leftMarg + 82 + 35, topMarg + 16,
            {"stroke-width": 2, "arrow-end": "block-wide-long"});
  av.g.line(leftMarg + 356, topMarg + 16, leftMarg + 356 - 35, topMarg + 16,
            {"stroke-width": 2, "arrow-end": "block-wide-long"});
  av.displayInit();
  av.recorded();
});
