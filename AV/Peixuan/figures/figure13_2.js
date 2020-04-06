/*require mathjax*/
$(document).ready(function() {
  var av = new JSAV("figure13_2", {animationMode: "none"});
  var left = 90;
  for (i = 0; i < 5; i++) {
    av.label(String(i + 1), {left: left + 50 + i*100, top: 5});
    av.g.line(left + 5 + i*100, 40, left + 5 + i*100, 300);
  }
  av.g.line(left + 5, 40, left + 470, 40);
  av.g.line(left + 5, 300, left + 470, 300);
  let f3nums = [7, 9, 11, 13, 15, 17];
  let f4nums = [15, 1, 7, 13, 2, 7];

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

    av.g.circle(left + 35 + i*100, 250, 2, {fill: "black"});
    av.g.circle(left + 35 + i*100, 260, 2, {fill: "black"});
    av.g.circle(left + 35 + i*100, 270, 2, {fill: "black"});
    av.g.circle(left + 75 + i*100, 250, 2, {fill: "black"});
    av.g.circle(left + 75 + i*100, 260, 2, {fill: "black"});
    av.g.circle(left + 75 + i*100, 270, 2, {fill: "black"});
  }

  av.g.line(left + 550, 40, left + 680, 40);
  av.g.line(left + 550, 300, left + 680, 300);
  av.g.line(left + 550, 40, left + 550, 300);
  av.g.line(left + 680, 40, left + 680, 300);
  av.g.line(left + 615, 60, left + 615, 280);
  av.g.line(left + 570, 80, left + 660, 80);
  av.label("$x$", {left: left + 585, top: 40});
  av.label("$f_{new}(x)$", {left: left + 620, top: 40});
  for (i = 0; i < 6; i ++){
    av.label(String(i + 1), {left: left + 585, top: 70 + i*27});
  }
  av.label(String(2), {left: left + 635, top: 70});
  av.label(String(3), {left: left + 635, top: 70 + 27});
  av.label(String(12), {left: left + 630, top: 70 + 2*27});
  av.label(String(14), {left: left + 630, top: 70 + 3*27});
  av.g.circle(left + 589, 250, 2, {fill: "black"});
  av.g.circle(left + 589, 260, 2, {fill: "black"});
  av.g.circle(left + 589, 270, 2, {fill: "black"});
  av.g.circle(left + 640, 250, 2, {fill: "black"});
  av.g.circle(left + 640, 260, 2, {fill: "black"});
  av.g.circle(left + 640, 270, 2, {fill: "black"});

  for (i = 0; i < 5; i ++){
    av.g.polyline([[left + 610, 87 + i*27], [left + 610, 97+ i*27], [left + 625, 92+ i*27]], {fill: "black"});
  }
  av.g.circle(left + 75, 93, 10);
  av.g.circle(left + 175, 120, 10);
  av.g.circle(left + 275, 147, 10);
  av.g.circle(left + 375, 174, 10);
  av.g.circle(left + 475, 201, 10);
  av.g.line(left + 85, 93, left + 610, 93);
  av.g.line(left + 185, 120, left + 610, 120);
  av.g.line(left + 285, 147, left + 610, 147);
  av.g.line(left + 385, 174, left + 610, 174);
  av.g.line(left + 485, 201, left + 610, 201);
  av.displayInit();
});
