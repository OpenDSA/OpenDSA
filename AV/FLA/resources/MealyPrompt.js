function TraversePrompt(func) {
    var traverseFunction = func;

    this.render = function() {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogueoverlay = document.getElementById('dialogueoverlay');
        var dialoguebox = document.getElementById('dialoguebox');
        dialogueoverlay.style.display = "block";
        dialogueoverlay.style.height = winH+"px";
        dialoguebox.style.left = (winW/2) - (550/2)+"px";
        dialoguebox.style.top = "100px";
        dialoguebox.style.display = "block";
        document.getElementById('dialogueboxhead').innerHTML = "Traverse:";
        document.getElementById('dialogueboxbody').innerHTML = 'Input String: <input class="newinput" id="first"> <button onclick="deleteInput(0)">Delete Input</button>';
        document.getElementById('dialogueboxfoot').innerHTML = '<button onclick="addNewInput()">Add New Input</button> <button onclick="traverseInput()">Traverse</button> <button onclick="goback()">Cancel</button>';
        document.getElementById('first').focus();
    }
    goback = function() {
        document.getElementById('dialoguebox').style.display = "none";
        document.getElementById('dialogueoverlay').style.display = "none";
    }
    traverseInput = function() {
        var values = [];
        var x = document.getElementById('dialogueboxbody').getElementsByClassName('newinput');
        for (var i = 0; i < x.length; i++) {
            values.push(x[i].value);
        }
        traverseFunction(values);
        this.goback();
    }
    addNewInput = function() {
        var values = [];
        var x = document.getElementById('dialogueboxbody').getElementsByClassName('newinput');
        for (var j = 0; j < x.length; j++) {
            values.push(x[j].value);
        }
        document.getElementById('dialogueboxbody').innerHTML += '<br>Input String: <input class="newinput"> <button onclick="deleteInput(' + values.length + ')">Delete Input</button>';
        x = document.getElementById('dialogueboxbody').getElementsByClassName('newinput');
        for (var k = 0; k < values.length; k++) {
            x[k].value = values[k];
        }
        x[x.length - 1].focus();
    }
    deleteInput = function(input) {
        var values = [];
        var x = document.getElementById('dialogueboxbody').getElementsByClassName('newinput');
        for (var i = 0; i < x.length; i++) {
            if (i != input) {
                values.push(x[i].value);
            }
        }
        document.getElementById('dialogueboxbody').innerHTML = 'Input String: <input class="newinput" id="first"> <button onclick="deleteInput(0)">Delete Input</button>';
        for (var j = 1; j < values.length; j++) {
            document.getElementById('dialogueboxbody').innerHTML += '<br>Input String: <input class="newinput"> <button onclick="deleteInput(' + j + ')">Delete Input</button>';
        }
        x = document.getElementById('dialogueboxbody').getElementsByClassName('newinput');
        for (var k = 0; k < values.length; k++) {
            x[k].value = values[k];
        }
        x[x.length - 1].focus();
    }
}

function NodePrompt(func) {
    var nodeFunction = func;

    this.render = function(value, is, lab) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogueoverlay = document.getElementById('dialogueoverlay');
        var dialoguebox = document.getElementById('dialoguebox');
        dialogueoverlay.style.display = "block";
        dialogueoverlay.style.height = winH+"px";
        dialoguebox.style.left = (winW/2) - (550/2)+"px";
        dialoguebox.style.top = "100px";
        dialoguebox.style.display = "block";
        document.getElementById('dialogueboxhead').innerHTML = "Edit Node <b>" + value + ":</b>";
        document.getElementById('dialogueboxbody').innerHTML = 'Initial State:<input type="checkbox" id="initial_state">';
        document.getElementById('dialogueboxbody').innerHTML += '<br>State Label: <input id="label">';
        document.getElementById('dialogueboxfoot').innerHTML = '<button onclick="ok()">OK</button> <button onclick="terminate()">Cancel</button>';
        if (is) {
            document.getElementById('initial_state').checked = true;
        }
        if (lab) {
            document.getElementById('label').value = lab;
        }
        document.getElementById('label').focus();
    }
    terminate = function() {
        document.getElementById('dialoguebox').style.display = "none";
        document.getElementById('dialogueoverlay').style.display = "none";
    }
    ok = function() {
        var initial_state = document.getElementById('initial_state').checked;
        var node_label = document.getElementById('label').value;
        nodeFunction(initial_state, node_label);
        this.terminate();
    }
}

