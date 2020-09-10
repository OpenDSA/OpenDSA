function addsubString(str, letter, repeat) {
  for (var a = 0; a < repeat; a++) {
    str += letter;
  }
  return str;
}

function customGenerator() {
  tempStr = ""
  if (trueCounter < trueStringLimit) {
    tempStr = addsubString(tempStr, "b", randomNumber(2, 6))
    tempStr = addsubString(tempStr, "a", randomNumber(3, 6))
  } else if (falseCounter < falseStringLimit) {
    tempStr = stringGenerate();
  }
  return tempStr;
}