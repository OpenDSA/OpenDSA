(function ($) {
  if (!localStorage["slrdfaproductions"]) {
    window.close();
  }
  var variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var jsav = new JSAV("av");
  var prodTable,
      itemTable;
  var lambda = String.fromCharCode(955),
      epsilon = String.fromCharCode(949),
      arrow = String.fromCharCode(8594),
      dot = String.fromCharCode(183),
      selectedItem = null,
      emptystring = lambda;

  var getPossibleDerived = function (item) {
    var r = item[2];
    var d = [];
    if (r === emptystring) {
      return [[item[0], item[1], dot]];
    }
    for (var i = 0; i <= r.length; i++) {
      var str = r.substring(0, i) + dot + r.substring(i);
      d.push([item[0], item[1], str]);
    }
    return d;
  };

  var addClosure = function (items, productions) {
    // takes a list
    var itemsStack = [];
    for (var i = items.length - 1; i >= 0; i--) {
      itemsStack.push(items[i]);
    }
    var next = itemsStack.pop();
    var counter = 0;
    while (next) {
      counter++;
      if(counter>500) {
        console.warn(counter);
        break;
      }
      var di = next.indexOf(dot);
      if (di !== next.length - 1 && variables.indexOf(next[di + 1]) !== -1) {
        for (var j = 0; j < productions.length; j++) {
          if (productions[j][0] === next[di + 1]) {
            var r = productions[j][2];
            if (r === emptystring) {
              r = "";
            }
            var newItem = productions[j][0] + productions[j][1] + dot + r;
            // console.log(newItem);
            // console.log(""+itemsStack);
            if (items.indexOf(newItem) === -1) {
              itemsStack.unshift(newItem);
              items.push(newItem);
            }
          }
        }
      }
      next = itemsStack.pop();
    }
    return items;
  };
  var goTo = function (items, symbol) {
    var newItems = [];
    for (var i = 0; i < items.length; i++) {
      var r = items[i];
      for (var j = r.indexOf(arrow); j < r.length; j++) {
        if (r[j] === symbol && r[j - 1] === dot) {
          newItems = _.union(newItems, [r.substring(0, j - 1) + symbol + dot + r.substring(j + 1)]);
        }
      }
    }
    return newItems;
  };
  localStorage.removeItem('slrdfareturn');
  var productions = _.map(localStorage['slrdfaproductions'].split(','), function(x) { 
    var d = x.split(String.fromCharCode(8594));
    d.splice(1, 0, arrow);
    return d;
  });
  var goToSymbol = localStorage['slrdfasymbol'];
  var prevItemSet = localStorage['slrdfaitemset'];
  if (goToSymbol === 'initial') {
    var nextItemSet = addClosure(["S'"+arrow+dot+productions[0][2]], productions);
  } else {
    var nextItemSet = addClosure(goTo(prevItemSet.split(','), goToSymbol), productions);
  }
  var itemArr = [];
  for (var i = 0; i < productions.length; i++) {
    itemArr.push(["","",""]);
  }

  var init = function () {
    prodTable = jsav.ds.matrix(productions, {style: "table"});
    prodTable.element.addClass('prodTable');
    prodTable.layout();
    prodTable.on('click', prodHandler);
    jsav.label('Grammar', {relativeTo: prodTable, anchor: "center top", myAnchor: "center bottom"});
    itemTable = jsav.ds.matrix(itemArr, {style: "table", left: "50px", relativeTo: prodTable, anchor: "right top", myAnchor: "left top"});
    itemTable.layout();
    itemTable.on('click', itemHandler);
    jsav.label('Items', {relativeTo: itemTable, anchor: "center top", myAnchor: "center bottom"});
    return prodTable;
  };

  var addToItemTable = function (toAdd) {
    if (nextItemSet.indexOf(toAdd) === -1) {
      alert(toAdd + ' is not part of the set.');
      return;
    }
    var check = _.map(itemArr, function(x) {return x.join('');});
    if (check.indexOf(toAdd) === -1) {
      for (var i = 0; i < itemArr.length; i++) {
        if (!itemArr[i][0]) {
          var vs = toAdd.split(arrow);
          itemArr[i] = [vs[0], arrow, vs[1]];
          itemTable.value(i, 0, vs[0]);
          itemTable.value(i, 1, arrow);
          itemTable.value(i, 2, vs[1]);
          break;
        }
      }
      if (i === itemArr.length) {
        var l = itemArr.length;
        for (var j = 0; j < l; j++) {
          itemArr.push(["","",""]);
        }
        var vs = toAdd.split(arrow);
        itemArr[i] = [vs[0], arrow, vs[1]];
        itemTable.clear();
        itemTable = jsav.ds.matrix(itemArr, {style: "table", left: "50px", relativeTo: prodTable, anchor: "right top", myAnchor: "left top"});
        itemTable.layout();
        itemTable.on('click', itemHandler);
      }
    } 
  };

  var menuItemHandler = function (e) {
    addToItemTable($(this).val());
  };

  var prodHandler = function (index, index2, e) {
    for (var i = 0; i < prodTable._arrays.length; i++) {
      prodTable.unhighlight(i);
    }
    this.highlight(index);
    var p = [this.value(index, 0), this.value(index, 1), this.value(index, 2)];
    var d = getPossibleDerived(p);
    //console.log(""+d);
    $('#prodMenu').empty();
    for (var i = 0; i < d.length; i++) {
      $('#prodMenu').append('<input type="button" class="menuItem" value="'+d[i].join('')+'"><br>');
    }
    var xOffset = e.pageX,
        yOffset = e.pageY;
        w = $('.jsavvalue').width();
    //console.log(xOffset + " " + yOffset)
    $('#prodMenu').offset({left: xOffset, top: yOffset});
    $('#prodMenu').show();
    $('.menuItem').click(menuItemHandler);
  };

  var itemHandler = function (index, index2, e) {
    if (!this.value(index, 0)) {
      return;
    }
    for (var i = 0; i < itemTable._arrays.length; i++) {
      itemTable.unhighlight(i);
    }
    this.highlight(index);
    selectedItem = this.value(index, 0) + this.value(index, 1) + this.value(index, 2);
  };

  prodTable = init();

  //========================

  $('#closurebutton').click(function () {
    if (selectedItem === null) {
      alert('Select an item.');
      return;
    }
    var c = addClosure([selectedItem], productions);
    for (var i = 0; i < c.length; i++) {
      addToItemTable(c[i]);
    }
  });
  $('#finishbutton').click(function () {
    for (var i = 0; i < nextItemSet.length; i++) {
      addToItemTable(nextItemSet[i]);
    }
  });
  $('#okbutton').click(function () {
    var c = _.map(_.filter(itemArr, function(x) {return x[0];}), function(x) {return x.join('');});
    var inter = _.intersection(c, nextItemSet);
    if (inter.length === c.length && inter.length === nextItemSet.length) {
      localStorage['slrdfareturn'] = c;
      window.close();
    } else {
      alert('There are some items missing!');
      return;
    }
  });
  $('#cancelbutton').click(function() {
    if (goToSymbol === "initial") {
      alert('You must make the initial set.');
      return;
    }
    window.close();
  });
}(jQuery));
