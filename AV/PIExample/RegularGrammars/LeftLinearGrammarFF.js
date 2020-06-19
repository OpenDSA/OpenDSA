$(document).ready(function() {
  "use strict";
  var av_name = "LeftLinearGrammarFF";
  var av = new JSAV(av_name);
  
  var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object

  //frame 1
  av.umsg("In previous modules, we studied how to convert an NFA to Right Regular Grammar, and how to convert Right Regular Grammars to NFA. In this module we will learn about converting Right Linear Grammars to Left Regular Grammars");
  av.displayInit();
  av.umsg("We will construct an algorithm to convert any Right Linear grammar to a Left Linear grammar.");
  av.step();
  av.umsg("During the construction of the algorithm, we will convert the following grammr to Left Linear Grammar.");
  var matrixOptions = {
    left: 10,
    top:0,
    width: 300,
    height: 250
};
  var grammer =  "[\
    [\"S\",\"→\",\"aS\"],\
    [\"S\",\"→\",\"cA\"],\
    [\"A\",\"→\",\"bA\"],\
    [\"A\",\"→\",\"bF\"],\
    [\"F\",\"→\",\"λ\"]\
  ]";
  var GToFAConverter = new GrammarToFAConverter(av,grammer,matrixOptions);
  av.step();
  av.umsg("Since the Language $L$ has a Right Linear grammar, we can follow ``NFA from Regular Grammar'' proof in the previous modules to construct an NFA for the language.");
  var NFAoptions = {
    top: 250,
    left: 70,
    width: 500,
    height: 250
  };
  var NFA = gToFAConverterWithQuestion(av_name, GToFAConverter, NFAoptions, {top: 10, left: -50});
  av.step();
  av.umsg("Then resulting NFA (call it $NFA_{rev}$) will represent the reverse of the original Language, $L^R$.");
  av.step();
  av.umsg("We can follow the ``RR Grammar from DFA'' proof from the slides to get the right linear grammar for $NFA_{rev}$. Thus, we have the right linear grammar for $L^R$.");
  av.step();
  av.umsg("By reversing each production in the resulting Right Linear grammar, we will get the the Left Linear grammar for the reverse of $L^R$. So, we have the Left Linear grammar for $(L^R)^R = L$.");
  av.recorded();
  
});
