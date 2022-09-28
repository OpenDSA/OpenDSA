"use strict";

$(document).ready(function () {
  var av_name = "Biopython1";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
  interpret = config.interpreter,       // get the interpreter
  code = config.code;  
  var jsav = new JSAV(av_name);

  var pseudo = jsav.code(code[0]);

  jsav.displayInit();
  jsav.umsg("Store the Sequence of DNA in 5-->3 strand")
  pseudo.setCurrentLine(3);
  jsav.step();

  jsav.umsg("Showing the Sequence")
  var coding_dna = jsav.label("5 ATGGCCATTGTAATGGGCCGCTGAAAGGGTGCCCGATAG  3",{left:0, top:0})
  pseudo.unhighlight(3);
  pseudo.setCurrentLine(4);
  jsav.step("");

  jsav.umsg("output Which show reverse the previous Sequence to be in 5-->3 Strand and then get the Complementry of Sequence ")
  var template_dna = jsav.label("3 CTATCGGGCACCCTTTCAGCGGCCCATTACAATGGCCAT  5",{left:0, top:100})
  var arrow1 = jsav.g.line(200, 50, 200, 100,
    {"arrow-end": "classic-wide-long",
     opacity: 100, "stroke-width": 2});
  pseudo.unhighlight(4);
  pseudo.setCurrentLine(6);
  jsav.step();

  jsav.umsg(" Output Selected which Convert DNA to mRNA in 5-->3 By get Complemetry of DNA of 3-->5 Strand or in case of DNA Direction 5-->3 (Default Strand) Replace T o U ")
  var messenger_rna= jsav.label("5 AUGGCCAUUGUAAUGGGCCGCUGAAAGGGUGCCCGAUAG  3",{left:0, top:200})
  var arrow2 = jsav.g.line(200, 150, 200, 200,
    {"arrow-end": "classic-wide-long",
     opacity: 100, "stroke-width": 2});
  pseudo.unhighlight(6);
  pseudo.setCurrentLine(8);
  jsav.step();

  jsav.umsg(" Function Selected which Reverse Transcribe mRNA to DNA again  in 5-->3 direction") 
  var DNA = jsav.label("3 ATGGCCATTGTAATGGGCCGCTGAAAGGGTGCCCGATAG  5",{left:0, top:290})
  
  var arrow3 = jsav.g.line(200, 250, 200, 300,
    {"arrow-end": "classic-wide-long",
     opacity: 100, "stroke-width": 2});
  pseudo.unhighlight(8);
  pseudo.setCurrentLine(12);
  jsav.step();

  jsav.recorded();
});
