/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "LazyLists3CON"; // Illustrate and develop the is.map function
    var av = new JSAV(av_name);
    var leftMargin = 10;
    var offset_for_each_var = 50;
//     var offset_between_var_label_and_cell = 20;

    var arrValues = [1,"Thunk to expose integers after 1"];
    var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: 20});
    var arr_label = av.label("intsFrom1", {left: leftMargin, top: 0});
    var arr1 = av.ds.array([2,4,6,8,10], {indexed: false, left: leftMargin, top: 20 + offset_for_each_var}).hide();
    var arr_label1 = av.label("s1", {left: leftMargin, top: 0 + offset_for_each_var}).hide();
    var arr2 = av.ds.array([1,4,9,16,25], {indexed: false, left: leftMargin, top: 20 + 2 * offset_for_each_var}).hide();
    var arr_label2 = av.label("s2", {left: leftMargin, top: 0 + 2 * offset_for_each_var}).hide();
//     var arr3 = av.ds.array([3,"Thunk to expose integers after 3"], {indexed: false, left: leftMargin, top: 20 + 3 * offset_for_each_var}).hide();
//     var arr_label3 = av.label("s2", {left: leftMargin, top: 0 + 3 * offset_for_each_var}).hide();
//     var arr4 = av.ds.array([3,4,5,6,7,8], {indexed: false, left: leftMargin, top: 20 + 4 * offset_for_each_var}).hide();
//     var arr_label4 = av.label("s3", {left: leftMargin, top: 0 + 4 * offset_for_each_var}).hide();
    var pseudo1 = av.code(
	{
	    url:'../../../AV/PL/LazyLists/LazyLists3.code.1',
	    relativeTo:arr,
 	    anchor:'right top',
 	    myAnchor:'left top',
	    left: leftMargin+200,
	    top: 0,
            lineNumbers: false
        }
    );
    
    // Slide 1
    av.umsg("The is.map function applies an operation, in the form of a function, to an entire sequence returning a new sequence.  In the example highlighted below, the function that adds 1 is applied to the sequence of integers starting with 1.  Taking the first five members of the returned sequence results in the sequence s1.");
    arr.addClass(1,"wider");
    arr1.show();
    arr_label1.show();
    pseudo1.hide([6,8,9,10,11]);
    pseudo1.highlight([16,17,18]);
    av.displayInit();

    //S 2
    av.umsg("In the next highlighted example, the squaring function is applied to the sequence of integers starting with 1.  Taking the first five members of the returned sequence results in the sequence s2.");
    arr2.show();
    arr_label2.show();
    pseudo1.unhighlight([16,17,18]);
    pseudo1.highlight([19,20,21]);
    av.step();

    // S 3
    av.umsg('Next we consider the implementation of the is.map function');
    pseudo1.unhighlight([19,20,21]);
    pseudo1.highlight([5,7]);
    av.step();

    // S4
    av.umsg('The first argument to the cons function is straightforward.  We must merely apply the operation f to the head of the sequence.');
    pseudo1.unhighlight([5,7]);
    pseudo1.hide(5);
    pseudo1.show(6);
    pseudo1.highlight([6,7]);
    av.step();

    // S5
    av.umsg('The second argument to cons must be a thunk that invokes map recursively.  When working recursively on a lazy list, no recursive termination condition is required because we will never reach the end of the list');
    pseudo1.unhighlight([6,7]);
    pseudo1.hide(7);
    pseudo1.show([8,9,10,11]);
    pseudo1.highlight([6,8,9,10,11]);
    av.step();


    
    av.recorded();
});
