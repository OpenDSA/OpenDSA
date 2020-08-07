// ******************************************************************************
// ******************************************************************************
// Function Name: customGenerator
// Return: String
// ******************************************************************************
// ******************************************************************************

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
  if (trueCounter < trueStringLimit) {
    var str1 = Generater();
    str += str1;
    str += "c";
    str += str1.split("").reverse().join("");
  } else if (falseCounter < falseStringLimit) {
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