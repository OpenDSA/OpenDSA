(function($) {

  function allcandidates(avi, a) {
    var ssr, ssc;
    for (ssr = 0; ssr < 3; ssr++) {
      for (ssc = 0; ssc < 3; ssc++) {
        var q = [true, true, true, true, true, true, true, true, true];
        var i, j, r, c;
        j = 0;
        for (r = 3*ssr; r < 3*(ssr+1); r++) {
          for (c = 3*ssc; c < 3*(ssc+1); c++) {
            if (parseInt(a[r].value(c)) > 0 && parseInt(a[r].value(c)) < 10) {
              q[a[r].value(c)-1] = false;
              j = j+1;
            }
          }
        }
        if (j<9) {      
          for (r = 3*ssr; r < 3*(ssr+1); r++) {
            for (c = 3*ssc; c < 3*(ssc+1); c++) {
              if (a[r].value(c) == 0) {
                var p = q.slice();
                for (i = 0; i < 9; i++) {
                  p[a[i].value(c)-1] = false;
                }
                for (i = 0; i < 9; i++) {
                  p[a[r].value(i)-1] = false;
                }
                var s = "[";
                for (i = 0; i < 9; i++) {
                  if (p[i] == true) s = s+(i+1)+",";
                }
                s = s+"]";
                s = s.replace(",]", "]");
                a[r].setvalue(c,s);
              }
            }
          }
        }
      }
    }
  }

  function candidates(avi, a, ssr, ssc) {
    var q = [true, true, true, true, true, true, true, true, true];
    var i, j, r, c;
    j = 0;
    for (r = 3*ssr; r < 3*(ssr+1); r++) {
      for (c = 3*ssc; c < 3*(ssc+1); c++) {
        if (parseInt(a[r].value(c)) > 0 && parseInt(a[r].value(c)) < 10) {
          q[a[r].value(c)-1] = false;
          j = j+1;
        }
      }
    }
    if (j<9) {      
      for (r = 3*ssr; r < 3*(ssr+1); r++) {
        for (c = 3*ssc; c < 3*(ssc+1); c++) {
          if (a[r].value(c) == 0) {
            var p = q.slice();
            for (i = 0; i < 9; i++) {
              p[a[i].value(c)-1] = false;
            }
            for (i = 0; i < 9; i++) {
              p[a[r].value(i)-1] = false;
            }
            var s = "[";
            for (i = 0; i < 9; i++) {
              if (p[i] == true) s = s+(i+1)+",";
            }
            s = s+"]";
            s = s.replace(",]", "]");
            a[r].setvalue(c,s);
            a[r].highlight([c]);
          }
        }
      }
      avi.umsg("Each digit, missing in the sub-square with yellow cells, has at least two possible positions, and each yellow cell has two possible digits")
      avi.step();
      clean(avi, a, ssr, ssc);
    }
  }

  var difficultav = new JSAV("Sudoku2CON");
  var difficultarray = [];
  difficultarray[0] = difficultav.ds.array([' ', ,  , 6,  , 2,  , 9, ' ']),
  difficultarray[1] = difficultav.ds.array([' ', , , 8,  , ,  ,  , 6]),
  difficultarray[2] = difficultav.ds.array([' ', , 6, 7, 3, 1, 5, , 8]),
  difficultarray[3] = difficultav.ds.array([4, 2, 9, 3, 1, 8, 6, 7, 5]),
  difficultarray[4] = difficultav.ds.array([6, 7, 3, 2, , , 1, 8, 4]),
  difficultarray[5] = difficultav.ds.array([5, 1, 8, 4, 6, 7, 9, 3, 2]),
  difficultarray[6] = difficultav.ds.array([' ', , 1, 5, 2, 3, , 6, ' ']),
  difficultarray[7] = difficultav.ds.array([7, , , 1, 8, 6, , , ' ']),
  difficultarray[8] = difficultav.ds.array([' ', 6, 2, 9, 7, 4, , , ' ']);
  candidates(difficultav, difficultarray, 0, 0);
  candidates(difficultav, difficultarray, 0, 1);
  candidates(difficultav, difficultarray, 0, 2);
  candidates(difficultav, difficultarray, 1, 0);
  candidates(difficultav, difficultarray, 1, 1);
  candidates(difficultav, difficultarray, 1, 2);
  candidates(difficultav, difficultarray, 2, 0);
  candidates(difficultav, difficultarray, 2, 1);
  candidates(difficultav, difficultarray, 2, 2);
  allcandidates(difficultav, difficultarray);
  difficultav.recorded();

})(jQuery);
