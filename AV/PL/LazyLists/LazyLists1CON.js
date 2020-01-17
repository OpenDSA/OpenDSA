/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "LazyLists1CON";
    // Load the config object with interpreter and code created by odsaUtils.js
    var code = ODSA.UTILS.loadConfig({av_name: av_name}).code;	
    var av = new JSAV(av_name);
    var pseudo = av.code(code[0]).show();
    var leftMargin = 10;

    var arrValues = [1,"Thunk to expose 1s that follow"];
    var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: 20});
    var arr_label = av.label("ones", {left: leftMargin, top: 0});
    var arr1 = av.ds.array([1], {indexed: false, left: leftMargin, top: 70}).hide();
    var arr_label1 = av.label("is.hd(ones)", {left: leftMargin, top: 50}).hide();
    var arr2 = av.ds.array([1,"Another thunk to expose 1s"], {indexed: false, left: leftMargin, top: 120}).hide();
    var arr_label2 = av.label("more_ones", {left: leftMargin, top: 100}).hide();
    var arr3 = av.ds.array([1,1,1,1,1], {indexed: false, left: leftMargin, top: 170}).hide();
    var arr_label3 = av.label("is.take(ones,5)", {left: leftMargin, top: 150}).hide();

    // Slide 1
    av.umsg("With documentation for the operation highlighted in blue (lines 1 and 2) and actual code highlighted in red (lines 3-6), the is.cons operation is used to construct an infinite sequence of ones.  Note that the thunk that comprises the second argument to the is.cons operation buries a recursive reference to ones inside a parameterless function.  This technique will often be used in constructing infinite sequences.");
    arr.addClass(1,"wider");
    pseudo.addClass([1,2], "blue");
    pseudo.addClass([3,4,5,6], "red");
    av.displayInit();

    av.step();
    av.umsg("Again with documentation for the operation highlighted in blue and actual code that uses the operation code highlighted in red, we see that is.hd on the ones sequence (lines 9-10) will simply return a 1.");
    pseudo.removeClass([1,2], "blue");
    pseudo.removeClass([3,4,5,6], "red");
    pseudo.addClass([7,8], "blue");
    pseudo.addClass([9,10], "red");
    arr1.show();
    arr_label1.show();
    av.step();

    av.umsg("Again with documentation for the operation highlighted in blue and actual code highlighted in red, we see that is.tl on the ones sequence (lines 14-15) produces another lazy list that also contains a 1 followed by a thunk.   Although the contents of more_ones are identical to those of ones, note that the 1 at the head position of more_ones came from thawing the thunk in ones.");
    pseudo.removeClass([7,8], "blue");
    pseudo.removeClass([9,10], "red");
    pseudo.addClass([11,12,13], "blue");
    pseudo.addClass([14,15], "red");
    arr.value(1,"Thawed by is.tl");
    arr.highlight(1);
    arr2.addClass(1,"wider");
    arr2.show();
    arr_label2.show();
    av.step();
    
    av.umsg("If we just use is.hd and is.tl on sequences, we are very limited in how many values in the sequence can be actually exposed.   The essence of lazy sequences is to avoid evaluating members of the sequence until they are actually requested.  is.take is an operation that can make such a request on a specified finite portion of the sequence beginning with the head.   This specified portion is provided as an integer in the second argument, as illustrated by the call in lines 19-20.");
    pseudo.removeClass([11,12,13], "blue");
    pseudo.removeClass([14,15], "red");
    pseudo.addClass([16,17,18], "blue");
    pseudo.addClass([19,20], "red");
    arr.value(1,"Thunk to expose 1s that follow");
    arr.unhighlight(1);
    arr3.show();
    arr_label3.show();
    av.step();
    
    av.recorded();
});
