$(document).ready(function () {
    "use strict";
    const index = window.location.pathname.split('/').pop().split('.')[0];
    //var frames = PIFRAMES.init("Jsparson");
    
    var parson = new ParsonsWidget({
        'sortableId': 'sortable',
        'trashId': 'sortableTrash',
        'max_wrong_lines': 1,
        'feedback_cb': displayErrors
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

    $.getJSON("../Jsparson.json", function(data) {
        var initial = data[String(index)].initial
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
    
    $('#saveProgressLink').click(function() {
        const state = parson.getState({index: index})
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

