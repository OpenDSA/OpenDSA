$(document).ready(function() {
  "use strict";
  var av_name = "DFTpropCON";

  var av = new JSAV(av_name);
  
  // Slide #1
  av.umsg("We can speed up the matrix-vector multiplication using some nice"
    + " properties of the DFT matrix.");

  var mat = av.ds.matrix({rows: 8, columns: 8, left: 250, top: 0});

  for (var i = 0; i < 8; i++)
  {
    for (var j = 0; j < 8; j++)
    {
      var power = i * j;
      mat.value(i, j, "$\\omega$" + "^" + power);
    }
  }

  av.displayInit();

  // Slide #2
  av.umsg("We have: $\\omega^0=1$");
  for (var i = 0; i < 8; i++)
  {
    for (var j = 0; j < 8; j++)
    {
      if (i == 0 || j == 0)
      {
        mat.value(i, j, "$1$");
        mat.css(i, j, {"background-color": "#ffffb3"});
      }
    }
  }

  av.step();
  av.umsg("Since N = 8 (degree of the polynomial), then $\\omega^8=1$"
    + " and $\\omega^4=-1$.");
  mat.value(4, 2, "$1$");
  mat.value(2, 4, "$1$");
  mat.value(1, 4, "$-1$");
  mat.value(2, 2, "$-1$");
  mat.value(4, 1, "$-1$");
  mat.css(4, 2, {"background-color": "#ffffb3"});
  mat.css(1, 4, {"background-color": "#ffffb3"});
  mat.css(2, 2, {"background-color": "#ffffb3"});
  mat.css(4, 1, {"background-color": "#ffffb3"});
  mat.css(2, 4, {"background-color": "#ffffb3"});
  
  av.step();

  av.umsg("For any integer k, we have $\\omega^{8+k}=\\omega^8$, so "
    + "$\\omega^0=\\omega^8=\\omega^{16}=\\omega^{24}=1$.")

  mat.value(4, 4, "$1$");
  mat.value(4, 6, "$1$");
  mat.value(6, 4, "$1$");
  mat.css(4, 4, {"background-color": "#ffffb3"});
  mat.css(4, 6, {"background-color": "#ffffb3"});
  mat.css(6, 4, {"background-color": "#ffffb3"});

  av.step();

  av.umsg("We also have $\\omega^4=\\omega^{12}=\\omega^{20}=\\omega^{28}=\\omega^{36}=-1$.");

  mat.value(2, 6, "$-1$");
  mat.value(3, 4, "$-1$");
  mat.value(4, 3, "$-1$");
  mat.value(4, 5, "$-1$");
  mat.value(4, 7, "$-1$");
  mat.value(5, 4, "$-1$");
  mat.value(6, 2, "$-1$");
  mat.value(6, 6, "$-1$");
  mat.value(7, 4, "$-1$");
  mat.css(2, 6, {"background-color": "#ffffb3"});
  mat.css(3, 4, {"background-color": "#ffffb3"});
  mat.css(4, 3, {"background-color": "#ffffb3"});
  mat.css(4, 5, {"background-color": "#ffffb3"});
  mat.css(4, 7, {"background-color": "#ffffb3"});
  mat.css(5, 4, {"background-color": "#ffffb3"});
  mat.css(6, 2, {"background-color": "#ffffb3"});
  mat.css(6, 6, {"background-color": "#ffffb3"});
  mat.css(7, 4, {"background-color": "#ffffb3"});


  av.step();

  av.umsg("Another property is $\\omega^{4+k}=-\\omega^k$ which can be confirmed"
    + " from the elements already placed in the matrix.");

  av.step();

  av.umsg("We can compute: $\\omega^1=\\sqrt i$. \n From the first property, "
    + "we have: $\\omega^9=\\omega^{25}=\\omega^{49}=\\sqrt i$.");

  mat.value(1, 1, "$\\sqrt i$");
  mat.value(3, 3, "$\\sqrt i$");
  mat.value(5, 5, "$\\sqrt i$");
  mat.value(7, 7, "$\\sqrt i$");
  mat.css(1, 1, {"background-color": "#ffffb3"});
  mat.css(3, 3, {"background-color": "#ffffb3"});
  mat.css(5, 5, {"background-color": "#ffffb3"});
  mat.css(7, 7, {"background-color": "#ffffb3"});

  av.step();

  av.umsg("And from the second property: $\\omega^5=\\omega^{21}=-\\sqrt i$");

  mat.value(1, 5, "$\\sqrt i$");
  mat.value(3, 7, "$\\sqrt i$");
  mat.value(5, 1, "$\\sqrt i$");
  mat.value(7, 3, "$\\sqrt i$");
  mat.css(1, 5, {"background-color": "#ffffb3"});
  mat.css(3, 7, {"background-color": "#ffffb3"});
  mat.css(5, 1, {"background-color": "#ffffb3"});
  mat.css(7, 3, {"background-color": "#ffffb3"});

  av.step();
  av.umsg("When we compute $\\omega^2=i$, we also get: "
    +"$\\omega^{10}=\\omega^{18}=\\omega^{42}=i$");

  mat.value(1, 2, "$i$");
  mat.value(2, 1, "$i$");
  mat.value(2, 5, "$i$");
  mat.value(3, 6, "$i$");
  mat.value(5, 2, "$i$");
  mat.value(6, 3, "$i$");
  mat.value(6, 7, "$i$");
  mat.value(7, 6, "$i$");
  mat.css(1, 2, {"background-color": "#ffffb3"});
  mat.css(2, 1, {"background-color": "#ffffb3"});
  mat.css(2, 5, {"background-color": "#ffffb3"});
  mat.css(3, 6, {"background-color": "#ffffb3"});
  mat.css(5, 2, {"background-color": "#ffffb3"});
  mat.css(6, 3, {"background-color": "#ffffb3"});
  mat.css(6, 7, {"background-color": "#ffffb3"});
  mat.css(7, 6, {"background-color": "#ffffb3"});

  av.step();
  av.umsg("And $\\omega^6=\\omega^{14}=\\omega^{30}=-i$");

  mat.value(1, 6, "$-i$");
  mat.value(2, 3, "$-i$");
  mat.value(2, 7, "$-i$");
  mat.value(3, 2, "$-i$");
  mat.value(5, 6, "$-i$");
  mat.value(6, 1, "$-i$");
  mat.value(6, 5, "$-i$");
  mat.value(7, 2, "$-i$");
  mat.css(1, 6, {"background-color": "#ffffb3"});
  mat.css(2, 3, {"background-color": "#ffffb3"});
  mat.css(2, 7, {"background-color": "#ffffb3"});
  mat.css(3, 2, {"background-color": "#ffffb3"});
  mat.css(5, 6, {"background-color": "#ffffb3"});
  mat.css(6, 1, {"background-color": "#ffffb3"});
  mat.css(6, 5, {"background-color": "#ffffb3"});
  mat.css(7, 2, {"background-color": "#ffffb3"});

  av.step();
  av.umsg("Finally, we have: $\\omega^3=\\omega^{35}=i\\sqrt i$"
    + " and $\\omega^7=\\omega^{15}=-i\\sqrt i$");

  mat.value(1, 3, "$i\\sqrt i$");
  mat.value(3, 1, "$i\\sqrt i$");
  mat.value(5, 7, "$i\\sqrt i$");
  mat.value(7, 5, "$i\\sqrt i$");
  mat.value(1, 7, "$-i\\sqrt i$");
  mat.value(3, 5, "$-i\\sqrt i$");
  mat.value(5, 3, "$-i\\sqrt i$");
  mat.value(7, 1, "$-i\\sqrt i$");
  mat.css(1, 3, {"background-color": "#ffffb3"});
  mat.css(3, 1, {"background-color": "#ffffb3"});
  mat.css(5, 7, {"background-color": "#ffffb3"});
  mat.css(7, 5, {"background-color": "#ffffb3"});
  mat.css(1, 7, {"background-color": "#ffffb3"});
  mat.css(3, 5, {"background-color": "#ffffb3"});
  mat.css(5, 3, {"background-color": "#ffffb3"});
  mat.css(7, 1, {"background-color": "#ffffb3"});

  av.step();
  av.umsg("Using these properties, we can completely fill the matrix in 3-4 steps.");

  av.recorded();
});
