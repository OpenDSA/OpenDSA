$(document).ready(function () {
  "use strict";
  var av_name = "AdversaryGameCON";
  var av = new JSAV(av_name);
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
      interpret = config.interpreter, // get the interpreter
      code = config.code;             // get the code object

  av.umsg("Here is an adversary argument way of looking at this. Your goal is to establish a contradiction (to prove the language is not regular), while the opponent tries to stop the proof. The moves in the game are:")
  av.displayInit();

  av.umsg("1. The opponent picks $m$.");
  av.step();

  av.umsg("1. The opponent picks $m$.<br/>2. We pick string $w$ in $L$ of length equal or greater than $m$. We are free to chose any $w$, so long as $w\\in L$ and $|w|\\ge m$.");
  av.step();

  av.umsg("1. The opponent picks $m$.<br/>2. We pick string $w$ in $L$ of length equal or greater than $m$. We are free to chose any $w$, so long as $w\\in L$ and $|w|\\ge m$.<br/>3. The opponent chooses the decomposition $xyz$, such that $|xy|\\le m,|y|\\ge1$. The opponent will make the choice that is hardest for us to win the game.");
  av.step();

  av.umsg("1. The opponent picks $m$.<br/>2. We pick string $w$ in $L$ of length equal or greater than $m$. We are free to chose any $w$, so long as $w\\in L$ and $|w|\\ge m$.<br/>3. The opponent chooses the decomposition $xyz$, such that $|xy|\\le m,|y|\\ge1$. The opponent will make the choice that is hardest for us to win the game.<br/>4. We try to pick $i$ so that the pumped string $w_i=xy^iz$ is not in $L$. If we can always do this, we win ($L$ is not regular).");
  av.step();

  av.umsg("As we can see, the adversary game is similar to the pumping lemma proof. But it is used to learn and understand the pumping lemma.");
  av.step();

  av.umsg("As we see, the adversary games are role based game where $\\textbf{WE}$ seek to prove the language is non-regular. $\\textbf{The adversary}$ seeks to stop us.");
  av.step();

  av.umsg("Consider the Pumping Lemma definition again:<br/>Let L be an infinite regular language. There exists a constant $m>0$ such that any $w\\in L$ with $|w|\\ge m$ can be decomposed into three parts as $w=xyz$ with:<br/>$|xy|\\le m$<br/>$|y|\\ge 1$<br/>$xy^iz \\in L$ for all $i\\ge 0$");
  av.step();

  av.umsg("To connect the adversary game to the pumping lemma prove, we can divide the pumping lemma proof into the adversary game. as follows:");
  av.step();

  av.umsg("In pumping lemma proof we write, $\\textbf{There exists}$ a constant $m>0$ [= $\\textbf{Adversary}$ picks a value for m.]");
  av.step();

  av.umsg("In pumping lemma proof we write, $\\textbf{There exists}$ a constant $m>0$ [= $\\textbf{Adversary}$ picks a value for m.]<br/>such that $\\textbf{any}$ $w\\in L$ with $|w|\\ge m$ [= $\\textbf{WE}$ pick our choice for $w$.]");
  av.step();

  av.umsg("In pumping lemma proof we write, $\\textbf{There exists}$ a constant $m>0$ [= $\\textbf{Adversary}$ picks a value for m.]<br/>such that $\\textbf{any}$ $w\\in L$ with $|w|\\ge m$ [= $\\textbf{WE}$ pick our choice for $w$.]<br/>... $\\textbf{can be}$ decomposed into three parts as $w=xyz$ [= $\\textbf{Adversary}$ picks $xyz$] (that meets the length criteria on xy and y)");
  av.step();

  av.umsg("In pumping lemma proof we write, $\\textbf{There exists}$ a constant $m>0$ [= $\\textbf{Adversary}$ picks a value for m.]<br/>such that $\\textbf{any}$ $w\\in L$ with $|w|\\ge m$ [= $\\textbf{WE}$ pick our choice for $w$.]<br/>... $\\textbf{can be}$ decomposed into three parts as $w=xyz$ [= $\\textbf{Adversary}$ picks $xyz$] (that meets the length criteria on xy and y)<br/>... such that $xy^iz \\in L$ $\\textbf{for all}$ $i \\ge 0$ [= $\\textbf{WE}$ pick a value for $i$.]");
  av.step();
   
  av.umsg("At the end of this page, you will find plenty of adversary games that you can play to practice");
  av.recorded();
  
  av.step();
});