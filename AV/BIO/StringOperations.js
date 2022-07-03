"use strict";

$(document).ready(function () {
  var av_name = "StringOperations";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
  interpret = config.interpreter,       // get the interpreter
  code = config.code;  
  var jsav = new JSAV(av_name);

  var pseudo = jsav.code(code[0]);

  jsav.displayInit();
  jsav.umsg("String is contain of array of characters")
  var array=["H","e","l","l","o"," ,","W","o","r","l","d"]
  var string = jsav.ds.array(array, {indexed: false, left: 0, top: 0});
  //var arrow3 = jsav.g.line(20, 150, 50, 200,
   // {"arrow-end": "classic-wide-long",
   //  opacity: 100, "stroke-width": 2});
  pseudo.setCurrentLine(1); 
  jsav.step();
  jsav.umsg("conert all characters to uppercase");
  pseudo.unhighlight(1);
  pseudo.setCurrentLine(2);
  var array1=["H","E","L","L","O"," ,","W","O","R","L","D"]
  var string1 = jsav.ds.array(array1, {indexed: false, left: 0, top: 100});
  jsav.step();
  jsav.umsg("conert all characters to lowercase");
  pseudo.setCurrentLine(3);
  string1.hide();
  var array2=["h","e","l","l","o"," ,","w","o","r","l","d"]
  var string2 = jsav.ds.array(array2, {indexed: false, left: 0, top: 100});
  jsav.step();
  string2.hide();
  var array3=["J","e","l","l","o"," ,","W","o","r","l","d"]
  var string3 = jsav.ds.array(array3, {indexed: false, left: 0, top: 100});
  jsav.umsg("Replace the highligted character (H character) to J character ");
  string.highlight(0)
  pseudo.unhighlight(3);
  pseudo.setCurrentLine(4);

  jsav.step();
  string.unhighlight(0)
  string3.hide();
  var array4=["h","e","l","l","o"]
  var string4 = jsav.ds.array(array4, {indexed: false, left: 0, top: 100});
  var array5=["w","o","r","l","d"]
  var string5 = jsav.ds.array(array5, {indexed: false, left: 0, top: 150});
  jsav.umsg("Seperate the string into 2 strings using , seperator to lowercase");
  pseudo.unhighlight(4);
  pseudo.setCurrentLine(5);
  jsav.recorded();
});
