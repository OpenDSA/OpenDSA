/*global ODSA */

$(document).ready(function() {
    "use strict";
    var av_name = "FP5Code1CON";
    var av = new JSAV(av_name);
    var leftMargin = 10;
    var offset_for_each_var = 50;
    var offset_between_var_label_and_cell = 20;
    var glx = av.ds.array(['"outside"'], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell}).hide();
    var label_glx = av.label("Global x", {left: leftMargin, top: 0}).hide();
    var f1 = av.ds.array(["Function definition"], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell + offset_for_each_var}).hide();
    var label_f1 = av.label("f1", {left: leftMargin, top: offset_for_each_var}).hide();
    var f1x = av.ds.array(['"inside f1"'], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell + 2 * offset_for_each_var}).hide();
    var label_f1x = av.label("f1's x", {left: leftMargin, top: 2 * offset_for_each_var}).hide();
    var f2 = av.ds.array(["Function definition"], {indexed: false, left: leftMargin + offset_for_each_var, top: offset_between_var_label_and_cell + 3 * offset_for_each_var}).hide();
    var label_f2 = av.label("f2", {left: leftMargin, top: 3 * offset_for_each_var}).hide();

    var pseudo = av.code(
        [
            'var x = "outside";', // 1
            'var f1 = function() { ', // 2
            '           var x = "inside f1"; ',          // 3
            '           return x; ',			 // 4
            '};',                                        // 5
            'f1();',                                     // 6
            'var f2 = function() {',                     // 7
            '           x = "inside f2";',               // 8
            '           return x;',			 // 9
            '};',                                        // 10
            'f2();    ',                                 // 11
            'x;'                                         // 12
        ],
        {
            lineNumbers: true,
            left: 200,
            top: 0
        }
    );
    

    // Slide 1
    av.umsg("Here we have two local scopes, one associated with function f1 in lines 2-5 and one associated with function f2 in lines 7-10.");
    pseudo.addClass([2, 3, 4, 5], "scope1");
    pseudo.addClass([7, 8, 9, 10], "scope2");
    glx.addClass(0,"wider");
    //label_glx.show();
    //    glx.show();
    f1x.addClass(0,"wider");
    f1.addClass(0,"wider");
    //label_f1x.show();
    //    f1x.show();
    av.displayInit();

    //Slide 2
    av.umsg('When line 1 is read into the interpreter, a variable x is established in the global scope and a value, namely the string "outside", is associated with it.');
    pseudo.highlight(1);
    label_glx.show();
    glx.show();
    av.step();
    
    //Slide 3
    av.umsg('When the definition of f1 in lines 2-5 is read into the interpreter, a variable f1 is established in the global scope and a value, namely the definition of the function, is associated with it.  Note that in functional languages the definition of a function is itself a "value".  This is one aspect of functional languages that sets them apart.  In the definition of the function, a variable x is declared in the local scope of the function, making the x declared in the global scope inaccessible within the function.');
    pseudo.unhighlight(1);
    label_f1.show();
    f1.show();
    glx.addClass(0,"inaccessible");
    av.step();
    
    // Slide 4
    av.umsg('The function f1, which was defined in lines 2-5, is now called in line 6.  The variable x declared in f1 becomes visible in the local scope of f1.   Hence the value "inside f1" is returned from the function call.   Note that, during the execution of the code in the definition, the global x is not accessible within the code of the function.');
    f1x.show();
    label_f1x.show();
//    glx.hide();
    //    label_glx.hide();
    pseudo.highlight(6);
    av.step();

    //Slide 5
    av.umsg('When the definition of f2 in lines 7-10 is read into the interpreter, a variable f2 is established in the global scope and the definition of the function is associated with it.  In the definition of the function, the absence of the "var" in front of x means that variable x is *not* being declared in the local scope of the function.  Instead this is a reference to the x in the global scope.');
    pseudo.unhighlight(6);
    label_f2.show();
    f2.addClass(0,"wider");
    f2.show();
    f1x.addClass(0,"inaccessible");
    glx.removeClass(0,"inaccessible");
    av.step();

    // Slide 6
    av.umsg('When f2 is called in line 11, the code in the function definition is executed, affecting the global x and returning the value "inside f2"');
    pseudo.highlight(11);
    glx.value(0,'"inside f2"');
    av.step();

    // Slide 7
    av.umsg('When x is evaluated in line 12, the value "inside f2" is returned, reflecting that the content of the global x was changed during execution of f2');
    pseudo.unhighlight(11);
    pseudo.highlight(12);
    av.step();

    
    av.recorded();
});
