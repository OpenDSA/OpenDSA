/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "LazyLists2CON";
    var code = ODSA.UTILS.loadConfig({av_name: av_name}).code;
    var av = new JSAV(av_name);
    var pseudo = av.code(code[0]).show();
    
    var leftMargin = 10;
    var offset_for_each_var = 50;


    var arrValues = [1,"Thunk to expose integers after 1"];
    var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: 20});
    var arr_label = av.label("intsFrom1", {left: leftMargin, top: 0});
    var arr1 = av.ds.array([1], {indexed: false, left: leftMargin, top: 20 + offset_for_each_var}).hide();
    var arr_label1 = av.label("h", {left: leftMargin, top: 0 + offset_for_each_var}).hide();
    var arr2 = av.ds.array([2,"Thunk to expose integers after 2"], {indexed: false, left: leftMargin, top: 20 + 2 * offset_for_each_var}).hide();
    var arr_label2 = av.label("s1", {left: leftMargin, top: 0 + 2 * offset_for_each_var}).hide();
    var arr3 = av.ds.array([3,"Thunk to expose integers after 3"], {indexed: false, left: leftMargin, top: 20 + 3 * offset_for_each_var}).hide();
    var arr_label3 = av.label("s2", {left: leftMargin, top: 0 + 3 * offset_for_each_var}).hide();
    var arr4 = av.ds.array([3,4,5,6,7,8], {indexed: false, left: leftMargin, top: 20 + 4 * offset_for_each_var}).hide();
    var arr_label4 = av.label("s3", {left: leftMargin, top: 0 + 4 * offset_for_each_var}).hide();

    /*
    var pseudo = av.code(
	//        code1,
	{
	    url:'../../../AV/PL/LazyLists/LazyLists2.code.1',
	    relativeTo:arr,
 	    anchor:'right top',
 	    myAnchor:'left top',
	    left: leftMargin+200,
	    top: 0,
            lineNumbers: true
        }
    );
    */
    // Slide 1
    av.umsg("The is.from function returns a (lazy) list of integers starting at n.   In a few slides we will consider how to fill in the question marks below.   But first consider the usage of the is.from function to produce the sequence intsFrom1 below.   Although you can think of this sequence as the infinite sequence 1, 2, 3, 4, ..., remember that it actually is implemented as the two-element array with 1 and a thunk that must be thawed to get to the rest of the integers that follow 1.");
    arr.addClass(1,"wider");
    pseudo.hide([4,5,10,11,12,13]);
    pseudo.highlight(9);
    av.displayInit();

    av.umsg("When we invoke is.hd on intsFrom1, we get the 1 stored in the first element of the two-element array representation of intsFrom1.");
    arr1.show();
    arr_label1.show();
    pseudo.show(10);
    pseudo.unhighlight(9);
    pseudo.highlight(10);
    av.step();


    av.umsg('When we invoke is.tl on intsFrom1, we thaw the thunk stored in the second element of intsFrom1.   It is important to realize that the evaluation of such a thunk must give us another infinite sequence; otherwise the lazy list would "stop" here.   The sequence we get by evaluating this thunk is another sequence containing 2 as its first element and a thunk that could then be invoked to get at the integers after 2.');
    arr2.addClass(1,"wider");
    arr2.show();
    arr_label2.show();
    pseudo.show(11);
    pseudo.unhighlight(10);
    pseudo.highlight(11);
    av.step();

    av.umsg('Now in evaluating s2, the thunk in intsFrom1 must be invoked, returning a thunk, which is then consequently invoked to produce another thunk.  Each invocation gets a two-element array containing the next value and another thunk that, if needed, can be invoked to start on the trail to the remaining values in the sequence.');
    arr3.addClass(1,"wider");
    arr3.show();
    arr_label3.show();
    pseudo.show(12);
    pseudo.unhighlight(11);
    pseudo.highlight(12);
    av.step();

    av.umsg('is.take successively invokes enough thunks to produce a finite list of the specified length.');
    arr4.show();
    arr_label4.show();
    pseudo.show(13);
    pseudo.unhighlight(12);
    pseudo.highlight(13);
    av.step();

    av.umsg('Next we will consider how to implement the from operation, that is, how to fill in the question marks in the line highlighted below.');
    pseudo.unhighlight(13);
    pseudo.highlight(3);
    av.step();

    av.umsg('We know that the thunk onto which n is consed must be a parameterless function.  If we try what we see in line 3 below, we have a parameterless function.   However, it only returns the value n + 1, which would force the sequence to end instead of continuing on as far as is needed.  We need more if we want the sequence to continue beyond n + 1. So ...');
    pseudo.hide(3);
    pseudo.show(4);
    pseudo.highlight(4);
    av.step();

    av.umsg("... to get the capability to continue indefinitely, instead of having the thunk just return n + 1, we must return a thunk that invokes the function from recursively.   We saw this technique of using recursion within the thunk before when we created an infinite sequence of 1s.  We most certainly will see it again and again as we proceed.   One of the interesting aspects of this lazy recursion is that, because the list is infinite, there is no need for a recursive termination condition (or base case).");
    pseudo.hide(4);
    pseudo.show(5);
    pseudo.highlight(5);
    av.step();

    
    av.recorded();
});
