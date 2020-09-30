
$(document).ready(function(){
    /** 
    "use strict";
    */
    
    var av = new JSAV("parseTreeCON");
    //create label object "Statement"
    av.label("statement", {left: 100});
    var l1 = av.g.line(140, 40, 140, 65); //Statement to if-statement
    av.label("if-statement", {top: 50, left: 100});

    var l2 = av.g.line(140, 85, 10, 115); //if-statement to if
    av.label("if", {top: 100});

    var l3 = av.g.line(140, 85, 55, 115); //if-statement to (
    av.label("(", {top: 100, left: 50});

    var l4 = av.g.line(140, 85, 130, 115); //if-statement to condition
    av.label("condition", {top: 100, left: 100});

    var l5 = av.g.line(140, 85, 195, 115); //if-statement to )
    av.label(")", {top: 100, left: 200});

    var l6 = av.g.line(130, 135, 130, 165); //condition to relation
    av.label("relation", {top: 150, left: 100});

    var l7 = av.g.line(120, 185, 25, 220); //relation to expression (far left)
    av.label("expression", {top: 200});

    var l8 = av.g.line(120, 185, 117, 220); //relation to relop
    av.label("relop", {top: 200, left: 100}); 

    var l9 = av.g.line(120, 185, 170, 220); //relation to expression (right)
    av.label("expression", {top: 200, left: 150});

    var l10 = av.g.line(25, 235, 10, 265); //expression to id
    av.label("id", {top: 250});

    var l11 = av.g.line(115, 235, 115, 270); //relop to <=
    av.label("<=", {top: 250, left: 100});

    var l12 = av.g.line(170, 235, 170, 270); //expression to constant
    av.label("constant", {top: 250, left: 150});

    var l13 = av.g.line(140, 85, 400, 115); //if-statement to statement 
    av.label("statement", {top: 100, left: 375}); 

    var l14 = av.g.line(415, 135, 436, 165); //statement to assg. stmt
    av.label("assg. stmt", {top: 150, left: 400});

    var l15 = av.g.line(420, 185, 360, 215); //assg. stmt to lhs
    av.label("lhs", {top: 200, left: 350});

    var l16 = av.g.line(420, 185, 405, 215); //assg. stmt to =
    av.label("=", {top: 200, left: 400});

    var l17 = av.g.line(420, 185, 460, 215); //assg. stmt to rhs
    av.label("rhs", {top: 200, left: 450});

    var l18 = av.g.line(360, 235, 360, 265); //lhs to id
    av.label("id", {top: 250, left: 350});
    
    var l19 = av.g.line(460, 235, 460, 265); //rhs to expr
    av.label("expr", {top: 250, left: 450});

    var l20 = av.g.line(460, 285, 415, 315); //expr to expr (left)
    av.label("expr", {top: 300, left:400});
    
    var l21 = av.g.line(460, 285, 460, 315); //expr to +
    av.label("+", {top: 300, left: 455});
    
    var l22 = av.g.line(460, 285, 505, 315); //expr to expr (right)
    av.label("expr", {top: 300, left: 495});

    var l23 = av.g.line(410, 335, 410, 365); //expr (left) to id
    av.label("id", {top: 350, left: 400});
    
    var l24 = av.g.line(500, 335, 500, 365); //expr (right) to id
    av.label("id", {top: 350, left: 495});
    av.displayInit();
});
