// Written by Peixuan Ge, April 2020
// Functions in bins: Diagonalization example
$(document).ready(function() {
  "use strict";
  var left = 200;
  var av = new JSAV("FuncBinCON", {animationMode: "none"});
  var i, j;

  for (i = 0; i < 5; i++) {
    av.label(String(i + 1), {left: left + 50 + i*100, top: 5});
    av.g.line(left + 5 + i*100, 40, left + 5 + i*100, 300);
  }
  av.g.line(left + 5, 40, left + 470, 40);
  av.g.line(left + 5, 300, left + 470, 300);
  var f3nums = [7, 9, 11, 13, 15, 17];
  var f4nums = [15, 1, 7, 13, 2, 7];

  for (i = 0; i < 4; i++) {
    av.g.line(left + 55 + i*100, 60, left + 55 + i*100, 280);
    av.g.line(left + 15 + i*100, 80, left + 95 + i*100, 80);
    av.label("$x$", {left: left + 30 + i*100, top: 40});
    av.label("$f_" + String(i+1) + "(x)$", {left: left + 65 + i*100, top: 40});
    for (j = 0; j < 6; j ++){
      av.label(String(j + 1), {left: left + 30 + i*100, top: 70 + j*27});
      if(i == 0){
        av.label(String(1), {left: left + 70 + i*100, top: 70 + j*27});
      }
      else if(i == 1){
        av.label(String(j + 1), {left: left + 70 + i*100, top: 70 + j*27});
      }
      else if(i == 2){
        if(String(f3nums[j]).length == 2){
          av.label(String(f3nums[j]), {left: left + 66 + i*100, top: 70 + j*27});
        }
        else{
          av.label(String(f3nums[j]), {left: left + 70 + i*100, top: 70 + j*27});
        }

      }
      else{
        if(String(f4nums[j]).length == 2){
          av.label(String(f4nums[j]), {left: left + 66 + i*100, top: 70 + j*27});
        }
        else{
          av.label(String(f4nums[j]), {left: left + 72 + i*100, top: 70 + j*27});
        }
      }
    }

    if(i == 0){
      av.g.circle(left + 35 + i*100, 250, 2);
    }
    else{
      av.g.circle(left + 35 + i*100, 250, 2, {fill: "black"});
    }
    av.g.circle(left + 35 + i*100, 260, 2, {fill: "black"});
    av.g.circle(left + 35 + i*100, 270, 2, {fill: "black"});
    av.g.circle(left + 75 + i*100, 250, 2, {fill: "black"});
    av.g.circle(left + 75 + i*100, 260, 2, {fill: "black"});
    av.g.circle(left + 75 + i*100, 270, 2, {fill: "black"});
  }
  av.displayInit();
});
