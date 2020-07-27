      // ******************************************************************************
      // ******************************************************************************
      // Necessary elements
      // ******************************************************************************
      // ******************************************************************************
      var totalTrueCases = 5; //how many true cases
      var totalFalseCases = 5; //how many false cases
      var containLetters = ['1', '0']; // contain letters
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



      // ******************************************************************************
      // ******************************************************************************
      // Set up ruls for single string.
      // ******************************************************************************
      // ******************************************************************************
      function checkRule(str) {
        if (str.length % 2 != 0) {
          return false;
        }
        for (var a = 0; a < str.length; a = a + 2) {
          if (str.charAt(a) != "1" || str.charAt(a + 1) != "0") {
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
        return str;
      }