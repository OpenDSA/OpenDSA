/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "LazyLists6CON"; // Illustrate and develop the is.map function
    var av = new JSAV(av_name);
    var leftMargin = 10;
    var offset_for_each_var = 70;
//     var offset_for_each_var = 50;
//     var offset_between_var_label_and_cell = 20;

    var arrValues = [1,2,4,8,16,32];
    var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: 40});
    var arr_label = av.label("First 6 members using iterates", {left: leftMargin, top: 0});
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
    var pseudo1 = av.code(
	{
	    url:'../../../AV/PL/LazyLists/LazyLists6.code.1',
	    relativeTo:arr,
 	    anchor:'right top',
 	    myAnchor:'left top',
	    left: leftMargin+80,
	    top: -40,
            lineNumbers: false
        }
    );
    
    // Slide 1
    av.umsg("The is.iterates function takes two parameters n and f.  It returns a new sequence starting with n and having its consequent elements computed by repeatedly applying the given function to the previous term of the sequence.  That is, it return the sequence n, f(n), f(f(n)), f(f(f(n))), ....   The example highlighted below shows how we could use the is.iterates operation to compute the sequence comprised of the powers of 2.");
    pseudo1.hide([8,10,15,16]);
    pseudo1.highlight([14]);
    av.displayInit();

    //S 2
    av.umsg("Suppose that we now want to use iterates to compute the sequence consisting of the multiples of 3, starting with 3.  See if you can correctly determine how to replace the question marks in the highlighted line below to produce this sequence.");
    pseudo1.unhighlight([14]);
    pseudo1.show(15);
    pseudo1.highlight([15]);
    arr1.show();
    arr_label1.show();
    arr_label1a.show();
    av.step();

    // S 3
    av.umsg('The first term is 3, so that is passed in for the n argument.  Thereafter we can compute the next term in the sequence by adding 3 to the previous term.');
    pseudo1.unhighlight(15);
    pseudo1.hide(15);
    pseudo1.highlight(16);
    pseudo1.show(16);
    av.step();

    // S 4
    av.umsg('Next we will attend to the implementation of the is.iterates function.  To do that we must determine how to fill in the two sets of question marks highlighted in the call to cons below.');
    pseudo1.unhighlight(16);
    pseudo1.highlight([7,9]);
    av.step();

    // S 4
    av.umsg('The argument n must be consed onto the front of the sequence we return.  For the recursive call, f(n) must be passed in as the first element of the rest of the sequence.  Since the "rest" for the sequence must be a thunk, this recursive call is embedded in a parameterless function, a technique we have also seen in the implementation of the map and filter operations.');
    pseudo1.unhighlight([7,9]);
    pseudo1.hide([7,9]);
    pseudo1.highlight([8,10]);
    pseudo1.show([8,10]);
    av.step();


    
    av.recorded();
});
