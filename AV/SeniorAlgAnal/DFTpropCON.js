// Written by Irena Shaffer
$(document).ready(function() {
  "use strict";
  var av_name = "DFTpropCON";
  var av = new JSAV(av_name);

  // Slide 1
  av.umsg("We can speed up the matrix-vector multiplication using some nice" +
    " properties of the DFT matrix.");
  var mat = av.ds.matrix({rows: 8, columns: 8, left: 250, top: -15});
  var i;
  var j;
  var power = 0;
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      power = i * j;
      mat.value(i, j, "$z^{" + power + "}$");
    }
  }
  av.displayInit();

  // Slide 2
  var color1 = "#ffffb3";
  var color2 = "#cecdca";
  av.umsg("We have: $z^0=1$. (Please note: For each matrix value that gets changed, the math won't display quite right until the following slide.)"); 
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      if (i === 0 || j === 0) {
        mat.value(i, j, "$1$");
        mat.css(i, j, {"background-color": color1});
      }
    }
  }
  av.step();

  // Slide 3
  av.umsg("Since N = 8 (degree of the polynomial), then for any integer k, we have $z^{8+k}=z^k$. So $z^0=z^8=z^{16}=z^{24}=1$.");
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      if (i === 0 || j === 0) {
        mat.css(i, j, {"background-color": color2});
      }
    }
  }
  mat.value(4, 2, "$1$");
  mat.value(2, 4, "$1$");
  mat.value(4, 4, "$1$");
  mat.value(4, 6, "$1$");
  mat.value(6, 4, "$1$");
  mat.css(4, 2, {"background-color": color1});
  mat.css(2, 4, {"background-color": color1});
  mat.css(4, 4, {"background-color": color1});
  mat.css(4, 6, {"background-color": color1});
  mat.css(6, 4, {"background-color": color1});
  av.step();

  // Slide 4
  av.umsg("We can compute $z^4=-1$. So, we also have $z^4=z^{12}=z^{20}=z^{28}=z^{36}=-1$.");
  mat.css(4, 2, {"background-color": color2});
  mat.css(2, 4, {"background-color": color2});
  mat.css(4, 4, {"background-color": color2});
  mat.css(4, 6, {"background-color": color2});
  mat.css(6, 4, {"background-color": color2});

  mat.value(1, 4, "$-1$");
  mat.value(2, 2, "$-1$");
  mat.value(4, 1, "$-1$");
  mat.value(2, 6, "$-1$");
  mat.value(3, 4, "$-1$");
  mat.value(4, 3, "$-1$");
  mat.value(4, 5, "$-1$");
  mat.value(4, 7, "$-1$");
  mat.value(5, 4, "$-1$");
  mat.value(6, 2, "$-1$");
  mat.value(6, 6, "$-1$");
  mat.value(7, 4, "$-1$");

  mat.css(1, 4, {"background-color": color1});
  mat.css(2, 2, {"background-color": color1});
  mat.css(4, 1, {"background-color": color1});
  mat.css(2, 6, {"background-color": color1});
  mat.css(3, 4, {"background-color": color1});
  mat.css(4, 3, {"background-color": color1});
  mat.css(4, 5, {"background-color": color1});
  mat.css(4, 7, {"background-color": color1});
  mat.css(5, 4, {"background-color": color1});
  mat.css(6, 2, {"background-color": color1});
  mat.css(6, 6, {"background-color": color1});
  mat.css(7, 4, {"background-color": color1});
  av.step();


  // Slide 6
  mat.css(1, 4, {"background-color": color2});
  mat.css(2, 2, {"background-color": color2});
  mat.css(4, 1, {"background-color": color2});
  mat.css(2, 6, {"background-color": color2});
  mat.css(3, 4, {"background-color": color2});
  mat.css(4, 3, {"background-color": color2});
  mat.css(4, 5, {"background-color": color2});
  mat.css(4, 7, {"background-color": color2});
  mat.css(5, 4, {"background-color": color2});
  mat.css(6, 2, {"background-color": color2});
  mat.css(6, 6, {"background-color": color2});
  mat.css(7, 4, {"background-color": color2});
  av.umsg("Another property is $z^{4+k}=-z^k$ which can be confirmed" +
    " from the elements already placed in the matrix.");
  av.step();

  // Slide 7
  av.umsg("We can compute: $z^1=\\sqrt i$. Thus, we have: $z^9=z^{25}=z^{49}=\\sqrt i$ and $z^5=z^{21}=-\\sqrt i$");
  mat.value(1, 1, "$\\sqrt i$");
  mat.value(3, 3, "$\\sqrt i$");
  mat.value(5, 5, "$\\sqrt i$");
  mat.value(7, 7, "$\\sqrt i$");
  mat.value(1, 5, "$-\\sqrt i$");
  mat.value(3, 7, "$-\\sqrt i$");
  mat.value(5, 1, "$-\\sqrt i$");
  mat.value(7, 3, "$-\\sqrt i$");
  mat.css(1, 1, {"background-color": color1});
  mat.css(3, 3, {"background-color": color1});
  mat.css(5, 5, {"background-color": color1});
  mat.css(7, 7, {"background-color": color1});
  mat.css(1, 5, {"background-color": color1});
  mat.css(3, 7, {"background-color": color1});
  mat.css(5, 1, {"background-color": color1});
  mat.css(7, 3, {"background-color": color1});
  av.step();

  // Slide 9
  av.umsg("When we compute $z^2=i$, we also get: $z^{10}=z^{18}=z^{42}=i$ and $z^6=z^{14}=z^{30}=-i$");
  mat.css(1, 1, {"background-color": color2});
  mat.css(3, 3, {"background-color": color2});
  mat.css(5, 5, {"background-color": color2});
  mat.css(7, 7, {"background-color": color2});
  mat.css(1, 5, {"background-color": color2});
  mat.css(3, 7, {"background-color": color2});
  mat.css(5, 1, {"background-color": color2});
  mat.css(7, 3, {"background-color": color2});
  mat.value(1, 2, "$i$");
  mat.value(2, 1, "$i$");
  mat.value(2, 5, "$i$");
  mat.value(3, 6, "$i$");
  mat.value(5, 2, "$i$");
  mat.value(6, 3, "$i$");
  mat.value(6, 7, "$i$");
  mat.value(7, 6, "$i$");
  mat.value(1, 6, "$-i$");
  mat.value(2, 3, "$-i$");
  mat.value(2, 7, "$-i$");
  mat.value(3, 2, "$-i$");
  mat.value(5, 6, "$-i$");
  mat.value(6, 1, "$-i$");
  mat.value(6, 5, "$-i$");
  mat.value(7, 2, "$-i$");
  mat.css(1, 2, {"background-color": color1});
  mat.css(2, 1, {"background-color": color1});
  mat.css(2, 5, {"background-color": color1});
  mat.css(3, 6, {"background-color": color1});
  mat.css(5, 2, {"background-color": color1});
  mat.css(6, 3, {"background-color": color1});
  mat.css(6, 7, {"background-color": color1});
  mat.css(7, 6, {"background-color": color1});
  mat.css(1, 6, {"background-color": color1});
  mat.css(2, 3, {"background-color": color1});
  mat.css(2, 7, {"background-color": color1});
  mat.css(3, 2, {"background-color": color1});
  mat.css(5, 6, {"background-color": color1});
  mat.css(6, 1, {"background-color": color1});
  mat.css(6, 5, {"background-color": color1});
  mat.css(7, 2, {"background-color": color1});
  av.step();


  // Slide 11
  av.umsg("Finally, we have: $z^3=z^{35}=i\\sqrt i$" +
    " and $z^7=z^{15}=-i\\sqrt i$");
  mat.css(1, 2, {"background-color": color2});
  mat.css(2, 1, {"background-color": color2});
  mat.css(2, 5, {"background-color": color2});
  mat.css(3, 6, {"background-color": color2});
  mat.css(5, 2, {"background-color": color2});
  mat.css(6, 3, {"background-color": color2});
  mat.css(6, 7, {"background-color": color2});
  mat.css(7, 6, {"background-color": color2});
  mat.css(1, 6, {"background-color": color2});
  mat.css(2, 3, {"background-color": color2});
  mat.css(2, 7, {"background-color": color2});
  mat.css(3, 2, {"background-color": color2});
  mat.css(5, 6, {"background-color": color2});
  mat.css(6, 1, {"background-color": color2});
  mat.css(6, 5, {"background-color": color2});
  mat.css(7, 2, {"background-color": color2});

  mat.value(1, 3, "$i\\sqrt i$");
  mat.value(3, 1, "$i\\sqrt i$");
  mat.value(5, 7, "$i\\sqrt i$");
  mat.value(7, 5, "$i\\sqrt i$");
  mat.value(1, 7, "$-i\\sqrt i$");
  mat.value(3, 5, "$-i\\sqrt i$");
  mat.value(5, 3, "$-i\\sqrt i$");
  mat.value(7, 1, "$-i\\sqrt i$");
  mat.css(1, 3, {"background-color": color1});
  mat.css(3, 1, {"background-color": color1});
  mat.css(5, 7, {"background-color": color1});
  mat.css(7, 5, {"background-color": color1});
  mat.css(1, 7, {"background-color": color1});
  mat.css(3, 5, {"background-color": color1});
  mat.css(5, 3, {"background-color": color1});
  mat.css(7, 1, {"background-color": color1});
  av.step();

  // Slide 12
  av.umsg("Using these properties, we only need to compute 4 values: $z^0$, $z^1$, $z^2$, and $z^3$, to completely fill the matrix.");
  mat.css(1, 3, {"background-color": color2});
  mat.css(3, 1, {"background-color": color2});
  mat.css(5, 7, {"background-color": color2});
  mat.css(7, 5, {"background-color": color2});
  mat.css(1, 7, {"background-color": color2});
  mat.css(3, 5, {"background-color": color2});
  mat.css(5, 3, {"background-color": color2});
  mat.css(7, 1, {"background-color": color2});
  av.recorded();
});