function EdgePrompt(func, nostr) {
    var edgeFunction = func;
    var emptystr = nostr;

    this.render = function(values) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogueoverlay = document.getElementById('dialogueoverlay');
        var dialoguebox = document.getElementById('dialoguebox');
        dialogueoverlay.style.display = "block";
        dialogueoverlay.style.height = winH+"px";
        dialoguebox.style.left = (winW/2) - (550/2)+"px";
        dialoguebox.style.top = "100px";
        dialoguebox.style.display = "block";
        document.getElementById('dialogueboxbody').innerHTML = 'Input Character: <input class="newedgein" id="transition"> <br>Output Character: <input class="newedgeout"> <br><button onclick="deleteEdge(0)">Delete Transition</button>';
        document.getElementById('dialogueboxfoot').innerHTML = '<button onclick="addNewWeight()">Add New Transition</button> <button onclick="addEdge()">Done</button> <button onclick="end()">Cancel</button>';
        if (!values) {
            document.getElementById('dialogueboxhead').innerHTML = "Create Edge:";
        }
        else {
            document.getElementById('dialogueboxhead').innerHTML = "Edit Edge:";
            for (var i = 1; i < values.length; i++) {
                document.getElementById('dialogueboxbody').innerHTML += '<br><br>Input Character: <input class="newedgein"> <br>Output Character: <input class="newedgeout"> <br><button onclick="deleteEdge(' + i + ')">Delete Transition</button>';
            }
            var x = document.getElementById('dialogueboxbody').getElementsByClassName('newedgein');
            var y = document.getElementById('dialogueboxbody').getElementsByClassName('newedgeout');
            for (var j = 0; j < values.length; j++) {
                symbols = values[j].split(":");
                if (symbols[0] != emptystr) {
                    x[j].value = symbols[0];
                }
                if (symbols[1] != emptystr) {
                    y[j].value = symbols[1];
                }
            }
        }
        document.getElementById('transition').focus();
    }
    end = function() {
        document.getElementById('dialoguebox').style.display = "none";
        document.getElementById('dialogueoverlay').style.display = "none";
    }
    addEdge = function() {
        var joinedValues = [];
        var noDuplicates = [];
        var x = document.getElementById('dialogueboxbody').getElementsByClassName('newedgein');
        var y = document.getElementById('dialogueboxbody').getElementsByClassName('newedgeout');
        for (var j = 0; j < x.length; j++) {
            var inValue;
            var outValue;
            if (x[j].value === "") {
                inValue = emptystr;
            }
            else {
                inValue = x[j].value;
            }
            if (y[j].value === "") {
                outValue = emptystr;
            }
            else {
                outValue = y[j].value;
            }
            joinedValues.push(inValue + ":" + outValue);
        }
        for (var k = 0; k < joinedValues.length; k++) {
            if (noDuplicates.indexOf(joinedValues[k]) == -1) {
                noDuplicates.push(joinedValues[k]);
            }
        }
        var edge_label = noDuplicates.join("<br>");
        edgeFunction(edge_label);
        this.end();
    }
    addNewWeight = function() {
        var inValues = [];
        var outValues = [];
        var x = document.getElementById('dialogueboxbody').getElementsByClassName('newedgein');
        var y = document.getElementById('dialogueboxbody').getElementsByClassName('newedgeout');
        for (var j = 0; j < x.length; j++) {
            inValues.push(x[j].value);
            outValues.push(y[j].value);
        }
        document.getElementById('dialogueboxbody').innerHTML += '<br><br>Input Character: <input class="newedgein"> <br>Output Character: <input class="newedgeout"> <br><button onclick="deleteEdge(' + inValues.length + ')">Delete Transition</button>';
        x = document.getElementById('dialogueboxbody').getElementsByClassName('newedgein');
        y = document.getElementById('dialogueboxbody').getElementsByClassName('newedgeout');
        for (var k = 0; k < inValues.length; k++) {
            x[k].value = inValues[k];
            y[k].value = outValues[k];
        }
        x[x.length - 1].focus();
    }
    deleteEdge = function(edge) {
        var inValues = [];
        var outValues = [];
        var x = document.getElementById('dialogueboxbody').getElementsByClassName('newedgein');
        var y = document.getElementById('dialogueboxbody').getElementsByClassName('newedgeout');
        for (var i = 0; i < x.length; i++) {
            if (i != edge) {
                inValues.push(x[i].value);
                outValues.push(y[i].value);
            }
        }
        document.getElementById('dialogueboxbody').innerHTML = 'Input Character: <input class="newedgein" id="transition"> <br>Output Character: <input class="newedgeout"> <br><button onclick="deleteEdge(0)">Delete Transition</button>';
        for (var j = 1; j < inValues.length; j++) {
            document.getElementById('dialogueboxbody').innerHTML += '<br><br>Input Character: <input class="newedgein"> <br>Output Character: <input class="newedgeout"> <br><button onclick="deleteEdge(' + j + ')">Delete Transition</button>';
        }
        x = document.getElementById('dialogueboxbody').getElementsByClassName('newedgein');
        y = document.getElementById('dialogueboxbody').getElementsByClassName('newedgeout');
        for (var k = 0; k < inValues.length; k++) {
            x[k].value = inValues[k];
            y[k].value = outValues[k];
        }
        x[x.length - 1].focus();
    }
}