/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "LazyLists7CON"; // Illustrate and develop the is.map function
    var av = new JSAV(av_name);
    var code = ODSA.UTILS.loadConfig({av_name: av_name}).code;
    var pseudo = av.code(code[0]).show();


    
    var n = 31;
//     var arrValues = ["F", "F", "T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T", "T"];
//    var arrValues = [".", ".", ".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".", "."];
    var arrValues = [" ", " ", " "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ", " "];
    var arr = av.ds.array(arrValues, {indexed: true});

    var p_label = av.label("p = 2", {left: 20, top: 60}).hide();
    
//     var p = av.variable(2, {label: "p = ", relativeTo:arr, anchor:'right top',
//  	    myAnchor:'left top',
// 	    left: 20,
// 	    top: 70});
    
    // Slide 1
    av.umsg("Suppose n = 30.  Trace through the pseudocode below.");
    for (var i = 0; i < n; i++) arr.addClass(i, "narrow"); 
    pseudo.addClass([1,2,3,4,5,6,7,8], "extrawidth");
    p_label.addClass("emphasize");
    pseudo.setCurrentLine(1);
    
    av.displayInit();


    // S 2
    pseudo.setCurrentLine(2);
    arr.value(0,"F");
    arr.value(1,"F");
    for (i = 2; i < n; i++) { arr.value(i,"T");arr.highlight(i); }
    av.step();

    // S 3
    pseudo.setCurrentLine(3);
    p_label.show();
    av.step();

    // S 4
    pseudo.setCurrentLine(4);
    for (i = 4; i < n; i= i + 2) { arr.value(i,"F");arr.unhighlight(i); }
    av.step();
    
    // S 5
    p_label.text("p = 3");
    pseudo.setCurrentLine(5);
    av.step();

    // S 6
    pseudo.setCurrentLine(7);
    av.step();

    // S 7
    pseudo.setCurrentLine(4);
    for (i = 6; i < n; i= i + 3) { arr.value(i,"F");arr.unhighlight(i); }
    av.step();
    
    // S 8
    p_label.text("p = 5");
    pseudo.setCurrentLine(5);
    av.step();

    // S 9
    pseudo.setCurrentLine(7);
    av.step();

    // S 10
    pseudo.setCurrentLine(4);
    for (i = 10; i < n; i= i + 5) { arr.value(i,"F");arr.unhighlight(i); }
    av.step();

    // S11
    p_label.text("No such p");
    pseudo.setCurrentLine(5);
    av.step();

    //S12
    p_label.hide();
    pseudo.setCurrentLine(6);
    av.step();

    //S13
    pseudo.setCurrentLine(8);
    av.step();
    
    av.recorded();
});
