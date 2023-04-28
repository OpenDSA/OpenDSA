$(document).ready(function () {
    "use strict";
    var index = window.location.pathname.split('/').pop().split('.')[0];
    
    var parson = new ParsonsWidget({
        'sortableId': 'sortable',
        'trashId': 'sortableTrash',
        'max_wrong_lines': 0,
        'feedback_cb' : displayErrors
    });
    var noCredit = true

    function displayErrors(fb) {
        if (fb.errors.length === 0 && noCredit) {
            noCredit = false
            ODSA.AV.awardCompletionCredit()
        } 
        if (fb.errors.length > 0) {
            alert(fb.errors[0])
        }
    }
    var indents = [2, 1]
    var trash = [0]
    var sorted = [2, 1]
    var trace = [{
        "input": "0_0-2_0",
        "output": "1_0"
    },
    {   
        "input": "0_0",
        "output": "2_1-1_0"
    },
    {
        "input": "0_0",
        "output": "2_2-1_0"
    },
    {
        "input": "0_0",
        "output": "1_1-2_2"
    },
    {
        "input": "-",
        "output": "0_1-2_2-1_0"
    }]
    var parsedTrace;

    $.getJSON("simple.json", function(data) {
        var initial = data[index].initial
        document.getElementById("title").innerHTML = data[index].title
        document.getElementById("instructions").innerHTML = data[index].instructions
        parson.init(initial)
        //parson.loadProgress()
        parson.shuffleLines();
        parsedTrace = parson.parseTrace(trace)
    });

    $("#newInstanceLink").click(function (event) {
        event.preventDefault()
        parson.shuffleLines()
    });
    $("#feedbackLink").click(function (event) {
        var initData = {}
        initData.user_code = parson.studentCode()
        ODSA.AV.logExerciseInit(initData)
        event.preventDefault()
        parson.getFeedback()
    });
    $('#loadProgressLink').click(function() {
        parson.loadProgress(sorted, trash, indents)
        // const state = parson.getState({index: index})
        // console.log(state)
        // $.ajax({
        //     url: '/saveProgress',
        //     type: 'POST',
        //     async: false,
        //     data: JSON.stringify(state),
        //     contentType: 'application/json; charset=utf-8',
        //     dataType: 'json',
        //     xhrFields: {
        //         withCredentials: true
        //     },
        //     success: function(data) {
        //         console.log(data)
        //     }
        // })
    });
    $("#prev").click(function () {
        parson.prevAction(parsedTrace)
    });
    $("#next").click(function () {
        parson.nextAction(parsedTrace)
    })
});

