// lambda = String.fromCharCode(955),
//     epsilon = String.fromCharCode(949),
//     square = String.fromCharCode(9633);
//     // emptystring;
// let square = String.fromCharCode(9633);
sq = String.fromCharCode(9633);
$(document).ready(function() {
    "use strict";


    var av_name = "TMmultiD";
    var av = new JSAV(av_name);
    // var Frames = PIFRAMES.init(av_name);
    av.umsg("In this slideshow, we will see how the following 3-tape turing machine works.<br> " +
        // "Note that this turing machine uses determinism with two tapes. <br>" +
        "The machine does a binary addition for the input of the first two tapes and stores the result to the third tape. <br>" +
        "The machine accepts if the binary addition is done. <br>" +
        "Note that the machine takes the rightmost bit of a binary number as its leftmost input for binary addition. <br>" +
        "Thus, the input 001 represents the binary number 100.<br>" +
        "Note that the third tape has to be empty to store the result of the binary addition of first two tapes <br>" +
        "Let's assume the input of the first tape is <b>101</b>, the second tape is <b>011</b>, the third tape is empty.");
    // var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
    //     interpret = config.interpreter, // get the interpreter
    //     code = config.code;             // get the code object
    // var url = "../../../../AV/Kochan/m1.jff";
    // var url = "../../../../AV/OpenFLAP/machines/TM/TManbncn.jff";
    var g = av.ds.TM($.extend({width: '90%', height: 350, emptystring: square, editable: true}));
    // var graph = av.ds.graph({visiable: true, left: -10, bottom: 5});
    var gWidth = g.element.width(),
        gHeight = g.element.height();
    // var a = g.addNode({left: 0.10 * gWidth, top: 0.3 * gHeight}),
    // b = g.addNode({left: 0.35 * gWidth, top: 0.7 * gHeight}),
    var aw = 80;
    var gmargin = 50;
    var
        q0 = g.addNode({left: 0.10 * gWidth-aw, top: 0.51 * gHeight + gmargin}),
        q1 = g.addNode({left: 0.6 * gWidth-aw, top: 0.51 * gHeight+ gmargin}),
        q2 = g.addNode({left: 0.35 * gWidth-aw, top: .83 * gHeight+ gmargin});


        g.makeInitial(q0);
    q2.addClass('final');

    //q0 to q0
    g.addEdge(q0, q0, {weight: '1;1,R | ' + sq + ';' + sq + ',R | ' + sq + ';1,R'});
    g.addEdge(q0, q0, {weight: sq + ';' + sq + ',R' + ' | 1;1,R | ' + sq + ';1,R'});
    g.addEdge(q0, q0, {weight: '0;0,R | 1;1,R | ' + sq + ';1,R'});
    g.addEdge(q0, q0, {weight: '1;1,R | 0;0,R | ' + sq + ';1,R'});
    g.addEdge(q0, q0, {weight: '0;0,R | 0;0,R | ' + sq + ';0,R'});

    //q1 to q1
    g.addEdge(q1, q1, {weight: '1;1,R | ' + sq + ';' + sq + ',R | ' + sq + ';0,R'});
    g.addEdge(q1, q1, {weight: sq + ';' + sq + ',R' + ' | 1;1,R | ' + sq + ';0,R'});
    g.addEdge(q1, q1, {weight: '1;1,R | 1;1,R | ' + sq + ';1,R'});
    g.addEdge(q1, q1, {weight: '0;0,R | 1;1,R | ' + sq + ';0,R'});
    g.addEdge(q1, q1, {weight: '1;1,R | 0;0,R | ' + sq + ';0,R'});


    //q1 to q0
    g.addEdge(q1, q0, {weight: '0;0,R | ' + '0;0,R | ' + sq + ';1,R'});
    g.addEdge(q1, q0, {weight: sq + ';' + sq + ',R | ' + '0;0,R | ' + sq + ';1,R'});
    g.addEdge(q1, q0, {weight: '0;0,R | ' + sq + ';' + sq + ',R | ' + sq + ';1,R'});

    //q0 to q1
    g.addEdge(q0, q1, {weight: '1;1,R | 1;1,R | ' + sq + ';0,R'});


    //q0 to q2
    g.addEdge(q0, q2, {weight: sq + ';' + sq + ',R | ' + sq + ';' + sq + ',R | ' +  sq + ';' + sq + ',R'});

    //q1 to q2
    g.addEdge(q1, q2, {weight: sq + ';' + sq + ',R | ' + sq + ';' + sq + ',R | ' +  sq + ';1'  + ',R'});

    av.displayInit();

    //Slide 2
    av.umsg("We will start at the q0 machine because it has the arrow notation attached to the machine. <br>" +
        "Let's create the first configuration with two tapes, T1, T2 and T3, to keep track of the machine. <br>" +
        "These three tapes start with the first element of their inputs. Thus, T1 will read '1', T2 will read '0', and T3 will read " + sq + ".");
    var t1 = av.ds.tape([sq, "1", "0", "1", sq, sq], 550, 80, "both", 1);
    var t2 = av.ds.tape([sq, "0", "1", "1",  sq, sq], 550, 130, "both", 1);
    var t3 = av.ds.tape([sq, sq, sq, sq,  sq, sq], 550, 180, "both", 1);
    var r1 = av.g.rect(490, 40, 300, 180);
    var l1 = av.label("<b>Configuration #1:</b>", {top: 0, left: 490});
    var l2 = av.label("<b>T1:</b>", {top: 70, left: 500});
    var l3 = av.label("<b>T2:</b>", {top: 120, left: 500});
    var l4 = av.label("<b>T3:</b>", {top: 170, left: 500});
    var c1 = av.label("<b>Current Machine: q0</b>", {top: 30, left: 500});
    q0.highlight();

    //Slide 3
    av.step();
    // av.umsg("Since this turing machine is nondeterministic, reading 'a' from the first tape and 'a' from the second at q0 can transit to either" +
    //     " q0 or q1. Thus, to keep track of both cases, the machine needs to create the second configuration as follows: <br>"+
    //     "<br>Configuration #1: read 'b' from its first tape and 'a' from its second tape. <br>" +
    //     "Configuration #2: read 'a' from its first tape and 'a' from its second tape. <br>"
    // );
    av.umsg("Configuration #1: read '1' from its first tape, '0' from its second tape, " + sq + " from its third tape. So, it just wrote '1' to the third tape.")
    t1.moveRight();
    t2.moveRight();
    t3.arr.value(1, '1');
    t3.moveRight();
    q0.highlight();

    //Slide 4
    av.step();
    av.umsg("Configuration #1: read '0' from its first tape, '1' from its second tape, " + sq + " from its third tape. So, it just wrote '1' to the third tape.")
    t1.moveRight();
    t2.moveRight();
    t3.arr.value(2, '1');
    t3.moveRight();

    //Slide 5
    av.step();
    av.umsg("Configuration #1: read '1' from its first tape, '1' from its second tape, " + sq + " from its third tape. So, it just wrote '0' to the third tape.")
    t1.moveRight();
    t2.moveRight();
    t3.arr.value(3, '0');
    t3.moveRight();
    c1.hide();
    var c2 = av.label("<b>Current Machine: q1</b>", {top: 30, left: 500});
    q0.unhighlight();
    q1.highlight();

    //Slide 6
    av.step();
    av.umsg("Configuration #1: read " + sq + " from its first tape, "+ sq +" from its second tape, " + sq + " from its third tape. So, it just wrote '1' to the third tape. <br>" +
        "The machine accepts configuration #1. <br> Configuration #1 shows that the sum of 101 and 110 is 1011. (Note: binary numbers are stored in tapes reversely.)");
    // av.umsg("Therefor, the ");
    t3.arr.value(4, '1');
    t1.moveRight();
    t2.moveRight();
    t3.moveRight();
    q1.unhighlight();
    q2.highlight();
    c2.hide();
    var c3 = av.label("<b>Current Machine: q2</b>", {top: 30, left: 500});
    var s2 = av.label("<b style='color: green'>Accept</b>", {top: 30, left: 730});

    av.step();
    // av.umsg("The ");
    av.recorded();
});
