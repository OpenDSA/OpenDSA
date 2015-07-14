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
        document.getElementById('dialogueboxfoot').innerHTML = '<button onclick="addNewInput()">Add New Input</button> <button onclick="traverseInput()">Traverse</button> <button onclick="terminate()">Cancel</button>';
        document.getElementById('first').focus();
    }
    terminate = function() {
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
        this.terminate();
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

    this.render = function(value, is, fs, lab) {
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
        document.getElementById('dialogueboxbody').innerHTML += '<br>Final State:<input type="checkbox" id="final_state">';
        document.getElementById('dialogueboxbody').innerHTML += '<br>State Label: <input id="label">';
        document.getElementById('dialogueboxfoot').innerHTML = '<button onclick="ok()">OK</button> <button onclick="terminate()">Cancel</button>';
        if (is) {
            document.getElementById('initial_state').checked = true;
        }
        if (fs) {
            document.getElementById('final_state').checked = true;
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
        var final_state = document.getElementById('final_state').checked;
        var node_label = document.getElementById('label').value;
        nodeFunction(initial_state, final_state, node_label);
        this.terminate();
    }
}

function MealyNodePrompt(func) {
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

function MooreNodePrompt(func, cancelFunc, nostr) {
    var nodeFunction = func;
    var cancelFunction = cancelFunc;
    var emptystr = nostr;

    this.render = function(value, is, lab, outputChar) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogueoverlay = document.getElementById('dialogueoverlay');
        var dialoguebox = document.getElementById('dialoguebox');
        dialogueoverlay.style.display = "block";
        dialogueoverlay.style.height = winH+"px";
        dialoguebox.style.left = (winW/2) - (550/2)+"px";
        dialoguebox.style.top = "100px";
        dialoguebox.style.display = "block";
        document.getElementById('dialogueboxbody').innerHTML = 'Initial State:<input type="checkbox" id="initial_state">';
        document.getElementById('dialogueboxbody').innerHTML += '<br>Output Character: <input id="moore">';
        document.getElementById('dialogueboxbody').innerHTML += '<br>State Label: <input id="label">';
        document.getElementById('dialogueboxfoot').innerHTML = '<button onclick="ok()">OK</button> <button onclick="cancel()">Cancel</button>';
        if(!outputChar){
            document.getElementById('dialogueboxhead').innerHTML = "Create Node <b>" + value + ":</b>";
        }
        else {
            document.getElementById('dialogueboxhead').innerHTML = "Edit Node <b>" + value + ":</b>";
            if (is) {
                document.getElementById('initial_state').checked = true;
            }
            if (lab) {
                document.getElementById('label').value = lab;
            }
            if (outputChar != emptystr) {
                document.getElementById('moore').value = outputChar;
            }
        }
        document.getElementById('moore').focus();
    }
    terminate = function() {
        document.getElementById('dialoguebox').style.display = "none";
        document.getElementById('dialogueoverlay').style.display = "none";
    }
    cancel = function() {
        cancelFunction();
        this.terminate();
    }
    ok = function() {
        var initial_state = document.getElementById('initial_state').checked;
        var node_label = document.getElementById('label').value;
        var output_char = document.getElementById('moore').value;
        if (output_char === "") {
            output_char = emptystr;
        }
        nodeFunction(initial_state, node_label, output_char);
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
        document.getElementById('dialogueboxbody').innerHTML = 'Transition: <input class="newedge" id="transition"> <button onclick="deleteEdge(0)">Delete Transition</button>';
        document.getElementById('dialogueboxfoot').innerHTML = '<button onclick="addNewWeight()">Add New Transition</button> <button onclick="addEdge()">Done</button> <button onclick="terminate()">Cancel</button>';
        if (!values) {
            document.getElementById('dialogueboxhead').innerHTML = "Create Edge:";
        }
        else {
            document.getElementById('dialogueboxhead').innerHTML = "Edit Edge:";
            for (var i = 1; i < values.length; i++) {
                document.getElementById('dialogueboxbody').innerHTML += '<br>Transition: <input class="newedge"> <button onclick="deleteEdge(' + i + ')">Delete Transition</button>';
            }
            var x = document.getElementById('dialogueboxbody').getElementsByClassName('newedge');
            for (var j = 0; j < values.length; j++) {
                if (values[j] != emptystr) {
                    x[j].value = values[j];
                }
            }
        }
        document.getElementById('transition').focus();
    }
    terminate = function() {
        document.getElementById('dialoguebox').style.display = "none";
        document.getElementById('dialogueoverlay').style.display = "none";
    }
    addEdge = function() {
        var values = [];
        var x = document.getElementById('dialogueboxbody').getElementsByClassName('newedge');
        for (var j = 0; j < x.length; j++) {
            if (x[j].value === "") {
                if (values.indexOf(emptystr) == -1) {
                    values.push(emptystr);
                }
            }
            else if (values.indexOf(x[j].value) == -1) {
                values.push(x[j].value);
            }
        }
        var edge_label = values.join("<br>");
        edgeFunction(edge_label);
        this.terminate();
    }
    addNewWeight = function() {
        var values = [];
        var x = document.getElementById('dialogueboxbody').getElementsByClassName('newedge');
        for (var j = 0; j < x.length; j++) {
            values.push(x[j].value);
        }
        document.getElementById('dialogueboxbody').innerHTML += '<br>Transition: <input class="newedge"> <button onclick="deleteEdge(' + values.length + ')">Delete Transition</button>';
        x = document.getElementById('dialogueboxbody').getElementsByClassName('newedge');
        for (var k = 0; k < values.length; k++) {
            x[k].value = values[k];
        }
        x[x.length - 1].focus();
    }
    deleteEdge = function(edge) {
        var values = [];
        var x = document.getElementById('dialogueboxbody').getElementsByClassName('newedge');
        for (var i = 0; i < x.length; i++) {
            if (i != edge) {
                values.push(x[i].value);
            }
        }
        document.getElementById('dialogueboxbody').innerHTML = 'Transition: <input class="newedge" id="transition"> <button onclick="deleteEdge(0)">Delete Transition</button>';
        for (var j = 1; j < values.length; j++) {
            document.getElementById('dialogueboxbody').innerHTML += '<br>Transition: <input class="newedge"> <button onclick="deleteEdge(' + j + ')">Delete Transition</button>';
        }
        x = document.getElementById('dialogueboxbody').getElementsByClassName('newedge');
        for (var k = 0; k < values.length; k++) {
            x[k].value = values[k];
        }
        x[x.length - 1].focus();
    }
}

function MealyEdgePrompt(func, nostr) {
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
        document.getElementById('dialogueboxfoot').innerHTML = '<button onclick="addNewWeight()">Add New Transition</button> <button onclick="addEdge()">Done</button> <button onclick="terminate()">Cancel</button>';
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
    terminate = function() {
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
        this.terminate();
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