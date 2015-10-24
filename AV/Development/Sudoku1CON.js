"use strict";
$(document).ready(function () {
  var BLACK = "rgb(0, 0, 0)";
  var RED = "rgb(255, 0, 0)";

  function logic1(avi, a, row, column, n, color, h, k) {
    var j = 0;
    var msg = "";
    for (j=0; j<n; j++) {
      a[row[j]].css([column[j]], {"color": color});
    }
    a[h].highlight([k]);
    avi.clearumsg();
    if (n > 0) msg = " and by the red cells";
    avi.umsg("The value of the yellow cell is determined by the sub-square it belongs to" + msg);
    avi.step();
  }

  function logic2(avi, a, row, column, n, color, h, k, v) {
    var j = 0;
    for (j=0; j<n; j++) {
      a[row[j]].css([column[j]], {"color": color});
    }
    a[h].setvalue(k,v);
    avi.umsg("The value of the yellow cell has been set equal to " + v);
    avi.step();
    a[h].unhighlight([k]);
    avi.clearumsg();
  }

  var av_name = "Sudoku1CON";
  var av = new JSAV(av_name);
  console.log("Hello, world");
  var easyarray = [];
  easyarray[0] = av.ds.array([3, 9,  ,  ,  ,  ,  ,  , 8]),
  easyarray[1] = av.ds.array([' ', 7, 1,  ,  , 3,  ,  ,' ']),
  easyarray[2] = av.ds.array([' ', , 8, , 4, 9, , 6, ' ']),
  easyarray[3] = av.ds.array([1, , , 2, 7, , , , 9]),
  easyarray[4] = av.ds.array([6, , , , , , , , 3]),
  easyarray[5] = av.ds.array([5, , , , 3, 6, , , 4]),
  easyarray[6] = av.ds.array([' ', 4, , 1, 5, , 9, , ' ']),
  easyarray[7] = av.ds.array([' ', , , 9, , , 8, 2, ' ']),
  easyarray[8] = av.ds.array([9, , , , , , , 4, 7]);
  av.displayInit();

  logic1(av, easyarray, [0,2,3,6], [1,5,8,6], 4, RED, 1, 7);
  logic2(av, easyarray, [0,2,3,6], [1,5,8,6], 4, BLACK, 1, 7, 9);
  logic1(av, easyarray, [0,1,4], [0,5,8], 3, RED, 2, 6);
  logic2(av, easyarray, [0,1,4], [0,5,8], 3, BLACK, 2, 6, 3);
  logic1(av, easyarray, [2, 4], [7, 0], 2, RED, 0, 2);
  logic2(av, easyarray, [2, 4], [7, 0], 2, BLACK, 0, 2, 6);
  logic1(av, easyarray, [2], [4], 1, RED, 1, 0);
  logic2(av, easyarray, [2], [4], 1, BLACK, 1, 0, 4);
  logic1(av, easyarray, [5], [0], 1, RED, 2, 1);
  logic2(av, easyarray, [5], [0], 1, BLACK, 2, 1, 5);
  logic1(av, easyarray, [], [], 0, RED, 2, 0);
  logic2(av, easyarray, [], [], 0, BLACK, 2, 0, 2);
  av.recorded();
});
