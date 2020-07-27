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
      var repeat = 0;
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
            var len = str.length;
            var bcounter = 0;
            var i;
            for (i = 0; i < len; i++) {
                  bcounter = 0;
                  if (str.substring(i, i + 3) == "aaa") {
                        i = i + 3;
                        while (str.charAt(i) == "b") {
                              bcounter++;
                              i++;
                        }
                        if (bcounter < 1 || str.charAt(i) != "a") {
                              return false;
                        }
                  } else {
                        return false;
                  }
            }
            return true;
      }

      function customGenerator() {
            if (trueCounter < totalTrueCases) {
                  str = "aaa";
                  str = subStringFun(str, "b", 0, 3);
                  str += "ba";
                  str = subStringFun(str, str, 0, 2);
                  return str;
            } else {
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
      }

      function subStringFun(str, letter, min, max) {
            var num = randomNumber(min, max);
            for (var a = 0; a < num; a++) {
                  str += letter;
            }
            return str;
      }