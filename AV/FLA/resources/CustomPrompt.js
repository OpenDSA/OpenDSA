// Render function used to initialize the prompt box in the view. Called by all other render functions.
function renderBox() {
    // Configure aesthetics of the prompt box and overlay.
    var winW = window.innerWidth;
    var winH = window.innerHeight;
    var dialogueoverlay = document.getElementById('dialogueoverlay');
    var dialoguebox = document.getElementById('dialoguebox');
    dialogueoverlay.style.display = "block";
    dialogueoverlay.style.height = winH+"px";
    dialoguebox.style.left = (winW/2) - (550/2)+"px";
    dialoguebox.style.top = "100px";
    dialoguebox.style.display = "block";
}

// Exit out of the prompt box.
function terminate() {
    document.getElementById('dialoguebox').style.display = "none";
    document.getElementById('dialogueoverlay').style.display = "none";
}

// Custom prompt box for input strings to traverse over.
// Used by the Finite Automaton Editor, Mealy Machine Editor, and Moore Machine Editor.
function TraversePrompt(func) {
    var traverseFunction = func;
    // Prompt box needs a reference to the function to run upon clicking "Traverse".

    // Render function is used to initialize the prompt box in the view.
    this.render = function() {
        renderBox();
        // Add content to the prompt box, with references to the functions to run within the buttons.
        document.getElementById('dialogueboxhead').innerHTML = "Traverse:";
        document.getElementById('dialogueboxbody').innerHTML = 'Input String: <input class="newinput" id="first"> <button onclick="deleteInput(0)">Delete Input</button>';
        document.getElementById('dialogueboxfoot').innerHTML = '<button onclick="addNewInput()">Add New Input</button> <button onclick="traverseInput()">Traverse</button> <button onclick="terminate()">Cancel</button>';
        document.getElementById('first').focus();
        // The focus function places the cursor in the specified text box.
    }

    // Traverse over input strings. Called upon clicking "Traverse".
    traverseInput = function() {
        // Create an array of input strings from the text fields in the prompt box.
        var values = [];
        var x = document.getElementById('dialogueboxbody').getElementsByClassName('newinput');
        for (var i = 0; i < x.length; i++) {
            values.push(x[i].value);
        }
        // Call the traverse function on the array, then exit out of the prompt box.
        traverseFunction(values);
        terminate();
    }

    // Add a new text field for another input string. Called upon clicking "Add New Input".
    addNewInput = function() {
        // Back up all of the text already in text fields to an array.
        var values = [];
        var x = document.getElementById('dialogueboxbody').getElementsByClassName('newinput');
        for (var j = 0; j < x.length; j++) {
            values.push(x[j].value);
        }
        // Add another text field to the prompt box. Note that this clears all text in any existing text fields (hence why that text was backed up to an array).
        document.getElementById('dialogueboxbody').innerHTML += '<br>Input String: <input class="newinput"> <button onclick="deleteInput(' + values.length + ')">Delete Input</button>';
        // Get another reference to the text fields and add the strings in the backup array.
        x = document.getElementById('dialogueboxbody').getElementsByClassName('newinput');
        for (var k = 0; k < values.length; k++) {
            x[k].value = values[k];
        }
        // Place the cursor in the last text field by default.
        x[x.length - 1].focus();
    }

    // Delete an existing text field. Called upon clicking the "Delete Input" button next to the text field the user wishes to delete.
    deleteInput = function(input) {
        // Back up all of the text already in text fields to an array, EXCEPT the text the user wishes to delete.
        var values = [];
        var x = document.getElementById('dialogueboxbody').getElementsByClassName('newinput');
        for (var i = 0; i < x.length; i++) {
            if (i != input) {
                values.push(x[i].value);
            }
        }
        // Completely rewrite all of the text fields in the prompt box (thus clearing the text data within).
        // There must always be at least one text field in the prompt box, so add this first.
        document.getElementById('dialogueboxbody').innerHTML = 'Input String: <input class="newinput" id="first"> <button onclick="deleteInput(0)">Delete Input</button>';
        // For every remaining, undeleted text field, add it to the prompt box.
        for (var j = 1; j < values.length; j++) {
            document.getElementById('dialogueboxbody').innerHTML += '<br>Input String: <input class="newinput"> <button onclick="deleteInput(' + j + ')">Delete Input</button>';
        }
        // Get another reference to the text fields and add the strings in the backup array.
        x = document.getElementById('dialogueboxbody').getElementsByClassName('newinput');
        for (var k = 0; k < values.length; k++) {
            x[k].value = values[k];
        }
        // Place the cursor in the last text field by default.
        x[x.length - 1].focus();
    }
}

