var latexit = "http://latex.codecogs.com/svg.latex?";
var arr;
$(document).ready(function () {
    "use strict";
    var variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var jsav = new JSAV("av");
    var arrow = String.fromCharCode(8594),
        lastRow,            // index of the last visible row (the empty row)
        //arr,                // the grammar
        backup = null,      // a copy of the original grammar (as a string) before it is transformed
        m,                  // the grammar table
        tGrammar,           // transformed grammar
        derivationTable,    // the derivation table shown during brute-force parsing
        parseTableDisplay,  // the parse table
        parseTree,          // parse tree shown during parsing slideshows
        parseTable,         // parse table used for pasing
        conflictTable,      // used for SLR parsing conflicts
        ffTable,            // table for FIRST and FOLLOW sets
        arrayStep,          // the position of FIRST or FOLLOW cells
        selectedNode,       // used for FA/graph editing
        modelDFA,           // DFA used to build SLR parse table
        builtDFA,           // DFA created by the user
        type = $("h1").attr('id'),               // type of parsing, can be bf, ll, slr
        grammars,           // stores grammar exercises, xml
        currentExercise = 0,// current exercise index
        multiple = false,   // if multiple grammar editing is enabled
        fi,                 // input box for matrix
        row,              // row number for input box
        col;              // column number for input box


    var parenthesis = "(";

    var lambda = String.fromCharCode(955),
        epsilon = String.fromCharCode(949),
        square = String.fromCharCode(9633),
        dot = String.fromCharCode(183),
        emptystring = lambda;
    /*
  If there is a grammar in local storage, load that grammar.
  This is used to import grammars from certain proofs.
  */
    //do not look at the storage if the editor is for an exercise
    if (type == null && localStorage["grammar"]) {
        arr = JSON.parse(localStorage.getItem("grammar"));
        lastRow = arr.length;
        // add an empty row for editing purposes (clicking the empty row allows the user to add productions)
        //arr.push(["S", arrow, "jZ"]);
        arr.push(["", arrow, ""]);
        // clear the grammar from local storage to prevent it from being loaded by other grammar tests
        localStorage.removeItem('grammar');
    } else {
        arr = new Array(20);    // arbitrary array size
        for (var i = 0; i < arr.length; i++) {
            arr[i] = ["", arrow, ""];
        }
        lastRow = 0;
    }

    // Function to initialize/reinitialize the grammar display
    var init = function () {
        if (m) {
            m.clear();
        }
        var m2 = jsav.ds.matrix(arr, {style: "table"});
        // hide all of the empty rows
        for (var i = lastRow+1; i < arr.length; i++) {
            m2._arrays[i].hide();
        }
        layoutTable(m2, 2);
        if(type !== "transformation")
            m2.on('click', matrixClickHandler);
        return m2;
    };

    // fired when document is clicked
    // saves current fi input value
    function defocus(e) {
        if ($(e.target).hasClass("jsavvaluelabel")) return;
        if ($(e.target).attr('id') == "firstinput") return;
        if (!fi || !fi.is(':visible')) return;
        var input = fi.val();
        var regex = new RegExp(emptystring, g);
        input = input.replace(regex, "");
        input = input.replace(regex, "!");
        if (input == "" && col == 2) {
            input = emptystring;
        }
        if (input === "" && col === 0) {
            //alert('Invalid left-hand side.');
            fi.remove();
            return;
        }
        if (col == 2 && _.find(arr, function(x) { return x[0] == arr[row][0] && x[2] == input && arr.indexOf(x) !== row;})) {
            alert('This production already exists.');
            return;
        }
        fi.remove();
        m.value(row, col, input);
        arr[row][col] = input;
        layoutTable(m, 2);
    }

    // LL(1) parsing
    var llParse = function () {
        if(checkLHSVariables()){
            alert('Your production is unrestricted on the left hand side');
            return;
        }
        var firsts = {};
        var follows = {};
        var productions = _.map(_.filter(arr, function(x) { return x[0]}), function(x) {return x.slice();});
        if (productions.length === 0) {
            alert('No grammar.');
            return;
        }
        var pDict = {};     // a dictionary mapping left sides to right sides
        for (var i = 0; i < productions.length; i++) {
            if (!(productions[i][0] in pDict)) {
                pDict[productions[i][0]] = [];
            }
            pDict[productions[i][0]].push(productions[i][2]);
        }
        var derivers = {};  // variables that derive lambda
        var counter = 0;
        while (removeLambdaHelper(derivers, productions)) {
            counter++;
            if (counter > 500) {
                console.log(counter);
                break;
            }
        };
        // variables
        var v = {};
        // terminals
        var t = {};
        for (var i = 0; i < productions.length; i++) {
            var x = productions[i];
            v[x[0]] = true;
            for (var j = 0; j < x[2].length; j++) {
                if (variables.indexOf(x[2][j]) !== -1) {
                    v[x[2][j]] = true;
                } else if (x[2][j] !== emptystring) {
                    t[x[2][j]] = true;
                }
            }
        }
        v = Object.keys(v);
        v.sort();
        t = Object.keys(t);
        t.sort();
        t.push('$');

        // populate firsts and follows sets
        for (var i = 0; i < v.length; i++) {
            firsts[v[i]] = first(v[i], pDict, derivers).sort();
        }
        for (var i = 0; i < v.length; i++) {
            follows[v[i]] = follow(v[i], productions, pDict, derivers).sort();
        }
        /*
    parseTable is the parse table, while parseTableDisplay is the matrix displayed to the user.
    parseTableDisplay includes the row/column headers (which are ignored by the click handler).
    */
        parseTable = [];
        for (var i = 0; i < v.length; i++) {
            var a = [];
            for (var j = 0; j < t.length; j++) {
                a.push("");
            }
            parseTable.push(a);
        }
        // fill in parseTable
        for (var i = 0; i < productions.length; i++) {
            var pFirst = first(productions[i][2], pDict, derivers);
            var vi = v.indexOf(productions[i][0]);
            for (var j = 0; j < pFirst.length; j++) {
                var ti = t.indexOf(pFirst[j]);
                if (pFirst[j] !== emptystring && ti !== -1) {
                    // exit parsing if a parse table conflict is found
                    if (parseTable[vi][ti] && parseTable[vi][ti] !== productions[i][2]) {
                        alert('This grammar is not LL(1)!');
                        return;
                    }
                    parseTable[vi][ti] = productions[i][2];
                }
            }
            if (pFirst.indexOf(emptystring) !== -1) {
                var pFollow = follows[productions[i][0]];
                for (var j = 0; j < pFollow.length; j++) {
                    var ti = t.indexOf(pFollow[j]);
                    if (pFollow[j] !== emptystring && ti !== -1) {
                        // exit parsing if a parse table conflict is found
                        if (parseTable[vi][ti] && parseTable[vi][ti] !== productions[i][2]) {
                            alert('This grammar is not LL(1)!');
                            return;
                        }
                        parseTable[vi][ti] = productions[i][2];
                    }
                }
            }
        }
        startParse();
        $('#followbutton').show();
        $('.jsavcontrols').hide();
        $(m.element).css("margin-left", "auto");
        // $(m.element).css('position', 'absolute');

        // create the table for FIRST and FOLLOW sets
        var ffDisplay = [];
        ffDisplay.push(["", "FIRST", "FOLLOW"]);
        for (var i = 0; i < v.length; i++) {
            var vv = v[i];
            ffDisplay.push([vv, "", ""]);
        }
        jsav.umsg('Define FIRST sets. ! is '+emptystring+'.');
        ffTable = new jsav.ds.matrix(ffDisplay);
        // ffTable = new jsav.ds.matrix(ffDisplay, {left: "30px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
        arrayStep = 1;
        ffTable.click(firstFollowHandler);

        $('#followbutton').click(function () {
            var check = continueToFollow(firsts, follows);
            if (check) {
                $('#parsetablebutton').show();
            }
        });

        // Function to check FOLLOW set and transition to parse table editing
        var continueToParseTable = function () {
            $('#firstinput').remove();
            var incorrect = checkTable(firsts, follows);
            // provide option to complete FOLLOW sets automatically
            if (incorrect.length > 0) {
                var confirmed = confirm('The following sets are incorrect: ' + incorrect + '.\nFix automatically?');
                if (confirmed) {
                    for (var i = 1; i < ffTable._arrays.length; i++) {
                        var a = ffTable._arrays[i].value(0);
                        ffTable.value(i, 2, follows[a]);
                    }
                    layoutTable(ffTable);
                } else {
                    return;
                }
            }
            $(ffTable.element).off();
            $('#parsetablebutton').hide();
            $('#parsereadybutton').show();
            jsav.umsg('Fill entries in parse table. ! is '+emptystring+'.');
            var pTableDisplay = [];
            pTableDisplay.push([""].concat(t));
            for (var i = 0; i < v.length; i++) {
                var toPush = [v[i]];
                for (var j = 0; j < parseTable[i].length; j++) {
                    toPush.push('');
                }
                pTableDisplay.push(toPush);
            }
            parseTableDisplay = new jsav.ds.matrix(pTableDisplay);
            parseTableDisplay.addClass("parseTableDisplay");
            parseTableDisplay.click(llparseTableHandler);
        };
        $('#parsetablebutton').click(continueToParseTable);
        $('#parsereadybutton').click(function() {
            checkllParseTable(parseTableDisplay, parseTable);
        });

        // do the parsing
        var continueParse = function () {
            var inputString = prompt('Input string');
            if (inputString === null) {
                return;
            }
            startParse();
            $(m.element).css("margin-left", "auto");
            //$(m.element).css('position', 'absolute');
            var pTableDisplay = [];
            pTableDisplay.push([""].concat(t));
            for (var i = 0; i < v.length; i++) {
                pTableDisplay.push([v[i]].concat(parseTable[i]));
            }
            //jsav.label('Grammar', {relativeTo: m, anchor: "center top", myAnchor: "center bottom"});
            parseTableDisplay = new jsav.ds.matrix(pTableDisplay);
            layoutTable(parseTableDisplay);
            //parseTableDisplay = new jsav.ds.matrix(pTableDisplay, {left: "30px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
            var remainingInput = inputString + '$';
            // display remaining input and the parse stack
            updateSLRDisplay('<mark>' + remainingInput[0] + '</mark>' + remainingInput.substring(1) , ' <mark>' + productions[0][0] + '</mark>');
            jsav.displayInit();
            parseTree = new jsav.ds.tree();

            var next;
            var parseStack = [parseTree.root(productions[0][0])];

            updateSLRDisplay('<mark>' + remainingInput[0] + '</mark>' + remainingInput.substring(1), "");
            var accept = true;

            parseTree.layout();
            counter = 0;
            while (true) {
                counter++;
                if (counter > 500) {
                    console.warn(counter);
                    break;
                }
                next = parseStack.pop();
                if (!next) {
                    break;
                }
                var vi = v.indexOf(next.value());
                var ti = t.indexOf(remainingInput[0])
                // if the terminal on the stack and the next terminal in the input do not match, the string is rejected
                if (vi === -1 && next.value() !== remainingInput[0]) {
                    accept = false;
                    break;
                }
                jsav.step();
                // if terminal:
                if (vi !== -1) {
                    var toAdd = parseTable[vi][ti];
                    if (!toAdd) {
                        accept = false;
                        break;
                    }
                    for (var j = 0; j < parseTableDisplay._arrays.length; j++) {
                        parseTableDisplay._arrays[j].unhighlight();
                    }
                    // highlight the relevant cell in the parse table (offset by 1 due to row/column headers)
                    parseTableDisplay.highlight(vi + 1, ti + 1);
                    var temp = [];
                    // create parse tree nodes
                    for (var i = 0 ; i < toAdd.length; i++) {
                        // note: .child(x, y) creates a child node but returns the parent
                        var n = next.child(i, toAdd[i]).child(i);
                        if (v.indexOf(toAdd[i]) === -1) {
                            n.addClass('terminal');
                        }
                        if (toAdd[i] !== emptystring) {
                            temp.unshift(n);
                        }
                    }
                    parseStack = parseStack.concat(temp);
                    parseTree.layout();
                } else if (next.value() === remainingInput[0]) {
                    remainingInput = remainingInput.substring(1);
                }
                updateSLRDisplay('<mark>' + remainingInput[0] + '</mark>' + remainingInput.substring(1),
                    _.map(parseStack, function(x, k) {
                        if (k === parseStack.length - 1) {return '<mark>'+x.value()+'</mark>';} return x.value();}));
            }
            jsav.step();
            if (accept && remainingInput[0] === '$' && !next) {
                jsav.umsg('"' + inputString + '" accepted');
            } else {
                jsav.umsg('"' + inputString + '" rejected');
            }
            for (var j = 0; j < parseTableDisplay._arrays.length; j++) {
                parseTableDisplay._arrays[j].unhighlight();
            }
            jsav.recorded();
        };
        // allow user to parse repeatedly with different inputs
        $('#parsebutton').click(continueParse);
    };

    // SLR(1) parsing helpers:
    // click handler for the nodes of the DFA being built
    var dfaHandler = function (e) {
        if (selectedNode) {
            selectedNode.unhighlight();
        }
        if ($('.jsavgraph').hasClass('addfinals')) {
            this.toggleClass('final');
        }
        else {
            this.highlight();
            // if node clicked is the toNode for the new edge
            // check for goto set
            if(selectedNode && localStorage['slrdfareturn']) {
                var newItemSet = localStorage['slrdfareturn'].replace(/,/g, '<br>');
                if (this.stateLabel() === newItemSet) {
                    builtDFA.addEdge(selectedNode, this, {weight: localStorage['slrdfasymbol']});
                    builtDFA.layout();
                    jsav.umsg("Build the DFA: Click a state.");
                    selectedNode.unhighlight();
                    this.unhighlight();
                    selectedNode = null;
                    return;
                } else {
                    alert('Incorrect.');
                    this.unhighlight();
                    return;
                }
            }
            // if node clicked is fromNode
            var pr = prompt('Grammar symbol for the transition?');
            if (!pr) {
                this.unhighlight();
                return;
            }
            var bEdges = this.getOutgoing();
            for (var i = 0; i < bEdges.length; i++) {
                if (bEdges[i].weight().split('<br>').indexOf(pr) !== -1) {
                    alert('Transition already created.');
                    this.unhighlight();
                    return;
                }
            }
            selectedNode = this;
            var nodes = modelDFA.nodes();
            var checkNode;
            for (var next = nodes.next(); next; next = nodes.next()) {
                // get state label of the hidden node:
                var modelItems = next._stateLabel.element[0].innerHTML.split('<br>');
                // get state label of the visible node:
                var builtItems = this.stateLabel().split('<br>');
                // find the model node corresponding to the selected node:
                var inter = _.intersection(modelItems, builtItems);
                if (inter.length === modelItems.length && inter.length === builtItems.length) {
                    checkNode = next;
                    break;
                }
            }
            // find model edge corresponding to transition to be built
            var edges = checkNode.getOutgoing();
            for (var i = 0; i < edges.length; i++) {
                var w = edges[i].weight().split('<br>');
                if (w.indexOf(pr) !== -1) {
                    // open goto window for user to fill out the item set
                    var productions = _.filter(arr, function(x) {return x[0];});
                    localStorage['slrdfaproductions'] = ["S'" + arrow + productions[0][0]].concat(_.map(productions, function(x) {return x.join('');}));
                    localStorage['slrdfaitemset'] = this.stateLabel().split('<br>');
                    localStorage['slrdfasymbol'] = pr;
                    window.open('slrGoTo.html', '', 'width = 800, height = 750, screenX = 300, screenY = 25');
                    jsav.umsg('Place the new node.');
                    break;
                }
            }
            e.stopPropagation();
        }

    };


    //Multiple Brute Force Parsing
    function mbfParse(productions){
        var productions = _.filter(arr, function(x) {return x[0];});
        localStorage['grammars'] = JSON.stringify(productions);
        window.open("./MBFParse.html");
    };

    /*
  SLR(1) parsing
  Does not check to see if the grammar is correct format.
  */
    var slrParse = function () {
        if(checkLHSVariables()){
            alert('Your production is unrestricted on the left hand side');
            return;
        }
        var productions = _.map(_.filter(arr, function(x) { return x[0]}), function(x) {return x.slice();});
        if (productions.length === 0) {
            alert('No grammar.');
            return;
        }
        // variables:
        var v = {};
        // terminals:
        var t = {};
        for (var i = 0; i < productions.length; i++) {
            var x = productions[i];
            v[x[0]] = true;
            for (var j = 0; j < x[2].length; j++) {
                if (variables.indexOf(x[2][j]) !== -1) {
                    v[x[2][j]] = true;
                } else if (x[2][j] !== emptystring) {
                    t[x[2][j]] = true;
                }
            }
        }
        v = Object.keys(v);
        v.sort();
        t = Object.keys(t);
        t.sort();
        t.push('$');
        // terminals + variables:
        var tv = t.concat(v);
        // variables + terminals:
        var vt = v.concat(t);
        parseTable = [];
        for (var i = 0; i < productions.length; i++) {
            var a = [];
            for (var j = 0; j < tv.length; j++) {
                a.push("");
            }
            parseTable.push(a);
        }

        startParse();
        $(m.element).css("margin-left", "auto");
        // $(m.element).css('position', 'absolute');

        var slrM = [[0, "S'", arrow, productions[0][0]]];
        for (var i = 0; i < productions.length; i++) {
            var prod = productions[i];
            slrM.push([i+1, prod[0], prod[1], prod[2]]);
        }
        if (m) {
            m.clear();
        }
        m = jsav.ds.matrix(slrM, {style: "table"});
        layoutTable(m);

        var ffDisplay = [];
        ffDisplay.push(["", "FIRST", "FOLLOW"]);
        for (var i = 0; i < v.length; i++) {
            var vv = v[i];
            ffDisplay.push([vv, "", ""]);
        }
        jsav.umsg('Define FIRST sets. ! is '+emptystring+'.');
        ffTable = new jsav.ds.matrix(ffDisplay);
        // ffTable = new jsav.ds.matrix(ffDisplay, {left: "30px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
        arrayStep = 1;

        // build DFA to model the parsing stack
        modelDFA = jsav.ds.FA({width: '90%', height: 440, layout: 'automatic'});
        var sNode = modelDFA.addNode();
        modelDFA.makeInitial(sNode);
        sNode.stateLabel("S'"+arrow+dot+productions[0][0]);
        var nodeStack = [sNode];
        while (nodeStack.length > 0) {
            var nextNode = nodeStack.pop();
            nextNode.addClass('slrvisited');
            var items = addClosure(nextNode.stateLabel().split('<br>'), productions);
            nextNode.stateLabel(items.join('<br>'));
            for (var i = 0; i < vt.length; i++) {
                var symbol = vt[i];
                var nextItems = addClosure(goTo(items, symbol), productions);
                if (nextItems.length > 0) {
                    var nodes = modelDFA.nodes();
                    var toNode = null;
                    // check if node has already been created
                    for (var next = nodes.next(); next; next = nodes.next()) {
                        var curItems = next.stateLabel().split('<br>');
                        var inter = _.intersection(curItems, nextItems);
                        if (inter.length === curItems.length && inter.length === nextItems.length) {
                            toNode = next;
                        }
                    }
                    if (!toNode) {
                        toNode = modelDFA.addNode();
                        toNode.stateLabel(nextItems.join('<br>'));
                    }
                    modelDFA.addEdge(nextNode, toNode, {weight: symbol});
                    if (!toNode.hasClass('slrvisited')) {
                        nodeStack.push(toNode);
                    }
                }
            }
        }
        // add final states
        var nodes = modelDFA.nodes();
        for (var next = nodes.next(); next; next = nodes.next()) {
            var items = next.stateLabel().split('<br>');
            for (var i = 0; i < items.length; i++) {
                var r = items[i];
                if (r[r.length - 1] === dot) {
                    next.addClass('final');
                    break;
                }
            }
        }
        modelDFA.layout();

        // use DFA to generate the parse table
        var pDict = {};     // a dictionary mapping left sides to right sides
        for (var i = 0; i < productions.length; i++) {
            if (!(productions[i][0] in pDict)) {
                pDict[productions[i][0]] = [];
            }
            pDict[productions[i][0]].push(productions[i][2]);
        }
        var derivers = {};  // variables that derive lambda
        var counter = 0;
        while (removeLambdaHelper(derivers, productions)) {
            counter++;
            if (counter > 500) {
                console.log(counter);
                break;
            }
        };
        // get FIRSTs and FOLLOWs
        var firsts = {};
        for (var i = 0; i < v.length; i++) {
            firsts[v[i]] = first(v[i], pDict, derivers).sort();
        }
        var follows = {};
        for (var i = 0; i < v.length; i++) {
            follows[v[i]] = follow(v[i], productions, pDict, derivers).sort();
        }

        // add the extra S' -> S production
        pDict["S'"] = productions[0][0];
        if (productions[0][0] in derivers) {
            derivers["S'"] = true;
        }
        productions.unshift(["S'", arrow, productions[0][0]]);

        // Create parse table using the DFA
        nodes.reset();
        var index = 0;
        conflictTable = [];
        for (var next = nodes.next(); next; next = nodes.next()) {
            var row = [];
            var conflictRow = [];
            for (var j = 0; j < tv.length; j++) {
                row.push("");
                conflictRow.push([]);
            }
            parseTable.push(row);
            conflictTable.push(conflictRow);
            var edges = next.getOutgoing();
            for (var i = 0; i < edges.length; i++) {
                var w = edges[i].weight().split('<br>');
                for (var j = 0; j < w.length; j++) {
                    var ti = t.indexOf(w[j]);
                    if (ti !== -1) {
                        var entry = 's' + edges[i].end().value().substring(1);
                        parseTable[index][ti] = entry;
                        conflictTable[index][ti].push(entry);
                    } else {
                        var vi = tv.indexOf(w[j]);
                        parseTable[index][vi] = edges[i].end().value().substring(1);
                    }
                }
            }
            if (next.hasClass('final')) {
                var l = next.stateLabel().split('<br>');
                var rItem = null;
                var rk = [];
                for (var i = 0; i < l.length; i++){
                    if (l[i].indexOf(dot) === l[i].length - 1) {
                        rItem = l[i].substring(0, l[i].length-1);
                        if (!rItem.split(arrow)[1]) {
                            rItem = rItem + emptystring;
                        }
                        break;
                    }
                }
                if (rItem.substr(0, 2) === "S'") {
                    var ti = tv.indexOf('$');
                    parseTable[index][ti] = 'acc';
                } else {
                    for (var i = 0; i < productions.length; i++) {
                        if (productions[i].join('') === rItem) {
                            rk.push(i);
                        }
                    }
                    for (var j = 0; j < rk.length; j++) {
                        var followSet = follows[productions[rk[j]][0]];
                        for (var i = 0; i < followSet.length; i++) {
                            var ti = tv.indexOf(followSet[i]);
                            parseTable[index][ti] = 'r' + rk[j];
                            conflictTable[index][ti].push('r' + rk[j]);
                        }
                    }
                }
            }
            index++;
        }

        // var conflict = _.filter(conflictTable, function(row) {return _.filter(row, function(entry) {return entry.length > 1;});});

        var conflict = _.filter(conflictTable, function() {
            for (var r = 0; r < conflictTable.length; r++) {
                for (var c = 0; c < conflictTable[r].length; c++) {
                    if (conflictTable[r][c].length > 1){
                        return true;
                    }
                }
            }
            return false;
        });

        console.log(conflict);

        modelDFA.hide();
        $('#followbutton').show();
        $('.jsavcontrols').hide();

        if (conflict.length > 0) {
            console.log("conflict.length: " + conflict.length);
            var contin = confirm("This grammar is not SLR(1)\nContinue?");
            if (!contin) {
                $('#backbutton').click();
                return;
            }
        }

        // interactable FIRST/FOLLOW, same as LL parsing
        ffTable.click(firstFollowHandler);
        $('#followbutton').click(function () {
            var check = continueToFollow(firsts, follows);
            if (check) {
                $('#slrdfabutton').show();
            }
        });
        // Function to check FOLLOW sets and initialize the DFA
        var continueToDFA = function () {
            $('#firstinput').remove();
            var incorrect = checkTable(firsts, follows);
            // provide option to complete the FOLLOW sets automatically
            if (incorrect.length > 0) {
                var confirmed = confirm('The following sets are incorrect: ' + incorrect + '.\nFix automatically?');
                if (confirmed) {
                    for (var i = 1; i < ffTable._arrays.length; i++) {
                        var a = ffTable._arrays[i].value(0);
                        ffTable.value(i, 2, follows[a]);
                    }
                    layoutTable(ffTable);
                } else {
                    return;
                }
            }
            $(ffTable.element).off();
            $('#slrdfabutton').hide();
            $('#parsetablebutton').show();
            jsav.umsg('Build the DFA: Click a state.');
            // create the DFA
            builtDFA = jsav.ds.FA({width: '90%', height: 440});
            builtDFA.enableDragging();
            builtDFA.click(dfaHandler);
            $('.jsavgraph').click(graphHandler);
            $('#av').append($('#dfabuttons'));
            $('#dfabuttons').show();
            var pr = confirm("Would you like to define the initial set yourself?");
            if (pr) {
                // user fills out the initial set in the goTo window and adds the initial node to the graph manually
                localStorage['slrdfaproductions'] = _.map(productions, function(x) {return x.join('');});
                localStorage['slrdfasymbol'] = 'initial';
                window.open('slrGoTo.html', '', 'width = 800, height = 750, screenX = 300, screenY = 25');
                jsav.umsg("Add the initial node.");
            } else {
                // initial state is added automatically
                var builtInitial = builtDFA.addNode({left: 50, top: 50});
                builtDFA.makeInitial(builtInitial);
                builtInitial.stateLabel(modelDFA.initial._stateLabel.element[0].innerHTML);
                builtDFA.layout();
            }
        };
        $('#slrdfabutton').click(continueToDFA);

        // Function to check the DFA and transition to the parse table
        var continueToParseTable = function () {
            var edges1 = modelDFA.edges();
            var edges2 = builtDFA.edges();
            var tCount1 = 0,
                tCount2 = 0,
                correctFinals = true;
            for (var next = edges1.next(); next; next = edges1.next()) {
                tCount1 = tCount1 + next.weight().split('<br>').length;
            }
            for (var next = edges2.next(); next; next = edges2.next()) {
                tCount2 = tCount2 + next.weight().split('<br>').length;
            }
            var bNodes = builtDFA.nodes();
            for (var next = bNodes.next(); next; next = bNodes.next()) {
                var nis = next.stateLabel().split('<br>');
                var ff = _.find(nis, function(x) {return x[x.length - 1] === dot; });
                if (ff && !next.hasClass('final')) {
                    correctFinals = false;
                    break;
                }
                if (!ff && next.hasClass('final')) {
                    correctFinals = false;
                    break;
                }
            }
            // if the number of transitions and number of nodes match, and final nodes are correct
            if (tCount1 !== tCount2 || modelDFA.nodeCount() !== builtDFA.nodeCount() || !correctFinals) {
                var confirmed = confirm('Not finished!\nFinish automatically?');
                // "finish automatically" = displaying the model DFA. This changes the layout.
                if (confirmed) {
                    builtDFA.clear();
                    modelDFA.show();
                } else {
                    return;
                }
            }
            $('#dfabuttons').hide();
            $('#parsetablebutton').hide();
            $('#parsereadybutton').show();
            jsav.umsg('Fill entries in parse table. ! is '+emptystring+'.');
            // initialize parse table display
            var pTableDisplay = [];
            pTableDisplay.push([""].concat(tv));
            for (var i = 0; i < modelDFA.nodeCount(); i++) {
                var toPush = [i];
                for (var j = 0; j < parseTable[i].length; j++) {
                    toPush.push('');
                }
                pTableDisplay.push(toPush);
            }
            //jsav.label('Grammar', {relativeTo: m, anchor: "center top", myAnchor: "center bottom"});
            parseTableDisplay = new jsav.ds.matrix(pTableDisplay);
            parseTableDisplay.click(slrparseTableHandler);
        };
        $('#parsetablebutton').click(continueToParseTable);
        $('#parsereadybutton').click(function() {
            checkslrParseTable(parseTableDisplay, parseTable);
        });

        // do the parsing
        var continueParse = function () {
            $('#buttons').prepend($('#parsebutton'));
            var inputString = prompt('Input string');
            if (inputString === null) {
                return;
            }
            startParse();
            var slrM = [];
            for (var i = 0; i < productions.length; i++) {
                var prod = productions[i];
                slrM.push([i, prod[0], prod[1], prod[2]]);
            }
            if (m) {
                m.clear();
            }
            m = jsav.ds.matrix(slrM, {style: "table"});
            layoutTable(m);
            var pTableDisplay = [];
            pTableDisplay.push([""].concat(tv));
            for (var i = 0; i < modelDFA.nodeCount(); i++) {
                pTableDisplay.push([i].concat(parseTable[i]));
            }
            //parseTableDisplay = new jsav.ds.matrix(pTableDisplay, {left: "30px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
            $(m.element).css("margin-left", "auto");
            $(m.element).css("margin-top", "0px");
            parseTableDisplay = new jsav.ds.matrix(pTableDisplay);
            layoutTable(parseTableDisplay);
            // The parse 'tree' is a directed graph with layered output. This allows the tree to be built bottom up
            parseTree = new jsav.ds.graph({layout: "layered", directed: true});
            parseTree.element.addClass('parsetree');
            var remainingInput = inputString + '$';
            var parseStack = [0];
            var currentRow = 0;
            var accept = false;
            var displayOrder = [];
            updateSLRDisplay(remainingInput, productions[1][0]);

            $('.jsavcontrols').insertAfter($('.jsavmatrix:eq(1)'));
            $('.jsavoutput').insertAfter($('.jsavcontrols'));
            var container = document.getElementById("container");
            container.scrollTop = container.scrollHeight;

            jsav.displayInit();
            // m.hide();
            // parseTableDisplay.hide();
            updateSLRDisplay(remainingInput ,"");

            counter = 0;
            while (true) {
                counter++;
                if (counter > 500) {
                    console.warn(counter);
                    break;
                }
                // index of the lookahead
                var lookAhead = tv.indexOf(remainingInput[0]);
                // parse table entry to be processed
                var entry = parseTable[currentRow][lookAhead];
                for (var j = 0; j < m._arrays.length; j++) {
                    m.unhighlight(j);
                }
                for (var j = 0; j < parseTableDisplay._arrays.length; j++) {
                    parseTableDisplay.unhighlight(j);
                }
                parseTableDisplay.highlight(currentRow+1, lookAhead+1);
                if (!entry) {
                    break;
                }
                if (entry === 'acc') {
                    accept = true;
                    jsav.step();
                    break;
                }
                if (entry[0] === 's') {             // shift
                    // add parse tree node, and add items to the stack
                    var term = parseTree.addNode(remainingInput[0]);
                    term.addClass('terminal');
                    parseStack.push(term);
                    displayOrder.push(term);
                    currentRow = Number(entry.substring(1));
                    parseStack.push(currentRow);
                    remainingInput = remainingInput.substring(1);
                    parseTree.layout();
                } else if (entry[0] === 'r') {      // reduce
                    var pIndex = Number(entry.substring(1));
                    var p = productions[pIndex];
                    m.highlight(pIndex);
                    if (p[2] === emptystring) {
                        var lNode = parseTree.addNode(emptystring);
                        lNode.addClass('terminal');
                        parseTree.layout();
                        jsav.step();
                        var par = parseTree.addNode(p[0]);
                        parseTree.addEdge(par, lNode);
                        var n = currentRow;
                    } else {
                        var par = parseTree.addNode(p[0]);
                        var childs = [];
                        for (var i = p[2].length - 1; i >= 0; i--) {
                            parseStack.pop();
                            childs.unshift(parseStack.pop());
                        }
                        for (var i = 0; i < childs.length; i++) {
                            parseTree.addEdge(par, childs[i]);
                        }
                        var n = parseStack[parseStack.length - 1];
                    }
                    parseTree.layout();
                    updateSLRDisplay(remainingInput,
                        _.map(parseStack, function(x, k) {
                            if (typeof x === 'number' || typeof x === 'string') {
                                return x;
                            }
                            return x.value();}));
                    jsav.step();
                    parseStack.push(par);
                    displayOrder.push(par);
                    currentRow = Number(parseTable[n][tv.indexOf(p[0])]);
                    for (var j = 0; j < parseTableDisplay._arrays.length; j++) {
                        parseTableDisplay.unhighlight(j);
                    }
                    parseTableDisplay.highlight(n+1, tv.indexOf(p[0]) + 1);
                    parseStack.push(currentRow);
                    parseTree.layout();
                }
                updateSLRDisplay(remainingInput,
                    _.map(parseStack, function(x, k) {
                        if (typeof x === 'number' || typeof x === 'string') {
                            return x;
                        }
                        return x.value();}));
                jsav.step();
            }
            if (accept) {
                jsav.umsg('"' + inputString + '" accepted');
            } else {
                jsav.umsg('"' + inputString + '" rejected');
            }
            jsav.recorded();
        };
        $('#parsebutton').click(continueParse);
    };

    // change editing modes
    var editMode = function() {
        $('.jsavmatrix').addClass("editMode");
        $('.jsavmatrix').removeClass("deleteMode");
        $('.jsavmatrix').removeClass("addrowMode");
        $("#mode").html('Editing');
    };
    var deleteMode = function() {
        $('#firstinput').remove();
        $('.jsavmatrix').addClass("deleteMode");
        $('.jsavmatrix').removeClass("addrowMode");
        $('.jsavmatrix').removeClass("editMode");
        jsav.umsg('Deleting');
    };
    var addrowMode = function(){

        if (lastRow === arr.length - 1 || lastRow === arr.length) {
            var l = arr.length;
            for (var i = 0; i < l; i++) {
                arr.push(['', arrow, '']);
            }
            m = init();
            $('.jsavmatrix').addClass('editMode');
            // if (!arr[index][2]) {
            //     arr[index][2] = lambda;
            //     m.value(index, 2, lambda);
            // }

        }
        m._arrays[lastRow + 1].show();
        lastRow++;
        layoutTable(m);
        jsav.umsg('Editing');
        $('.jsavmatrix').addClass("editMode");
        $('.jsavmatrix').removeClass("deleteMode");
        $('.jsavmatrix').removeClass("addrowMode");
    };

    // Function to start grammar transformation
    var transformGrammar = function () {
        if (typeof getCombinations === "undefined") {
            console.error("No generator support.");
            return;
        }
        var productions = _.map(_.filter(arr, function(x) { return x[0];}), function(x) { return x.slice();});
        if (productions.length === 0) {
            alert('No grammar.');
            return;
        }
        // apply each transformation to the original grammar to find which step to start with
        var noLambda = removeLambda();
        var noUnit = removeUnit();
        var noUseless = removeUseless();
        var fullChomsky = convertToChomsky();
        var strP = _.map(productions, function(x) {return x.join('');});
        // store original grammar for reloading later
        backup = ""+strP;

        if (!checkTransform(strP, noLambda)) {
            interactableLambdaTransform(noLambda);
        } else if (!checkTransform(strP, noUnit)) {
            interactableUnitTransform(noUnit);
        } else if (!checkTransform(strP, noUseless)) {
            interactableUselessTransform(noUseless);
        } else if (!checkTransform(strP, fullChomsky)) {
            interactableChomsky(fullChomsky);
        } else {
            backup = null;
            jsav.umsg('Grammar already in Chomsky Normal Form.');
            return true;
        }
    };

    //=================================
    // Conversions

    // interactive converting right-linear grammar to FA
    var convertToFA = function () {
        if(checkLHSVariables()){
            alert('Your production is unrestricted on the left hand side');
            return;
        }
        if (!checkRightLinear()) {
            alert('The grammar is not right-linear!');
            return;
        }
        var productions = _.filter(arr, function(x) { return x[0];});
        startParse();
        $('.jsavcontrols').hide();
        $('#completeallbutton').show();
        $(m.element).css("margin-left", "auto");
        jsav.umsg('Complete the FA.');
        // keep a map of variables to FA states
        var nodeMap = {};
        builtDFA = jsav.ds.FA({width: '90%', height: 440, layout: "automatic"});
        builtDFA.enableDragging();
        var newStates = [];     // variables
        for (var i = 0; i < productions.length; i++) {
            newStates.push(productions[i][0]);
            newStates = newStates.concat(_.filter(productions[i][2], function(x) {return variables.indexOf(x) !== -1;}));
        }
        newStates = _.uniq(newStates);
        // create FA states
        for (var i = 0; i < newStates.length; i++) {
            var n = builtDFA.addNode();
            nodeMap[newStates[i]] = n;
            if (i === 0) {
                builtDFA.makeInitial(n);
            }
            n.stateLabel(newStates[i]);
        }
        // add final state
        var f = builtDFA.addNode();
        // nodeMap[emptystring] = f;
        f.addClass("final");
        builtDFA.layout();
        selectedNode = null;

        // check if FA is finished; if it is, ask if the user wants to export the FA
        var checkDone = function () {
            var edges = builtDFA.edges();
            var tCount = 0;
            for (var next = edges.next(); next; next = edges.next()) {
                var w = next.weight().split('<br>');
                tCount = tCount + w.length;
            }
            console.log("tCount: " + tCount + " productions.length: " + productions.length);
            if (tCount === productions.length) {
                var confirmed = confirm('Finished! Export?');
                if (confirmed) {
                    exportConvertedFA();
                }
            }
        };


        var completeConvertToFA = function() {
            for (var i = 0; i < productions.length; i++) {
                // if the current production is not finished yet
                if (!m.isHighlight(i)){
                    var start = nodeMap[productions[i][0]];
                    var rhs = productions[i][2];
                    //if there is no capital letter, then go to final state
                    if(variables.indexOf(rhs[rhs.length-1]) === -1){
                        var end = f;
                        var w = rhs;
                    } else {
                        var end = nodeMap[rhs[rhs.length-1]];
                        var w = rhs.substring(0, rhs.length-1);
                    }
                    m.highlight(i);
                    var newEdge = builtDFA.addEdge(start, end, {weight: w});
                    if (newEdge) {
                        newEdge.layout();
                        checkDone();
                    }
                }
            }
        }

        $('#completeallbutton').click(completeConvertToFA);

        // handler for the nodes of the FA
        var convertDfaHandler = function (e) {
            // adding transitions
            this.highlight();
            if (selectedNode) {
                var t = prompt('Terminal to transition on?');
                if (t === null) {
                    selectedNode.unhighlight();
                    selectedNode = null;
                    this.unhighlight();
                    return;
                }
                var lv = selectedNode.stateLabel();
                var rv = this.stateLabel();
                // check if valid transition
                for (var i = 0; i < productions.length; i++) {
                    var r = productions[i][2];
                    var add = false;
                    if (rv && productions[i][0] === lv && r[r.length - 1] === rv && r.substring(0, r.length - 1) === t) {
                        add = true;
                    }
                    if (productions[i][0] === lv && this.hasClass('final') && (r === t || (r === emptystring && t === ""))) {
                        add = true;
                    }
                    if (add) {
                        m.highlight(i);
                        var newEdge = builtDFA.addEdge(selectedNode, this, {weight: t});
                        selectedNode.unhighlight();
                        selectedNode = null;
                        this.unhighlight();
                        if (newEdge) {
                            newEdge.layout();
                            checkDone();
                        }
                        return;
                    }
                }
                alert('That transition is not correct.');
                selectedNode.unhighlight();
                selectedNode = null;
                this.unhighlight();
            } else {
                selectedNode = this;
            }
            e.stopPropagation();
        };

        // handler for the grammar table: clicking a production will create the appropriate transition
        var convertGrammarHandler = function (index) {
            this.highlight(index);
            var l = this.value(index, 0);
            var r = this.value(index, 2);
            var nodes = builtDFA.nodes();
            if (variables.indexOf(r[r.length - 1]) === -1) {
                var newEdge = builtDFA.addEdge(nodeMap[l], f, {weight: r});
            } else {
                var newEdge = builtDFA.addEdge(nodeMap[l], nodeMap[r[r.length - 1]], {weight: r.substring(0, r.length - 1)});
            }
            if (newEdge) {
                newEdge.layout();
                checkDone();
            }
        };

        builtDFA.click(convertDfaHandler);
        m.click(convertGrammarHandler);
        $('#av').append($('#convertmovebutton'));
    };

    // interactive converting context-free grammar to NPDA
    var convertToPDA = function (event) {
        if(checkLHSVariables()){
            alert('Your production is unrestricted on the left hand side');
            return;
        }
        var productions = _.filter(arr, function(x) { return x[0];});
        startParse();
        $('.jsavcontrols').hide();
        $(m.element).css("margin-left", "auto");
        jsav.umsg('Complete the NPDA.');
        builtDFA = jsav.ds.FA({width: '90%', height: 440});
        var gWidth = builtDFA.element.width(),
            gHeight = builtDFA.element.height();
        var a = builtDFA.addNode({left: 0.17 * gWidth, top: 0.87 * gHeight}),
            b = builtDFA.addNode({left: 0.47 * gWidth, top: 0.87 * gHeight}),
            c = builtDFA.addNode({left: 0.77 * gWidth, top: 0.87 * gHeight});
        builtDFA.makeInitial(a);
        c.addClass('final');
        var startVar = productions[0][0];
        if(event.data.param1){
            convertToPDAinLL(a, b, c, productions, startVar);
        }else{
            convertToPDAinLR(a, b, c, productions, startVar);
        }
    };

    //=================================
    // Files

    // Function to save and download the grammar
    var saveFile = function () {
        var downloadData = "text/xml; charset=utf-8,";
        if (!multiple) {
            downloadData += encodeURIComponent(serializeGrammar());
        }
        else {
            grammars[currentExercise] = serializeGrammar();
            var data = '<?xml version="1.0" encoding="UTF-8"?><structure><type>grammar</type>';
            _.each(grammars, function(grammar) {
                data += grammar;
            });
            data += "</structure>";
            downloadData += encodeURIComponent(data);
        }
        $('#download').html('<a href="data:' + downloadData + '" target="_blank" download="grammar.jff">Download Grammar</a>');
        $('#download a')[0].click();
    };

    // Loading:
    // Function to read the loaded XML file and create the grammar
    // @param condition: whether text is of the form "<grammar>...</grammar>"
    //                  used for parsing a grammar in multiple mode
    //                  "exer": LL, BF, SLR parsing exercises
    //                  "multiple": multiple grammar editing
    var parseFile = function (text, condition) {
        var parser,
            xmlDoc,
            xmlElem;
        if (!condition) {
            if (window.DOMParser) {
                parser=new DOMParser();
                xmlDoc=parser.parseFromString(text,"text/xml");
            } else {
                xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async=false;
                xmlDoc.loadXML(text);
            }
            if (xmlDoc.getElementsByTagName("type")[0].childNodes[0].nodeValue !== 'grammar') {
                alert('File does not contain a grammar.');
                return;
            } else {
                xmlElem = xmlDoc.getElementsByTagName("production");
            }
        }
        else if (condition == "exer") {
            xmlElem = text.getElementsByTagName("production");
        }
        else if (condition == "multiple") {
            if (window.DOMParser) {
                parser=new DOMParser();
                xmlDoc=parser.parseFromString(text,"text/xml");
            } else {
                xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async=false;
                xmlDoc.loadXML(text);
            }
            xmlElem = xmlDoc.getElementsByTagName("production");
        }
        else {
            alert("unknown error");
        }
        arr = [];
        for (var i = 0; i < xmlElem.length; i++) {
            var l = xmlElem[i].getElementsByTagName("left")[0].childNodes[0].nodeValue;
            var r = xmlElem[i].getElementsByTagName("right")[0].childNodes[0].nodeValue;
            var row = [l, arrow, r];
            arr.push(row);
        }
        lastRow = arr.length;
        // add an empty row for editing purposes (clicking the empty row allows the user to add productions)
        arr.push(["", arrow, ""]);
        m = init();
        $('.jsavmatrix').addClass("editMode");
        // clear input
        var loaded = $('#loadfile');
        loaded.wrap('<form>').closest('form').get(0).reset();
        loaded.unwrap();
        return;
    };

    // Function for reading the XML file
    var waitForReading = function (reader) {
        reader.onloadend = function(event) {
            var text = event.target.result;
            parseFile(text);
        }
    };
    // Function to load in an XML file
    var loadFile = function () {
        var loaded = document.getElementById('loadfile');
        var file = loaded.files[0],
            reader = new FileReader();
        waitForReading(reader);
        reader.readAsText(file);
    };


    /*
  Function to check if FIRST / FOLLOW sets are correct (either FIRST sets or FOLLOW sets).
  Returns a list of the incorrect variables.
  */
    function checkTable(firsts, follows) {
        var checker;
        // arrayStep can be 1 or 2
        if (arrayStep === 1) {
            checker = firsts;
        } else {
            checker = follows;
        }
        var incorrect = [];
        for (var i = 1; i < ffTable._arrays.length; i++) {
            var a = ffTable._arrays[i];
            var fvar = a.value(0);
            var fset = a.value(arrayStep);
            var check1 = checker[fvar];
            var check2 = fset.split(',');
            var inter = _.intersection(check1, check2);
            if (inter.length !== check1.length || inter.length !== check2.length) {
                incorrect.push(fvar);
            }
        }
        return incorrect
    };

    // Function to check if the SLR parse table is correct and transition
    function checkslrParseTable(parseTableDisplay, parseTable) {
        $('#firstinput').remove();
        var incorrect = false;
        for (var i = 1; i < parseTableDisplay._arrays.length; i++) {
            var ptr = parseTableDisplay._arrays[i];
            ptr.unhighlight();
            for (var j = 1; j < ptr._indices.length; j++) {
                // check conflict table first to avoid mistaken the students
                var wrongEntry = false;
                if (conflictTable[i - 1] && conflictTable[i - 1][j - 1]) {
                    if (conflictTable[i-1][j-1].indexOf(parseTableDisplay.value(i, j)) == -1) {
                        parseTableDisplay.highlight(i, j);
                        incorrect = true;
                        wrongEntry = true;
                    }
                }
                else if (parseTable[i-1][j-1] !== parseTableDisplay.value(i, j)) {
                    parseTableDisplay.highlight(i, j);
                    incorrect = true;
                    wrongEntry = true;
                }
                if (!wrongEntry) {
                    parseTable[i-1][j-1] = parseTableDisplay.value(i, j);
                }
            }
        }
        // provide option to automatically complete the parse table
        if (incorrect) {
            var container = document.getElementById("container");
            container.scrollTop = container.scrollHeight;
            window.scrollTo(0,document.body.scrollHeight);
            var confirmed = confirm('Highlighted cells are incorrect.\nFix automatically?');
            if (confirmed) {
                for (var i = 1; i < parseTableDisplay._arrays.length; i++) {
                    for (var j = 1; j < ptr._indices.length; j++) {
                        var wrong = parseTableDisplay.isHighlight(i, j);
                        parseTableDisplay.unhighlight(i, j);
                        // when current entry is wrong && there is a conflict
                        if (wrong && conflictTable[i-1] && conflictTable[i-1][j-1] && conflictTable[i-1][j-1].length > 1) {
                            // there is a conflict, either reduce-reduce or reduce-shift
                            parseTableDisplay.highlight(i, j);
                        }
                        parseTableDisplay.value(i, j, parseTable[i-1][j-1]);
                    }
                }
                layoutTable(parseTableDisplay);
            } else {
                return;
            }
        }
        $('#parsereadybutton').hide();
        $('#parsebutton').show();
        $temp = $('<div>').attr({"align":"center"});
        $temp.append($('#parsebutton'));
        $temp.insertBefore($('.jsavcanvas .jsavmatrix:last-child'));
        jsav.umsg("");
        $('.jsavarray').off();
    };

    // check for the correctness of parse table of LL
    var checkllParseTable = function (parseTableDisplay, parseTable) {
        $('#firstinput').remove();
        var incorrect = false;
        for (var i = 1; i < parseTableDisplay._arrays.length; i++) {
            var ptr = parseTableDisplay._arrays[i];
            ptr.unhighlight();
            for (var j = 1; j < ptr._indices.length; j++) {
                if (parseTable[i-1][j-1] !== parseTableDisplay.value(i, j)) {
                    parseTableDisplay.highlight(i, j);
                    incorrect = true;
                }
            }
        }
        // provide option to automatically complete the parse table
        if (incorrect) {
            var container = document.getElementById("container");
            container.scrollTop = container.scrollHeight;
            var confirmed = confirm('Highlighted cells are incorrect.\nFix automatically?');
            if (confirmed) {
                for (var i = 1; i < parseTableDisplay._arrays.length; i++) {
                    var ptr = parseTableDisplay._arrays[i];
                    ptr.unhighlight();
                    for (var j = 1; j < ptr._indices.length; j++) {
                        parseTableDisplay.value(i, j, parseTable[i-1][j-1]);
                    }
                }
                layoutTable(parseTableDisplay);
            } else {
                return;
            }
        }
        $('#parsereadybutton').hide();
        $('#parsebutton').show();
        jsav.umsg("");
        $('.jsavarray').off();
    };

    // click handler for the SLR parse table
    function slrparseTableHandler (index, index2, e) {
        // ignore if first row or column
        $('#firstinput').remove();
        if (index === 0 || index2 === 0) { return; }
        if (conflictTable[index-1] && conflictTable[index-1][index2-1] && conflictTable[index-1][index2-1].length > 1) {
            $('.conflictMenu').remove();
            var offsetX = e.pageX;
            var offsetY = e.pageY;
            var $chooseConflict = $("<div>", {class: "conflictMenu"});
            _.each(conflictTable[index-1][index2-1], function(choice) {$chooseConflict.append("<input type='button' value='" + choice + "' class='choice'/><br>");});
            // in order to pass indices of matrix
            $chooseConflict.attr({"i": index, "j": index2});
            $chooseConflict.css({"position": "absolute", top: offsetY, left: offsetX});
            $chooseConflict.show();
            $('#container').append($chooseConflict);
            $('.choice').off('click').click(choiceClickHandler);
            return;
        }
        var self = this;
        var prev = this.value(index, index2);
        if (!prev) return;
        // create input box
        var createInput = "<input type='text' id='firstinput' value="+prev+" onfocus='this.value = this.value;'>";
        $('body').append(createInput);
        var offset = this._arrays[index]._indices[index2].element.offset();
        var topOffset = offset.top;
        var leftOffset = offset.left;
        var fi = $('#firstinput');
        fi.offset({top: topOffset, left: leftOffset});
        fi.outerHeight($('.jsavvalue').height());
        fi.width($(this._arrays[index]._indices[index2].element).width());
        fi.focus();
        // finalize changes when enter key is pressed
        fi.keyup(function(event){
            if(event.keyCode == 13){
                var firstInput = $(this).val();
                firstInput = firstInput.replace(/!/g, emptystring);
                self.value(index, index2, firstInput);
                layoutTable(self, index2);
                fi.remove();
            }
        });
    };

    // Function to transition from editing FIRST sets to editing FOLLOW sets
    function continueToFollow (firsts, follows) {
        $('#firstinput').remove();
        var incorrect = checkTable(firsts, follows);
        // provide option to complete the FIRST sets automatically
        if (incorrect.length > 0) {
            var confirmed = confirm('The following sets are incorrect: ' + incorrect + '.\nFix automatically?');
            if (confirmed) {
                for (var i = 1; i < ffTable._arrays.length; i++) {
                    var a = ffTable._arrays[i].value(0);
                    ffTable.value(i, 1, firsts[a]);
                }
                layoutTable(ffTable);
            } else {
                return false;
            }
        }
        $(ffTable.element).off();
        $('#followbutton').hide();
        jsav.umsg('Define FOLLOW sets. $ is the end of string character.');
        arrayStep = 2;
        ffTable.click(firstFollowHandler);
        return true;
    };


    function cykParse() {
        if(!transformGrammar()){
            alert("The grammar must be in CNF form to be parsed!");
            return;
        }
        var productions = _.map(_.filter(arr, function(x) { return x[0]}), function(x) {return x.slice();});
        localStorage['grammars'] = JSON.stringify(productions);
        window.open("./CYKParser.html");
    }

    //=================================
    // Buttons for editing the SLR DFA
    $('#finalbutton').click(function() {
        $('.jsavgraph').removeClass('builddfa');
        $('.jsavgraph').addClass('addfinals');
        jsav.umsg('Click a node to toggle final state.');
    });
    $('#gotobutton').click(function() {
        $('.jsavgraph').removeClass('addfinals');
        $('.jsavgraph').addClass('builddfa');
        jsav.umsg('Build the DFA: Click a state.');
    });
    //=================================
    // Button for exiting a proof (parsing or transformation)
    $('#backbutton').click(function () {
        if (parseTree) {
            parseTree.clear();
            jsav.clear();
            jsav = new JSAV("av");
        }
        if (derivationTable) { derivationTable.clear();}
        if (ffTable) { ffTable.clear();}
        parseTable = [];
        $('.conflictMenu').remove();
        if (parseTableDisplay) { parseTableDisplay.clear();}
        if (modelDFA) { modelDFA.clear();}
        if (builtDFA) { builtDFA.clear();}
        if (tGrammar) { tGrammar.clear();}
        if (backup) {
            arr = _.map(backup.split(','), function(x) {
                var d = x.split(arrow);
                d.splice(1, 0, arrow);
                return d;
            });
            lastRow = arr.length;
            arr.push(["", arrow, ""]);
            backup = null;
        }
        $('.jsavcanvas').height("auto");
        $('#movebutton').off();
        $('#finalbutton').off();
        $('#gotobutton').off();
        $('#dfabuttons').hide();
        $('#convertmovebutton').off();
        $('#convertmovebutton').hide();
        m = init();
        $('#firstinput').remove();
        $('#temp').remove();
        jsav.umsg('');
        $('button').show();
        $('#transformbutton').show();
        $('.jsavcontrols').hide();
        $('#backbutton').hide();
        $('.parsingbutton').off();
        $('.parsingbutton').hide();
        $('#completeallbutton').hide();
        $('#files').show();
        $(m.element).css("margin-left", "auto");
        $('.jsavmatrix').addClass("editMode");
    });
    $('#helpbutton').click(displayHelp);
    $('#editbutton').click(editMode);
    $('#deletebutton').click(deleteMode);
    $('#addrowbutton').click(addrowMode);
    $('#mbfpbutton').click(mbfParse);
    $('#llbutton').click(llParse);
    $('#slrbutton').click(slrParse);
    $('#cykbutton').click(cykParse);
    $('#transformbutton').click(transformGrammar);
    $('#loadfile').on('change', loadFile);
    $('#savefile').click(saveFile);
    $('#convertRLGbutton').click(convertToFA);
    $('#convertCFGbuttonLL').click({param1: true}, convertToPDA);
    $('#convertCFGbuttonLR').click({param1: false}, convertToPDA);
    $('#multipleButton').click(toggleMultiple);
    $('#addExerciseButton').click(addExercise);
    $('#identifybutton').click(identifyGrammar);
    $('#clearbutton').click(clearAll);

    $('#completeallbutton').hide();

    $(document).click(defocus);
    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            $('#firstinput').remove();
            fi = null;
        }
    });

    function buildDFA(){
        var randomDFA = jsav.ds.FA($.extend({width: '750px', height: 440, layout: "automatic", directed: true}));
        var a, b, c, d, e, f, g;
        var nodeArray = [a, b, c, d, e, f, g];
        var randomInputType = Math.floor(Math.random() * 2);
        var transferArray;
        if (randomInputType === 0){
            transferArray = ["0", "1"];
        }
        else{
            transferArray = ["a", "b"];
        }
        var nodeSize = Math.floor(Math.random() * 6) + 2;

        var i;
        nodeArray[0] = randomDFA.addNode();
        randomDFA.makeInitial(nodeArray[0])
        for (i = 1; i < nodeSize; i++){
            nodeArray[i] = randomDFA.addNode();
        }
        nodeArray[i-1].addClass("final");
        //start node
        var randomWeight = Math.floor(Math.random() * 2);
        var toNode3 = Math.floor(Math.random() * nodeSize) + 1;
        randomDFA.addEdge(nodeArray[0], nodeArray[toNode3], {weight: transferArray[randomWeight]});

        //the rest node
        for (i = 0; i < nodeSize; i++){
            if (i === 0){
                var toNode4 = Math.floor(Math.random() * nodeSize) + 1;
                randomDFA.addEdge(nodeArray[0], nodeArray[toNode4], {weight: transferArray[randomWeight ^ 1]});
            }
            else {
                var firstTransferRandom = Math.floor(Math.random() * 2);
                if (firstTransferRandom === 1) {
                    var toNode = Math.floor(Math.random() * nodeSize);
                    randomDFA.addEdge(nodeArray[i], nodeArray[toNode], {weight: transferArray[0]});
                }
                var secondTransferRandom = Math.floor(Math.random() * 2);
                if (secondTransferRandom === 1) {
                    var toNode2 = Math.floor(Math.random() * nodeSize);
                    randomDFA.addEdge(nodeArray[i], nodeArray[toNode2], {weight: transferArray[1]});
                }
                if (firstTransferRandom === 0 && secondTransferRandom === 0) {
                    var randomWeight = Math.floor(Math.random() * 2);
                    var toNode3 = Math.floor(Math.random() * nodeSize);
                    randomDFA.addEdge(nodeArray[i], nodeArray[toNode3], {weight: transferArray[randomWeight]});
                }
            }
        }

        randomDFA.layout();
    }
    function buildNFA(){
        var randomNFA = jsav.ds.FA($.extend({width: '750px', height: 440, layout: "automatic", directed: true}));
        var a, b, c, d, e, f, g;
        var nodeArray = [a, b, c, d, e, f, g];
        var randomInputType = Math.floor(Math.random() * 2);
        var transferArray;
        if (randomInputType === 0){
            transferArray = ["0", "1"];
        }
        else{
            transferArray = ["a", "b"];
        }
        var nodeSize = Math.floor(Math.random() * 6) + 2;

        var i;
        nodeArray[0] = randomNFA.addNode();
        randomNFA.makeInitial(nodeArray[0])
        for (i = 1; i < nodeSize; i++){
            nodeArray[i] = randomNFA.addNode();
        }
        nodeArray[i-1].addClass("final");
        //start node
        var randomWeight = Math.floor(Math.random() * 2);
        var toNode3 = Math.floor(Math.random() * nodeSize) + 1;
        randomNFA.addEdge(nodeArray[0], nodeArray[toNode3], {weight: transferArray[randomWeight]});


        for (i = 0; i < nodeSize; i++){
            if (i === 0){
                var toNode4 = Math.floor(Math.random() * nodeSize) + 1;
                randomNFA.addEdge(nodeArray[0], nodeArray[toNode4], {weight: transferArray[randomWeight ^ 1]});
            }
            else {
                var transferTimes = Math.floor(Math.random() * 3) + 1;
                var j;
                for (j = 0; j < transferTimes; j++) {
                    var toNode = Math.floor(Math.random() * nodeSize);
                    randomNFA.addEdge(nodeArray[i], nodeArray[toNode], {weight: transferArray[0]});
                    if (j > 0 && randomNFA.hasEdge(nodeArray[i], nodeArray[toNode], {weight: transferArray[0]})) {
                        break;
                    }
                }
                var transferTimes2 = Math.floor(Math.random() * 3) + 1;
                for (j = 0; j < transferTimes2; j++) {
                    var toNode2 = Math.floor(Math.random() * nodeSize);
                    randomNFA.addEdge(nodeArray[i], nodeArray[toNode2], {weight: transferArray[1]});
                    if (j > 0 && randomNFA.hasEdge(nodeArray[i], nodeArray[toNode2], {weight: transferArray[1]})) {
                        break;
                    }
                }
            }
        }

        randomNFA.layout();
    }

    function onLoadHandler() {
        $('#loadFile').hide();
        $('#saveFile').hide();
        $('#backbutton').hide();
        $('.multiple').hide();
        $('#addExerciseButton').hide();
        buildDFA()
        buildNFA()

    }

    function initQuestionLinks() {
        $("#exerciseLinks").html("");
        //not from localStorage but from XML file
        if (grammars) {
            for (i = 0; i < grammars.length; i++) {
                $("#exerciseLinks").append("<a href='#' id='" + i + "' class='links'>" + (i+1) + "</a>");
            }
            $('.links').click(toExercise);
        }
    }

    function updateQuestionLinks() {
        $(".links").removeClass("currentExercise");
        $("#" + currentExercise).addClass("currentExercise");
    }

    function updateExercise(index) {
        currentExercise = index;
        if (multiple) {
            parseFile(grammars[index], "multiple");
        }
        else {
            parseFile(grammars[index], "exer");
        }
        updateQuestionLinks();
    }

    function toExercise() {
        $('#firstinput').remove();
        grammars[currentExercise] = serializeGrammar();
        var index = $(this).attr('id');
        updateExercise(index);
    }

    function toggleMultiple() {
        multiple = !multiple;
        if (multiple) {
            $('#addExerciseButton').show();
            $('#loadfile').hide();
            $('.multiple').show();
            $('#firstinput').remove();
            grammars = [];
            grammars.push(serializeGrammar());
            initQuestionLinks();
            updateQuestionLinks();
        }
        else {
            $('.multiple').hide();
            $('#addExerciseButton').hide();
            $('#loadfile').show();
        }
    }

    function addExercise() {
        grammars.push("<grammar></grammar>");
        initQuestionLinks();
        updateQuestionLinks();
    }

    onLoadHandler();


    /////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////

    function displayHelp(){
        alert(document.getElementById('helpInfo').innerHTML);
    }

    function isRegularGrammar(){
        return (checkRightLinear() || checkLeftLinear());
    }

    function checkLeftLinear(){
        var productions = _.filter(arr, function(x) { return x[0]});
        for (var i = 0; i < productions.length; i++) {
            //r is the RHS
            var r = productions[i][2];
            for (var j = 0; j < r.length; j++) {
                if (variables.indexOf(r[j]) !== -1 && j !== 0) {
                    return false;
                }
            }
        }
        return true;
    }

    function isContextFreeGrammar(){
        var productions = _.filter(arr, function(x) { return x[0]});
        for (var i = 0; i < productions.length; i++) {
            var lhs = productions[i][0];
            if (lhs.length !== 1 || variables.indexOf(lhs) === -1) {
                return false;
            }
        }
        return true;
    }


    function checkLHSVariables(){
        //check if there is more than one variable on the LHS
        var productions = _.filter(arr, function(x) { return x[0]});
        for (var i = 0; i < productions.length; i++) {
            var lhs = productions[i][0];
            if (lhs.length !== 1) {
                return true;
            } else if (variables.indexOf(lhs) === -1){
                return true;
            }
        }
        return false;
    }

    function clearAll(){
        window.location.href="";
    }

    function identifyGrammar() {

        //Check if there is more than one variable on the LHS, if so it is an unrestricted grammar.
        if(checkLHSVariables()){
            alert('This grammar is an unrestricted grammar');
            return;
        }

        // e.g. S->a could be both
        if(checkLeftLinear() && checkRightLinear()){
            alert('This grammar is both left-linear and right-linear (Regular Grammar and Context-Free Grammar)');
            return;
        }

        if(checkLeftLinear()) {
            alert('This grammar is a left-linear Grammar (Regular Grammar and Context-Free Grammar)');
            return;
        }

        if(checkRightLinear()) {
            alert('This grammar is a right-linear Grammar (Regular Grammar and Context-Free Grammar)');
            return;
        }

        if(isContextFreeGrammar()){
            alert('This grammar is a Context-Free Grammar');
            return;
        }
    }
});

