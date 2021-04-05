// lambda = String.fromCharCode(955),
//     epsilon = String.fromCharCode(949),
//     square = String.fromCharCode(9633);
//     // emptystring;
// let square = String.fromCharCode(9633);
sq = String.fromCharCode(9633);
$(document).ready(function() {
    "use strict";


    var av_name = "TMmulti";
    var av = new JSAV(av_name);
    // var Frames = PIFRAMES.init(av_name);
    av.umsg("In this slideshow, we will see how the following 2-tape turing machine works.<br> " +
        "Note that this turing machine uses nondeterminism with two tapes. <br>" +
        "The machine accepts if the second tape's string contains a substring of the first tape's string. <br>" +
        "Let's assume the input of the first tape is <b>aba</b> and the second tape is <b>aaba</b>");
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    // var url = "../../../../AV/Kochan/m1.jff";
    // var url = "../../../../AV/OpenFLAP/machines/TM/TManbncn.jff";
    var g = av.ds.TM($.extend({width: '90%', height: 350, emptystring: square, editable: true}));
    // var graph = av.ds.graph({visiable: true, left: -10, bottom: 5});
    var gWidth = g.element.width(),
        gHeight = g.element.height();
    // var a = g.addNode({left: 0.10 * gWidth, top: 0.3 * gHeight}),
        // b = g.addNode({left: 0.35 * gWidth, top: 0.7 * gHeight}),
    var aw = 80;
    var
        q0 = g.addNode({left: 0.35 * gWidth-aw, top: .83 * gHeight}),
        q1 = g.addNode({left: 0.10 * gWidth-aw, top: 0.51 * gHeight}),
        q2 = g.addNode({left: 0.6 * gWidth-aw, top: 0.51 * gHeight});

    g.makeInitial(q0);
    q2.addClass('final');

    //q0 to q0
    var s0 = 'b;b,S | b;b,R';
    g.addEdge(q0, q0, {weight: s0});

    var a = g.addEdge(q0, q0, {weight: 'a;a,S | b;b,R'});
    g.addEdge(q0, q0, {weight: 'b;b,S | a;a,R'});
    g.addEdge(q0, q0, {weight: 'a;a,S | a;a,R'});

    //q1 to q1
    g.addEdge(q1, q1, {weight: 'b;b,R | b;b,R'});
    g.addEdge(q1, q1, {weight: 'a;a,R | a;a,R'});

    //q0 to q1
    g.addEdge(q0, q1, {weight: 'b;b,R | b;b,R'});
    g.addEdge(q0, q1, {weight: 'a;a,R | a;a,R'});

    //q0 to q2
    g.addEdge(q0, q2, {weight: sq + ';' + sq + ',S | ' +  sq + ';' + sq + ',S'});
    g.addEdge(q0, q2, {weight: sq + ';' + sq + ',S | a;a,R'});
    g.addEdge(q0, q2, {weight: sq + ';' + sq + ',S | b;b,R'});

    //q1 to q2
    g.addEdge(q1, q2, {weight: sq + ';' + sq + ',S | a;a,R'});
    g.addEdge(q1, q2, {weight: sq + ';' + sq + ',S | b;b,R'});
    g.addEdge(q1, q2, {weight: sq + ';' + sq + ',S | ' +  sq + ';' + sq + ',S'});

    av.displayInit();

    //Slide 2
    av.umsg("We will start at the q0 machine because it has the arrow notation attached to the machine. <br>" +
        "Let's create the first configuration with two tapes, T1 and T2, to keep track of the machine. <br>" +
        "These two tapes start with the first letter of both the inputs. Thus, T1 will read 'a' and T2 will read 'a'.");
    var t1 = av.ds.tape([sq, "a", "b", "a", sq], 550, 80, "both", 1);
    var t2 = av.ds.tape([sq, "a", "a", "b", "a", sq], 550, 130, "both", 1);
    var r1 = av.g.rect(490, 40, 300, 140);
    var l1 = av.label("<b>Configuration #1:</b>", {top: 0, left: 490});
    var l2 = av.label("<b>T1:</b>", {top: 70, left: 500});
    var l3 = av.label("<b>T2:</b>", {top: 120, left: 500});
    var c1 = av.label("<b>Current Machine: q0</b>", {top: 30, left: 500});
    q0.highlight();

    //Slide 3
    av.step();
    av.umsg("Since this turing machine is nondeterministic, reading 'a' from the first tape and 'a' from the second at q0 can transit to either" +
        " q0 or q1. Thus, to keep track of both cases, the machine needs to create the second configuration as follows: <br>"+
        "<br>Configuration #1: read 'b' from its first tape and 'a' from its second tape. <br>" +
        "Configuration #2: read 'a' from its first tape and 'a' from its second tape. <br>"
    );
    var conf_margin = 170;
    t1.moveRight();
    t2.moveRight();
    c1.hide();
    q1.highlight();
    var l4 = av.label("<b>Current Machine: q1</b>", {top: 30, left: 500});
    var t3 = av.ds.tape([sq, "a", "b", "a", sq], 550, 250, "both", 1);
    var t4 = av.ds.tape([sq, "a", "a", "b", "a", sq], 550, 300, "both", 2);
    var r2 = av.g.rect(490, 210, 300, 140);
    av.label("<b>Configuration #2</b>", {top: 170, left: 490});
    av.label("<b>T3:</b>", {top: 240, left: 500});
    av.label("<b>T4:</b>", {top: 290, left: 500});
    var c2 = av.label("<b>Current Machine: q0</b>", {top: 200, left: 500});
    q0.highlight();

    //Slide 4
    av.step();
    av.umsg("The machine creates a third configuration by the second configuration because reading 'a' from its first tape and 'a' from its second tape can transit to either q0 or q1. <br>" +
        "<br>Configuration #1: got rejected because it has no transition for reading 'a' from T1 and 'b' from T2 <br>"+
    "Configuration #2: read 'b' from its first tape and 'b' from its second tape. <br>" +
    "Configuration #3: read 'a' from its first tape and 'b' from its second tape.");

    var t5 = av.ds.tape([sq, "a", "b", "a", sq], 550, 250+conf_margin, "both", 1);
    var t6 = av.ds.tape([sq, "a", "a", "b", "a", sq], 550, 300+conf_margin, "both", 3);
    var r3 = av.g.rect(490, 210+conf_margin, 300, 140);
    av.label("<b>Configuration #3</b>", {top: 170+conf_margin, left: 490});
    av.label("<b>T5:</b>", {top: 240+conf_margin, left: 500});
    av.label("<b>T6:</b>", {top: 290+conf_margin, left: 500});
    c2.hide();
    var c21 = av.label("<b>Current Machine: q1</b>", {top: 200, left: 500});
    var c3 = av.label("<b>Current Machine: q0</b>", {top: 200+conf_margin, left: 500});
    t3.moveRight();
    t4.moveRight();
    var s1 = av.label("<b style='color: red'>Reject</b>", {top: 30, left: 730});

    //Slide 5
    av.step();
    av.umsg("Now we can remove the first configuration since it got rejected. <br>" +
        "<br> Configuration #2: read 'a' from its first tape and 'a' from its second tape. <br>" +
    "Configuration #3: read 'a' from its first tape and 'a' from its second tape.");
    t1.hide();t2.hide();r1.hide();c1.hide();s1.hide();l1.hide();l2.hide();l3.hide();l4.hide();
    t3.moveRight();
    t4.moveRight();
    t6.moveRight();

    //Slide 6
    av.step();
    av.umsg("The machine creates a fourth configuration by the third configuration because reading 'a' from its first tape and 'a' from its second tape can transit to either q0 or q1. <br>" +
        "<br>Configuration #2: read " + sq + " from its first tape and " + sq + " from its second tape. <br>"+
        "Configuration #3: read 'a' from its first tape and " + sq +  " from its second tape. <br>" +
        "Configuration #4: read 'b' from its first tape and " + sq + " from its second tape.");
    t3.moveRight();
    t4.moveRight();
    t6.moveRight();
    var t7 = av.ds.tape([sq, "a", "b", "a", sq], 550, 250+conf_margin * 2, "both", 2);
    var t8 = av.ds.tape([sq, "a", "a", "b", "a", sq], 550, 300+conf_margin * 2, "both", 5);
    var r4 = av.g.rect(490, 210+conf_margin * 2, 300, 140);
    av.label("<b>Configuration #4</b>", {top: 170+conf_margin * 2, left: 490});
    av.label("<b>T6:</b>", {top: 240+conf_margin * 2, left: 500});
    av.label("<b>T7:</b>", {top: 290+conf_margin * 2, left: 500});
    var c4 = av.label("<b>Current Machine: q1</b>", {top: 200+conf_margin * 2, left: 500});

    //Slide 7
    av.step();
    av.umsg("Finally, the machine accepts the configuration #2 and rejects configuration #3 and #4.<br>" +
        "Therefore, <b>aaba</b> contains a substring of <b>aba</b>. <br>" +
        "<br>Configuration #2: got accepted because it arrived at the q2 machine. <br>"+
        "Configuration #3: got rejected because it has no transition for reading 'a' from its first tape and " + sq + " from its second tape. <br>" +
        "Configuration #4: got rejected because it has no transition for reading 'b' from its first tape and " + sq + " from its second tape.");
    c21.hide();
    var c22 = av.label("<b>Current Machine: q2</b>", {top: 200, left: 500});
    var s2 = av.label("<b style='color: green'>Accept</b>", {top: 30+conf_margin, left: 730});
    var s3 = av.label("<b style='color: red'>Reject</b>", {top: 30+conf_margin*2, left: 730});
    var s4 = av.label("<b style='color: red'>Reject</b>", {top: 30+conf_margin*3, left: 730});
    q2.highlight();
    av.recorded();
});
