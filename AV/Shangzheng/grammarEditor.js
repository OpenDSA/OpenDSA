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
        type = $("h1").attr('id'),               // type of parsing, can be bf, ll, slr
        grammars,           // stores grammar exercises, xml
        currentExercise = 0,// current exercise index
        multiple = false,   // if multiple grammar editing is enabled
        fi,                 // input box for matrix
        row,              // row number for input box
        col,              // column number for input box
        isCFG = false,    // if the input is CFG
        modelDFA;
    var dsArray = [];
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
        // the grammar is saved as a string of a list of strings:
        // turn each production into an array containing the left side, arrow, and right side
        // arr = _.map(localStorage['grammar'].split(','), function(x) {
        //   var d = x.split(arrow);
        //   d.splice(1, 0, arrow);
        //   return d;
        // });
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
        for (var i = lastRow + 1; i < arr.length; i++) {
            m2._arrays[i].hide();
        }
        layoutTable(m2, 2);
        if (type !== "transformation")
            m2.on('click', matrixClickHandler);
        return m2;
    };

    // handler for grammar editing
    var matrixClickHandler = function (index, index2) {
        console.log("row: " + row + " index: " + index + " col: " + col + " index2: " + index2 + " fi: " + fi + " m: " + m + " arr: " + arr);

        // if ((row != index || col != index2) && fi) {

        if (fi) {
            var input = fi.val();
            var regex = new RegExp(emptystring, g);
            input = input.replace(regex, "");
            input = input.replace(regex, "!");
            if (input === "" && col == 2) {
                input = emptystring;
            }
            if (input === "" && col === 0) {
                alert('Invalid left-hand side.');
            }
            if (col == 2 && _.find(arr, function (x) {
                return x[0] == arr[row][0] && x[2] == input && arr.indexOf(x) !== row;
            })) {
                alert('This production already exists.');
            }
            fi.remove();
            m.value(row, col, input);
            arr[row][col] = input;
            layoutTable(m, 2);
        }
        if ($('.jsavmatrix').hasClass('deleteMode')) {
            if (index === 0) {
                alert("Can't delete the last row");
                return;
            }
            // recreates the matrix when deleting a row...
            arr.splice(index, 1);
            lastRow--;
            m = init();
            $('.jsavmatrix').addClass('deleteMode');
        } else if ($('.jsavmatrix').hasClass('editMode')) {
            // ignore if the user clicked an arrow
            if (index2 === 1) {
                return;
            }
            focus(index, index2);
        } else if ($('.jsavmatrix').hasClass('addrowMode')) {
            addRow(index);
        }

    };


    function addRow(index) {
        var newProduction = addProduction(index);
        layoutTable(m);
        // if (newProduction) {
        //   focus(index + 1, 0);
        // }
    }

    function focus(index, index2) {
        row = index;
        col = index2;
        var prev = m.value(index, index2);
        // create an input box for editing the cell
        $('#firstinput').remove();
        var createInput = "<input type='text' id='firstinput' onfocus='this.value = this.value;' value=" + prev + ">";
        $('body').append(createInput);
        var offset = m._arrays[index]._indices[index2].element.offset();
        var topOffset = offset.top;
        var leftOffset = offset.left;
        fi = $('#firstinput');
        fi.offset({top: topOffset, left: leftOffset});
        fi.outerHeight($('.jsavvalue').height());
        fi.width($(m._arrays[index]._indices[index2].element).width());
        fi.focus();
        // finalize the changes to the grammar when the enter key is pressed
        var validKeys = [13, 9, 37, 38, 39, 40];
        // keys for functions
        fi.keyup(function (event) {
            var keyCode = event.keyCode;
            if (validKeys.indexOf(keyCode) !== -1) {
                var input = $(this).val();
                var regex = new RegExp(emptystring, g);
                input = input.replace(regex, "");
                input = input.replace(regex, "!");
                // if (input === "" && index2 === 2) {
                //   input = emptystring;
                // }
                // if (input === "" && col === 0) {
                //   alert('Invalid left-hand side.');
                //   return;
                // }
                // if (index2 == 2 && _.find(arr, function(x) { return x[0] == arr[index][0] && x[2] == input && arr.indexOf(x) !== index;})) {
                //   alert('This production already exists.');
                //   return;
                // }
                fi.remove();
                m.value(index, index2, input);
                arr[index][index2] = input;
                layoutTable(m, 2);
                switch (keyCode) {
                    case 13:
                        if (index2 == 0) {
                            focus(index, 2);
                        } else {
                            // adding a new production
                            addRow(index);
                        }
                        break;
                    case 37:
                        if (index2 == 2) {
                            focus(index, 0);
                        }
                        break;
                    case 38:
                        if (index > 0) {
                            focus(index - 1, index2);
                        }
                        break;
                    case 39:
                        if (index2 == 0) {
                            focus(index, 2);
                        }
                        break;
                    case 40:
                        var newProduction = addProduction(index);
                        layoutTable(m);
                        if (newProduction) {
                            focus(index + 1, 0);
                        } else {
                            focus(index + 1, index2);
                        }
                        break;
                    default:
                        break;
                }
            }
        });
    }

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
            alert('Invalid left-hand side.');
            return;
        }
        if (col == 2 && _.find(arr, function (x) {
            return x[0] == arr[row][0] && x[2] == input && arr.indexOf(x) !== row;
        })) {
            alert('This production already exists.');
            return;
        }
        fi.remove();
        m.value(row, col, input);
        arr[row][col] = input;
        layoutTable(m, 2);
    }

    // Function to check to see if a new row should be added and lengthen the array
    var addProduction = function (index) {
        if (m.value(index, 0) && index == lastRow) {
            // if array out of bounds, double the array size and recreate the matrix
            if (lastRow == arr.length - 1 || lastRow == arr.length) {
                var l = arr.length;
                for (var i = 0; i < l; i++) {
                    arr.push(['', arrow, '']);
                }
                m = init();
                $('.jsavmatrix').addClass('editMode');
            }
            if (!arr[index][2]) {
                arr[index][2] = lambda;
                m.value(index, 2, lambda);
            }
            m._arrays[lastRow + 1].show();
            lastRow++;
            return true;
        }
        return false;
    };


    // change editing modes
    var editMode = function () {
        $('.jsavmatrix').addClass("editMode");
        $('.jsavmatrix').removeClass("deleteMode");
        $('.jsavmatrix').removeClass("addrowMode");
        $("#mode").html('Editing');
    };
    var deleteMode = function () {
        $('#firstinput').remove();
        $('.jsavmatrix').addClass("deleteMode");
        $('.jsavmatrix').removeClass("addrowMode");
        $('.jsavmatrix').removeClass("editMode");
        $("#mode").html('Deleting');
    };
    var addrowMode = function () {
        $('.jsavmatrix').addClass("addrowMode");
        $('.jsavmatrix').removeClass("deleteMode");
        $('.jsavmatrix').removeClass("editMode");
        $("#mode").html('Adding');
    }


    //=================================
    // Conversions

    // Function to check if the grammar is right-linear
    var checkRightLinear = function () {
        var productions = _.filter(arr, function (x) {
            return x[0]
        });
        for (var i = 0; i < productions.length; i++) {
            var r = productions[i][2];
            for (var j = 0; j < r.length; j++) {
                if (variables.indexOf(r[j]) !== -1 && j !== r.length - 1) {
                    return false;
                }
            }
        }
        return true;
    };


    //=================================
    // Files

    // Saving:
    // Function to encode grammar to XML
    function serializeGrammar() {
        var productions = _.filter(arr, function (x) {
            return x[0]
        });
        if (productions.length == 0) {
            if (multiple) {
                return "<grammar></grammar>";
            } else {
                return "<?xml version='1.0' encoding='UTF-8'?>\n<structure>\n    <type>grammar</type>\n</structure>";
            }
        }
        var text = "";
        if (!multiple) {
            text = text + '<?xml version="1.0" encoding="UTF-8"?>\n';
            text = text + "<structure>\n";
            text = text + "    <type>grammar</type>\n";
        } else {
            text = text + "    <grammar>\n";
        }
        for (var i = 0; i < productions.length; i++) {
            text = text + "    <production>\n";
            text = text + "        <left>" + productions[i][0] + "</left>\n";
            text = text + "        <right>" + productions[i][2] + "</right>\n";
            text = text + "    </production>\n";
        }
        if (multiple) {
            text = text + "    </grammar>\n";
        } else {
            text = text + "</structure>";
        }
        return text;
    };

    // Function to save and download the grammar
    var saveFile = function () {
        var downloadData = "text/xml; charset=utf-8,";
        if (!multiple) {
            downloadData += encodeURIComponent(serializeGrammar());
        } else {
            grammars[currentExercise] = serializeGrammar();
            var data = '<?xml version="1.0" encoding="UTF-8"?><structure><type>grammar</type>';
            _.each(grammars, function (grammar) {
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
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(text, "text/xml");
            } else {
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = false;
                xmlDoc.loadXML(text);
            }
            if (xmlDoc.getElementsByTagName("type")[0].childNodes[0].nodeValue !== 'grammar') {
                alert('File does not contain a grammar.');
                return;
            } else {
                xmlElem = xmlDoc.getElementsByTagName("production");
            }
        } else if (condition == "exer") {
            xmlElem = text.getElementsByTagName("production");
        } else if (condition == "multiple") {
            if (window.DOMParser) {
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(text, "text/xml");
            } else {
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = false;
                xmlDoc.loadXML(text);
            }
            xmlElem = xmlDoc.getElementsByTagName("production");
        } else {
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
        reader.onloadend = function (event) {
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

    // Function to lay out a single column width
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

    // Function to fix all table column widths
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


    // Button for exiting a proof (parsing or transformation)
    $('#helpbutton').click(displayHelp);
    $('#editbutton').click(editMode);
    $('#deletebutton').click(deleteMode);
    $('#addrowbutton').click(addrowMode);
    $('#loadfile').on('change', loadFile);
    $('#savefile').click(saveFile);
    $('#identifybutton').click(identifyGrammar);
    $('#clearbutton').click(clearAll);
    $('#completeallbutton').hide();
    $('#removeLambda').hide();
    $('#removeLambda').click(removeLambdaDisplay);
    $('#startTransform').click(startTransform);
    $('#toUnitproduction').hide();
    $('#toUnitproduction').click(toUnitProductionStep);
    $('#removeUnitproduction').hide();
    $('#removeUnitproduction').click(unitProductions);
    $('#dependencyButton').hide();
    $('#dependencyButton').click(showunitDependencyGraph);
    $('#toUselessProduction').hide();
    $('#toUselessProduction').click(toUselessProduction);
    $('#uselessDependencyGraph').hide();
    $('#uselessDependencyGraph').click(showUselessDependencyGraph);

    $(document).click(defocus);
    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            $('#firstinput').remove();
            fi = null;
        }
    });


    var getCombinations = function* (str, l) {
        for (var i = 0; i < str.length; i++) {
            if (l === 1) {
                yield [str[i]];
            } else {
                var n = getCombinations(str.substring(i + 1), l - 1);
                for (var next = n.next(); next.value; next = n.next()) {
                    yield [str[i]].concat(next.value);
                }
            }
        }
    };

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
        var productions = _.map(_.filter(arr, function(x) { return x[0];}), function(x) { return x.slice();});
        var counter = 0;
        while (findDerivable(derivers, productions)) {
            counter++;
            if (counter > 500) {
                console.log(counter);
                break;
            }
        };
        var transformed = [];
        // remove productions which do not derive a string of terminals
        for (var i = 0; i < productions.length; i++) {
            if (_.every(productions[i][2], function(x) { return x in derivers || variables.indexOf(x) === -1;})) {
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
            var r = _.uniq(_.filter(transformed[i][2], function(x) {return variables.indexOf(x) !== -1;}));
            pDict[transformed[i][0]] = _.union(pDict[transformed[i][0]], r);
        }
        var visited = {};
        visited[start] = true;
        // find reachable variables and map them in pDict
        findReachable(start, pDict, visited);
        // remove unreachable productions
        transformed = _.filter(transformed, function(x) { return x[0] === start || pDict[start].indexOf(x[0]) !== -1;});
        var ret = _.map(transformed, function(x) {return x.join('');});
        return ret;
    }
    // FADepthFirstSearch on the dictionary
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
            if (_.every(productions[i][2], function(x) { return x in set || variables.indexOf(x) === -1;})) {
                if (!(productions[i][0] in set)) {
                    set[productions[i][0]] = true;
                    return true;
                }
            }
        }
        return false;
    };
    function onLoadHandler() {
        $('#loadFile').hide();
        $('#saveFile').hide();
        $('#addExerciseButton').hide();
        $('#startTransform').hide();
        $('#back').hide();
        $('#next').hide();
        if (type == "editor") {
            m = init();
            $('.jsavmatrix').addClass("editMode");
            return;
        }
    }

    onLoadHandler();


    /////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////

    function displayHelp() {
        alert(document.getElementById('helpInfo').innerHTML);
    }

    function isRegularGrammar() {
        return (checkRightLinear() || checkLeftLinear());
    }

    function checkLeftLinear() {
        var productions = _.filter(arr, function (x) {
            return x[0]
        });
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

    function isContextFreeGrammar() {
        var productions = _.filter(arr, function (x) {
            return x[0];
        });
        for (var i = 0; i < productions.length; i++) {
            var lhs = productions[i][0];
            if (lhs.length !== 1 || variables.indexOf(lhs) === -1) {
                return false;
            }
        }
        return true;
    }


    function clearAll() {
        window.location.href = "";
    }

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
        jsav.umsg("All lambda productions removed");
        arr = newArr;
        document.getElementById('removeLambda').disabled = true;

        $('#toUnitproduction').show();
        $('#removeLambda').hide();


    }

    function toUnitProductionStep() {

        jsav.umsg("Next Step is to build the dependency graph for the grammar using the left grammar without lambda production");
        $('#toUnitproduction').hide();
        $('#dependencyButton').show();


    }

    function showunitDependencyGraph() {
        $('#dependencyButton').hide();

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
        jsav.umsg("All unit productions removed");
        arr = newArr;
        dsArray = tempDsArray;
        document.getElementById('removeLambda').disabled = true;
        $('#removeUnitproduction').hide();
        $('#toUselessProduction').show();
    }

    function showUselessDependencyGraph() {

    }

    function toUselessProduction() {
        jsav.umsg("Next Step is to build the dependency graph for the grammar using the left grammar without unit production");
        modelDFA.clear();
        for (var i = 0; i < dsArray.length; i++) {
            dsArray[i].unhighlight();
        }
        $('#toUselessProduction').hide();
        $('#uselessDependencyGraph').show();
    }

    function startTransform() {
        document.getElementById('startTransform').disabled = true;

        var noLambda = removeLambda();
        var noUnit = removeUnit();
        var noUseless = removeUseless();
        var productions = _.map(_.filter(arr, function(x) { return x[0];}), function(x) { return x.slice();});
        var strP = _.map(productions, function (x) {
            return x.join('');
        });
        backup = "" + strP;
        var highlightCounter = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][0] === '' && arr[i][2] === '') {
                continue;
            }
            if (arr[i][2] === lambda) {
                dsArray[i] = jsav.ds.array(arr[i], {center: false}).highlight();
                highlightCounter++;
            } else {
                dsArray[i] = jsav.ds.array(arr[i], {center: false});
            }
        }

        if (!checkTransform(strP, noLambda)) {
            $('#removeLambda').show();

            if (highlightCounter === 1) {
                $("#mode").html("the highlight production is the Lambda production. In the Transformation, we need to remove it firstly!");
            } else if (highlightCounter > 1) {
                $("#mode").html("the highlight productions are the Lambda productions. In the Transformation, we need to remove them firstly!");
            }
        } else if (!checkTransform(strP, noUnit)) {
            $("#mode").html('You productions do not have any lambda productions! Move to remove unit productions phase');
            $('#toUnitproduction').show();
        } else if (!checkTransform(strP, noUseless))
        {
            $("#mode").html('You productions do not have any lambda productions and unit producitions! Move to remove useless productions phase');
            $('#toUselessProduction').show();
        } else {
            backup = null;
            jsav.umsg('Grammar already in Chomsky Normal Form.');
            return true;
        }


    }

    var checkTransform = function (strP, g) {
        var inter = _.intersection(strP, g);
        if (inter.length === strP.length && inter.length === g.length) {
            return true;
        }
        return false;
    };

    function identifyGrammar() {
        var productions = _.map(_.filter(arr, function(x) { return x[0];}), function(x) { return x.slice();});
        if (productions.length === 0) {
            alert('No grammar.');
            return;
        }
        if (isContextFreeGrammar()) {
            alert('This grammar is a Context-Free Grammar, you can go to the next step');
            isCFG = true;

            $('#helpbutton').hide();
            $('#editbutton').hide();
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
            $("#mode").html('After confirming the grammar is context free grammar, we need to remove some producitons as the following order:\n' +
                '1. lambda production\n 2. unit production\n 3. useless production\n');

            return;
        } else {
            alert('The CNF (Chomsky Normal Form) can only accept CFG (context free grammar), please chnage the grammar to CFG');
            return;
        }
    }
});
