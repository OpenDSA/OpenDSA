(function() {
  var av = new JSAV("mineAssigned");
	  av.label("...", {left: 450, top: 93});
  av.label("A", {left: 405, top: 4});
  av.label("a\u2081", {left: 280, top: 93});
        av.label("a\u2082", {left: 345, top: 93});
        av.label("a\u2083", {left: 410, top: 93});
        av.label("a\u2099", {left: 490, top: 93});

  av.g.circle(410, 28, 17);
  av.g.circle(285, 120, 17);
  av.g.circle(350, 120, 17);
  av.g.circle(415, 120, 17);
  av.g.circle(495, 120, 17);
  	av.g.line(410,45, 285,103);
	av.g.line(410,45, 350,103); 
	av.g.line(410,45,415,103); 
	av.g.line(410,45,495,103);


  av.displayInit();
}());

