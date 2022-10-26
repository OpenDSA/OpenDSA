// This is a small amount of JavaScript included in the head area

// The scripts for the TSUGI runtime

// Make sure console.log does not fail.
if(typeof console === "undefined") { var console = { log: function (logMsg) { } }; }

function dataToggle(divName) {
    var ele = document.getElementById(divName);
    if(ele.style.display == "block") {
        ele.style.display = "none";
    }
    else {
        ele.style.display = "block";
    }
}

// https://gist.github.com/flesch/315070
function sprintf(){
    var args = Array.prototype.slice.call(arguments);
    return args.shift().replace(/%s/g, function(){
        return args.shift();
    });
}

// http://stackoverflow.com/questions/326069/how-to-identify-if-a-webpage-is-being-loaded-inside-an-iframe-or-directly-into-t
function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

// https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript/51241694
function isObject(inp) {
    return typeof inp == 'object' && inp != null && ! Array.isArray(inp);
}

