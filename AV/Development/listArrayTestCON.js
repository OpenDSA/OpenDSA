// Walk-through for class variables
(function ($) {
  var jsav = new JSAV("AlistTestCON1");	
  pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/AList.pde",
                        startAfter: "/* *** ODSATag: AListVars *** */",
                        endBefore: "/* *** ODSAendTag: AListVars *** */"});
  jsav.umsg("The private portion of class <code>AList</code> contains the data members for the array-based list.");
  jsav.displayInit();
  pseudo.setCurrentLine(5);
  jsav.umsg("These include <code>listArray</code>, the array which holds the list elements. Because <code>listArray</code> must be allocated at some fixed size, the size of the array must be known when the list object is created.");
  jsav.step(); 
  pseudo.unhighlight(5);
  pseudo.setCurrentLine(1);
  jsav.umsg("Note that an optional parameter is declared for the <code>AList</code> constructor. With this parameter, the user can indicate the maximum number of elements permitted in the list. If no parameter is given, then it takes the value <code>defaultSize</code>, which is assumed to be a suitably defined constant value.");
  jsav.step();
  pseudo.unhighlight(1);
  pseudo.setCurrentLine(2);
  jsav.umsg("Because each list can have a differently sized array, each list must remember its maximum permitted size. Data member <code>maxSize</code> serves this purpose.");
  jsav.step();
  pseudo.unhighlight(2);
  pseudo.setCurrentLine(3);
  jsav.umsg("At any given time the list actually holds some number of elements that can be less than the maximum allowed by the array. This value is stored in <code>listSize</code>.");
  jsav.step();
  pseudo.unhighlight(3);
  pseudo.setCurrentLine(4);
  jsav.umsg("Data member <code>curr</code> stores the current position.");
  jsav.step();
  pseudo.unhighlight(4);
  jsav.umsg("Because <code>listArray</code>, <code>maxSize</code>, <code>listSize</code>, and <code>curr</code> are all declared to be <code>private</code>, they may only be accessed by methods of Class <code>AList</code>.");
  jsav.recorded();
}(jQuery));
