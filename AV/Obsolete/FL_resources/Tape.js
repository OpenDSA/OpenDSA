// Support for creating tapes for autometa visualization. (extends JSAV array class)
// Written by Ziyou Shang, Kaiyang Zhang, Galina Belolipetski

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
  function Tape(jsav, element, x_coord, y_coord, direction, index, options) {
    // constant to calculate position to draw the "infinite" sign
    var cell_size = 30;

    // set the constructors
    this.jsav = jsav;
    this.x_coord = x_coord; //x coordinate of placement
    this.y_coord = y_coord; //y coordinate of placement
    this.direction = direction; // in which direction tape extends
    this.options = options;
    this.current = index; //the location to highlight
    this.arr = null;

    if ($.isArray(element)) {
      // x & y control
      var right = x_coord + element.length * cell_size; //topright

      //default position of array's top center and call JSAV array constructor
      var left_arr = String(x_coord) + "px";
      var top_arr = String(y_coord - 16) + "px";
      this.arr = jsav.ds.array(element, {left: left_arr, top: top_arr});

      //unhighlights everything
      for (var i = 0; i < this.arr.size(); i++) {
        this.arr.unhighlight(i);
      }
      if (this.current > -1 && this.current < this.arr.size()) {
        this.arr.highlight(this.current); //highlights the current position
      }

      //right and left points to draw the "infinite sign" with poly-lines
      var points = [[-5, 0], [15, 0], [11, 3], [21, 7], [5, 12], [9, 20], [28, 28], [-5, 28]];
      var points_l = [[-5, 0], [15, 0], [11, 3], [21, 7], [5, 12], [9, 20], [28, 28], [-5, 28]];


      var highlightLeft = (this.current === -1);
      var highlightRight = (this.current >= this.arr.size());

      if (direction === "right") { plot_right(jsav, right, y_coord, points, highlightRight); }
      if (direction === "left") { plot_left(jsav, x_coord, y_coord, points_l, highlightLeft); }
      if (direction === "both") { plot_right(jsav, right, y_coord, points, highlightRight); plot_left(jsav, x_coord, y_coord, points_l, highlightLeft); }

      // change the style (shape) of the JSAV array class
      //this.arr.css(true, {"border-radius": "0px"});
    }
  }

  // extend JSAV array class
  JSAV.utils.extend(Tape, JSAV._types.ds.AVArray);

  // function to draw right "infinite" tape sign
  function plot_right(jsav, right, y_coord, points, highlightRight) {
    for (var i = 0; i < points.length; i++) {
      points[i][0] += right;
      points[i][1] += y_coord;
    }
    var poly;
    if (highlightRight) {
      poly = jsav.g.polyline(points, {"stroke-width": 2, stroke: "#ff7"});
    } else {
      poly = jsav.g.polyline(points, {"stroke-width": 2});
    }
    poly.show();
  }

  // function to draw left "infinite" tape sign
  function plot_left(jsav, x_coord, y_coord, points_l, highlightLeft) {
    for (var i = 0; i < points_l.length; i++) {
      points_l[i][0] = x_coord - points_l[i][0];
      points_l[i][1] = y_coord + points_l[i][1];
    }
    var poly_l;
    if (highlightLeft) {
      poly_l = jsav.g.polyline(points_l, {"stroke-width": 2, stroke: "#ff7"});
    } else {
      poly_l = jsav.g.polyline(points_l, {"stroke-width": 2});
    }

    poly_l.show();
  }
  var proto = Tape.prototype;

  //attempt to highlight a particular position, but need access to the tape arr object
  //not necessary, but kept here for the future; this method can be used if the
  // tape does not have an initial highlighed location passed in
  // unhighlights everything and highlights the necessary position
  proto.highlightPosition = function(loc) {
    if (this.current !== "undefined") {
      for (var i = 0; i < this.arr.size(); i++) {
        this.arr.unhighlight(i);
      }
    }
    if (loc !== "undefined") {
      this.arr.highlight(loc);
    }
  };

  // Add the Tape constructor to the public facing JSAV interface.
  JSAV.ext.ds.tape = function(element, x_coord, y_coord, direction, options) {
    return new Tape(this, element, x_coord, y_coord, direction, options);
  };
  JSAV._types.ds.Tape = Tape;
}(jQuery));
