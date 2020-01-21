/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "LazyLists8CON"; // Illustrate and develop the is.map function
    var av = new JSAV(av_name);
    var code = ODSA.UTILS.loadConfig({av_name: av_name}).code;
    var pseudo = av.code(code[0]).show();

    var leftMargin = 10;
//    var offset_for_each_var = 70;
     var offset_for_each_var = 50;
//     var offset_between_var_label_and_cell = 20;

    var arr = av.ds.array([2, "thunk to expose ints after 2"], {indexed: false, left: leftMargin, top: 20});
    var arr_label = av.label("Initially sieve is given", {left: leftMargin, top: 0});
//    var arr1 = av.ds.array([2,"thunk to recursively sift multiples" ], {indexed: false, left: leftMargin, top: 20 + offset_for_each_var}).hide();
    var arr1 = av.ds.array([2,"thunk to sift multiples of ..." ], {indexed: false, left: leftMargin, top: 20 + offset_for_each_var}).hide();
    var arr_label1 = av.label("Cons 2 onto the rest of the primes", {left: leftMargin, top: 0 + offset_for_each_var}).hide();
    var arr2 = av.ds.array([ 2, 3, 5, 7, 9, 11, 13, 15, 17, 19 ], {indexed: false, left: leftMargin, top: 20 + 2 * offset_for_each_var}).hide();
   var arr_label2 = av.label("Initial attempt produces ...  ", {left: leftMargin, top: 0 + 2 * offset_for_each_var}).hide();
    var arr3 = av.ds.array([ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 ], {indexed: false, left: leftMargin, top: 20 + 3 * offset_for_each_var}).hide();
    var arr_label3 = av.label("The correct version produces ...", {left: leftMargin, top: 0 + 3 * offset_for_each_var}).hide();
//     var arr4 = av.ds.array([3,4,5,6,7,8], {indexed: false, left: leftMargin, top: 20 + 4 * offset_for_each_var}).hide();
//     var arr_label4 = av.label("s3", {left: leftMargin, top: 0 + 4 * offset_for_each_var}).hide();

    
    // Slide 1
    av.umsg("Our sieve function is given all the integers starting at 2.");
    pseudo.hide([2,6,7]);
    pseudo.highlight([11,12]);
    arr.addClass(1,"wider");
    av.displayInit();

    av.umsg('In our implementation, the sieve method retains 2 but we must "lazily" sift out all multiples in the thunk that follows it.');
    arr1.show();
    arr_label1.show();
    arr1.addClass(1,"wider");
    pseudo.unhighlight([11,12]);
    pseudo.highlight([3,4,5,8]);
    av.step();

    av.umsg('We can use the is.filter function in conjunction with a sift function that tests for divisibility by the head of the sequence sieve is given.  The code highlighted in blue indicates what happens.   What has gone wrong?');
    pseudo.unhighlight([3,4,5,8]);
    pseudo.show(2);
    pseudo.highlight(2);
    pseudo.hide(5);
    pseudo.show(6);
    pseudo.addClass(6,"initialattempt");
    arr2.show();
    arr_label2.show();
    arr2.addClass([0,1,2,3,4,5,6,7,8,9], "narrow");
    arr2.addClass([0,1,2,3,4,5,6,7,8,9], "initialattempt");
    av.step();

    av.umsg("The code highlighted in red is what we need.   Our initial attempt had forgotten to embed a recursive call to sieve in the thunk and thus only sifted multiples of 2, but not multiples of primes that follow 2.   Remember: if you're not embedding a recursive call inside the thunk, chances are your lazy list code won't work.");
    pseudo.show(7);
    pseudo.addClass(7,"correctversion");
    pseudo.addClass(6,"st");
    arr3.show();
    arr_label3.show();
    arr3.addClass([0,1,2,3,4,5,6,7,8,9], "narrow");
    arr3.addClass([0,1,2,3,4,5,6,7,8,9], "correctversion");
    av.step();
    
    av.recorded();
});
