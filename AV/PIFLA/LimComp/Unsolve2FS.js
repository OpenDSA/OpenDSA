$(document).ready(function(){
  "use strict";
  //initialize 
  var clearlist1 = new Array();
  var left = 10;
  var topSpace = 125;
  var i, j;
  var input;
  var iparr;
  var pair1;
  var pair2;
  var pair11;
  var pair21;
  var pairs;
  var oparr;
  var paired;
  var line1;
  var yoffset = 20;
  var av_name = "Unsolve2FS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  //this is diplay initially because the image will not show if the message is also display initially
  for (i = 0; i < 5; i++) {
    clearlist1.push(av.label(String(i + 1), {left: left + 50 + i * 100, top: topSpace + 5}));
    clearlist1.push(av.g.line(left + 5 + i * 100, topSpace + 40, left + 5 + i * 100, topSpace + 300));
  }
  clearlist1.push(av.g.line(left + 5, topSpace + 40, left + 470, topSpace + 40));
  clearlist1.push(av.g.line(left + 5, topSpace + 300, left + 470, topSpace + 300));
  var f3nums = [7, 9, 11, 13, 15, 17];
  var f4nums = [15, 1, 7, 13, 2, 7];

  //4 columns
  for (i = 0; i < 4; i++) {
    clearlist1.push(av.g.line(left + 55 + i * 100, topSpace + 60, left + 55 + i * 100, topSpace + 280));
    clearlist1.push(av.g.line(left + 15 + i * 100, topSpace + 80, left + 95 + i * 100, topSpace + 80));
    clearlist1.push(av.label("$x$", {left: left + 30 + i * 100, top: topSpace + 40}));
    clearlist1.push(av.label("$f_" + String(i + 1) + "(x)$", {left: left + 65 + i * 100, top: topSpace + 40}));

    //numbers
    for (j = 0; j < 6; j++) {
      var tempclear = av.label(String(j + 1), {left: left + 30 + i * 100, top: topSpace + 70 + j * 27});
      clearlist1.push(tempclear);
      if (i === 0) {
        tempclear = av.label(String(1), {left: left + 70 + i * 100, top: topSpace + 70 + j * 27});
      } else if (i === 1) {
        tempclear = av.label(String(j + 1), {left: left + 70 + i * 100, top: topSpace + 70 + j * 27});
      } else if (i === 2) {
        if (String(f3nums[j]).length === 2) {
          tempclear = av.label(String(f3nums[j]), {left: left + 66 + i * 100, top: topSpace + 70 + j * 27});
        } else {
          tempclear = av.label(String(f3nums[j]), {left: left + 70 + i * 100, top: topSpace + 70 + j * 27});
        }
      } else if (String(f4nums[j]).length === 2) {
        tempclear = av.label(String(f4nums[j]), {left: left + 66 + i * 100, top: topSpace + 70 + j * 27});
      } else {
        tempclear = av.label(String(f4nums[j]), {left: left + 72 + i * 100, top: topSpace + 70 + j * 27});
      }
      clearlist1.push(tempclear);
    }

    //dots at below
    if (i === 0) {
      clearlist1.push(av.g.circle(left + 35 + i * 100, topSpace + 250, 2));
    } else {
      clearlist1.push(av.g.circle(left + 35 + i * 100, topSpace + 250, 2, {fill: "black"}));
    }
    clearlist1.push(av.g.circle(left + 35 + i * 100, topSpace + 260, 2, {fill: "black"}));
    clearlist1.push(av.g.circle(left + 35 + i * 100, topSpace + 270, 2, {fill: "black"}));
    clearlist1.push(av.g.circle(left + 75 + i * 100, topSpace + 250, 2, {fill: "black"}));
    clearlist1.push(av.g.circle(left + 75 + i * 100, topSpace + 260, 2, {fill: "black"}));
    clearlist1.push(av.g.circle(left + 75 + i * 100, topSpace + 270, 2, {fill: "black"}));
  }
  av.umsg("<b>The Halting Problem Is Unsolvable</b><br><br>There might be intellectual appeal to knowing that there exists <b>some</b> function that cannot be computed by a computer program But does it really matter if no program can compute a \"nonsense\" function such as the one shown in Bin 4 of the figure?");
  av.displayInit();

  // Frame 2
  av.umsg("That alone doesn't have to mean that there is a <b>useful</b> function that cannot be computed. After all, the universe should not be this perverse, should it? Perhaps the very fact that we can easily specify the function that we want to compute implies that there must be an algorithm to compute it.<br><br>Unfortunately, not so. Now we will prove that the Halting Problem cannot be computed by any computer program. The proof is by contradiction.");
  av.step();

  // Frame 3
  av.umsg("We begin by assuming that there is a function named <tt>halt</tt> that can solve the Halting Problem. Obviously, it is not possible to write out something that does not exist, but here is a plausible sketch of what a function to solve the Halting Problem might look like if it did exist.");
  for (var j = 0; j < clearlist1.length; j++){
    clearlist1[j].hide();
  }
  av.step();

  // Frame 4
  av.umsg("Function <tt>halt</tt> takes two inputs: a string representing the source code for a program or function, and another string representing the input that we wish to determine if the input program or function halts on.<br/><br/>Function <tt>halt</tt> does some work to make a decision (which is encapsulated into some fictitious function named PROGRAM_HALTS). Function <tt>halt</tt> then returns TRUE if the input program or function does halt on the given input, and FALSE otherwise.<br><br><br><br><b>bool</b> halt(String prog, String input) {<br>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;<b>if</b> (PROGRAM_HALTS(prog, input))<br>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <b>return true</b>;<br>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;<b>else</b><br>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <b>return</b> false;<br>&nbsp;&nbsp;}");
  av.step();

  // Frame 5
  av.umsg("We now will examine two simple functions that clearly can exist because the complete code for them is presented here.<br><br> // Return true if \"prog\" halts when given itself as input<br> <b>bool</b> selfhalt(String prog) {<br>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;<b>if</b> (halt(prog, prog))<br>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <b>return</b> true;<br>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;<b>else</b><br>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <b>return</b> false;<br> }<br><br> // Return the reverse of what selfhalt returns on \"prog\"<br> <b>void</b> contrary(String prog) {<br>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;<b>if</b> (selfhalt(prog))<br>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <b>while (true)</b>; // Go into an infinite loop<br> }")
  av.step();

  // Frame 6
  av.umsg("What happens if we make a program whose sole purpose is to execute the function <tt>contrary</tt> and run that program with itself as input?<br><br> One possibility is that the call to function <tt>selfhalt</tt> returns TRUE; that is, <tt>selfhalt</tt> claims that <tt>contrary</tt> will halt when run on itself. In that case, <tt>contrary</tt> goes into an infinite loop (and thus does not halt).<br/><br/>On the other hand, if <tt>selfhalt</tt> returns FALSE, then <tt>halt</tt> is proclaiming that <tt>contrary</tt> does not halt on itself, and <tt>contrary</tt> then returns, that is, it halts. Thus, <tt>contrary</tt> does the contrary of what <tt>halt</tt> says that it will do.");
  av.step();

  // Frame 7
  av.umsg("The action of <tt>contrary</tt> is logically inconsistent with the assumption that <tt>halt</tt> solves the Halting Problem correctly. There are no other assumptions we made that might cause this inconsistency. Thus, by contradiction, we have proved that <tt>halt</tt> cannot solve the Halting Problem correctly, and thus there is no program that can solve the Halting Problem.");
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("unsolveable"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("reduction"));
  av.step();

  // Frame 10
  av.umsg("<b>Example 1</b><br/><br/>Consider the following variation on the Halting Problem. Given a computer program, will it halt when its input is the empty string? That is, will it halt when it is given no input? To prove that this problem is unsolvable, we will employ a standard technique for computability proofs: Use a computer program to modify another computer program.");
  av.step();

  // Frame 11
  av.umsg("<b>Proof by contradiction:</b><br><br>Assume that there is a function <i>Ehalt</i> that determines whether a given program halts when given no input. Recall that our proof for the Halting Problem involved functions that took as parameters a string representing a program and another string representing an input.<br><br> Consider another function combine that takes a program <i>P</i> and an input string <i>I</i> as parameters. Function combine modifies <i>P</i> to store <i>I</i> as a static variable <i>S</i> and further modifies all calls to input functions within <i>P</i> to instead get their input from <i>S</i>. Call the resulting program <i>P′</i>. It should take no stretch of the imagination to believe that any decent compiler could be modified to take computer programs and input strings and produce a new computer program that has been modified in this way. <br><br>Now, take <i>P′</i> and feed it to Ehalt. If Ehalt says that <i>P′</i> will halt, then we know that <i>P</i> would halt on input <i>I</i>. In other words, we now have a procedure for solving the original Halting Problem. The only assumption that we made was the existence of <i>Ehalt</i>. Thus, the problem of determining if a program will halt on no input must be unsolvable.");
  av.step();

  // Frame 12
  av.umsg("<b>Example 2</b><br><br>For arbitrary program <i>P</i>, does there exist <b>any</b> input for which <i>P</i> halts?");
  av.step();

  // Frame 13
  av.umsg("<b>Proof by contradiction:</b><br><br>This problem is also uncomputable. Assume that we had a function <i>Ahalt</i> that, when given program <i>P</i> as input would determine if there is some input for which <i>P</i> halts. We could modify our compiler (or write a function as part of a program) to take <i>P</i> and some input string <i>w</i>, and modify it so that <i>w</i> is hardcoded inside <i>P</i>, with <i>P</i> reading no input. Call this modified program <i>P′</i>. <br><br>Now, <i>P′</i> always behaves the same way regardless of its input, because it ignores all input. However, because <i>w</i> is now hardwired inside of <i>P′</i>, the behavior we get is that of <i>P</i> when given <i>w</i> as input. <br><br>So, <i>P′</i> will halt on any arbitrary input if and only if <i>P</i> would halt on input <i>w</i>. We now feed <i>P′</i> to function Ahalt. If Ahalt could determine that <i>P′</i> halts on some input, then that is the same as determining that <i>P</i> halts on input <i>w</i>. But we know that that is impossible. Therefore, <i>Ahalt</i> cannot exist.");
  av.step();

  // Frame 14
  av.umsg("There are many things that we would like to have a computer do that are unsolvable. Many of these have to do with program behavior. For example, proving that an arbitrary program is \"correct\", that is, proving that a program computes a particular function, is a proof regarding program behavior. As such, what can be accomplished is severely limited. Some other unsolvable problems include:<br><br> &bull; Does a program halt on every input?<br><br> &bull; Does a program compute a particular function?<br><br> &bull; Do two programs compute the same function?<br><br> &bull; Does a particular line in a program get executed?");
  av.step();

  // Frame 15
  av.umsg(Frames.addQuestion("special"));
  av.step();

  // Frame 16
  av.umsg(Frames.addQuestion("line"));
  av.step();

  // Frame 17
  av.umsg("Another unsolvable problem is whether a program contains a computer virus. The property \"contains a computer virus\" is a matter of behavior. Thus, it is not possible to determine positively whether an arbitrary program contains a computer virus. ");
  av.step();

  // Frame 18
  av.umsg("Fortunately, there are many good heuristics for determining if a program is likely to contain a virus, and it is usually possible to determine if a program contains a particular virus, at least for the ones that are now known. Real virus checkers do a pretty good job, but, it will always be possible for malicious people to invent new viruses that no existing virus checker can recognize.");
  av.step();

  // Frame 19
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
