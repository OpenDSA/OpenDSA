$(document).ready(function() {
  "use strict";
  var av = new JSAV("FibGraphCON");

  var len = 60;
  var x = 35;
  var bx = 30;
  var hx = 60;
  var fib = [1, 1, 2, 3, 5, 8, 13, 21, 34]
  var offset = 175;

  av.g.rect(offset + 20, 20, 60, 50);
  av.g.rect(offset + 20, 5, 60, 15);
  bx = bx + 50;
  av.label("7",
           {top:  -13, left: offset +45});

  var index = "";
  for (var i = 0; i < 6; i++)
  {
    index = 6 - i;
    // TOP
    av.g.rect(offset+ bx, 20, 60, 50);
    // BOTTOM
    av.g.rect(offset + bx, 5, 60, 15);

    av.label(index,
             {top:  -13, left: offset+ bx+25});
    bx = bx + 60;
  }

  var lf = 0;
  var p1 = 155 + offset;
  var p2 = 65 + offset;
  av.g.path("M 330 55 A 150 200 0 0 1 240 55",{"arrow-start": "classic-wide-long"});
  for (var i = 0; i < 7; i++)
  {
    av.g.rect(offset +x, 30, 30, 15,{"fill": "blue"});
    av.g.rect(offset + x, 45, 30, 15, {"fill": "red"});
    if(i < 5)
      av.g.line(offset + x +30 , 45 ,offset+ x + 58,45, {"arrow-end": "classic-wide-long"});
    x = x + len;

    var l = av.label(7-i,
                     {top:  12, left: offset + lf + 45}).css({"color": "white", "z-index": 1000});
    l.show();
    // formatting numbers
    if (fib[6-i] > 10) {
      var lab1 = av.label(fib[6 - i],
                          {top: 28, left: offset+ lf + 43}).css({"color": "white", "z-index": 1000});
      lab1.show();
    }
    else {
      var lab2 = av.label(fib[6 - i],
                          {top: 28, left: offset + lf + 45}).css({"color": "white", "z-index": 1000});
      lab2.show();
    }

    lf = lf + 60;
    // set up param for path
    var pathParam = "M ";
    p1 = p1 + 60;
    pathParam += p1.toString();
    var p = " 55 A 150 200 0 0 1 ";
    pathParam += p;
    p2 = p2 + 60;
    pathParam += p2.toString();
    pathParam += " 55";
    // Double curved arrow
    if(i < 4)
      av.g.path(pathParam,{"arrow-start": "classic-wide-long"} );
  }
  av.displayInit();
  av.recorded();
});
