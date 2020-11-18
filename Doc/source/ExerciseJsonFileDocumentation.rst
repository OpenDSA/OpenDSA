.. _ExerciseJsonFileDocumentation:

===============================================
Exercise Json File Documentation
===============================================

--------
Exercise Json File Format
--------

OpenDSA exercise configuration files are stored using JSON. 
Here are the field definitions. All are required unless otherwise 
specified.

*  **exerciseType**: - Type of the exercise which contains **DFA**, **NFA**, **REGEXP**, **GRAMMAR**, **PDA**, and **TM**.

  - DFA: Deterministic finite automaton exercise.

  - NFA: Nondeterministic finite automaton exercise.

  - REGEXP: Regular expression exercise.

  - GRAMMAR: Grammar exercise.

  - PDA: Pushdown automaton exercise.

  - TM: Turing machine exercise. 

  Example::

    "exerciseType": "DFA"


*  **totalTrueCases**: - The total number of true cases. This number includes all static testcases and randomly generate testcases. When the static testcases are not enough to satisfy this totalTrueCases number, the remaining number of testcases will be random generated.

  Example::

    "totalTrueCases": 5


*  **totalFalseCases**: - The total number of false cases. This number includes all static testcases and randomly generate testcases. When the static testcases is not enough to satisfy this totalFalseCases number, the remaining number of testcases will be random generated.

  Example::

    "totalFalseCases": 5

*  **containLetters**: - List all letters the must be contained in the testcases. This is for randomly generate testcases only.

  Example::

    "containLetters": ["a", "b"]

*  **randomStringLength**: - Limit the string length for random testcases generator. All random testcases will be in this range.

  Example::

    "randomStringLength": [0, 15]

*  **expression**: - Expression for the exercise.

  Example::

      "expression": "\\Sigma = \\{a, b\\}, \\quad L = \\{a^nb^{2n} \\mid n > 0\\}"

*  **description**: - Exercise description (can be empty).

  Example::

      "description": ""

*  **type**: - Not sure.

  Example::

      "type": "expression"

*  **testCases**: - List all static testcases. Each testcase will be a one-to-one mapping between test string and standard solution. The second line is ShowTestCase option (not required). When user does not have this field, the default action is false (hide current testcase).

  Example::

      "testCases":
        [
          {
            "aa": true,
            "ShowTestCase":true
          },
          {
            "bb": true,
            "ShowTestCase":false
          },
          {
            "aabb": true
          }
        ]

*  **solution**: - Standard solution. This field is required if the user want to use random generator. Otherwise, not required.

  *  DFA, NFA, PDA, and Turing machine - jff machine

    Example::

      "solution": "./practice1.jff"


  *  Regular Expression - For Regular Expression solution, no "^\*“ and "^+" symbol. Instead of using a^+, you can use "aa\*". The symbol "+" only represent "or" in the regular expression standard solution.
  
    Example::

      "solution": "bbb*+aaa*"

  *  GRAMMAR: For Grammar solution - S->a can be written as "S": "a". S->\lambda can be written as "S": "" and so on.

    Example::

      "solution":
        [
          {
            "S": "b"
          },
          {
            "S": "ab"
          },
          {
            "S": ""
          }
        ]