//document.write('<script src="../../../AV/Development/formal_language/contextFree/ParseTree.js"></script>');
//document.write('<script src="../../../AV/FLA/resources/u/nderscore-min.js"></script>');

$(document).ready(function() {
    "use strict";
    var av_name = "AmbiguityExample2";
    var av = new JSAV(av_name,);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;

    // //frame 1
    // av.umsg("In the previous chapters, we see that some languages are regular languages, which means that we can define a DFA, NFA, Regular expression, or Regular grammar for them.");
    // av.displayInit();
    //frame 1
    av.umsg("$\\textbf {Definitions}$: Partial derivation tree - subtree of derivation tree. <br> If partial derivation tree has root $S$ then it represents a sentential form. <br> Leaves from left to right in a derivation tree form the yield of the tree.<br> If $w$ is the yield of a derivation tree, then it must be that $w \\in L(G)$.<br> The yield for the example above is $aacbb$.");
    av.displayInit();

    //frame 2
    av.umsg("A partial derivation tree that has root $S$ (so it is a sentential form:)");
    // var tr = av.ds.tree({nodegap: 15});
    // var root_s_1 = tr.root("s");
    // var A_1 = tr.newNode("A");
    // var A_2 = tr.newNode("A");
    // var a_1 = tr.newNode("a");
    // var a_2 = tr.newNode("a");
    // var B_1 = tr.newNode("B");
    // var c_1 = tr.newNode("c");
    // root_s_1.addChild(A_1);
    // root_s_1.addChild(c_1);
    // root_s_1.addChild(B_1);
    // A_1.addChild(a_1);
    // A_1.addChild(A_2);
    // A_1.addChild(a_2);
    
    // tr.layout();
    av.step();

    av.recorded();
    });
    