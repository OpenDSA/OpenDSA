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
        type = $("h1").attr('id'),               // type of parsing, can be bf, ll, slr
        grammars,           // stores grammar exercises, xml
        currentExercise = 0,// current exercise index
        multiple = false,   // if multiple grammar editing is enabled
        fi,                 // input box for matrix
        row,              // row number for input box
        col,              // column number for input box
        isCFG = false,    // if the input is CFG
        modelDFA,
        state = "editing";
    var dsArray = [];
    var ChomskydsArray = [];
    var parenthesis = "(";
    var lambda = String.fromCharCode(955),
        epsilon = String.fromCharCode(949),
        square = String.fromCharCode(9633),
        dot = String.fromCharCode(183),
        emptystring = lambda;

    if (localStorage["grammar"]) {
        arr = _.map(localStorage['grammar'].split(','), function(x) {
          var d = x.split(arrow);
          d.splice(1, 0, arrow);
          return d;
        });
        lastRow = arr.length;
        //arr.push(["", arrow, ""]);
        localStorage.removeItem('grammar');
        console.log(arr);
    }
    else {
        alert("please type your grammar in the grammar editer and then start transformation!");

    }
    function layoutColumn(mat, index) {
        var maxWidth = 100;     // default cell size
        /*for (var i = 0; i < mat._arrays.length; i++) {
            var cell = mat._arrays[i]._indices[index].element;
            if ($(cell).width() > maxWidth) {
              maxWidth = $(cell).width();
            }
        }*/
        for (var i = 0; i < mat._arrays.length; i++) {
            if (typeof mat._arrays[i]._indices[index] !== undefined) {
                var cell = mat._arrays[i]._indices[index].element;
                if ($(cell).width() > maxWidth) {
                    maxWidth = $(cell).width();
                }
            }
        }
        if (maxWidth > 100) {
            for (var i = 0; i < mat._arrays.length; i++) {
                var cell = mat._arrays[i]._indices[index].element;
                $(cell).find('.jsavvalue').width(maxWidth);
            }
        }
    };
    function layoutTable(mat, index) {
        // if column index is given, does layout for that column, otherwise lays out all columns
        if (typeof index === 'undefined') {
            for (var i = 0; i < mat._arrays[0]._indices.length; i++) {
                layoutColumn(mat, i);
            }
        } else {
            layoutColumn(mat, index);
        }
        mat.layout();
    };
    $('#removeLambda').hide();
    $('#toUnitproduction').hide();
    $('#removeUnitproduction').hide();
    $('#dependencyButton').hide();
    $('#toUselessProduction').hide();
    $('#uselessDependencyGraph').hide();
    $('#removeUslesspruduction').hide();
    $('#toChomskyForm').hide();
    $('#ChangeToChomsky').hide();
    $('#ChangeToChomskyAuto').hide();
    $('#buildUselessDependencyGraph').hide();
    $('#replaceTerminal').hide();
    $('#buildUnitDependencyGraph').hide();


    $('#removeLambda').click(removeLambdaDisplay);
    $('#startTransform').click(startTransform);
    $('#toUnitproduction').click(toUnitProductionStep);
    $('#removeUnitproduction').click(unitProductions);
    $('#dependencyButton').click(showunitDependencyGraph);
    $('#toUselessProduction').click(toUselessProduction);
    $('#uselessDependencyGraph').click(showUselessDependencyGraph);
    $('#removeUslesspruduction').click(uselessProduciton);
    $('#toChomskyForm').click(toChomskyForm);
    $('#ChangeToChomsky').click(transformToChomskyForm);
    $('#buildUselessDependencyGraph').click(buildUselessDependencyGraph);
    $('#buildUnitDependencyGraph').click(buildUnitDependencyGraph);


    function removeUnit() {
        var productions = _.map(_.filter(arr, function (x) {
            return x[0];
        }), function (x) {
            return x.slice();
        });
        var pDict = {};
        // a dictionary mapping left sides to right sides
        for (var i = 0; i < productions.length; i++) {
            if (!(productions[i][0] in pDict)) {
                pDict[productions[i][0]] = [];
            }
            pDict[productions[i][0]].push(productions[i][2]);
        }
        var counter = 0;
        while (removeUnitHelper(productions, pDict)) {
            counter++;
            if (counter > 500) {
                console.log(counter);
                break;
            }
        }
        // remove original unit productions
        productions = _.filter(productions, function (x) {
            return !(x[2].length === 1 && variables.indexOf(x[2]) !== -1);
        });
        var ret = _.map(productions, function (x) {
            return x.join('');
        });
        return ret;
    }

    function removeLambda() {
        var derivers = {};  // variables that derive lambda
        var productions = _.map(_.filter(arr, function (x) {
            return x[0];
        }), function (x) {
            return x.slice();
        });
        var counter = 0;
        // find lambda-deriving variables
        while (removeLambdaHelper(derivers, productions)) {
            counter++;
            if (counter > 500) {
                console.log(counter);
                break;
            }
        }
        ;
        if (productions[0][0] in derivers) {
            alert('The start variable derives ' + emptystring + '.');
        }
        var transformed = [];
        // remove lambda productions
        productions = _.filter(productions, function (x) {
            return x[2] !== emptystring;
        });
        transformed = transformed.concat(productions);
        for (var i = 0; i < productions.length; i++) {
            var p = productions[i];
            // find lambda deriving variables in right hand side
            var v = _.filter(p[2], function (x) {
                return x in derivers;
            });
            if (v.length > 0) {
                v = v.join('');
                for (var j = v.length - 1; j >= 0; j--) {
                    // remove all combinations of lambda-deriving variables
                    var n = getCombinations(v, j + 1);
                    for (var next = n.next(); next.value; next = n.next()) {
                        var replaced = p[2];
                        for (var k = 0; k < next.value.length; k++) {
                            replaced = replaced.replace(next.value[k], "");
                        }
                        // if not a lambda production
                        if (replaced && !_.find(transformed, function (x) {
                            return x[0] === p[0] && x[2] === replaced
                        })) {
                            transformed.push([p[0], arrow, replaced]);
                        }
                    }
                }
            }
        }
        var ret = _.map(transformed, function (x) {
            return x.join('');
        });
        return ret;
    }

    function removeUseless() {
        var derivers = {};  // variables that derive a string of terminals
        var productions = _.map(_.filter(arr, function (x) {
            return x[0];
        }), function (x) {
            return x.slice();
        });
        var counter = 0;
        while (findDerivable(derivers, productions)) {
            counter++;
            if (counter > 500) {
                console.log(counter);
                break;
            }
        }
        ;
        var transformed = [];
        // remove productions which do not derive a string of terminals
        for (var i = 0; i < productions.length; i++) {
            if (_.every(productions[i][2], function (x) {
                return x in derivers || variables.indexOf(x) === -1;
            })) {
                transformed.push(productions[i]);
            }
        }
        var pDict = {};   // dictionary to hold reachable variables
        //var start = transformed[0][0];//IT SHOULD BE S
        var start = 'S';//I changed this to S.
        for (var i = 0; i < transformed.length; i++) {
            if (!(transformed[i][0] in pDict)) {
                pDict[transformed[i][0]] = [];
            }
            // map left hand side to the variables in the right hand side
            var r = _.uniq(_.filter(transformed[i][2], function (x) {
                return variables.indexOf(x) !== -1;
            }));
            pDict[transformed[i][0]] = _.union(pDict[transformed[i][0]], r);
        }
        var visited = {};
        visited[start] = true;
        // find reachable variables and map them in pDict
        findReachable(start, pDict, visited);
        // remove unreachable productions
        transformed = _.filter(transformed, function (x) {
            return x[0] === start || pDict[start].indexOf(x[0]) !== -1;
        });
        var ret = _.map(transformed, function (x) {
            return x.join('');
        });
        return ret;
    }
    /*
    Function to find lambda-deriving variables.
    A variable derives lambda if it directly produces lambda or if its right side is
    composed only of lambda-deriving variables.
    Used during parsing as well.
    */
    function removeLambdaHelper(set, productions) {
        for (var i = 0; i < productions.length; i++) {
            if (productions[i][2] === emptystring || _.every(productions[i][2], function (x) {
                return x in set;
            })) {
                if (!(productions[i][0] in set)) {
                    set[productions[i][0]] = true;
                    return true;
                }
            }
        }
        return false;
    }

    function removeUnitHelper(productions, pDict) {
        for (var i = 0; i < productions.length; i++) {
            if (productions[i][2].length === 1 && variables.indexOf(productions[i][2]) !== -1) {
                var p = pDict[productions[i][2]];
                var n;
                for (var j = 0; j < p.length; j++) {
                    if (p[j].length === 1 && variables.indexOf(p[j]) !== -1) {
                        continue;
                    } else if (!_.find(productions, function (x) {
                        return x[0] === productions[i][0] && x[2] === p[j];
                    })) {
                        n = p[j];
                        break;
                    }
                }
                if (n) {
                    productions.push([productions[i][0], arrow, n]);
                    pDict[productions[i][0]].push(n);
                    return true;
                }
            }
        }
        return false;
    }

    var findReachable = function (start, pDict, visited) {
        for (var i = 0; i < pDict[start].length; i++) {
            if (!(pDict[start][i] in visited)) {
                visited[pDict[start][i]] = true;
                findReachable(pDict[start][i], pDict, visited);
                pDict[start] = _.union(pDict[start], pDict[pDict[start][i]]);
            }
        }
    };

    var findDerivable = function (set, productions) {
        for (var i = 0; i < productions.length; i++) {
            if (_.every(productions[i][2], function (x) {
                return x in set || variables.indexOf(x) === -1;
            })) {
                if (!(productions[i][0] in set)) {
                    set[productions[i][0]] = true;
                    return true;
                }
            }
        }
        return false;
    };


    function removeLambdaDisplay() {
        var noLambda = removeLambda();
        if (dsArray.length === 0) {
            alert('dsArray is empty');
            return;
        }

        for (var i = 0; i < dsArray.length; i++) {

            dsArray[i].hide();

        }
        var newArr = [];
        dsArray = [];
        for (var j = 0; j < noLambda.length; j++) {
            var splitedProduction = [];
            splitedProduction[0] = noLambda[j].split(arrow)[0];
            splitedProduction[1] = arrow;
            splitedProduction[2] = noLambda[j].split(arrow)[1];
            newArr[j] = splitedProduction;
            dsArray[j] = jsav.ds.array(splitedProduction, {center: false});
        }
        for (var k = 0; k < dsArray.length; k++) {
            if (k == 0) {
                continue;
            }
            var dis = (30 * k).toString();
            dsArray[k].css({top: "-=" + dis + "px", relativeTo: dsArray[0]});
        }
        jsav.umsg("All lambda productions removed");
        arr = newArr;
        //document.getElementById('removeLambda').disabled = true;
        var fullChomsky = convertToChomsky();
        // $('#toUnitproduction').show();
        $('#removeLambda').hide();
        var noUnit = removeUnit();
        var noUseless = removeUseless();
        var productions = _.map(_.filter(arr, function (x) {
            return x[0];
        }), function (x) {
            return x.slice();
        });
        var strP = _.map(productions, function (x) {
            return x.join('');
        });
        if (!checkTransform(strP, noUnit)) {
            jsav.umsg('You productions do not have any lambda productions! Move to remove unit productions phase');
            //$("#mode").html('You productions do not have any lambda productions! Move to remove unit productions phase');
            $('#toUnitproduction').show();
        } else if (!checkTransform(strP, noUseless)) {
            jsav.umsg('You productions do not have any lambda productions and unit productions! Move to remove useless productions phase')
            //$("#mode").html('You productions do not have any lambda productions and unit productions! Move to remove useless productions phase');
            $('#toUselessProduction').show();
        } else if (!checkTransform(strP, fullChomsky)) {
            jsav.umsg("your Productions do not have any lambda productions, unit productions, and uselessProduction");
            //$("#mode").html("your Productions do not have any lambda productions, unit productions, and uselessProduction");
            $('#toChomskyForm').show();
        }


    }

    function toUnitProductionStep() {

        jsav.umsg("removing highlighted unit productions needs to build the dependency graph for the grammar");
        for (var i = 0; i < dsArray.length; i++) {
            if (dsArray[i].value(2).length === 1 && variables.indexOf(dsArray[i].value(2)) !== -1) {
                dsArray[i].highlight();
            }
        }
        $('#toUnitproduction').hide();
        $('#dependencyButton').show();
        $('#buildUnitDependencyGraph').show();

    }

    function buildUnitDependencyGraph() {
        $('#dependencyButton').hide();
        $('#buildUnitDependencyGraph').hide();
        var productions = _.map(_.filter(arr, function (x) {
            return x[0];
        }), function (x) {
            return x.slice();
        });
        var unitProductions = _.filter(productions, function (x) {
            // return x[2].length === 1 && variables.indexOf(x[2]) !== -1;
            return x[2].length === 1 && variables.indexOf(x[2]) !== -1;
        });
        var v = [];
        for (var i = 0; i < productions.length; i++) {
            if (v.indexOf(productions[i][0]) === -1) {
                v.push(productions[i][0]);
            }
        }
        modelDFA = jsav.ds.graph({layout: "layered", directed: true, left: 400, top: 100}); //VDG
        for (var i = 0; i < v.length; i++) {
            modelDFA.addNode(v[i]);
        }
        modelDFA.layout();

        var nodeList = modelDFA.nodes();

        for (var j = 0; j < unitProductions.length; j++) {
            var firstNode = nodeList.find(function (x) {
                return x.value() === unitProductions[j][0];
            });

            var secondNode = nodeList.find(function (x) {
                return x.value() === unitProductions[j][2];
            });
            var newEdge = modelDFA.addEdge(firstNode, secondNode);
            if (newEdge) {
                modelDFA.layout();
            }
        }
        jsav.umsg('The dependency graph is completed.');
        $('#removeUnitproduction').show();

    }

    function showunitDependencyGraph() {
        $('#dependencyButton').hide();
        $('#buildUnitDependencyGraph').hide();
        var productions = _.map(_.filter(arr, function (x) {
            return x[0];
        }), function (x) {
            return x.slice();
        });
        var v = [];
        for (var i = 0; i < productions.length; i++) {
            if (v.indexOf(productions[i][0]) === -1) {
                v.push(productions[i][0]);
            }
        }
        modelDFA = jsav.ds.graph({layout: "layered", directed: true, left: 400, top: 100}); //VDG
        for (var i = 0; i < v.length; i++) {
            modelDFA.addNode(v[i]);
        }
        modelDFA.layout();
        var unitProductions = _.filter(productions, function (x) {
            // return x[2].length === 1 && variables.indexOf(x[2]) !== -1;
            return x[2].length === 1 && variables.indexOf(x[2]) !== -1;
        });
        var selectedNode = null;
        var unitVdgHandler = function () {
            this.highlight();
            if (selectedNode) {
                var self = this;
                if (selectedNode.value() === this.value()) {
                    selectedNode.unhighlight();
                    self.unhighlight();
                    selectedNode = null;
                    return;
                }
                if (_.find(unitProductions, function (x) {
                    return x[0] === selectedNode.value() && x[2] === self.value();
                })) {
                    var newEdge = modelDFA.addEdge(selectedNode, self);
                    if (newEdge) {
                        modelDFA.layout();
                    }
                    jsav.umsg('Transition added.');
                    if (modelDFA.edgeCount() === unitProductions.length) {
                        modelDFA.element.off();
                        selectedNode.unhighlight();
                        self.unhighlight();
                        selectedNode = null;
                        jsav.umsg('The dependency graph is completed.');
                        $('#removeUnitproduction').show();
                        return;
                    }
                } else {
                    jsav.umsg('Transition is not part of VDG.');
                }
                selectedNode.unhighlight();
                self.unhighlight();
                selectedNode = null;
            } else {
                selectedNode = this;
            }
        };
        modelDFA.click(unitVdgHandler);
    }

    function unitProductions() {
        for (var i = 0; i < dsArray.length; i++) {
            dsArray[i].hide();
        }
        var noUnit = removeUnit();
        var newArr = [];

        var tempDsArray = [];
        for (var j = 0; j < noUnit.length; j++) {
            var splitedProduction = [];
            splitedProduction[0] = noUnit[j].split(arrow)[0];
            splitedProduction[1] = arrow;
            splitedProduction[2] = noUnit[j].split(arrow)[1];
            newArr[j] = splitedProduction;
            tempDsArray[j] = jsav.ds.array(splitedProduction, {center: false});
        }

        for (var k = 0; k < tempDsArray.length; k++) {
            var found = false;
            for (var a = 0; a < arr.length; a++) {
                if (newArr[k][0] === arr[a][0] && newArr[k][2] === arr[a][2]) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                tempDsArray[k].highlight();
            } else {
                continue;
            }
        }
        jsav.umsg("All Unit Productions Removed");
        arr = newArr;
        dsArray = tempDsArray;
        for (var j = 0; j < dsArray.length; j++) {
            if (j == 0) {
                continue;
            }
            var dis = (30 * j).toString();
            dsArray[j].css({top: "-=" + dis + "px", relativeTo: dsArray[0]});
        }
        //document.getElementById('removeUnitproduction').disabled = true;
        $('#removeUnitproduction').hide();

        //$('#toUselessProduction').show();

        var noUseless = removeUseless();
        var fullChomsky = convertToChomsky();

        var productions = _.map(_.filter(arr, function (x) {
            return x[0];
        }), function (x) {
            return x.slice();
        });
        var strP = _.map(productions, function (x) {
            return x.join('');
        });
        if (!checkTransform(strP, noUseless)) {
            jsav.umsg('Your productions do not have any lambda productions and unit productions! Move to remove useless productions phase');
            //$("#mode").html('Your productions do not have any lambda productions and unit productions! Move to remove useless productions phase');
            $('#toUselessProduction').show();

        } else if (!checkTransform(strP, fullChomsky)) {
            jsav.umsg("your Productions do not have any lambda productions, unit productions, and uselessProduction");
            //$("#mode").html("your Productions do not have any lambda productions, unit productions, and uselessProduction");
            $('#toChomskyForm').show();
        }
    }

    function showUselessDependencyGraph() {

        $('#uselessDependencyGraph').hide();
        $('#buildUselessDependencyGraph').hide();
        var noUseless = removeUseless();
        var productions = _.map(_.filter(arr, function (x) {
            return x[0];
        }), function (x) {
            return x.slice();
        });
        m = init();
        $(m.element).css({top: 0, left: 300, position: 'absolute'});
        var derivers = {};  // variables that derive a string of terminals
        var counter = 0;
        var tGrammar;
        while (findDerivable(derivers, productions)) {
            counter++;
            if (counter > 500) {
                console.log(counter);
                break;
            }
        }


        var builtDeriveSet = [];
        var findDeriveHandler = function (index) {
            for (var i = 0; i < this._arrays.length; i++) {
                this.unhighlight(i);
            }
            this.highlight(index);
            var vv = this.value(index, 0);
            var found = builtDeriveSet.indexOf(vv);
            if ((vv in derivers) && found === -1) {
                builtDeriveSet.push(vv);
                jsav.umsg(vv + ' added! Variables that predicate terminals: [' + builtDeriveSet + ']');
                if (builtDeriveSet.length === Object.keys(derivers).length) {
                    for (var i = 0; i < m._arrays.length; i++) {
                        m.unhighlight(i);
                    }
                    m.element.off();
                    continueUseless();
                }
            } else if (!(vv in derivers)) {
                jsav.umsg(vv + ' does not predicate terminals. Variables that predicate terminals: [' + builtDeriveSet + ']');
            } else if (found !== -1) {
                jsav.umsg(vv + ' already selected! Variables that predicate terminals: [' + builtDeriveSet + ']');
            }
        };
        var removeUselessHandler = function (index, index2, e) {
            if (this.value(index, 0)) {
                if (noUseless.indexOf(this.value(index, 0) + arrow + this.value(index, 2)) === -1) {
                    tArr.splice(index, 1);
                    var tempG = jsav.ds.matrix(tArr);
                    tGrammar.clear();
                    tGrammar = tempG;
                    $(tGrammar.element).css({
                        top: $(modelDFA.element).outerHeight() + 20,
                        left: 300,
                        position: 'absolute'
                    });
                    layoutTable(tGrammar, 2);
                    //tGrammar = jsav.ds.matrix(tArr, {top: "50px", relativeTo: modelDFA, anchor: "left bottom", myAnchor: "left top"});
                    tGrammar.click(removeUselessHandler);
                } else {
                    alert('This production should not be deleted.');
                    return;
                }
            }
            if (tArr.length - 1 === noUseless.length && !_.find(tArr, function (x) {
                return x[2].length === 1 && variables.indexOf(x[2]) !== -1
            })) {
                // var confirmed = confirm('Grammar completed; export?');
                // if (confirmed) {
                //     localStorage['grammar'] = noUseless;
                //     window.open('grammarTest.html', '');
                // }
                arr = tArr;
                lastRow = arr.length - 1;
                if (!tArr[0][0]) {
                    jsav.umsg("Null start variable; transformation finished.");
                    return;
                }
                var strT = _.map(arr, function (x) {
                    return x.join('')
                });
                var fullChomsky = convertToChomsky();
                if (!checkTransform(strT, fullChomsky)) {
                    //interactableChomsky(fullChomsky);
                    return;
                } else {
                    jsav.umsg("Grammar transformation finished.");
                }
            }
        };

        var tArr = [].concat(productions);
        tArr = _.filter(tArr, function (x) {
            return x[0] in derivers && _.every(x[2], function (y) {
                return variables.indexOf(y) === -1 || y in derivers
            });
        });
        tArr.push(["", arrow, ""]);
        var tProductions = {};
        for (var i = 0; i < productions.length; i++) {
            var vv = productions[i][0];
            var r = productions[i][2];
            if (vv in derivers) {
                if (!(vv in tProductions)) {
                    tProductions[vv] = [];
                }
                for (var j = 0; j < r.length; j++) {
                    if (variables.indexOf(r[j]) !== -1 && tProductions[vv].indexOf(r[j]) === -1) {
                        if (r[j] !== vv && r[j] in derivers) {
                            tProductions[vv].push(r[j]);
                        }
                    }
                }
            }
        }

        var tCount = 0;
        for (var i in tProductions) {
            tCount = tCount + tProductions[i].length;
        }
        var selectedNode = null;

        var uselessVdgHandler = function () {
            this.highlight();
            if (selectedNode) {
                var self = this;
                if (selectedNode.value() === this.value()) {
                    selectedNode.unhighlight();
                    self.unhighlight();
                    selectedNode = null;
                    return;
                }
                if (_.find(productions, function (x) {
                    return x[0] === selectedNode.value() && x[2].indexOf(self.value()) !== -1;
                })) {
                    var newEdge = modelDFA.addEdge(selectedNode, self);
                    if (newEdge) {
                        modelDFA.layout();
                    }
                    jsav.umsg('Transition added.');
                    if (modelDFA.edgeCount() === tCount) {
                        modelDFA.element.off();
                        selectedNode.unhighlight();
                        self.unhighlight();
                        selectedNode = null;
                        continueUselessSecond();
                        return;
                    }
                } else {
                    jsav.umsg('Transition is not part of VDG.');
                }
                selectedNode.unhighlight();
                self.unhighlight();
                selectedNode = null;
            } else {
                selectedNode = this;
            }
        };
        var continueUseless = function () {
            //$(m.element).css("margin-left", "50px")
            //modelDFA = jsav.ds.graph({left: "50px", relativeTo: m, anchor: "right top", myAnchor: "left top", layout: "layered", directed: true});
            var da = Object.keys(derivers);
            /*
         What if the grammar has no DG. All nodes are go to terminals only. (Special case)
         */
            var onlyTerminalsExist = true;
            for (var variableIndex = 0; variableIndex < da.length; variableIndex++) {
                var variable = da[variableIndex];
                var variableProductions = _.filter(productions, function (x) {
                    return x[0] == variable;
                });
                for (var ruleIndex = 0; ruleIndex < variableProductions.length; ruleIndex++) {
                    var rule = variableProductions[ruleIndex];
                    if (_.filter(rule[2], function (x) {
                        return variables.indexOf(x) >= 0
                    }).length !== 0) {
                        onlyTerminalsExist = false;
                        break;
                    }
                }
            }
            if (!onlyTerminalsExist) {
                modelDFA = jsav.ds.graph({layout: "layered", directed: true});
                $(modelDFA.element).css({top: 0, left: 300, position: 'absolute'});
                for (var i = 0; i < da.length; i++) {
                    modelDFA.addNode(da[i]);
                }
                m.hide();
                modelDFA.layout();
                modelDFA.click(uselessVdgHandler);
                jsav.umsg('Complete dependency graph by adding edges between variables. Variables that predicate terminals: [' + builtDeriveSet + ']')
            } else
                continueUselessSecond();

        };
        var continueUselessSecond = function () {
            // jsav.umsg('Modify the grammar to remove useless productions. Click on unreachable productions to remove them.');
            // tGrammar = jsav.ds.matrix(tArr);
            //
            // $(tGrammar.element).css({top: $(modelDFA.element).outerHeight() + 20, left: 300, position:'absolute'});
            // layoutTable(tGrammar, 2);
            // //tGrammar = jsav.ds.matrix(tArr, {top: "50px", relativeTo: modelDFA, });//anchor: "left bottom", myAnchor: "left top"
            // tGrammar.click(removeUselessHandler);
            $('#removeUslesspruduction').show();
            $('#uselessDependencyGraph').hide();
        };
        jsav.umsg('Removing useless productions: Select variables that derive terminals.');
        m.click(findDeriveHandler);
    }

    function buildUselessDependencyGraph() {
        $('#uselessDependencyGraph').hide();
        $('#buildUselessDependencyGraph').hide();
        var noUseless = removeUseless();
        var productions = _.map(_.filter(arr, function (x) {
            return x[0];
        }), function (x) {
            return x.slice();
        });
        var derivers = {};  // variables that derive a string of terminals
        var counter = 0;
        var tGrammar;
        while (findDerivable(derivers, productions)) {
            counter++;
            if (counter > 500) {
                console.log(counter);
                break;
            }
        }

        var tArr = [].concat(productions);
        tArr = _.filter(tArr, function (x) {
            return x[0] in derivers && _.every(x[2], function (y) {
                return variables.indexOf(y) === -1 || y in derivers
            });
        });
        tArr.push(["", arrow, ""]);
        var tProductions = {};
        for (var i = 0; i < productions.length; i++) {
            var vv = productions[i][0];
            var r = productions[i][2];
            if (vv in derivers) {
                if (!(vv in tProductions)) {
                    tProductions[vv] = [];
                }
                for (var j = 0; j < r.length; j++) {
                    if (variables.indexOf(r[j]) !== -1 && tProductions[vv].indexOf(r[j]) === -1) {
                        if (r[j] !== vv && r[j] in derivers) {
                            tProductions[vv].push(r[j]);
                        }
                    }
                }
            }
        }

        var tCount = 0;
        for (var i in tProductions) {
            tCount = tCount + tProductions[i].length;
        }
        var terminals = [];
        for (var i = 0; i < variables.length; i++) {
            if (variables[i] in derivers) {
                terminals.push(variables[i]);
            }
        }
        modelDFA = jsav.ds.graph({layout: "layered", directed: true}); //VDG
        $(modelDFA.element).css({top: 0, left: 300, position: 'absolute'});
        for (var i = 0; i < terminals.length; i++) {
            modelDFA.addNode(terminals[i]);
        }
        modelDFA.layout();

        var nodeList = modelDFA.nodes();


        for (var j = 0; j < productions.length; j++) {
            var firstNode = nodeList.find(function (x) {
                return x.value() === productions[j][0];
            });
            console.log(firstNode.value());
            var secondNode = null;
            secondNode = nodeList.find(function (x) {
                return productions[j][2].indexOf(x.value()) !== -1
            });
            if (secondNode === null) {
                continue;
            }
            var newEdge = modelDFA.addEdge(firstNode, secondNode);
            if (newEdge) {
                modelDFA.layout();
            }
        }
        $('#removeUslesspruduction').show();
    }

    function toUselessProduction() {
        jsav.umsg("Next Step is to build the dependency graph for the grammar using the highlighted productions");
        if (modelDFA != null) {
            modelDFA.clear();
        }

        for (var i = 0; i < dsArray.length; i++) {
            dsArray[i].unhighlight();
        }

        $('#toUselessProduction').hide();
        $('#uselessDependencyGraph').show();
        $('#buildUselessDependencyGraph').show();
    }

    function uselessProduciton() {
        for (var i = 0; i < dsArray.length; i++) {
            dsArray[i].hide();
        }
        var noUseless = removeUseless();
        var newArr = [];

        var tempDsArray = [];
        for (var j = 0; j < noUseless.length; j++) {
            var splitedProduction = [];
            splitedProduction[0] = noUseless[j].split(arrow)[0];
            splitedProduction[1] = arrow;
            splitedProduction[2] = noUseless[j].split(arrow)[1];
            newArr[j] = splitedProduction;
            tempDsArray[j] = jsav.ds.array(splitedProduction, {center: false});
        }

        jsav.umsg("All useless productions removed");
        arr = newArr;
        dsArray = tempDsArray;
        for (var j = 0; j < dsArray.length; j++) {
            if (j == 0) {
                continue;
            }
            var dis = (30 * j).toString();
            dsArray[j].css({top: "-=" + dis + "px", relativeTo: dsArray[0]});
        }

        modelDFA.layout();
        $('#removeUslesspruduction').hide();
        $('#toChomskyForm').show();
    }
    function convertToChomsky() {
        var v = {};
        // find all the variables in the grammar
        var productions = _.map(_.filter(arr, function (x) {
            return x[0];
        }), function (x) {
            return x.slice();
        });
        for (var i = 0; i < productions.length; i++) {
            var x = productions[i];
            // change RHS to an array
            x[2] = x[2].split("");
            v[x[0]] = true;
            for (var j = 0; j < x[2].length; j++) {
                if (variables.indexOf(x[2][j]) !== -1) {
                    v[x[2][j]] = true;
                }
            }
        }
        // an array of all the temporary variables
        var tempVars = [];
        // counter for D(n) variables
        var varCounter = 1;
        // replace terminals with equivalent variables where necessary
        for (var i = 0; i < productions.length; i++) {
            if (productions[i][2].length === 1 && variables.indexOf(productions[i][2][0]) === -1) {
                continue;
            } else {
                var r = productions[i][2];
                for (var j = 0; j < r.length; j++) {
                    if (r[j].length === 1 && variables.indexOf(r[j]) === -1) {
                        var temp = "$B_{(" + r[j] + ")}$";
                        if (!_.find(productions, function (x) {
                            return x[0] === temp;
                        })) {
                            productions.push([temp, arrow, [r[j]]]);
                            tempVars.push(temp);
                        }
                        r[j] = temp;
                    }
                }
            }
        }
        // Function to break productions down into pairs of variables
        var chomskyHelper = function () {
            for (var i = 0; i < productions.length; i++) {
                var r = productions[i][2];
                if (r.length === 1 && variables.indexOf(r[0]) === -1) {
                    continue;
                } else if (r.length > 2) {
                    var temp = "$D_{(" + varCounter + ")}$";
                    var temp2 = r.splice(1, r.length - 1, temp);
                    var present = _.find(productions, function (x) {
                        return x[0].length > 1 && x[2].join('') === temp2.join('');
                    });
                    if (present) {
                        r[1] = present[0];
                    } else {
                        productions.push([temp, arrow, temp2]);
                        tempVars.push(temp);
                        varCounter++;
                    }
                    return true;
                }
            }
            return false;
        };
        var counter = 0;
        while (chomskyHelper()) {
            counter++;
            if (counter > 500) {
                console.log(counter);
                break;
            }
        }
        for (var i = 0; i < productions.length; i++) {
            var x = productions[i];
            x[2] = x[2].join("");
        }
        var ret = _.map(productions, function (x) {
            return x.join('');
        });
        return ret;
    }

    function toChomskyForm() {
        jsav.umsg("Next Step is converting the grammar to  Chomsky Form");
        if (modelDFA != null) {
            modelDFA.hide();
        }
        for (var i = 0; i < dsArray.length; i++) {
            dsArray[i].unhighlight();
            //dsArray[i].hide();
        }
        $('#toChomskyForm').hide();
        $('#ChangeToChomsky').show();

    }

    function changeToChomskyAuto() {
        var fullChomsky = convertToChomsky();
        var productions = _.map(_.filter(arr, function (x) {
            return x[0];
        }), function (x) {
            return x.slice();
        });
        var tGrammar;
        var tArr = [].concat(productions);

    }

    function transformToChomskyForm() {
        var fullChomsky = convertToChomsky();
        var splitedFullChomsky = []
        for (var j = 0; j < fullChomsky.length; j++) {
            var splitedProduction = [];
            splitedProduction[0] = fullChomsky[j].split(arrow)[0];
            splitedProduction[1] = arrow;
            splitedProduction[2] = [fullChomsky[j].split(arrow)[1]];
            splitedFullChomsky[j] = splitedProduction;
        }
        var productions = _.map(_.filter(arr, function (x) {
            return x[0];
        }), function (x) {
            return x.slice();
        });
        // m = init();
        var tGrammar;
        var tArr = [].concat(productions);
        var diff = Math.abs(tArr.length - splitedFullChomsky.length);
        // Right sides are arrays (unlike the matrix, where RHS is a string)
        _.each(tArr, function (x) {
            x[2] = x[2].split('');
        });
        var varCounter = 1;

        // handler for the table for converting productions
        var chomskyHandler = function (index) {
            for (var i = 0; i < this._arrays.length; i++) {
                this.unhighlight(i);
            }
            this.highlight(index);
            var r = tArr[index][2];
            //A-> a
            if (r.length === 1 && variables.indexOf(r[0]) === -1) {
                jsav.umsg('Conversion unneeded.');
                return;
            }
            // A -> AB
            if (r.length === 2 && variables.indexOf(r[0][0]) !== -1 && variables.indexOf(r[1][0]) !== -1) {
                jsav.umsg('Conversion unneeded.');
                return;
            }
            var sliceIn = [];
            // replace terminals
            for (var i = 0; i < r.length; i++) {
                if (r[i].length === 1 && variables.indexOf(r[i]) === -1) {
                    var tempB = "$B_{(" + r[i] + ")}$";
                    // if (!_.find(tArr.concat(sliceIn), function (x) {
                    //     return x[0] === tempB;
                    // })) {
                    var times = 0;
                    var input;
                    var pass = false;
                    while (times <= 3 && !pass) {
                        input = prompt("Left side is asigned to" + tempB + ". Right side of the production you want to add?");

                        if (input === r[i]) {
                            pass = true;
                        } else {
                            times++;
                            if (times == 3) {
                                if (confirm("You have tried 3 times, do you want to try again? If not, click 'Cancel' button") == true) {
                                    times = 0;
                                } else {
                                    pass = true;
                                }
                            }
                        }
                    }
                    sliceIn.push([tempB, arrow, [r[i]]]);
                    // }
                    r[i] = tempB;
                }
            }
            if (sliceIn.length > 0) {
                var dub = false;

                for (var i = 0; i < sliceIn.length; i++) {
                    for (var j = 0; j < tArr.length; j++) {
                        if (tArr[j][0] == sliceIn[i][0] && tArr[j][2][0] == sliceIn[i][2][0]) {
                            dub = true;
                        }
                    }
                }
                if (!dub) {
                    tArr = tArr.slice(0, index + 1).concat(sliceIn).concat(tArr.slice(index + 1));
                    var tempG = jsav.ds.matrix(_.map(tArr, function (x) {
                        return [x[0], x[1], x[2].join('')];
                    }));

                    tGrammar.clear();
                    tGrammar = tempG;
                    $(tGrammar.element).css({top: 0, left: 300, position: 'absolute'});

                } else {
                    var tempG = jsav.ds.matrix(_.map(tArr, function (x) {
                        return [x[0], x[1], x[2].join('')];
                    }));
                    tGrammar.clear();
                    tGrammar = tempG;
                    $(tGrammar.element).css({top: 0, left: 300, position: 'absolute'});
                }
                layoutTable(tGrammar, 2);


                //tGrammar = jsav.ds.matrix(_.map(tArr,function(x){return [x[0], x[1], x[2].join('')];}), {left: "50px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
                tGrammar.click(chomskyHandler);
                for (var i = 0; i < sliceIn.length + 1; i++) {
                    tGrammar.highlight(index + i);
                }
            } else {
                // replace variables
                var tempD = "$D_{(" + varCounter + ")}$";
                var temp2 = r.splice(1, r.length - 1, tempD);
                var present = _.find(tArr, function (x) {
                    return x[0].length > 1 && x[2].join('') === temp2.join('');
                });
                if (present) {
                    r[1] = present[0];
                } else {
                    var times = 0;
                    var input;
                    var pass = false;
                    while (times <= 3 && !pass) {
                        input = prompt("Left side is asigned to" + tempD + ". Right side of the production you want to add?");
                        var arrayedInput = input.split("");
                        if (checkSame(arrayedInput, temp2)) {
                            pass = true;
                        } else {
                            times++;
                            if (times == 3) {
                                if (confirm("you have tried 3 times, do you want to try again? If not, click 'Cancel' button") == true) {
                                    times = 0;
                                } else {
                                    pass = true;
                                }
                            }
                        }
                    }
                    if (tArr.indexOf([tempD, arrow, temp2]) === -1) {
                        tArr.splice(index + 1, 0, [tempD, arrow, temp2]);
                        varCounter++;
                        var tempG = jsav.ds.matrix(_.map(tArr, function (x) {
                            return [x[0], x[1], x[2].join('')];
                        }));
                        tGrammar.clear();
                        tGrammar = tempG;
                        $(tGrammar.element).css({top: 0, left: 300, position: 'absolute'});
                    } else {
                        tArr.splice(index + 1, 0, [tempD, arrow, temp2]);
                        varCounter++;
                        var tempG = jsav.ds.matrix(_.map(tArr, function (x) {
                            return [x[0], x[1], x[2].join('')];
                        }));
                        tGrammar.clear();
                        tGrammar = tempG;
                        $(tGrammar.element).css({top: 0, left: 300, position: 'absolute'});
                    }


                    layoutTable(tGrammar, 2);

                    //tGrammar = jsav.ds.matrix(_.map(tArr,function(x){return [x[0], x[1], x[2].join('')];}), {left: "50px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
                    tGrammar.click(chomskyHandler);
                    tGrammar.highlight(index);
                    tGrammar.highlight(index + 1);
                }
            }
            var same = true;
            jsav.umsg('Converted.');
            //console.log(temp);
            var stringA = []
            for (var j = 0; j < tArr.length; j++) {
                var left = tGrammar.value(j, 0);
                var right = tGrammar.value(j, 2);
                stringA.push(left + arrow + right);
            }
            console.log(stringA)

            for (var i = 0; i < stringA.length; i++) {
                if (fullChomsky.indexOf(stringA[i]) === -1) {
                    same = false;
                    break;
                }
            }
            if (same) {
                jsav.umsg('All productions completed.');
                tGrammar.element.off();
                // var c = confirm('All productions completed.\nExport? Exporting will rename the variables.');
                // if (c) {
                attemptExport();
                // }
                for (var i = 0; i < tGrammar._arrays.length; i++) {
                    tGrammar.unhighlight(i);
                }
                tGrammar.hide();
                var tempDsArray = [];
                var newArr = [];
                for (var j = 0; j < fullChomsky.length; j++) {
                    var splitedProduction = [];
                    splitedProduction[0] = fullChomsky[j].split(arrow)[0];
                    splitedProduction[1] = arrow;
                    splitedProduction[2] = fullChomsky[j].split(arrow)[1];
                    newArr[j] = splitedProduction;
                    tempDsArray[j] = jsav.ds.array(splitedProduction, {center: true});
                }

                for (var i = 0; i < dsArray.length; i++) {
                    dsArray[i].hide();
                }

                for (var j = 0; j < tempDsArray.length; j++) {
                    if (j == 0) {
                        continue;
                    }
                    var dis = (30 * j).toString();
                    tempDsArray[j].css({top: "-=" + dis + "px", relativeTo: tempDsArray[0]});
                }
                ChomskydsArray = tempDsArray;

            }
            // if (tArr.length === fullChomsky.length) {
            //     jsav.umsg('All productions completed.');
            //     tGrammar.element.off();
            //     // var c = confirm('All productions completed.\nExport? Exporting will rename the variables.');
            //     // if (c) {
            //     attemptExport();
            //     // }
            //     for (var i = 0; i < tGrammar._arrays.length; i++) {
            //         tGrammar.unhighlight(i);
            //     }
            //     tGrammar.hide();
            //     var tempDsArray = [];
            //     var newArr = [];
            //     for (var j = 0; j < fullChomsky.length; j++) {
            //         var splitedProduction = [];
            //         splitedProduction[0] = fullChomsky[j].split(arrow)[0];
            //         splitedProduction[1] = arrow;
            //         splitedProduction[2] = fullChomsky[j].split(arrow)[1];
            //         newArr[j] = splitedProduction;
            //         tempDsArray[j] = jsav.ds.array(splitedProduction, {center: true});
            //     }
            //
            //     for (var i = 0; i < dsArray.length; i++) {
            //         dsArray[i].hide();
            //     }
            //
            //     for (var j = 0; j < tempDsArray.length; j++) {
            //         if (j == 0) {
            //             continue;
            //         }
            //         var dis = (30 * j).toString();
            //         tempDsArray[j].css({top: "-=" + dis + "px", relativeTo: tempDsArray[0]});
            //     }
            //     ChomskydsArray = tempDsArray;
            //
            // }
        };
        // attempts to convert and export the completed CNF grammar
        var attemptExport = function () {
            var tempVars = [];
            for (var i = 0; i < tArr.length; i++) {
                if (tArr[i][0].length > 1 && tArr[i][0][0] === 'B') {
                    tempVars.push(tArr[i][0]);
                }
            }
            var newVariables = _.difference(variables.split(""), _.map(tArr, function (x) {
                return x[0];
            }));
            if (tempVars.length + varCounter > newVariables.length) {
                alert('Too large to export!');
                return;
            }
            tempVars.sort();
            var iOffset = tempVars.length;
            for (var i = 1; i < varCounter + 1; i++) {
                tempVars.push("D(" + i + ")");
            }
            _.each(tArr, function (x) {
                x[2] = x[2].join('');
            });
            for (var i = 0; i < tempVars.length; i++) {
                var re = tempVars[i].replace(/[\(\)]/g, "\\$&");
                var regex = new RegExp(re, 'g');
                for (var j = 0; j < tArr.length; j++) {
                    tArr[j][0] = tArr[j][0].replace(regex, newVariables[i]);
                    tArr[j][2] = tArr[j][2].replace(regex, newVariables[i]);
                }
            }
            // localStorage['grammar'] = _.map(tArr, function (x) {
            //     return x.join('');
            // });
            // window.open('grammarTest.html', '');
        };

        tGrammar = jsav.ds.matrix(_.map(tArr, function (x) {
            return [x[0], x[1], x[2].join('')];
        }));
        $(tGrammar.element).css({top: 0, left: 300, position: 'absolute'});
        layoutTable(tGrammar, 2);
        //tGrammar = jsav.ds.matrix(_.map(tArr,function(x){return [x[0], x[1], x[2].join('')];}), {left: "50px", relativeTo: m, anchor: "right top", myAnchor: "left top"});
        tGrammar.click(chomskyHandler);

        jsav.umsg('Converting to Chomsky Normal Form: convert productions of the grammar on the right by clicking on them.');
    }

    var checkTransform = function (strP, g) {
        var inter = _.intersection(strP, g);
        if (inter.length === strP.length && inter.length === g.length) {
            return true;
        }
        return false;
    };

    function identifyGrammar() {
        var productions = _.map(_.filter(arr, function (x) {
            return x[0];
        }), function (x) {
            return x.slice();
        });
        if (productions.length === 0) {
            alert('No grammar.');
            return;
        }
        if (isContextFreeGrammar()) {
            alert('This grammar is a Context-Free Grammar, you can go to the next step');
            isCFG = true;

            $('#helpbutton').hide();
            //$('#editbutton').hide();
            $('#deletebutton').hide();
            $('#addrowbutton').hide();
            $('#loadfile').hide();
            $('#savefile').hide();
            $('#identifybutton').hide();
            $('#clearbutton').hide();
            $('.jsavmatrix').hide();
            $('#startTransform').show();
            $('#back').show();
            //document.getElementById("editor").innerHTML = 'First step:';
            jsav.umsg('After confirming the grammar is context free grammar, we need to remove some producitons as the following order:\n' +
                '1. lambda production\n 2. unit production\n 3. useless production\n');

            return;
        } else {
            alert('The CNF (Chomsky Normal Form) can only accept CFG (context free grammar), please change the grammar to CFG');
            return;
        }
    }

    function checkSame(list1, list2) {
        if (list1.length !== list2.length) {
            return false;
        }
        for (var i = 0; i < list1.length; i++) {
            if (list1[i] !== list2[i]) {
                return false;
            }
        }
        return true;
    }

    function checkSame2(src, cfgsrc) {
        if (src.length != cfgsrc.length) {
            return false;
        }
        for (var i = 0; i < src.length; i++) {
            for (var j = 0; j < cfgsrc.length; j++) {
                if (cfgsrc[j][0] == src[i][0] && cfgsrc[j][2][0] == src[i][2][0]) {
                    continue;
                } else {
                    return false;
                }
            }

        }
        return true;
    }


    function startTransform() {
        //document.getElementById('startTransform').disabled = true;
        jsav.umsg('');
        $('#startTransform').hide();
        var noLambda = removeLambda();
        var noUnit = removeUnit();
        var noUseless = removeUseless();
        var fullChomsky = convertToChomsky();
        var productions = _.map(_.filter(arr, function (x) {
            return x[0];
        }), function (x) {
            return x.slice();
        });
        var strP = _.map(productions, function (x) {
            return x.join('');
        });
        backup = "" + strP;
        var highlightCounter = 0;
        var n = [50, 100, 150, 200, 250, 300, 350, 400, 450]
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][0] === '' && arr[i][2] === '') {
                continue;
            }
            //var dis = (30*i).toString();
            if (arr[i][2] === lambda) {
                dsArray[i] = jsav.ds.array(arr[i], {center: false}).highlight();
                // if (i != 0){
                //     dsArray[i].css({top:"-=" + dis+ "px",relativeTo: dsArray[0]})
                // }

                highlightCounter++;
            } else {
                dsArray[i] = jsav.ds.array(arr[i], {center: false});
                // if (i != 0){
                //     dsArray[i].css({top:"-=" + dis+ "px", relativeTo: dsArray[0]})
                // }
            }
        }
        // var height = $(dsArray[0].element).outerHeight();
        for (var j = 0; j < dsArray.length; j++) {
            if (j == 0) {
                continue;
            }
            var dis = (30 * j).toString();
            dsArray[j].css({top: "-=" + dis + "px", relativeTo: dsArray[0]});
        }
        if (!checkTransform(strP, noLambda)) {
            $('#removeLambda').show();

            if (highlightCounter === 1) {
                jsav.umsg("the highlight production is the Lambda production. In the Transformation, we need to remove it firstly!");
            } else if (highlightCounter > 1) {
                jsav.umsg("the highlight productions are the Lambda productions. In the Transformation, we need to remove them firstly!");
            }
        } else if (!checkTransform(strP, noUnit)) {
            jsav.umsg('You productions do not have any lambda productions! Move to remove unit productions phase');
            $('#toUnitproduction').show();
        } else if (!checkTransform(strP, noUseless)) {
            jsav.umsg('You productions do not have any lambda productions and unit productions! Move to remove useless productions phase');
            $('#toUselessProduction').show();
        } else if (!checkTransform(strP, fullChomsky)) {
            jsav.umsg('Grammar already in Chomsky Normal Form.');
            return true;
        } else {
            backup = null;
            jsav.umsg('Grammar cannot be determined');
            return true;
        }


    }
});