// Custom prompt box for editing nodes in the Finite Automaton Editor.
// Supports editing of initial states, final states, and state labels.
function FANodePrompt(func) {
    var nodeFunction = func;
    // Prompt box needs a reference to the function to run upon clicking "OK".

    // Render function is used to initialize the prompt box in the view.
    this.render = function(value, is, fs, lab) {
        renderBox();
        // Add content to the prompt box, with references to the functions to run within the buttons.
        document.getElementById('dialogueboxhead').innerHTML = "Edit Node <b>" + value + ":</b>";
        document.getElementById('dialogueboxbody').innerHTML = 'Initial State:<input type="checkbox" id="initial_state">';
        document.getElementById('dialogueboxbody').innerHTML += '<br>Final State:<input type="checkbox" id="final_state">';
        document.getElementById('dialogueboxbody').innerHTML += '<br>State Label: <input id="label">';
        document.getElementById('dialogueboxfoot').innerHTML = '<button onclick="ok()">OK</button> <button onclick="terminate()">Cancel</button>';
        // If the node being edited is currently the initial state, check the "Initial State" checkbox.
        if (is) {
            document.getElementById('initial_state').checked = true;
        }
        // If the node being edited is currently the final state, check the "Final State" checkbox.
        if (fs) {
            document.getElementById('final_state').checked = true;
        }
        // If the node being edited has a state label, display this text in the "State Label" text field.
        if (lab) {
            document.getElementById('label').value = lab;
        }
        // Place the cursor in the state label text field by default (since this is the only text field in the prompt box).
        document.getElementById('label').focus();
    }

    // Update node on the graph. Called upon clicking "OK".
    ok = function() {
        // Check every field in the prompt box and update the node accordingly.
        var initial_state = document.getElementById('initial_state').checked;
        var final_state = document.getElementById('final_state').checked;
        var node_label = document.getElementById('label').value;
        // Call the node function on these values, then exit out of the prompt box.
        nodeFunction(initial_state, final_state, node_label);
        terminate();
    }
}

// Custom prompt box for editing nodes in the Mealy Machine Editor.
// Supports editing of initial states and state labels.
function MealyNodePrompt(func) {
    var nodeFunction = func;
    // Prompt box needs a reference to the function to run upon clicking "OK".

    // Render function is used to initialize the prompt box in the view.
    this.render = function(value, is, lab) {
        renderBox();
        // Add content to the prompt box, with references to the functions to run within the buttons.
        document.getElementById('dialogueboxhead').innerHTML = "Edit Node <b>" + value + ":</b>";
        document.getElementById('dialogueboxbody').innerHTML = 'Initial State:<input type="checkbox" id="initial_state">';
        document.getElementById('dialogueboxbody').innerHTML += '<br>State Label: <input id="label">';
        document.getElementById('dialogueboxfoot').innerHTML = '<button onclick="ok()">OK</button> <button onclick="terminate()">Cancel</button>';
        // If the node being edited is currently the initial state, check the "Initial State" checkbox.
        if (is) {
            document.getElementById('initial_state').checked = true;
        }
        // Note that since this is a Mealy Machine, there is no such thing as a final state.
        // If the node being edited has a state label, display this text in the "State Label" text field.
        if (lab) {
            document.getElementById('label').value = lab;
        }
        // Place the cursor in the state label text field by default (since this is the only text field in the prompt box).
        document.getElementById('label').focus();
    }

    // Update node on the graph. Called upon clicking "OK".
    ok = function() {
        // Check every field in the prompt box and update the node accordingly.
        var initial_state = document.getElementById('initial_state').checked;
        var node_label = document.getElementById('label').value;
        // Call the node function on these values, then exit out of the prompt box.
        nodeFunction(initial_state, node_label);
        terminate();
    }
}

