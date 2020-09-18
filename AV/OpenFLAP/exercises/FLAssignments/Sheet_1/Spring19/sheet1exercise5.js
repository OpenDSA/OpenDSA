function customGenerator() {
  //Change the flag and ReWrite here
}

function checkRule(str) {
  if (caseCounter == 3) {
    str = "";
  }
  if (str == "b" || str == "ab" || str == "bab") {
    return true;
  } else {
    return false;
  }
}