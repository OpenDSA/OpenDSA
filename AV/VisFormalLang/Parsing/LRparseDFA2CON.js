$(document).ready(function() {
  "use strict";

  var av = new JSAV("LRparseDFA2CON", {animationMode: "none"});

  var l = 40;
  var xl = 60;
  var xxl = 80;

  var width = 1.7*xl;

  var l_border = 270;
  var t_border = 20;

  var v_fill = 30;
  var h_fill = width+140;

  var gap = 5;


  av.g.rect(l_border, t_border, width, xl);
  av.label("S' → _S", {left:l_border+15, top:t_border-5});
  av.label("S  → _ddX", {left:l_border+15, top:t_border+15});
  av.label("0:",{left:l_border-20, top:t_border-10});
  av.g.line(l_border + width, t_border + xl/2, l_border + h_fill, t_border + xl/2,
            {"arrow-end": "classic-wide-long"});
  av.label("S",{left:l_border+h_fill*0.66, top:t_border-10});
  av.g.line(l_border + width/2, t_border + xl, l_border + width/2, t_border + xl + v_fill,
            {"arrow-end": "classic-wide-long"});
  av.label("d",{left:l_border+width/2-20, top:t_border+xl-10});

  av.g.rect(l_border, t_border + v_fill + xl, width, l);
  av.label("S  → d_dX", {left:l_border+15, top:t_border+xl+v_fill-5});
  av.label("2:",{left:l_border-20, top:t_border+v_fill+xl-10});
  av.g.line(l_border + width/2, t_border +v_fill+ xl+l, l_border + width/2, t_border + xl+l +2*v_fill,
            {"arrow-end": "classic-wide-long"});
  av.label("d",{left:l_border+width/2-20, top:t_border+xl+l+v_fill-10});

  av.g.rect(l_border, t_border+2*v_fill+xl+l, width, xxl);
  av.label("S  → dd_X", {left:l_border+15, top:t_border+2*v_fill+xl+l-5});
  av.label("X  → _aX", {left:l_border+15, top:t_border+2*v_fill+xl+l+15});
  av.label("X  → λ_", {left:l_border+15, top:t_border+2*v_fill+xl+l+35});
  av.g.rect(l_border+gap, t_border+2*v_fill+xl+l+gap, width -2*gap, xxl-2*gap);
  av.label("3:",{left:l_border-20, top:t_border+2*v_fill+xl+l-10});
  av.g.line(l_border + width/2, t_border +2*v_fill+xxl+l+xl, l_border + width/2, t_border + 3*v_fill+ xxl+l+xl,
            {"arrow-end": "classic-wide-long"});

  av.g.line(l_border + width, t_border+3*v_fill+xxl+ xl/3, l_border + h_fill, t_border +3*v_fill+xxl+ xl/3,
            {"arrow-end": "classic-wide-long"});
  av.label("a",{left:l_border+width/2-20, top:t_border+xl+l+2*v_fill+xxl-10});

  av.label("X",{left:l_border+h_fill*0.66, top:t_border+3*v_fill+xxl+xl/3-40});

  av.g.rect(l_border, t_border+3*v_fill+xl+l+xxl, width, xxl);
  av.g.rect(l_border+gap, t_border+3*v_fill+xl+l+gap+xxl, width -2*gap, xxl-2*gap);
  av.label("X  → a_X", {left:l_border+15, top:t_border+3*v_fill+xl+l+xxl-5});
  av.label("X  → _aX", {left:l_border+15, top:t_border+3*v_fill+xl+l+xxl+15});
  av.label("X  → λ_", {left:l_border+15, top:t_border+3*v_fill+xl+l+xxl+35});
  av.label("5:",{left:l_border-20, top:t_border+3*v_fill+xl+l+xxl-10});
  av.g.polyline([[l_border+width/3, t_border+xl+l+2*xxl+3*v_fill], [l_border+width/4, t_border+xl+l+2*xxl+3*v_fill+15], [l_border+width/3, t_border+xl+l+2*xxl+3*v_fill+30], [l_border+0.6*width, t_border+xl+l+2*xxl+3*v_fill+30], [l_border+width*0.67, t_border+xl+l+2*xxl+3*v_fill+15], [l_border+width*0.58, t_border+xl+l+2*xxl+3*v_fill]],  {"arrow-end": "classic-wide-long"});
  av.g.line(l_border + width, t_border+3*v_fill+xxl+xl+l+ xl/3, l_border + h_fill, t_border +3*v_fill+xxl+xl+l+ xl/3,
            {"arrow-end": "classic-wide-long"});
  av.label("a",{left:l_border+width/2-10, top:t_border+xl+l+2*xxl+3*v_fill-5});
  av.label("X",{left:l_border+h_fill*0.66, top:t_border+3*v_fill+xxl+xl+l+xl/3-40});

  av.g.rect(l_border+h_fill, t_border, width, l);
  av.g.rect(l_border+h_fill+gap, t_border+gap, width-2*gap, l-2*gap);

  av.label("1:",{left:l_border+h_fill-20, top:t_border-15});
  av.label("S'  → S_", {left:l_border+h_fill+15, top:t_border-5});
  av.g.rect(l_border+h_fill, t_border+2*v_fill+xl+l, width, l);
  av.g.rect(l_border+h_fill+gap, t_border+2*v_fill+xl+l+gap, width-2*gap, l-2*gap);
  av.label("S  → dd_X", {left:l_border+h_fill+15, top:t_border+xl+l+2*v_fill-5});
  av.label("4:",{left:l_border+h_fill-20, top:t_border+2*v_fill+xl+l-15});

  av.g.rect(l_border+h_fill, t_border+3*v_fill+xl+l+xxl, width, l);
  av.g.rect(l_border+h_fill+gap, t_border+3*v_fill+xl+l+xxl+gap, width-2*gap, l-2*gap);
  av.label("X  → aX_", {left:l_border+h_fill+15, top:t_border+xxl+xl+l+3*v_fill-5});
  av.label("6:",{left:l_border+h_fill-20, top:t_border+3*v_fill+xl+l+xxl-15});

  av.displayInit();
  av.recorded();
});
