$(document).ready(function () {
  "use strict";
  var av_name = "RLQuestionsCON";
  var av = new JSAV(av_name);
  
  // Frame 1
  av.umsg("Let's consider some useful questions that about regular languages that we can answer. We are going to assume that the statement '$L$ is a regular language' means in particular that we know how to implement $L$ as a DFA, NFA, RegEx, or regular grammar, whichever we prefer. As you work through these questions, take a moment to see if you know how to answer each one before going to the next slide to see the answer.");
  av.displayInit();
  
  // Frame 2
  av.umsg("Question 1. Suppose $L$ is a regular language. Given $L, \\Sigma, w \\in \\Sigma^*$, how can we determine whether or not $w \\in L$?");
  av.step();

  // Frame 3
  av.umsg("Question 1. Suppose $L$ is a regular language. Given $L, \\Sigma, w \\in \\Sigma^*$, how can we determine whether or not $w \\in L$?<br/><br/>Answer: Construct an FA for $L$ and test if it accepts $w$.");
  av.step();
  
  // Frame 4
  av.umsg("Question 2. Given regular language $L, \\Sigma, w \\in \\Sigma^*$, how can we determine if $L$ is empty?");
  av.step();

  // Frame 5
  av.umsg("Question 2. Given regular language $L$, how can we determine if $L$ is empty?<br/><br/>Answer: Construct an FA for $L$. If there is a path from the start state to any final state, then $L$ is not empty.");
  av.step();

  // Frame 6
  av.umsg("Question 3. Given regular language $L$, how can we determine if the complement of $L$ is regular?"),
  av.step();

  // Frame 7
  av.umsg("Question 3. Given regular language $L$, how can we determine if the complement of $L$ is regular?<br/><br/>Answer: Take a DFA for $L$ and reverse the final and non-final states. We have seen this one before.");
  av.step();

  // Frame 8
  av.umsg("Question 4. Given regular language $L$, how can we determine if $L$ is finite or infinite?");
  av.step();

  // Frame 9
  av.umsg("Question 4. Given regular language $L$, how can we determine if $L$ is finite?<br/><br/>Answer: If a DFA for $L$ has a loop, then $L$ is infinite. If it has no loop, then $L$ is finite.");
  av.step();
  
  // Frame 10
  av.umsg("Question 5. Given $L_1$ and $L_2$, how can we determine if $L_1 = L_2$?");
  av.step();

  // Frame 11
  av.umsg("Question 5. Given $L_1$ and $L_2$, how can we determine if $L_1 = L_2$?<br/><br/>Answer: Construct $L_3 = (L_1 \\cap \\bar{L_2}) \\cup (\\bar{L_1} \\cap L_2)$. If $L_3$ is empty, then $L_1 = L_2$");
  av.step();

  // Frame 12
  av.umsg("So, these questions were all pretty easy, right? What is important to appreciate is that in other situations, these questions might be impossible to answer. Oddly enough, in some situations we <b>know</b> they are impossible to answer, and in others we <b>do not know</b> whether they are impossible to answer or not. For example, we <b>know</b> that it is not possible to tell in general if the output of any computer program is empty, or the same as some other computer program. (Oh, by the way, the set of 'computer programs' is just a set of strings, and so the set of computer programs is itself a language. It is not so unrelated then to ask these questions about computer programs!) And, we <b>do not know</b> if certain problems can be solved in polynomial time on a modern computer or not. We will address such questions toward the end of the semester.");
  av.recorded();
});
