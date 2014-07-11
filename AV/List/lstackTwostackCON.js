// Diagram showing Two stacks implemented within in a single array.
(function ($) {
  var jsav = new JSAV("LStackTwostacksCON");
  // Relative offsets
  var leftMargin = 180;
  var topMargin = 50;
  var rect = jsav.g.rect(leftMargin, topMargin, 500, 31);
  var line1 = jsav.g.line(leftMargin + 31, topMargin, leftMargin + 31, topMargin + 31);
  var line2 = jsav.g.line(leftMargin + 31 * 2, topMargin, leftMargin + 31 * 2, topMargin + 31);
  for (var i = 0; i < 4; i++) {
    jsav.g.line(leftMargin + 376 + 31 * i, topMargin, leftMargin + 376 + 31 * i,
                topMargin + 31);
  }
  var top1Label = jsav.label("top1", {left : leftMargin + 20, top: topMargin - 40});
  var top1Arrow = jsav.g.line(leftMargin + 30, topMargin - 20, leftMargin + 45,
                              topMargin - 2, {'arrow-end': 'classic-wide-long', 'stroke-width' : 2});
  var top2Label = jsav.label("top2", {left : leftMargin + 376 + 20, top: topMargin - 40});
  var top2Arrow = jsav.g.line(leftMargin + 376 + 30, topMargin - 20,
                              leftMargin + 376 + 15, topMargin - 2,
                              {'arrow-end': 'classic-wide-long', 'stroke-width' : 2});
  var arrow1 = jsav.g.line(leftMargin + 82, topMargin + 16, leftMargin + 82 + 35, topMargin + 16, {'stroke-width' : 2, 'arrow-end' : 'block-wide-long'});
  var arrow2 = jsav.g.line(leftMargin + 356, topMargin + 16,
                           leftMargin + 356 - 35, topMargin + 16,
                           {'stroke-width' : 2, 'arrow-end' : 'block-wide-long'});
  jsav.displayInit();
  jsav.recorded();
}(jQuery));
