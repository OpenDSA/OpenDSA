"use strict";

$(document).ready(function () {
  var av_name = "Biopython3";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
  interpret = config.interpreter,       // get the interpreter
  code = config.code;  
  var jsav = new JSAV(av_name);

  var pseudo = jsav.code(code[0]);

  jsav.displayInit();
  jsav.umsg("Store the Sequence of DNA in 5-->3 strand")
  pseudo.setCurrentLine(3);
  var DNA = jsav.label("5 GATCGATGGGCCTATATAGGATCGAAAATCGC  3",{left:20, top:0})
  var arrow1 = jsav.g.line(200, 50, 200, 100,
    {"arrow-end": "classic-wide-long",
     opacity: 100, "stroke-width": 2});
  jsav.step();

  jsav.umsg("Showing substring of  the Sequence between index 4 to 12")
  var DNA1 = jsav.label(" GATGGGCC ",{left:160, top:100})
  var arrow1 = jsav.g.line(200, 150, 200, 200,
    {"arrow-end": "classic-wide-long",
     opacity: 100, "stroke-width": 2})
  pseudo.unhighlight(3);
  pseudo.setCurrentLine(4);
  jsav.step();

  jsav.umsg("Showing substring of the Sequence one base and move 3 steps and show one base until string ended ")
  var DNA2 = jsav.label(" GCTGTAGTAAG ",{left:150, top:200})
  var arrow1 = jsav.g.line(200, 250, 200, 300,
    {"arrow-end": "classic-wide-long",
     opacity: 100, "stroke-width": 2});
  pseudo.unhighlight(4);
  pseudo.setCurrentLine(5);
  jsav.step();
  
  var DNA3 = jsav.label("5 CGCTAAAAGCTAGGATATATCCGGGTAGCTAG  3",{left:20, top:300})
  jsav.umsg("output Which show reverse the previous Sequence")
  var arrow1 = jsav.g.line(200, 350, 200, 400,
    {"arrow-end": "classic-wide-long",
     opacity: 100, "stroke-width": 2});
  pseudo.unhighlight(5);
  pseudo.setCurrentLine(6);
  jsav.step();

  jsav.umsg("the current line will get error because sequence if immutable (Cannot edit) to can change make sequence mutable using the next code line")
  jsav.step();
  jsav.umsg("the current line won't get error because sequence become mutable and index 5 change to C")
  pseudo.unhighlight(9);
  pseudo.setCurrentLine(10);
  jsav.step();

  var DNA4 = jsav.label("5 GCCATCGTAATGGGCCGCTGAAAGGGTGCCCGA  3",{left:20, top:400})
  var arrow1 = jsav.g.line(200, 450, 200, 500,
    {"arrow-end": "classic-wide-long",
     opacity: 100, "stroke-width": 2});
  jsav.umsg("the current line Show sequence after editing")
  pseudo.unhighlight(10);
  pseudo.setCurrentLine(11);
  jsav.step();

  pseudo.unhighlight(11);
  pseudo.setCurrentLine(12);
  jsav.umsg("the current line remove First T base found in the sequence")
  jsav.step();

  jsav.umsg("the current line Show sequence after removing Base")
  pseudo.unhighlight(12);
  pseudo.setCurrentLine(13);
  var DNA5 = jsav.label("5 GCCACGTAATGGGCCGCTGAAAGGGTGCCCGA  3",{left:20, top:500})
 
  jsav.recorded();
});
