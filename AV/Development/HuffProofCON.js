console.log("---------- BEGIN ----------");
"use strict";

var elements = [10, 20, 30, 40, 50];

(function ($) {

 var av = new JSAV("InvalidTree");
 var array = av.ds.tree(elements);

 // av.umsg("This array has 5 elements");
 array.newNode(10);
 av.displayInit();
 av.recorded();

}(jQuery));

 console.log("----------  END  ----------");