/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "LazyLists4CON"; // Illustrate and develop the is.map function
    var av = new JSAV(av_name);
    var code = ODSA.UTILS.loadConfig({av_name: av_name}).code;
    var pseudo = av.code(code[0]).show();

    var leftMargin = 10;
    var offset_for_each_var = 50;
//     var offset_between_var_label_and_cell = 20;

    var arrValues = [1,"Thunk to expose integers after 1"];
    var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: 20});
    var arr_label = av.label("intsFrom1", {left: leftMargin, top: 0});
    var arr1 = av.ds.array([2,4,6,8,10], {indexed: false, left: leftMargin, top: 20 + offset_for_each_var}).hide();
    var arr_label1 = av.label("evens", {left: leftMargin, top: 0 + offset_for_each_var}).hide();
//     var arr2 = av.ds.array([1,4,9,16,25], {indexed: false, left: leftMargin, top: 20 + 2 * offset_for_each_var}).hide();
//    var arr_label2 = av.label("s2", {left: leftMargin, top: 0 + 2 * offset_for_each_var}).hide();
//     var arr3 = av.ds.array([3,"Thunk to expose integers after 3"], {indexed: false, left: leftMargin, top: 20 + 3 * offset_for_each_var}).hide();
//     var arr_label3 = av.label("s2", {left: leftMargin, top: 0 + 3 * offset_for_each_var}).hide();
//     var arr4 = av.ds.array([3,4,5,6,7,8], {indexed: false, left: leftMargin, top: 20 + 4 * offset_for_each_var}).hide();
//     var arr_label4 = av.label("s3", {left: leftMargin, top: 0 + 4 * offset_for_each_var}).hide();
    
    // Slide 1
    av.umsg("The is.filter function takes a predicate (i.e., a function that returns a Boolean), and a sequence.  It returns the sequence of all items in the input sequence that satisfy the predicate.  In the example highlighted below, JavaScript's mod operator is used with filter to create the sequence of all even integers, of which the first 5 are then taken.");
    arr.addClass(1,"wider");
    arr1.show();
    arr_label1.show();
    pseudo.hide([5,6,7,8,11]);
    pseudo.highlight([15,16,17,18,19,20,21]);
    av.displayInit();

    //S 2
    av.umsg("To implement the filter function, first consider the case highlighted below in which the head of the sequence does not satisfy the predicate.");
    pseudo.unhighlight([15,16,17,18,19,20,21]);
    pseudo.highlight([10]);
    av.step();

    // S 3
    av.umsg('In this case, we do not want to cons the head of the sequence onto what we return.  So we only need to call filter recursively on the tail of the sequence.');
    pseudo.unhighlight([10]);
    pseudo.hide(10);
    pseudo.show(11);
    pseudo.highlight([11]);
    av.step();

    // S 4
    av.umsg("Next, we will consider what must be done when the head of the sequence does satisfy the predicate.");
    pseudo.highlight([4]);
    pseudo.unhighlight([11]);
    av.step();

    // S5
    av.umsg('In a pattern of working with sequences that is similar to what we did in implementing map, we must cons the head of the sequence onto a thunk.  That thunk has a recursive call to filter inside the thunk.  Because sequences are lazy and consequently infinite, no base case is required for the recursion.');
    pseudo.unhighlight([4]);
    pseudo.hide(4);
    pseudo.show([5,6,7,8]);
    pseudo.highlight([5,6,7,8]);
    av.step();


    
    av.recorded();
});
