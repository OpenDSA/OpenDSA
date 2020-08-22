function checkRule(str) {
  var astr = 0
  var bstr = 0
  var pos = 0
  for (pos; pos < str.length; pos++) {
    if (str.charAt(pos) == 'a') {
      astr++
    } else {
      break
    }
  }
  for (pos; pos < str.length; pos++) {
    if (str.charAt(pos) == 'b') {
      bstr++
    } else {
      break
    }
  }
  if (
    astr + bstr == str.length &&
    bstr > 0 &&
    astr / bstr == 2 &&
    astr % bstr == 0
  ) {
    return true
  } else {
    return false
  }
}