$(document).ready(function() {
    "use strict";
    var av_name = "ConvertRLRE";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var FA = new av.ds.FA({width: 600, height: 900,left: 10, top:0});
    var DFA = new av.ds.FA({width: 600, height: 900, left: 10, top:0});
    //var separator =  av.g.path(["M", 350, 0, "v", 500].join(","));
    //separator.show();
    
    // Slide 1
    av.umsg("$\\textbf {Theorem}$: Let L be regular. Then there exists an R.E. such that L=L(r).");
    av.step();
    av.displayInit();

    //frame 2
    av.umsg("$\\textbf {Proof Idea}$:<br> Use a process that removes states sucessively, generating equivalent generalized transition graphs (GTG) until only two states are left (the initial state and one final state), with the resulting regular expression as the transition. <br>This regular expression left as the sole transition is equivalent to the original NFA.");
    av.step();

    //frame 3
    av.umsg("$\\textbf {Definition}$: A complete GTG is a complete graph, meaning that every state has a transition to every other state. Any GTG can be converted to a complete GTG by adding edges labeled $\\emptyset$ as needed.");
    // FA.addEdge(q0, q1, {weight: "$\\lambda$"});
    av.step();

    //frame 4
    av.umsg("$\\textbf {Proof}$:<br> $L$ is regular $\\Rightarrow \\exists$ NFA $M$ such that $L=L(M)$.<br> $\\textbf {1}$ Assume $M$ has one final state, and $q_0 \\not\\in F$.<br>  $\\textbf {2}$ Convert $M$ to a complete GTG.<br> Let $r_{ij}$ stand for the label of the edge from $q_i$ to $q_j$.<br>$\\textbf {3}$ If the GTG has only two states, then it has this form:")
    var q0 = FA.addNode({left: 20, top: 190});
    var q1 = FA.addNode({left: 220, top: 190});
   
    FA.disableDragging();
    toggleInitial(FA, q0);
    toggleFinal(FA, q1);
    FA.addEdge(q0, q0, {weight: "$r_{ii}$"});
    FA.addEdge(q0, q1, {weight: "$r_{ji}$"});
    FA.addEdge(q1, q0, {weight: "$r_{ij}$"});
    FA.addEdge(q1, q1, {weight: "$r_{jj}$"});
    av.step();

    //frame 5
    av.umsg("Add an arrow to the start state. Then, the corresponding regular expression is:<br> $r=(r_{ii}^*r_{ij}r_{jj}^*r_{ji})^∗r_{ii}^*r_{ij}r_{jj}^*$");
    av.step();

    //frame 6
    av.umsg("$\\textbf 4$ If the GTG has three states, then it must have the following form:");
    var q2 = FA.addNode({left: 120, top: 350});
    FA.addEdge(q0, q2, {weight: "$r_{ik}$"});
    FA.addEdge(q2, q0, {weight: "$r_{ki}$"});
    FA.addEdge(q2, q2, {weight: "$r_{kk}$"});
    FA.addEdge(q1, q2, {weight: "$r_{jk}$"});
    FA.addEdge(q2, q1, {weight: "$r_{kj}$"});
    av.step();


    //frame 7
    av.umsg("In this case, make the following replacements:<br> REPLACE<br> $r_{ii} \\Rightarrow r_{ii}+r_{ik}r_{kk}^*r_{ki}$<br> $r_{jj} \\Rightarrow r_{jj}+r_{jk}r_{kk}^*r_{kj}$<br> $r_{ij} \\Rightarrow r_{ij}+r_{ik}r_{kk}^*k_{kj}$<br> $r_{ji} \\Rightarrow r_{ji}+r_{jk}r_{kk}^*r_{ki}$ <br> After these replacements, remove state $q_k$ and its edges.");
    //FA.removeNode(q0);
    // FA.removeEdge(q0, q2, {weight: "$r_{ik}$"})
    av.step();

    //frame 8
    av.umsg("$\\textbf 5$ If the GTG has four or more states, pick any state $q_k$ that is not the start or the final state. It will be removed. For all $o\\neq k$,$p\\neq k$, replace $r_{op}$ with $r_{op}+r_{ok}r_{kk}^*r_{kp}$. When done, remove $q_k$ and all its edges. Continue eliminating states until only two states are left. Finish with step (3).")
    av.step();

    //frame 9
    av.umsg("In each step, we can simplify regular expressions r and s with any of these rules that apply:<br> $r+r=r$ (OR a subset with itself is the same subset)<br> $s+r^∗s=r^∗s$ (OR a subset with a bigger subset is just the bigger subset)<br> $r+\\emptyset =r$ (OR a subset with the empty set is just the subset)<br> $r\\emptyset =\\emptyset$ (Intersect a subset with the empty set yields the empty set)<br> $\\emptyset^∗=\\{\\lambda \\}$ (Special case)<br> $r\\lambda =r$ (Traversing a R.E. and then doing a free transition is just the same R.E.) <br> $(\\lambda +r)^∗=r^∗$ (Taking a free transition adds nothing.)<br> $(\\lambda +r)r^∗=r^∗$ (Being able to do an option extra r adds nothing)");
    FA.removeEdge(q0, q0, {weight: "$r_{ii}$"})
    FA.removeEdge(q0, q1, {weight: "$r_{ji}$"})
    FA.removeEdge(q1, q0, {weight: "$r_{ij}$"})
    FA.removeEdge(q1, q1, {weight: "$r_{jj}$"})
    FA.removeEdge(q0, q2, {weight: "$r_{ik}$"})
    FA.removeEdge(q2, q0, {weight: "$r_{ki}$"})
    FA.removeEdge(q2, q2, {weight: "$r_{kk}$"})
    FA.removeEdge(q1, q2, {weight: "$r_{jk}$"})
    FA.removeEdge(q2, q1, {weight: "$r_{kj}$"})
    FA.addEdge(q0, q2, {weight: "a"});
    FA.addEdge(q2, q0, {weight: "b"});
    FA.addEdge(q2, q2, {weight: "a"});
    FA.addEdge(q2, q1, {weight: "b"});
    FA.addEdge(q0, q1, {weight: "a"});
    FA.addEdge(q1, q0, {weight: "b"});

    var q0 = DFA.addNode({left: 350, top: 190});
    var q1 = DFA.addNode({left: 500, top: 190});
    DFA.disableDragging();
    toggleInitial(DFA, q0);
    toggleFinal(DFA, q1);
    DFA.addEdge(q0, q0, {weight: "$aa^*b$"});
    DFA.addEdge(q1, q0, {weight: "b"});
    DFA.addEdge(q0, q1, {weight: "$a+aa^*b$"});
    av.step();

    //frame 10
        
    av.recorded();
});