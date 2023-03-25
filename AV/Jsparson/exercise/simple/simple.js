$(document).ready(function () {
    "use strict";
<<<<<<<< Updated upstream:AV/Jsparson/Jsparson.js
    const index = window.location.pathname.split('/').pop().split('.')[0];
    //var frames = PIFRAMES.init("Jsparson");
========
    var index = window.location.pathname.split('/').pop().split('.')[0];
>>>>>>>> Stashed changes:AV/Jsparson/exercise/simple/simple.js
    
    var parson = new ParsonsWidget({
        'sortableId': 'sortable',
        'trashId': 'sortableTrash',
        'max_wrong_lines': 0,
        'feedback_cb' : displayErrors
    });
    var noCredit = true;

    function displayErrors(fb) {
        if (fb.errors.length === 0 && noCredit) {
            noCredit = false;
            ODSA.AV.awardCompletionCredit();
        } 
        if (fb.errors.length > 0) {
            alert(fb.errors[0]);
        }
    }

<<<<<<<< Updated upstream:AV/Jsparson/Jsparson.js
    $.getJSON("../Jsparson.json", function(data) {
        var initial = data[String(index)].initial
========
    $.getJSON("./simple.json", function(data) {
        var initial = data[index].initial
        document.getElementById("description").innerHTML = data[index].description
        document.getElementById("instructions").innerHTML = data[index].instructions
>>>>>>>> Stashed changes:AV/Jsparson/exercise/simple/simple.js
        parson.init(initial);
        parson.shuffleLines();
    });

    $("#newInstanceLink").click(function (event) {
        event.preventDefault()
        parson.shuffleLines()
    });

    $("#feedbackLink").click(function (event) {
        var initData = {}
        console.log(parson.studentCode())
        initData.user_code = parson.studentCode()
        ODSA.AV.logExerciseInit(initData)
        event.preventDefault()
        parson.getFeedback()
    });
<<<<<<<< Updated upstream:AV/Jsparson/Jsparson.js
    
    $('#saveProgressLink').click(function() {
        const state = parson.getState({index: index})
========
    $('#saveProgressLink').click(function() {
        const state = parson.getState({index: index})
        console.log(state)
>>>>>>>> Stashed changes:AV/Jsparson/exercise/simple/simple.js
        $.ajax({
            url: '/saveProgress',
            type: 'POST',
            async: false,
            data: JSON.stringify(state),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
                console.log(data)
            }
        })
    });
});

