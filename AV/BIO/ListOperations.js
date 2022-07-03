"use strict";

$(document).ready(function () {
  var av_name = "ListOperations";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
  interpret = config.interpreter,       // get the interpreter
  code = config.code;  
  var jsav = new JSAV(av_name);

  var pseudo = jsav.code(code[0]);

  jsav.displayInit();
  jsav.umsg("list consist of 5 elements")
  var array=["Abc",50,200,"MM",1.5]
  var string = jsav.ds.array(array, {indexed: false, left: 0, top: 0});
  //var arrow3 = jsav.g.line(20, 150, 50, 200,
   // {"arrow-end": "classic-wide-long",
   //  opacity: 100, "stroke-width": 2});
  pseudo.setCurrentLine(1); 
  jsav.step();
  jsav.umsg("show index 4 of list ");
  pseudo.unhighlight(1);
  pseudo.setCurrentLine(2);
  var array1=[1.5]
  var string1 = jsav.ds.array(array1, {indexed: false, left: 0, top: 100});
  jsav.step();
  jsav.umsg("change first and second index");
  string.highlight([0,1])
  pseudo.setCurrentLine(3);
  pseudo.highlight(4);
  string1.hide();
  var array2=["Omar",200,200,"MM",1.5]
  var string2 = jsav.ds.array(array2, {indexed: false, left: 0, top: 100});

  jsav.step();
  string.unhighlight([0,1])
  string2.hide();
  var array3=["Abc",50,200,"Osama"]
  var string3 = jsav.ds.array(array3, {indexed: false, left: 0, top: 100});
  jsav.umsg("Replace the 2 values into one value ");
  string.highlight([3,4])
  pseudo.unhighlight(3);
  pseudo.unhighlight(4);
  pseudo.highlight(5);
  pseudo.highlight(6);
  jsav.step();
  string.unhighlight([3,4])
  jsav.umsg("initialize another list ");
  string3.hide();
  var array4=["ooo",20]
  var string4 = jsav.ds.array(array4, {indexed: false, left: 0, top: 100});
  pseudo.unhighlight(5);
  pseudo.unhighlight(6);
  pseudo.highlight(7);

  jsav.step();

  jsav.umsg("this method that add the list 2 values to list 1 ");
  string4.hide();
  var array5=["Omar",200,200,"MM",1.5,"ooo",20]
  var string5 = jsav.ds.array(array5, {indexed: false, left: 0, top: 150});
  pseudo.unhighlight(7);
  pseudo.highlight(8);
  jsav.step();

  jsav.umsg("this method that remove index number 5 the list 1 ");
  string5.hide();
  var array6=["Omar",200,200,"MM",1.5,20]
  var string6 = jsav.ds.array(array6, {indexed: false, left: 0, top: 150});
  pseudo.unhighlight(8);
  pseudo.highlight(9);
  pseudo.highlight(10);
  jsav.step();

  jsav.umsg("this method that remove all items from list ");
  string6.hide();
  var array7=[" "]
  var string7= jsav.ds.array(array7, {indexed: false, left: 0, top: 150});
  pseudo.unhighlight(9);
  pseudo.unhighlight(10);
  pseudo.highlight(11);




  jsav.recorded();
});
