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
      if (trueCounter < trueStringLimit) {
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