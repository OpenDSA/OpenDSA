// Support for creating tapes for autometa visualization. (extends JSAV array class)
// Written by Ziyou Shang, Kaiyang Zhang

$(document).ready(function() {
  "use strict";
  if (typeof JSAV === "undefined") { return; }

  /*
  Tape class implementation
  Extended from the JSAV array class.
  element is an array with values to put into the tape
  x_coord is the x-coordinate
  y-coord is the y-coordinate
  direction is the side to put the "infinite" sign, with choice of "none", "left", "right", or "both"
  */
  function Tape(jsav, element, x_coord, y_coord, direction, options) {
    // constant to calculate position to draw the "infinite" sign
    var cell_size = 30;

    // set the constructors
    this.jsav = jsav;
    this.x_coord = x_coord;
    this.y_coord = y_coord;
    this.direction = direction;
    this.options = options;
    // this.current = 0;
    //this.consider;
    //this.accept;

    if ($.isArray(element)) {
      // x & y control
      var right = x_coord + element.length * cell_size; //topright

      //default position of array's top center and call JSAV array constructor
      var left_arr = String(x_coord) + "px";
      var top_arr = String(y_coord - 16) + "px";
      var arr = jsav.ds.array(element, {left: left_arr, top: top_arr});
      // arr.highlight(this.current);

      //right and left points to draw the "infinite sign" with poly-lines
      var points = [[0, 0], [15, 0], [11, 3], [21, 7], [5, 12], [9, 20], [28, 28], [0, 28]];
      var points_l = [[0, 0], [15, 0], [11, 3], [21, 7], [5, 12], [9, 20], [28, 28], [0, 28]];


      if (direction === "right") { plot_right(jsav, right, y_coord, points); }
      if (direction === "left") { plot_left(jsav, x_coord, y_coord, points_l); }
      if (direction === "both") { plot_right(jsav, right, y_coord, points); plot_left(jsav, x_coord, y_coord, points_l); }

      // change the style (shape) of the JSAV array class
      arr.css(true, {"border-radius": "0px"});
    }
  }

  // extend JSAV array class
  JSAV.utils.extend(Tape, JSAV._types.ds.AVArray);

  // function to draw right "infinite" tape sign
  function plot_right(jsav, right, y_coord, points) {
    for (var i = 0; i < points.length; i++) {
      points[i][0] += right;
      points[i][1] += y_coord;
    }
    var poly = jsav.g.polyline(points);
    poly.show();
  }

  // function to draw left "infinite" tape sign
  function plot_left(jsav, x_coord, y_coord, points_l) {
    for (var i = 0; i < points_l.length; i++) {
      points_l[i][0] = x_coord - points_l[i][0];
      points_l[i][1] = y_coord + points_l[i][1];
    }
    var poly_l = jsav.g.polyline(points_l);
    poly_l.show();
  }

  // function highlightPosition(location){
  //   arr.unhighlight(this.current);
  //   arr.highlight(location);
  // }


  // Add the Tape constructor to the public facing JSAV interface.
  JSAV.ext.ds.tape = function(element, x_coord, y_coord, direction, options) {
    return new Tape(this, element, x_coord, y_coord, direction, options);
  };
  JSAV._types.ds.Tape = Tape;
}(jQuery));
