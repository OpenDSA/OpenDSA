window._3rd_party_test_step1_loaded = function() {
    // At this point, a third-party domain has now attempted to set a cookie (if all went to plan!)
    var step2Url = 'https://lti.cs.vt.edu/2',
        resultsEl = document.getElementById('3rd_party_cookie_test_results'),
        step2El = document.createElement('script');

    // Update loading / results message
    resultsEl.innerHTML = 'Stage one complete, loading stage 2&hellip;';
    // And load the second part of the test (reading the cookie)
    step2El.setAttribute('src', step2Url);
    resultsEl.appendChild(step2El);
}

window._3rd_party_test_step2_loaded = function(cookieSuccess) {
    var resultsEl = document.getElementById('3rd_party_cookie_test_results'),
        errorEl = document.getElementById('3rd_party_cookie_test_error'),
        instructionEl = document.getElementById('instructions'),
        enabledMsg = 'Good news! We have detected that you have third-party cookies enabled for OpenDSA-LTI.',
        disabledMsg = 'We have detected that you have third-party cookies disabled.';

    // Show message
    resultsEl.innerHTML = (cookieSuccess ? enabledMsg : disabledMsg);

    // Done, so remove loading class
    resultsEl.className = resultsEl.className.replace(/\bloading\b/, (cookieSuccess ? 'enabled' : 'disabled'));
    instructionEl.className = (cookieSuccess ? 'hidden' : 'shown');
    // And remove error message
    errorEl.className = 'hidden';
}