/* PIFLA worked examples and earlier prototypes; source metadata accompanies each task. */
window.DerivationExerciseData = [
  {
    "id": "01-binary-string",
    "title": "Construct a binary string",
    "source": "Adapted from StringGenFromGmr in PL Section 1.1",
    "url": "https://opendsa-server.cs.vt.edu/OpenDSA/Exercises/PL/StringGenFromGmr.html",
    "objective": "Apply a sequence of productions and terminate with an empty production.",
    "rules": [
      [
        "S",
        "0A"
      ],
      [
        "S",
        "1B"
      ],
      [
        "S",
        "λ"
      ],
      [
        "A",
        "0S"
      ],
      [
        "A",
        "1C"
      ],
      [
        "B",
        "0C"
      ],
      [
        "B",
        "1S"
      ],
      [
        "C",
        "0B"
      ],
      [
        "C",
        "1A"
      ]
    ],
    "target": "1100",
    "prompt": "Starting from S, construct a derivation of 1100. Select a matching occurrence in the current sentential form and apply one production at each step. Finish with the exact target string and no nonterminals.",
    "notes": "The original `<a>`, `<b>`, `<c>`, `<d>` are renamed S, A, B, C. The target 1100 is one of the original exercise choices. Students now construct a witness instead of selecting an answer.",
    "hints": [
      "Use S → 1B first.",
      "After producing the four terminal digits, remove the remaining S with S → λ."
    ],
    "solutions": [
      [
        "S",
        "1B",
        "11S",
        "110A",
        "1100S",
        "1100"
      ]
    ],
    "interaction": "Single matching variable, terminal prefix, and an empty production.",
    "leftmost": false,
    "verified_steps": [
      [
        {
          "rule": 1,
          "at": 0,
          "before": "S",
          "after": "1B"
        },
        {
          "rule": 6,
          "at": 1,
          "before": "1B",
          "after": "11S"
        },
        {
          "rule": 0,
          "at": 2,
          "before": "11S",
          "after": "110A"
        },
        {
          "rule": 3,
          "at": 3,
          "before": "110A",
          "after": "1100S"
        },
        {
          "rule": 2,
          "at": 4,
          "before": "1100S",
          "after": "1100"
        }
      ]
    ],
    "label": "Binary String",
    "kind": "Empty productions",
    "description": "Starting from S, derive 1100. Apply one production at each step and finish with no nonterminals remaining.",
    "collection": "Earlier prototypes"
  },
  {
    "id": "02-recursion-and-empty-rules",
    "title": "Construct a recursive derivation and its tree",
    "source": "Adapted from NumParseTreeNodes in PL Section 1.1",
    "url": "https://opendsa-server.cs.vt.edu/OpenDSA/Exercises/PL/NumParseTreeNodes.html",
    "objective": "Coordinate recursive expansions, empty productions and the terminal yield of a tree.",
    "rules": [
      [
        "S",
        "NC"
      ],
      [
        "N",
        "aNb"
      ],
      [
        "N",
        "λ"
      ],
      [
        "C",
        "cC"
      ],
      [
        "C",
        "λ"
      ]
    ],
    "target": "aabbc",
    "prompt": "Starting from S, derive aabbc and construct the corresponding parse tree. At completion, check that reading the terminal leaves from left to right gives aabbc; empty-string leaves contribute no characters.",
    "notes": "The original `<s>`, `<n>`, `<c>` are renamed S, N, C. The original node-count question uses aaabbbcc; this shorter target isolates the manual derivation task.",
    "hints": [
      "Expand N twice using N → aNb.",
      "Use N → λ to end the a/b recursion, then generate one c and end C."
    ],
    "solutions": [
      [
        "S",
        "NC",
        "aNbC",
        "aaNbbC",
        "aabbC",
        "aabbcC",
        "aabbc"
      ]
    ],
    "interaction": "Choose which branch to expand, apply λ, and preserve tree parentage. Optional undo practice: from aaNbbC apply N → aNb once too many, undo, then apply N → λ.",
    "leftmost": false,
    "verified_steps": [
      [
        {
          "rule": 0,
          "at": 0,
          "before": "S",
          "after": "NC"
        },
        {
          "rule": 1,
          "at": 0,
          "before": "NC",
          "after": "aNbC"
        },
        {
          "rule": 1,
          "at": 1,
          "before": "aNbC",
          "after": "aaNbbC"
        },
        {
          "rule": 2,
          "at": 2,
          "before": "aaNbbC",
          "after": "aabbC"
        },
        {
          "rule": 3,
          "at": 4,
          "before": "aabbC",
          "after": "aabbcC"
        },
        {
          "rule": 4,
          "at": 5,
          "before": "aabbcC",
          "after": "aabbc"
        }
      ]
    ],
    "label": "Recursion and Empty Productions",
    "kind": "Recursion and parse trees",
    "description": "Starting from S, derive aabbc. Observe how each recursive expansion introduces an a and a b, and how empty productions end the derivation.",
    "collection": "Earlier prototypes"
  },
  {
    "id": "03-operator-precedence",
    "title": "Construct a derivation with operator precedence",
    "source": "Adapted from Third Sample Grammar in PL Section 1.3",
    "url": "https://opendsa-server.cs.vt.edu/OpenDSA/Books/PL/html/Grammars3.html#third-sample-grammar",
    "objective": "Connect grammar levels to the grouping of addition and multiplication.",
    "rules": [
      [
        "S",
        "E"
      ],
      [
        "E",
        "E+T"
      ],
      [
        "E",
        "T"
      ],
      [
        "T",
        "T*F"
      ],
      [
        "T",
        "F"
      ],
      [
        "F",
        "(E)"
      ],
      [
        "F",
        "a"
      ],
      [
        "F",
        "b"
      ],
      [
        "F",
        "c"
      ]
    ],
    "target": "a+b*c",
    "prompt": "Starting from S, derive a+b*c. Use your completed parse tree to explain whether the expression groups as a+(b*c) or (a+b)*c. Identify the production that introduces multiplication.",
    "notes": "This is a simplified expression grammar: subtraction, division and the separate `<var>` level are omitted; literal operands are lowercase a, b, c. S → E supplies the common start symbol. This avoids treating uppercase operand names as nonterminals in the current OpenFLAP notation.",
    "hints": [
      "Use E → E+T to introduce addition.",
      "The right T can expand with T → T*F."
    ],
    "solutions": [
      [
        "S",
        "E",
        "E+T",
        "T+T",
        "F+T",
        "a+T",
        "a+T*F",
        "a+F*F",
        "a+b*F",
        "a+b*c"
      ]
    ],
    "answer": "The multiplication subtree is inside the right term of the addition, so the grouping is a+(b*c). T → T*F introduces multiplication.",
    "interaction": "Select the intended nonterminal occurrence among several visible nonterminals and inspect the resulting tree.",
    "leftmost": false,
    "verified_steps": [
      [
        {
          "rule": 0,
          "at": 0,
          "before": "S",
          "after": "E"
        },
        {
          "rule": 1,
          "at": 0,
          "before": "E",
          "after": "E+T"
        },
        {
          "rule": 2,
          "at": 0,
          "before": "E+T",
          "after": "T+T"
        },
        {
          "rule": 4,
          "at": 0,
          "before": "T+T",
          "after": "F+T"
        },
        {
          "rule": 6,
          "at": 0,
          "before": "F+T",
          "after": "a+T"
        },
        {
          "rule": 3,
          "at": 2,
          "before": "a+T",
          "after": "a+T*F"
        },
        {
          "rule": 4,
          "at": 2,
          "before": "a+T*F",
          "after": "a+F*F"
        },
        {
          "rule": 7,
          "at": 2,
          "before": "a+F*F",
          "after": "a+b*F"
        },
        {
          "rule": 8,
          "at": 4,
          "before": "a+b*F",
          "after": "a+b*c"
        }
      ]
    ],
    "label": "Operator Precedence",
    "kind": "Expression grammar",
    "description": "Derive a+b*c and use the parse tree to explain why it groups as a+(b*c).",
    "collection": "Earlier prototypes"
  },
  {
    "id": "04-two-parse-trees",
    "title": "Construct two different parse trees",
    "source": "Adapted from Second Sample Grammar in PL Section 1.2",
    "url": "https://opendsa-server.cs.vt.edu/OpenDSA/Books/PL/html/Grammars2.html#second-sample-grammar",
    "objective": "Demonstrate ambiguity by constructing two different trees for the same string.",
    "rules": [
      [
        "S",
        "E"
      ],
      [
        "E",
        "E+E"
      ],
      [
        "E",
        "E*E"
      ],
      [
        "E",
        "(E)"
      ],
      [
        "E",
        "a"
      ],
      [
        "E",
        "b"
      ],
      [
        "E",
        "c"
      ]
    ],
    "target": "a+b*c",
    "prompt": "Construct two leftmost derivations of a+b*c that produce different parse trees. For the first tree, use E → E+E immediately after S → E. For the second, use E → E*E immediately after S → E. Save or compare the two trees and explain why this grammar is ambiguous.",
    "notes": "The arithmetic subset of the textbook grammar is used with lowercase operands. Requiring two leftmost derivations prevents mere changes in expansion order from being mistaken for different parse trees.",
    "hints": [
      "The first tree groups a+(b*c).",
      "In the second tree, expand the left E into E+E; the grouping is (a+b)*c."
    ],
    "solutions": [
      [
        "S",
        "E",
        "E+E",
        "a+E",
        "a+E*E",
        "a+b*E",
        "a+b*c"
      ],
      [
        "S",
        "E",
        "E*E",
        "E+E*E",
        "a+E*E",
        "a+b*E",
        "a+b*c"
      ]
    ],
    "answer": "Both derivations reach a+b*c, but their E subtrees have different top-level operators. The grammar is ambiguous. Two different expansion orders of the same tree would not establish ambiguity.",
    "interaction": "Choose among repeated E occurrences, undo or restart, and retain two separate attempts. Comparing two trees is a proposed extension, not a confirmed task-list requirement.",
    "leftmost": true,
    "verified_steps": [
      [
        {
          "rule": 0,
          "at": 0,
          "before": "S",
          "after": "E"
        },
        {
          "rule": 1,
          "at": 0,
          "before": "E",
          "after": "E+E"
        },
        {
          "rule": 4,
          "at": 0,
          "before": "E+E",
          "after": "a+E"
        },
        {
          "rule": 2,
          "at": 2,
          "before": "a+E",
          "after": "a+E*E"
        },
        {
          "rule": 5,
          "at": 2,
          "before": "a+E*E",
          "after": "a+b*E"
        },
        {
          "rule": 6,
          "at": 4,
          "before": "a+b*E",
          "after": "a+b*c"
        }
      ],
      [
        {
          "rule": 0,
          "at": 0,
          "before": "S",
          "after": "E"
        },
        {
          "rule": 2,
          "at": 0,
          "before": "E",
          "after": "E*E"
        },
        {
          "rule": 1,
          "at": 0,
          "before": "E*E",
          "after": "E+E*E"
        },
        {
          "rule": 4,
          "at": 0,
          "before": "E+E*E",
          "after": "a+E*E"
        },
        {
          "rule": 5,
          "at": 2,
          "before": "a+E*E",
          "after": "a+b*E"
        },
        {
          "rule": 6,
          "at": 4,
          "before": "a+b*E",
          "after": "a+b*c"
        }
      ]
    ],
    "label": "Ambiguous Grammar",
    "kind": "Two leftmost derivations",
    "description": "Construct two leftmost derivations of a+b*c with different parse trees. One should group as a+(b*c), the other as (a+b)*c. Distinct completed trees are saved in Practice mode.",
    "collection": "Earlier prototypes",
    "requiredTrees": 2
  },
  {
    "id": "05-context-sensitive",
    "title": "Derive equal numbers of a b and c",
    "source": "Proposed extension based on the task-list requirement for a^n b^n c^n",
    "url": null,
    "objective": "Apply productions whose left side is a multi-symbol substring.",
    "rules": [
      [
        "S",
        "aSBC"
      ],
      [
        "S",
        "abC"
      ],
      [
        "CB",
        "BC"
      ],
      [
        "bB",
        "bb"
      ],
      [
        "bC",
        "bc"
      ],
      [
        "cC",
        "cc"
      ]
    ],
    "target": "aabbcc",
    "prompt": "Starting from S, derive aabbcc. When a production has more than one symbol on its left side, select the complete matching contiguous substring in the current sentential form before applying it. Use the derivation table to explain the roles of CB → BC, bB → bb, bC → bc and cC → cc.",
    "notes": "This noncontracting grammar generates {a^n b^n c^n | n ≥ 1}. It is a proposed grammar for the task-list use case, not a claim to reproduce Shaffer’s exact slide grammar. PL Chapter 1 discusses context-free grammars; this question is an explicitly separate extension.",
    "hints": [
      "Apply S → aSBC once, then S → abC.",
      "In aabCBC, select CB and use CB → BC before converting the remaining variables to terminals."
    ],
    "solutions": [
      [
        "S",
        "aSBC",
        "aabCBC",
        "aabBCC",
        "aabbCC",
        "aabbcC",
        "aabbcc"
      ]
    ],
    "answer": "CB → BC moves a B left across a C. The remaining contextual rules convert B/C symbols into the required b/c terminal blocks. The target contains two of each terminal.",
    "interaction": "Select CB, bB, bC or cC as whole substrings. A CFG-style parent-to-children tree is not required; the derivation table is the primary view.",
    "leftmost": false,
    "verified_steps": [
      [
        {
          "rule": 0,
          "at": 0,
          "before": "S",
          "after": "aSBC"
        },
        {
          "rule": 1,
          "at": 1,
          "before": "aSBC",
          "after": "aabCBC"
        },
        {
          "rule": 2,
          "at": 3,
          "before": "aabCBC",
          "after": "aabBCC"
        },
        {
          "rule": 3,
          "at": 2,
          "before": "aabBCC",
          "after": "aabbCC"
        },
        {
          "rule": 4,
          "at": 3,
          "before": "aabbCC",
          "after": "aabbcC"
        },
        {
          "rule": 5,
          "at": 4,
          "before": "aabbcC",
          "after": "aabbcc"
        }
      ]
    ],
    "label": "Context-Sensitive Derivation",
    "kind": "Substring replacement",
    "description": "Starting from S, derive aabbcc. For a production such as CB → BC, select the entire matching substring before applying the production.",
    "collection": "Earlier prototypes"
  },
  {
    "id": "pifla-anbn",
    "label": "Derive aaabbb",
    "kind": "Recursive derivation",
    "source": "PIFLA: Context-Free Grammars Part 1 — String Derivation",
    "url": "https://opendsa-server.cs.vt.edu/OpenDSA/Books/PIFLA/html/CFG1.html#string-derivation",
    "sourceFile": "AV/PIFLA/CFL/CFGDerivationsFS.json",
    "sourceKey": "derivation",
    "rules": [
      [
        "S",
        "aSb"
      ],
      [
        "S",
        "ab"
      ]
    ],
    "target": "aaabbb",
    "description": "Starting from S, derive aaabbb by selecting a nonterminal and applying a production. Finish with exactly aaabbb and no nonterminals remaining.",
    "notes": "The grammar, target and reference derivation are unchanged from the PIFLA example. This exercise asks the student to perform the replacements rather than answer the frameset questions.",
    "hints": [
      "Each S → aSb adds an a at the front and a b at the end.",
      "Apply S → ab to finish after two recursive expansions."
    ],
    "solutions": [
      [
        "S",
        "aSb",
        "aaSbb",
        "aaabbb"
      ]
    ],
    "leftmost": false,
    "collection": "PIFLA examples",
    "title": "Derive aaabbb",
    "objective": "Recursive derivation",
    "verified_steps": [
      [
        {
          "rule": 0,
          "at": 0,
          "before": "S",
          "after": "aSb"
        },
        {
          "rule": 0,
          "at": 1,
          "before": "aSb",
          "after": "aaSbb"
        },
        {
          "rule": 1,
          "at": 2,
          "before": "aaSbb",
          "after": "aaabbb"
        }
      ]
    ]
  },
  {
    "id": "pifla-palindrome",
    "label": "Derive the Palindrome ababa",
    "kind": "Recursive derivation and base case",
    "source": "PIFLA: Context-Free Grammars Part 1 — String Derivation, palindrome example",
    "url": "https://opendsa-server.cs.vt.edu/OpenDSA/Books/PIFLA/html/CFG1.html#string-derivation",
    "sourceFile": "AV/PIFLA/CFL/CFGDerivationsFS.json",
    "sourceKey": "palender1–palender3",
    "rules": [
      [
        "S",
        "aSa"
      ],
      [
        "S",
        "bSb"
      ],
      [
        "S",
        "a"
      ],
      [
        "S",
        "b"
      ],
      [
        "S",
        "λ"
      ]
    ],
    "target": "ababa",
    "description": "Starting from S, construct the palindrome ababa. Choose productions that build the matching outer symbols, then replace the remaining S with the middle terminal.",
    "notes": "The grammar, target and worked derivation are preserved from the PIFLA palindrome example. The middle symbol is generated by S → a.",
    "hints": [
      "The target starts and ends with a.",
      "After S ⇒ aSa ⇒ abSba, replace the remaining S with a."
    ],
    "solutions": [
      [
        "S",
        "aSa",
        "abSba",
        "ababa"
      ]
    ],
    "leftmost": false,
    "collection": "PIFLA examples",
    "title": "Derive the Palindrome ababa",
    "objective": "Recursive derivation and base case",
    "verified_steps": [
      [
        {
          "rule": 0,
          "at": 0,
          "before": "S",
          "after": "aSa"
        },
        {
          "rule": 1,
          "at": 1,
          "before": "aSa",
          "after": "abSba"
        },
        {
          "rule": 2,
          "at": 2,
          "before": "abSba",
          "after": "ababa"
        }
      ]
    ]
  },
  {
    "id": "pifla-leftmost-aacbb",
    "label": "Leftmost Derivation of aacbb",
    "kind": "Multiple nonterminals and empty productions",
    "source": "PIFLA: Context-Free Grammars Part 1 — String Derivation and Derivation Trees Example",
    "url": "https://opendsa-server.cs.vt.edu/OpenDSA/Books/PIFLA/html/CFG1.html#derivation-trees-example",
    "sourceFile": "AV/PIFLA/CFL/CFGDerivationsFS.json; AV/PIFLA/CFL/TreeExampleCON.js",
    "sourceKey": "aacbbder1–aacbbsent5; TreeExampleCON",
    "rules": [
      [
        "S",
        "AcB"
      ],
      [
        "A",
        "aAa"
      ],
      [
        "A",
        "λ"
      ],
      [
        "B",
        "Bbb"
      ],
      [
        "B",
        "λ"
      ]
    ],
    "target": "aacbb",
    "description": "Starting from S, derive aacbb using a leftmost derivation: replace the leftmost nonterminal at every step. Compare the completed parse tree with the derivation table.",
    "notes": "The grammar and target match the textbook’s worked leftmost derivation and parse-tree example. The student performs the replacements instead of stepping through the existing presentation.",
    "hints": [
      "After S → AcB, replace A before B.",
      "Expand A once, use A → λ, then expand B once and use B → λ."
    ],
    "solutions": [
      [
        "S",
        "AcB",
        "aAacB",
        "aacB",
        "aacBbb",
        "aacbb"
      ]
    ],
    "leftmost": true,
    "collection": "PIFLA examples",
    "title": "Leftmost Derivation of aacbb",
    "objective": "Multiple nonterminals and empty productions",
    "verified_steps": [
      [
        {
          "rule": 0,
          "at": 0,
          "before": "S",
          "after": "AcB"
        },
        {
          "rule": 1,
          "at": 0,
          "before": "AcB",
          "after": "aAacB"
        },
        {
          "rule": 2,
          "at": 1,
          "before": "aAacB",
          "after": "aacB"
        },
        {
          "rule": 3,
          "at": 3,
          "before": "aacB",
          "after": "aacBbb"
        },
        {
          "rule": 4,
          "at": 3,
          "before": "aacBbb",
          "after": "aacbb"
        }
      ]
    ]
  },
  {
    "id": "pifla-context-sensitive",
    "label": "Context-Sensitive Derivation of aabbcc",
    "kind": "Multi-symbol substring replacement",
    "source": "PIFLA: Turing Machines: Advanced Topics — Unrestricted and Context Sensitive Grammars",
    "url": "https://opendsa-server.cs.vt.edu/OpenDSA/Books/PIFLA/html/TuringMachinesAdv.html#unrestricted-and-context-sensitive-grammars",
    "sourceFile": "RST/en/PIFLA/TuringMachinesAdv.rst",
    "sourceKey": "Context Sensitive Grammars example",
    "rules": [
      [
        "S",
        "abc"
      ],
      [
        "S",
        "aAbc"
      ],
      [
        "Ab",
        "bA"
      ],
      [
        "Ac",
        "Bbcc"
      ],
      [
        "bB",
        "Bb"
      ],
      [
        "aB",
        "aa"
      ],
      [
        "aB",
        "aaA"
      ]
    ],
    "target": "aabbcc",
    "description": "Use the textbook grammar to derive aabbcc from S. Select the entire left-side substring, including any terminal symbols, before applying a production. Follow the replacements in the derivation table.",
    "notes": "All productions are preserved from the published PIFLA context-sensitive grammar. The target aabbcc and reference trace are supplied for this exercise.",
    "hints": [
      "Begin with S → aAbc, then select Ab and apply Ab → bA.",
      "After aBbbcc, use aB → aa to finish."
    ],
    "solutions": [
      [
        "S",
        "aAbc",
        "abAc",
        "abBbcc",
        "aBbbcc",
        "aabbcc"
      ]
    ],
    "leftmost": false,
    "collection": "PIFLA examples",
    "title": "Context-Sensitive Derivation of aabbcc",
    "objective": "Multi-symbol substring replacement",
    "verified_steps": [
      [
        {
          "rule": 1,
          "at": 0,
          "before": "S",
          "after": "aAbc"
        },
        {
          "rule": 2,
          "at": 1,
          "before": "aAbc",
          "after": "abAc"
        },
        {
          "rule": 3,
          "at": 2,
          "before": "abAc",
          "after": "abBbcc"
        },
        {
          "rule": 4,
          "at": 1,
          "before": "abBbcc",
          "after": "aBbbcc"
        },
        {
          "rule": 5,
          "at": 0,
          "before": "aBbbcc",
          "after": "aabbcc"
        }
      ]
    ]
  }
];
