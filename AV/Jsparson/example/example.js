var initial = 'def is_true(boolean_value):\n' +
    '  if boolean_value:\n' +
    '    return True\n' +
    '  return False\n' +
    '  return true #distractor\n'

function displayErrors(fb) {
    if (fb.errors.length > 0) {
        alert(fb.errors[0]);
    }
}

$(document).ready(function () {
    "use strict";
    var parson = new ParsonsWidget({
        'sortableId': 'sortable',
        'trashId': 'sortableTrash',
        'max_wrong_lines': 1,
        'feedback_cb': displayErrors
    });
    parson.init(initial);
    parson.shuffleLines();
    $("#newInstanceLink").click(function (event) {
        event.preventDefault();
        parson.shuffleLines();
    });
    $("#feedbackLink").click(function (event) {
        event.preventDefault();
        parson.getFeedback();
    });
});