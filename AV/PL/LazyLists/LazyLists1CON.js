/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "LazyLists1CON";
    var av = new JSAV(av_name);
    var leftMargin = 10;
//     var offset_for_each_var = 50;
//     var offset_between_var_label_and_cell = 20;

    var arrValues = [1,"thunk to expose 1's that follow"];
    var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: 20});
    var arr_label = av.label("ones", {left: leftMargin, top: 0});
    var arr1 = av.ds.array([1], {indexed: false, left: leftMargin, top: 70}).hide();
    var arr_label1 = av.label("is.hd(ones)", {left: leftMargin, top: 50}).hide();
    var pseudo1 = av.code(
	//        code1,
	{
	    url:'../../../AV/PL/LazyLists/LazyLists1.code.1',
	    relativeTo:arr,
 	    anchor:'right top',
 	    myAnchor:'left top',
	    left: leftMargin+200,
	    top: 0,
            lineNumbers: false
        }
    );
    
    // Slide 1
    av.umsg("The is.cons operation is used to construct an infinite sequence of ones.  Note the thunk that comprises the second argument to the is.cons operation buries a recursive reference to ones inside a parameterless function.  This technique will often be used in constructing infinite sequences.");
    arr.addClass(1,"wider");
    pseudo1.highlight([1,2,3,4,5,6,7]);
    av.displayInit();

    av.step();
    av.umsg("Using is.hd on the ones sequence will simply return a 1");
    pseudo1.unhighlight([1,2,3,4,5,6,7]);
    pseudo1.highlight([9,10,11,12,13]);

    
    av.recorded();
});
