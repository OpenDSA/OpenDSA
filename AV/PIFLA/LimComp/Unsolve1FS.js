$(document).ready(function(){
  "use strict";
  //initialize 
  var clearlist1 = new Array();
  var left = 10;
  var topSpace = 70;
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
  var av_name = "Unsolve1FS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("<b>Introduction</b> <br><br> Even the best programmer sometimes writes a program that goes into an infinite loop. <br><br>Of course, when you run a program that has not stopped, you do not know for sure if it is just a slow program or a program in an infinite loop. After \"enough time\", you shut it down. ");
  av.displayInit();

  // Frame 2
  av.umsg("Wouldn't it be great if your compiler could look at your program and tell you before you run it that it will get into an infinite loop? <br><br>To be more specific, given a program and a particular input, it would be useful to know if executing the program on that input will result in an infinite loop without actually running the program.");
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("halt"));
  av.step();

  // Frame 4
  av.umsg("How can this be?<br/><br/>Programmers look at programs regularly to determine if they will halt. Surely this can be automated. As a warning to those who believe any program can be analyzed in this way, carefully examine the following code fragment before reading on.");
  av.step();

  // Frame 5
  av.umsg("The following is a famous piece of code. The sequence of values that is assigned to $n$ by this code is sometimes called the <b>Collatz sequence</b> for input value $n$. <br><br>Does this code fragment halt for all values of <i>n</i>? Nobody knows the answer. Every input that has been tried halts. <br><br>But does it always halt? Note that for this code fragment, because we do not know if it halts, we also do not know an upper bound for its running time. As for the lower bound, we can easily show $\\Omega(\\log n)$. <br><br><br><br><b>while</b> (n > 1)<br>&nbsp;&nbsp;<b>if</b> (ODD(n))<br>&nbsp;&nbsp;&nbsp;&nbsp;n = 3 * n + 1;<br>&nbsp;&nbsp;<b>else</b><br>&nbsp;&nbsp;&nbsp;&nbsp;n = n / 2;");
  av.step();

  // Frame 6
  av.umsg("Personally, I have faith that someday some smart person will completely analyze the Collatz function, proving once and for all that the code fragment halts for all values of $n$. Doing so may well give us techniques that advance our ability to do algorithm analysis in general.<br><br> Unfortunately, proofs from <i>computability</i>---the branch of computer science that studies what is impossible to do with a computer---compel us to believe that there will always be another bit of program code that we cannot analyze. This comes as a result of the fact that the Halting Problem is unsolvable.");
  av.step();

  // Frame 7
  av.umsg("<b>Uncountability</b><br/><br/>Before proving that the Halting Problem is unsolvable, we first prove that not all functions can be implemented as a computer program. This must be so because the number of programs is much smaller than the number of possible functions.");
  av.step();

  // Frame 8
  av.umsg(Frames.addQuestion("countable"));
  av.step();

  // Frame 9
  av.umsg(Frames.addQuestion("uncountable"));
  av.step();

  // Frame 10
  av.umsg("<br>To understand what is meant when we say \"assigned to a positive integer\", imagine that there is an infinite row of bins, labeled 1, 2, 3, and so on. Take a set and start placing members of the set into bins, with at most one member per bin. <br><br>If we can find a way to assign all of the set members to bins, then the set is countable. <br><br>For example, consider the set of positive even integers 2, 4, and so on. We can assign an integer <i>i</i> to bin <i>i</i>/<i>2</i> (or, if we don't mind skipping some bins, then we can assign even number <i>i</i> to bin <i>i</i>). Thus, the set of even integers is countable. ");
  av.step();

  // Frame 11
  av.umsg("This should be no surprise, because intuitively there are \"fewer\" positive even integers than there are positive integers, even though both are infinite sets. <br><br>But there are not really any more positive integers than there are positive even integers, because we can uniquely assign every positive integer to some positive even integer by simply assigning positive integer <i>i</i> to positive even integer <i>2i</i>.");
  av.step();

  // Frame 12
  av.umsg("On the other hand, the set of all integers is also countable, even though this set appears to be bigger than the set of positive integers. This is true because we can assign 0 to positive integer 1, 1 to positive integer 2, -1 to positive integer 3, 2 to positive integer 4, -2 to positive integer 5, and so on. <br><br>In general, assign positive integer value i to positive integer value 2i, and assign negative integer value −i to positive integer value 2i+1. We will never run out of positive integers to assign, and we know exactly which positive integer every integer is assigned to. <br><br>Because every integer gets an assignment, the set of integers is countably infinite.");
  av.step();

  // Frame 13
  av.umsg("Is the number of programs countable or uncountable?")
  av.step();

  // Frame 14
  av.umsg("A program can be viewed as simply a string of characters (including special punctuation, spaces, and line breaks<br/><br/>Let us assume that the number of different characters that can appear in a program is P. (Using the ASCII character set, P must be less than 128, but the actual number does not matter). <br><br>If the number of strings is countable, then surely the number of programs is also countable. We can assign strings to the bins as follows. <br><br>Assign the null string to the first bin. Now, take all strings of one character, and assign them to the next P bins in \"alphabetic\" or ASCII code order. <br><br>Next, take all strings of two characters, and assign them to the next P2 bins, again in ASCII code order working from left to right. Strings of three characters are likewise assigned to bins, then strings of length four, and so on. In this way, a string of any given length can be assigned to some bin.");
  av.step();


  // Frame 15
  av.umsg(Frames.addQuestion("programs"));
  av.step();

  // Frame 16
  av.umsg("Now we consider the number of possible functions. To keep things simple, assume that all functions take a single positive integer as input and yield a single positive integer as output. We will call such functions integer functions. A function is simply a mapping from input values to output values.");
  av.step();

  // Frame 17
  av.umsg("Of course, not all computer programs literally take integers as input and yield integers as output. <br><br>However, everything that computers read and write is essentially a series of numbers, which may be interpreted as letters or something else. Any useful computer program's input and output can be coded as integer values, so our simple model of computer input and output is sufficiently general to cover all possible computer programs.");
  av.step();

  // Frame 18
  av.umsg("We now wish to see if it is possible to assign all of the integer functions to the infinite set of bins. If so, then the number of functions is countable, and it might then be possible to assign every integer function to a program. If the set of integer functions cannot be assigned to bins, then there will be integer functions that must have no corresponding program.");
  av.step();

  // Frame 19
  av.umsg("Imagine each integer function as a table with two columns and an infinite number of rows. The first column lists the positive integers starting at 1. The second column lists the output of the function when given the value in the first column as input. Thus, the table explicitly describes the mapping from input to output for each function. Call this a function table.");
  av.step();

  // Frame 20
  av.umsg("Next we will try to assign function tables to bins. To do so we must order the functions, but it does not matter what order we choose.");
  av.step();

  // Frame 21
  av.umsg("For example, Bin 1 could store the function that always returns 1 regardless of the input value. Bin 2 could store the function that returns its input. <br><br>Bin 3 could store the function that doubles its input and adds 5. Bin 4 could store a function for which we can see no simple relationship between input and output. These four functions as assigned to the first four bins are shown in the figure.");

  for (i = 0; i < 5; i++) {
    clearlist1.push(av.label(String(i + 1), {left: left + 40 + i * 80, top: topSpace + 5}));
    clearlist1.push(av.g.line(left + i * 80, topSpace + 40, left + i * 80, topSpace + 300));
  }
  clearlist1.push(av.g.line(left, topSpace + 40, left + 380, topSpace + 40));
  clearlist1.push(av.g.line(left, topSpace + 300, left + 380, topSpace + 300));
  var f3nums = [7, 9, 11, 13, 15, 17];
  var f4nums = [15, 1, 7, 13, 2, 7];

  // 4 columns
  for (i = 0; i < 4; i++) {
    clearlist1.push(av.g.line(left + 35 + i * 80, topSpace + 60, left + 35 + i * 80, topSpace + 280));
    clearlist1.push(av.g.line(left + 5 + i * 80, topSpace + 80, left + 70 + i * 80, topSpace + 80));
    clearlist1.push(av.label("$x$", {left: left + 15 + i * 80, top: topSpace + 40}));
    clearlist1.push(av.label("$f_" + String(i + 1) + "(x)$", {left: left + 40 + i * 80, top: topSpace + 40}));

    //numbers
    for (j = 0; j < 6; j++) {
      var tempclear = av.label(String(j + 1), {left: left + 15 + i * 80, top: topSpace + 70 + j * 27});
      clearlist1.push(tempclear);
      if (i === 0) {
        tempclear = av.label(String(1), {left: left + 55 + i * 80, top: topSpace + 70 + j * 27});
      } else if (i === 1) {
        tempclear = av.label(String(j + 1), {left: left + 55 + i * 80, top: topSpace + 70 + j * 27});
      } else if (i === 2) {
        if (String(f3nums[j]).length === 2) {
          tempclear = av.label(String(f3nums[j]), {left: left + 50 + i * 80, top: topSpace + 70 + j * 27});
        } else {
          tempclear = av.label(String(f3nums[j]), {left: left + 55 + i * 80, top: topSpace + 70 + j * 27});
        }
      } else if (String(f4nums[j]).length === 2) {
        tempclear = av.label(String(f4nums[j]), {left: left + 50 + i * 80, top: topSpace + 70 + j * 27});
      } else {
        tempclear = av.label(String(f4nums[j]), {left: left + 55 + i * 80, top: topSpace + 70 + j * 27});
      }
      clearlist1.push(tempclear);
    }

    //dots at below
    if (i === 0) {
      clearlist1.push(av.g.circle(left + 20 + i * 80, topSpace + 250, 2));
    } else {
      clearlist1.push(av.g.circle(left + 20 + i * 80, topSpace + 250, 2, {fill: "black"}));
    }
    clearlist1.push(av.g.circle(left + 20 + i * 80, topSpace + 260, 2, {fill: "black"}));
    clearlist1.push(av.g.circle(left + 20 + i * 80, topSpace + 270, 2, {fill: "black"}));
    clearlist1.push(av.g.circle(left + 60 + i * 80, topSpace + 250, 2, {fill: "black"}));
    clearlist1.push(av.g.circle(left + 60 + i * 80, topSpace + 260, 2, {fill: "black"}));
    clearlist1.push(av.g.circle(left + 60 + i * 80, topSpace + 270, 2, {fill: "black"}));
  }
  av.step();

  // Frame 22
  av.umsg(Frames.addQuestion("functions"));
  av.step();

  // Frame 23
  topSpace = 70;
  left = 0;
  av.umsg("Take the output value for input 1 from the function in the first bin. Call this value F<sub>1</sub>(1). Add 1 to it, and assign the result as the output of a new function for input value 1. Regardless of the remaining values assigned to our new function, it must be different from the first function in the table, because the two give different outputs for input 1.");

  // addtional column
  clearlist1.push(av.g.line(left + 400, topSpace + 40, left + 500, topSpace + 40));
  clearlist1.push(av.g.line(left + 400, topSpace + 300, left + 500, topSpace + 300));
  clearlist1.push(av.g.line(left + 400, topSpace + 40, left + 400, topSpace + 300));
  clearlist1.push(av.g.line(left + 445, topSpace + 60, left + 445, topSpace + 280));
  clearlist1.push(av.g.line(left + 410, topSpace + 80, left + 495, topSpace + 80));
  clearlist1.push(av.label("$x$", {left: left + 425, top: topSpace + 40}));
  clearlist1.push(av.label("$f_{new}(x)$", {left: left + 450, top: topSpace + 40}));
  for (i = 0; i < 6; i++) {
    tempclear = av.label(String(i + 1), {left: left + 425, top: topSpace + 70 + i * 27});
    clearlist1.push(tempclear);
  }
  clearlist1.push(av.label(String(2), {left: left + 465, top: topSpace + 70}));
  clearlist1.push(av.label(String(3), {left: left + 465, top: topSpace + 70 + 27}));
  clearlist1.push(av.label(String(12), {left: left + 465, top: topSpace + 70 + 2 * 27}));
  clearlist1.push(av.label(String(14), {left: left + 465, top: topSpace + 70 + 3 * 27}));
  clearlist1.push(av.g.circle(left + 435, topSpace + 250, 2, {fill: "black"}));
  clearlist1.push(av.g.circle(left + 435, topSpace + 260, 2, {fill: "black"}));
  clearlist1.push(av.g.circle(left + 435, topSpace + 270, 2, {fill: "black"}));
  clearlist1.push(av.g.circle(left + 475, topSpace + 250, 2, {fill: "black"}));
  clearlist1.push(av.g.circle(left + 475, topSpace + 260, 2, {fill: "black"}));
  clearlist1.push(av.g.circle(left + 475, topSpace + 270, 2, {fill: "black"}));

  // Arrows
  for (i = 0; i < 5; i++) {
    tempclear = av.g.polyline([[left + 440, topSpace + 87 + i * 27], [left + 440, topSpace + 97 + i * 27], [left + 455, topSpace + 92 + i * 27]], {fill: "black"});
    clearlist1.push(tempclear);
  }
  // Circles and lines that connected to the arrows
  clearlist1.push(av.g.circle(left + 70, topSpace + 93, 10));
  clearlist1.push(av.g.circle(left + 150, topSpace + 120, 10));
  clearlist1.push(av.g.circle(left + 230, topSpace + 147, 10));
  clearlist1.push(av.g.circle(left + 310, topSpace + 174, 10));
  clearlist1.push(av.g.circle(left + 360, topSpace + 201, 10));
  clearlist1.push(av.g.line(left + 80, topSpace + 93, left + 450, topSpace + 93));
  clearlist1.push(av.g.line(left + 160, topSpace + 120, left + 450, topSpace + 120));
  clearlist1.push(av.g.line(left + 240, topSpace + 147, left + 450, topSpace + 147));
  clearlist1.push(av.g.line(left + 320, topSpace + 174, left + 450, topSpace + 174));
  clearlist1.push(av.g.line(left + 370, topSpace + 201, left + 450, topSpace + 201));
  av.step();

  // Frame 24
  av.umsg("Now take the output value for 2 from the second function in the table (known as F<sub>2</sub>(2)). Add 1 to this value and assign it as the output for 2 in our new function. Thus, our new function must be different from the function of Bin 2, because they will differ at least at the second value. Continue in this manner, assigning F<sub>new</sub>(i) = F<sub>i</sub>(i) + 1 for all values i. Thus, the new function must be different from any function F<sub>i</sub> at least at position i.");
  av.step();

  // Frame 25
  av.umsg("This procedure for constructing a new function not already in the table is called diagonalization. Because the new function is different from every other function, it must not be in the table. This is true no matter how we try to assign functions to bins, and so the number of integer functions is uncountable. The significance of this is that not all functions can possibly be assigned to programs, so there must be functions with no corresponding program. The figure illustrates this argument.");
  av.step();

  // Frame 26
  for (var j = 0; j < clearlist1.length; j++){
    clearlist1[j].hide();
  }
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
