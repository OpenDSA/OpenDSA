var inputIsRegex = true;

function generateAutomaton(fsmType) {
    automaton = noam.fsm.createRandomFsm(fsmType, 4, 3, 3);
    $("#fsm").val(noam.fsm.serializeFsmToString(automaton));
    $("#fsm").scrollTop(0);
    $("#fsm").focus();
    onRegexOrAutomatonChange();
}
$("#generateDFA").click(function() {
    "use strict";
    generateAutomaton(noam.fsm.dfaType);
});

function onRegexOrAutomatonChange() {
    $("#automatonGraph").html("");

    $("#createAutomaton").attr("disabled", true);
    $("#inputError").hide();

    if (inputIsRegex) {
        validateRegex();
    } else {
        validateFsm();
    }
}

function validateFsm() {
    var fsm = $("#fsm").val();

    if (fsm.length === 0) {
        $("#fsm").parent().removeClass("success error");
        $("#fsmError").hide();
    } else {
        try {
            noam.fsm.parseFsmFromString(fsm);
            $("#fsm").parent().removeClass("error");
            $("#fsm").parent().addClass("success");
            $("#createAutomaton").attr("disabled", false);
            $("#fsmError").hide();
        } catch (e) {
            $("#fsm").parent().removeClass("success");
            $("#fsm").parent().addClass("error");
            $("#fsmError").text("Error: " + e.message);
            $("#fsmError").show();
        }
    }
}

function validateRegex() {
    var regex = $("#regex").val();

    if (regex.length === 0) {
        $("#regex").parent().removeClass("success error");
        $("#fsmError").hide();
    } else {
        try {
            noam.re.string.toTree(regex);
            $("#regex").parent().removeClass("error");
            $("#regex").parent().addClass("success");
            $("#createAutomaton").attr("disabled", false);
            $("#fsmError").hide();
        } catch (e) {
            $("#regex").parent().removeClass("success");
            $("#regex").parent().addClass("error");
            $("#fsmError").text("Error: " + e.message);
            $("#fsmError").show();
        }
    }
}
