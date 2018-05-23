$(document).ready(function() {
  "use strict";
  var av_name = "ProductCON";

  var av = new JSAV(av_name);
  
  // Slide #1
  av.umsg("The coefficients of the product polynomial can be computed from the"
    + "following outer-product.");
  var ab = av.ds.matrix({rows: 4, columns: 4, left: 150});
  var a  = av.ds.matrix([["$a_0$"], ["$a_1$"], ["$a_2$"], ["$a_3$"]], {left: 400});
  var b = av.ds.matrix([["$b_0$", "$b_1$", "$b_2$", "$b_3$"]], {left: 500});

  av.displayInit();


  // Slide #2
  av.umsg("First we have the constant component, represented by $a_0$");

  av.step();

  // Slide #3
  av.umsg("Then, a linear component represented by a line of slope $a_1$");

  av.step();

  // Slide 4
  av.umsg("Next, the root of x multiplied with $a_2$");

  
  av.step();

  // Slide 5
  av.umsg("Last, we have a third-order component, with the coefficient $a_3$");

  av.step();

  av.umsg("Adding these 4 componets gives us our polynomial (in black)");
  av.recorded();
});
