// Support for tree nodes implemented with arrays (for B-Trees)
// Written by Kasper Hellström

(function($) {
  "use strict";
  if (typeof JSAV === "undefined") { return; }

  /*
    Tape class
    Extended from the JSAV array class.
  */
  var Tape = function (jsav, element, left, top, direction, options) {

    var cell_size = 30;


    this.jsav = jsav;
    this.left = left;
    this.top = top;
    this.direction = direction;
    this.options = options;

    if ($.isArray(element)) {
      var arrsize = element.length;


      // x & y control
      var right = left + element.length * cell_size; //topright

      //default position of array's top center


      var left_arr = String (left )+"px";
      var top_arr = String (top-16) +"px";
      var arr = jsav.ds.array( element, {"left":left_arr ,"top":top_arr});


      // where the tape points to. left, right, both or none.

      //right and left points
      var points = [[0,0], [15,0], [11,3], [21,7], [5,12], [9,20], [28,28], [0,28]];
      var points_l = [[0,0], [15,0], [11,3], [21,7], [5,12], [9,20], [28,28], [0,28]];



      function plot_right() {
        for (i = 0; i < points.length; i++) {
          points[i][0] += right;
          points[i][1] += top;
        }
        var poly = jsav.g.polyline(points);
        poly.show();
      }

      function plot_left(){
        for (i = 0; i < points.length; i++) {
          points_l[i][0] = left - points_l[i][0];
          points_l[i][1] = top + points_l[i][1];
        }

        var poly_l = jsav.g.polyline(points_l);
        poly_l.show();
      }

      if (direction=="right") {plot_right()}
      if (direction=="left") {plot_left()}
      if (direction=="both") {plot_right();plot_left()}


      arr.css(true, {"border-radius":"0px"});

    }

  };

  JSAV.utils.extend(Tape, JSAV._types.ds.AVArray);
  var tapeproto = Tape.prototype;






  JSAV.ext.ds.tape = function (element, left, top, direction, options) {
    return new Tape(this, element, left, top, direction, options);
  };
  JSAV._types.ds.Tape = Tape;

}(jQuery));
