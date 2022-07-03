"use strict";

$(document).ready(function () {
  var av_name = "Biopython2";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
  interpret = config.interpreter,       // get the interpreter
  code = config.code;  
  var jsav = new JSAV(av_name);

  var pseudo = jsav.code(code[0]);

  jsav.displayInit();
  jsav.umsg("Store the Sequence of mRNA in 5-->3 strand")
  pseudo.setCurrentLine(3);
  jsav.step();

  jsav.umsg("Showing the Sequence")
  var messenger_rna = jsav.label("5 AUGGCCAUUGUAAUGGGCCGCUGAAAGGGUGCCCGAUAG  3",{left:0, top:0})
  pseudo.unhighlight(3);
  pseudo.setCurrentLine(4);
  jsav.step("");

  jsav.umsg("output Which show Translate the previous mRNA to protein by each 3 bases will translateinto one amino acid ")
  var protein = jsav.label("MAIVMGRWKGA ",{left:150, top:100})
  var arrow1 = jsav.g.line(200, 50, 200, 100,
    {"arrow-end": "classic-wide-long",
     opacity: 100, "stroke-width": 2});
  pseudo.unhighlight(4);
  pseudo.setCurrentLine(5);
  jsav.step();

  jsav.umsg(" the code line Selected the table which contain genetic code  which default (NCBI table id 1) but here used the Vertebrate Mitochondrial Table which id =2 ")

  pseudo.unhighlight(5);
  pseudo.setCurrentLine(6);
  pseudo.setCurrentLine(7);


  jsav.recorded();
});
