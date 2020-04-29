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
  var av_name = "UnsolveableProblems2";
  var av = new JSAV(av_name);


var Frames = PIFRAMES.init(av_name);
var config = ODSA.UTILS.loadConfig({av_name: av_name}),
interpret = config.interpreter, // get the interpreter
code = config.code;             // get the code object
var goNext = false;


//frame 1
av.umsg("<b>The Halting Problem Is Unsolvable</b>");
av.displayInit();

//frame 1

av.umsg("<br>There might be intellectual appeal to knowing that there exists <b>some</b> function that cannot be computed by a computer program But does it really matter if no program can compute a \"nonsense\" function such as the one shown in Bin 4 of Figure 0.13.1? That alone doesn't have to mean that there is a <b>useful</b> function that cannot be computed. After all, the universe should not be this perverse, should it? Perhaps the very fact that we can easily specify the function that we want to compute implies that there must be an algorithm to compute it.<br><br>Unfortunately, not so. Now we will prove that the Halting Problem cannot be computed by any computer program. The proof is by contradiction.<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; Figure 0.13.1: An illustration of assigning functions to bins.");

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
av.step();



//frame 3
for (var j = 0; j < clearlist1.length; j++){
    clearlist1[j].hide();
  }
av.umsg("<br>We begin by assuming that there is a function named halt that can solve the Halting Problem. Obviously, it is not possible to write out something that does not exist, but here is a plausible sketch of what a function to solve the Halting Problem might look like if it did exist. Function halt takes two inputs: a string representing the source code for a program or function, and another string representing the input that we wish to determine if the input program or function halts on. Function halt does some work to make a decision (which is encapsulated into some fictitious function named PROGRAM_HALTS). Function halt then returns TRUE if the input program or function does halt on the given input, and FALSE otherwise.");
av.step();



//frame 4
av.umsg("bool halt(String prog, String input) {<br>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;if (PROGRAM_HALTS(prog, input))<br>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; return true;<br>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;else<br>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; return false;<br>&nbsp;&nbsp;}");
av.step();


//frame 5
av.umsg("We now will examine two simple functions that clearly can exist because the complete code for them is presented here.<br><br> // Return true if \"prog\" halts when given itself as input<br> bool selfhalt(String prog) {<br>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;if (halt(prog, prog))<br>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; return true;<br>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;else<br>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; return false;<br> }<br><br> // Return the reverse of what selfhalt returns on \"prog\"<br> void contrary(String prog) {<br>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;if (selfhalt(prog))<br>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; while (true); // Go into an infinite loop<br> }")
av.step();


//frame 6
av.umsg("What happens if we make a program whose sole purpose is to execute the function contrary and run that program with itself as input? One possibility is that the call to selfhalt returns TRUE; that is, selfhalt claims that contrary will halt when run on itself. In that case, contrary goes into an infinite loop (and thus does not halt). On the other hand, if selfhalt returns FALSE, then halt is proclaiming that contrary does not halt on itself, and contrary then returns, that is, it halts. Thus, contrary does the contrary of what halt says that it will do.");
av.step();


//frame 7
av.umsg("The action of contrary is logically inconsistent with the assumption that halt solves the Halting Problem correctly. There are no other assumptions we made that might cause this inconsistency. Thus, by contradiction, we have proved that halt cannot solve the Halting Problem correctly, and thus there is no program that can solve the Halting Problem.<br><br> Now that we have proved that the Halting Problem is unsolvable, we can use reduction arguments to prove that other problems are also unsolvable. The strategy is to assume the existence of a computer program that solves the problem in question and use that program to solve another problem that is already known to be unsolvable.");
av.step();



//frame 8
av.umsg("<b>Example 0.13.1</b><br><br>Consider the following variation on the Halting Problem. Given a computer program, will it halt when its input is the empty string? That is, will it halt when it is given no input? To prove that this problem is unsolvable, we will employ a standard technique for computability proofs: Use a computer program to modify another computer program.<br><br><b>Proof by contradiction:</b><br><br>Assume that there is a function Ehalt that determines whether a given program halts when given no input. Recall that our proof for the Halting Problem involved functions that took as parameters a string representing a program and another string representing an input. Consider another function combine that takes a program P and an input string I as parameters. Function combine modifies P to store I as a static variable S and further modifies all calls to input functions within P to instead get their input from S. Call the resulting program P′. It should take no stretch of the imagination to believe that any decent compiler could be modified to take computer programs and input strings and produce a new computer program that has been modified in this way. Now, take P′ and feed it to Ehalt. If Ehalt says that P′ will halt, then we know that P would halt on input I. In other words, we now have a procedure for solving the original Halting Problem. The only assumption that we made was the existence of Ehalt. Thus, the problem of determining if a program will halt on no input must be unsolvable.");
av.step();







av.recorded();
});
