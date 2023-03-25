$(document).ready(function () {
    "use strict";
    var index = window.location.pathname.split('/').pop().split('.')[0];
    
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

    $.getJSON("simple.json", function(data) {
        var initial = data[index].initial
        document.getElementById("description").innerHTML = data[index].description
        document.getElementById("instructions").innerHTML = data[index].instructions
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
});

