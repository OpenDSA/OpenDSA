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
        if (type !== "transformation") {
            m2.on('click', matrixClickHandler);

            // document.getElementById("av").oncontextmenu = function(e){
            //     e.preventDefault();
            // };
            //
            // m2.on('mouseup',function(e) {
            //     if (!e) e=window.event;
            //     if (e.button==2) {
            //
            //         $("#menu").css({left:this.element.offset().left + e.offsetX, top: this.element.offset().top + e.offsetY});
            //         $("#menu").show();
            //     }
            // });

        }


        return m2;
    };

    // handler for grammar editing
    var matrixClickHandler = function (index, index2) {
        console.log("row: " + row + " index: " + index + " col: " + col + " index2: " + index2 + " fi: " + fi + " m: " + m + " arr: " + arr);
        var deleteTimes = 0;
        // if ((row != index || col != index2) && fi) {

        if (fi) {
            var input = fi.val();
            var regex = new RegExp(emptystring, g);
            input = input.replace(regex, "");
            input = input.replace(regex, "!");
            if (input === "" && col == 2) {
                input = emptystring;
            }
            // if (input === "" && col === 0) {
            //     alert('Invalid left-hand side.');
            //     fi.remove();
            //     return
            // }
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
            if(index === 0 && lastRow === 0) {
                arr[index][0] = "";
                arr[index][2] = "";
                for(var i = lastRow + 1; i < arr.length; i++) {
                    arr[i][0] = '';
                    arr[i][2] = '';
                }
                m = init();
                $('.jsavmatrix').addClass("editMode");
                $('.jsavmatrix').removeClass("deleteMode");
                $('.jsavmatrix').removeClass("addrowMode");
                jsav.umsg('Editing');
                return;
            }
            // recreates the matrix when deleting a row..
            if (!(arr[index][0] === "" && arr[index][2] === "")) {
                var result = confirm("Are you sure you want to delete this production you selected?");
                if (result) {
                    arr.splice(index, 1);
                    lastRow--;
                    deleteTimes++;
                    arr.push(["",arrow,""]);
                    m = init();
                }
            } else {
                arr.splice(index, 1);
                lastRow--;
                deleteTimes++
                arr.push(["",arrow,""]);
                m = init();
                for(var i = lastRow + 1; i < arr.length; i++) {
                    arr[i][0] = '';
                    arr[i][2] = '';
                }
            }
            for(var i = lastRow + 1; i < arr.length; i++) {
                arr[i][0] = '';
                arr[i][2] = '';
            }
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
        if (deleteTimes == 1) {
            $('.jsavmatrix').addClass("editMode");
            $('.jsavmatrix').removeClass("deleteMode");
            $('.jsavmatrix').removeClass("addrowMode");
            jsav.umsg('Editing');
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
                    case 13: // enter key
                        if (index2 == 0) {
                            focus(index, 2);
                        } else {
                            // adding a new production
                            addRow(index);
                            jsav.umsg('Editing');
                        }
                        break;
                    case 37: // arrow left key
                        if (index2 == 2) {
                            focus(index, 0);
                        }
                        break;
                    case 38:  // arrow up key
                        if (index > 0) {
                            focus(index - 1, index2);
                        }
                        break;
                    case 39: // arrow right key
                        if (index2 == 0) {
                            focus(index, 2);
                        }
                        break;
                    case 40: // arrow down key
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
            //alert('Invalid left-hand side.');
            fi.remove();
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
        jsav.umsg('Editing');

    };
    var deleteMode = function () {
        $('#firstinput').remove();
        $('.jsavmatrix').addClass("deleteMode");
        $('.jsavmatrix').removeClass("addrowMode");
        $('.jsavmatrix').removeClass("editMode");
        jsav.umsg('Deleting');
    };
    var addrowMode = function () {

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
    //$('#editbutton').click(editMode);
    $('#deletebutton').click(deleteMode);
    $('#addrowbutton').click(addrowMode);
    $('#loadfile').on('change', loadFile);
    $('#savefile').click(saveFile);
    // $('#identifybutton').click(identifyGrammar);
    $('#clearbutton').click(clearAll);
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
    $('#removeUslesspruduction').click(uselessProduciton);
    $('#removeUslesspruduction').hide();
    $('#toChomskyForm').hide();
    $('#ChangeToChomsky').hide();
    $('#toChomskyForm').click(toChomskyForm);
    $('#ChangeToChomsky').click(transformToChomskyForm);
    $('#buildUselessDependencyGraph').hide();
    $('#buildUselessDependencyGraph').click(buildUselessDependencyGraph);

    $('#back').click(function () {
        if (modelDFA) {
            modelDFA.clear();
        }
        if (backup) {
            arr = _.map(backup.split(','), function (x) {
                var d = x.split(arrow);
                d.splice(1, 0, arrow);
                return d;
            });
            lastRow = arr.length;
            arr.push(["", arrow, ""]);
            backup = null;
        }
        for (var i = 0; i < dsArray.length; i++) {
            dsArray[i].hide();
        }
        for (var i = 0; i < ChomskydsArray.length; i++) {
            ChomskydsArray[i].hide();
        }
        dsArray = [];
        ChomskydsArray = [];
        m = init();
        $('#helpbutton').show();
        $('#deletebutton').show();
        $('#addrowbutton').show();
        $('#loadfile').show();
        $('#savefile').show();
        $('#startTransform').show();
        $('#clearbutton').show();

        $('#removeLambda').hide();
        $('#removeUnitproduction').hide();
        $('#removeUslesspruduction').hide();

        $('#toUnitproduction').hide();
        $('#toUselessProduction').hide();

        $('#dependencyButton').hide();
        $('#uselessDependencyGraph').hide();
        $('#buildUselessDependencyGraph').hide();
        $('#buildUnitDependencyGraph').hide();
        $('#toChomskyForm').hide();
        $('#ChangeToChomsky').hide();
        // document.getElementById("startTransform").disabled = true;
        jsav.umsg('');
    });

    $('#buildUnitDependencyGraph').hide();
    $('#buildUnitDependencyGraph').click(buildUnitDependencyGraph);
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

    function onLoadHandler() {
        $('#loadFile').hide();
        $('#saveFile').hide();
        $('#addExerciseButton').hide();
        //document.getElementById("startTransform").disabled = true;
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
            return x[0];
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
        document.getElementById('helpInfo').innerHTML = "Help:\n The highlighted produciton is unit produciton.\n Click the \'build dependency graph\' " +
            "button to set up the relationship of Variables.\n You can choose build the graph manually or automaticlly.";
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
            modelDFA = jsav.ds.graph({layout: "layered", directed: true});
            jsav.umsg('there is no reletionship for those terminals');
            m.hide();
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
        document.getElementById('helpInfo').innerHTML = "Help:\n The highlighted produciton is useless produciton.\n Click the \'build dependency graph\' " +
            "button to set up the relationship of Variables.\n You can choose build the graph manually or automaticlly.";
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

        //modelDFA.layout();
        modelDFA.hide();
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
                        var temp = "B_" + r[j];
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
                    var temp = "$D_" + varCounter;
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
        document.getElementById('helpInfo').innerHTML = "Help:\n Click the button to start to convert.";
        jsav.umsg("Next Step is converting the grammar to  Chomsky Form");
        if (typeof modelDFA != "undefined") {
            modelDFA.hide();
        }
        for (var i = 0; i < dsArray.length; i++) {
            dsArray[i].unhighlight();
            //dsArray[i].hide();
        }
        $('#toChomskyForm').hide();
        $('#ChangeToChomsky').show();

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
                    var tempB = "B_" + r[i];
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

    function startTransform() {

        var identified = identifyGrammar();
        if (identified === 1)
        {
            alert('No grammar.');
            return;
        } else if (identified === 2) {
            alert('This grammar is a Context-Free Grammar, you can go to the next step');

            $('#back').show();
            //document.getElementById("editor").innerHTML = 'First step:';
            jsav.umsg('After confirming the grammar is context free grammar, we need to remove some producitons as the following order:<br>' +
                '1. lambda production<br> 2. unit production<br> 3. useless production.<br> Please click open transforer button to start transforming');
        }
        else if (identified === 0) {
            alert('The CNF (Chomsky Normal Form) can only accept CFG (context free grammar), please change the grammar to CFG');
            return;
        }
        m.hide();
        // localStorage['grammar'] = _.map(arr, function (x) {
        //     return x.join('');
        // });
         // window.open("grammarTransform.html");
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
        //$('#helpbutton').hide();
        var imgs = "Transfer the following grammars you inputted below from CTG to CNF:" + "<br>";
        console.log(productions[0][1]);
        for (var i = 0; i < productions.length; i++) {
            if (productions[i][2] === lambda) {
                imgs = imgs + '<img src=' + latexit + productions[i][0]+"%20\\to%20" +"\\lambda"+'>' + "<br>";
            } else {
                imgs = imgs + '<img src=' + latexit + productions[i][0]+"%20\\to%20" +productions[i][2]+'>' + "<br>";
            }

        }
        //imgs = imgs + "Please click startTransform button to start this experience";
        document.getElementById('editor').innerText = "Grammar Transform Exercise"
        document.getElementById('description').innerHTML = imgs;
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
        $('#deletebutton').hide();
        $('#addrowbutton').hide();
        $('#loadfile').hide();
        $('#savefile').hide();
        $('#clearbutton').hide();
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
            document.getElementById('helpInfo').innerHTML = "The highlighted grammar is the lambda production, click \'Remove Lambda\' button to remove them, and may additional productions show up.";
            if (highlightCounter === 1) {
                jsav. umsg("The highlight production is the Lambda production. In the Transformation, we need to remove it firstly!");
            } else if (highlightCounter > 1) {
                jsav.umsg("The highlight productions are the Lambda productions. In the Transformation, we need to remove them firstly!");
            }
        } else if (!checkTransform(strP, noUnit)) {
            jsav.umsg('Your productions do not have any lambda productions! Move to remove unit productions phase');
            $('#toUnitproduction').show();
            document.getElementById('helpInfo').innerHTML = "Help:\n click button to next step";
        } else if (!checkTransform(strP, noUseless)) {
            jsav.umsg('Your productions do not have any lambda productions and unit productions! Move to remove useless productions phase');
            $('#toUselessProduction').show();
            document.getElementById('helpInfo').innerHTML = "Help:\n click button to next step";
        } else if (!checkTransform(strP, fullChomsky)) {
            jsav.umsg('Grammar already in Chomsky Normal Form.');
            document.getElementById('helpInfo').innerHTML = "Help:\n click button to next step";
            return true;
        } else {
            backup = null;
            jsav.umsg('Grammar cannot be determined');
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
        var productions = _.map(_.filter(arr, function (x) {
            return x[0];
        }), function (x) {
            return x.slice();
        });
        if (productions.length === 0) {
            return 1;
        }
        if (isContextFreeGrammar()) {
            return 2;
        } else {
            //alert('The CNF (Chomsky Normal Form) can only accept CFG (context free grammar), please change the grammar to CFG');
            return 0;
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
});