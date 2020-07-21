      // ******************************************************************************
      // ******************************************************************************
      // Necessary elements
      // ******************************************************************************
      // ******************************************************************************
      var totalTrueCases = 5; //how many true cases
      var totalFalseCases = 15; //how many false cases
      var containLetters = ['a', 'b']; // contain letters
      var randomStringLength = [0, 15]; //string lengthe between 0 to 15
      var trueCounter = 5; // number of hardcode true cases in json file 
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
        var astr = 0;
        var bstr = 0;
        var pos = 0;
        for (pos; pos < str.length; pos++) {
          if (str.charAt(pos) == "a") {
            astr++
          } else {
            break;
          }
        }
        for (pos; pos < str.length; pos++) {
          if (str.charAt(pos) == "b") {
            bstr++;
          } else {
            break;
          }
        }
        if (((astr + bstr) == str.length) && astr > 0 && bstr / astr == 2 && bstr % astr == 0) {
          return true;
        } else {
          return false;
        }
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