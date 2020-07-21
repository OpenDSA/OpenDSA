      // ******************************************************************************
      // ******************************************************************************
      // Necessary elements
      // ******************************************************************************
      // ******************************************************************************

      var totalTrueCases = 10; //how many true cases
      var totalFalseCases = 10; //how many false cases
      var containLetters = ['a', 'b']; // contain letters
      var randomStringLength = [0, 15]; //string lengthe between 0 to 15
      var trueCounter = 0; // number of hardcode true cases in json file 
      var falseCounter = 0; // number of hardcode false cases in json file 
      var str = "";
      var generatorflag = 1;
      // generatorflag = 0 : random generator strings (by dafault)
      // generatorflag = 1 : write your own generator below



      // ******************************************************************************
      // ******************************************************************************
      // customize generator requirements:
      // Function Name: customGenerator
      // Return: String
      // Use necessary element above.
      // ******************************************************************************
      // ******************************************************************************
      // function customGenerator() {
      //   //Change the flag and ReWrite here
      // }


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
        if (trueCounter < totalTrueCases) {
          str = "T";
          if (trueCounter < (totalTrueCases / 2)) {
            str = subStringFun(str, "ab", 0, 4);
            str += "ba";
          } else {
            if (trueCounter == ((totalTrueCases / 2) + 1)) {
              str = subStringFun(str, "ab", 1, 4);
            } else {
              str = subStringFun(str, "b", 0, 3);
              str = subStringFun(str, "ab", 1, 4);
            }
          }
          return str;
        } else if (falseCounter < totalFalseCases) {
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