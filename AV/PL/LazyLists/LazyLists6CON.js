/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "LazyLists6CON"; // Illustrate and develop the is.map function
    var av = new JSAV(av_name);
    var code = ODSA.UTILS.loadConfig({av_name: av_name}).code;
    var pseudo = av.code(code[0]).show();

    var leftMargin = 10;
    var offset_for_each_var = 70;
//     var offset_for_each_var = 50;
//     var offset_between_var_label_and_cell = 20;

    var arrValues = [1,2,4,8,16,32];
    var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: 40});
    var arr_label = av.label("First 6 elements using iterates", {left: leftMargin, top: 0});
    var arr_label_a = av.label("with the 2 * x function", {left: leftMargin, top: 20});
    var arr1 = av.ds.array([ 3, 6, 9, 12, 15, 18 ], {indexed: false, left: leftMargin, top: 40 + offset_for_each_var}).hide();
    var arr_label1 = av.label("First 6 members of the", {left: leftMargin, top: 0 + offset_for_each_var}).hide();
    var arr_label1a = av.label("multiples-of-3 sequence", {left: leftMargin, top: 20 + offset_for_each_var}).hide();
//     var arr2 = av.ds.array([12,14,16,18,20,22], {indexed: false, left: leftMargin, top: 20 + 2 * offset_for_each_var}).hide();
//    var arr_label2 = av.label("first6", {left: leftMargin, top: 0 + 2 * offset_for_each_var}).hide();
//     var arr3 = av.ds.array([3,"Thunk to expose integers after 3"], {indexed: false, left: leftMargin, top: 20 + 3 * offset_for_each_var}).hide();
//     var arr_label3 = av.label("s2", {left: leftMargin, top: 0 + 3 * offset_for_each_var}).hide();
//     var arr4 = av.ds.array([3,4,5,6,7,8], {indexed: false, left: leftMargin, top: 20 + 4 * offset_for_each_var}).hide();
//     var arr_label4 = av.label("s3", {left: leftMargin, top: 0 + 4 * offset_for_each_var}).hide();

    
    // Slide 1
    av.umsg("The is.iterates function takes two parameters f and n.  It returns a new sequence starting with n and having its subsequent elements computed by repeatedly applying f to the previous term of the sequence.  That is, it returns the sequence n, f(n), f(f(n)), f(f(f(n))), etc.   The example highlighted below shows how we could use the is.iterates operation to compute the sequence comprised of the powers of 2.");
    pseudo.hide([8,10,15,16]);
    pseudo.highlight([14]);
    av.displayInit();

    //S 2
    av.umsg("Suppose that we now want to use iterates to compute the sequence consisting of the multiples of 3, starting with 3.  Can you correctly determine how to replace the question marks in the highlighted line below to produce this sequence?");
    pseudo.unhighlight([14]);
    pseudo.show(15);
    pseudo.highlight([15]);
    arr1.show();
    arr_label1.show();
    arr_label1a.show();
    av.step();

    // S 3
    av.umsg('The first term is 3; so that is passed in for the n argument.  Thereafter, we compute the next term in the sequence by adding 3 to the previous term.');
    pseudo.unhighlight(15);
    pseudo.hide(15);
    pseudo.highlight(16);
    pseudo.show(16);
    av.step();

    // S 4
    av.umsg('Next we will attend to the implementation of the is.iterates function.  To do that we must determine how to fill in the two sets of question marks highlighted in the call to cons below.');
    pseudo.unhighlight(16);
    pseudo.highlight([7,9]);
    av.step();

    // S 4
    av.umsg('The argument n must be consed onto the front of the sequence we return.  For the recursive call, f(n) must be passed in as the first element of the rest of the sequence.  Since the "rest" for the sequence must be a thunk, this recursive call is embedded in a parameterless function, a technique we have already used in the implementation of previous operations.');
    pseudo.unhighlight([7,9]);
    pseudo.hide([7,9]);
    pseudo.highlight([8,10]);
    pseudo.show([8,10]);
    av.step();


    
    av.recorded();
});
