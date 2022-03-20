$(document).ready(function () {
  "use strict";

  var av_name = "TMExtensionFS";
  var av = new JSAV(av_name);

  
  av.umsg("<b>9.2.1.6. Turing Machine Extensions</b> <br><br> When we give extensions or new functionality to a computing system, sometimes they change something fundamental about the capabilities of the system. For example, when we add non-determinism to an algorithm, we <b>might</b> change the cost of the underlying problem from exponential to polynomial time. But, other changes do nothing fundamental. In terms of Turing machines, our concern is what the machine can do, rather than how long it takes to do it. Does non-determinism help us to solve the Halting problem? No. Likewise, the following extensions do not increase the power of Turing Machines.");
  av.displayInit();

  //frame 27
  av.umsg("&bull; <b><i>Limit the tape to be infinite in only one direction</i></b> <br><br> Our first example actually demonstrates that some limitations do not make a difference. Many textbooks on formal languages present the basic Turing Machine as having a tape that is infinite in only one direction. The folling diagram shows that we can easily simulate a tape infinite in two directions with a one-direction infinite tape. <br><br><br><br><br><br><br><br> The idea is to just bend the 2-way infinite tape in the middle, and store both directions of the tape into a single cell. This requires a greatly expanded alphabet, because we now need to be able to represent any combination of two characters. This will need more states, and probably more time. But it does not allow anything new in terms of capability.");
  var ytop = 80;
  var cellwidth = 20;
  var xleft = 20;
  var i;
  var clearlist1 = new Array();

  clearlist1.push(av.g.line(xleft, ytop, xleft + 7 *cellwidth, ytop,
            {"stroke-width": 2}));

  clearlist1.push(av.g.line(xleft, ytop + cellwidth,
            xleft + 7 *cellwidth, ytop + cellwidth,
            {"stroke-width": 2}));

  for (i = 1; i < 7; i++) {
    var k = av.g.line(xleft + i * cellwidth, ytop, xleft + i * cellwidth, ytop + 1 * cellwidth, {"stroke-width": 2});
    clearlist1.push(k);
  }

  clearlist1.push(av.label("-2", {top: ytop + 5, left: xleft + 3 + cellwidth * 1}));
  clearlist1.push(av.label("-1", {top: ytop + 5, left: xleft + 3 + cellwidth * 2}));
  clearlist1.push(av.label("0",  {top: ytop + 5, left: xleft + 7 + cellwidth * 3}));
  clearlist1.push(av.label("1",  {top: ytop + 5, left: xleft + 7 + cellwidth * 4}));
  clearlist1.push(av.label("2",  {top: ytop + 5, left: xleft + 7 + cellwidth * 5}));

  clearlist1.push(av.label("$a$", {top: ytop - 15, left: xleft + 6 + cellwidth}));
  clearlist1.push(av.label("$b$", {top: ytop - 15, left: xleft + 6 + cellwidth * 2}));
  clearlist1.push(av.label("$c$", {top: ytop - 15, left: xleft + 6 + cellwidth * 3}));
  clearlist1.push(av.label("$d$", {top: ytop - 15, left: xleft + 6 + cellwidth * 4}));
  clearlist1.push(av.label("$e$", {top: ytop - 15, left: xleft + 6 + cellwidth * 5}));

  clearlist1.push(av.g.polyline([[xleft + 165, ytop], [xleft + 155, ytop + 10],
                 [xleft + 165, ytop + 20]], {"stroke-width": 2}));
  clearlist1.push(av.g.line(xleft + 160, ytop + 5, xleft + 180, ytop + 5,
            {"stroke-width": 2}));
  clearlist1.push(av.g.line(xleft + 160, ytop + 15, xleft + 180, ytop + 15,
            {"stroke-width": 2}));
  clearlist1.push(av.g.polyline([[xleft + 175, ytop], [xleft + 185, ytop + 10],
                 [xleft + 175, ytop + 20]], {"stroke-width": 2}));

  clearlist1.push(av.g.line(xleft + 210, ytop - 10, xleft + 210 + 5 *cellwidth, ytop - 10,
            {"stroke-width": 2}));
  clearlist1.push(av.g.line(xleft + 210 + cellwidth, ytop + 10,
            xleft + 210 + 5 *cellwidth, ytop + 10,
            {"stroke-width": 2}));
  clearlist1.push(av.g.line(xleft + 210, ytop + 30, xleft + 210 + 5 *cellwidth, ytop + 30,
            {"stroke-width": 2}));

  for (i = 0; i < 5; i++) {
    var linetemp1 = av.g.line(xleft + 210 + i * cellwidth, ytop - 10,
              xleft + 210 + i * cellwidth, ytop + 30,
              {"stroke-width": 2});
    clearlist1.push(linetemp1);
  }

  clearlist1.push(av.label("$\\$$", {top: ytop - 15, left: xleft + 215}));
  clearlist1.push(av.label("$b$", {top: ytop - 5, left: xleft + 235}));
  clearlist1.push(av.label("$a$", {top: ytop - 5, left: xleft + 255}));
  clearlist1.push(av.label("$c$", {top: ytop - 25, left: xleft + 235}));
  clearlist1.push(av.label("$d$", {top: ytop - 25, left: xleft + 255}));
  clearlist1.push(av.label("$e$", {top: ytop - 25, left: xleft + 275}));

  clearlist1.push(av.label("0", {top: ytop - 44, left: xleft + 235}));
  clearlist1.push(av.label("1", {top: ytop - 44, left: xleft + 255}));
  clearlist1.push(av.label("2", {top: ytop - 44, left: xleft + 275}));
  clearlist1.push(av.label("-1", {top: ytop + 17, left: xleft + 232}));
  clearlist1.push(av.label("-2", {top: ytop + 17, left: xleft + 252}));
  clearlist1.push(av.label("-3", {top: ytop + 17, left: xleft + 272}));
  av.step();


  //frame 28
  for (var j = 0; j < clearlist1.length; j++){
    clearlist1[j].hide();
  }
  xleft = 200;
  ytop = 50;
  clearlist1 = [];

  av.umsg("&bull; <i><b>Multiple tapes (each with its own head)</i></b> <br><br> Again, we can simulate this with encoding multiple symbols into a single table cell. For example, to simulate two tapes (each with a head), we encode in each cell the corresponding two symbols, and two binary markers to indicate if the tape head is currently in the corresponding cell of the two tapes.<br><br><br><br><br><br><br><br><br> &bull; <i><b>Multiple heads on one tape</i></b> <br><br> This is easier than encoding multiple tapes. We merely encode the heads onto the tape, and simulate moving them around.");

  for (i = 0; i < 5; i++) {
    clearlist1.push(av.g.line(xleft + cellwidth, ytop + i * cellwidth,
              xleft + 5 * cellwidth, ytop + i * cellwidth,
              {"stroke-width": 2}));
    clearlist1.push(av.g.line(xleft + i * cellwidth, ytop,
              xleft + i * cellwidth, ytop + 4 * cellwidth,
              {"stroke-width": 2}));
  }
  clearlist1.push(av.g.line(xleft, ytop, xleft + cellwidth, ytop,
            {"stroke-width": 2}));
  clearlist1.push(av.g.line(xleft, ytop + 4 * cellwidth,
            xleft + cellwidth, ytop + 4 * cellwidth,
            {"stroke-width": 2}));

  clearlist1.push(av.label("Single tape:", {top: ytop + 5, left: xleft - 100}));
  clearlist1.push(av.label("Each column is one cell", {top: ytop + 25, left: xleft - 187}));
  clearlist1.push(av.label("$\\$$", {top: ytop + 16, left: xleft + 5}));
  clearlist1.push(av.label("$a$", {top: ytop - 13, left: xleft + 5 + cellwidth}));
  clearlist1.push(av.label("$b$", {top: ytop - 13, left: xleft + 5 + cellwidth * 2}));
  clearlist1.push(av.label("$\\#$", {top: ytop - 13, left: xleft + 5 + cellwidth * 3}));

  clearlist1.push(av.label("$1$", {top: ytop - 13 + cellwidth, left: xleft + 5 + cellwidth}));
  clearlist1.push(av.label("$1$", {top: ytop - 13 + 3 * cellwidth,
                   left: xleft + 5 + 2 * cellwidth}));

  clearlist1.push(av.label("$a$", {top: ytop - 13 + 2 * cellwidth,
                   left: xleft + 5 + cellwidth}));
  clearlist1.push(av.label("$a$", {top: ytop - 13 + 2 * cellwidth,
                   left: xleft + 5 + cellwidth * 2}));
  clearlist1.push(av.label("$\\#$", {top: ytop - 13 + 2 * cellwidth,
                     left: xleft + 5 + cellwidth * 3}));

  clearlist1.push(av.label("$0$", {top: ytop - 13 + cellwidth * 4,
                   left: xleft + 5 + 1 * cellwidth}));
  clearlist1.push(av.label("$1$", {top: ytop - 13 + cellwidth * 4,
                   left: xleft + 5 + 2 * cellwidth}));
  clearlist1.push(av.label("$2$", {top: ytop - 13 + cellwidth * 4,
                   left: xleft + 5 + 3 * cellwidth}));
  clearlist1.push(av.label("$3$", {top: ytop - 13 + cellwidth * 4,
                   left: xleft + 5 + 4 * cellwidth}));
  clearlist1.push(av.label("(Tape 1 contents)",
           {top: ytop - 13 + cellwidth * 0, left: xleft + 5 + 5 * cellwidth}));
  clearlist1.push(av.label("(Tape 1 head location)",
           {top: ytop - 13 + cellwidth * 1, left: xleft + 5 + 5 * cellwidth}));
  clearlist1.push(av.label("(Tape 2 contents)",
           {top: ytop - 13 + cellwidth * 2, left: xleft + 5 + 5 * cellwidth}));
  clearlist1.push(av.label("(Tape 2 head location)",
           {top: ytop - 13 + cellwidth * 3, left: xleft + 5 + 5 * cellwidth}));
  clearlist1.push(av.label("(Cell numbering from original multi-tapes)",
           {top: ytop - 13 + cellwidth * 4, left: xleft + 5 + 5 * cellwidth}));


  av.step();


  //frame 29
  for (var j = 0; j < clearlist1.length; j++){
    clearlist1[j].hide();
  }
  xleft = 50;
  ytop = 30;
  for (i = 0; i < 5; i++) {
    av.g.line(xleft, ytop + i * cellwidth,
              xleft + 5 * cellwidth, ytop + i * cellwidth,
              {"stroke-width": 2});
    av.g.line(xleft + i * cellwidth, ytop,
              xleft + i * cellwidth, ytop + 5 * cellwidth,
              {"stroke-width": 2});
    av.g.line(xleft + (i + 1) * cellwidth, ytop,
              xleft, ytop + (i + 1) * cellwidth,
              {"stroke-width": 1, "arrow-end":"classic-wide-long"});
  }
  av.umsg("&bull; <i><b>A two-dimensional \"tape\"</b></i> <br><br> All that we need to do is find a mapping from 2D to 1D, which is fairly easy. One approach is to work in diagonals, in the order (0, 0), (0, 1), (1, 0), (0, 2), (1, 1), (2, 0), and so on. <br><br><br><br><br><br><br><br><br><br> &bull; <i><b>Non-determinismFormalLanguages2</b></i> <br><br> We can simulate non-deterministic behavior in sequence, doing all length 1 computations, then length 2, etc., until we reach a halt state for one of the non-deterministic choices. So we see that while non-determinism can save a lot of time, it does not change what can (eventually) be done.");

  av.recorded();
});