// Custom prompt box for both creating and editing nodes in the Moore Machine Editor.
// Supports configuration of initial states, output characters, and state labels.
function MooreNodePrompt(func, cancelFunc, nostr) {
    var nodeFunction = func;
    var cancelFunction = cancelFunc;
    var emptystr = nostr;
    // Prompt box needs a reference to the function to run upon clicking "OK".
    // Prompt box also needs a reference to a function to run upon clicking "Cancel". Reason why: In the Moore Machine Editor, upon creating a new node, this prompt is immediately called to configure the node. If the user clicks "Cancel", a function must be run to remove this newly created node from the graph.
    // Prompt box also needs a reference to which empty string representation is being used (lambda or epsilon).

    // Render function is used to initialize the prompt box in the view.
    this.render = function(value, is, lab, outputChar) {
        renderBox();
        // Add content to the prompt box, with references to the functions to run within the buttons.
        document.getElementById('dialogueboxbody').innerHTML = 'Initial State:<input type="checkbox" id="initial_state">';
        document.getElementById('dialogueboxbody').innerHTML += '<br>Output Character: <input id="moore">';
        document.getElementById('dialogueboxbody').innerHTML += '<br>State Label: <input id="label">';
        document.getElementById('dialogueboxfoot').innerHTML = '<button onclick="ok()">OK</button> <button onclick="cancel()">Cancel</button>';
        // If there is no output character, it means this prompt is configuring a newly created node.
        if(!outputChar){
            // Update the prompt box to reflect this information.
            document.getElementById('dialogueboxhead').innerHTML = "Create Node <b>" + value + ":</b>";
        }
        // Otherwise, the prompt is editing a previously existing node.
        else {
            document.getElementById('dialogueboxhead').innerHTML = "Edit Node <b>" + value + ":</b>";
            // If the node being edited is currently the initial state, check the "Initial State" checkbox.
            if (is) {
                document.getElementById('initial_state').checked = true;
            }
            // Note that since this is a Moore Machine, there is no such thing as a final state.
            // If the node being edited has a state label, display this text in the "State Label" text field.
            if (lab) {
                document.getElementById('label').value = lab;
            }
            // If the output character of the state is not the empty string, display this text in the "Output Character" text field.
            // If it is the empty string, don't display anything in the "Output Character" text field.
            if (outputChar != emptystr) {
                document.getElementById('moore').value = outputChar;
            }
        }
        // Place the cursor in the output character text field by default.
        document.getElementById('moore').focus();
    }

    // Cancel changes, then exit out of the prompt box. Called upon clicking "Cancel".
    // If creating a new node, this cancel function removes the node from the graph.
    cancel = function() {
        cancelFunction();
        terminate();
    }

    // Update node on the graph. Called upon clicking "OK".
    ok = function() {
        // Check every field in the prompt box and update the node accordingly.
        var initial_state = document.getElementById('initial_state').checked;
        var node_label = document.getElementById('label').value;
        var output_char = document.getElementById('moore').value;
        // If the output character text field is empty, assign the empty string to the output character.
        if (output_char === "") {
            output_char = emptystr;
        }
        // Call the node function on these values, then exit out of the prompt box.
        nodeFunction(initial_state, node_label, output_char);
        terminate();
    }
}

