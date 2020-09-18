$(document).ready(function () {
  "use strict";
  var av_name = "AmbiguityFF";
  var av = new JSAV(av_name,);
  var Frames = PIFRAMES.init(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object
  var goNext = false;

  //frame 1
  av.umsg("$\\textbf {Definition}$: A CFG $G$ is ambiguous if $\\exists$ some $w\\in L(G)$ which has two distinct derivation trees.");
  av.displayInit();

  //frame 2
  av.umsg(Frames.addQuestion("q2"));
  var tr = av.ds.tree({nodegap: 15, left: 0, top: 100});
  var root_s_1 = tr.root("E");
  var E_1 = tr.newNode("E");
  var E_2 = tr.newNode("E");
  var E_3 = tr.newNode("E");
  var E_4 = tr.newNode("E");
  var I_1 = tr.newNode("I");
  var I_2 = tr.newNode("I");
  var I_3 = tr.newNode("I");
  var a_1 = tr.newNode("a");
  var a_2 = tr.newNode("a");
  var b_1 = tr.newNode("b");
  var plus = tr.newNode("+");
  var multiple = tr.newNode("*");
  var r1 = root_s_1.addChild(E_1);
  var r2 = root_s_1.addChild(plus);
  var r3 = root_s_1.addChild(E_2);
  var r4 = E_1.addChild(I_1);
  var r5 = I_1.addChild(a_2);
  var r6 = E_2.addChild(E_3);
  var r7 = E_2.addChild(multiple);
  var r8 = E_2.addChild(E_4);
  var r9 = E_3.addChild(I_2);
  var r10 = I_2.addChild(b_1);
  var r11 = E_4.addChild(I_3);
  var r12 = I_3.addChild(a_1);
  
  tr.layout();
  av.step();

  //frame 3
  av.umsg(Frames.addQuestion("q3"));
  av.step();

  //frame 4
  av.umsg(Frames.addQuestion("q4"));
  av.step();

  //frame 5
  av.umsg(Frames.addQuestion("q5"));
  av.step();


  //frame 6
  av.umsg(Frames.addQuestion("q6"));
  tr.hide();
  var tr2 = av.ds.tree({nodegap: 15, left: 250, top: 100});
  var root_s = tr2.root("E");
  var E1 = tr2.newNode("E");
  var E2 = tr2.newNode("E");
  var E3 = tr2.newNode("E");
  var E4 = tr2.newNode("E");
  var I1 = tr2.newNode("I");
  var I2 = tr2.newNode("I");
  var I3 = tr2.newNode("I");
  var a1 = tr2.newNode("a");
  var a2 = tr2.newNode("a");
  var b1 = tr2.newNode("b");
  var plu = tr2.newNode("+");
  var mult = tr2.newNode("*");
  var r13 = root_s.addChild(E1);
  var r14 = root_s.addChild(mult);
  var r15 = root_s.addChild(E2);
  var r16 = E2.addChild(I1);
  var r17 = I1.addChild(a2);
  var r18 = E1.addChild(E3);
  var r19 = E1.addChild(plu);
  var r20 = E1.addChild(E4);
  var r21 = E3.addChild(I2);
  var r22 = I2.addChild(b1);
  var r23 = E4.addChild(I3);
  var r24 = I3.addChild(a1);
  
  tr2.layout();

  av.step();

  //frame 7
  av.umsg(Frames.addQuestion("q7"));
  av.step();

  //frame 8
  av.umsg(Frames.addQuestion("q8"));
  tr.show();
  av.step();

  //frame 9
  av.umsg(Frames.addQuestion("q9"));
  av.step();

  //frame 10
  av.umsg("Compilers can not decide which parse tree is the correct one. Compilers only work with unambiguous grammars. So, in case we have an ambiguous grammar, we should rewrite the grammar to remove the ambiguity.");
  av.step();

  //frame 11
  av.umsg("Unfortunaitly, there is no algorithm to remove ambiguity. But there are some common tricks");
  av.step();

  //frame 12
  av.umsg(Frames.addQuestion("q12"));
  av.step();

  //frame 13
  av.umsg(Frames.addQuestion("q13"));
  av.step();

  //frame 14
  av.umsg(Frames.addQuestion("q14"));
  av.step();

  //frame 15
  av.umsg(Frames.addQuestion("q15"));
  av.step();

  //frame 16
  av.umsg(Frames.addQuestion("q16"));
  av.step();

  //frame 17
  av.umsg("Unfortunaitly, there is no algorithm to remove ambiguity. But there are some common tricks<br/>Operator precedence<br/>Operator associativity<br/>Rewrite the grammar from scratch");
  av.step();

  //fram 18
  av.umsg("By looking at the grammar $G=(\\{E,I\\},\\{a,b,+,∗,(,)\\},E,P)$,$P$=<br> $E \\rightarrow E+E | E*E | (E) | I$ <br>    $I\\rightarrow a | b$, we will notice that there are two different results for the expression $2+4*2$.");
  av.step();

  //fram 19
  av.umsg("By looking at the grammar $G=(\\{E,I\\},\\{a,b,+,∗,(,)\\},E,P)$,$P$=<br> $E \\rightarrow E+E | E*E | (E) | I$ <br>    $I\\rightarrow a | b$, we will notice that there are two different results for the expression $2+4*2$.<br/>The difference came from which operator we evaluated first.");
  av.step();

  //fram 20
  av.umsg("By looking at the grammar $G=(\\{E,I\\},\\{a,b,+,∗,(,)\\},E,P)$,$P$=<br> $E \\rightarrow E+E | E*E | (E) | I$ <br>    $I\\rightarrow a | b$, we will notice that there are two different results for the expression $2+4*2$.<br/>The difference came from which operator we evaluated first. The first tree, we can see that the multiplication sign was deeper in the tree. So we must evaluate it before evaluationg the addition, this gives the multiplication higer precedence than addition.");
  tr.show();
  av.step();

  //fram 21
  av.umsg("By looking at the grammar $G=(\\{E,I\\},\\{a,b,+,∗,(,)\\},E,P)$,$P$=<br> $E \\rightarrow E+E | E*E | (E) | I$ <br>    $I\\rightarrow a | b$, we will notice that there are two different results for the expression $2+4*2$.<br/>The difference came from which operator we evaluated first. In the other parse tree, the addition was deepre than the multiplication, and in this cas, we gave addition higer precedence than multiplication");
  tr.hide();
  tr2.show();
  av.step();

  //fram 22
  av.umsg(Frames.addQuestion("q22"));
  tr2.hide();
  av.step();

  //fram 23
  av.umsg(Frames.addQuestion("q23"));
  av.step();

  //frame 24
  av.umsg("Rewrite the grammar as an unambiguous grammar. (Specifically, with the meaning that multiplication has higher precedence than addition.) <br> $E\\rightarrow E+T$ | $T$<br>    $T\\rightarrow T∗*$ | $F$<br>  $F\\rightarrow I$ | $(E)$<br>$I\\rightarrow a$ | $b$ <br>There is only one derivation tree for $a+b∗a$:")
  tr2.hide();
  tr.hide();
  var tr3 = av.ds.tree({nodegap: 15, left: 250, top: 100});
  var root_E = tr3.root("E");
  var E = tr3.newNode("E");
  
  var T = tr3.newNode("T");
  var mul = tr3.newNode("*");
  var pl = tr3.newNode("+");
  var TT = tr3.newNode("T");
  var TTT = tr3.newNode("T");
  var F = tr3.newNode("F");
  var FF = tr3.newNode("F");
  var FFF = tr3.newNode("F");
  var I = tr3.newNode("I");
  var II = tr3.newNode("I");
  var III = tr3.newNode("I");
  var a = tr3.newNode("a");
  var aa = tr3.newNode("a");
  var b = tr3.newNode("b");
  var r25 = root_E.addChild(E);
  var r26 = root_E.addChild(pl);
  var r27 = root_E.addChild(T);
  var r28 = E.addChild(TT);
  var r29 = TT.addChild(FF);
  var r30 = FF.addChild(II);
  var r31 = II.addChild(aa);
  var r32 = T.addChild(TTT);
  var r33 = T.addChild(mul);
  var r34 = T.addChild(F);
  var r35 = TTT.addChild(FFF);
  var r36 = FFF.addChild(III);
  var r37 = III.addChild(b);
  var r38 = F.addChild(I);
  var r39 = I.addChild(a);
  // tr3.layout();
  tr3.layout();
  av.step();

  //frame 25
  av.umsg(Frames.addQuestion("q25"));
  av.step();

  //frame 26
  av.umsg("Try to get a derivation tree with the other meaning of $a+b*c$, when * is closer to the root of the tree.<br> $E\\Rightarrow T\\Rightarrow T*F...$ Then the only way to include a '+' before the multiplication is if the addition is enclosed in parenthesis. Thus, there is only one meaning that is accepted.")

  av.step();

  //frame 27
  av.umsg(Frames.addQuestion("q27"));
  tr3.hide();
  av.step();

  //frame 28
  av.umsg("Completed");
  av.recorded();
});
