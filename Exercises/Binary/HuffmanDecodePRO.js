/*global window */
(function() {
  "use strict";
  var huffmanDecodePRO = {
    initJSAV: function() {
      var av = new JSAV("HuffmanDecodePRO");
      var btTop = 10;
      var btLeft = 150;
      var t = av.ds.binarytree({nodegap: 15, top: btTop, left: btLeft});
      var r = t.root("");

      // constructs tree
      r.left("").left("O<br>67");
      r.left().right("T<br>85");
      r.right("").right("E<br>120");
      r.right().left("").right("H<br>50");
      r.right().left().left("").left("G<br>17");
      r.right().left().left().right("").left("").left("X<br>4");
      r.right().left().left().right().left().right("J<br>4");
      r.right().left().left().right().right("V<br>12");

      // Add more classes for leaf nodes for css styling
      r.left().left().addClass("huffmanleaf");
      r.left().right().addClass("huffmanleaf");
      r.right().right().addClass("huffmanleaf");
      r.right().left().right().addClass("huffmanleaf");
      r.right().left().left().left().addClass("huffmanleaf");
      r.right().left().left().right().left().left().addClass("huffmanleaf");
      r.right().left().left().right().left().right().addClass("huffmanleaf");
      r.right().left().left().right().right().addClass("huffmanleaf");

      // Add edge labels
      r.edgeToLeft().label("0");
      r.edgeToRight().label("1");
      r.left().edgeToLeft().label("0");
      r.left().edgeToRight().label("1");
      r.right().edgeToRight().label("1");
      r.right().edgeToLeft().label("0");
      r.right().left().edgeToRight().label("1");
      r.right().left().edgeToLeft().label("0");
      r.right().left().left().edgeToRight().label("1");
      r.right().left().left().edgeToLeft().label("0");
      r.right().left().left().right().edgeToRight().label("1");
      r.right().left().left().right().edgeToLeft().label("0");
      r.right().left().left().right().left().edgeToRight().label("1");
      r.right().left().left().right().left().edgeToLeft().label("0");

      t.layout();
      av.displayInit();
      av.recorded();
    },

    getIndices: function(type) {
      var indices = [],
          i,
          ilength = 1;
      if (type === 0) { ilength = Math.floor(Math.random() * 3) + 1; }
      for (i = 0; i < ilength; i++) {
        indices[i] = Math.floor(Math.random() * 8);
      }
      return indices;
    },

    genQandA: function(indices, sequenceType, qOrA) {
      var letters = ["O", "T", "E", "H", "G", "V", "X", "J"];
      var codes = ["00", "01", "11", "101", "1000", "10011", "100100", "100101"];
      var question = "",
          answers = "",
          i;
      if (sequenceType === 0) {
        for (i = 0; i < indices.length; i++) {
          question += letters[indices[i]];
          answers += codes[indices[i]];
        }
      } else {
        for (i = 0; i < indices.length; i++) {
          question += codes[indices[i]];
          answers += letters[indices[i]];
        }
      }

      if (qOrA === 0) {
        return question;
      }
      return answers;
    }
  };

  window.huffmanDecodePRO = window.huffmanDecodePRO || huffmanDecodePRO;
}());
