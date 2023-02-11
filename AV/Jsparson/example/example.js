$(document).ready(function () {
    "use strict";
    var initial = 'def is_true(boolean_value):\n' +
    '  if boolean_value:\n' +
    '    return True\n' +
    '  return False\n' +
    '  return true #distractor\n'

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
            alert("All correct!");
        } 
        if (fb.errors.length > 0) {
            alert(fb.errors[0]);
        }
    }

    parson.init(initial);
    parson.shuffleLines();
    $("#newInstanceLink").click(function (event) {
        event.preventDefault();
        parson.shuffleLines();
    });
    $("#feedbackLink").click(function (event) {
        var initData = {};
        console.log(parson.studentCode());
        initData.user_code = parson.studentCode();
        ODSA.AV.logExerciseInit(initData);
        event.preventDefault();
        parson.getFeedback();
    });
});