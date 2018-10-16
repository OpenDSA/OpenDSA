/*global JSAV, document */
// Written by Ziyou Shang

document.write('<script src="../../../AV/Development/formal_language/fa/FA.js"></script>');

$(document).ready(function() {
  "use strict";
  var direction = "left";


  var av_name = "test1";
  var av = new JSAV(av_name);

  // x & y control
  var left = 225;
  var top = 25;

  //default position of array's top center
  var middle = 425;
  var height = 16;

  var arr = av.ds.array([ 25,20,213]);

  // get the position of array's topright and topleft corners
  var topright = middle + 1/2*arr.size()*30;
  var topleft  = middle - 1/2*arr.size()*30;

  // where the tape points to. left, right, both or none.

  //right and left points
  var points = [[0,0], [15,0], [11,3], [21,7], [5,12], [9,20], [29,30], [0,29]];
  var points_l = [[0,0], [15,0], [11,3], [21,7], [5,12], [9,20], [29,30], [0,29]];



  function plot_right() {
    for (i = 0; i < points.length; i++) { 
      points[i][0] += topright;
      points[i][1] += height;
    }
    var poly = av.g.polyline(points);
    poly.show();
  }
  console.log(topleft);
  console.log(points_l);

  function plot_left(){
    for (i = 0; i < points.length; i++) { 
      points_l[i][0] = topleft - points_l[i][0];
      points_l[i][1] = height + points_l[i][1];
    }

    console.dir(points_l);
    var poly_l = av.g.polyline(points_l);
    poly_l.show();
  }

  if (direction=="right") {plot_right()}
  if (direction=="left") {plot_left()}
  if (direction=="both") {plot_right();plot_left()}
  

  arr.css(true, {"border-radius":"0px"});
  av.displayInit();

});
