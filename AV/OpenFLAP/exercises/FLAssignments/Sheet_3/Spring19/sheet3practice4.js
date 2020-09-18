  function customGenerator() {
    //Change the flag and ReWrite here
  }

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