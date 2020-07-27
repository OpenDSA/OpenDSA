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
      var generatorflag = 0;
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
      function customGenerator() {
        //Change the flag and ReWrite here
      }



      function checkRule(str) {
        var n = (str.split('a')).length - 1;
        var m = (str.split('b')).length - 1;
        if (n % 2 == 0 && m >= 3) {
          return true;
        } else {
          return false;
        }
      }

      function stringGenerate() {
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