// Custom prompt box for adding and editing edges in the Finite Automaton Editor and Moore Machine Editor.
function EdgePrompt(func, nostr) {
    var edgeFunction = func;
    var emptystr = nostr;
    // Prompt box needs a reference to the function to run upon clicking "Done". This could be the function to create a new edge or the function to edit an existing edge.
    // Prompt box also needs a reference to which empty string representation is being used (lambda or epsilon).

    // Render function is used to initialize the prompt box in the view.
    this.render = function(values) {
        renderBox();
        // Add content to the prompt box, with references to the functions to run within the buttons.
        document.getElementById('dialogueboxbody').innerHTML = 'Transition: <input class="newedge" id="transition"> <button onclick="deleteWeight(0)">Delete Transition</button>';
        document.getElementById('dialogueboxfoot').innerHTML = '<button onclick="addNewWeight()">Add New Transition</button> <button onclick="addEdge()">Done</button> <button onclick="terminate()">Cancel</button>';
        // If render function was passed an empty string, it means this prompt is creating a new edge.
        if (!values) {
            // Update the prompt box to reflect this information.
            document.getElementById('dialogueboxhead').innerHTML = "Create Edge:";
        }
        // Otherwise, the prompt is editing an existing edge.
        else {
            document.getElementById('dialogueboxhead').innerHTML = "Edit Edge:";
            // Add text fields for each transition on the edge weight.
            for (var i = 1; i < values.length; i++) {
                document.getElementById('dialogueboxbody').innerHTML += '<br>Transition: <input class="newedge"> <button onclick="deleteWeight(' + i + ')">Delete Transition</button>';
            }
            // Get a reference to each of these text fields (in the form of an array).
            var x = document.getElementById('dialogueboxbody').getElementsByClassName('newedge');
            // Add the edge weights to their corresponding text fields. If the edge weight is the empty string, display nothing in the text field.
            for (var j = 0; j < values.length; j++) {
                if (values[j] != emptystr) {
                    x[j].value = values[j];
                }
            }
        }
        document.getElementById('transition').focus();
        // The focus function places the cursor in the specified text box.
    }

    // Add (or update) the edge on the graph. Called upon clicking "Done".
    addEdge = function() {
        // Create an array of edge transitions from the text fields.
        var values = [];
        var x = document.getElementById('dialogueboxbody').getElementsByClassName('newedge');
        for (var j = 0; j < x.length; j++) {
            if (x[j].value === "") {
                // If a text field is empty, add the empty string to this array, but not more than once.
                if (values.indexOf(emptystr) == -1) {
                    values.push(emptystr);
                }
            }
            // The array may have no duplicate values, so only add a transition to the array if it isn't already there.
            else if (values.indexOf(x[j].value) == -1) {
                values.push(x[j].value);
            }
        }
        // The array should be joined into a single string with each distinct transition separated by line breaks.
        // Call the edge function (either create edge or update edge) on the edge label, then exit out of the prompt box.
        var edge_label = values.join("<br>");
        edgeFunction(edge_label);
        terminate();
    }

    // Add a new text field for another edge transition. Called upon clicking "Add New Transition".
    addNewWeight = function() {
        // Back up all of the text already in text fields to an array.
        var values = [];
        var x = document.getElementById('dialogueboxbody').getElementsByClassName('newedge');
        for (var j = 0; j < x.length; j++) {
            values.push(x[j].value);
        }
        // Add another text field to the prompt box. Note that this clears all text in any existing text fields (hence why that text was backed up to an array).
        document.getElementById('dialogueboxbody').innerHTML += '<br>Transition: <input class="newedge"> <button onclick="deleteWeight(' + values.length + ')">Delete Transition</button>';
        // Get another reference to the text fields and add the strings in the backup array.
        x = document.getElementById('dialogueboxbody').getElementsByClassName('newedge');
        for (var k = 0; k < values.length; k++) {
            x[k].value = values[k];
        }
        // Place the cursor in the last text field by default.
        x[x.length - 1].focus();
    }

    // Delete an existing text field. Called upon clicking the "Delete Transition" button next to the text field the user wishes to delete.
    deleteWeight = function(edge) {
        // Back up all of the text already in text fields to an array, EXCEPT the text the user wishes to delete.
        var values = [];
        var x = document.getElementById('dialogueboxbody').getElementsByClassName('newedge');
        for (var i = 0; i < x.length; i++) {
            if (i != edge) {
                values.push(x[i].value);
            }
        }
        // Completely rewrite all of the text fields in the prompt box (thus clearing the text data within).
        // There must always be at least one text field in the prompt box, so add this first.
        document.getElementById('dialogueboxbody').innerHTML = 'Transition: <input class="newedge" id="transition"> <button onclick="deleteWeight(0)">Delete Transition</button>';
        // For every remaining, undeleted text field, add it to the prompt box.
        for (var j = 1; j < values.length; j++) {
            document.getElementById('dialogueboxbody').innerHTML += '<br>Transition: <input class="newedge"> <button onclick="deleteWeight(' + j + ')">Delete Transition</button>';
        }
        // Get another reference to the text fields and add the strings in the backup array.
        x = document.getElementById('dialogueboxbody').getElementsByClassName('newedge');
        for (var k = 0; k < values.length; k++) {
            x[k].value = values[k];
        }
        // Place the cursor in the last text field by default.
        x[x.length - 1].focus();
    }
}

