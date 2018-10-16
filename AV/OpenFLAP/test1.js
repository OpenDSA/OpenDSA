/*global JSAV, document */
// Written by Ziyou Shang/ Kaiyang Zhang

document.write('<script src="../../../AV/Development/formal_language/fa/FA.js"></script>');

$(document).ready(function() {

  var cell_size = 30;

  "use strict";

  // parameters needed to plot tape:
  // direction (str) ("both"/"left"/"right"/"none"), arr_in (javascript array), 
  // middle,top (int) (position of middle/top in px)
  // the default middle is 425 (the middle point of 900px-wide canvas)

  var direction = "both";
  var arr_in = [25,20,90,2,3,4];
  var middle = 425;
  var top = 20;


  var left = middle - arr_in.length/2*cell_size;; //left position in px


  var av_name = "test1";
  var av = new JSAV(av_name);


  
  // x & y control
  var right = left + arr_in.length * cell_size; //topright

  //default position of array's top center


  var left_arr = String (left )+"px";
  var top_arr = String (top-16) +"px";
  var arr = av.ds.array( arr_in, {"left":left_arr ,"top":top_arr});


  // where the tape points to. left, right, both or none.

  //right and left points
  var points = [[0,0], [15,0], [11,3], [21,7], [5,12], [9,20], [28,28], [0,28]];
  var points_l = [[0,0], [15,0], [11,3], [21,7], [5,12], [9,20], [28,28], [0,28]];



  function plot_right() {
    for (i = 0; i < points.length; i++) { 
      points[i][0] += right;
      points[i][1] += top;
    }
    var poly = av.g.polyline(points);
    poly.show();
  }

  function plot_left(){
    for (i = 0; i < points.length; i++) { 
      points_l[i][0] = left - points_l[i][0];
      points_l[i][1] = top + points_l[i][1];
    }

    var poly_l = av.g.polyline(points_l);
    poly_l.show();
  }

  if (direction=="right") {plot_right()}
  if (direction=="left") {plot_left()}
  if (direction=="both") {plot_right();plot_left()}
  

  arr.css(true, {"border-radius":"0px"});
  av.displayInit();

});
