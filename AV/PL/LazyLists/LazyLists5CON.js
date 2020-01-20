/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "LazyLists5CON"; // Illustrate and develop the is.map function
    var av = new JSAV(av_name);
    var code = ODSA.UTILS.loadConfig({av_name: av_name}).code;
    var pseudo = av.code(code[0]).show();

    var leftMargin = 10;
    var offset_for_each_var = 50;
//     var offset_between_var_label_and_cell = 20;

    var arrValues = [1,"Thunk to expose integers after 1"];
    var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: 20});
    var arr_label = av.label("intsFrom1", {left: leftMargin, top: 0});
    var arr1 = av.ds.array([12,"Thunk to expose integers after 12"], {indexed: false, left: leftMargin, top: 20 + offset_for_each_var}).hide();
    var arr_label1 = av.label("evens12", {left: leftMargin, top: 0 + offset_for_each_var}).hide();
    var arr2 = av.ds.array([12,14,16,18,20,22], {indexed: false, left: leftMargin, top: 20 + 2 * offset_for_each_var}).hide();
   var arr_label2 = av.label("first6", {left: leftMargin, top: 0 + 2 * offset_for_each_var}).hide();
//     var arr3 = av.ds.array([3,"Thunk to expose integers after 3"], {indexed: false, left: leftMargin, top: 20 + 3 * offset_for_each_var}).hide();
//     var arr_label3 = av.label("s2", {left: leftMargin, top: 0 + 3 * offset_for_each_var}).hide();
//     var arr4 = av.ds.array([3,4,5,6,7,8], {indexed: false, left: leftMargin, top: 20 + 4 * offset_for_each_var}).hide();
//     var arr_label4 = av.label("s3", {left: leftMargin, top: 0 + 4 * offset_for_each_var}).hide();
    
    // Slide 1
    av.umsg("The is.drop function takes an infinite sequence and returns a new sequence with the first n elements removed.  Note that what is returned is still an infinite sequence since we have only removed a finite number.   This is illustrated by the call to is.drop below, which returns a sequence of the even integers starting with 12.  is.drop returns an infinite sequence, which is always an integer followed by a thunk.   Contrast that with is.take, which returns a finite list, as illustrated by first6.");
    arr.addClass(1,"wider");
    arr1.addClass(1,"wider");
    arr1.show();
    arr_label1.show();
    arr2.show();
    arr_label2.show();
    pseudo.hide([6,9]);
    pseudo.highlight([13,14,15,16,17,18,19,20]);
    av.displayInit();

    //S 2
    av.umsg("To implement the drop function, first consider the case highlighted below in which the number of items to drop is zero.");
    pseudo.unhighlight([13,14,15,16,17,18,19,20]);
    pseudo.highlight([5]);
    av.step();

    // S 3
    av.umsg('This case is easy and represents the base case for the recursion on n.  We just need to return the sequence that we are given in unaltered form.');
    pseudo.unhighlight(5);
    pseudo.hide(5);
    pseudo.show(6);
    pseudo.highlight(6);
    av.step();

    // S 4
    av.umsg("Note that the recursion here is being controlled by the finite number n, not by the infinite sequence seq.   This is different from what we have seen in is.map and is.filter where the recursion had to occur inside a thunk.  Keep this in mind as you try to predict how the question marks below will be completed in the next slide.");
    pseudo.unhighlight(6);
    pseudo.highlight(8);
    av.step();

    // S 5
    av.umsg("Because the recursion is being controlled by n, we must reduce that argument on the recursive call to ensure we reach the base case.  At the same time, we throw away the head of the sequence at this level and pass in the (thawed) thunk that is the tail of the sequence.");
    pseudo.unhighlight(8);
    pseudo.hide(8);
    pseudo.show(9);
    pseudo.highlight(9);
    av.step();


    
    av.recorded();
});
