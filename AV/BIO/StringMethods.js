"use strict";

$(document).ready(function () {
  var av_name = "StringMethods";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
  interpret = config.interpreter,       // get the interpreter
  code = config.code;  
  var jsav = new JSAV(av_name);

  var pseudo = jsav.code(code[0]);

  jsav.displayInit();
  jsav.umsg("String is contain of array of characters")
  var array=["M","i","c","h","e","a","l","","J","a","c","k","s","o","n"]
  var string = jsav.ds.array(array, {indexed: true, left: 0, top: 0});
  //var arrow3 = jsav.g.line(20, 150, 50, 200,
   // {"arrow-end": "classic-wide-long",
   //  opacity: 100, "stroke-width": 2});
  pseudo.setCurrentLine(1); 
  jsav.step();
  var output = jsav.label("output : c",{left:0, top:100})
  string.highlight(2)
  jsav.umsg("select a character from string using positive indexing");
  pseudo.unhighlight(1);
  pseudo.setCurrentLine(2);

  jsav.step();
  jsav.umsg("select a character from string using negative indexing");
  output.value("output : a")
  string.unhighlight(2)
  string.highlight(9)
  pseudo.unhighlight(2);
  pseudo.setCurrentLine(3);
  jsav.step();

  jsav.umsg("error because string is immutable and can't change ");
  output.value(" ")
  pseudo.unhighlight(3);
  pseudo.setCurrentLine(4);
  jsav.step();

  jsav.umsg("show segment of string");
  pseudo.unhighlight(4);
  pseudo.setCurrentLine(5);
  string.highlight([0,1,2,3])
  output.value("output: Mich")

  jsav.step();
  jsav.umsg("show another segment of string");
  pseudo.unhighlight(4);
  pseudo.setCurrentLine(5);
  string.unhighlight([0,1,2,3])
  string.highlight([8,9,10,11])
  output.value("output: Jack")
  jsav.step();
  jsav.umsg("stride output select every second variable");
  pseudo.unhighlight(5);
  pseudo.setCurrentLine(6);
  string.unhighlight([8,9,10,11])
  string.highlight([0,2,4,6,8,10,12,14])

  output.value("output: McelJcsn")

  jsav.step();
  jsav.umsg("stride output select every second variable until specific index(5)-1");
  pseudo.unhighlight(6);
  pseudo.setCurrentLine(7);
  string.unhighlight([6,8,10,12,14])
  output.value("output: Mce")
  jsav.step();

  jsav.umsg("output contain substring from start until specific index(6)-1");
  pseudo.unhighlight(7);
  pseudo.setCurrentLine(8);
  string.highlight([1,3,5])

  output.value("output: Michea")
  jsav.step();
  pseudo.unhighlight(8);
  pseudo.setCurrentLine(9);
  jsav.umsg("output contain substring from specific index(8) until end of string ");
  output.value("output: Jackson")
  string.unhighlight([0,1,2,3,4,5])

  string.highlight([8,9,10,11,12,13,14])

  pseudo.unhighlight(9);

  pseudo.setCurrentLine(10)
  
  jsav.step();
  string.unhighlight([8,9,10,11,12,13,14])

  output.value("")
  jsav.umsg("new 2 strings ");
  var string1 = jsav.label("Hello",{left:0, top:100})
  var string2 = jsav.label("World",{left:50, top:100})
  pseudo.unhighlight(10);
  pseudo.setCurrentLine(11);
  pseudo.highlight(12);
  jsav.step();
  jsav.umsg("Merge 2 strings using + operator ")
  output.value("output: HelloWorld")

  pseudo.unhighlight(11);
  pseudo.unhighlight(12);
  pseudo.setCurrentLine(13);
  pseudo.highlight(14);
  jsav.step();
  string1.hide()
  string2.hide()
  jsav.umsg("Duplicate string using * operator with number of duplicates ")
  output.value("output: HelloWorldHelloWorld")
  pseudo.setCurrentLine(15);
  pseudo.unhighlight(13);
  pseudo.unhighlight(14);

  jsav.recorded();
});
