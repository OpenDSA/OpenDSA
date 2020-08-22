      // ******************************************************************************
      // ******************************************************************************
      // Function Name: customGenerator
      // Return: String
      // ******************************************************************************
      // ******************************************************************************


      function checkRule(str) {
        if (str.charAt(0) == "T") {
          str = str.substr(1);
          return true;
        } else {
          str = str.substr(1);
          return false;
        }
      }

      function customGenerator() {
        if (trueCounter < trueStringLimit) {
          str = "T";
          if (trueCounter < (trueStringLimit / 2)) {
            str = subStringFun(str, "ab", 0, 4);
            str += "ba";
          } else {
            if (trueCounter == ((trueStringLimit / 2) + 1)) {
              str = subStringFun(str, "ab", 1, 4);
            } else {
              str = subStringFun(str, "b", 0, 3);
              str = subStringFun(str, "ab", 1, 4);
            }
          }
          return str;
        } else if (falseCounter < falseStringLimit) {
          str = "F";
          if (falseCounter == 0) {
            return str;
          }
          var num1 = randomNumber(1, 8);
          if (num1 == 1) {
            str = subStringFun(str, "b", 0, 7);
          } else if (num1 == 2) {
            str = subStringFun(str, "b", 0, 7);
            str += "a";
          } else if (num1 == 3) {
            str = subStringFun(str, "a", 0, 7);
          } else if (num1 == 4) {
            str = subStringFun(str, "ab", 1, 3);
            str = subStringFun(str, "ba", 2, 5);
          } else if (num1 == 5) {
            str = subStringFun(str, "ba", 2, 5);
          } else if (num1 == 6) {
            str += "aa";
            str = subStringFun(str, "a", 1, 2);
            str += "bb";
            str = subStringFun(str, "b", 1, 2);
          } else {
            str += "bb";
            str = subStringFun(str, "b", 1, 2);
            str += "aa";
            str = subStringFun(str, "a", 1, 2);
          }
        }
        return str;
      }

      function subStringFun(str, letter, min, max) {

        if (letter.charAt(0) == "T" || letter.charAt(0) == "F") {
          letter = letter.substr(1);
        }
        var num = randomNumber(min, max);
        for (var a = 0; a < num; a++) {
          str += letter;
        }
        return str;
      }