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
        for (var a = 0; a < str.length; a++) {
          if (str.charAt(a) == "a" && str.charAt(a + 1) == "a" && str.charAt(a + 2) == "a") {
            return false;
          }
        }
        return true;
      }

      function customGenerator() {
        var str = "";
        var min = randomStringLength[0];
        var max = randomStringLength[1];
        var stringLength = Math.round(Math.random() * (max - min)) + min;
        for (var a = 0; a < stringLength; a++) {
          var pos = Math.round(Math.random() * (containLetters.length - 1));
          str += containLetters[pos];
        }
        if (caseCounter == 0) {
          str = "";
        }
        return str;
      }