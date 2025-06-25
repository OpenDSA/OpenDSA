.. _ExerciseJsonFileDocumentation:

================================
Exercise Json File Documentation
================================

Exercise Json File Format
-------------------------

OpenDSA exercise configuration files are stored using JSON. 
Here are the field definitions.
All are required unless otherwise specified.

*  **exerciseType**: - Type of the exercise which contains **DFA**,
   **NFA**, **REGEXP**, **GRAMMAR**, **PDA**, and **TM**.

  - DFA: Deterministic finite automaton exercise.

  - NFA: Nondeterministic finite automaton exercise.

  - PDA: Pushdown automaton exercise.

  - TM: Turing machine exercise. 

  - REGEXP: Regular expression exercise.

  - GRAMMAR: Grammar exercise.

  Example::

    "exerciseType": "DFA"


*  **totalTrueCases**: - The total number of true cases, including all
   static testcases and randomly generated testcases.
   When the static testcases provided in the file are less than
   **totalTrueCases**, the remaining number of testcases will be
   generated randomly.

  Example::

    "totalTrueCases": 5


*  **totalFalseCases**: - The total number of false cases, including all
   static testcases and randomly generated testcases.
   When the static testcases provided in the file are less than
   **totalFalseCases**, the remaining number of testcases will be
   generated randomly.

  Example::

    "totalFalseCases": 5

*  **containLetters**: - List all letters the may be contained in the
   testcases. This is for randomly generate testcases only.

  Example::

    "containLetters": ["a", "b"]

*  **randomStringLength**: - Limit the string length for random
   testcases generator. All random testcases will be in this range.

  Example::

    "randomStringLength": [0, 15]

*  **expression**: - Expression usded in the exercise description.

  Example::

      "expression": "\\Sigma = \\{a, b\\}, \\quad L = \\{a^nb^{2n} \\mid n > 0\\}"

*  **description**: - Exercise description (can be empty).

  Example::

      "description": ""

*  **type**: - Not sure, seems to be related to the exercise description.

  Example::

      "type": "expression"

*  **testCases**: - List all static testcases.
   Each testcase will be a one-to-one mapping between a test string
   and the standard solution.
   The second line is the ShowTestCase option (not required).
   When not included, the default action is false (hide current
   testcase).

  Example::

      "testCases":
        [
          {
            "aa": true,
            "ShowTestCase": true
          },
          {
            "bb": true,
            "ShowTestCase": false
          },
          {
            "aabb": true
          }
        ]

*  **solution**: - Model solution for the exercise.
   This is used to determine the proper outcome for a randomly
   generated test case.
   This field is required when using the random testcase generator.
   Otherwise, not required.
   The type of the solution is determined by the **exerciseType**
   field.

  *  For DFA, NFA, PDA, and TM exercise types, this must be the path
     and name of a jff machine file.

    Example::

      "solution": "./practice1.jff"


  *  For REGEXP exercises, it is an actual regular expression.
     Note that no "^\*“ and "^+" symbols are available.
     Instead of using "a^+", you can use "aa\*".
     The symbol "+" only represent "or" in the regular expression
     standard solution.
  
    Example::

      "solution": "bbb*+aaa*"

  *  GRAMMAR: Provide a grammar.
     A production like "S->a" can be written as **"S": "a"**.
     S->\lambda can be written as **"S": ""**.

    Example::

      "solution":
        [
          {
            "S": "b"
          },
          {
            "S": "Sab"
          },
          {
            "S": ""
          }
        ]
