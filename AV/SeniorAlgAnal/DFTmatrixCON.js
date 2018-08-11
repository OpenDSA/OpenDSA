// Written by Irena Shaffer
$(document).ready(function() {
  "use strict";
  var av_name = "DFTmatrixCON";
  var av = new JSAV(av_name);
  var ytop = 0;

  // Slide 1
  av.umsg("For an 8-degree polynomial, the matrix is $8 \\times 8$.");
  var A  = av.ds.matrix([["$A_0$"], ["$A_1$"], ["$A_2$"], ["$A_3$"], ["$A_4$"],
    ["$A_5$"], ["$A_6$"], ["$A_7$"]], {left: 140, top: ytop});
  var mat = av.ds.matrix({rows: 8, columns: 8, left: 250, top: ytop});
  var a  = av.ds.matrix([["$a_0$"], ["$a_1$"], ["$a_2$"], ["$a_3$"], ["$a_4$"],
    ["$a_5$"], ["$a_6$"], ["$a_7$"]], {left: 665, top: ytop});
  av.g.line(210, 192 + ytop, 225, 192 + ytop, {"stroke-width": 4});
  av.g.line(210, 199 + ytop, 225, 199 + ytop, {"stroke-width": 4});
  av.g.line(632, 191 + ytop, 642, 201 + ytop, {"stroke-width": 4});
  av.g.line(632, 201 + ytop, 642, 191 + ytop, {"stroke-width": 4});

  var i = 0;
  var j = 0;
  var power = 0;
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      power = i * j;
      mat.value(i, j, "$z^{" + power + "}$");
    }
  }
  av.displayInit();

  // Slide 2
  av.umsg("When $n = 8$, we have $z = \\sqrt i$ since $(\\sqrt{i})^8 = 1$. " +
          "This gives the following matrix. (Click to the next slide to get the math to display correctly.)");
  var val = "";
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      power = i * j;
      if ((power % 8) === 0) {
        val = "$1$";
      } else if ((power % 8) === 1) {
        val = "$\\sqrt i$";
      } else if ((power % 8) === 2) {
        val = "$i$";
      } else if ((power % 8) === 3) {
        val = "$i\\sqrt i$";
      } else if ((power % 8) === 4) {
        val = "$-1$";
      } else if ((power % 8) === 5) {
        val = "$-\\sqrt i$";
      } else if ((power % 8) === 6) {
        val = "$-i$";
      } else if ((power % 8) === 7) {
        val = "$-i\\sqrt i$";
      }
      mat.value(i, j, val);
    }
  }
  av.step();
  av.umsg("When $n = 8$, we have $z = \\sqrt i$ since $(\\sqrt{i})^8 = 1$. " +
          "This gives the following matrix.");
  av.step();

  // Slide 3
  av.umsg("Each element of the result comes from multiplying the " +
    "coresponding row of the matrix by the seed vector.");

  var color1 = "#cc709b";
  var color2 = "#b2a432";
  var color3 = "#b5f5ff";
  var color4 = "#fff5a6";
  var color5 = "#b28d9f";
  var color6 = "#74b0c2";
  var color7 = "#c3d36e";
  var color8 = "#a7a4a1";

  A.css(0, 0, {"background-color": color1});
  for (i = 0; i < 8; i++) {
    mat.css(0, i, {"background-color": color1});
    a.css(i, 0, {"background-color": color1});
  }
  av.step();

  // Slide 4
  av.umsg("So to compute one value in the result, we multiply and add 8 terms.");
  A.css(0, 0, {"background-color": "white"});
  for (i = 0; i < 8; i++) {
    mat.css(0, i, {"background-color": "white"});
    a.css(i, 0, {"background-color": "white"});
  }
  mat.css(0, 0, {"background-color": color1});
  a.css(0, 0, {"background-color": color1});
  var lab = av.label("$1*a_0$", {left: 250});
  av.step();

  // Slide 4
  av.umsg("Here we show terms that come from multiplications...");
  mat.css(0, 1, {"background-color": color1});
  a.css(1, 0, {"background-color": color1});

  lab.hide();
  lab = av.label("$1*a_0 + 1*a_1$", {left: 250});

  av.step();

  // Slide 5
  av.umsg("And here are more terms...");
  mat.css(0, 2, {"background-color": color1});
  a.css(2, 0, {"background-color": color1});

  lab.hide();
  lab = av.label("$1*a_0 + 1*a_1 + 1*a_2$", {left: 250});

  av.step();

  // Slide 6
  av.umsg("... until we get them all.");
  mat.css(0, 3, {"background-color": color1});
  a.css(3, 0, {"background-color": color1});
  mat.css(0, 4, {"background-color": color1});
  a.css(4, 0, {"background-color": color1});
  mat.css(0, 5, {"background-color": color1});
  a.css(5, 0, {"background-color": color1});
  mat.css(0, 6, {"background-color": color1});
  a.css(6, 0, {"background-color": color1});
  mat.css(0, 7, {"background-color": color1});
  a.css(7, 0, {"background-color": color1});

  A.css(0, 0, {"background-color": color1});

  lab.hide();
  lab = av.label("$1*a_0 + 1*a_1 + 1*a_2 + 1*a_3 + 1*a_4 + 1*a_5 + 1*a_6 + 1*a_7$", {left: 250});

  av.step();
  av.umsg("This is done for the next row.");
  A.css(1, 0, {"background-color": color2});
  for (i = 0; i < 8; i++) {
    mat.css(1, i, {"background-color": color2});
    a.css(i, 0, {"background-color": color2});
  }


  lab.hide();
  lab = av.label("$1*a_0 + \\sqrt {i}*a_1 + i*a_2 + i\\sqrt{i}*a_3 - 1*a_4 - \\sqrt{i}*a_5 - i*a_6 - i\\sqrt{i}*a_7$", {left: 240});

  av.step();
  // Slide 7
  av.umsg("This process has to be done for each row. So the computational cost of this operation is $O(n^2)$.");

  lab.hide();
  a.css(0, 0, {"background-color": "white"});
  A.css(2, 0, {"background-color": color3});
  A.css(3, 0, {"background-color": color4});
  A.css(4, 0, {"background-color": color5});
  A.css(5, 0, {"background-color": color6});
  A.css(6, 0, {"background-color": color7});
  A.css(7, 0, {"background-color": color8});
  for (i = 0; i < 8; i++) {
    a.css(i, 0, {"background-color": "white"});
    mat.css(2, i, {"background-color": color3});
    mat.css(3, i, {"background-color": color4});
    mat.css(4, i, {"background-color": color5});
    mat.css(5, i, {"background-color": color6});
    mat.css(6, i, {"background-color": color7});
    mat.css(7, i, {"background-color": color8});
  }
  av.recorded();
});
