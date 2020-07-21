      // ******************************************************************************
      // ******************************************************************************
      // Necessary elements
      // ******************************************************************************
      // ******************************************************************************
      var totalTrueCases = 10; //how many true cases
      var totalFalseCases = 10; //how many false cases
      var containLetters = ['a', 'b']; // contain letters
      var randomStringLength = [0, 15]; //string lengthe between 0 to 15
      var trueCounter = 1; // number of hardcode true cases in json file 
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
        var a = (str.split('a')).length - 1;
        var b = (str.split('b')).length - 1;
        if ((a + b) % 2 == 1) {
          return true;
        } else {
          return false;
        }
      }

      function customGenerator() {
        str = subStringFun(str, "a", 0, 7);
        str = subStringFun(str, "b", 0, 7);
        return str;
      }

      function subStringFun(str, letter, min, max) {
        var num = randomNumber(min, max);
        for (var a = 0; a < num; a++) {
          str += letter;
        }
        if (falseCounter == 0) {
          return "";
        }
        return str;
      }