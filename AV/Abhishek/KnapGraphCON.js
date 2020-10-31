// Written by Abhishek Jha and Cliff Shaffer, Fall 2020
$(document).ready(function() {
  "use strict";
  var av = new JSAV("KnapGraphCON");
  
  var numRows = 5;
  var numCol = 11;

  var len = 60;
  var x = 95;
  var bx = 30;
  var by = 30;
  var hx = 30;
  var fib = [1, 1, 2, 3, 5, 8, 13, 21, 34]
  var imgx = 635;
  var offset = 80;

  var lblx = 40;

  var flag1 = 0;
  var flag2 = 0;
  var flag3 = 0;
  var flag4 = 0;
  var flag5 = 0;

  av.label("$k_0 = 9$", {left: 40, top: 15});
  av.label("$k_1 = 2$", {left: 40, top: 75});
  av.label("$k_2 = 7$", {left: 40, top: 135});
  av.label("$k_3 = 4$", {left: 40, top: 195});
  av.label("$k_4 = 1$", {left: 40, top: 255});

  av.g.rect(offset + 20, 20, 60, 50);
  av.g.rect(offset + 20, 5, 60, 15);
  bx = bx + 50;
  av.label("0",
           {top:  -13, left: offset +45});

  av.g.rect(offset + 35, 30, 35, 15,{"fill": "blue"});
  av.g.rect(offset + 35, 45, 35, 15, {"fill": "red"});

  var index = "";
  for (var i = 1; i < numCol; i++)
  {
    index = i;
    // TOP
    av.g.rect(offset+ bx, 20, 60, 50);
    // BOTTOM
    av.g.rect(offset + bx, 5, 60, 15);

    av.label(index,
             {top:  -13, left: offset+ bx+25});
    bx = bx + 60;
    av.g.rect(offset + x, 30, 35, 15,{"fill": "blue"});
    av.g.rect(offset + x, 45, 35, 15, {"fill": "red"});

    x = x + 60;
  }

  for (var i = 1; i < numRows; i++)
  {
    index = i;

    for (var j = 1; j < numCol + 1; j++)
    {

      av.g.rect(offset + hx - 10, 40 + by, 60, 60);
      hx = hx + 60;


      if (j == 1)
      {
        av.g.rect(offset + imgx, 30 + by + 25, 35, 15,{"fill": "blue"});
        av.g.rect(offset + imgx, 45 + by + 25, 35, 15, {"fill": "red"});

      }
      else if (j == 2 && flag1 < 3)
      {
        av.g.rect(offset + 575, 30 + by + 25, 35, 15,{"fill": "blue"});
        av.g.rect(offset + 575, 45 + by + 25, 35, 15, {"fill": "red"});
        flag1 = flag1 + 1;
      }
      else if (j == 3 && flag2 < 2)
      {
        av.g.rect(offset + 575 - 180, 30 + by + 25, 35, 15,{"fill": "blue"});
        av.g.rect(offset + 575 - 180, 45 + by + 25, 35, 15, {"fill": "red"});
        flag2 = flag2 + 1;
      }
      else if (j == 4 && flag3 < 2)
      {
        av.g.rect(offset + 575 - 240, 30 + by + 25, 35, 15,{"fill": "blue"});
        av.g.rect(offset + 575 - 240, 45 + by + 25, 35, 15, {"fill": "red"});
        flag3 = flag3 + 1;
      }
      else if (j == 5 && flag4 < 1)
      {
        av.g.rect(offset + 575 - 360, 30 + by + 25, 35, 15,{"fill": "blue"});
        av.g.rect(offset + 575 - 360, 45 + by + 25, 35, 15, {"fill": "red"});
        flag4 = flag4 + 1;
      }
      else if (j == 6 && flag5 < 1)
      {
        av.g.rect(offset + 575 - 420, 30 + by + 25, 35, 15,{"fill": "blue"});
        av.g.rect(offset + 575 - 420, 45 + by + 25, 35, 15, {"fill": "red"});
        flag5 = flag5 + 1;
      }

    }
    hx = 30;
    // av.label(index,
    //     {top:  -13, left: offset+ bx+25});
    by = by + 60;

  }

  for (var j = 1; j < numCol + 1; j++)
  {
    if (j > 10) {
      av.label("0," + (j - 1),
               {top:  12, left: offset + lblx}).css({"color": "white", "z-index": 1000});
    }
    else {
      av.label("0," + (j - 1),
               {top:  12, left: offset + lblx + 3}).css({"color": "white", "z-index": 1000});
    }
    if (j == 1 || j == 10)
    {
      av.label((j-1),
               {top:  27, left: offset + lblx + 8}).css({"color": "white", "z-index": 1000});

    }
    else{
      av.label("-",
               {top:  27, left: offset + lblx + 10}).css({"color": "white", "z-index": 1000});
    }

    lblx = lblx + 60;
  }
  lblx = 40;
  for (var j = 1; j < numCol + 1; j++)
  {
    if(j == 1 || j == 2 || j == 5 || j == 8 || j == 9 )
    {
      lblx = lblx + 60;
      continue;
    }
    if (j > 10) {
      av.label("1," + (j - 1),
               {top:  67, left: offset + lblx}).css({"color": "white", "z-index": 1000});
    }
    else {
      av.label("1," + (j - 1),
               {top:  67, left: offset + lblx + 3}).css({"color": "white", "z-index": 1000});
    }
    if (j == 3 || j == 10)
    {
      av.label((j-1),
               {top:  82, left: offset + lblx + 8}).css({"color": "white", "z-index": 1000});

    }
    else{
      av.label("-",
               {top:  82, left: offset + lblx + 10}).css({"color": "white", "z-index": 1000});
    }

    lblx = lblx + 60;
  }
  lblx = 40;
  for (var j = 1; j < numCol + 1; j++)
  {
    if(j < 6 || j == 8 || j == 9)
    {
      lblx = lblx + 60;
      continue;
    }
    if (j > 10) {
      av.label("2," + (j - 1),
               {top:  67 + 60, left: offset + lblx}).css({"color": "white", "z-index": 1000});
    }
    else {
      av.label("2," + (j - 1),
               {top:  67 + 60, left: offset + lblx + 3}).css({"color": "white", "z-index": 1000});
    }
    if (j == 3 || j == 10)
    {
      av.label((j-1),
               {top:  82 + 60, left: offset + lblx + 8}).css({"color": "white", "z-index": 1000});

    }
    else{
      av.label("-",
               {top:  82 + 60, left: offset + lblx + 10}).css({"color": "white", "z-index": 1000});
    }

    lblx = lblx + 60;
  }

  av.label("3,9",
           {top:  142 + 45, left: offset + 575 + 8}).css({"color": "white", "z-index": 1000});
  av.label("9",
           {top:  142 + 60, left: offset + 575 + 15}).css({"color": "white", "z-index": 1000});

  av.label("3,10",
           {top:  142 + 45, left: offset + 575 + 65}).css({"color": "white", "z-index": 1000});
  av.label("-",
           {top:  142 + 60, left: offset + 575 + 75}).css({"color": "white", "z-index": 1000});

  av.label("4,10",
           {top:  142 + 45 + 60, left: offset + 575 + 65}).css({"color": "white", "z-index": 1000});
  av.label("-",
           {top:  142 + 60 + 60, left: offset + 575 + 75}).css({"color": "white", "z-index": 1000});

  var lf = 0;
  var lx = 30;
  for(i = 0; i < numRows - 2; i++)
  {
    av.g.line(offset + 653 , 265 + lf , offset+ 653, 237 + lf, {"arrow-end": "classic-wide-long"});
    lf = lf  - 60;
  }
  for(i = 0; i < numCol - 2; i++)
  {
    if(i == 2 || i == 5 || i == 6)
    {
      lx = lx + 60;
      continue;
    }
    av.g.line(offset + lx + 143, 85 , offset + lx +  143 , 63, {"arrow-end": "classic-wide-long"});
    lx = lx + 60;
  }

  av.g.line(offset + 353, 145 , offset + 353 , 118, {"arrow-end": "classic-wide-long"});
  av.g.line(offset + 413, 145 , offset + 413 , 118, {"arrow-end": "classic-wide-long"});
  av.g.line(offset + 593, 145 , offset + 593 , 118, {"arrow-end": "classic-wide-long"});
  av.g.line(offset + 593, 205 , offset + 593 , 178, {"arrow-end": "classic-wide-long"});

  av.g.line(offset + 635 , 265 , offset + 612 , 237, {"arrow-end": "classic-wide-long"});

  av.g.path("M 655 229 A 300 200 0 0 1 430 177",{"arrow-end": "classic-wide-long"});

  av.g.path("M 715 210 A 300 200 0 0 0 513 160",{"arrow-end": "classic-wide-long"});

  // av.g.path("M 715 174 A 300 200 0 0 1 323 117",{"arrow-end": "classic-wide-long"});

  av.g.path("M 715 154 A 300 200 0 0 0 333 97",{"arrow-end": "classic-wide-long"});

  av.g.path("M 655 174 A 300 200 0 0 1 263 117",{"arrow-end": "classic-wide-long"});

  // av.g.path("M 655 174 A 300 200 0 0 1 263 117",{"arrow-end": "classic-wide-long"});



  lx = 0;
  for(i = 0; i < numCol - 2 ; i++) {
    if (i == 2 || i == 5 || i == 6)
    {
      lx = lx + 60;
      continue;
    }
    av.g.line(offset + lx + 155, 98 , offset + lx + 73 , 58, {"arrow-end": "classic-wide-long"});
    lx = lx + 60;
  }


  av.displayInit();
  av.recorded();
});
