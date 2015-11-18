(function($) {
  var GREEN = "rgb(0, 255, 0)";

  function clean(avi, a, ssr, ssc) {
    j = 0;
    for (r = 3*ssr; r < 3*(ssr+1); r++) {
      for (c = 3*ssc; c < 3*(ssc+1); c++) {
         if (parseInt(a[r].value(c)) > 0 && parseInt(a[r].value(c)) < 10){
          a[r].unhighlight([c]);
        } else {
          j = j+1;
          a[r].setvalue(c," ");
          a[r].unhighlight([c]);
        }
      }
    }
    avi.clearumsg();
  }

  function verify(avi, a, row, column, color) {
    a[row].highlight([column]);
    var r, c;
    for (r = 0; r < 9; r++) {
      if (r != row) {
        a[r].css(column, {"background-color": color});
      }
    }
    for (c = 0; c < 9; c++) {
      if (c != column) {
        a[row].css(c, {"background-color": color});
      }
    }
    var ssr = parseInt(row / 3);
    var ssc = parseInt(column / 3);
    for (r = 3*ssr; r < 3*(ssr+1); r++) {
      for (c = 3*ssc; c < 3*(ssc+1); c++) {
        if (r != row && c != column) {
          a[r].css(c, {"background-color": color});
        }
      }
    }
    avi.umsg("In order to verify whether the value of the yellow cell is correct, we check whether this value is not contained in the green cells");
  }

  var verifyav = new JSAV("Sudoku3CON");
  var verifyarray = [];
  verifyarray[0] = verifyav.ds.array([3, 9, 6, 5, 1, 2, 4, 7, 8]),
  verifyarray[1] = verifyav.ds.array([4, 7, 1, 6, 8, 3, 5, 9, 2]),
  verifyarray[2] = verifyav.ds.array([2, 5, 8, 7, 4, 9, 3, 6, 1]),
  verifyarray[3] = verifyav.ds.array([1, 3, 4, 2, 7, 5, 6, 8, 9]),
  verifyarray[4] = verifyav.ds.array([6, 8, 7, 4, 9, 1, 2, 5, 3]),
  verifyarray[5] = verifyav.ds.array([5, 2, 9, 8, 3, 6, 7, 1, 4]),
  verifyarray[6] = verifyav.ds.array([8, 4, 2, 1, 5, 7, 9, 3, 6]),
  verifyarray[7] = verifyav.ds.array([7, 1, 3, 9, 6, 4, 8, 2, 5]),
  verifyarray[8] = verifyav.ds.array([9, 6, 5, 3, 2, 8, 1, 4, 7]);
  var row = Math.floor(Math.random()*9);
  var column = Math.floor(Math.random()*9);
  verify(verifyav, verifyarray, row, column, GREEN);
  verifyav.recorded();
})(jQuery);