// Custom prompt box for adding and editing edges in the Mealy Machine Editor.
function MealyEdgePrompt(func, nostr) {
    var edgeFunction = func;
    var emptystr = nostr;
    // Prompt box needs a reference to the function to run upon clicking "Done". This could be the function to create a new edge or the function to edit an existing edge.
    // Prompt box also needs a reference to which empty string representation is being used (lambda or epsilon).

    // Render function is used to initialize the prompt box in the view.
    this.render = function(values) {
        renderBox();
        // Add content to the prompt box, with references to the functions to run within the buttons.
        document.getElementById('dialogueboxbody').innerHTML = 'Input Character: <input class="newedgein" id="transition"> <br>Output Character: <input class="newedgeout"> <br><button onclick="deleteWeight(0)">Delete Transition</button>';
        document.getElementById('dialogueboxfoot').innerHTML = '<button onclick="addNewWeight()">Add New Transition</button> <button onclick="addEdge()">Done</button> <button onclick="terminate()">Cancel</button>';
        // If render function was passed an empty string, it means this prompt is creating a new edge.
        if (!values) {
            // Update the prompt box to reflect this information.
            document.getElementById('dialogueboxhead').innerHTML = "Create Edge:";
        }
        // Otherwise, the prompt is editing an existing edge.
        else {
            document.getElementById('dialogueboxhead').innerHTML = "Edit Edge:";
            // Add text fields for each transition on the edge weight.
            for (var i = 1; i < values.length; i++) {
                document.getElementById('dialogueboxbody').innerHTML += '<br><br>Input Character: <input class="newedgein"> <br>Output Character: <input class="newedgeout"> <br><button onclick="deleteWeight(' + i + ')">Delete Transition</button>';
            }
            // Get a reference to each of these text fields (in the form of two arrays - one for input character text fields, one for output character text fields).
            var x = document.getElementById('dialogueboxbody').getElementsByClassName('newedgein');
            var y = document.getElementById('dialogueboxbody').getElementsByClassName('newedgeout');
            // Iterate over each pair of text fields and place the input and output characters in them.
            for (var j = 0; j < values.length; j++) {
                symbols = values[j].split(":");
                // Note that if either the input or output character is the empty string, nothing is displayed in the corresponding text field.
                if (symbols[0] != emptystr) {
                    x[j].value = symbols[0];
                }
                if (symbols[1] != emptystr) {
                    y[j].value = symbols[1];
                }
            }
        }
        document.getElementById('transition').focus();
        // The focus function places the cursor in the specified text box (the first input character field, in this case).
    }

    // Add (or update) the edge on the graph. Called upon clicking "Done".
    addEdge = function() {
        // Create an array of edge transitions from the text fields.
        // This is more complicated for Mealy Machines, since the input symbols and output symbols need to be paired up.
        var joinedValues = [];
        var noDuplicates = [];
        var x = document.getElementById('dialogueboxbody').getElementsByClassName('newedgein');
        var y = document.getElementById('dialogueboxbody').getElementsByClassName('newedgeout');
        // First, loop over each pair of text fields and join them with a colon. Don't worry about duplicate edge weights yet.
        for (var j = 0; j < x.length; j++) {
            var inValue;
            var outValue;
            // Record whatever text is in the text field. If the field is empty, record the empty string.
            // Do this separately for the input symbol and the output symbol.
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
            // Join the input and output symbols with a colon and push it into the array.
            joinedValues.push(inValue + ":" + outValue);
        }
        // Loop over the created array of edge weights and selectively add them to another array, removing all duplicates.
        for (var k = 0; k < joinedValues.length; k++) {
            // If a given edge weight is already in the array, don't push it.
            if (noDuplicates.indexOf(joinedValues[k]) == -1) {
                noDuplicates.push(joinedValues[k]);
            }
        }
        // The array should be joined into a single string with each distinct transition separated by line breaks.
        // Call the edge function (either create edge or update edge) on the edge label, then exit out of the prompt box.
        var edge_label = noDuplicates.join("<br>");
        edgeFunction(edge_label);
        terminate();
    }

    // Add a new pair of text fields for another edge transition. Called upon clicking "Add New Transition".
    addNewWeight = function() {
        // Back up all of the text already in text fields to two arrays - one for input symbols, one for output symbols.
        var inValues = [];
        var outValues = [];
        var x = document.getElementById('dialogueboxbody').getElementsByClassName('newedgein');
        var y = document.getElementById('dialogueboxbody').getElementsByClassName('newedgeout');
        for (var j = 0; j < x.length; j++) {
            inValues.push(x[j].value);
            outValues.push(y[j].value);
        }
        // Add another pair of text fields to the prompt box. Note that this clears all text in any existing text fields (hence why that text was backed up).
        document.getElementById('dialogueboxbody').innerHTML += '<br><br>Input Character: <input class="newedgein"> <br>Output Character: <input class="newedgeout"> <br><button onclick="deleteWeight(' + inValues.length + ')">Delete Transition</button>';
        // Get new references to the text fields and add the strings in the backup arrays.
        x = document.getElementById('dialogueboxbody').getElementsByClassName('newedgein');
        y = document.getElementById('dialogueboxbody').getElementsByClassName('newedgeout');
        for (var k = 0; k < inValues.length; k++) {
            x[k].value = inValues[k];
            y[k].value = outValues[k];
        }
        // Place the cursor in the last input symbol text field by default.
        x[x.length - 1].focus();
    }

    // Delete an existing pair of text fields. Called upon clicking the "Delete Transition" button below the text fields the user wishes to delete.
    deleteWeight = function(edge) {
        // Back up all of the text already in text fields to two arrays, EXCEPT the text the user wishes to delete.
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
        // Completely rewrite all of the text fields in the prompt box (thus clearing the text data within).
        // There must always be at least one pair text fields in the prompt box, so add this first.
        document.getElementById('dialogueboxbody').innerHTML = 'Input Character: <input class="newedgein" id="transition"> <br>Output Character: <input class="newedgeout"> <br><button onclick="deleteWeight(0)">Delete Transition</button>';
        // For every remaining, undeleted pair of text fields, add them to the prompt box.
        for (var j = 1; j < inValues.length; j++) {
            document.getElementById('dialogueboxbody').innerHTML += '<br><br>Input Character: <input class="newedgein"> <br>Output Character: <input class="newedgeout"> <br><button onclick="deleteWeight(' + j + ')">Delete Transition</button>';
        }
        // Get new references to the text fields and add the strings in the backup arrays.
        x = document.getElementById('dialogueboxbody').getElementsByClassName('newedgein');
        y = document.getElementById('dialogueboxbody').getElementsByClassName('newedgeout');
        for (var k = 0; k < inValues.length; k++) {
            x[k].value = inValues[k];
            y[k].value = outValues[k];
        }
        // Place the cursor in the last input symbol text field by default.
        x[x.length - 1].focus();
    }
}