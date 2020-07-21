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

      function Generater() {
        var str2 = "";
        var min = randomStringLength[0];
        var max = randomStringLength[1] / 3;
        var stringLength = Math.round(Math.random() * (max - min)) + min;
        for (var a = 0; a < stringLength; a++) {
          var pos = Math.round(Math.random() * (containLetters.length - 1));
          str2 += containLetters[pos];
        }
        return str2;
      }

      function customGenerator() {
        if (trueCounter < totalTrueCases) {
          str = "T";
          var str1 = Generater();
          str += str1;
          str += "c";
          str += str1.split("").reverse().join("");
        } else {
          str = "F";
          if (falseCounter == 0) {
            return str;
          } else {
            var str1 = Generater();
            str += str1;
            str += "c";
            var str2 = Generater();
            str1 = str1.split("").reverse().join("");
            while (str2 == str1) {
              str2 = Generater();
            }
            str += str2;
          }
        }
        return str;
      }