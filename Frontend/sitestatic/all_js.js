function addCommas(a) {
a += "";
var b = a.split("."), c = b[0], d = b.length > 1 ? "." + b[1] : "", e = /(\d+)(\d{3})/;
while (e.test(c)) c = c.replace(e, "$1,$2");
return c + d;
}

function validateEmail(a) {
var b = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return a.match(b);
}

function addAutocompleteMatchToList(a, b, c, d) {
var e = {
label: c == "exercise" ? b.display_name : b.title,
title: c == "exercise" ? b.display_name : b.title,
value: b.relative_url || b.ka_url,
key: b.key,
kind: c
};
d && (e.label = e.label.replace(d, "<b>$1</b>")), a[a.length] = e;
}

function initAutocomplete(a, b, c, d) {
var e = $(a).autocomplete({
delay: 150,
source: function(a, c) {
var d = $.trim(a.term);
if (!d) {
c([]);
return;
}
$.getJSON("/api/v1/autocomplete", {
q: d
}, function(a) {
var d = [];
if (a != null) {
var e = null;
try {
e = new RegExp("(" + a.query + ")", "i");
} catch (f) {
e = null;
}
if (b) for (var g = 0; g < a.topics.length; g++) addAutocompleteMatchToList(d, a.topics[g], "topic", e);
for (var g = 0; g < a.videos.length; g++) addAutocompleteMatchToList(d, a.videos[g], "video", e);
for (var g = 0; g < a.exercises.length; g++) addAutocompleteMatchToList(d, a.exercises[g], "exercise", e);
}
c(d);
});
},
focus: function() {
return !1;
},
select: function(a, b) {
return c ? c(b.item) : window.location = b.item.value, !1;
},
open: function(a, b) {
var c = $(e.data("autocomplete").menu.element), d = $(this), f = c.offset().right + c.outerWidth(), g = d.offset().right + d.outerWidth();
f > g && c.offset({
right: g - c.outerWidth(),
top: c.offset().top
});
}
}).bind("keydown.autocomplete", function(a) {
if (!d && a.keyCode == $.ui.keyCode.ENTER || a.keyCode == $.ui.keyCode.NUMPAD_ENTER) e.data("autocomplete").selectedItem || $(this.form).submit();
});
e.data("autocomplete")._renderItem = function(a, b) {
var c = $("<a></a>").html(b.label);
return b.kind == "topic" ? c.prepend("<span class='autocomplete-topic'>Topic </span>") : b.kind == "video" ? c.prepend("<span class='autocomplete-video'>Video </span>") : b.kind == "exercise" && c.prepend("<span class='autocomplete-exercise'>Exercise </span>"), $("<li></li>").data("item.autocomplete", b).append(c).appendTo(a);
}, e.data("autocomplete").menu.select = function(a) {
this._trigger("selected", a, {
item: this.active
});
};
}

function createCookie(a, b, c) {
var d;
if (c) {
var e = new Date;
e.setTime(e.getTime() + c * 24 * 60 * 60 * 1e3), d = "; expires=" + e.toGMTString();
} else d = "";
document.cookie = a + "=" + b + d + "; path=/";
}

function readCookie(a) {
var b = a + "=", c = document.cookie.split(";");
for (var d = 0; d < c.length; d++) {
var e = c[d];
while (e.charAt(0) == " ") e = e.substring(1, e.length);
if (e.indexOf(b) === 0) return e.substring(b.length, e.length);
}
return null;
}

function eraseCookie(a) {
createCookie(a, "", -1);
}

function areCookiesEnabled() {
return createCookie("detectCookiesEnabled", "KhanAcademy", 1), readCookie("detectCookiesEnabled") == null ? !1 : (eraseCookie("detectCookiesEnabled"), !0);
}

function onYouTubePlayerStateChange(a) {
VideoStats.playerStateChange(a);
}

function onYouTubePlayerReady(a) {
var b = $(".mirosubs-widget object").get(0);
if (!b || !b.playVideo) b = document.getElementById("idPlayer");
if (!b || !b.playVideo) b = document.getElementById("idOVideo");
if (!b || !b.playVideo) throw new Error("YouTube player not found");
(window.unisubs_readyAPIIDs = window.unisubs_readyAPIIDs || []).push(a == "undefined" || !a ? "" : a), VideoControls.player = b, VideoStats.player = b, $(VideoControls).trigger("playerready"), $(VideoStats).trigger("playerready");
}

function temporaryDetachElement(a, b, c) {
var d, e;
d = a.next(), d.length > 0 ? e = function() {
a.insertBefore(d);
} : (d = a.parent(), e = function() {
a.appendTo(d);
}), a.detach();
var f = b.call(c || this, a);
return e(), f;
}

function dynamicPackage(a, b, c) {
var d = this;
this.files = [], this.progress = 0, this.last_progress = 0, dynamicPackageLoader.loadingPackages[a] = this, _.each(c, function(a) {
var c = {
filename: a,
content: null,
evaled: !1
};
d.files.push(c), $.ajax({
type: "GET",
url: a,
data: null,
success: function(e) {
KAConsole.log("Received contents of " + a), c.content = e, d.progress++, b("progress", d.progress / (2 * d.files.length)), d.last_progress = d.progress;
},
error: function(a, c, d) {
b("failed");
},
dataType: "html"
});
}), this.checkComplete = function() {
var c = !1;
_.each(this.files, function(a) {
if (!a.content) return c = !0, _.breaker;
if (!a.evaled) {
var b = document.createElement("script");
a.filename.indexOf(".handlebars") > 0 ? b.type = "text/x-handlebars-template" : b.type = "text/javascript", b.text = a.content;
var e = document.getElementsByTagName("head")[0] || document.documentElement;
e.appendChild(b), a.evaled = !0, KAConsole.log("Evaled contents of " + a.filename), d.progress++;
}
}), c ? (d.progress != d.last_progress && (b("progress", d.progress / (2 * d.files.length)), d.last_progress = d.progress), setTimeout(function() {
d.checkComplete();
}, 500)) : (dynamicPackageLoader.loadedPackages[a] = !0, delete dynamicPackageLoader.loadingPackages[a], b("complete"));
}, this.checkComplete();
}

function apiVersionMismatch() {
Notifications.showTemplate("shared.api-version-mismatch");
}

function finishLoadingMapsPackage() {
KAConsole.log("Loaded Google Maps."), dynamicLoadPackage_maps(function(a, b) {
a == "complete" ? KAConsole.log("Loaded maps package.") : a == "failed" ? (KAConsole.log("Failed to load maps package."), setTimeout(finishLoadingMapsPackage, 5e3)) : a == "progress" && (KAConsole.log("Maps package " + (b * 100).toFixed(0) + "% loaded."), newCustomGoalDialog && newCustomGoalDialog.$(".progress-bar").progressbar("value", b * 100));
});
}

(function(a, b) {
function h(a) {
var b = g[a] = {}, c, d;
a = a.split(/\s+/);
for (c = 0, d = a.length; c < d; c++) b[a[c]] = !0;
return b;
}
function l(a, c, d) {
if (d === b && a.nodeType === 1) {
var e = "data-" + c.replace(k, "-$1").toLowerCase();
d = a.getAttribute(e);
if (typeof d == "string") {
try {
d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? parseFloat(d) : j.test(d) ? f.parseJSON(d) : d;
} catch (g) {}
f.data(a, c, d);
} else d = b;
}
return d;
}
function m(a) {
for (var b in a) {
if (b === "data" && f.isEmptyObject(a[b])) continue;
if (b !== "toJSON") return !1;
}
return !0;
}
function n(a, b, c) {
var d = b + "defer", e = b + "queue", g = b + "mark", h = f._data(a, d);
h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function() {
!f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire());
}, 0);
}
function J() {
return !1;
}
function K() {
return !0;
}
function S(a) {
return !a || !a.parentNode || a.parentNode.nodeType === 11;
}
function T(a, b, c) {
b = b || 0;
if (f.isFunction(b)) return f.grep(a, function(a, d) {
var e = !!b.call(a, d, a);
return e === c;
});
if (b.nodeType) return f.grep(a, function(a, d) {
return a === b === c;
});
if (typeof b == "string") {
var d = f.grep(a, function(a) {
return a.nodeType === 1;
});
if (O.test(b)) return f.filter(b, d, !c);
b = f.filter(b, d);
}
return f.grep(a, function(a, d) {
return f.inArray(a, b) >= 0 === c;
});
}
function U(a) {
var b = V.split("|"), c = a.createDocumentFragment();
if (c.createElement) while (b.length) c.createElement(b.pop());
return c;
}
function bi(a, b) {
return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a;
}
function bj(a, b) {
if (b.nodeType !== 1 || !f.hasData(a)) return;
var c, d, e, g = f._data(a), h = f._data(b, g), i = g.events;
if (i) {
delete h.handle, h.events = {};
for (c in i) for (d = 0, e = i[c].length; d < e; d++) f.event.add(b, c + (i[c][d].namespace ? "." : "") + i[c][d].namespace, i[c][d], i[c][d].data);
}
h.data && (h.data = f.extend({}, h.data));
}
function bk(a, b) {
var c;
if (b.nodeType !== 1) return;
b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase();
if (c === "object") b.outerHTML = a.outerHTML; else if (c !== "input" || a.type !== "checkbox" && a.type !== "radio") {
if (c === "option") b.selected = a.defaultSelected; else if (c === "input" || c === "textarea") b.defaultValue = a.defaultValue;
} else a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value);
b.removeAttribute(f.expando);
}
function bl(a) {
return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : [];
}
function bm(a) {
if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked;
}
function bn(a) {
var b = (a.nodeName || "").toLowerCase();
b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm);
}
function bo(a) {
var b = c.createElement("div");
return bh.appendChild(b), b.innerHTML = a.outerHTML, b.firstChild;
}
function bp(a, b) {
b.src ? f.ajax({
url: b.src,
async: !1,
dataType: "script"
}) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b);
}
function bC(a, b, c) {
var d = b === "width" ? a.offsetWidth : a.offsetHeight, e = b === "width" ? bx : by, g = 0, h = e.length;
if (d > 0) {
if (c !== "border") for (; g < h; g++) c || (d -= parseFloat(f.css(a, "padding" + e[g])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + e[g])) || 0 : d -= parseFloat(f.css(a, "border" + e[g] + "Width")) || 0;
return d + "px";
}
d = bz(a, b, b);
if (d < 0 || d == null) d = a.style[b] || 0;
d = parseFloat(d) || 0;
if (c) for (; g < h; g++) d += parseFloat(f.css(a, "padding" + e[g])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + e[g] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + e[g])) || 0);
return d + "px";
}
function bZ(a) {
return function(b, c) {
typeof b != "string" && (c = b, b = "*");
if (f.isFunction(c)) {
var d = b.toLowerCase().split(bP), e = 0, g = d.length, h, i, j;
for (; e < g; e++) h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c);
}
};
}
function b$(a, c, d, e, f, g) {
f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
var h = a[f], i = 0, j = h ? h.length : 0, k = a === bT, l;
for (; i < j && (k || !l); i++) l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = b$(a, c, d, e, l, g)));
return (k || !l) && !g["*"] && (l = b$(a, c, d, e, "*", g)), l;
}
function b_(a, c) {
var d, e, g = f.ajaxSettings.flatOptions || {};
for (d in c) c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
e && f.extend(!0, a, e);
}
function ca(a, b, c, d) {
if (f.isArray(b)) f.each(b, function(b, e) {
c || bE.test(a) ? d(a, e) : ca(a + "[" + (typeof e == "object" || f.isArray(e) ? b : "") + "]", e, c, d);
}); else if (!c && b != null && typeof b == "object") for (var e in b) ca(a + "[" + e + "]", b[e], c, d); else d(a, b);
}
function cb(a, c, d) {
var e = a.contents, f = a.dataTypes, g = a.responseFields, h, i, j, k;
for (i in g) i in d && (c[g[i]] = d[i]);
while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
if (h) for (i in e) if (e[i] && e[i].test(h)) {
f.unshift(i);
break;
}
if (f[0] in d) j = f[0]; else {
for (i in d) {
if (!f[0] || a.converters[i + " " + f[0]]) {
j = i;
break;
}
k || (k = i);
}
j = j || k;
}
if (j) return j !== f[0] && f.unshift(j), d[j];
}
function cc(a, c) {
a.dataFilter && (c = a.dataFilter(c, a.dataType));
var d = a.dataTypes, e = {}, g, h, i = d.length, j, k = d[0], l, m, n, o, p;
for (g = 1; g < i; g++) {
if (g === 1) for (h in a.converters) typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
l = k, k = d[g];
if (k === "*") k = l; else if (l !== "*" && l !== k) {
m = l + " " + k, n = e[m] || e["* " + k];
if (!n) {
p = b;
for (o in e) {
j = o.split(" ");
if (j[0] === l || j[0] === "*") {
p = e[j[1] + " " + k];
if (p) {
o = e[o], o === !0 ? n = p : p === !0 && (n = o);
break;
}
}
}
}
!n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)));
}
}
return c;
}
function ci() {
try {
return new a.XMLHttpRequest;
} catch (b) {}
}
function cj() {
try {
return new a.ActiveXObject("Microsoft.XMLHTTP");
} catch (b) {}
}
function cs() {
return setTimeout(ct, 0), cr = f.now();
}
function ct() {
cr = b;
}
function cu(a, b) {
var c = {};
return f.each(cq.concat.apply([], cq.slice(0, b)), function() {
c[this] = a;
}), c;
}
function cv(a) {
if (!ck[a]) {
var b = c.body, d = f("<" + a + ">").appendTo(b), e = d.css("display");
d.remove();
if (e === "none" || e === "") {
cl || (cl = c.createElement("iframe"), cl.frameBorder = cl.width = cl.height = 0), b.appendChild(cl);
if (!cm || !cl.createElement) cm = (cl.contentWindow || cl.contentDocument).document, cm.write((c.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>"), cm.close();
d = cm.createElement(a), cm.body.appendChild(d), e = f.css(d, "display"), b.removeChild(cl);
}
ck[a] = e;
}
return ck[a];
}
function cy(a) {
return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1;
}
var c = a.document, d = a.navigator, e = a.location, f = function() {
function J() {
if (e.isReady) return;
try {
c.documentElement.doScroll("left");
} catch (a) {
setTimeout(J, 1);
return;
}
e.ready();
}
var e = function(a, b) {
return new e.fn.init(a, b, h);
}, f = a.jQuery, g = a.$, h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, j = /\S/, k = /^\s+/, l = /\s+$/, m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, n = /^[\],:{}\s]*$/, o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, q = /(?:^|:|,)(?:\s*\[)+/g, r = /(webkit)[ \/]([\w.]+)/, s = /(opera)(?:.*version)?[ \/]([\w.]+)/, t = /(msie) ([\w.]+)/, u = /(mozilla)(?:.*? rv:([\w.]+))?/, v = /-([a-z]|[0-9])/ig, w = /^-ms-/, x = function(a, b) {
return (b + "").toUpperCase();
}, y = d.userAgent, z, A, B, C = Object.prototype.toString, D = Object.prototype.hasOwnProperty, E = Array.prototype.push, F = Array.prototype.slice, G = String.prototype.trim, H = Array.prototype.indexOf, I = {};
return e.fn = e.prototype = {
constructor: e,
init: function(a, d, f) {
var g, h, j, k;
if (!a) return this;
if (a.nodeType) return this.context = this[0] = a, this.length = 1, this;
if (a === "body" && !d && c.body) return this.context = c, this[0] = c.body, this.selector = a, this.length = 1, this;
if (typeof a == "string") {
a.charAt(0) === "<" && a.charAt(a.length - 1) === ">" && a.length >= 3 ? g = [ null, a, null ] : g = i.exec(a);
if (g && (g[1] || !d)) {
if (g[1]) return d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [ c.createElement(j[1]) ], e.fn.attr.call(a, d, !0)) : a = [ k.createElement(j[1]) ] : (j = e.buildFragment([ g[1] ], [ k ]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes), e.merge(this, a);
h = c.getElementById(g[2]);
if (h && h.parentNode) {
if (h.id !== g[2]) return f.find(a);
this.length = 1, this[0] = h;
}
return this.context = c, this.selector = a, this;
}
return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a);
}
return e.isFunction(a) ? f.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), e.makeArray(a, this));
},
selector: "",
jquery: "1.7.1",
length: 0,
size: function() {
return this.length;
},
toArray: function() {
return F.call(this, 0);
},
get: function(a) {
return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a];
},
pushStack: function(a, b, c) {
var d = this.constructor();
return e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")"), d;
},
each: function(a, b) {
return e.each(this, a, b);
},
ready: function(a) {
return e.bindReady(), A.add(a), this;
},
eq: function(a) {
return a = +a, a === -1 ? this.slice(a) : this.slice(a, a + 1);
},
first: function() {
return this.eq(0);
},
last: function() {
return this.eq(-1);
},
slice: function() {
return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","));
},
map: function(a) {
return this.pushStack(e.map(this, function(b, c) {
return a.call(b, c, b);
}));
},
end: function() {
return this.prevObject || this.constructor(null);
},
push: E,
sort: [].sort,
splice: [].splice
}, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function() {
var a, c, d, f, g, h, i = arguments[0] || {}, j = 1, k = arguments.length, l = !1;
typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
for (; j < k; j++) if ((a = arguments[j]) != null) for (c in a) {
d = i[c], f = a[c];
if (i === f) continue;
l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f);
}
return i;
}, e.extend({
noConflict: function(b) {
return a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f), e;
},
isReady: !1,
readyWait: 1,
holdReady: function(a) {
a ? e.readyWait++ : e.ready(!0);
},
ready: function(a) {
if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
if (!c.body) return setTimeout(e.ready, 1);
e.isReady = !0;
if (a !== !0 && --e.readyWait > 0) return;
A.fireWith(c, [ e ]), e.fn.trigger && e(c).trigger("ready").off("ready");
}
},
bindReady: function() {
if (A) return;
A = e.Callbacks("once memory");
if (c.readyState === "complete") return setTimeout(e.ready, 1);
if (c.addEventListener) c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1); else if (c.attachEvent) {
c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
var b = !1;
try {
b = a.frameElement == null;
} catch (d) {}
c.documentElement.doScroll && b && J();
}
},
isFunction: function(a) {
return e.type(a) === "function";
},
isArray: Array.isArray || function(a) {
return e.type(a) === "array";
},
isWindow: function(a) {
return a && typeof a == "object" && "setInterval" in a;
},
isNumeric: function(a) {
return !isNaN(parseFloat(a)) && isFinite(a);
},
type: function(a) {
return a == null ? String(a) : I[C.call(a)] || "object";
},
isPlainObject: function(a) {
if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) return !1;
try {
if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) return !1;
} catch (c) {
return !1;
}
var d;
for (d in a) ;
return d === b || D.call(a, d);
},
isEmptyObject: function(a) {
for (var b in a) return !1;
return !0;
},
error: function(a) {
throw new Error(a);
},
parseJSON: function(b) {
if (typeof b != "string" || !b) return null;
b = e.trim(b);
if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) return (new Function("return " + b))();
e.error("Invalid JSON: " + b);
},
parseXML: function(c) {
var d, f;
try {
a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c));
} catch (g) {
d = b;
}
return (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c), d;
},
noop: function() {},
globalEval: function(b) {
b && j.test(b) && (a.execScript || function(b) {
a.eval.call(a, b);
})(b);
},
camelCase: function(a) {
return a.replace(w, "ms-").replace(v, x);
},
nodeName: function(a, b) {
return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase();
},
each: function(a, c, d) {
var f, g = 0, h = a.length, i = h === b || e.isFunction(a);
if (d) {
if (i) {
for (f in a) if (c.apply(a[f], d) === !1) break;
} else for (; g < h; ) if (c.apply(a[g++], d) === !1) break;
} else if (i) {
for (f in a) if (c.call(a[f], f, a[f]) === !1) break;
} else for (; g < h; ) if (c.call(a[g], g, a[g++]) === !1) break;
return a;
},
trim: G ? function(a) {
return a == null ? "" : G.call(a);
} : function(a) {
return a == null ? "" : a.toString().replace(k, "").replace(l, "");
},
makeArray: function(a, b) {
var c = b || [];
if (a != null) {
var d = e.type(a);
a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a);
}
return c;
},
inArray: function(a, b, c) {
var d;
if (b) {
if (H) return H.call(b, a, c);
d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
for (; c < d; c++) if (c in b && b[c] === a) return c;
}
return -1;
},
merge: function(a, c) {
var d = a.length, e = 0;
if (typeof c.length == "number") for (var f = c.length; e < f; e++) a[d++] = c[e]; else while (c[e] !== b) a[d++] = c[e++];
return a.length = d, a;
},
grep: function(a, b, c) {
var d = [], e;
c = !!c;
for (var f = 0, g = a.length; f < g; f++) e = !!b(a[f], f), c !== e && d.push(a[f]);
return d;
},
map: function(a, c, d) {
var f, g, h = [], i = 0, j = a.length, k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
if (k) for (; i < j; i++) f = c(a[i], i, d), f != null && (h[h.length] = f); else for (g in a) f = c(a[g], g, d), f != null && (h[h.length] = f);
return h.concat.apply([], h);
},
guid: 1,
proxy: function(a, c) {
if (typeof c == "string") {
var d = a[c];
c = a, a = d;
}
if (!e.isFunction(a)) return b;
var f = F.call(arguments, 2), g = function() {
return a.apply(c, f.concat(F.call(arguments)));
};
return g.guid = a.guid = a.guid || g.guid || e.guid++, g;
},
access: function(a, c, d, f, g, h) {
var i = a.length;
if (typeof c == "object") {
for (var j in c) e.access(a, j, c[j], f, g, d);
return a;
}
if (d !== b) {
f = !h && f && e.isFunction(d);
for (var k = 0; k < i; k++) g(a[k], c, f ? d.call(a[k], k, g(a[k], c)) : d, h);
return a;
}
return i ? g(a[0], c) : b;
},
now: function() {
return (new Date).getTime();
},
uaMatch: function(a) {
a = a.toLowerCase();
var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
return {
browser: b[1] || "",
version: b[2] || "0"
};
},
sub: function() {
function a(b, c) {
return new a.fn.init(b, c);
}
e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function(d, f) {
return f && f instanceof e && !(f instanceof a) && (f = a(f)), e.fn.init.call(this, d, f, b);
}, a.fn.init.prototype = a.fn;
var b = a(c);
return a;
},
browser: {}
}), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
I["[object " + b + "]"] = b.toLowerCase();
}), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test("Â ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function() {
c.removeEventListener("DOMContentLoaded", B, !1), e.ready();
} : c.attachEvent && (B = function() {
c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready());
}), e;
}(), g = {};
f.Callbacks = function(a) {
a = a ? g[a] || h(a) : {};
var c = [], d = [], e, i, j, k, l, m = function(b) {
var d, e, g, h, i;
for (d = 0, e = b.length; d < e; d++) g = b[d], h = f.type(g), h === "array" ? m(g) : h === "function" && (!a.unique || !o.has(g)) && c.push(g);
}, n = function(b, f) {
f = f || [], e = !a.memory || [ b, f ], i = !0, l = j || 0, j = 0, k = c.length;
for (; c && l < k; l++) if (c[l].apply(b, f) === !1 && a.stopOnFalse) {
e = !0;
break;
}
i = !1, c && (a.once ? e === !0 ? o.disable() : c = [] : d && d.length && (e = d.shift(), o.fireWith(e[0], e[1])));
}, o = {
add: function() {
if (c) {
var a = c.length;
m(arguments), i ? k = c.length : e && e !== !0 && (j = a, n(e[0], e[1]));
}
return this;
},
remove: function() {
if (c) {
var b = arguments, d = 0, e = b.length;
for (; d < e; d++) for (var f = 0; f < c.length; f++) if (b[d] === c[f]) {
i && f <= k && (k--, f <= l && l--), c.splice(f--, 1);
if (a.unique) break;
}
}
return this;
},
has: function(a) {
if (c) {
var b = 0, d = c.length;
for (; b < d; b++) if (a === c[b]) return !0;
}
return !1;
},
empty: function() {
return c = [], this;
},
disable: function() {
return c = d = e = b, this;
},
disabled: function() {
return !c;
},
lock: function() {
return d = b, (!e || e === !0) && o.disable(), this;
},
locked: function() {
return !d;
},
fireWith: function(b, c) {
return d && (i ? a.once || d.push([ b, c ]) : (!a.once || !e) && n(b, c)), this;
},
fire: function() {
return o.fireWith(this, arguments), this;
},
fired: function() {
return !!e;
}
};
return o;
};
var i = [].slice;
f.extend({
Deferred: function(a) {
var b = f.Callbacks("once memory"), c = f.Callbacks("once memory"), d = f.Callbacks("memory"), e = "pending", g = {
resolve: b,
reject: c,
notify: d
}, h = {
done: b.add,
fail: c.add,
progress: d.add,
state: function() {
return e;
},
isResolved: b.fired,
isRejected: c.fired,
then: function(a, b, c) {
return i.done(a).fail(b).progress(c), this;
},
always: function() {
return i.done.apply(i, arguments).fail.apply(i, arguments), this;
},
pipe: function(a, b, c) {
return f.Deferred(function(d) {
f.each({
done: [ a, "resolve" ],
fail: [ b, "reject" ],
progress: [ c, "notify" ]
}, function(a, b) {
var c = b[0], e = b[1], g;
f.isFunction(c) ? i[a](function() {
g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [ g ]);
}) : i[a](d[e]);
});
}).promise();
},
promise: function(a) {
if (a == null) a = h; else for (var b in h) a[b] = h[b];
return a;
}
}, i = h.promise({}), j;
for (j in g) i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
return i.done(function() {
e = "resolved";
}, c.disable, d.lock).fail(function() {
e = "rejected";
}, b.disable, d.lock), a && a.call(i, i), i;
},
when: function(a) {
function l(a) {
return function(c) {
b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b);
};
}
function m(a) {
return function(b) {
e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e);
};
}
var b = i.call(arguments, 0), c = 0, d = b.length, e = new Array(d), g = d, h = d, j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(), k = j.promise();
if (d > 1) {
for (; c < d; c++) b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
g || j.resolveWith(j, b);
} else j !== a && j.resolveWith(j, d ? [ a ] : []);
return k;
}
}), f.support = function() {
var b, d, e, g, h, i, j, k, l, m, n, o, p, q = c.createElement("div"), r = c.documentElement;
q.setAttribute("className", "t"), q.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = q.getElementsByTagName("*"), e = q.getElementsByTagName("a")[0];
if (!d || !d.length || !e) return {};
g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = q.getElementsByTagName("input")[0], b = {
leadingWhitespace: q.firstChild.nodeType === 3,
tbody: !q.getElementsByTagName("tbody").length,
htmlSerialize: !!q.getElementsByTagName("link").length,
style: /top/.test(e.getAttribute("style")),
hrefNormalized: e.getAttribute("href") === "/a",
opacity: /^0.55/.test(e.style.opacity),
cssFloat: !!e.style.cssFloat,
checkOn: i.value === "on",
optSelected: h.selected,
getSetAttribute: q.className !== "t",
enctype: !!c.createElement("form").enctype,
html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
submitBubbles: !0,
changeBubbles: !0,
focusinBubbles: !1,
deleteExpando: !0,
noCloneEvent: !0,
inlineBlockNeedsLayout: !1,
shrinkWrapBlocks: !1,
reliableMarginRight: !0
}, i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
try {
delete q.test;
} catch (s) {
b.deleteExpando = !1;
}
!q.addEventListener && q.attachEvent && q.fireEvent && (q.attachEvent("onclick", function() {
b.noCloneEvent = !1;
}), q.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), q.appendChild(i), k = c.createDocumentFragment(), k.appendChild(q.lastChild), b.checkClone = k.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, k.removeChild(i), k.appendChild(q), q.innerHTML = "", a.getComputedStyle && (j = c.createElement("div"), j.style.width = "0", j.style.marginRight = "0", q.style.width = "2px", q.appendChild(j), b.reliableMarginRight = (parseInt((a.getComputedStyle(j, null) || {
marginRight: 0
}).marginRight, 10) || 0) === 0);
if (q.attachEvent) for (o in {
submit: 1,
change: 1,
focusin: 1
}) n = "on" + o, p = n in q, p || (q.setAttribute(n, "return;"), p = typeof q[n] == "function"), b[o + "Bubbles"] = p;
return k.removeChild(q), k = g = h = j = q = i = null, f(function() {
var a, d, e, g, h, i, j, k, m, n, o, r = c.getElementsByTagName("body")[0];
if (!r) return;
j = 1, k = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;", m = "visibility:hidden;border:0;", n = "style='" + k + "border:5px solid #000;padding:0;'", o = "<div " + n + "><div></div></div>" + "<table " + n + " cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", a = c.createElement("div"), a.style.cssText = m + "width:0;height:0;position:static;top:0;margin-top:" + j + "px", r.insertBefore(a, r.firstChild), q = c.createElement("div"), a.appendChild(q), q.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>", l = q.getElementsByTagName("td"), p = l[0].offsetHeight === 0, l[0].style.display = "", l[1].style.display = "none", b.reliableHiddenOffsets = p && l[0].offsetHeight === 0, q.innerHTML = "", q.style.width = q.style.paddingLeft = "1px", f.boxModel = b.boxModel = q.offsetWidth === 2, typeof q.style.zoom != "undefined" && (q.style.display = "inline", q.style.zoom = 1, b.inlineBlockNeedsLayout = q.offsetWidth === 2, q.style.display = "", q.innerHTML = "<div style='width:4px;'></div>", b.shrinkWrapBlocks = q.offsetWidth !== 2), q.style.cssText = k + m, q.innerHTML = o, d = q.firstChild, e = d.firstChild, h = d.nextSibling.firstChild.firstChild, i = {
doesNotAddBorder: e.offsetTop !== 5,
doesAddBorderForTableAndCells: h.offsetTop === 5
}, e.style.position = "fixed", e.style.top = "20px", i.fixedPosition = e.offsetTop === 20 || e.offsetTop === 15, e.style.position = e.style.top = "", d.style.overflow = "hidden", d.style.position = "relative", i.subtractsBorderForOverflowNotVisible = e.offsetTop === -5, i.doesNotIncludeMarginInBodyOffset = r.offsetTop !== j, r.removeChild(a), q = a = null, f.extend(b, i);
}), b;
}();
var j = /^(?:\{.*\}|\[.*\])$/, k = /([A-Z])/g;
f.extend({
cache: {},
uuid: 0,
expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
noData: {
embed: !0,
object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
applet: !0
},
hasData: function(a) {
return a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando], !!a && !m(a);
},
data: function(a, c, d, e) {
if (!f.acceptData(a)) return;
var g, h, i, j = f.expando, k = typeof c == "string", l = a.nodeType, m = l ? f.cache : a, n = l ? a[j] : a[j] && j, o = c === "events";
if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b) return;
n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
if (typeof c == "object" || typeof c == "function") e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
return g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d), o && !h[c] ? g.events : (k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h, i);
},
removeData: function(a, b, c) {
if (!f.acceptData(a)) return;
var d, e, g, h = f.expando, i = a.nodeType, j = i ? f.cache : a, k = i ? a[h] : h;
if (!j[k]) return;
if (b) {
d = c ? j[k] : j[k].data;
if (d) {
f.isArray(b) || (b in d ? b = [ b ] : (b = f.camelCase(b), b in d ? b = [ b ] : b = b.split(" ")));
for (e = 0, g = b.length; e < g; e++) delete d[b[e]];
if (!(c ? m : f.isEmptyObject)(d)) return;
}
}
if (!c) {
delete j[k].data;
if (!m(j[k])) return;
}
f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null);
},
_data: function(a, b, c) {
return f.data(a, b, c, !0);
},
acceptData: function(a) {
if (a.nodeName) {
var b = f.noData[a.nodeName.toLowerCase()];
if (b) return b !== !0 && a.getAttribute("classid") === b;
}
return !0;
}
}), f.fn.extend({
data: function(a, c) {
var d, e, g, h = null;
if (typeof a == "undefined") {
if (this.length) {
h = f.data(this[0]);
if (this[0].nodeType === 1 && !f._data(this[0], "parsedAttrs")) {
e = this[0].attributes;
for (var i = 0, j = e.length; i < j; i++) g = e[i].name, g.indexOf("data-") === 0 && (g = f.camelCase(g.substring(5)), l(this[0], g, h[g]));
f._data(this[0], "parsedAttrs", !0);
}
}
return h;
}
return typeof a == "object" ? this.each(function() {
f.data(this, a);
}) : (d = a.split("."), d[1] = d[1] ? "." + d[1] : "", c === b ? (h = this.triggerHandler("getData" + d[1] + "!", [ d[0] ]), h === b && this.length && (h = f.data(this[0], a), h = l(this[0], a, h)), h === b && d[1] ? this.data(d[0]) : h) : this.each(function() {
var b = f(this), e = [ d[0], c ];
b.triggerHandler("setData" + d[1] + "!", e), f.data(this, a, c), b.triggerHandler("changeData" + d[1] + "!", e);
}));
},
removeData: function(a) {
return this.each(function() {
f.removeData(this, a);
});
}
}), f.extend({
_mark: function(a, b) {
a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1));
},
_unmark: function(a, b, c) {
a !== !0 && (c = b, b = a, a = !1);
if (b) {
c = c || "fx";
var d = c + "mark", e = a ? 0 : (f._data(b, d) || 1) - 1;
e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"));
}
},
queue: function(a, b, c) {
var d;
if (a) return b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c)), d || [];
},
dequeue: function(a, b) {
b = b || "fx";
var c = f.queue(a, b), d = c.shift(), e = {};
d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function() {
f.dequeue(a, b);
}, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"));
}
}), f.fn.extend({
queue: function(a, c) {
return typeof a != "string" && (c = a, a = "fx"), c === b ? f.queue(this[0], a) : this.each(function() {
var b = f.queue(this, a, c);
a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a);
});
},
dequeue: function(a) {
return this.each(function() {
f.dequeue(this, a);
});
},
delay: function(a, b) {
return a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
var d = setTimeout(b, a);
c.stop = function() {
clearTimeout(d);
};
});
},
clearQueue: function(a) {
return this.queue(a || "fx", []);
},
promise: function(a, c) {
function m() {
--h || d.resolveWith(e, [ e ]);
}
typeof a != "string" && (c = a, a = b), a = a || "fx";
var d = f.Deferred(), e = this, g = e.length, h = 1, i = a + "defer", j = a + "queue", k = a + "mark", l;
while (g--) if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) h++, l.add(m);
return m(), d.promise();
}
});
var o = /[\n\t\r]/g, p = /\s+/, q = /\r/g, r = /^(?:button|input)$/i, s = /^(?:button|input|object|select|textarea)$/i, t = /^a(?:rea)?$/i, u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, v = f.support.getSetAttribute, w, x, y;
f.fn.extend({
attr: function(a, b) {
return f.access(this, a, b, !0, f.attr);
},
removeAttr: function(a) {
return this.each(function() {
f.removeAttr(this, a);
});
},
prop: function(a, b) {
return f.access(this, a, b, !0, f.prop);
},
removeProp: function(a) {
return a = f.propFix[a] || a, this.each(function() {
try {
this[a] = b, delete this[a];
} catch (c) {}
});
},
addClass: function(a) {
var b, c, d, e, g, h, i;
if (f.isFunction(a)) return this.each(function(b) {
f(this).addClass(a.call(this, b, this.className));
});
if (a && typeof a == "string") {
b = a.split(p);
for (c = 0, d = this.length; c < d; c++) {
e = this[c];
if (e.nodeType === 1) if (!e.className && b.length === 1) e.className = a; else {
g = " " + e.className + " ";
for (h = 0, i = b.length; h < i; h++) ~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
e.className = f.trim(g);
}
}
}
return this;
},
removeClass: function(a) {
var c, d, e, g, h, i, j;
if (f.isFunction(a)) return this.each(function(b) {
f(this).removeClass(a.call(this, b, this.className));
});
if (a && typeof a == "string" || a === b) {
c = (a || "").split(p);
for (d = 0, e = this.length; d < e; d++) {
g = this[d];
if (g.nodeType === 1 && g.className) if (a) {
h = (" " + g.className + " ").replace(o, " ");
for (i = 0, j = c.length; i < j; i++) h = h.replace(" " + c[i] + " ", " ");
g.className = f.trim(h);
} else g.className = "";
}
}
return this;
},
toggleClass: function(a, b) {
var c = typeof a, d = typeof b == "boolean";
return f.isFunction(a) ? this.each(function(c) {
f(this).toggleClass(a.call(this, c, this.className, b), b);
}) : this.each(function() {
if (c === "string") {
var e, g = 0, h = f(this), i = b, j = a.split(p);
while (e = j[g++]) i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e);
} else if (c === "undefined" || c === "boolean") this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || "";
});
},
hasClass: function(a) {
var b = " " + a + " ", c = 0, d = this.length;
for (; c < d; c++) if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) return !0;
return !1;
},
val: function(a) {
var c, d, e, g = this[0];
if (!arguments.length) {
if (g) return c = f.valHooks[g.nodeName.toLowerCase()] || f.valHooks[g.type], c && "get" in c && (d = c.get(g, "value")) !== b ? d : (d = g.value, typeof d == "string" ? d.replace(q, "") : d == null ? "" : d);
return;
}
return e = f.isFunction(a), this.each(function(d) {
var g = f(this), h;
if (this.nodeType !== 1) return;
e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function(a) {
return a == null ? "" : a + "";
})), c = f.valHooks[this.nodeName.toLowerCase()] || f.valHooks[this.type];
if (!c || !("set" in c) || c.set(this, h, "value") === b) this.value = h;
});
}
}), f.extend({
valHooks: {
option: {
get: function(a) {
var b = a.attributes.value;
return !b || b.specified ? a.value : a.text;
}
},
select: {
get: function(a) {
var b, c, d, e, g = a.selectedIndex, h = [], i = a.options, j = a.type === "select-one";
if (g < 0) return null;
c = j ? g : 0, d = j ? g + 1 : i.length;
for (; c < d; c++) {
e = i[c];
if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
b = f(e).val();
if (j) return b;
h.push(b);
}
}
return j && !h.length && i.length ? f(i[g]).val() : h;
},
set: function(a, b) {
var c = f.makeArray(b);
return f(a).find("option").each(function() {
this.selected = f.inArray(f(this).val(), c) >= 0;
}), c.length || (a.selectedIndex = -1), c;
}
}
},
attrFn: {
val: !0,
css: !0,
html: !0,
text: !0,
data: !0,
width: !0,
height: !0,
offset: !0
},
attr: function(a, c, d, e) {
var g, h, i, j = a.nodeType;
if (!a || j === 3 || j === 8 || j === 2) return;
if (e && c in f.attrFn) return f(a)[c](d);
if (typeof a.getAttribute == "undefined") return f.prop(a, c, d);
i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
if (d !== b) {
if (d === null) {
f.removeAttr(a, c);
return;
}
return h && "set" in h && i && (g = h.set(a, d, c)) !== b ? g : (a.setAttribute(c, "" + d), d);
}
return h && "get" in h && i && (g = h.get(a, c)) !== null ? g : (g = a.getAttribute(c), g === null ? b : g);
},
removeAttr: function(a, b) {
var c, d, e, g, h = 0;
if (b && a.nodeType === 1) {
d = b.toLowerCase().split(p), g = d.length;
for (; h < g; h++) e = d[h], e && (c = f.propFix[e] || e, f.attr(a, e, ""), a.removeAttribute(v ? e : c), u.test(e) && c in a && (a[c] = !1));
}
},
attrHooks: {
type: {
set: function(a, b) {
if (r.test(a.nodeName) && a.parentNode) f.error("type property can't be changed"); else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
var c = a.value;
return a.setAttribute("type", b), c && (a.value = c), b;
}
}
},
value: {
get: function(a, b) {
return w && f.nodeName(a, "button") ? w.get(a, b) : b in a ? a.value : null;
},
set: function(a, b, c) {
if (w && f.nodeName(a, "button")) return w.set(a, b, c);
a.value = b;
}
}
},
propFix: {
tabindex: "tabIndex",
readonly: "readOnly",
"for": "htmlFor",
"class": "className",
maxlength: "maxLength",
cellspacing: "cellSpacing",
cellpadding: "cellPadding",
rowspan: "rowSpan",
colspan: "colSpan",
usemap: "useMap",
frameborder: "frameBorder",
contenteditable: "contentEditable"
},
prop: function(a, c, d) {
var e, g, h, i = a.nodeType;
if (!a || i === 3 || i === 8 || i === 2) return;
return h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]), d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c];
},
propHooks: {
tabIndex: {
get: function(a) {
var c = a.getAttributeNode("tabindex");
return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b;
}
}
}
}), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
get: function(a, c) {
var d, e = f.prop(a, c);
return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b;
},
set: function(a, b, c) {
var d;
return b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase())), c;
}
}, v || (y = {
name: !0,
id: !0
}, w = f.valHooks.button = {
get: function(a, c) {
var d;
return d = a.getAttributeNode(c), d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b;
},
set: function(a, b, d) {
var e = a.getAttributeNode(d);
return e || (e = c.createAttribute(d), a.setAttributeNode(e)), e.nodeValue = b + "";
}
}, f.attrHooks.tabindex.set = w.set, f.each([ "width", "height" ], function(a, b) {
f.attrHooks[b] = f.extend(f.attrHooks[b], {
set: function(a, c) {
if (c === "") return a.setAttribute(b, "auto"), c;
}
});
}), f.attrHooks.contenteditable = {
get: w.get,
set: function(a, b, c) {
b === "" && (b = "false"), w.set(a, b, c);
}
}), f.support.hrefNormalized || f.each([ "href", "src", "width", "height" ], function(a, c) {
f.attrHooks[c] = f.extend(f.attrHooks[c], {
get: function(a) {
var d = a.getAttribute(c, 2);
return d === null ? b : d;
}
});
}), f.support.style || (f.attrHooks.style = {
get: function(a) {
return a.style.cssText.toLowerCase() || b;
},
set: function(a, b) {
return a.style.cssText = "" + b;
}
}), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
get: function(a) {
var b = a.parentNode;
return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null;
}
})), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each([ "radio", "checkbox" ], function() {
f.valHooks[this] = {
get: function(a) {
return a.getAttribute("value") === null ? "on" : a.value;
}
};
}), f.each([ "radio", "checkbox" ], function() {
f.valHooks[this] = f.extend(f.valHooks[this], {
set: function(a, b) {
if (f.isArray(b)) return a.checked = f.inArray(f(a).val(), b) >= 0;
}
});
});
var z = /^(?:textarea|input|select)$/i, A = /^([^\.]*)?(?:\.(.+))?$/, B = /\bhover(\.\S+)?\b/, C = /^key/, D = /^(?:mouse|contextmenu)|click/, E = /^(?:focusinfocus|focusoutblur)$/, F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/, G = function(a) {
var b = F.exec(a);
return b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)")), b;
}, H = function(a, b) {
var c = a.attributes || {};
return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value));
}, I = function(a) {
return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1");
};
f.event = {
add: function(a, c, d, e, g) {
var h, i, j, k, l, m, n, o, p, q, r, s;
if (a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a))) return;
d.handler && (p = d, d = p.handler), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function(a) {
return typeof f == "undefined" || !!a && f.event.triggered === a.type ? b : f.event.dispatch.apply(i.elem, arguments);
}, i.elem = a), c = f.trim(I(c)).split(" ");
for (k = 0; k < c.length; k++) {
l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
type: m,
origType: l[1],
data: e,
handler: d,
guid: d.guid,
selector: g,
quick: G(g),
namespace: n.join(".")
}, p), r = j[m];
if (!r) {
r = j[m] = [], r.delegateCount = 0;
if (!s.setup || s.setup.call(a, e, n, i) === !1) a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i);
}
s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0;
}
a = null;
},
global: {},
remove: function(a, b, c, d, e) {
var g = f.hasData(a) && f._data(a), h, i, j, k, l, m, n, o, p, q, r, s;
if (!g || !(o = g.events)) return;
b = f.trim(I(b || "")).split(" ");
for (h = 0; h < b.length; h++) {
i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
if (!j) {
for (j in o) f.event.remove(a, j + b[h], c, d, !0);
continue;
}
p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
for (n = 0; n < r.length; n++) s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j]);
}
f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, [ "events", "handle" ], !0));
},
customEvent: {
getData: !0,
setData: !0,
changeData: !0
},
trigger: function(c, d, e, g) {
if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
var h = c.type || c, i = [], j, k, l, m, n, o, p, q, r, s;
if (E.test(h + f.event.triggered)) return;
h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
if ((!e || f.event.customEvent[h]) && !f.event.global[h]) return;
c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
if (!e) {
j = f.cache;
for (l in j) j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
return;
}
c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
if (p.trigger && p.trigger.apply(e, d) === !1) return;
r = [ [ e, p.bindType || h ] ];
if (!g && !p.noBubble && !f.isWindow(e)) {
s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
for (; m; m = m.parentNode) r.push([ m, s ]), n = m;
n && n === e.ownerDocument && r.push([ n.defaultView || n.parentWindow || a, s ]);
}
for (l = 0; l < r.length && !c.isPropagationStopped(); l++) m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
return c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n)), c.result;
}
return;
},
dispatch: function(c) {
c = f.event.fix(c || a.event);
var d = (f._data(this, "events") || {})[c.type] || [], e = d.delegateCount, g = [].slice.call(arguments, 0), h = !c.exclusive && !c.namespace, i = [], j, k, l, m, n, o, p, q, r, s, t;
g[0] = c, c.delegateTarget = this;
if (e && !c.target.disabled && (!c.button || c.type !== "click")) {
m = f(this), m.context = this.ownerDocument || this;
for (l = c.target; l != this; l = l.parentNode || this) {
o = {}, q = [], m[0] = l;
for (j = 0; j < e; j++) r = d[j], s = r.selector, o[s] === b && (o[s] = r.quick ? H(l, r.quick) : m.is(s)), o[s] && q.push(r);
q.length && i.push({
elem: l,
matches: q
});
}
}
d.length > e && i.push({
elem: this,
matches: d.slice(e)
});
for (j = 0; j < i.length && !c.isPropagationStopped(); j++) {
p = i[j], c.currentTarget = p.elem;
for (k = 0; k < p.matches.length && !c.isImmediatePropagationStopped(); k++) {
r = p.matches[k];
if (h || !c.namespace && !r.namespace || c.namespace_re && c.namespace_re.test(r.namespace)) c.data = r.data, c.handleObj = r, n = ((f.event.special[r.origType] || {}).handle || r.handler).apply(p.elem, g), n !== b && (c.result = n, n === !1 && (c.preventDefault(), c.stopPropagation()));
}
}
return c.result;
},
props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
fixHooks: {},
keyHooks: {
props: "char charCode key keyCode".split(" "),
filter: function(a, b) {
return a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode), a;
}
},
mouseHooks: {
props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
filter: function(a, d) {
var e, f, g, h = d.button, i = d.fromElement;
return a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0), a;
}
},
fix: function(a) {
if (a[f.expando]) return a;
var d, e, g = a, h = f.event.fixHooks[a.type] || {}, i = h.props ? this.props.concat(h.props) : this.props;
a = f.Event(g);
for (d = i.length; d; ) e = i[--d], a[e] = g[e];
return a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey), h.filter ? h.filter(a, g) : a;
},
special: {
ready: {
setup: f.bindReady
},
load: {
noBubble: !0
},
focus: {
delegateType: "focusin"
},
blur: {
delegateType: "focusout"
},
beforeunload: {
setup: function(a, b, c) {
f.isWindow(this) && (this.onbeforeunload = c);
},
teardown: function(a, b) {
this.onbeforeunload === b && (this.onbeforeunload = null);
}
}
},
simulate: function(a, b, c, d) {
var e = f.extend(new f.Event, c, {
type: a,
isSimulated: !0,
originalEvent: {}
});
d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault();
}
}, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function(a, b, c) {
a.removeEventListener && a.removeEventListener(b, c, !1);
} : function(a, b, c) {
a.detachEvent && a.detachEvent("on" + b, c);
}, f.Event = function(a, b) {
if (this instanceof f.Event) a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0; else return new f.Event(a, b);
}, f.Event.prototype = {
preventDefault: function() {
this.isDefaultPrevented = K;
var a = this.originalEvent;
if (!a) return;
a.preventDefault ? a.preventDefault() : a.returnValue = !1;
},
stopPropagation: function() {
this.isPropagationStopped = K;
var a = this.originalEvent;
if (!a) return;
a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0;
},
stopImmediatePropagation: function() {
this.isImmediatePropagationStopped = K, this.stopPropagation();
},
isDefaultPrevented: J,
isPropagationStopped: J,
isImmediatePropagationStopped: J
}, f.each({
mouseenter: "mouseover",
mouseleave: "mouseout"
}, function(a, b) {
f.event.special[a] = {
delegateType: b,
bindType: b,
handle: function(a) {
var c = this, d = a.relatedTarget, e = a.handleObj, g = e.selector, h;
if (!d || d !== c && !f.contains(c, d)) a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b;
return h;
}
};
}), f.support.submitBubbles || (f.event.special.submit = {
setup: function() {
if (f.nodeName(this, "form")) return !1;
f.event.add(this, "click._submit keypress._submit", function(a) {
var c = a.target, d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
d && !d._submit_attached && (f.event.add(d, "submit._submit", function(a) {
this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0);
}), d._submit_attached = !0);
});
},
teardown: function() {
if (f.nodeName(this, "form")) return !1;
f.event.remove(this, "._submit");
}
}), f.support.changeBubbles || (f.event.special.change = {
setup: function() {
if (z.test(this.nodeName)) {
if (this.type === "checkbox" || this.type === "radio") f.event.add(this, "propertychange._change", function(a) {
a.originalEvent.propertyName === "checked" && (this._just_changed = !0);
}), f.event.add(this, "click._change", function(a) {
this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0));
});
return !1;
}
f.event.add(this, "beforeactivate._change", function(a) {
var b = a.target;
z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function(a) {
this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0);
}), b._change_attached = !0);
});
},
handle: function(a) {
var b = a.target;
if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments);
},
teardown: function() {
return f.event.remove(this, "._change"), z.test(this.nodeName);
}
}), f.support.focusinBubbles || f.each({
focus: "focusin",
blur: "focusout"
}, function(a, b) {
var d = 0, e = function(a) {
f.event.simulate(b, a.target, f.event.fix(a), !0);
};
f.event.special[b] = {
setup: function() {
d++ === 0 && c.addEventListener(a, e, !0);
},
teardown: function() {
--d === 0 && c.removeEventListener(a, e, !0);
}
};
}), f.fn.extend({
on: function(a, c, d, e, g) {
var h, i;
if (typeof a == "object") {
typeof c != "string" && (d = c, c = b);
for (i in a) this.on(i, c, d, a[i], g);
return this;
}
d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
if (e === !1) e = J; else if (!e) return this;
return g === 1 && (h = e, e = function(a) {
return f().off(a), h.apply(this, arguments);
}, e.guid = h.guid || (h.guid = f.guid++)), this.each(function() {
f.event.add(this, a, e, d, c);
});
},
one: function(a, b, c, d) {
return this.on.call(this, a, b, c, d, 1);
},
off: function(a, c, d) {
if (a && a.preventDefault && a.handleObj) {
var e = a.handleObj;
return f(a.delegateTarget).off(e.namespace ? e.type + "." + e.namespace : e.type, e.selector, e.handler), this;
}
if (typeof a == "object") {
for (var g in a) this.off(g, c, a[g]);
return this;
}
if (c === !1 || typeof c == "function") d = c, c = b;
return d === !1 && (d = J), this.each(function() {
f.event.remove(this, a, d, c);
});
},
bind: function(a, b, c) {
return this.on(a, null, b, c);
},
unbind: function(a, b) {
return this.off(a, null, b);
},
live: function(a, b, c) {
return f(this.context).on(a, this.selector, b, c), this;
},
die: function(a, b) {
return f(this.context).off(a, this.selector || "**", b), this;
},
delegate: function(a, b, c, d) {
return this.on(b, a, c, d);
},
undelegate: function(a, b, c) {
return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c);
},
trigger: function(a, b) {
return this.each(function() {
f.event.trigger(a, b, this);
});
},
triggerHandler: function(a, b) {
if (this[0]) return f.event.trigger(a, b, this[0], !0);
},
toggle: function(a) {
var b = arguments, c = a.guid || f.guid++, d = 0, e = function(c) {
var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
return f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault(), b[e].apply(this, arguments) || !1;
};
e.guid = c;
while (d < b.length) b[d++].guid = c;
return this.click(e);
},
hover: function(a, b) {
return this.mouseenter(a).mouseleave(b || a);
}
}), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
f.fn[b] = function(a, c) {
return c == null && (c = a, a = null), arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
}, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks);
}), function() {
function w(a, b, c, e, f, g) {
for (var h = 0, i = e.length; h < i; h++) {
var j = e[h];
if (j) {
var k = !1;
j = j[a];
while (j) {
if (j[d] === c) {
k = e[j.sizset];
break;
}
j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
if (j.nodeName.toLowerCase() === b) {
k = j;
break;
}
j = j[a];
}
e[h] = k;
}
}
}
function x(a, b, c, e, f, g) {
for (var h = 0, i = e.length; h < i; h++) {
var j = e[h];
if (j) {
var k = !1;
j = j[a];
while (j) {
if (j[d] === c) {
k = e[j.sizset];
break;
}
if (j.nodeType === 1) {
g || (j[d] = c, j.sizset = h);
if (typeof b != "string") {
if (j === b) {
k = !0;
break;
}
} else if (m.filter(b, [ j ]).length > 0) {
k = j;
break;
}
}
j = j[a];
}
e[h] = k;
}
}
}
var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, d = "sizcache" + (Math.random() + "").replace(".", ""), e = 0, g = Object.prototype.toString, h = !1, i = !0, j = /\\/g, k = /\r\n/g, l = /\W/;
[ 0, 0 ].sort(function() {
return i = !1, 0;
});
var m = function(b, d, e, f) {
e = e || [], d = d || c;
var h = d;
if (d.nodeType !== 1 && d.nodeType !== 9) return [];
if (!b || typeof b != "string") return e;
var i, j, k, l, n, q, r, t, u = !0, v = m.isXML(d), w = [], x = b;
do {
a.exec(""), i = a.exec(x);
if (i) {
x = i[3], w.push(i[1]);
if (i[2]) {
l = i[3];
break;
}
}
} while (i);
if (w.length > 1 && p.exec(b)) if (w.length === 2 && o.relative[w[0]]) j = y(w[0] + w[1], d, f); else {
j = o.relative[w[0]] ? [ d ] : m(w.shift(), d);
while (w.length) b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f);
} else {
!f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
if (d) {
n = f ? {
expr: w.pop(),
set: s(f)
} : m.find(w.pop(), w.length !== 1 || w[0] !== "~" && w[0] !== "+" || !d.parentNode ? d : d.parentNode, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
while (w.length) q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v);
} else k = w = [];
}
k || (k = j), k || m.error(q || b);
if (g.call(k) === "[object Array]") if (!u) e.push.apply(e, k); else if (d && d.nodeType === 1) for (t = 0; k[t] != null; t++) k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]); else for (t = 0; k[t] != null; t++) k[t] && k[t].nodeType === 1 && e.push(j[t]); else s(k, e);
return l && (m(l, h, e, f), m.uniqueSort(e)), e;
};
m.uniqueSort = function(a) {
if (u) {
h = i, a.sort(u);
if (h) for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1);
}
return a;
}, m.matches = function(a, b) {
return m(a, null, null, b);
}, m.matchesSelector = function(a, b) {
return m(b, null, null, [ a ]).length > 0;
}, m.find = function(a, b, c) {
var d, e, f, g, h, i;
if (!a) return [];
for (e = 0, f = o.order.length; e < f; e++) {
h = o.order[e];
if (g = o.leftMatch[h].exec(a)) {
i = g[1], g.splice(1, 1);
if (i.substr(i.length - 1) !== "\\") {
g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
if (d != null) {
a = a.replace(o.match[h], "");
break;
}
}
}
}
return d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []), {
set: d,
expr: a
};
}, m.filter = function(a, c, d, e) {
var f, g, h, i, j, k, l, n, p, q = a, r = [], s = c, t = c && c[0] && m.isXML(c[0]);
while (a && c.length) {
for (h in o.filter) if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
if (l.substr(l.length - 1) === "\\") continue;
s === r && (r = []);
if (o.preFilter[h]) {
f = o.preFilter[h](f, s, d, r, e, t);
if (!f) g = i = !0; else if (f === !0) continue;
}
if (f) for (n = 0; (j = s[n]) != null; n++) j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
if (i !== b) {
d || (s = r), a = a.replace(o.match[h], "");
if (!g) return [];
break;
}
}
if (a === q) if (g == null) m.error(a); else break;
q = a;
}
return s;
}, m.error = function(a) {
throw new Error("Syntax error, unrecognized expression: " + a);
};
var n = m.getText = function(a) {
var b, c, d = a.nodeType, e = "";
if (d) {
if (d === 1 || d === 9) {
if (typeof a.textContent == "string") return a.textContent;
if (typeof a.innerText == "string") return a.innerText.replace(k, "");
for (a = a.firstChild; a; a = a.nextSibling) e += n(a);
} else if (d === 3 || d === 4) return a.nodeValue;
} else for (b = 0; c = a[b]; b++) c.nodeType !== 8 && (e += n(c));
return e;
}, o = m.selectors = {
order: [ "ID", "NAME", "TAG" ],
match: {
ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
},
leftMatch: {},
attrMap: {
"class": "className",
"for": "htmlFor"
},
attrHandle: {
href: function(a) {
return a.getAttribute("href");
},
type: function(a) {
return a.getAttribute("type");
}
},
relative: {
"+": function(a, b) {
var c = typeof b == "string", d = c && !l.test(b), e = c && !d;
d && (b = b.toLowerCase());
for (var f = 0, g = a.length, h; f < g; f++) if (h = a[f]) {
while ((h = h.previousSibling) && h.nodeType !== 1) ;
a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b;
}
e && m.filter(b, a, !0);
},
">": function(a, b) {
var c, d = typeof b == "string", e = 0, f = a.length;
if (d && !l.test(b)) {
b = b.toLowerCase();
for (; e < f; e++) {
c = a[e];
if (c) {
var g = c.parentNode;
a[e] = g.nodeName.toLowerCase() === b ? g : !1;
}
}
} else {
for (; e < f; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
d && m.filter(b, a, !0);
}
},
"": function(a, b, c) {
var d, f = e++, g = x;
typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c);
},
"~": function(a, b, c) {
var d, f = e++, g = x;
typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c);
}
},
find: {
ID: function(a, b, c) {
if (typeof b.getElementById != "undefined" && !c) {
var d = b.getElementById(a[1]);
return d && d.parentNode ? [ d ] : [];
}
},
NAME: function(a, b) {
if (typeof b.getElementsByName != "undefined") {
var c = [], d = b.getElementsByName(a[1]);
for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
return c.length === 0 ? null : c;
}
},
TAG: function(a, b) {
if (typeof b.getElementsByTagName != "undefined") return b.getElementsByTagName(a[1]);
}
},
preFilter: {
CLASS: function(a, b, c, d, e, f) {
a = " " + a[1].replace(j, "") + " ";
if (f) return a;
for (var g = 0, h; (h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
return !1;
},
ID: function(a) {
return a[1].replace(j, "");
},
TAG: function(a, b) {
return a[1].replace(j, "").toLowerCase();
},
CHILD: function(a) {
if (a[1] === "nth") {
a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0;
} else a[2] && m.error(a[0]);
return a[0] = e++, a;
},
ATTR: function(a, b, c, d, e, f) {
var g = a[1] = a[1].replace(j, "");
return !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " "), a;
},
PSEUDO: function(b, c, d, e, f) {
if (b[1] === "not") if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) b[3] = m(b[3], null, null, c); else {
var g = m.filter(b[3], c, d, !0 ^ f);
return d || e.push.apply(e, g), !1;
} else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) return !0;
return b;
},
POS: function(a) {
return a.unshift(!0), a;
}
},
filters: {
enabled: function(a) {
return a.disabled === !1 && a.type !== "hidden";
},
disabled: function(a) {
return a.disabled === !0;
},
checked: function(a) {
return a.checked === !0;
},
selected: function(a) {
return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
},
parent: function(a) {
return !!a.firstChild;
},
empty: function(a) {
return !a.firstChild;
},
has: function(a, b, c) {
return !!m(c[3], a).length;
},
header: function(a) {
return /h\d/i.test(a.nodeName);
},
text: function(a) {
var b = a.getAttribute("type"), c = a.type;
return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null);
},
radio: function(a) {
return a.nodeName.toLowerCase() === "input" && "radio" === a.type;
},
checkbox: function(a) {
return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type;
},
file: function(a) {
return a.nodeName.toLowerCase() === "input" && "file" === a.type;
},
password: function(a) {
return a.nodeName.toLowerCase() === "input" && "password" === a.type;
},
submit: function(a) {
var b = a.nodeName.toLowerCase();
return (b === "input" || b === "button") && "submit" === a.type;
},
image: function(a) {
return a.nodeName.toLowerCase() === "input" && "image" === a.type;
},
reset: function(a) {
var b = a.nodeName.toLowerCase();
return (b === "input" || b === "button") && "reset" === a.type;
},
button: function(a) {
var b = a.nodeName.toLowerCase();
return b === "input" && "button" === a.type || b === "button";
},
input: function(a) {
return /input|select|textarea|button/i.test(a.nodeName);
},
focus: function(a) {
return a === a.ownerDocument.activeElement;
}
},
setFilters: {
first: function(a, b) {
return b === 0;
},
last: function(a, b, c, d) {
return b === d.length - 1;
},
even: function(a, b) {
return b % 2 === 0;
},
odd: function(a, b) {
return b % 2 === 1;
},
lt: function(a, b, c) {
return b < c[3] - 0;
},
gt: function(a, b, c) {
return b > c[3] - 0;
},
nth: function(a, b, c) {
return c[3] - 0 === b;
},
eq: function(a, b, c) {
return c[3] - 0 === b;
}
},
filter: {
PSEUDO: function(a, b, c, d) {
var e = b[1], f = o.filters[e];
if (f) return f(a, c, b, d);
if (e === "contains") return (a.textContent || a.innerText || n([ a ]) || "").indexOf(b[3]) >= 0;
if (e === "not") {
var g = b[3];
for (var h = 0, i = g.length; h < i; h++) if (g[h] === a) return !1;
return !0;
}
m.error(e);
},
CHILD: function(a, b) {
var c, e, f, g, h, i, j, k = b[1], l = a;
switch (k) {
case "only":
case "first":
while (l = l.previousSibling) if (l.nodeType === 1) return !1;
if (k === "first") return !0;
l = a;
case "last":
while (l = l.nextSibling) if (l.nodeType === 1) return !1;
return !0;
case "nth":
c = b[2], e = b[3];
if (c === 1 && e === 0) return !0;
f = b[0], g = a.parentNode;
if (g && (g[d] !== f || !a.nodeIndex)) {
i = 0;
for (l = g.firstChild; l; l = l.nextSibling) l.nodeType === 1 && (l.nodeIndex = ++i);
g[d] = f;
}
return j = a.nodeIndex - e, c === 0 ? j === 0 : j % c === 0 && j / c >= 0;
}
},
ID: function(a, b) {
return a.nodeType === 1 && a.getAttribute("id") === b;
},
TAG: function(a, b) {
return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b;
},
CLASS: function(a, b) {
return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1;
},
ATTR: function(a, b) {
var c = b[1], d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c), e = d + "", f = b[2], g = b[4];
return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1;
},
POS: function(a, b, c, d) {
var e = b[2], f = o.setFilters[e];
if (f) return f(a, c, b, d);
}
}
}, p = o.match.POS, q = function(a, b) {
return "\\" + (b - 0 + 1);
};
for (var r in o.match) o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
var s = function(a, b) {
return a = Array.prototype.slice.call(a, 0), b ? (b.push.apply(b, a), b) : a;
};
try {
Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType;
} catch (t) {
s = function(a, b) {
var c = 0, d = b || [];
if (g.call(a) === "[object Array]") Array.prototype.push.apply(d, a); else if (typeof a.length == "number") for (var e = a.length; c < e; c++) d.push(a[c]); else for (; a[c]; c++) d.push(a[c]);
return d;
};
}
var u, v;
c.documentElement.compareDocumentPosition ? u = function(a, b) {
return a === b ? (h = !0, 0) : !a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition ? -1 : 1 : a.compareDocumentPosition(b) & 4 ? -1 : 1;
} : (u = function(a, b) {
if (a === b) return h = !0, 0;
if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
var c, d, e = [], f = [], g = a.parentNode, i = b.parentNode, j = g;
if (g === i) return v(a, b);
if (!g) return -1;
if (!i) return 1;
while (j) e.unshift(j), j = j.parentNode;
j = i;
while (j) f.unshift(j), j = j.parentNode;
c = e.length, d = f.length;
for (var k = 0; k < c && k < d; k++) if (e[k] !== f[k]) return v(e[k], f[k]);
return k === c ? v(a, f[k], -1) : v(e[k], b, 1);
}, v = function(a, b, c) {
if (a === b) return c;
var d = a.nextSibling;
while (d) {
if (d === b) return -1;
d = d.nextSibling;
}
return 1;
}), function() {
var a = c.createElement("div"), d = "script" + (new Date).getTime(), e = c.documentElement;
a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function(a, c, d) {
if (typeof c.getElementById != "undefined" && !d) {
var e = c.getElementById(a[1]);
return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [ e ] : b : [];
}
}, o.filter.ID = function(a, b) {
var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
return a.nodeType === 1 && c && c.nodeValue === b;
}), e.removeChild(a), e = a = null;
}(), function() {
var a = c.createElement("div");
a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function(a, b) {
var c = b.getElementsByTagName(a[1]);
if (a[1] === "*") {
var d = [];
for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
c = d;
}
return c;
}), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function(a) {
return a.getAttribute("href", 2);
}), a = null;
}(), c.querySelectorAll && function() {
var a = m, b = c.createElement("div"), d = "__sizzle__";
b.innerHTML = "<p class='TEST'></p>";
if (b.querySelectorAll && b.querySelectorAll(".TEST").length === 0) return;
m = function(b, e, f, g) {
e = e || c;
if (!g && !m.isXML(e)) {
var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
if (h && (e.nodeType === 1 || e.nodeType === 9)) {
if (h[1]) return s(e.getElementsByTagName(b), f);
if (h[2] && o.find.CLASS && e.getElementsByClassName) return s(e.getElementsByClassName(h[2]), f);
}
if (e.nodeType === 9) {
if (b === "body" && e.body) return s([ e.body ], f);
if (h && h[3]) {
var i = e.getElementById(h[3]);
if (!i || !i.parentNode) return s([], f);
if (i.id === h[3]) return s([ i ], f);
}
try {
return s(e.querySelectorAll(b), f);
} catch (j) {}
} else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
var k = e, l = e.getAttribute("id"), n = l || d, p = e.parentNode, q = /^\s*[+~]/.test(b);
l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
try {
if (!q || p) return s(e.querySelectorAll("[id='" + n + "'] " + b), f);
} catch (r) {} finally {
l || k.removeAttribute("id");
}
}
}
return a(b, e, f, g);
};
for (var e in a) m[e] = a[e];
b = null;
}(), function() {
var a = c.documentElement, b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
if (b) {
var d = !b.call(c.createElement("div"), "div"), e = !1;
try {
b.call(c.documentElement, "[test!='']:sizzle");
} catch (f) {
e = !0;
}
m.matchesSelector = function(a, c) {
c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
if (!m.isXML(a)) try {
if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
var f = b.call(a, c);
if (f || !d || a.document && a.document.nodeType !== 11) return f;
}
} catch (g) {}
return m(c, null, null, [ a ]).length > 0;
};
}
}(), function() {
var a = c.createElement("div");
a.innerHTML = "<div class='test e'></div><div class='test'></div>";
if (!a.getElementsByClassName || a.getElementsByClassName("e").length === 0) return;
a.lastChild.className = "e";
if (a.getElementsByClassName("e").length === 1) return;
o.order.splice(1, 0, "CLASS"), o.find.CLASS = function(a, b, c) {
if (typeof b.getElementsByClassName != "undefined" && !c) return b.getElementsByClassName(a[1]);
}, a = null;
}(), c.documentElement.contains ? m.contains = function(a, b) {
return a !== b && (a.contains ? a.contains(b) : !0);
} : c.documentElement.compareDocumentPosition ? m.contains = function(a, b) {
return !!(a.compareDocumentPosition(b) & 16);
} : m.contains = function() {
return !1;
}, m.isXML = function(a) {
var b = (a ? a.ownerDocument || a : 0).documentElement;
return b ? b.nodeName !== "HTML" : !1;
};
var y = function(a, b, c) {
var d, e = [], f = "", g = b.nodeType ? [ b ] : b;
while (d = o.match.PSEUDO.exec(a)) f += d[0], a = a.replace(o.match.PSEUDO, "");
a = o.relative[a] ? a + "*" : a;
for (var h = 0, i = g.length; h < i; h++) m(a, g[h], e, c);
return m.filter(f, e);
};
m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains;
}();
var L = /Until$/, M = /^(?:parents|prevUntil|prevAll)/, N = /,/, O = /^.[^:#\[\.,]*$/, P = Array.prototype.slice, Q = f.expr.match.POS, R = {
children: !0,
contents: !0,
next: !0,
prev: !0
};
f.fn.extend({
find: function(a) {
var b = this, c, d;
if (typeof a != "string") return f(a).filter(function() {
for (c = 0, d = b.length; c < d; c++) if (f.contains(b[c], this)) return !0;
});
var e = this.pushStack("", "find", a), g, h, i;
for (c = 0, d = this.length; c < d; c++) {
g = e.length, f.find(a, this[c], e);
if (c > 0) for (h = g; h < e.length; h++) for (i = 0; i < g; i++) if (e[i] === e[h]) {
e.splice(h--, 1);
break;
}
}
return e;
},
has: function(a) {
var b = f(a);
return this.filter(function() {
for (var a = 0, c = b.length; a < c; a++) if (f.contains(this, b[a])) return !0;
});
},
not: function(a) {
return this.pushStack(T(this, a, !1), "not", a);
},
filter: function(a) {
return this.pushStack(T(this, a, !0), "filter", a);
},
is: function(a) {
return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0);
},
closest: function(a, b) {
var c = [], d, e, g = this[0];
if (f.isArray(a)) {
var h = 1;
while (g && g.ownerDocument && g !== b) {
for (d = 0; d < a.length; d++) f(g).is(a[d]) && c.push({
selector: a[d],
elem: g,
level: h
});
g = g.parentNode, h++;
}
return c;
}
var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
for (d = 0, e = this.length; d < e; d++) {
g = this[d];
while (g) {
if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
c.push(g);
break;
}
g = g.parentNode;
if (!g || !g.ownerDocument || g === b || g.nodeType === 11) break;
}
}
return c = c.length > 1 ? f.unique(c) : c, this.pushStack(c, "closest", a);
},
index: function(a) {
return a ? typeof a == "string" ? f.inArray(this[0], f(a)) : f.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1;
},
add: function(a, b) {
var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [ a ] : a), d = f.merge(this.get(), c);
return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d));
},
andSelf: function() {
return this.add(this.prevObject);
}
}), f.each({
parent: function(a) {
var b = a.parentNode;
return b && b.nodeType !== 11 ? b : null;
},
parents: function(a) {
return f.dir(a, "parentNode");
},
parentsUntil: function(a, b, c) {
return f.dir(a, "parentNode", c);
},
next: function(a) {
return f.nth(a, 2, "nextSibling");
},
prev: function(a) {
return f.nth(a, 2, "previousSibling");
},
nextAll: function(a) {
return f.dir(a, "nextSibling");
},
prevAll: function(a) {
return f.dir(a, "previousSibling");
},
nextUntil: function(a, b, c) {
return f.dir(a, "nextSibling", c);
},
prevUntil: function(a, b, c) {
return f.dir(a, "previousSibling", c);
},
siblings: function(a) {
return f.sibling(a.parentNode.firstChild, a);
},
children: function(a) {
return f.sibling(a.firstChild);
},
contents: function(a) {
return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes);
}
}, function(a, b) {
f.fn[a] = function(c, d) {
var e = f.map(this, b, c);
return L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse()), this.pushStack(e, a, P.call(arguments).join(","));
};
}), f.extend({
filter: function(a, b, c) {
return c && (a = ":not(" + a + ")"), b.length === 1 ? f.find.matchesSelector(b[0], a) ? [ b[0] ] : [] : f.find.matches(a, b);
},
dir: function(a, c, d) {
var e = [], g = a[c];
while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) g.nodeType === 1 && e.push(g), g = g[c];
return e;
},
nth: function(a, b, c, d) {
b = b || 1;
var e = 0;
for (; a; a = a[c]) if (a.nodeType === 1 && ++e === b) break;
return a;
},
sibling: function(a, b) {
var c = [];
for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
return c;
}
});
var V = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", W = / jQuery\d+="(?:\d+|null)"/g, X = /^\s+/, Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, Z = /<([\w:]+)/, $ = /<tbody/i, _ = /<|&#?\w+;/, ba = /<(?:script|style)/i, bb = /<(?:script|object|embed|option|style)/i, bc = new RegExp("<(?:" + V + ")", "i"), bd = /checked\s*(?:[^=]|=\s*.checked.)/i, be = /\/(java|ecma)script/i, bf = /^\s*<!(?:\[CDATA\[|\-\-)/, bg = {
option: [ 1, "<select multiple='multiple'>", "</select>" ],
legend: [ 1, "<fieldset>", "</fieldset>" ],
thead: [ 1, "<table>", "</table>" ],
tr: [ 2, "<table><tbody>", "</tbody></table>" ],
td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
area: [ 1, "<map>", "</map>" ],
_default: [ 0, "", "" ]
}, bh = U(c);
bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, bg.th = bg.td, f.support.htmlSerialize || (bg._default = [ 1, "div<div>", "</div>" ]), f.fn.extend({
text: function(a) {
return f.isFunction(a) ? this.each(function(b) {
var c = f(this);
c.text(a.call(this, b, c.text()));
}) : typeof a != "object" && a !== b ? this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a)) : f.text(this);
},
wrapAll: function(a) {
if (f.isFunction(a)) return this.each(function(b) {
f(this).wrapAll(a.call(this, b));
});
if (this[0]) {
var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
var a = this;
while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
return a;
}).append(this);
}
return this;
},
wrapInner: function(a) {
return f.isFunction(a) ? this.each(function(b) {
f(this).wrapInner(a.call(this, b));
}) : this.each(function() {
var b = f(this), c = b.contents();
c.length ? c.wrapAll(a) : b.append(a);
});
},
wrap: function(a) {
var b = f.isFunction(a);
return this.each(function(c) {
f(this).wrapAll(b ? a.call(this, c) : a);
});
},
unwrap: function() {
return this.parent().each(function() {
f.nodeName(this, "body") || f(this).replaceWith(this.childNodes);
}).end();
},
append: function() {
return this.domManip(arguments, !0, function(a) {
this.nodeType === 1 && this.appendChild(a);
});
},
prepend: function() {
return this.domManip(arguments, !0, function(a) {
this.nodeType === 1 && this.insertBefore(a, this.firstChild);
});
},
before: function() {
if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
this.parentNode.insertBefore(a, this);
});
if (arguments.length) {
var a = f.clean(arguments);
return a.push.apply(a, this.toArray()), this.pushStack(a, "before", arguments);
}
},
after: function() {
if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
this.parentNode.insertBefore(a, this.nextSibling);
});
if (arguments.length) {
var a = this.pushStack(this, "after", arguments);
return a.push.apply(a, f.clean(arguments)), a;
}
},
remove: function(a, b) {
for (var c = 0, d; (d = this[c]) != null; c++) if (!a || f.filter(a, [ d ]).length) !b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([ d ])), d.parentNode && d.parentNode.removeChild(d);
return this;
},
empty: function() {
for (var a = 0, b; (b = this[a]) != null; a++) {
b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
while (b.firstChild) b.removeChild(b.firstChild);
}
return this;
},
clone: function(a, b) {
return a = a == null ? !1 : a, b = b == null ? a : b, this.map(function() {
return f.clone(this, a, b);
});
},
html: function(a) {
if (a === b) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(W, "") : null;
if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || [ "", "" ])[1].toLowerCase()]) {
a = a.replace(Y, "<$1></$2>");
try {
for (var c = 0, d = this.length; c < d; c++) this[c].nodeType === 1 && (f.cleanData(this[c].getElementsByTagName("*")), this[c].innerHTML = a);
} catch (e) {
this.empty().append(a);
}
} else f.isFunction(a) ? this.each(function(b) {
var c = f(this);
c.html(a.call(this, b, c.html()));
}) : this.empty().append(a);
return this;
},
replaceWith: function(a) {
return this[0] && this[0].parentNode ? f.isFunction(a) ? this.each(function(b) {
var c = f(this), d = c.html();
c.replaceWith(a.call(this, b, d));
}) : (typeof a != "string" && (a = f(a).detach()), this.each(function() {
var b = this.nextSibling, c = this.parentNode;
f(this).remove(), b ? f(b).before(a) : f(c).append(a);
})) : this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this;
},
detach: function(a) {
return this.remove(a, !0);
},
domManip: function(a, c, d) {
var e, g, h, i, j = a[0], k = [];
if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j)) return this.each(function() {
f(this).domManip(a, c, d, !0);
});
if (f.isFunction(j)) return this.each(function(e) {
var g = f(this);
a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d);
});
if (this[0]) {
i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {
fragment: i
} : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
if (g) {
c = c && f.nodeName(g, "tr");
for (var l = 0, m = this.length, n = m - 1; l < m; l++) d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h);
}
k.length && f.each(k, bp);
}
return this;
}
}), f.buildFragment = function(a, b, d) {
var e, g, h, i, j = a[0];
return b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1), {
fragment: e,
cacheable: g
};
}, f.fragments = {}, f.each({
appendTo: "append",
prependTo: "prepend",
insertBefore: "before",
insertAfter: "after",
replaceAll: "replaceWith"
}, function(a, b) {
f.fn[a] = function(c) {
var d = [], e = f(c), g = this.length === 1 && this[0].parentNode;
if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) return e[b](this[0]), this;
for (var h = 0, i = e.length; h < i; h++) {
var j = (h > 0 ? this.clone(!0) : this).get();
f(e[h])[b](j), d = d.concat(j);
}
return this.pushStack(d, a, e.selector);
};
}), f.extend({
clone: function(a, b, c) {
var d, e, g, h = f.support.html5Clone || !bc.test("<" + a.nodeName) ? a.cloneNode(!0) : bo(a);
if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
bk(a, h), d = bl(a), e = bl(h);
for (g = 0; d[g]; ++g) e[g] && bk(d[g], e[g]);
}
if (b) {
bj(a, h);
if (c) {
d = bl(a), e = bl(h);
for (g = 0; d[g]; ++g) bj(d[g], e[g]);
}
}
return d = e = null, h;
},
clean: function(a, b, d, e) {
var g;
b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
var h = [], i;
for (var j = 0, k; (k = a[j]) != null; j++) {
typeof k == "number" && (k += "");
if (!k) continue;
if (typeof k == "string") if (!_.test(k)) k = b.createTextNode(k); else {
k = k.replace(Y, "<$1></$2>");
var l = (Z.exec(k) || [ "", "" ])[1].toLowerCase(), m = bg[l] || bg._default, n = m[0], o = b.createElement("div");
b === c ? bh.appendChild(o) : U(b).appendChild(o), o.innerHTML = m[1] + k + m[2];
while (n--) o = o.lastChild;
if (!f.support.tbody) {
var p = $.test(k), q = l === "table" && !p ? o.firstChild && o.firstChild.childNodes : m[1] === "<table>" && !p ? o.childNodes : [];
for (i = q.length - 1; i >= 0; --i) f.nodeName(q[i], "tbody") && !q[i].childNodes.length && q[i].parentNode.removeChild(q[i]);
}
!f.support.leadingWhitespace && X.test(k) && o.insertBefore(b.createTextNode(X.exec(k)[0]), o.firstChild), k = o.childNodes;
}
var r;
if (!f.support.appendChecked) if (k[0] && typeof (r = k.length) == "number") for (i = 0; i < r; i++) bn(k[i]); else bn(k);
k.nodeType ? h.push(k) : h = f.merge(h, k);
}
if (d) {
g = function(a) {
return !a.type || be.test(a.type);
};
for (j = 0; h[j]; j++) if (e && f.nodeName(h[j], "script") && (!h[j].type || h[j].type.toLowerCase() === "text/javascript")) e.push(h[j].parentNode ? h[j].parentNode.removeChild(h[j]) : h[j]); else {
if (h[j].nodeType === 1) {
var s = f.grep(h[j].getElementsByTagName("script"), g);
h.splice.apply(h, [ j + 1, 0 ].concat(s));
}
d.appendChild(h[j]);
}
}
return h;
},
cleanData: function(a) {
var b, c, d = f.cache, e = f.event.special, g = f.support.deleteExpando;
for (var h = 0, i; (i = a[h]) != null; h++) {
if (i.nodeName && f.noData[i.nodeName.toLowerCase()]) continue;
c = i[f.expando];
if (c) {
b = d[c];
if (b && b.events) {
for (var j in b.events) e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
b.handle && (b.handle.elem = null);
}
g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c];
}
}
}
});
var bq = /alpha\([^)]*\)/i, br = /opacity=([^)]*)/, bs = /([A-Z]|^ms)/g, bt = /^-?\d+(?:px)?$/i, bu = /^-?\d/, bv = /^([\-+])=([\-+.\de]+)/, bw = {
position: "absolute",
visibility: "hidden",
display: "block"
}, bx = [ "Left", "Right" ], by = [ "Top", "Bottom" ], bz, bA, bB;
f.fn.css = function(a, c) {
return arguments.length === 2 && c === b ? this : f.access(this, a, c, !0, function(a, c, d) {
return d !== b ? f.style(a, c, d) : f.css(a, c);
});
}, f.extend({
cssHooks: {
opacity: {
get: function(a, b) {
if (b) {
var c = bz(a, "opacity", "opacity");
return c === "" ? "1" : c;
}
return a.style.opacity;
}
}
},
cssNumber: {
fillOpacity: !0,
fontWeight: !0,
lineHeight: !0,
opacity: !0,
orphans: !0,
widows: !0,
zIndex: !0,
zoom: !0
},
cssProps: {
"float": f.support.cssFloat ? "cssFloat" : "styleFloat"
},
style: function(a, c, d, e) {
if (!a || a.nodeType === 3 || a.nodeType === 8 || !a.style) return;
var g, h, i = f.camelCase(c), j = a.style, k = f.cssHooks[i];
c = f.cssProps[i] || i;
if (d === b) return k && "get" in k && (g = k.get(a, !1, e)) !== b ? g : j[c];
h = typeof d, h === "string" && (g = bv.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
if (d == null || h === "number" && isNaN(d)) return;
h === "number" && !f.cssNumber[i] && (d += "px");
if (!k || !("set" in k) || (d = k.set(a, d)) !== b) try {
j[c] = d;
} catch (l) {}
},
css: function(a, c, d) {
var e, g;
c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
if (g && "get" in g && (e = g.get(a, !0, d)) !== b) return e;
if (bz) return bz(a, c);
},
swap: function(a, b, c) {
var d = {};
for (var e in b) d[e] = a.style[e], a.style[e] = b[e];
c.call(a);
for (e in b) a.style[e] = d[e];
}
}), f.curCSS = f.css, f.each([ "height", "width" ], function(a, b) {
f.cssHooks[b] = {
get: function(a, c, d) {
var e;
if (c) return a.offsetWidth !== 0 ? bC(a, b, d) : (f.swap(a, bw, function() {
e = bC(a, b, d);
}), e);
},
set: function(a, b) {
if (!bt.test(b)) return b;
b = parseFloat(b);
if (b >= 0) return b + "px";
}
};
}), f.support.opacity || (f.cssHooks.opacity = {
get: function(a, b) {
return br.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : "";
},
set: function(a, b) {
var c = a.style, d = a.currentStyle, e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "", g = d && d.filter || c.filter || "";
c.zoom = 1;
if (b >= 1 && f.trim(g.replace(bq, "")) === "") {
c.removeAttribute("filter");
if (d && !d.filter) return;
}
c.filter = bq.test(g) ? g.replace(bq, e) : g + " " + e;
}
}), f(function() {
f.support.reliableMarginRight || (f.cssHooks.marginRight = {
get: function(a, b) {
var c;
return f.swap(a, {
display: "inline-block"
}, function() {
b ? c = bz(a, "margin-right", "marginRight") : c = a.style.marginRight;
}), c;
}
});
}), c.defaultView && c.defaultView.getComputedStyle && (bA = function(a, b) {
var c, d, e;
return b = b.replace(bs, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b))), c;
}), c.documentElement.currentStyle && (bB = function(a, b) {
var c, d, e, f = a.currentStyle && a.currentStyle[b], g = a.style;
return f === null && g && (e = g[b]) && (f = e), !bt.test(f) && bu.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f || 0, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d)), f === "" ? "auto" : f;
}), bz = bA || bB, f.expr && f.expr.filters && (f.expr.filters.hidden = function(a) {
var b = a.offsetWidth, c = a.offsetHeight;
return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none";
}, f.expr.filters.visible = function(a) {
return !f.expr.filters.hidden(a);
});
var bD = /%20/g, bE = /\[\]$/, bF = /\r?\n/g, bG = /#.*$/, bH = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, bI = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, bJ = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, bK = /^(?:GET|HEAD)$/, bL = /^\/\//, bM = /\?/, bN = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, bO = /^(?:select|textarea)/i, bP = /\s+/, bQ = /([?&])_=[^&]*/, bR = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, bS = f.fn.load, bT = {}, bU = {}, bV, bW, bX = [ "*/" ] + [ "*" ];
try {
bV = e.href;
} catch (bY) {
bV = c.createElement("a"), bV.href = "", bV = bV.href;
}
bW = bR.exec(bV.toLowerCase()) || [], f.fn.extend({
load: function(a, c, d) {
if (typeof a != "string" && bS) return bS.apply(this, arguments);
if (!this.length) return this;
var e = a.indexOf(" ");
if (e >= 0) {
var g = a.slice(e, a.length);
a = a.slice(0, e);
}
var h = "GET";
c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
var i = this;
return f.ajax({
url: a,
type: h,
dataType: "html",
data: c,
complete: function(a, b, c) {
c = a.responseText, a.isResolved() && (a.done(function(a) {
c = a;
}), i.html(g ? f("<div>").append(c.replace(bN, "")).find(g) : c)), d && i.each(d, [ c, b, a ]);
}
}), this;
},
serialize: function() {
return f.param(this.serializeArray());
},
serializeArray: function() {
return this.map(function() {
return this.elements ? f.makeArray(this.elements) : this;
}).filter(function() {
return this.name && !this.disabled && (this.checked || bO.test(this.nodeName) || bI.test(this.type));
}).map(function(a, b) {
var c = f(this).val();
return c == null ? null : f.isArray(c) ? f.map(c, function(a, c) {
return {
name: b.name,
value: a.replace(bF, "\r\n")
};
}) : {
name: b.name,
value: c.replace(bF, "\r\n")
};
}).get();
}
}), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
f.fn[b] = function(a) {
return this.on(b, a);
};
}), f.each([ "get", "post" ], function(a, c) {
f[c] = function(a, d, e, g) {
return f.isFunction(d) && (g = g || e, e = d, d = b), f.ajax({
type: c,
url: a,
data: d,
success: e,
dataType: g
});
};
}), f.extend({
getScript: function(a, c) {
return f.get(a, b, c, "script");
},
getJSON: function(a, b, c) {
return f.get(a, b, c, "json");
},
ajaxSetup: function(a, b) {
return b ? b_(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), b_(a, b), a;
},
ajaxSettings: {
url: bV,
isLocal: bJ.test(bW[1]),
global: !0,
type: "GET",
contentType: "application/x-www-form-urlencoded",
processData: !0,
async: !0,
accepts: {
xml: "application/xml, text/xml",
html: "text/html",
text: "text/plain",
json: "application/json, text/javascript",
"*": bX
},
contents: {
xml: /xml/,
html: /html/,
json: /json/
},
responseFields: {
xml: "responseXML",
text: "responseText"
},
converters: {
"* text": a.String,
"text html": !0,
"text json": f.parseJSON,
"text xml": f.parseXML
},
flatOptions: {
context: !0,
url: !0
}
},
ajaxPrefilter: bZ(bT),
ajaxTransport: bZ(bU),
ajax: function(a, c) {
function w(a, c, l, m) {
if (s === 2) return;
s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
var o, r, u, w = c, x = l ? cb(d, v, l) : b, y, z;
if (a >= 200 && a < 300 || a === 304) {
if (d.ifModified) {
if (y = v.getResponseHeader("Last-Modified")) f.lastModified[k] = y;
if (z = v.getResponseHeader("Etag")) f.etag[k] = z;
}
if (a === 304) w = "notmodified", o = !0; else try {
r = cc(d, x), w = "success", o = !0;
} catch (A) {
w = "parsererror", u = A;
}
} else {
u = w;
if (!w || a) w = "error", a < 0 && (a = 0);
}
v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [ r, w, v ]) : h.rejectWith(e, [ v, w, u ]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [ v, d, o ? r : u ]), i.fireWith(e, [ v, w ]), t && (g.trigger("ajaxComplete", [ v, d ]), --f.active || f.event.trigger("ajaxStop"));
}
typeof a == "object" && (c = a, a = b), c = c || {};
var d = f.ajaxSetup({}, c), e = d.context || d, g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event, h = f.Deferred(), i = f.Callbacks("once memory"), j = d.statusCode || {}, k, l = {}, m = {}, n, o, p, q, r, s = 0, t, u, v = {
readyState: 0,
setRequestHeader: function(a, b) {
if (!s) {
var c = a.toLowerCase();
a = m[c] = m[c] || a, l[a] = b;
}
return this;
},
getAllResponseHeaders: function() {
return s === 2 ? n : null;
},
getResponseHeader: function(a) {
var c;
if (s === 2) {
if (!o) {
o = {};
while (c = bH.exec(n)) o[c[1].toLowerCase()] = c[2];
}
c = o[a.toLowerCase()];
}
return c === b ? null : c;
},
overrideMimeType: function(a) {
return s || (d.mimeType = a), this;
},
abort: function(a) {
return a = a || "abort", p && p.abort(a), w(0, a), this;
}
};
h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function(a) {
if (a) {
var b;
if (s < 2) for (b in a) j[b] = [ j[b], a[b] ]; else b = a[v.status], v.then(b, b);
}
return this;
}, d.url = ((a || d.url) + "").replace(bG, "").replace(bL, bW[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bP), d.crossDomain == null && (r = bR.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bW[1] && r[2] == bW[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bW[3] || (bW[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), b$(bT, d, c, v);
if (s === 2) return !1;
t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bK.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
if (!d.hasContent) {
d.data && (d.url += (bM.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
if (d.cache === !1) {
var x = f.now(), y = d.url.replace(bQ, "$1_=" + x);
d.url = y + (y === d.url ? (bM.test(d.url) ? "&" : "?") + "_=" + x : "");
}
}
(d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bX + "; q=0.01" : "") : d.accepts["*"]);
for (u in d.headers) v.setRequestHeader(u, d.headers[u]);
if (!d.beforeSend || d.beforeSend.call(e, v, d) !== !1 && s !== 2) {
for (u in {
success: 1,
error: 1,
complete: 1
}) v[u](d[u]);
p = b$(bU, d, c, v);
if (!p) w(-1, "No Transport"); else {
v.readyState = 1, t && g.trigger("ajaxSend", [ v, d ]), d.async && d.timeout > 0 && (q = setTimeout(function() {
v.abort("timeout");
}, d.timeout));
try {
s = 1, p.send(l, w);
} catch (z) {
if (s < 2) w(-1, z); else throw z;
}
}
return v;
}
return v.abort(), !1;
},
param: function(a, c) {
var d = [], e = function(a, b) {
b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
};
c === b && (c = f.ajaxSettings.traditional);
if (f.isArray(a) || a.jquery && !f.isPlainObject(a)) f.each(a, function() {
e(this.name, this.value);
}); else for (var g in a) ca(g, a[g], c, e);
return d.join("&").replace(bD, "+");
}
}), f.extend({
active: 0,
lastModified: {},
etag: {}
});
var cd = f.now(), ce = /(\=)\?(&|$)|\?\?/i;
f.ajaxSetup({
jsonp: "callback",
jsonpCallback: function() {
return f.expando + "_" + cd++;
}
}), f.ajaxPrefilter("json jsonp", function(b, c, d) {
var e = b.contentType === "application/x-www-form-urlencoded" && typeof b.data == "string";
if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (ce.test(b.url) || e && ce.test(b.data))) {
var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, i = a[h], j = b.url, k = b.data, l = "$1" + h + "$2";
return b.jsonp !== !1 && (j = j.replace(ce, l), b.url === j && (e && (k = k.replace(ce, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function(a) {
g = [ a ];
}, d.always(function() {
a[h] = i, g && f.isFunction(i) && a[h](g[0]);
}), b.converters["script json"] = function() {
return g || f.error(h + " was not called"), g[0];
}, b.dataTypes[0] = "json", "script";
}
}), f.ajaxSetup({
accepts: {
script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
},
contents: {
script: /javascript|ecmascript/
},
converters: {
"text script": function(a) {
return f.globalEval(a), a;
}
}
}), f.ajaxPrefilter("script", function(a) {
a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1);
}), f.ajaxTransport("script", function(a) {
if (a.crossDomain) {
var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
return {
send: function(f, g) {
d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function(a, c) {
if (c || !d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success");
}, e.insertBefore(d, e.firstChild);
},
abort: function() {
d && d.onload(0, 1);
}
};
}
});
var cf = a.ActiveXObject ? function() {
for (var a in ch) ch[a](0, 1);
} : !1, cg = 0, ch;
f.ajaxSettings.xhr = a.ActiveXObject ? function() {
return !this.isLocal && ci() || cj();
} : ci, function(a) {
f.extend(f.support, {
ajax: !!a,
cors: !!a && "withCredentials" in a
});
}(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function(c) {
if (!c.crossDomain || f.support.cors) {
var d;
return {
send: function(e, g) {
var h = c.xhr(), i, j;
c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
if (c.xhrFields) for (j in c.xhrFields) h[j] = c.xhrFields[j];
c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
try {
for (j in e) h.setRequestHeader(j, e[j]);
} catch (k) {}
h.send(c.hasContent && c.data || null), d = function(a, e) {
var j, k, l, m, n;
try {
if (d && (e || h.readyState === 4)) {
d = b, i && (h.onreadystatechange = f.noop, cf && delete ch[i]);
if (e) h.readyState !== 4 && h.abort(); else {
j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n), m.text = h.responseText;
try {
k = h.statusText;
} catch (o) {
k = "";
}
!j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204);
}
}
} catch (p) {
e || g(-1, p);
}
m && g(j, k, m, l);
}, !c.async || h.readyState === 4 ? d() : (i = ++cg, cf && (ch || (ch = {}, f(a).unload(cf)), ch[i] = d), h.onreadystatechange = d);
},
abort: function() {
d && d(0, 1);
}
};
}
});
var ck = {}, cl, cm, cn = /^(?:toggle|show|hide)$/, co = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, cp, cq = [ [ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ], [ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ], [ "opacity" ] ], cr;
f.fn.extend({
show: function(a, b, c) {
var d, e;
if (a || a === 0) return this.animate(cu("show", 3), a, b, c);
for (var g = 0, h = this.length; g < h; g++) d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), e === "" && f.css(d, "display") === "none" && f._data(d, "olddisplay", cv(d.nodeName)));
for (g = 0; g < h; g++) {
d = this[g];
if (d.style) {
e = d.style.display;
if (e === "" || e === "none") d.style.display = f._data(d, "olddisplay") || "";
}
}
return this;
},
hide: function(a, b, c) {
if (a || a === 0) return this.animate(cu("hide", 3), a, b, c);
var d, e, g = 0, h = this.length;
for (; g < h; g++) d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
for (g = 0; g < h; g++) this[g].style && (this[g].style.display = "none");
return this;
},
_toggle: f.fn.toggle,
toggle: function(a, b, c) {
var d = typeof a == "boolean";
return f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function() {
var b = d ? a : f(this).is(":hidden");
f(this)[b ? "show" : "hide"]();
}) : this.animate(cu("toggle", 3), a, b, c), this;
},
fadeTo: function(a, b, c, d) {
return this.filter(":hidden").css("opacity", 0).show().end().animate({
opacity: b
}, a, c, d);
},
animate: function(a, b, c, d) {
function g() {
e.queue === !1 && f._mark(this);
var b = f.extend({}, e), c = this.nodeType === 1, d = c && f(this).is(":hidden"), g, h, i, j, k, l, m, n, o;
b.animatedProperties = {};
for (i in a) {
g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]), h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
if (h === "hide" && d || h === "show" && !d) return b.complete.call(this);
c && (g === "height" || g === "width") && (b.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cv(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1));
}
b.overflow != null && (this.style.overflow = "hidden");
for (i in a) j = new f.fx(this, b, i), h = a[i], cn.test(h) ? (o = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), o ? (f._data(this, "toggle" + i, o === "show" ? "hide" : "show"), j[o]()) : j[h]()) : (k = co.exec(h), l = j.cur(), k ? (m = parseFloat(k[2]), n = k[3] || (f.cssNumber[i] ? "" : "px"), n !== "px" && (f.style(this, i, (m || 1) + n), l = (m || 1) / j.cur() * l, f.style(this, i, l + n)), k[1] && (m = (k[1] === "-=" ? -1 : 1) * m + l), j.custom(l, m, n)) : j.custom(l, h, ""));
return !0;
}
var e = f.speed(b, c, d);
return f.isEmptyObject(a) ? this.each(e.complete, [ !1 ]) : (a = f.extend({}, a), e.queue === !1 ? this.each(g) : this.queue(e.queue, g));
},
stop: function(a, c, d) {
return typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), this.each(function() {
function h(a, b, c) {
var e = b[c];
f.removeData(a, c, !0), e.stop(d);
}
var b, c = !1, e = f.timers, g = f._data(this);
d || f._unmark(!0, this);
if (a == null) for (b in g) g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b); else g[b = a + ".run"] && g[b].stop && h(this, g, b);
for (b = e.length; b--; ) e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1));
(!d || !c) && f.dequeue(this, a);
});
}
}), f.each({
slideDown: cu("show", 1),
slideUp: cu("hide", 1),
slideToggle: cu("toggle", 1),
fadeIn: {
opacity: "show"
},
fadeOut: {
opacity: "hide"
},
fadeToggle: {
opacity: "toggle"
}
}, function(a, b) {
f.fn[a] = function(a, c, d) {
return this.animate(b, a, c, d);
};
}), f.extend({
speed: function(a, b, c) {
var d = a && typeof a == "object" ? f.extend({}, a) : {
complete: c || !c && b || f.isFunction(a) && a,
duration: a,
easing: c && b || b && !f.isFunction(b) && b
};
d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
if (d.queue == null || d.queue === !0) d.queue = "fx";
return d.old = d.complete, d.complete = function(a) {
f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this);
}, d;
},
easing: {
linear: function(a, b, c, d) {
return c + d * a;
},
swing: function(a, b, c, d) {
return (-Math.cos(a * Math.PI) / 2 + .5) * d + c;
}
},
timers: [],
fx: function(a, b, c) {
this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {};
}
}), f.fx.prototype = {
update: function() {
this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this);
},
cur: function() {
if (this.elem[this.prop] == null || !!this.elem.style && this.elem.style[this.prop] != null) {
var a, b = f.css(this.elem, this.prop);
return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a;
}
return this.elem[this.prop];
},
custom: function(a, c, d) {
function h(a) {
return e.step(a);
}
var e = this, g = f.fx;
this.startTime = cr || cs(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function() {
e.options.hide && f._data(e.elem, "fxshow" + e.prop) === b && f._data(e.elem, "fxshow" + e.prop, e.start);
}, h() && f.timers.push(h) && !cp && (cp = setInterval(g.tick, g.interval));
},
show: function() {
var a = f._data(this.elem, "fxshow" + this.prop);
this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show();
},
hide: function() {
this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0);
},
step: function(a) {
var b, c, d, e = cr || cs(), g = !0, h = this.elem, i = this.options;
if (a || e >= i.duration + this.startTime) {
this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
for (b in i.animatedProperties) i.animatedProperties[b] !== !0 && (g = !1);
if (g) {
i.overflow != null && !f.support.shrinkWrapBlocks && f.each([ "", "X", "Y" ], function(a, b) {
h.style["overflow" + b] = i.overflow[a];
}), i.hide && f(h).hide();
if (i.hide || i.show) for (b in i.animatedProperties) f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
d = i.complete, d && (i.complete = !1, d.call(h));
}
return !1;
}
return i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update(), !0;
}
}, f.extend(f.fx, {
tick: function() {
var a, b = f.timers, c = 0;
for (; c < b.length; c++) a = b[c], !a() && b[c] === a && b.splice(c--, 1);
b.length || f.fx.stop();
},
interval: 13,
stop: function() {
clearInterval(cp), cp = null;
},
speeds: {
slow: 600,
fast: 200,
_default: 400
},
step: {
opacity: function(a) {
f.style(a.elem, "opacity", a.now);
},
_default: function(a) {
a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now;
}
}
}), f.each([ "width", "height" ], function(a, b) {
f.fx.step[b] = function(a) {
f.style(a.elem, b, Math.max(0, a.now) + a.unit);
};
}), f.expr && f.expr.filters && (f.expr.filters.animated = function(a) {
return f.grep(f.timers, function(b) {
return a === b.elem;
}).length;
});
var cw = /^t(?:able|d|h)$/i, cx = /^(?:body|html)$/i;
"getBoundingClientRect" in c.documentElement ? f.fn.offset = function(a) {
var b = this[0], c;
if (a) return this.each(function(b) {
f.offset.setOffset(this, a, b);
});
if (!b || !b.ownerDocument) return null;
if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
try {
c = b.getBoundingClientRect();
} catch (d) {}
var e = b.ownerDocument, g = e.documentElement;
if (!c || !f.contains(g, b)) return c ? {
top: c.top,
left: c.left
} : {
top: 0,
left: 0
};
var h = e.body, i = cy(e), j = g.clientTop || h.clientTop || 0, k = g.clientLeft || h.clientLeft || 0, l = i.pageYOffset || f.support.boxModel && g.scrollTop || h.scrollTop, m = i.pageXOffset || f.support.boxModel && g.scrollLeft || h.scrollLeft, n = c.top + l - j, o = c.left + m - k;
return {
top: n,
left: o
};
} : f.fn.offset = function(a) {
var b = this[0];
if (a) return this.each(function(b) {
f.offset.setOffset(this, a, b);
});
if (!b || !b.ownerDocument) return null;
if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
var c, d = b.offsetParent, e = b, g = b.ownerDocument, h = g.documentElement, i = g.body, j = g.defaultView, k = j ? j.getComputedStyle(b, null) : b.currentStyle, l = b.offsetTop, m = b.offsetLeft;
while ((b = b.parentNode) && b !== i && b !== h) {
if (f.support.fixedPosition && k.position === "fixed") break;
c = j ? j.getComputedStyle(b, null) : b.currentStyle, l -= b.scrollTop, m -= b.scrollLeft, b === d && (l += b.offsetTop, m += b.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(b.nodeName)) && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), e = d, d = b.offsetParent), f.support.subtractsBorderForOverflowNotVisible && c.overflow !== "visible" && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), k = c;
}
if (k.position === "relative" || k.position === "static") l += i.offsetTop, m += i.offsetLeft;
return f.support.fixedPosition && k.position === "fixed" && (l += Math.max(h.scrollTop, i.scrollTop), m += Math.max(h.scrollLeft, i.scrollLeft)), {
top: l,
left: m
};
}, f.offset = {
bodyOffset: function(a) {
var b = a.offsetTop, c = a.offsetLeft;
return f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0), {
top: b,
left: c
};
},
setOffset: function(a, b, c) {
var d = f.css(a, "position");
d === "static" && (a.style.position = "relative");
var e = f(a), g = e.offset(), h = f.css(a, "top"), i = f.css(a, "left"), j = (d === "absolute" || d === "fixed") && f.inArray("auto", [ h, i ]) > -1, k = {}, l = {}, m, n;
j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k);
}
}, f.fn.extend({
position: function() {
if (!this[0]) return null;
var a = this[0], b = this.offsetParent(), c = this.offset(), d = cx.test(b[0].nodeName) ? {
top: 0,
left: 0
} : b.offset();
return c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0, {
top: c.top - d.top,
left: c.left - d.left
};
},
offsetParent: function() {
return this.map(function() {
var a = this.offsetParent || c.body;
while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static") a = a.offsetParent;
return a;
});
}
}), f.each([ "Left", "Top" ], function(a, c) {
var d = "scroll" + c;
f.fn[d] = function(c) {
var e, g;
return c === b ? (e = this[0], e ? (g = cy(e), g ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : f.support.boxModel && g.document.documentElement[d] || g.document.body[d] : e[d]) : null) : this.each(function() {
g = cy(this), g ? g.scrollTo(a ? f(g).scrollLeft() : c, a ? c : f(g).scrollTop()) : this[d] = c;
});
};
}), f.each([ "Height", "Width" ], function(a, c) {
var d = c.toLowerCase();
f.fn["inner" + c] = function() {
var a = this[0];
return a ? a.style ? parseFloat(f.css(a, d, "padding")) : this[d]() : null;
}, f.fn["outer" + c] = function(a) {
var b = this[0];
return b ? b.style ? parseFloat(f.css(b, d, a ? "margin" : "border")) : this[d]() : null;
}, f.fn[d] = function(a) {
var e = this[0];
if (!e) return a == null ? null : this;
if (f.isFunction(a)) return this.each(function(b) {
var c = f(this);
c[d](a.call(this, b, c[d]()));
});
if (f.isWindow(e)) {
var g = e.document.documentElement["client" + c], h = e.document.body;
return e.document.compatMode === "CSS1Compat" && g || h && h["client" + c] || g;
}
if (e.nodeType === 9) return Math.max(e.documentElement["client" + c], e.body["scroll" + c], e.documentElement["scroll" + c], e.body["offset" + c], e.documentElement["offset" + c]);
if (a === b) {
var i = f.css(e, d), j = parseFloat(i);
return f.isNumeric(j) ? j : i;
}
return this.css(d, typeof a == "string" ? a : a + "px");
};
}), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function() {
return f;
});
})(window), function(a, b) {
function c(b, c) {
var e = b.nodeName.toLowerCase();
if ("area" === e) {
var f = b.parentNode, g = f.name, h;
return !b.href || !g || f.nodeName.toLowerCase() !== "map" ? !1 : (h = a("img[usemap=#" + g + "]")[0], !!h && d(h));
}
return (/input|select|textarea|button|object/.test(e) ? !b.disabled : "a" == e ? b.href || c : c) && d(b);
}
function d(b) {
return !a(b).parents().andSelf().filter(function() {
return a.curCSS(this, "visibility") === "hidden" || a.expr.filters.hidden(this);
}).length;
}
a.ui = a.ui || {};
if (a.ui.version) return;
a.extend(a.ui, {
version: "1.8.16",
keyCode: {
ALT: 18,
BACKSPACE: 8,
CAPS_LOCK: 20,
COMMA: 188,
COMMAND: 91,
COMMAND_LEFT: 91,
COMMAND_RIGHT: 93,
CONTROL: 17,
DELETE: 46,
DOWN: 40,
END: 35,
ENTER: 13,
ESCAPE: 27,
HOME: 36,
INSERT: 45,
LEFT: 37,
MENU: 93,
NUMPAD_ADD: 107,
NUMPAD_DECIMAL: 110,
NUMPAD_DIVIDE: 111,
NUMPAD_ENTER: 108,
NUMPAD_MULTIPLY: 106,
NUMPAD_SUBTRACT: 109,
PAGE_DOWN: 34,
PAGE_UP: 33,
PERIOD: 190,
RIGHT: 39,
SHIFT: 16,
SPACE: 32,
TAB: 9,
UP: 38,
WINDOWS: 91
}
}), a.fn.extend({
propAttr: a.fn.prop || a.fn.attr,
_focus: a.fn.focus,
focus: function(b, c) {
return typeof b == "number" ? this.each(function() {
var d = this;
setTimeout(function() {
a(d).focus(), c && c.call(d);
}, b);
}) : this._focus.apply(this, arguments);
},
scrollParent: function() {
var b;
return a.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? b = this.parents().filter(function() {
return /(relative|absolute|fixed)/.test(a.curCSS(this, "position", 1)) && /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1));
}).eq(0) : b = this.parents().filter(function() {
return /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1));
}).eq(0), /fixed/.test(this.css("position")) || !b.length ? a(document) : b;
},
zIndex: function(c) {
if (c !== b) return this.css("zIndex", c);
if (this.length) {
var d = a(this[0]), e, f;
while (d.length && d[0] !== document) {
e = d.css("position");
if (e === "absolute" || e === "relative" || e === "fixed") {
f = parseInt(d.css("zIndex"), 10);
if (!isNaN(f) && f !== 0) return f;
}
d = d.parent();
}
}
return 0;
},
disableSelection: function() {
return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(a) {
a.preventDefault();
});
},
enableSelection: function() {
return this.unbind(".ui-disableSelection");
}
}), a.each([ "Width", "Height" ], function(c, d) {
function h(b, c, d, f) {
return a.each(e, function() {
c -= parseFloat(a.curCSS(b, "padding" + this, !0)) || 0, d && (c -= parseFloat(a.curCSS(b, "border" + this + "Width", !0)) || 0), f && (c -= parseFloat(a.curCSS(b, "margin" + this, !0)) || 0);
}), c;
}
var e = d === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ], f = d.toLowerCase(), g = {
innerWidth: a.fn.innerWidth,
innerHeight: a.fn.innerHeight,
outerWidth: a.fn.outerWidth,
outerHeight: a.fn.outerHeight
};
a.fn["inner" + d] = function(c) {
return c === b ? g["inner" + d].call(this) : this.each(function() {
a(this).css(f, h(this, c) + "px");
});
}, a.fn["outer" + d] = function(b, c) {
return typeof b != "number" ? g["outer" + d].call(this, b) : this.each(function() {
a(this).css(f, h(this, b, !0, c) + "px");
});
};
}), a.extend(a.expr[":"], {
data: function(b, c, d) {
return !!a.data(b, d[3]);
},
focusable: function(b) {
return c(b, !isNaN(a.attr(b, "tabindex")));
},
tabbable: function(b) {
var d = a.attr(b, "tabindex"), e = isNaN(d);
return (e || d >= 0) && c(b, !e);
}
}), a(function() {
var b = document.body, c = b.appendChild(c = document.createElement("div"));
a.extend(c.style, {
minHeight: "100px",
height: "auto",
padding: 0,
borderWidth: 0
}), a.support.minHeight = c.offsetHeight === 100, a.support.selectstart = "onselectstart" in c, b.removeChild(c).style.display = "none";
}), a.extend(a.ui, {
plugin: {
add: function(b, c, d) {
var e = a.ui[b].prototype;
for (var f in d) e.plugins[f] = e.plugins[f] || [], e.plugins[f].push([ c, d[f] ]);
},
call: function(a, b, c) {
var d = a.plugins[b];
if (!d || !a.element[0].parentNode) return;
for (var e = 0; e < d.length; e++) a.options[d[e][0]] && d[e][1].apply(a.element, c);
}
},
contains: function(a, b) {
return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b);
},
hasScroll: function(b, c) {
if (a(b).css("overflow") === "hidden") return !1;
var d = c && c === "left" ? "scrollLeft" : "scrollTop", e = !1;
return b[d] > 0 ? !0 : (b[d] = 1, e = b[d] > 0, b[d] = 0, e);
},
isOverAxis: function(a, b, c) {
return a > b && a < b + c;
},
isOver: function(b, c, d, e, f, g) {
return a.ui.isOverAxis(b, d, f) && a.ui.isOverAxis(c, e, g);
}
});
}(jQuery), function(a, b) {
if (a.cleanData) {
var c = a.cleanData;
a.cleanData = function(b) {
for (var d = 0, e; (e = b[d]) != null; d++) try {
a(e).triggerHandler("remove");
} catch (f) {}
c(b);
};
} else {
var d = a.fn.remove;
a.fn.remove = function(b, c) {
return this.each(function() {
return c || (!b || a.filter(b, [ this ]).length) && a("*", this).add([ this ]).each(function() {
try {
a(this).triggerHandler("remove");
} catch (b) {}
}), d.call(a(this), b, c);
});
};
}
a.widget = function(b, c, d) {
var e = b.split(".")[0], f;
b = b.split(".")[1], f = e + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][f] = function(c) {
return !!a.data(c, b);
}, a[e] = a[e] || {}, a[e][b] = function(a, b) {
arguments.length && this._createWidget(a, b);
};
var g = new c;
g.options = a.extend(!0, {}, g.options), a[e][b].prototype = a.extend(!0, g, {
namespace: e,
widgetName: b,
widgetEventPrefix: a[e][b].prototype.widgetEventPrefix || b,
widgetBaseClass: f
}, d), a.widget.bridge(b, a[e][b]);
}, a.widget.bridge = function(c, d) {
a.fn[c] = function(e) {
var f = typeof e == "string", g = Array.prototype.slice.call(arguments, 1), h = this;
return e = !f && g.length ? a.extend.apply(null, [ !0, e ].concat(g)) : e, f && e.charAt(0) === "_" ? h : (f ? this.each(function() {
var d = a.data(this, c), f = d && a.isFunction(d[e]) ? d[e].apply(d, g) : d;
if (f !== d && f !== b) return h = f, !1;
}) : this.each(function() {
var b = a.data(this, c);
b ? b.option(e || {})._init() : a.data(this, c, new d(e, this));
}), h);
};
}, a.Widget = function(a, b) {
arguments.length && this._createWidget(a, b);
}, a.Widget.prototype = {
widgetName: "widget",
widgetEventPrefix: "",
options: {
disabled: !1
},
_createWidget: function(b, c) {
a.data(c, this.widgetName, this), this.element = a(c), this.options = a.extend(!0, {}, this.options, this._getCreateOptions(), b);
var d = this;
this.element.bind("remove." + this.widgetName, function() {
d.destroy();
}), this._create(), this._trigger("create"), this._init();
},
_getCreateOptions: function() {
return a.metadata && a.metadata.get(this.element[0])[this.widgetName];
},
_create: function() {},
_init: function() {},
destroy: function() {
this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled " + "ui-state-disabled");
},
widget: function() {
return this.element;
},
option: function(c, d) {
var e = c;
if (arguments.length === 0) return a.extend({}, this.options);
if (typeof c == "string") {
if (d === b) return this.options[c];
e = {}, e[c] = d;
}
return this._setOptions(e), this;
},
_setOptions: function(b) {
var c = this;
return a.each(b, function(a, b) {
c._setOption(a, b);
}), this;
},
_setOption: function(a, b) {
return this.options[a] = b, a === "disabled" && this.widget()[b ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled" + " " + "ui-state-disabled").attr("aria-disabled", b), this;
},
enable: function() {
return this._setOption("disabled", !1);
},
disable: function() {
return this._setOption("disabled", !0);
},
_trigger: function(b, c, d) {
var e = this.options[b];
c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), d = d || {};
if (c.originalEvent) for (var f = a.event.props.length, g; f; ) g = a.event.props[--f], c[g] = c.originalEvent[g];
return this.element.trigger(c, d), !(a.isFunction(e) && e.call(this.element[0], c, d) === !1 || c.isDefaultPrevented());
}
};
}(jQuery), function(a, b) {
var c = !1;
a(document).mouseup(function(a) {
c = !1;
}), a.widget("ui.mouse", {
options: {
cancel: ":input,option",
distance: 1,
delay: 0
},
_mouseInit: function() {
var b = this;
this.element.bind("mousedown." + this.widgetName, function(a) {
return b._mouseDown(a);
}).bind("click." + this.widgetName, function(c) {
if (!0 === a.data(c.target, b.widgetName + ".preventClickEvent")) return a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1;
}), this.started = !1;
},
_mouseDestroy: function() {
this.element.unbind("." + this.widgetName);
},
_mouseDown: function(b) {
if (c) return;
this._mouseStarted && this._mouseUp(b), this._mouseDownEvent = b;
var d = this, e = b.which == 1, f = typeof this.options.cancel == "string" && b.target.nodeName ? a(b.target).closest(this.options.cancel).length : !1;
if (!e || f || !this._mouseCapture(b)) return !0;
this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
d.mouseDelayMet = !0;
}, this.options.delay));
if (this._mouseDistanceMet(b) && this._mouseDelayMet(b)) {
this._mouseStarted = this._mouseStart(b) !== !1;
if (!this._mouseStarted) return b.preventDefault(), !0;
}
return !0 === a.data(b.target, this.widgetName + ".preventClickEvent") && a.removeData(b.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(a) {
return d._mouseMove(a);
}, this._mouseUpDelegate = function(a) {
return d._mouseUp(a);
}, a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), b.preventDefault(), c = !0, !0;
},
_mouseMove: function(b) {
return !a.browser.msie || document.documentMode >= 9 || !!b.button ? this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted) : this._mouseUp(b);
},
_mouseUp: function(b) {
return a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, b.target == this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b)), !1;
},
_mouseDistanceMet: function(a) {
return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance;
},
_mouseDelayMet: function(a) {
return this.mouseDelayMet;
},
_mouseStart: function(a) {},
_mouseDrag: function(a) {},
_mouseStop: function(a) {},
_mouseCapture: function(a) {
return !0;
}
});
}(jQuery), function(a, b) {
a.ui = a.ui || {};
var c = /left|center|right/, d = /top|center|bottom/, e = "center", f = a.fn.position, g = a.fn.offset;
a.fn.position = function(b) {
if (!b || !b.of) return f.apply(this, arguments);
b = a.extend({}, b);
var g = a(b.of), h = g[0], i = (b.collision || "flip").split(" "), j = b.offset ? b.offset.split(" ") : [ 0, 0 ], k, l, m;
return h.nodeType === 9 ? (k = g.width(), l = g.height(), m = {
top: 0,
left: 0
}) : h.setTimeout ? (k = g.width(), l = g.height(), m = {
top: g.scrollTop(),
left: g.scrollLeft()
}) : h.preventDefault ? (b.at = "left top", k = l = 0, m = {
top: b.of.pageY,
left: b.of.pageX
}) : (k = g.outerWidth(), l = g.outerHeight(), m = g.offset()), a.each([ "my", "at" ], function() {
var a = (b[this] || "").split(" ");
a.length === 1 && (a = c.test(a[0]) ? a.concat([ e ]) : d.test(a[0]) ? [ e ].concat(a) : [ e, e ]), a[0] = c.test(a[0]) ? a[0] : e, a[1] = d.test(a[1]) ? a[1] : e, b[this] = a;
}), i.length === 1 && (i[1] = i[0]), j[0] = parseInt(j[0], 10) || 0, j.length === 1 && (j[1] = j[0]), j[1] = parseInt(j[1], 10) || 0, b.at[0] === "right" ? m.left += k : b.at[0] === e && (m.left += k / 2), b.at[1] === "bottom" ? m.top += l : b.at[1] === e && (m.top += l / 2), m.left += j[0], m.top += j[1], this.each(function() {
var c = a(this), d = c.outerWidth(), f = c.outerHeight(), g = parseInt(a.curCSS(this, "marginLeft", !0)) || 0, h = parseInt(a.curCSS(this, "marginTop", !0)) || 0, n = d + g + (parseInt(a.curCSS(this, "marginRight", !0)) || 0), o = f + h + (parseInt(a.curCSS(this, "marginBottom", !0)) || 0), p = a.extend({}, m), q;
b.my[0] === "right" ? p.left -= d : b.my[0] === e && (p.left -= d / 2), b.my[1] === "bottom" ? p.top -= f : b.my[1] === e && (p.top -= f / 2), p.left = Math.round(p.left), p.top = Math.round(p.top), q = {
left: p.left - g,
top: p.top - h
}, a.each([ "left", "top" ], function(c, e) {
a.ui.position[i[c]] && a.ui.position[i[c]][e](p, {
targetWidth: k,
targetHeight: l,
elemWidth: d,
elemHeight: f,
collisionPosition: q,
collisionWidth: n,
collisionHeight: o,
offset: j,
my: b.my,
at: b.at
});
}), a.fn.bgiframe && c.bgiframe(), c.offset(a.extend(p, {
using: b.using
}));
});
}, a.ui.position = {
fit: {
left: function(b, c) {
var d = a(window), e = c.collisionPosition.left + c.collisionWidth - d.width() - d.scrollLeft();
b.left = e > 0 ? b.left - e : Math.max(b.left - c.collisionPosition.left, b.left);
},
top: function(b, c) {
var d = a(window), e = c.collisionPosition.top + c.collisionHeight - d.height() - d.scrollTop();
b.top = e > 0 ? b.top - e : Math.max(b.top - c.collisionPosition.top, b.top);
}
},
flip: {
left: function(b, c) {
if (c.at[0] === e) return;
var d = a(window), f = c.collisionPosition.left + c.collisionWidth - d.width() - d.scrollLeft(), g = c.my[0] === "left" ? -c.elemWidth : c.my[0] === "right" ? c.elemWidth : 0, h = c.at[0] === "left" ? c.targetWidth : -c.targetWidth, i = -2 * c.offset[0];
b.left += c.collisionPosition.left < 0 ? g + h + i : f > 0 ? g + h + i : 0;
},
top: function(b, c) {
if (c.at[1] === e) return;
var d = a(window), f = c.collisionPosition.top + c.collisionHeight - d.height() - d.scrollTop(), g = c.my[1] === "top" ? -c.elemHeight : c.my[1] === "bottom" ? c.elemHeight : 0, h = c.at[1] === "top" ? c.targetHeight : -c.targetHeight, i = -2 * c.offset[1];
b.top += c.collisionPosition.top < 0 ? g + h + i : f > 0 ? g + h + i : 0;
}
}
}, a.offset.setOffset || (a.offset.setOffset = function(b, c) {
/static/.test(a.curCSS(b, "position")) && (b.style.position = "relative");
var d = a(b), e = d.offset(), f = parseInt(a.curCSS(b, "top", !0), 10) || 0, g = parseInt(a.curCSS(b, "left", !0), 10) || 0, h = {
top: c.top - e.top + f,
left: c.left - e.left + g
};
"using" in c ? c.using.call(b, h) : d.css(h);
}, a.fn.offset = function(b) {
var c = this[0];
return !c || !c.ownerDocument ? null : b ? this.each(function() {
a.offset.setOffset(this, b);
}) : g.call(this);
});
}(jQuery), function(a, b) {
a.widget("ui.accordion", {
options: {
active: 0,
animated: "slide",
autoHeight: !0,
clearStyle: !1,
collapsible: !1,
event: "click",
fillSpace: !1,
header: "> li > :first-child,> :not(li):even",
icons: {
header: "ui-icon-triangle-1-e",
headerSelected: "ui-icon-triangle-1-s"
},
navigation: !1,
navigationFilter: function() {
return this.href.toLowerCase() === location.href.toLowerCase();
}
},
_create: function() {
var b = this, c = b.options;
b.running = 0, b.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix"), b.headers = b.element.find(c.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function() {
if (c.disabled) return;
a(this).addClass("ui-state-hover");
}).bind("mouseleave.accordion", function() {
if (c.disabled) return;
a(this).removeClass("ui-state-hover");
}).bind("focus.accordion", function() {
if (c.disabled) return;
a(this).addClass("ui-state-focus");
}).bind("blur.accordion", function() {
if (c.disabled) return;
a(this).removeClass("ui-state-focus");
}), b.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
if (c.navigation) {
var d = b.element.find("a").filter(c.navigationFilter).eq(0);
if (d.length) {
var e = d.closest(".ui-accordion-header");
e.length ? b.active = e : b.active = d.closest(".ui-accordion-content").prev();
}
}
b.active = b._findActive(b.active || c.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top"), b.active.next().addClass("ui-accordion-content-active"), b._createIcons(), b.resize(), b.element.attr("role", "tablist"), b.headers.attr("role", "tab").bind("keydown.accordion", function(a) {
return b._keydown(a);
}).next().attr("role", "tabpanel"), b.headers.not(b.active || "").attr({
"aria-expanded": "false",
"aria-selected": "false",
tabIndex: -1
}).next().hide(), b.active.length ? b.active.attr({
"aria-expanded": "true",
"aria-selected": "true",
tabIndex: 0
}) : b.headers.eq(0).attr("tabIndex", 0), a.browser.safari || b.headers.find("a").attr("tabIndex", -1), c.event && b.headers.bind(c.event.split(" ").join(".accordion ") + ".accordion", function(a) {
b._clickHandler.call(b, a, this), a.preventDefault();
});
},
_createIcons: function() {
var b = this.options;
b.icons && (a("<span></span>").addClass("ui-icon " + b.icons.header).prependTo(this.headers), this.active.children(".ui-icon").toggleClass(b.icons.header).toggleClass(b.icons.headerSelected), this.element.addClass("ui-accordion-icons"));
},
_destroyIcons: function() {
this.headers.children(".ui-icon").remove(), this.element.removeClass("ui-accordion-icons");
},
destroy: function() {
var b = this.options;
this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex"), this.headers.find("a").removeAttr("tabIndex"), this._destroyIcons();
var c = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
return (b.autoHeight || b.fillHeight) && c.css("height", ""), a.Widget.prototype.destroy.call(this);
},
_setOption: function(b, c) {
a.Widget.prototype._setOption.apply(this, arguments), b == "active" && this.activate(c), b == "icons" && (this._destroyIcons(), c && this._createIcons()), b == "disabled" && this.headers.add(this.headers.next())[c ? "addClass" : "removeClass"]("ui-accordion-disabled ui-state-disabled");
},
_keydown: function(b) {
if (this.options.disabled || b.altKey || b.ctrlKey) return;
var c = a.ui.keyCode, d = this.headers.length, e = this.headers.index(b.target), f = !1;
switch (b.keyCode) {
case c.RIGHT:
case c.DOWN:
f = this.headers[(e + 1) % d];
break;
case c.LEFT:
case c.UP:
f = this.headers[(e - 1 + d) % d];
break;
case c.SPACE:
case c.ENTER:
this._clickHandler({
target: b.target
}, b.target), b.preventDefault();
}
return f ? (a(b.target).attr("tabIndex", -1), a(f).attr("tabIndex", 0), f.focus(), !1) : !0;
},
resize: function() {
var b = this.options, c;
if (b.fillSpace) {
if (a.browser.msie) {
var d = this.element.parent().css("overflow");
this.element.parent().css("overflow", "hidden");
}
c = this.element.parent().height(), a.browser.msie && this.element.parent().css("overflow", d), this.headers.each(function() {
c -= a(this).outerHeight(!0);
}), this.headers.next().each(function() {
a(this).height(Math.max(0, c - a(this).innerHeight() + a(this).height()));
}).css("overflow", "auto");
} else b.autoHeight && (c = 0, this.headers.next().each(function() {
c = Math.max(c, a(this).height("").height());
}).height(c));
return this;
},
activate: function(a) {
this.options.active = a;
var b = this._findActive(a)[0];
return this._clickHandler({
target: b
}, b), this;
},
_findActive: function(b) {
return b ? typeof b == "number" ? this.headers.filter(":eq(" + b + ")") : this.headers.not(this.headers.not(b)) : b === !1 ? a([]) : this.headers.filter(":eq(0)");
},
_clickHandler: function(b, c) {
var d = this.options;
if (d.disabled) return;
if (!b.target) {
if (!d.collapsible) return;
this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header), this.active.next().addClass("ui-accordion-content-active");
var e = this.active.next(), f = {
options: d,
newHeader: a([]),
oldHeader: d.active,
newContent: a([]),
oldContent: e
}, g = this.active = a([]);
this._toggle(g, e, f);
return;
}
var h = a(b.currentTarget || c), i = h[0] === this.active[0];
d.active = d.collapsible && i ? !1 : this.headers.index(h);
if (this.running || !d.collapsible && i) return;
var j = this.active, g = h.next(), e = this.active.next(), f = {
options: d,
newHeader: i && d.collapsible ? a([]) : h,
oldHeader: this.active,
newContent: i && d.collapsible ? a([]) : g,
oldContent: e
}, k = this.headers.index(this.active[0]) > this.headers.index(h[0]);
this.active = i ? a([]) : h, this._toggle(g, e, f, i, k), j.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header), i || (h.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected), h.next().addClass("ui-accordion-content-active"));
return;
},
_toggle: function(b, c, d, e, f) {
var g = this, h = g.options;
g.toShow = b, g.toHide = c, g.data = d;
var i = function() {
if (!g) return;
return g._completed.apply(g, arguments);
};
g._trigger("changestart", null, g.data), g.running = c.size() === 0 ? b.size() : c.size();
if (h.animated) {
var j = {};
h.collapsible && e ? j = {
toShow: a([]),
toHide: c,
complete: i,
down: f,
autoHeight: h.autoHeight || h.fillSpace
} : j = {
toShow: b,
toHide: c,
complete: i,
down: f,
autoHeight: h.autoHeight || h.fillSpace
}, h.proxied || (h.proxied = h.animated), h.proxiedDuration || (h.proxiedDuration = h.duration), h.animated = a.isFunction(h.proxied) ? h.proxied(j) : h.proxied, h.duration = a.isFunction(h.proxiedDuration) ? h.proxiedDuration(j) : h.proxiedDuration;
var k = a.ui.accordion.animations, l = h.duration, m = h.animated;
m && !k[m] && !a.easing[m] && (m = "slide"), k[m] || (k[m] = function(a) {
this.slide(a, {
easing: m,
duration: l || 700
});
}), k[m](j);
} else h.collapsible && e ? b.toggle() : (c.hide(), b.show()), i(!0);
c.prev().attr({
"aria-expanded": "false",
"aria-selected": "false",
tabIndex: -1
}).blur(), b.prev().attr({
"aria-expanded": "true",
"aria-selected": "true",
tabIndex: 0
}).focus();
},
_completed: function(a) {
this.running = a ? 0 : --this.running;
if (this.running) return;
this.options.clearStyle && this.toShow.add(this.toHide).css({
height: "",
overflow: ""
}), this.toHide.removeClass("ui-accordion-content-active"), this.toHide.length && (this.toHide.parent()[0].className = this.toHide.parent()[0].className), this._trigger("change", null, this.data);
}
}), a.extend(a.ui.accordion, {
version: "1.8.16",
animations: {
slide: function(b, c) {
b = a.extend({
easing: "swing",
duration: 300
}, b, c);
if (!b.toHide.size()) {
b.toShow.animate({
height: "show",
paddingTop: "show",
paddingBottom: "show"
}, b);
return;
}
if (!b.toShow.size()) {
b.toHide.animate({
height: "hide",
paddingTop: "hide",
paddingBottom: "hide"
}, b);
return;
}
var d = b.toShow.css("overflow"), e = 0, f = {}, g = {}, h = [ "height", "paddingTop", "paddingBottom" ], i, j = b.toShow;
i = j[0].style.width, j.width(parseInt(j.parent().width(), 10) - parseInt(j.css("paddingLeft"), 10) - parseInt(j.css("paddingRight"), 10) - (parseInt(j.css("borderLeftWidth"), 10) || 0) - (parseInt(j.css("borderRightWidth"), 10) || 0)), a.each(h, function(c, d) {
g[d] = "hide";
var e = ("" + a.css(b.toShow[0], d)).match(/^([\d+-.]+)(.*)$/);
f[d] = {
value: e[1],
unit: e[2] || "px"
};
}), b.toShow.css({
height: 0,
overflow: "hidden"
}).show(), b.toHide.filter(":hidden").each(b.complete).end().filter(":visible").animate(g, {
step: function(a, c) {
c.prop == "height" && (e = c.end - c.start === 0 ? 0 : (c.now - c.start) / (c.end - c.start)), b.toShow[0].style[c.prop] = e * f[c.prop].value + f[c.prop].unit;
},
duration: b.duration,
easing: b.easing,
complete: function() {
b.autoHeight || b.toShow.css("height", ""), b.toShow.css({
width: i,
overflow: d
}), b.complete();
}
});
},
bounceslide: function(a) {
this.slide(a, {
easing: a.down ? "easeOutBounce" : "swing",
duration: a.down ? 1e3 : 200
});
}
}
});
}(jQuery), function(a, b) {
var c = 0;
a.widget("ui.autocomplete", {
options: {
appendTo: "body",
autoFocus: !1,
delay: 300,
minLength: 1,
position: {
my: "left top",
at: "left bottom",
collision: "none"
},
source: null
},
pending: 0,
_create: function() {
var b = this, c = this.element[0].ownerDocument, d;
this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
role: "textbox",
"aria-autocomplete": "list",
"aria-haspopup": "true"
}).bind("keydown.autocomplete", function(c) {
if (b.options.disabled || b.element.propAttr("readOnly")) return;
d = !1;
var e = a.ui.keyCode;
switch (c.keyCode) {
case e.PAGE_UP:
b._move("previousPage", c);
break;
case e.PAGE_DOWN:
b._move("nextPage", c);
break;
case e.UP:
b._move("previous", c), c.preventDefault();
break;
case e.DOWN:
b._move("next", c), c.preventDefault();
break;
case e.ENTER:
case e.NUMPAD_ENTER:
b.menu.active && (d = !0, c.preventDefault());
case e.TAB:
if (!b.menu.active) return;
b.menu.select(c);
break;
case e.ESCAPE:
b.element.val(b.term), b.close(c);
break;
default:
clearTimeout(b.searching), b.searching = setTimeout(function() {
b.term != b.element.val() && (b.selectedItem = null, b.search(null, c));
}, b.options.delay);
}
}).bind("keypress.autocomplete", function(a) {
d && (d = !1, a.preventDefault());
}).bind("focus.autocomplete", function() {
if (b.options.disabled) return;
b.selectedItem = null, b.previous = b.element.val();
}).bind("blur.autocomplete", function(a) {
if (b.options.disabled) return;
clearTimeout(b.searching), b.closing = setTimeout(function() {
b.close(a), b._change(a);
}, 150);
}), this._initSource(), this.response = function() {
return b._response.apply(b, arguments);
}, this.menu = a("<ul></ul>").addClass("ui-autocomplete").appendTo(a(this.options.appendTo || "body", c)[0]).mousedown(function(c) {
var d = b.menu.element[0];
a(c.target).closest(".ui-menu-item").length || setTimeout(function() {
a(document).one("mousedown", function(c) {
c.target !== b.element[0] && c.target !== d && !a.ui.contains(d, c.target) && b.close();
});
}, 1), setTimeout(function() {
clearTimeout(b.closing);
}, 13);
}).menu({
focus: function(a, c) {
var d = c.item.data("item.autocomplete");
!1 !== b._trigger("focus", a, {
item: d
}) && /^key/.test(a.originalEvent.type) && b.element.val(d.value);
},
selected: function(a, d) {
var e = d.item.data("item.autocomplete"), f = b.previous;
b.element[0] !== c.activeElement && (b.element.focus(), b.previous = f, setTimeout(function() {
b.previous = f, b.selectedItem = e;
}, 1)), !1 !== b._trigger("select", a, {
item: e
}) && b.element.val(e.value), b.term = b.element.val(), b.close(a), b.selectedItem = e;
},
blur: function(a, c) {
b.menu.element.is(":visible") && b.element.val() !== b.term && b.element.val(b.term);
}
}).zIndex(this.element.zIndex() + 1).css({
top: 0,
left: 0
}).hide().data("menu"), a.fn.bgiframe && this.menu.element.bgiframe();
},
destroy: function() {
this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"), this.menu.element.remove(), a.Widget.prototype.destroy.call(this);
},
_setOption: function(b, c) {
a.Widget.prototype._setOption.apply(this, arguments), b === "source" && this._initSource(), b === "appendTo" && this.menu.element.appendTo(a(c || "body", this.element[0].ownerDocument)[0]), b === "disabled" && c && this.xhr && this.xhr.abort();
},
_initSource: function() {
var b = this, d, e;
a.isArray(this.options.source) ? (d = this.options.source, this.source = function(b, c) {
c(a.ui.autocomplete.filter(d, b.term));
}) : typeof this.options.source == "string" ? (e = this.options.source, this.source = function(d, f) {
b.xhr && b.xhr.abort(), b.xhr = a.ajax({
url: e,
data: d,
dataType: "json",
autocompleteRequest: ++c,
success: function(a, b) {
this.autocompleteRequest === c && f(a);
},
error: function() {
this.autocompleteRequest === c && f([]);
}
});
}) : this.source = this.options.source;
},
search: function(a, b) {
a = a != null ? a : this.element.val(), this.term = this.element.val();
if (a.length < this.options.minLength) return this.close(b);
clearTimeout(this.closing);
if (this._trigger("search", b) === !1) return;
return this._search(a);
},
_search: function(a) {
this.pending++, this.element.addClass("ui-autocomplete-loading"), this.source({
term: a
}, this.response);
},
_response: function(a) {
!this.options.disabled && a && a.length ? (a = this._normalize(a), this._suggest(a), this._trigger("open")) : this.close(), this.pending--, this.pending || this.element.removeClass("ui-autocomplete-loading");
},
close: function(a) {
clearTimeout(this.closing), this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.deactivate(), this._trigger("close", a));
},
_change: function(a) {
this.previous !== this.element.val() && this._trigger("change", a, {
item: this.selectedItem
});
},
_normalize: function(b) {
return b.length && b[0].label && b[0].value ? b : a.map(b, function(b) {
return typeof b == "string" ? {
label: b,
value: b
} : a.extend({
label: b.label || b.value,
value: b.value || b.label
}, b);
});
},
_suggest: function(b) {
var c = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
this._renderMenu(c, b), this.menu.deactivate(), this.menu.refresh(), c.show(), this._resizeMenu(), c.position(a.extend({
of: this.element
}, this.options.position)), this.options.autoFocus && this.menu.next(new a.Event("mouseover"));
},
_resizeMenu: function() {
var a = this.menu.element;
a.outerWidth(Math.max(a.width("").outerWidth(), this.element.outerWidth()));
},
_renderMenu: function(b, c) {
var d = this;
a.each(c, function(a, c) {
d._renderItem(b, c);
});
},
_renderItem: function(b, c) {
return a("<li></li>").data("item.autocomplete", c).append(a("<a></a>").text(c.label)).appendTo(b);
},
_move: function(a, b) {
if (!this.menu.element.is(":visible")) {
this.search(null, b);
return;
}
if (this.menu.first() && /^previous/.test(a) || this.menu.last() && /^next/.test(a)) {
this.element.val(this.term), this.menu.deactivate();
return;
}
this.menu[a](b);
},
widget: function() {
return this.menu.element;
}
}), a.extend(a.ui.autocomplete, {
escapeRegex: function(a) {
return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
},
filter: function(b, c) {
var d = new RegExp(a.ui.autocomplete.escapeRegex(c), "i");
return a.grep(b, function(a) {
return d.test(a.label || a.value || a);
});
}
});
}(jQuery), function(a) {
a.widget("ui.menu", {
_create: function() {
var b = this;
this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
role: "listbox",
"aria-activedescendant": "ui-active-menuitem"
}).click(function(c) {
if (!a(c.target).closest(".ui-menu-item a").length) return;
c.preventDefault(), b.select(c);
}), this.refresh();
},
refresh: function() {
var b = this, c = this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem");
c.children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function(c) {
b.activate(c, a(this).parent());
}).mouseleave(function() {
b.deactivate();
});
},
activate: function(a, b) {
this.deactivate();
if (this.hasScroll()) {
var c = b.offset().top - this.element.offset().top, d = this.element.scrollTop(), e = this.element.height();
c < 0 ? this.element.scrollTop(d + c) : c >= e && this.element.scrollTop(d + c - e + b.height());
}
this.active = b.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end(), this._trigger("focus", a, {
item: b
});
},
deactivate: function() {
if (!this.active) return;
this.active.children("a").removeClass("ui-state-hover").removeAttr("id"), this._trigger("blur"), this.active = null;
},
next: function(a) {
this.move("next", ".ui-menu-item:first", a);
},
previous: function(a) {
this.move("prev", ".ui-menu-item:last", a);
},
first: function() {
return this.active && !this.active.prevAll(".ui-menu-item").length;
},
last: function() {
return this.active && !this.active.nextAll(".ui-menu-item").length;
},
move: function(a, b, c) {
if (!this.active) {
this.activate(c, this.element.children(b));
return;
}
var d = this.active[a + "All"](".ui-menu-item").eq(0);
d.length ? this.activate(c, d) : this.activate(c, this.element.children(b));
},
nextPage: function(b) {
if (this.hasScroll()) {
if (!this.active || this.last()) {
this.activate(b, this.element.children(".ui-menu-item:first"));
return;
}
var c = this.active.offset().top, d = this.element.height(), e = this.element.children(".ui-menu-item").filter(function() {
var b = a(this).offset().top - c - d + a(this).height();
return b < 10 && b > -10;
});
e.length || (e = this.element.children(".ui-menu-item:last")), this.activate(b, e);
} else this.activate(b, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first" : ":last"));
},
previousPage: function(b) {
if (this.hasScroll()) {
if (!this.active || this.first()) {
this.activate(b, this.element.children(".ui-menu-item:last"));
return;
}
var c = this.active.offset().top, d = this.element.height();
result = this.element.children(".ui-menu-item").filter(function() {
var b = a(this).offset().top - c + d - a(this).height();
return b < 10 && b > -10;
}), result.length || (result = this.element.children(".ui-menu-item:first")), this.activate(b, result);
} else this.activate(b, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last" : ":first"));
},
hasScroll: function() {
return this.element.height() < this.element[a.fn.prop ? "prop" : "attr"]("scrollHeight");
},
select: function(a) {
this._trigger("selected", a, {
item: this.active
});
}
});
}(jQuery), function(a, b) {
var c, d, e, f, g = "ui-button ui-widget ui-state-default ui-corner-all", h = "ui-state-hover ui-state-active ", i = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only", j = function() {
var b = a(this).find(":ui-button");
setTimeout(function() {
b.button("refresh");
}, 1);
}, k = function(b) {
var c = b.name, d = b.form, e = a([]);
return c && (d ? e = a(d).find("[name='" + c + "']") : e = a("[name='" + c + "']", b.ownerDocument).filter(function() {
return !this.form;
})), e;
};
a.widget("ui.button", {
options: {
disabled: null,
text: !0,
label: null,
icons: {
primary: null,
secondary: null
}
},
_create: function() {
this.element.closest("form").unbind("reset.button").bind("reset.button", j), typeof this.options.disabled != "boolean" && (this.options.disabled = this.element.propAttr("disabled")), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
var b = this, h = this.options, i = this.type === "checkbox" || this.type === "radio", l = "ui-state-hover" + (i ? "" : " ui-state-active"), m = "ui-state-focus";
h.label === null && (h.label = this.buttonElement.html()), this.element.is(":disabled") && (h.disabled = !0), this.buttonElement.addClass(g).attr("role", "button").bind("mouseenter.button", function() {
if (h.disabled) return;
a(this).addClass("ui-state-hover"), this === c && a(this).addClass("ui-state-active");
}).bind("mouseleave.button", function() {
if (h.disabled) return;
a(this).removeClass(l);
}).bind("click.button", function(a) {
h.disabled && (a.preventDefault(), a.stopImmediatePropagation());
}), this.element.bind("focus.button", function() {
b.buttonElement.addClass(m);
}).bind("blur.button", function() {
b.buttonElement.removeClass(m);
}), i && (this.element.bind("change.button", function() {
if (f) return;
b.refresh();
}), this.buttonElement.bind("mousedown.button", function(a) {
if (h.disabled) return;
f = !1, d = a.pageX, e = a.pageY;
}).bind("mouseup.button", function(a) {
if (h.disabled) return;
if (d !== a.pageX || e !== a.pageY) f = !0;
})), this.type === "checkbox" ? this.buttonElement.bind("click.button", function() {
if (h.disabled || f) return !1;
a(this).toggleClass("ui-state-active"), b.buttonElement.attr("aria-pressed", b.element[0].checked);
}) : this.type === "radio" ? this.buttonElement.bind("click.button", function() {
if (h.disabled || f) return !1;
a(this).addClass("ui-state-active"), b.buttonElement.attr("aria-pressed", "true");
var c = b.element[0];
k(c).not(c).map(function() {
return a(this).button("widget")[0];
}).removeClass("ui-state-active").attr("aria-pressed", "false");
}) : (this.buttonElement.bind("mousedown.button", function() {
if (h.disabled) return !1;
a(this).addClass("ui-state-active"), c = this, a(document).one("mouseup", function() {
c = null;
});
}).bind("mouseup.button", function() {
if (h.disabled) return !1;
a(this).removeClass("ui-state-active");
}).bind("keydown.button", function(b) {
if (h.disabled) return !1;
(b.keyCode == a.ui.keyCode.SPACE || b.keyCode == a.ui.keyCode.ENTER) && a(this).addClass("ui-state-active");
}).bind("keyup.button", function() {
a(this).removeClass("ui-state-active");
}), this.buttonElement.is("a") && this.buttonElement.keyup(function(b) {
b.keyCode === a.ui.keyCode.SPACE && a(this).click();
})), this._setOption("disabled", h.disabled), this._resetButton();
},
_determineButtonType: function() {
this.element.is(":checkbox") ? this.type = "checkbox" : this.element.is(":radio") ? this.type = "radio" : this.element.is("input") ? this.type = "input" : this.type = "button";
if (this.type === "checkbox" || this.type === "radio") {
var a = this.element.parents().filter(":last"), b = "label[for='" + this.element.attr("id") + "']";
this.buttonElement = a.find(b), this.buttonElement.length || (a = a.length ? a.siblings() : this.element.siblings(), this.buttonElement = a.filter(b), this.buttonElement.length || (this.buttonElement = a.find(b))), this.element.addClass("ui-helper-hidden-accessible");
var c = this.element.is(":checked");
c && this.buttonElement.addClass("ui-state-active"), this.buttonElement.attr("aria-pressed", c);
} else this.buttonElement = this.element;
},
widget: function() {
return this.buttonElement;
},
destroy: function() {
this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(g + " " + h + " " + i).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title"), a.Widget.prototype.destroy.call(this);
},
_setOption: function(b, c) {
a.Widget.prototype._setOption.apply(this, arguments);
if (b === "disabled") {
c ? this.element.propAttr("disabled", !0) : this.element.propAttr("disabled", !1);
return;
}
this._resetButton();
},
refresh: function() {
var b = this.element.is(":disabled");
b !== this.options.disabled && this._setOption("disabled", b), this.type === "radio" ? k(this.element[0]).each(function() {
a(this).is(":checked") ? a(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false");
}) : this.type === "checkbox" && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"));
},
_resetButton: function() {
if (this.type === "input") {
this.options.label && this.element.val(this.options.label);
return;
}
var b = this.buttonElement.removeClass(i), c = a("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(), d = this.options.icons, e = d.primary && d.secondary, f = [];
d.primary || d.secondary ? (this.options.text && f.push("ui-button-text-icon" + (e ? "s" : d.primary ? "-primary" : "-secondary")), d.primary && b.prepend("<span class='ui-button-icon-primary ui-icon " + d.primary + "'></span>"), d.secondary && b.append("<span class='ui-button-icon-secondary ui-icon " + d.secondary + "'></span>"), this.options.text || (f.push(e ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || b.attr("title", c))) : f.push("ui-button-text-only"), b.addClass(f.join(" "));
}
}), a.widget("ui.buttonset", {
options: {
items: ":button, :submit, :reset, :checkbox, :radio, a, :data(button)"
},
_create: function() {
this.element.addClass("ui-buttonset");
},
_init: function() {
this.refresh();
},
_setOption: function(b, c) {
b === "disabled" && this.buttons.button("option", b, c), a.Widget.prototype._setOption.apply(this, arguments);
},
refresh: function() {
var b = this.element.css("direction") === "ltr";
this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
return a(this).button("widget")[0];
}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(b ? "ui-corner-left" : "ui-corner-right").end().filter(":last").addClass(b ? "ui-corner-right" : "ui-corner-left").end().end();
},
destroy: function() {
this.element.removeClass("ui-buttonset"), this.buttons.map(function() {
return a(this).button("widget")[0];
}).removeClass("ui-corner-left ui-corner-right").end().button("destroy"), a.Widget.prototype.destroy.call(this);
}
});
}(jQuery), function(a, b) {
var c = 5;
a.widget("ui.slider", a.ui.mouse, {
widgetEventPrefix: "slide",
options: {
animate: !1,
distance: 0,
max: 100,
min: 0,
orientation: "horizontal",
range: !1,
step: 1,
value: 0,
values: null
},
_create: function() {
var b = this, d = this.options, e = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"), f = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>", g = d.values && d.values.length || 1, h = [];
this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all" + (d.disabled ? " ui-slider-disabled ui-disabled" : "")), this.range = a([]), d.range && (d.range === !0 && (d.values || (d.values = [ this._valueMin(), this._valueMin() ]), d.values.length && d.values.length !== 2 && (d.values = [ d.values[0], d.values[0] ])), this.range = a("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + (d.range === "min" || d.range === "max" ? " ui-slider-range-" + d.range : "")));
for (var i = e.length; i < g; i += 1) h.push(f);
this.handles = e.add(a(h.join("")).appendTo(b.element)), this.handle = this.handles.eq(0), this.handles.add(this.range).filter("a").click(function(a) {
a.preventDefault();
}).hover(function() {
d.disabled || a(this).addClass("ui-state-hover");
}, function() {
a(this).removeClass("ui-state-hover");
}).focus(function() {
d.disabled ? a(this).blur() : (a(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), a(this).addClass("ui-state-focus"));
}).blur(function() {
a(this).removeClass("ui-state-focus");
}), this.handles.each(function(b) {
a(this).data("index.ui-slider-handle", b);
}), this.handles.keydown(function(d) {
var e = !0, f = a(this).data("index.ui-slider-handle"), g, h, i, j;
if (b.options.disabled) return;
switch (d.keyCode) {
case a.ui.keyCode.HOME:
case a.ui.keyCode.END:
case a.ui.keyCode.PAGE_UP:
case a.ui.keyCode.PAGE_DOWN:
case a.ui.keyCode.UP:
case a.ui.keyCode.RIGHT:
case a.ui.keyCode.DOWN:
case a.ui.keyCode.LEFT:
e = !1;
if (!b._keySliding) {
b._keySliding = !0, a(this).addClass("ui-state-active"), g = b._start(d, f);
if (g === !1) return;
}
}
j = b.options.step, b.options.values && b.options.values.length ? h = i = b.values(f) : h = i = b.value();
switch (d.keyCode) {
case a.ui.keyCode.HOME:
i = b._valueMin();
break;
case a.ui.keyCode.END:
i = b._valueMax();
break;
case a.ui.keyCode.PAGE_UP:
i = b._trimAlignValue(h + (b._valueMax() - b._valueMin()) / c);
break;
case a.ui.keyCode.PAGE_DOWN:
i = b._trimAlignValue(h - (b._valueMax() - b._valueMin()) / c);
break;
case a.ui.keyCode.UP:
case a.ui.keyCode.RIGHT:
if (h === b._valueMax()) return;
i = b._trimAlignValue(h + j);
break;
case a.ui.keyCode.DOWN:
case a.ui.keyCode.LEFT:
if (h === b._valueMin()) return;
i = b._trimAlignValue(h - j);
}
return b._slide(d, f, i), e;
}).keyup(function(c) {
var d = a(this).data("index.ui-slider-handle");
b._keySliding && (b._keySliding = !1, b._stop(c, d), b._change(c, d), a(this).removeClass("ui-state-active"));
}), this._refreshValue(), this._animateOff = !1;
},
destroy: function() {
return this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"), this._mouseDestroy(), this;
},
_mouseCapture: function(b) {
var c = this.options, d, e, f, g, h, i, j, k, l;
return c.disabled ? !1 : (this.elementSize = {
width: this.element.outerWidth(),
height: this.element.outerHeight()
}, this.elementOffset = this.element.offset(), d = {
x: b.pageX,
y: b.pageY
}, e = this._normValueFromMouse(d), f = this._valueMax() - this._valueMin() + 1, h = this, this.handles.each(function(b) {
var c = Math.abs(e - h.values(b));
f > c && (f = c, g = a(this), i = b);
}), c.range === !0 && this.values(1) === c.min && (i += 1, g = a(this.handles[i])), j = this._start(b, i), j === !1 ? !1 : (this._mouseSliding = !0, h._handleIndex = i, g.addClass("ui-state-active").focus(), k = g.offset(), l = !a(b.target).parents().andSelf().is(".ui-slider-handle"), this._clickOffset = l ? {
left: 0,
top: 0
} : {
left: b.pageX - k.left - g.width() / 2,
top: b.pageY - k.top - g.height() / 2 - (parseInt(g.css("borderTopWidth"), 10) || 0) - (parseInt(g.css("borderBottomWidth"), 10) || 0) + (parseInt(g.css("marginTop"), 10) || 0)
}, this.handles.hasClass("ui-state-hover") || this._slide(b, i, e), this._animateOff = !0, !0));
},
_mouseStart: function(a) {
return !0;
},
_mouseDrag: function(a) {
var b = {
x: a.pageX,
y: a.pageY
}, c = this._normValueFromMouse(b);
return this._slide(a, this._handleIndex, c), !1;
},
_mouseStop: function(a) {
return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(a, this._handleIndex), this._change(a, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1;
},
_detectOrientation: function() {
this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal";
},
_normValueFromMouse: function(a) {
var b, c, d, e, f;
return this.orientation === "horizontal" ? (b = this.elementSize.width, c = a.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (b = this.elementSize.height, c = a.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), d = c / b, d > 1 && (d = 1), d < 0 && (d = 0), this.orientation === "vertical" && (d = 1 - d), e = this._valueMax() - this._valueMin(), f = this._valueMin() + d * e, this._trimAlignValue(f);
},
_start: function(a, b) {
var c = {
handle: this.handles[b],
value: this.value()
};
return this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("start", a, c);
},
_slide: function(a, b, c) {
var d, e, f;
this.options.values && this.options.values.length ? (d = this.values(b ? 0 : 1), this.options.values.length === 2 && this.options.range === !0 && (b === 0 && c > d || b === 1 && c < d) && (c = d), c !== this.values(b) && (e = this.values(), e[b] = c, f = this._trigger("slide", a, {
handle: this.handles[b],
value: c,
values: e
}), d = this.values(b ? 0 : 1), f !== !1 && this.values(b, c, !0))) : c !== this.value() && (f = this._trigger("slide", a, {
handle: this.handles[b],
value: c
}), f !== !1 && this.value(c));
},
_stop: function(a, b) {
var c = {
handle: this.handles[b],
value: this.value()
};
this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("stop", a, c);
},
_change: function(a, b) {
if (!this._keySliding && !this._mouseSliding) {
var c = {
handle: this.handles[b],
value: this.value()
};
this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("change", a, c);
}
},
value: function(a) {
if (arguments.length) {
this.options.value = this._trimAlignValue(a), this._refreshValue(), this._change(null, 0);
return;
}
return this._value();
},
values: function(b, c) {
var d, e, f;
if (arguments.length > 1) {
this.options.values[b] = this._trimAlignValue(c), this._refreshValue(), this._change(null, b);
return;
}
if (!arguments.length) return this._values();
if (!a.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(b) : this.value();
d = this.options.values, e = arguments[0];
for (f = 0; f < d.length; f += 1) d[f] = this._trimAlignValue(e[f]), this._change(null, f);
this._refreshValue();
},
_setOption: function(b, c) {
var d, e = 0;
a.isArray(this.options.values) && (e = this.options.values.length), a.Widget.prototype._setOption.apply(this, arguments);
switch (b) {
case "disabled":
c ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.propAttr("disabled", !0), this.element.addClass("ui-disabled")) : (this.handles.propAttr("disabled", !1), this.element.removeClass("ui-disabled"));
break;
case "orientation":
this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
break;
case "value":
this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
break;
case "values":
this._animateOff = !0, this._refreshValue();
for (d = 0; d < e; d += 1) this._change(null, d);
this._animateOff = !1;
}
},
_value: function() {
var a = this.options.value;
return a = this._trimAlignValue(a), a;
},
_values: function(a) {
var b, c, d;
if (arguments.length) return b = this.options.values[a], b = this._trimAlignValue(b), b;
c = this.options.values.slice();
for (d = 0; d < c.length; d += 1) c[d] = this._trimAlignValue(c[d]);
return c;
},
_trimAlignValue: function(a) {
if (a <= this._valueMin()) return this._valueMin();
if (a >= this._valueMax()) return this._valueMax();
var b = this.options.step > 0 ? this.options.step : 1, c = (a - this._valueMin()) % b, d = a - c;
return Math.abs(c) * 2 >= b && (d += c > 0 ? b : -b), parseFloat(d.toFixed(5));
},
_valueMin: function() {
return this.options.min;
},
_valueMax: function() {
return this.options.max;
},
_refreshValue: function() {
var b = this.options.range, c = this.options, d = this, e = this._animateOff ? !1 : c.animate, f, g = {}, h, i, j, k;
this.options.values && this.options.values.length ? this.handles.each(function(b, i) {
f = (d.values(b) - d._valueMin()) / (d._valueMax() - d._valueMin()) * 100, g[d.orientation === "horizontal" ? "left" : "bottom"] = f + "%", a(this).stop(1, 1)[e ? "animate" : "css"](g, c.animate), d.options.range === !0 && (d.orientation === "horizontal" ? (b === 0 && d.range.stop(1, 1)[e ? "animate" : "css"]({
left: f + "%"
}, c.animate), b === 1 && d.range[e ? "animate" : "css"]({
width: f - h + "%"
}, {
queue: !1,
duration: c.animate
})) : (b === 0 && d.range.stop(1, 1)[e ? "animate" : "css"]({
bottom: f + "%"
}, c.animate), b === 1 && d.range[e ? "animate" : "css"]({
height: f - h + "%"
}, {
queue: !1,
duration: c.animate
}))), h = f;
}) : (i = this.value(), j = this._valueMin(), k = this._valueMax(), f = k !== j ? (i - j) / (k - j) * 100 : 0, g[d.orientation === "horizontal" ? "left" : "bottom"] = f + "%", this.handle.stop(1, 1)[e ? "animate" : "css"](g, c.animate), b === "min" && this.orientation === "horizontal" && this.range.stop(1, 1)[e ? "animate" : "css"]({
width: f + "%"
}, c.animate), b === "max" && this.orientation === "horizontal" && this.range[e ? "animate" : "css"]({
width: 100 - f + "%"
}, {
queue: !1,
duration: c.animate
}), b === "min" && this.orientation === "vertical" && this.range.stop(1, 1)[e ? "animate" : "css"]({
height: f + "%"
}, c.animate), b === "max" && this.orientation === "vertical" && this.range[e ? "animate" : "css"]({
height: 100 - f + "%"
}, {
queue: !1,
duration: c.animate
}));
}
}), a.extend(a.ui.slider, {
version: "1.8.16"
});
}(jQuery), function($, undefined) {
function Datepicker() {
this.debug = !1, this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
closeText: "Done",
prevText: "Prev",
nextText: "Next",
currentText: "Today",
monthNames: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
dayNames: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
dayNamesShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
dayNamesMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
weekHeader: "Wk",
dateFormat: "mm/dd/yy",
firstDay: 0,
isRTL: !1,
showMonthAfterYear: !1,
yearSuffix: ""
}, this._defaults = {
showOn: "focus",
showAnim: "fadeIn",
showOptions: {},
defaultDate: null,
appendText: "",
buttonText: "...",
buttonImage: "",
buttonImageOnly: !1,
hideIfNoPrevNext: !1,
navigationAsDateFormat: !1,
gotoCurrent: !1,
changeMonth: !1,
changeYear: !1,
yearRange: "c-10:c+10",
showOtherMonths: !1,
selectOtherMonths: !1,
showWeek: !1,
calculateWeek: this.iso8601Week,
shortYearCutoff: "+10",
minDate: null,
maxDate: null,
duration: "fast",
beforeShowDay: null,
beforeShow: null,
onSelect: null,
onChangeMonthYear: null,
onClose: null,
numberOfMonths: 1,
showCurrentAtPos: 0,
stepMonths: 1,
stepBigMonths: 12,
altField: "",
altFormat: "",
constrainInput: !0,
showButtonPanel: !1,
autoSize: !1,
disabled: !1
}, $.extend(this._defaults, this.regional[""]), this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'));
}
function bindHover(a) {
var b = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
return a.bind("mouseout", function(a) {
var c = $(a.target).closest(b);
if (!c.length) return;
c.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover");
}).bind("mouseover", function(c) {
var d = $(c.target).closest(b);
if ($.datepicker._isDisabledDatepicker(instActive.inline ? a.parent()[0] : instActive.input[0]) || !d.length) return;
d.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), d.addClass("ui-state-hover"), d.hasClass("ui-datepicker-prev") && d.addClass("ui-datepicker-prev-hover"), d.hasClass("ui-datepicker-next") && d.addClass("ui-datepicker-next-hover");
});
}
function extendRemove(a, b) {
$.extend(a, b);
for (var c in b) if (b[c] == null || b[c] == undefined) a[c] = b[c];
return a;
}
function isArray(a) {
return a && ($.browser.safari && typeof a == "object" && a.length || a.constructor && a.constructor.toString().match(/\Array\(\)/));
}
$.extend($.ui, {
datepicker: {
version: "1.8.16"
}
});
var PROP_NAME = "datepicker", dpuuid = (new Date).getTime(), instActive;
$.extend(Datepicker.prototype, {
markerClassName: "hasDatepicker",
maxRows: 4,
log: function() {
this.debug && console.log.apply("", arguments);
},
_widgetDatepicker: function() {
return this.dpDiv;
},
setDefaults: function(a) {
return extendRemove(this._defaults, a || {}), this;
},
_attachDatepicker: function(target, settings) {
var inlineSettings = null;
for (var attrName in this._defaults) {
var attrValue = target.getAttribute("date:" + attrName);
if (attrValue) {
inlineSettings = inlineSettings || {};
try {
inlineSettings[attrName] = eval(attrValue);
} catch (err) {
inlineSettings[attrName] = attrValue;
}
}
}
var nodeName = target.nodeName.toLowerCase(), inline = nodeName == "div" || nodeName == "span";
target.id || (this.uuid += 1, target.id = "dp" + this.uuid);
var inst = this._newInst($(target), inline);
inst.settings = $.extend({}, settings || {}, inlineSettings || {}), nodeName == "input" ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst);
},
_newInst: function(a, b) {
var c = a[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
return {
id: c,
input: a,
selectedDay: 0,
selectedMonth: 0,
selectedYear: 0,
drawMonth: 0,
drawYear: 0,
inline: b,
dpDiv: b ? bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')) : this.dpDiv
};
},
_connectDatepicker: function(a, b) {
var c = $(a);
b.append = $([]), b.trigger = $([]);
if (c.hasClass(this.markerClassName)) return;
this._attachments(c, b), c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function(a, c, d) {
b.settings[c] = d;
}).bind("getData.datepicker", function(a, c) {
return this._get(b, c);
}), this._autoSize(b), $.data(a, PROP_NAME, b), b.settings.disabled && this._disableDatepicker(a);
},
_attachments: function(a, b) {
var c = this._get(b, "appendText"), d = this._get(b, "isRTL");
b.append && b.append.remove(), c && (b.append = $('<span class="' + this._appendClass + '">' + c + "</span>"), a[d ? "before" : "after"](b.append)), a.unbind("focus", this._showDatepicker), b.trigger && b.trigger.remove();
var e = this._get(b, "showOn");
(e == "focus" || e == "both") && a.focus(this._showDatepicker);
if (e == "button" || e == "both") {
var f = this._get(b, "buttonText"), g = this._get(b, "buttonImage");
b.trigger = $(this._get(b, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
src: g,
alt: f,
title: f
}) : $('<button type="button"></button>').addClass(this._triggerClass).html(g == "" ? f : $("<img/>").attr({
src: g,
alt: f,
title: f
}))), a[d ? "before" : "after"](b.trigger), b.trigger.click(function() {
return $.datepicker._datepickerShowing && $.datepicker._lastInput == a[0] ? $.datepicker._hideDatepicker() : $.datepicker._showDatepicker(a[0]), !1;
});
}
},
_autoSize: function(a) {
if (this._get(a, "autoSize") && !a.inline) {
var b = new Date(2009, 11, 20), c = this._get(a, "dateFormat");
if (c.match(/[DM]/)) {
var d = function(a) {
var b = 0, c = 0;
for (var d = 0; d < a.length; d++) a[d].length > b && (b = a[d].length, c = d);
return c;
};
b.setMonth(d(this._get(a, c.match(/MM/) ? "monthNames" : "monthNamesShort"))), b.setDate(d(this._get(a, c.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - b.getDay());
}
a.input.attr("size", this._formatDate(a, b).length);
}
},
_inlineDatepicker: function(a, b) {
var c = $(a);
if (c.hasClass(this.markerClassName)) return;
c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker", function(a, c, d) {
b.settings[c] = d;
}).bind("getData.datepicker", function(a, c) {
return this._get(b, c);
}), $.data(a, PROP_NAME, b), this._setDate(b, this._getDefaultDate(b), !0), this._updateDatepicker(b), this._updateAlternate(b), b.settings.disabled && this._disableDatepicker(a), b.dpDiv.css("display", "block");
},
_dialogDatepicker: function(a, b, c, d, e) {
var f = this._dialogInst;
if (!f) {
this.uuid += 1;
var g = "dp" + this.uuid;
this._dialogInput = $('<input type="text" id="' + g + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>'), this._dialogInput.keydown(this._doKeyDown), $("body").append(this._dialogInput), f = this._dialogInst = this._newInst(this._dialogInput, !1), f.settings = {}, $.data(this._dialogInput[0], PROP_NAME, f);
}
extendRemove(f.settings, d || {}), b = b && b.constructor == Date ? this._formatDate(f, b) : b, this._dialogInput.val(b), this._pos = e ? e.length ? e : [ e.pageX, e.pageY ] : null;
if (!this._pos) {
var h = document.documentElement.clientWidth, i = document.documentElement.clientHeight, j = document.documentElement.scrollLeft || document.body.scrollLeft, k = document.documentElement.scrollTop || document.body.scrollTop;
this._pos = [ h / 2 - 100 + j, i / 2 - 150 + k ];
}
return this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), f.settings.onSelect = c, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), $.data(this._dialogInput[0], PROP_NAME, f), this;
},
_destroyDatepicker: function(a) {
var b = $(a), c = $.data(a, PROP_NAME);
if (!b.hasClass(this.markerClassName)) return;
var d = a.nodeName.toLowerCase();
$.removeData(a, PROP_NAME), d == "input" ? (c.append.remove(), c.trigger.remove(), b.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : (d == "div" || d == "span") && b.removeClass(this.markerClassName).empty();
},
_enableDatepicker: function(a) {
var b = $(a), c = $.data(a, PROP_NAME);
if (!b.hasClass(this.markerClassName)) return;
var d = a.nodeName.toLowerCase();
if (d == "input") a.disabled = !1, c.trigger.filter("button").each(function() {
this.disabled = !1;
}).end().filter("img").css({
opacity: "1.0",
cursor: ""
}); else if (d == "div" || d == "span") {
var e = b.children("." + this._inlineClass);
e.children().removeClass("ui-state-disabled"), e.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled");
}
this._disabledInputs = $.map(this._disabledInputs, function(b) {
return b == a ? null : b;
});
},
_disableDatepicker: function(a) {
var b = $(a), c = $.data(a, PROP_NAME);
if (!b.hasClass(this.markerClassName)) return;
var d = a.nodeName.toLowerCase();
if (d == "input") a.disabled = !0, c.trigger.filter("button").each(function() {
this.disabled = !0;
}).end().filter("img").css({
opacity: "0.5",
cursor: "default"
}); else if (d == "div" || d == "span") {
var e = b.children("." + this._inlineClass);
e.children().addClass("ui-state-disabled"), e.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled");
}
this._disabledInputs = $.map(this._disabledInputs, function(b) {
return b == a ? null : b;
}), this._disabledInputs[this._disabledInputs.length] = a;
},
_isDisabledDatepicker: function(a) {
if (!a) return !1;
for (var b = 0; b < this._disabledInputs.length; b++) if (this._disabledInputs[b] == a) return !0;
return !1;
},
_getInst: function(a) {
try {
return $.data(a, PROP_NAME);
} catch (b) {
throw "Missing instance data for this datepicker";
}
},
_optionDatepicker: function(a, b, c) {
var d = this._getInst(a);
if (arguments.length == 2 && typeof b == "string") return b == "defaults" ? $.extend({}, $.datepicker._defaults) : d ? b == "all" ? $.extend({}, d.settings) : this._get(d, b) : null;
var e = b || {};
typeof b == "string" && (e = {}, e[b] = c);
if (d) {
this._curInst == d && this._hideDatepicker();
var f = this._getDateDatepicker(a, !0), g = this._getMinMaxDate(d, "min"), h = this._getMinMaxDate(d, "max");
extendRemove(d.settings, e), g !== null && e.dateFormat !== undefined && e.minDate === undefined && (d.settings.minDate = this._formatDate(d, g)), h !== null && e.dateFormat !== undefined && e.maxDate === undefined && (d.settings.maxDate = this._formatDate(d, h)), this._attachments($(a), d), this._autoSize(d), this._setDate(d, f), this._updateAlternate(d), this._updateDatepicker(d);
}
},
_changeDatepicker: function(a, b, c) {
this._optionDatepicker(a, b, c);
},
_refreshDatepicker: function(a) {
var b = this._getInst(a);
b && this._updateDatepicker(b);
},
_setDateDatepicker: function(a, b) {
var c = this._getInst(a);
c && (this._setDate(c, b), this._updateDatepicker(c), this._updateAlternate(c));
},
_getDateDatepicker: function(a, b) {
var c = this._getInst(a);
return c && !c.inline && this._setDateFromField(c, b), c ? this._getDate(c) : null;
},
_doKeyDown: function(a) {
var b = $.datepicker._getInst(a.target), c = !0, d = b.dpDiv.is(".ui-datepicker-rtl");
b._keyEvent = !0;
if ($.datepicker._datepickerShowing) switch (a.keyCode) {
case 9:
$.datepicker._hideDatepicker(), c = !1;
break;
case 13:
var e = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", b.dpDiv);
e[0] && $.datepicker._selectDay(a.target, b.selectedMonth, b.selectedYear, e[0]);
var f = $.datepicker._get(b, "onSelect");
if (f) {
var g = $.datepicker._formatDate(b);
f.apply(b.input ? b.input[0] : null, [ g, b ]);
} else $.datepicker._hideDatepicker();
return !1;
case 27:
$.datepicker._hideDatepicker();
break;
case 33:
$.datepicker._adjustDate(a.target, a.ctrlKey ? -$.datepicker._get(b, "stepBigMonths") : -$.datepicker._get(b, "stepMonths"), "M");
break;
case 34:
$.datepicker._adjustDate(a.target, a.ctrlKey ? +$.datepicker._get(b, "stepBigMonths") : +$.datepicker._get(b, "stepMonths"), "M");
break;
case 35:
(a.ctrlKey || a.metaKey) && $.datepicker._clearDate(a.target), c = a.ctrlKey || a.metaKey;
break;
case 36:
(a.ctrlKey || a.metaKey) && $.datepicker._gotoToday(a.target), c = a.ctrlKey || a.metaKey;
break;
case 37:
(a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, d ? 1 : -1, "D"), c = a.ctrlKey || a.metaKey, a.originalEvent.altKey && $.datepicker._adjustDate(a.target, a.ctrlKey ? -$.datepicker._get(b, "stepBigMonths") : -$.datepicker._get(b, "stepMonths"), "M");
break;
case 38:
(a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, -7, "D"), c = a.ctrlKey || a.metaKey;
break;
case 39:
(a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, d ? -1 : 1, "D"), c = a.ctrlKey || a.metaKey, a.originalEvent.altKey && $.datepicker._adjustDate(a.target, a.ctrlKey ? +$.datepicker._get(b, "stepBigMonths") : +$.datepicker._get(b, "stepMonths"), "M");
break;
case 40:
(a.ctrlKey || a.metaKey) && $.datepicker._adjustDate(a.target, 7, "D"), c = a.ctrlKey || a.metaKey;
break;
default:
c = !1;
} else a.keyCode == 36 && a.ctrlKey ? $.datepicker._showDatepicker(this) : c = !1;
c && (a.preventDefault(), a.stopPropagation());
},
_doKeyPress: function(a) {
var b = $.datepicker._getInst(a.target);
if ($.datepicker._get(b, "constrainInput")) {
var c = $.datepicker._possibleChars($.datepicker._get(b, "dateFormat")), d = String.fromCharCode(a.charCode == undefined ? a.keyCode : a.charCode);
return a.ctrlKey || a.metaKey || d < " " || !c || c.indexOf(d) > -1;
}
},
_doKeyUp: function(a) {
var b = $.datepicker._getInst(a.target);
if (b.input.val() != b.lastVal) try {
var c = $.datepicker.parseDate($.datepicker._get(b, "dateFormat"), b.input ? b.input.val() : null, $.datepicker._getFormatConfig(b));
c && ($.datepicker._setDateFromField(b), $.datepicker._updateAlternate(b), $.datepicker._updateDatepicker(b));
} catch (a) {
$.datepicker.log(a);
}
return !0;
},
_showDatepicker: function(a) {
a = a.target || a, a.nodeName.toLowerCase() != "input" && (a = $("input", a.parentNode)[0]);
if ($.datepicker._isDisabledDatepicker(a) || $.datepicker._lastInput == a) return;
var b = $.datepicker._getInst(a);
$.datepicker._curInst && $.datepicker._curInst != b && ($.datepicker._datepickerShowing && $.datepicker._triggerOnClose($.datepicker._curInst), $.datepicker._curInst.dpDiv.stop(!0, !0));
var c = $.datepicker._get(b, "beforeShow"), d = c ? c.apply(a, [ a, b ]) : {};
if (d === !1) return;
extendRemove(b.settings, d), b.lastVal = null, $.datepicker._lastInput = a, $.datepicker._setDateFromField(b), $.datepicker._inDialog && (a.value = ""), $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(a), $.datepicker._pos[1] += a.offsetHeight);
var e = !1;
$(a).parents().each(function() {
return e |= $(this).css("position") == "fixed", !e;
}), e && $.browser.opera && ($.datepicker._pos[0] -= document.documentElement.scrollLeft, $.datepicker._pos[1] -= document.documentElement.scrollTop);
var f = {
left: $.datepicker._pos[0],
top: $.datepicker._pos[1]
};
$.datepicker._pos = null, b.dpDiv.empty(), b.dpDiv.css({
position: "absolute",
display: "block",
top: "-1000px"
}), $.datepicker._updateDatepicker(b), f = $.datepicker._checkOffset(b, f, e), b.dpDiv.css({
position: $.datepicker._inDialog && $.blockUI ? "static" : e ? "fixed" : "absolute",
display: "none",
left: f.left + "px",
top: f.top + "px"
});
if (!b.inline) {
var g = $.datepicker._get(b, "showAnim"), h = $.datepicker._get(b, "duration"), i = function() {
var a = b.dpDiv.find("iframe.ui-datepicker-cover");
if (!!a.length) {
var c = $.datepicker._getBorders(b.dpDiv);
a.css({
left: -c[0],
top: -c[1],
width: b.dpDiv.outerWidth(),
height: b.dpDiv.outerHeight()
});
}
};
b.dpDiv.zIndex($(a).zIndex() + 1), $.datepicker._datepickerShowing = !0, $.effects && $.effects[g] ? b.dpDiv.show(g, $.datepicker._get(b, "showOptions"), h, i) : b.dpDiv[g || "show"](g ? h : null, i), (!g || !h) && i(), b.input.is(":visible") && !b.input.is(":disabled") && b.input.focus(), $.datepicker._curInst = b;
}
},
_updateDatepicker: function(a) {
var b = this;
b.maxRows = 4;
var c = $.datepicker._getBorders(a.dpDiv);
instActive = a, a.dpDiv.empty().append(this._generateHTML(a));
var d = a.dpDiv.find("iframe.ui-datepicker-cover");
!d.length || d.css({
left: -c[0],
top: -c[1],
width: a.dpDiv.outerWidth(),
height: a.dpDiv.outerHeight()
}), a.dpDiv.find("." + this._dayOverClass + " a").mouseover();
var e = this._getNumberOfMonths(a), f = e[1], g = 17;
a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), f > 1 && a.dpDiv.addClass("ui-datepicker-multi-" + f).css("width", g * f + "em"), a.dpDiv[(e[0] != 1 || e[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi"), a.dpDiv[(this._get(a, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), a == $.datepicker._curInst && $.datepicker._datepickerShowing && a.input && a.input.is(":visible") && !a.input.is(":disabled") && a.input[0] != document.activeElement && a.input.focus();
if (a.yearshtml) {
var h = a.yearshtml;
setTimeout(function() {
h === a.yearshtml && a.yearshtml && a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml), h = a.yearshtml = null;
}, 0);
}
},
_getBorders: function(a) {
var b = function(a) {
return {
thin: 1,
medium: 2,
thick: 3
}[a] || a;
};
return [ parseFloat(b(a.css("border-left-width"))), parseFloat(b(a.css("border-top-width"))) ];
},
_checkOffset: function(a, b, c) {
var d = a.dpDiv.outerWidth(), e = a.dpDiv.outerHeight(), f = a.input ? a.input.outerWidth() : 0, g = a.input ? a.input.outerHeight() : 0, h = document.documentElement.clientWidth + $(document).scrollLeft(), i = document.documentElement.clientHeight + $(document).scrollTop();
return b.left -= this._get(a, "isRTL") ? d - f : 0, b.left -= c && b.left == a.input.offset().left ? $(document).scrollLeft() : 0, b.top -= c && b.top == a.input.offset().top + g ? $(document).scrollTop() : 0, b.left -= Math.min(b.left, b.left + d > h && h > d ? Math.abs(b.left + d - h) : 0), b.top -= Math.min(b.top, b.top + e > i && i > e ? Math.abs(e + g) : 0), b;
},
_findPos: function(a) {
var b = this._getInst(a), c = this._get(b, "isRTL");
while (a && (a.type == "hidden" || a.nodeType != 1 || $.expr.filters.hidden(a))) a = a[c ? "previousSibling" : "nextSibling"];
var d = $(a).offset();
return [ d.left, d.top ];
},
_triggerOnClose: function(a) {
var b = this._get(a, "onClose");
b && b.apply(a.input ? a.input[0] : null, [ a.input ? a.input.val() : "", a ]);
},
_hideDatepicker: function(a) {
var b = this._curInst;
if (!b || a && b != $.data(a, PROP_NAME)) return;
if (this._datepickerShowing) {
var c = this._get(b, "showAnim"), d = this._get(b, "duration"), e = function() {
$.datepicker._tidyDialog(b), this._curInst = null;
};
$.effects && $.effects[c] ? b.dpDiv.hide(c, $.datepicker._get(b, "showOptions"), d, e) : b.dpDiv[c == "slideDown" ? "slideUp" : c == "fadeIn" ? "fadeOut" : "hide"](c ? d : null, e), c || e(), $.datepicker._triggerOnClose(b), this._datepickerShowing = !1, this._lastInput = null, this._inDialog && (this._dialogInput.css({
position: "absolute",
left: "0",
top: "-100px"
}), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))), this._inDialog = !1;
}
},
_tidyDialog: function(a) {
a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");
},
_checkExternalClick: function(a) {
if (!$.datepicker._curInst) return;
var b = $(a.target);
b[0].id != $.datepicker._mainDivId && b.parents("#" + $.datepicker._mainDivId).length == 0 && !b.hasClass($.datepicker.markerClassName) && !b.hasClass($.datepicker._triggerClass) && $.datepicker._datepickerShowing && (!$.datepicker._inDialog || !$.blockUI) && $.datepicker._hideDatepicker();
},
_adjustDate: function(a, b, c) {
var d = $(a), e = this._getInst(d[0]);
if (this._isDisabledDatepicker(d[0])) return;
this._adjustInstDate(e, b + (c == "M" ? this._get(e, "showCurrentAtPos") : 0), c), this._updateDatepicker(e);
},
_gotoToday: function(a) {
var b = $(a), c = this._getInst(b[0]);
if (this._get(c, "gotoCurrent") && c.currentDay) c.selectedDay = c.currentDay, c.drawMonth = c.selectedMonth = c.currentMonth, c.drawYear = c.selectedYear = c.currentYear; else {
var d = new Date;
c.selectedDay = d.getDate(), c.drawMonth = c.selectedMonth = d.getMonth(), c.drawYear = c.selectedYear = d.getFullYear();
}
this._notifyChange(c), this._adjustDate(b);
},
_selectMonthYear: function(a, b, c) {
var d = $(a), e = this._getInst(d[0]);
e["selected" + (c == "M" ? "Month" : "Year")] = e["draw" + (c == "M" ? "Month" : "Year")] = parseInt(b.options[b.selectedIndex].value, 10), this._notifyChange(e), this._adjustDate(d);
},
_selectDay: function(a, b, c, d) {
var e = $(a);
if ($(d).hasClass(this._unselectableClass) || this._isDisabledDatepicker(e[0])) return;
var f = this._getInst(e[0]);
f.selectedDay = f.currentDay = $("a", d).html(), f.selectedMonth = f.currentMonth = b, f.selectedYear = f.currentYear = c, this._selectDate(a, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear));
},
_clearDate: function(a) {
var b = $(a), c = this._getInst(b[0]);
this._selectDate(b, "");
},
_selectDate: function(a, b) {
var c = $(a), d = this._getInst(c[0]);
b = b != null ? b : this._formatDate(d), d.input && d.input.val(b), this._updateAlternate(d);
var e = this._get(d, "onSelect");
e ? e.apply(d.input ? d.input[0] : null, [ b, d ]) : d.input && d.input.trigger("change"), d.inline ? this._updateDatepicker(d) : (this._hideDatepicker(), this._lastInput = d.input[0], typeof d.input[0] != "object" && d.input.focus(), this._lastInput = null);
},
_updateAlternate: function(a) {
var b = this._get(a, "altField");
if (b) {
var c = this._get(a, "altFormat") || this._get(a, "dateFormat"), d = this._getDate(a), e = this.formatDate(c, d, this._getFormatConfig(a));
$(b).each(function() {
$(this).val(e);
});
}
},
noWeekends: function(a) {
var b = a.getDay();
return [ b > 0 && b < 6, "" ];
},
iso8601Week: function(a) {
var b = new Date(a.getTime());
b.setDate(b.getDate() + 4 - (b.getDay() || 7));
var c = b.getTime();
return b.setMonth(0), b.setDate(1), Math.floor(Math.round((c - b) / 864e5) / 7) + 1;
},
parseDate: function(a, b, c) {
if (a == null || b == null) throw "Invalid arguments";
b = typeof b == "object" ? b.toString() : b + "";
if (b == "") return null;
var d = (c ? c.shortYearCutoff : null) || this._defaults.shortYearCutoff;
d = typeof d != "string" ? d : (new Date).getFullYear() % 100 + parseInt(d, 10);
var e = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort, f = (c ? c.dayNames : null) || this._defaults.dayNames, g = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort, h = (c ? c.monthNames : null) || this._defaults.monthNames, i = -1, j = -1, k = -1, l = -1, m = !1, n = function(b) {
var c = s + 1 < a.length && a.charAt(s + 1) == b;
return c && s++, c;
}, o = function(a) {
var c = n(a), d = a == "@" ? 14 : a == "!" ? 20 : a == "y" && c ? 4 : a == "o" ? 3 : 2, e = new RegExp("^\\d{1," + d + "}"), f = b.substring(r).match(e);
if (!f) throw "Missing number at position " + r;
return r += f[0].length, parseInt(f[0], 10);
}, p = function(a, c, d) {
var e = $.map(n(a) ? d : c, function(a, b) {
return [ [ b, a ] ];
}).sort(function(a, b) {
return -(a[1].length - b[1].length);
}), f = -1;
$.each(e, function(a, c) {
var d = c[1];
if (b.substr(r, d.length).toLowerCase() == d.toLowerCase()) return f = c[0], r += d.length, !1;
});
if (f != -1) return f + 1;
throw "Unknown name at position " + r;
}, q = function() {
if (b.charAt(r) != a.charAt(s)) throw "Unexpected literal at position " + r;
r++;
}, r = 0;
for (var s = 0; s < a.length; s++) if (m) a.charAt(s) == "'" && !n("'") ? m = !1 : q(); else switch (a.charAt(s)) {
case "d":
k = o("d");
break;
case "D":
p("D", e, f);
break;
case "o":
l = o("o");
break;
case "m":
j = o("m");
break;
case "M":
j = p("M", g, h);
break;
case "y":
i = o("y");
break;
case "@":
var t = new Date(o("@"));
i = t.getFullYear(), j = t.getMonth() + 1, k = t.getDate();
break;
case "!":
var t = new Date((o("!") - this._ticksTo1970) / 1e4);
i = t.getFullYear(), j = t.getMonth() + 1, k = t.getDate();
break;
case "'":
n("'") ? q() : m = !0;
break;
default:
q();
}
if (r < b.length) throw "Extra/unparsed characters found in date: " + b.substring(r);
i == -1 ? i = (new Date).getFullYear() : i < 100 && (i += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (i <= d ? 0 : -100));
if (l > -1) {
j = 1, k = l;
do {
var u = this._getDaysInMonth(i, j - 1);
if (k <= u) break;
j++, k -= u;
} while (!0);
}
var t = this._daylightSavingAdjust(new Date(i, j - 1, k));
if (t.getFullYear() != i || t.getMonth() + 1 != j || t.getDate() != k) throw "Invalid date";
return t;
},
ATOM: "yy-mm-dd",
COOKIE: "D, dd M yy",
ISO_8601: "yy-mm-dd",
RFC_822: "D, d M y",
RFC_850: "DD, dd-M-y",
RFC_1036: "D, d M y",
RFC_1123: "D, d M yy",
RFC_2822: "D, d M yy",
RSS: "D, d M y",
TICKS: "!",
TIMESTAMP: "@",
W3C: "yy-mm-dd",
_ticksTo1970: (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 1e7,
formatDate: function(a, b, c) {
if (!b) return "";
var d = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort, e = (c ? c.dayNames : null) || this._defaults.dayNames, f = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort, g = (c ? c.monthNames : null) || this._defaults.monthNames, h = function(b) {
var c = m + 1 < a.length && a.charAt(m + 1) == b;
return c && m++, c;
}, i = function(a, b, c) {
var d = "" + b;
if (h(a)) while (d.length < c) d = "0" + d;
return d;
}, j = function(a, b, c, d) {
return h(a) ? d[b] : c[b];
}, k = "", l = !1;
if (b) for (var m = 0; m < a.length; m++) if (l) a.charAt(m) == "'" && !h("'") ? l = !1 : k += a.charAt(m); else switch (a.charAt(m)) {
case "d":
k += i("d", b.getDate(), 2);
break;
case "D":
k += j("D", b.getDay(), d, e);
break;
case "o":
k += i("o", Math.round(((new Date(b.getFullYear(), b.getMonth(), b.getDate())).getTime() - (new Date(b.getFullYear(), 0, 0)).getTime()) / 864e5), 3);
break;
case "m":
k += i("m", b.getMonth() + 1, 2);
break;
case "M":
k += j("M", b.getMonth(), f, g);
break;
case "y":
k += h("y") ? b.getFullYear() : (b.getYear() % 100 < 10 ? "0" : "") + b.getYear() % 100;
break;
case "@":
k += b.getTime();
break;
case "!":
k += b.getTime() * 1e4 + this._ticksTo1970;
break;
case "'":
h("'") ? k += "'" : l = !0;
break;
default:
k += a.charAt(m);
}
return k;
},
_possibleChars: function(a) {
var b = "", c = !1, d = function(b) {
var c = e + 1 < a.length && a.charAt(e + 1) == b;
return c && e++, c;
};
for (var e = 0; e < a.length; e++) if (c) a.charAt(e) == "'" && !d("'") ? c = !1 : b += a.charAt(e); else switch (a.charAt(e)) {
case "d":
case "m":
case "y":
case "@":
b += "0123456789";
break;
case "D":
case "M":
return null;
case "'":
d("'") ? b += "'" : c = !0;
break;
default:
b += a.charAt(e);
}
return b;
},
_get: function(a, b) {
return a.settings[b] !== undefined ? a.settings[b] : this._defaults[b];
},
_setDateFromField: function(a, b) {
if (a.input.val() == a.lastVal) return;
var c = this._get(a, "dateFormat"), d = a.lastVal = a.input ? a.input.val() : null, e, f;
e = f = this._getDefaultDate(a);
var g = this._getFormatConfig(a);
try {
e = this.parseDate(c, d, g) || f;
} catch (h) {
this.log(h), d = b ? "" : d;
}
a.selectedDay = e.getDate(), a.drawMonth = a.selectedMonth = e.getMonth(), a.drawYear = a.selectedYear = e.getFullYear(), a.currentDay = d ? e.getDate() : 0, a.currentMonth = d ? e.getMonth() : 0, a.currentYear = d ? e.getFullYear() : 0, this._adjustInstDate(a);
},
_getDefaultDate: function(a) {
return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date));
},
_determineDate: function(a, b, c) {
var d = function(a) {
var b = new Date;
return b.setDate(b.getDate() + a), b;
}, e = function(b) {
try {
return $.datepicker.parseDate($.datepicker._get(a, "dateFormat"), b, $.datepicker._getFormatConfig(a));
} catch (c) {}
var d = (b.toLowerCase().match(/^c/) ? $.datepicker._getDate(a) : null) || new Date, e = d.getFullYear(), f = d.getMonth(), g = d.getDate(), h = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, i = h.exec(b);
while (i) {
switch (i[2] || "d") {
case "d":
case "D":
g += parseInt(i[1], 10);
break;
case "w":
case "W":
g += parseInt(i[1], 10) * 7;
break;
case "m":
case "M":
f += parseInt(i[1], 10), g = Math.min(g, $.datepicker._getDaysInMonth(e, f));
break;
case "y":
case "Y":
e += parseInt(i[1], 10), g = Math.min(g, $.datepicker._getDaysInMonth(e, f));
}
i = h.exec(b);
}
return new Date(e, f, g);
}, f = b == null || b === "" ? c : typeof b == "string" ? e(b) : typeof b == "number" ? isNaN(b) ? c : d(b) : new Date(b.getTime());
return f = f && f.toString() == "Invalid Date" ? c : f, f && (f.setHours(0), f.setMinutes(0), f.setSeconds(0), f.setMilliseconds(0)), this._daylightSavingAdjust(f);
},
_daylightSavingAdjust: function(a) {
return a ? (a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0), a) : null;
},
_setDate: function(a, b, c) {
var d = !b, e = a.selectedMonth, f = a.selectedYear, g = this._restrictMinMax(a, this._determineDate(a, b, new Date));
a.selectedDay = a.currentDay = g.getDate(), a.drawMonth = a.selectedMonth = a.currentMonth = g.getMonth(), a.drawYear = a.selectedYear = a.currentYear = g.getFullYear(), (e != a.selectedMonth || f != a.selectedYear) && !c && this._notifyChange(a), this._adjustInstDate(a), a.input && a.input.val(d ? "" : this._formatDate(a));
},
_getDate: function(a) {
var b = !a.currentYear || a.input && a.input.val() == "" ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
return b;
},
_generateHTML: function(a) {
var b = new Date;
b = this._daylightSavingAdjust(new Date(b.getFullYear(), b.getMonth(), b.getDate()));
var c = this._get(a, "isRTL"), d = this._get(a, "showButtonPanel"), e = this._get(a, "hideIfNoPrevNext"), f = this._get(a, "navigationAsDateFormat"), g = this._getNumberOfMonths(a), h = this._get(a, "showCurrentAtPos"), i = this._get(a, "stepMonths"), j = g[0] != 1 || g[1] != 1, k = this._daylightSavingAdjust(a.currentDay ? new Date(a.currentYear, a.currentMonth, a.currentDay) : new Date(9999, 9, 9)), l = this._getMinMaxDate(a, "min"), m = this._getMinMaxDate(a, "max"), n = a.drawMonth - h, o = a.drawYear;
n < 0 && (n += 12, o--);
if (m) {
var p = this._daylightSavingAdjust(new Date(m.getFullYear(), m.getMonth() - g[0] * g[1] + 1, m.getDate()));
p = l && p < l ? l : p;
while (this._daylightSavingAdjust(new Date(o, n, 1)) > p) n--, n < 0 && (n = 11, o--);
}
a.drawMonth = n, a.drawYear = o;
var q = this._get(a, "prevText");
q = f ? this.formatDate(q, this._daylightSavingAdjust(new Date(o, n - i, 1)), this._getFormatConfig(a)) : q;
var r = this._canAdjustMonth(a, -1, o, n) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._adjustDate('#" + a.id + "', -" + i + ", 'M');\"" + ' title="' + q + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "e" : "w") + '">' + q + "</span></a>" : e ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + q + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "e" : "w") + '">' + q + "</span></a>", s = this._get(a, "nextText");
s = f ? this.formatDate(s, this._daylightSavingAdjust(new Date(o, n + i, 1)), this._getFormatConfig(a)) : s;
var t = this._canAdjustMonth(a, 1, o, n) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._adjustDate('#" + a.id + "', +" + i + ", 'M');\"" + ' title="' + s + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "w" : "e") + '">' + s + "</span></a>" : e ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + s + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "w" : "e") + '">' + s + "</span></a>", u = this._get(a, "currentText"), v = this._get(a, "gotoCurrent") && a.currentDay ? k : b;
u = f ? this.formatDate(u, v, this._getFormatConfig(a)) : u;
var w = a.inline ? "" : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + dpuuid + '.datepicker._hideDatepicker();">' + this._get(a, "closeText") + "</button>", x = d ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (c ? w : "") + (this._isInRange(a, v) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._gotoToday('#" + a.id + "');\"" + ">" + u + "</button>" : "") + (c ? "" : w) + "</div>" : "", y = parseInt(this._get(a, "firstDay"), 10);
y = isNaN(y) ? 0 : y;
var z = this._get(a, "showWeek"), A = this._get(a, "dayNames"), B = this._get(a, "dayNamesShort"), C = this._get(a, "dayNamesMin"), D = this._get(a, "monthNames"), E = this._get(a, "monthNamesShort"), F = this._get(a, "beforeShowDay"), G = this._get(a, "showOtherMonths"), H = this._get(a, "selectOtherMonths"), I = this._get(a, "calculateWeek") || this.iso8601Week, J = this._getDefaultDate(a), K = "";
for (var L = 0; L < g[0]; L++) {
var M = "";
this.maxRows = 4;
for (var N = 0; N < g[1]; N++) {
var O = this._daylightSavingAdjust(new Date(o, n, a.selectedDay)), P = " ui-corner-all", Q = "";
if (j) {
Q += '<div class="ui-datepicker-group';
if (g[1] > 1) switch (N) {
case 0:
Q += " ui-datepicker-group-first", P = " ui-corner-" + (c ? "right" : "left");
break;
case g[1] - 1:
Q += " ui-datepicker-group-last", P = " ui-corner-" + (c ? "left" : "right");
break;
default:
Q += " ui-datepicker-group-middle", P = "";
}
Q += '">';
}
Q += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + P + '">' + (/all|left/.test(P) && L == 0 ? c ? t : r : "") + (/all|right/.test(P) && L == 0 ? c ? r : t : "") + this._generateMonthYearHeader(a, n, o, l, m, L > 0 || N > 0, D, E) + '</div><table class="ui-datepicker-calendar"><thead>' + "<tr>";
var R = z ? '<th class="ui-datepicker-week-col">' + this._get(a, "weekHeader") + "</th>" : "";
for (var S = 0; S < 7; S++) {
var T = (S + y) % 7;
R += "<th" + ((S + y + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + ">" + '<span title="' + A[T] + '">' + C[T] + "</span></th>";
}
Q += R + "</tr></thead><tbody>";
var U = this._getDaysInMonth(o, n);
o == a.selectedYear && n == a.selectedMonth && (a.selectedDay = Math.min(a.selectedDay, U));
var V = (this._getFirstDayOfMonth(o, n) - y + 7) % 7, W = Math.ceil((V + U) / 7), X = j ? this.maxRows > W ? this.maxRows : W : W;
this.maxRows = X;
var Y = this._daylightSavingAdjust(new Date(o, n, 1 - V));
for (var Z = 0; Z < X; Z++) {
Q += "<tr>";
var _ = z ? '<td class="ui-datepicker-week-col">' + this._get(a, "calculateWeek")(Y) + "</td>" : "";
for (var S = 0; S < 7; S++) {
var ba = F ? F.apply(a.input ? a.input[0] : null, [ Y ]) : [ !0, "" ], bb = Y.getMonth() != n, bc = bb && !H || !ba[0] || l && Y < l || m && Y > m;
_ += '<td class="' + ((S + y + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (bb ? " ui-datepicker-other-month" : "") + (Y.getTime() == O.getTime() && n == a.selectedMonth && a._keyEvent || J.getTime() == Y.getTime() && J.getTime() == O.getTime() ? " " + this._dayOverClass : "") + (bc ? " " + this._unselectableClass + " ui-state-disabled" : "") + (bb && !G ? "" : " " + ba[1] + (Y.getTime() == k.getTime() ? " " + this._currentClass : "") + (Y.getTime() == b.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!bb || G) && ba[2] ? ' title="' + ba[2] + '"' : "") + (bc ? "" : ' onclick="DP_jQuery_' + dpuuid + ".datepicker._selectDay('#" + a.id + "'," + Y.getMonth() + "," + Y.getFullYear() + ', this);return false;"') + ">" + (bb && !G ? "&#xa0;" : bc ? '<span class="ui-state-default">' + Y.getDate() + "</span>" : '<a class="ui-state-default' + (Y.getTime() == b.getTime() ? " ui-state-highlight" : "") + (Y.getTime() == k.getTime() ? " ui-state-active" : "") + (bb ? " ui-priority-secondary" : "") + '" href="#">' + Y.getDate() + "</a>") + "</td>", Y.setDate(Y.getDate() + 1), Y = this._daylightSavingAdjust(Y);
}
Q += _ + "</tr>";
}
n++, n > 11 && (n = 0, o++), Q += "</tbody></table>" + (j ? "</div>" + (g[0] > 0 && N == g[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : ""), M += Q;
}
K += M;
}
return K += x + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !a.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : ""), a._keyEvent = !1, K;
},
_generateMonthYearHeader: function(a, b, c, d, e, f, g, h) {
var i = this._get(a, "changeMonth"), j = this._get(a, "changeYear"), k = this._get(a, "showMonthAfterYear"), l = '<div class="ui-datepicker-title">', m = "";
if (f || !i) m += '<span class="ui-datepicker-month">' + g[b] + "</span>"; else {
var n = d && d.getFullYear() == c, o = e && e.getFullYear() == c;
m += '<select class="ui-datepicker-month" onchange="DP_jQuery_' + dpuuid + ".datepicker._selectMonthYear('#" + a.id + "', this, 'M');\" " + ">";
for (var p = 0; p < 12; p++) (!n || p >= d.getMonth()) && (!o || p <= e.getMonth()) && (m += '<option value="' + p + '"' + (p == b ? ' selected="selected"' : "") + ">" + h[p] + "</option>");
m += "</select>";
}
k || (l += m + (f || !i || !j ? "&#xa0;" : ""));
if (!a.yearshtml) {
a.yearshtml = "";
if (f || !j) l += '<span class="ui-datepicker-year">' + c + "</span>"; else {
var q = this._get(a, "yearRange").split(":"), r = (new Date).getFullYear(), s = function(a) {
var b = a.match(/c[+-].*/) ? c + parseInt(a.substring(1), 10) : a.match(/[+-].*/) ? r + parseInt(a, 10) : parseInt(a, 10);
return isNaN(b) ? r : b;
}, t = s(q[0]), u = Math.max(t, s(q[1] || ""));
t = d ? Math.max(t, d.getFullYear()) : t, u = e ? Math.min(u, e.getFullYear()) : u, a.yearshtml += '<select class="ui-datepicker-year" onchange="DP_jQuery_' + dpuuid + ".datepicker._selectMonthYear('#" + a.id + "', this, 'Y');\" " + ">";
for (; t <= u; t++) a.yearshtml += '<option value="' + t + '"' + (t == c ? ' selected="selected"' : "") + ">" + t + "</option>";
a.yearshtml += "</select>", l += a.yearshtml, a.yearshtml = null;
}
}
return l += this._get(a, "yearSuffix"), k && (l += (f || !i || !j ? "&#xa0;" : "") + m), l += "</div>", l;
},
_adjustInstDate: function(a, b, c) {
var d = a.drawYear + (c == "Y" ? b : 0), e = a.drawMonth + (c == "M" ? b : 0), f = Math.min(a.selectedDay, this._getDaysInMonth(d, e)) + (c == "D" ? b : 0), g = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(d, e, f)));
a.selectedDay = g.getDate(), a.drawMonth = a.selectedMonth = g.getMonth(), a.drawYear = a.selectedYear = g.getFullYear(), (c == "M" || c == "Y") && this._notifyChange(a);
},
_restrictMinMax: function(a, b) {
var c = this._getMinMaxDate(a, "min"), d = this._getMinMaxDate(a, "max"), e = c && b < c ? c : b;
return e = d && e > d ? d : e, e;
},
_notifyChange: function(a) {
var b = this._get(a, "onChangeMonthYear");
b && b.apply(a.input ? a.input[0] : null, [ a.selectedYear, a.selectedMonth + 1, a ]);
},
_getNumberOfMonths: function(a) {
var b = this._get(a, "numberOfMonths");
return b == null ? [ 1, 1 ] : typeof b == "number" ? [ 1, b ] : b;
},
_getMinMaxDate: function(a, b) {
return this._determineDate(a, this._get(a, b + "Date"), null);
},
_getDaysInMonth: function(a, b) {
return 32 - this._daylightSavingAdjust(new Date(a, b, 32)).getDate();
},
_getFirstDayOfMonth: function(a, b) {
return (new Date(a, b, 1)).getDay();
},
_canAdjustMonth: function(a, b, c, d) {
var e = this._getNumberOfMonths(a), f = this._daylightSavingAdjust(new Date(c, d + (b < 0 ? b : e[0] * e[1]), 1));
return b < 0 && f.setDate(this._getDaysInMonth(f.getFullYear(), f.getMonth())), this._isInRange(a, f);
},
_isInRange: function(a, b) {
var c = this._getMinMaxDate(a, "min"), d = this._getMinMaxDate(a, "max");
return (!c || b.getTime() >= c.getTime()) && (!d || b.getTime() <= d.getTime());
},
_getFormatConfig: function(a) {
var b = this._get(a, "shortYearCutoff");
return b = typeof b != "string" ? b : (new Date).getFullYear() % 100 + parseInt(b, 10), {
shortYearCutoff: b,
dayNamesShort: this._get(a, "dayNamesShort"),
dayNames: this._get(a, "dayNames"),
monthNamesShort: this._get(a, "monthNamesShort"),
monthNames: this._get(a, "monthNames")
};
},
_formatDate: function(a, b, c, d) {
b || (a.currentDay = a.selectedDay, a.currentMonth = a.selectedMonth, a.currentYear = a.selectedYear);
var e = b ? typeof b == "object" ? b : this._daylightSavingAdjust(new Date(d, c, b)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
return this.formatDate(this._get(a, "dateFormat"), e, this._getFormatConfig(a));
}
}), $.fn.datepicker = function(a) {
if (!this.length) return this;
$.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv), $.datepicker.initialized = !0);
var b = Array.prototype.slice.call(arguments, 1);
return typeof a != "string" || a != "isDisabled" && a != "getDate" && a != "widget" ? a == "option" && arguments.length == 2 && typeof arguments[1] == "string" ? $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [ this[0] ].concat(b)) : this.each(function() {
typeof a == "string" ? $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [ this ].concat(b)) : $.datepicker._attachDatepicker(this, a);
}) : $.datepicker["_" + a + "Datepicker"].apply($.datepicker, [ this[0] ].concat(b));
}, $.datepicker = new Datepicker, $.datepicker.initialized = !1, $.datepicker.uuid = (new Date).getTime(), $.datepicker.version = "1.8.16", window["DP_jQuery_" + dpuuid] = $;
}(jQuery), function(a, b) {
a.widget("ui.progressbar", {
options: {
value: 0,
max: 100
},
min: 0,
_create: function() {
this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
role: "progressbar",
"aria-valuemin": this.min,
"aria-valuemax": this.options.max,
"aria-valuenow": this._value()
}), this.valueDiv = a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this.oldValue = this._value(), this._refreshValue();
},
destroy: function() {
this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove(), a.Widget.prototype.destroy.apply(this, arguments);
},
value: function(a) {
return a === b ? this._value() : (this._setOption("value", a), this);
},
_setOption: function(b, c) {
b === "value" && (this.options.value = c, this._refreshValue(), this._value() === this.options.max && this._trigger("complete")), a.Widget.prototype._setOption.apply(this, arguments);
},
_value: function() {
var a = this.options.value;
return typeof a != "number" && (a = 0), Math.min(this.options.max, Math.max(this.min, a));
},
_percentage: function() {
return 100 * this._value() / this.options.max;
},
_refreshValue: function() {
var a = this.value(), b = this._percentage();
this.oldValue !== a && (this.oldValue = a, this._trigger("change")), this.valueDiv.toggle(a > this.min).toggleClass("ui-corner-right", a === this.options.max).width(b.toFixed(0) + "%"), this.element.attr("aria-valuenow", a);
}
}), a.extend(a.ui.progressbar, {
version: "1.8.16"
});
}(jQuery), jQuery.effects || function(a, b) {
function c(b) {
var c;
return b && b.constructor == Array && b.length == 3 ? b : (c = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b)) ? [ parseInt(c[1], 10), parseInt(c[2], 10), parseInt(c[3], 10) ] : (c = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b)) ? [ parseFloat(c[1]) * 2.55, parseFloat(c[2]) * 2.55, parseFloat(c[3]) * 2.55 ] : (c = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(b)) ? [ parseInt(c[1], 16), parseInt(c[2], 16), parseInt(c[3], 16) ] : (c = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(b)) ? [ parseInt(c[1] + c[1], 16), parseInt(c[2] + c[2], 16), parseInt(c[3] + c[3], 16) ] : (c = /rgba\(0, 0, 0, 0\)/.exec(b)) ? e.transparent : e[a.trim(b).toLowerCase()];
}
function d(b, d) {
var e;
do {
e = a.curCSS(b, d);
if (e != "" && e != "transparent" || a.nodeName(b, "body")) break;
d = "backgroundColor";
} while (b = b.parentNode);
return c(e);
}
function h() {
var a = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle, b = {}, c, d;
if (a && a.length && a[0] && a[a[0]]) {
var e = a.length;
while (e--) c = a[e], typeof a[c] == "string" && (d = c.replace(/\-(\w)/g, function(a, b) {
return b.toUpperCase();
}), b[d] = a[c]);
} else for (c in a) typeof a[c] == "string" && (b[c] = a[c]);
return b;
}
function i(b) {
var c, d;
for (c in b) d = b[c], (d == null || a.isFunction(d) || c in g || /scrollbar/.test(c) || !/color/i.test(c) && isNaN(parseFloat(d))) && delete b[c];
return b;
}
function j(a, b) {
var c = {
_: 0
}, d;
for (d in b) a[d] != b[d] && (c[d] = b[d]);
return c;
}
function k(b, c, d, e) {
typeof b == "object" && (e = c, d = null, c = b, b = c.effect), a.isFunction(c) && (e = c, d = null, c = {});
if (typeof c == "number" || a.fx.speeds[c]) e = d, d = c, c = {};
return a.isFunction(d) && (e = d, d = null), c = c || {}, d = d || c.duration, d = a.fx.off ? 0 : typeof d == "number" ? d : d in a.fx.speeds ? a.fx.speeds[d] : a.fx.speeds._default, e = e || c.complete, [ b, c, d, e ];
}
function l(b) {
return !b || typeof b == "number" || a.fx.speeds[b] ? !0 : typeof b == "string" && !a.effects[b] ? !0 : !1;
}
a.effects = {}, a.each([ "backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor" ], function(b, e) {
a.fx.step[e] = function(a) {
a.colorInit || (a.start = d(a.elem, e), a.end = c(a.end), a.colorInit = !0), a.elem.style[e] = "rgb(" + Math.max(Math.min(parseInt(a.pos * (a.end[0] - a.start[0]) + a.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(a.pos * (a.end[1] - a.start[1]) + a.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(a.pos * (a.end[2] - a.start[2]) + a.start[2], 10), 255), 0) + ")";
};
});
var e = {
aqua: [ 0, 255, 255 ],
azure: [ 240, 255, 255 ],
beige: [ 245, 245, 220 ],
black: [ 0, 0, 0 ],
blue: [ 0, 0, 255 ],
brown: [ 165, 42, 42 ],
cyan: [ 0, 255, 255 ],
darkblue: [ 0, 0, 139 ],
darkcyan: [ 0, 139, 139 ],
darkgrey: [ 169, 169, 169 ],
darkgreen: [ 0, 100, 0 ],
darkkhaki: [ 189, 183, 107 ],
darkmagenta: [ 139, 0, 139 ],
darkolivegreen: [ 85, 107, 47 ],
darkorange: [ 255, 140, 0 ],
darkorchid: [ 153, 50, 204 ],
darkred: [ 139, 0, 0 ],
darksalmon: [ 233, 150, 122 ],
darkviolet: [ 148, 0, 211 ],
fuchsia: [ 255, 0, 255 ],
gold: [ 255, 215, 0 ],
green: [ 0, 128, 0 ],
indigo: [ 75, 0, 130 ],
khaki: [ 240, 230, 140 ],
lightblue: [ 173, 216, 230 ],
lightcyan: [ 224, 255, 255 ],
lightgreen: [ 144, 238, 144 ],
lightgrey: [ 211, 211, 211 ],
lightpink: [ 255, 182, 193 ],
lightyellow: [ 255, 255, 224 ],
lime: [ 0, 255, 0 ],
magenta: [ 255, 0, 255 ],
maroon: [ 128, 0, 0 ],
navy: [ 0, 0, 128 ],
olive: [ 128, 128, 0 ],
orange: [ 255, 165, 0 ],
pink: [ 255, 192, 203 ],
purple: [ 128, 0, 128 ],
violet: [ 128, 0, 128 ],
red: [ 255, 0, 0 ],
silver: [ 192, 192, 192 ],
white: [ 255, 255, 255 ],
yellow: [ 255, 255, 0 ],
transparent: [ 255, 255, 255 ]
}, f = [ "add", "remove", "toggle" ], g = {
border: 1,
borderBottom: 1,
borderColor: 1,
borderLeft: 1,
borderRight: 1,
borderTop: 1,
borderWidth: 1,
margin: 1,
padding: 1
};
a.effects.animateClass = function(b, c, d, e) {
return a.isFunction(d) && (e = d, d = null), this.queue(function() {
var g = a(this), k = g.attr("style") || " ", l = i(h.call(this)), m, n = g.attr("class");
a.each(f, function(a, c) {
b[c] && g[c + "Class"](b[c]);
}), m = i(h.call(this)), g.attr("class", n), g.animate(j(l, m), {
queue: !1,
duration: c,
easing: d,
complete: function() {
a.each(f, function(a, c) {
b[c] && g[c + "Class"](b[c]);
}), typeof g.attr("style") == "object" ? (g.attr("style").cssText = "", g.attr("style").cssText = k) : g.attr("style", k), e && e.apply(this, arguments), a.dequeue(this);
}
});
});
}, a.fn.extend({
_addClass: a.fn.addClass,
addClass: function(b, c, d, e) {
return c ? a.effects.animateClass.apply(this, [ {
add: b
}, c, d, e ]) : this._addClass(b);
},
_removeClass: a.fn.removeClass,
removeClass: function(b, c, d, e) {
return c ? a.effects.animateClass.apply(this, [ {
remove: b
}, c, d, e ]) : this._removeClass(b);
},
_toggleClass: a.fn.toggleClass,
toggleClass: function(c, d, e, f, g) {
return typeof d == "boolean" || d === b ? e ? a.effects.animateClass.apply(this, [ d ? {
add: c
} : {
remove: c
}, e, f, g ]) : this._toggleClass(c, d) : a.effects.animateClass.apply(this, [ {
toggle: c
}, d, e, f ]);
},
switchClass: function(b, c, d, e, f) {
return a.effects.animateClass.apply(this, [ {
add: c,
remove: b
}, d, e, f ]);
}
}), a.extend(a.effects, {
version: "1.8.16",
save: function(a, b) {
for (var c = 0; c < b.length; c++) b[c] !== null && a.data("ec.storage." + b[c], a[0].style[b[c]]);
},
restore: function(a, b) {
for (var c = 0; c < b.length; c++) b[c] !== null && a.css(b[c], a.data("ec.storage." + b[c]));
},
setMode: function(a, b) {
return b == "toggle" && (b = a.is(":hidden") ? "show" : "hide"), b;
},
getBaseline: function(a, b) {
var c, d;
switch (a[0]) {
case "top":
c = 0;
break;
case "middle":
c = .5;
break;
case "bottom":
c = 1;
break;
default:
c = a[0] / b.height;
}
switch (a[1]) {
case "left":
d = 0;
break;
case "center":
d = .5;
break;
case "right":
d = 1;
break;
default:
d = a[1] / b.width;
}
return {
x: d,
y: c
};
},
createWrapper: function(b) {
if (b.parent().is(".ui-effects-wrapper")) return b.parent();
var c = {
width: b.outerWidth(!0),
height: b.outerHeight(!0),
"float": b.css("float")
}, d = a("<div></div>").addClass("ui-effects-wrapper").css({
fontSize: "100%",
background: "transparent",
border: "none",
margin: 0,
padding: 0
}), e = document.activeElement;
return b.wrap(d), (b[0] === e || a.contains(b[0], e)) && a(e).focus(), d = b.parent(), b.css("position") == "static" ? (d.css({
position: "relative"
}), b.css({
position: "relative"
})) : (a.extend(c, {
position: b.css("position"),
zIndex: b.css("z-index")
}), a.each([ "top", "left", "bottom", "right" ], function(a, d) {
c[d] = b.css(d), isNaN(parseInt(c[d], 10)) && (c[d] = "auto");
}), b.css({
position: "relative",
top: 0,
left: 0,
right: "auto",
bottom: "auto"
})), d.css(c).show();
},
removeWrapper: function(b) {
var c, d = document.activeElement;
return b.parent().is(".ui-effects-wrapper") ? (c = b.parent().replaceWith(b), (b[0] === d || a.contains(b[0], d)) && a(d).focus(), c) : b;
},
setTransition: function(b, c, d, e) {
return e = e || {}, a.each(c, function(a, c) {
unit = b.cssUnit(c), unit[0] > 0 && (e[c] = unit[0] * d + unit[1]);
}), e;
}
}), a.fn.extend({
effect: function(b, c, d, e) {
var f = k.apply(this, arguments), g = {
options: f[1],
duration: f[2],
callback: f[3]
}, h = g.options.mode, i = a.effects[b];
return a.fx.off || !i ? h ? this[h](g.duration, g.callback) : this.each(function() {
g.callback && g.callback.call(this);
}) : i.call(this, g);
},
_show: a.fn.show,
show: function(a) {
if (l(a)) return this._show.apply(this, arguments);
var b = k.apply(this, arguments);
return b[1].mode = "show", this.effect.apply(this, b);
},
_hide: a.fn.hide,
hide: function(a) {
if (l(a)) return this._hide.apply(this, arguments);
var b = k.apply(this, arguments);
return b[1].mode = "hide", this.effect.apply(this, b);
},
__toggle: a.fn.toggle,
toggle: function(b) {
if (l(b) || typeof b == "boolean" || a.isFunction(b)) return this.__toggle.apply(this, arguments);
var c = k.apply(this, arguments);
return c[1].mode = "toggle", this.effect.apply(this, c);
},
cssUnit: function(b) {
var c = this.css(b), d = [];
return a.each([ "em", "px", "%", "pt" ], function(a, b) {
c.indexOf(b) > 0 && (d = [ parseFloat(c), b ]);
}), d;
}
}), a.easing.jswing = a.easing.swing, a.extend(a.easing, {
def: "easeOutQuad",
swing: function(b, c, d, e, f) {
return a.easing[a.easing.def](b, c, d, e, f);
},
easeInQuad: function(a, b, c, d, e) {
return d * (b /= e) * b + c;
},
easeOutQuad: function(a, b, c, d, e) {
return -d * (b /= e) * (b - 2) + c;
},
easeInOutQuad: function(a, b, c, d, e) {
return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c;
},
easeInCubic: function(a, b, c, d, e) {
return d * (b /= e) * b * b + c;
},
easeOutCubic: function(a, b, c, d, e) {
return d * ((b = b / e - 1) * b * b + 1) + c;
},
easeInOutCubic: function(a, b, c, d, e) {
return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c;
},
easeInQuart: function(a, b, c, d, e) {
return d * (b /= e) * b * b * b + c;
},
easeOutQuart: function(a, b, c, d, e) {
return -d * ((b = b / e - 1) * b * b * b - 1) + c;
},
easeInOutQuart: function(a, b, c, d, e) {
return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c;
},
easeInQuint: function(a, b, c, d, e) {
return d * (b /= e) * b * b * b * b + c;
},
easeOutQuint: function(a, b, c, d, e) {
return d * ((b = b / e - 1) * b * b * b * b + 1) + c;
},
easeInOutQuint: function(a, b, c, d, e) {
return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c;
},
easeInSine: function(a, b, c, d, e) {
return -d * Math.cos(b / e * (Math.PI / 2)) + d + c;
},
easeOutSine: function(a, b, c, d, e) {
return d * Math.sin(b / e * (Math.PI / 2)) + c;
},
easeInOutSine: function(a, b, c, d, e) {
return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c;
},
easeInExpo: function(a, b, c, d, e) {
return b == 0 ? c : d * Math.pow(2, 10 * (b / e - 1)) + c;
},
easeOutExpo: function(a, b, c, d, e) {
return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c;
},
easeInOutExpo: function(a, b, c, d, e) {
return b == 0 ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c;
},
easeInCirc: function(a, b, c, d, e) {
return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c;
},
easeOutCirc: function(a, b, c, d, e) {
return d * Math.sqrt(1 - (b = b / e - 1) * b) + c;
},
easeInOutCirc: function(a, b, c, d, e) {
return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c;
},
easeInElastic: function(a, b, c, d, e) {
var f = 1.70158, g = 0, h = d;
if (b == 0) return c;
if ((b /= e) == 1) return c + d;
g || (g = e * .3);
if (h < Math.abs(d)) {
h = d;
var f = g / 4;
} else var f = g / (2 * Math.PI) * Math.asin(d / h);
return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g)) + c;
},
easeOutElastic: function(a, b, c, d, e) {
var f = 1.70158, g = 0, h = d;
if (b == 0) return c;
if ((b /= e) == 1) return c + d;
g || (g = e * .3);
if (h < Math.abs(d)) {
h = d;
var f = g / 4;
} else var f = g / (2 * Math.PI) * Math.asin(d / h);
return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c;
},
easeInOutElastic: function(a, b, c, d, e) {
var f = 1.70158, g = 0, h = d;
if (b == 0) return c;
if ((b /= e / 2) == 2) return c + d;
g || (g = e * .3 * 1.5);
if (h < Math.abs(d)) {
h = d;
var f = g / 4;
} else var f = g / (2 * Math.PI) * Math.asin(d / h);
return b < 1 ? -0.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + c : h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) * .5 + d + c;
},
easeInBack: function(a, c, d, e, f, g) {
return g == b && (g = 1.70158), e * (c /= f) * c * ((g + 1) * c - g) + d;
},
easeOutBack: function(a, c, d, e, f, g) {
return g == b && (g = 1.70158), e * ((c = c / f - 1) * c * ((g + 1) * c + g) + 1) + d;
},
easeInOutBack: function(a, c, d, e, f, g) {
return g == b && (g = 1.70158), (c /= f / 2) < 1 ? e / 2 * c * c * (((g *= 1.525) + 1) * c - g) + d : e / 2 * ((c -= 2) * c * (((g *= 1.525) + 1) * c + g) + 2) + d;
},
easeInBounce: function(b, c, d, e, f) {
return e - a.easing.easeOutBounce(b, f - c, 0, e, f) + d;
},
easeOutBounce: function(a, b, c, d, e) {
return (b /= e) < 1 / 2.75 ? d * 7.5625 * b * b + c : b < 2 / 2.75 ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : b < 2.5 / 2.75 ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c;
},
easeInOutBounce: function(b, c, d, e, f) {
return c < f / 2 ? a.easing.easeInBounce(b, c * 2, 0, e, f) * .5 + d : a.easing.easeOutBounce(b, c * 2 - f, 0, e, f) * .5 + e * .5 + d;
}
});
}(jQuery), function(a, b) {
a.effects.bounce = function(b) {
return this.queue(function() {
var c = a(this), d = [ "position", "top", "bottom", "left", "right" ], e = a.effects.setMode(c, b.options.mode || "effect"), f = b.options.direction || "up", g = b.options.distance || 20, h = b.options.times || 5, i = b.duration || 250;
/show|hide/.test(e) && d.push("opacity"), a.effects.save(c, d), c.show(), a.effects.createWrapper(c);
var j = f == "up" || f == "down" ? "top" : "left", k = f == "up" || f == "left" ? "pos" : "neg", g = b.options.distance || (j == "top" ? c.outerHeight({
margin: !0
}) / 3 : c.outerWidth({
margin: !0
}) / 3);
e == "show" && c.css("opacity", 0).css(j, k == "pos" ? -g : g), e == "hide" && (g /= h * 2), e != "hide" && h--;
if (e == "show") {
var l = {
opacity: 1
};
l[j] = (k == "pos" ? "+=" : "-=") + g, c.animate(l, i / 2, b.options.easing), g /= 2, h--;
}
for (var m = 0; m < h; m++) {
var n = {}, p = {};
n[j] = (k == "pos" ? "-=" : "+=") + g, p[j] = (k == "pos" ? "+=" : "-=") + g, c.animate(n, i / 2, b.options.easing).animate(p, i / 2, b.options.easing), g = e == "hide" ? g * 2 : g / 2;
}
if (e == "hide") {
var l = {
opacity: 0
};
l[j] = (k == "pos" ? "-=" : "+=") + g, c.animate(l, i / 2, b.options.easing, function() {
c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments);
});
} else {
var n = {}, p = {};
n[j] = (k == "pos" ? "-=" : "+=") + g, p[j] = (k == "pos" ? "+=" : "-=") + g, c.animate(n, i / 2, b.options.easing).animate(p, i / 2, b.options.easing, function() {
a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments);
});
}
c.queue("fx", function() {
c.dequeue();
}), c.dequeue();
});
};
}(jQuery), function(a, b) {
a.effects.drop = function(b) {
return this.queue(function() {
var c = a(this), d = [ "position", "top", "bottom", "left", "right", "opacity" ], e = a.effects.setMode(c, b.options.mode || "hide"), f = b.options.direction || "left";
a.effects.save(c, d), c.show(), a.effects.createWrapper(c);
var g = f == "up" || f == "down" ? "top" : "left", h = f == "up" || f == "left" ? "pos" : "neg", i = b.options.distance || (g == "top" ? c.outerHeight({
margin: !0
}) / 2 : c.outerWidth({
margin: !0
}) / 2);
e == "show" && c.css("opacity", 0).css(g, h == "pos" ? -i : i);
var j = {
opacity: e == "show" ? 1 : 0
};
j[g] = (e == "show" ? h == "pos" ? "+=" : "-=" : h == "pos" ? "-=" : "+=") + i, c.animate(j, {
queue: !1,
duration: b.duration,
easing: b.options.easing,
complete: function() {
e == "hide" && c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments), c.dequeue();
}
});
});
};
}(jQuery), function(a, b) {
a.effects.fade = function(b) {
return this.queue(function() {
var c = a(this), d = a.effects.setMode(c, b.options.mode || "hide");
c.animate({
opacity: d
}, {
queue: !1,
duration: b.duration,
easing: b.options.easing,
complete: function() {
b.callback && b.callback.apply(this, arguments), c.dequeue();
}
});
});
};
}(jQuery), function(a, b) {
a.effects.highlight = function(b) {
return this.queue(function() {
var c = a(this), d = [ "backgroundImage", "backgroundColor", "opacity" ], e = a.effects.setMode(c, b.options.mode || "show"), f = {
backgroundColor: c.css("backgroundColor")
};
e == "hide" && (f.opacity = 0), a.effects.save(c, d), c.show().css({
backgroundImage: "none",
backgroundColor: b.options.color || "#ffff99"
}).animate(f, {
queue: !1,
duration: b.duration,
easing: b.options.easing,
complete: function() {
e == "hide" && c.hide(), a.effects.restore(c, d), e == "show" && !a.support.opacity && this.style.removeAttribute("filter"), b.callback && b.callback.apply(this, arguments), c.dequeue();
}
});
});
};
}(jQuery), function(a, b) {
a.effects.pulsate = function(b) {
return this.queue(function() {
var c = a(this), d = a.effects.setMode(c, b.options.mode || "show");
times = (b.options.times || 5) * 2 - 1, duration = b.duration ? b.duration / 2 : a.fx.speeds._default / 2, isVisible = c.is(":visible"), animateTo = 0, isVisible || (c.css("opacity", 0).show(), animateTo = 1), (d == "hide" && isVisible || d == "show" && !isVisible) && times--;
for (var e = 0; e < times; e++) c.animate({
opacity: animateTo
}, duration, b.options.easing), animateTo = (animateTo + 1) % 2;
c.animate({
opacity: animateTo
}, duration, b.options.easing, function() {
animateTo == 0 && c.hide(), b.callback && b.callback.apply(this, arguments);
}), c.queue("fx", function() {
c.dequeue();
}).dequeue();
});
};
}(jQuery), function(a, b) {
a.effects.puff = function(b) {
return this.queue(function() {
var c = a(this), d = a.effects.setMode(c, b.options.mode || "hide"), e = parseInt(b.options.percent, 10) || 150, f = e / 100, g = {
height: c.height(),
width: c.width()
};
a.extend(b.options, {
fade: !0,
mode: d,
percent: d == "hide" ? e : 100,
from: d == "hide" ? g : {
height: g.height * f,
width: g.width * f
}
}), c.effect("scale", b.options, b.duration, b.callback), c.dequeue();
});
}, a.effects.scale = function(b) {
return this.queue(function() {
var c = a(this), d = a.extend(!0, {}, b.options), e = a.effects.setMode(c, b.options.mode || "effect"), f = parseInt(b.options.percent, 10) || (parseInt(b.options.percent, 10) == 0 ? 0 : e == "hide" ? 0 : 100), g = b.options.direction || "both", h = b.options.origin;
e != "effect" && (d.origin = h || [ "middle", "center" ], d.restore = !0);
var i = {
height: c.height(),
width: c.width()
};
c.from = b.options.from || (e == "show" ? {
height: 0,
width: 0
} : i);
var j = {
y: g != "horizontal" ? f / 100 : 1,
x: g != "vertical" ? f / 100 : 1
};
c.to = {
height: i.height * j.y,
width: i.width * j.x
}, b.options.fade && (e == "show" && (c.from.opacity = 0, c.to.opacity = 1), e == "hide" && (c.from.opacity = 1, c.to.opacity = 0)), d.from = c.from, d.to = c.to, d.mode = e, c.effect("size", d, b.duration, b.callback), c.dequeue();
});
}, a.effects.size = function(b) {
return this.queue(function() {
var c = a(this), d = [ "position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity" ], e = [ "position", "top", "bottom", "left", "right", "overflow", "opacity" ], f = [ "width", "height", "overflow" ], g = [ "fontSize" ], h = [ "borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom" ], i = [ "borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight" ], j = a.effects.setMode(c, b.options.mode || "effect"), k = b.options.restore || !1, l = b.options.scale || "both", m = b.options.origin, n = {
height: c.height(),
width: c.width()
};
c.from = b.options.from || n, c.to = b.options.to || n;
if (m) {
var p = a.effects.getBaseline(m, n);
c.from.top = (n.height - c.from.height) * p.y, c.from.left = (n.width - c.from.width) * p.x, c.to.top = (n.height - c.to.height) * p.y, c.to.left = (n.width - c.to.width) * p.x;
}
var q = {
from: {
y: c.from.height / n.height,
x: c.from.width / n.width
},
to: {
y: c.to.height / n.height,
x: c.to.width / n.width
}
};
if (l == "box" || l == "both") q.from.y != q.to.y && (d = d.concat(h), c.from = a.effects.setTransition(c, h, q.from.y, c.from), c.to = a.effects.setTransition(c, h, q.to.y, c.to)), q.from.x != q.to.x && (d = d.concat(i), c.from = a.effects.setTransition(c, i, q.from.x, c.from), c.to = a.effects.setTransition(c, i, q.to.x, c.to));
(l == "content" || l == "both") && q.from.y != q.to.y && (d = d.concat(g), c.from = a.effects.setTransition(c, g, q.from.y, c.from), c.to = a.effects.setTransition(c, g, q.to.y, c.to)), a.effects.save(c, k ? d : e), c.show(), a.effects.createWrapper(c), c.css("overflow", "hidden").css(c.from);
if (l == "content" || l == "both") h = h.concat([ "marginTop", "marginBottom" ]).concat(g), i = i.concat([ "marginLeft", "marginRight" ]), f = d.concat(h).concat(i), c.find("*[width]").each(function() {
child = a(this), k && a.effects.save(child, f);
var c = {
height: child.height(),
width: child.width()
};
child.from = {
height: c.height * q.from.y,
width: c.width * q.from.x
}, child.to = {
height: c.height * q.to.y,
width: c.width * q.to.x
}, q.from.y != q.to.y && (child.from = a.effects.setTransition(child, h, q.from.y, child.from), child.to = a.effects.setTransition(child, h, q.to.y, child.to)), q.from.x != q.to.x && (child.from = a.effects.setTransition(child, i, q.from.x, child.from), child.to = a.effects.setTransition(child, i, q.to.x, child.to)), child.css(child.from), child.animate(child.to, b.duration, b.options.easing, function() {
k && a.effects.restore(child, f);
});
});
c.animate(c.to, {
queue: !1,
duration: b.duration,
easing: b.options.easing,
complete: function() {
c.to.opacity === 0 && c.css("opacity", c.from.opacity), j == "hide" && c.hide(), a.effects.restore(c, k ? d : e), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments), c.dequeue();
}
});
});
};
}(jQuery), function(a, b) {
a.effects.shake = function(b) {
return this.queue(function() {
var c = a(this), d = [ "position", "top", "bottom", "left", "right" ], e = a.effects.setMode(c, b.options.mode || "effect"), f = b.options.direction || "left", g = b.options.distance || 20, h = b.options.times || 3, i = b.duration || b.options.duration || 140;
a.effects.save(c, d), c.show(), a.effects.createWrapper(c);
var j = f == "up" || f == "down" ? "top" : "left", k = f == "up" || f == "left" ? "pos" : "neg", l = {}, m = {}, n = {};
l[j] = (k == "pos" ? "-=" : "+=") + g, m[j] = (k == "pos" ? "+=" : "-=") + g * 2, n[j] = (k == "pos" ? "-=" : "+=") + g * 2, c.animate(l, i, b.options.easing);
for (var p = 1; p < h; p++) c.animate(m, i, b.options.easing).animate(n, i, b.options.easing);
c.animate(m, i, b.options.easing).animate(l, i / 2, b.options.easing, function() {
a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments);
}), c.queue("fx", function() {
c.dequeue();
}), c.dequeue();
});
};
}(jQuery), function(a, b) {
a.effects.slide = function(b) {
return this.queue(function() {
var c = a(this), d = [ "position", "top", "bottom", "left", "right" ], e = a.effects.setMode(c, b.options.mode || "show"), f = b.options.direction || "left";
a.effects.save(c, d), c.show(), a.effects.createWrapper(c).css({
overflow: "hidden"
});
var g = f == "up" || f == "down" ? "top" : "left", h = f == "up" || f == "left" ? "pos" : "neg", i = b.options.distance || (g == "top" ? c.outerHeight({
margin: !0
}) : c.outerWidth({
margin: !0
}));
e == "show" && c.css(g, h == "pos" ? isNaN(i) ? "-" + i : -i : i);
var j = {};
j[g] = (e == "show" ? h == "pos" ? "+=" : "-=" : h == "pos" ? "-=" : "+=") + i, c.animate(j, {
queue: !1,
duration: b.duration,
easing: b.options.easing,
complete: function() {
e == "hide" && c.hide(), a.effects.restore(c, d), a.effects.removeWrapper(c), b.callback && b.callback.apply(this, arguments), c.dequeue();
}
});
});
};
}(jQuery), function(a) {
a.widget("ui.menu", {
_create: function() {
var b = this;
this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
role: "listbox",
"aria-activedescendant": "ui-active-menuitem"
}).bind("click.menu", function(c) {
if (b.options.disabled) return !1;
if (!a(c.target).closest(".ui-menu-item a").length) return;
c.preventDefault(), b.select(c);
}), this.refresh(), this.options.input || (this.options.input = this.element.attr("tabIndex", 0)), this.options.input.bind("keydown.menu", function(c) {
if (b.options.disabled) return;
switch (c.keyCode) {
case a.ui.keyCode.PAGE_UP:
b.previousPage(), c.preventDefault(), c.stopImmediatePropagation();
break;
case a.ui.keyCode.PAGE_DOWN:
b.nextPage(), c.preventDefault(), c.stopImmediatePropagation();
break;
case a.ui.keyCode.UP:
b.previous(), c.preventDefault(), c.stopImmediatePropagation();
break;
case a.ui.keyCode.DOWN:
b.next(), c.preventDefault(), c.stopImmediatePropagation();
break;
case a.ui.keyCode.ENTER:
b.select(), c.preventDefault(), c.stopImmediatePropagation();
}
});
},
destroy: function() {
a.Widget.prototype.destroy.apply(this, arguments), this.element.removeClass("ui-menu ui-widget ui-widget-content ui-corner-all").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-activedescendant"), this.element.children(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").children("a").removeClass("ui-corner-all").removeAttr("tabIndex").unbind(".menu");
},
refresh: function() {
var b = this, c = this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem");
c.children("a").addClass("ui-corner-all").attr("tabIndex", -1).bind("mouseenter.menu", function(c) {
if (b.options.disabled) return;
b.activate(c, a(this).parent());
}).bind("mouseleave.menu", function() {
if (b.options.disabled) return;
b.deactivate();
});
},
activate: function(a, b) {
this.deactivate();
if (this._hasScroll()) {
var c = b.offset().top - this.element.offset().top, d = this.element.attr("scrollTop"), e = this.element.height();
c < 0 ? this.element.attr("scrollTop", d + c) : c > e && this.element.attr("scrollTop", d + c - e + b.height());
}
this.active = b.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end(), this._trigger("focus", a, {
item: b
});
},
deactivate: function() {
if (!this.active) return;
this.active.children("a").removeClass("ui-state-hover").removeAttr("id"), this._trigger("blur"), this.active = null;
},
next: function(a) {
this._move("next", ".ui-menu-item:first", a);
},
previous: function(a) {
this._move("prev", ".ui-menu-item:last", a);
},
first: function() {
return this.active && !this.active.prevAll(".ui-menu-item").length;
},
last: function() {
return this.active && !this.active.nextAll(".ui-menu-item").length;
},
_move: function(a, b, c) {
if (!this.active) {
this.activate(c, this.element.children(b));
return;
}
var d = this.active[a + "All"](".ui-menu-item").eq(0);
d.length ? this.activate(c, d) : this.activate(c, this.element.children(b));
},
nextPage: function(b) {
if (this._hasScroll()) {
if (!this.active || this.last()) {
this.activate(b, this.element.children(":first"));
return;
}
var c = this.active.offset().top, d = this.element.height(), e = this.element.children("li").filter(function() {
var b = a(this).offset().top - c - d + a(this).height();
return b < 10 && b > -10;
});
e.length || (e = this.element.children(":last")), this.activate(b, e);
} else this.activate(b, this.element.children(!this.active || this.last() ? ":first" : ":last"));
},
previousPage: function(b) {
if (this._hasScroll()) {
if (!this.active || this.first()) {
this.activate(b, this.element.children(":last"));
return;
}
var c = this.active.offset().top, d = this.element.height();
result = this.element.children("li").filter(function() {
var b = a(this).offset().top - c + d - a(this).height();
return b < 10 && b > -10;
}), result.length || (result = this.element.children(":first")), this.activate(b, result);
} else this.activate(b, this.element.children(!this.active || this.first() ? ":last" : ":first"));
},
_hasScroll: function() {
return this.element.height() < this.element.attr("scrollHeight");
},
select: function(a) {
this._trigger("select", a, {
item: this.active
});
}
});
}(jQuery), function(a) {
function c() {
var b = d(this);
return isNaN(b.datetime) || a(this).text(e(b.datetime)), this;
}
function d(c) {
c = a(c);
if (!c.data("timeago")) {
c.data("timeago", {
datetime: b.datetime(c)
});
var d = a.trim(c.text());
d.length > 0 && c.attr("title", d);
}
return c.data("timeago");
}
function e(a) {
return b.inWords(f(a));
}
function f(a) {
return (new Date).getTime() - a.getTime();
}
a.timeago = function(b) {
return b instanceof Date ? e(b) : typeof b == "string" ? e(a.timeago.parse(b)) : e(a.timeago.datetime(b));
};
var b = a.timeago;
a.extend(a.timeago, {
settings: {
refreshMillis: 6e4,
allowFuture: !1,
strings: {
prefixAgo: null,
prefixFromNow: null,
suffixAgo: "ago",
suffixFromNow: "from now",
seconds: "less than a minute",
minute: "about a minute",
minutes: "%d minutes",
hour: "about an hour",
hours: "about %d hours",
day: "a day",
days: "%d days",
month: "about a month",
months: "%d months",
year: "about a year",
years: "%d years",
numbers: []
}
},
inWords: function(b) {
function k(d, e) {
var f = a.isFunction(d) ? d(e, b) : d, g = c.numbers && c.numbers[e] || e;
return f.replace(/%d/i, g);
}
var c = this.settings.strings, d = c.prefixAgo, e = c.suffixAgo;
this.settings.allowFuture && (b < 0 && (d = c.prefixFromNow, e = c.suffixFromNow), b = Math.abs(b));
var f = b / 1e3, g = f / 60, h = g / 60, i = h / 24, j = i / 365, l = f < 45 && k(c.seconds, Math.round(f)) || f < 90 && k(c.minute, 1) || g < 45 && k(c.minutes, Math.round(g)) || g < 90 && k(c.hour, 1) || h < 24 && k(c.hours, Math.round(h)) || h < 48 && k(c.day, 1) || i < 30 && k(c.days, Math.floor(i)) || i < 60 && k(c.month, 1) || i < 365 && k(c.months, Math.floor(i / 30)) || j < 2 && k(c.year, 1) || k(c.years, Math.floor(j));
return a.trim([ d, l, e ].join(" "));
},
parse: function(b) {
var c = a.trim(b);
return c = c.replace(/\.\d\d\d+/, ""), c = c.replace(/-/, "/").replace(/-/, "/"), c = c.replace(/T/, " ").replace(/Z/, " UTC"), c = c.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"), new Date(c);
},
datetime: function(c) {
var d = a(c).get(0).tagName.toLowerCase() === "time", e = d ? a(c).attr("datetime") : a(c).attr("title");
return b.parse(e);
}
}), a.fn.timeago = function() {
var a = this;
a.each(c);
var d = b.settings;
return d.refreshMillis > 0 && setInterval(function() {
a.each(c);
}, d.refreshMillis), a;
}, document.createElement("abbr"), document.createElement("time");
}(jQuery), new function(a) {
a.fn.placeholder = function(b) {
b = b || {};
var c = b.dataKey || "placeholderValue", d = b.attr || "placeholder", e = b.className || "placeholder", f = b.values || [], g = b.blockSubmit || !1, h = b.blankSubmit || !1, i = b.onSubmit || !1, j = b.value || "", k = b.cursor_position || 0;
return this.filter(":input").each(function(b) {
a.data(this, c, f[b] || a(this).attr(d));
}).each(function() {
a.trim(a(this).val()) === "" && a(this).addClass(e).val(a.data(this, c));
}).focus(function() {
a.trim(a(this).val()) === a.data(this, c) && a(this).removeClass(e).val(j), a.fn.setCursorPosition && a(this).setCursorPosition(k);
}).blur(function() {
a.trim(a(this).val()) === j && a(this).addClass(e).val(a.data(this, c));
}).each(function(b, d) {
g ? new function(b) {
a(b.form).submit(function() {
return a.trim(a(b).val()) != a.data(b, c);
});
}(d) : h ? new function(b) {
a(b.form).submit(function() {
return a.trim(a(b).val()) == a.data(b, c) && a(b).removeClass(e).val(""), !0;
});
}(d) : i && new function(b) {
a(b.form).submit(i);
}(d);
});
};
}(jQuery), function(a) {
a.fn.hoverFlow = function(b, c, d, e, f) {
if (a.inArray(b, [ "mouseover", "mouseenter", "mouseout", "mouseleave" ]) == -1) return this;
var g = typeof d == "object" ? d : {
complete: f || !f && e || a.isFunction(d) && d,
duration: d,
easing: f && e || e && !a.isFunction(e) && e
};
g.queue = !1;
var h = g.complete;
return g.complete = function() {
a(this).dequeue(), a.isFunction(h) && h.call(this);
}, this.each(function() {
var d = a(this);
b == "mouseover" || b == "mouseenter" ? d.data("jQuery.hoverFlow", !0) : d.removeData("jQuery.hoverFlow"), d.queue(function() {
var a = b == "mouseover" || b == "mouseenter" ? d.data("jQuery.hoverFlow") !== undefined : d.data("jQuery.hoverFlow") === undefined;
a ? d.animate(c, g) : d.queue([]);
});
});
};
}(jQuery), function(a) {
a.fn.hoverIntent = function(b, c) {
var d = {
sensitivity: 7,
interval: 100,
timeout: 0
};
d = a.extend(d, c ? {
over: b,
out: c
} : b);
var e, f, g, h, i = function(a) {
e = a.pageX, f = a.pageY;
}, j = function(b, c) {
c.hoverIntent_t = clearTimeout(c.hoverIntent_t);
if (Math.abs(g - e) + Math.abs(h - f) < d.sensitivity) return a(c).unbind("mousemove", i), c.hoverIntent_s = 1, d.over.apply(c, [ b ]);
g = e, h = f, c.hoverIntent_t = setTimeout(function() {
j(b, c);
}, d.interval);
}, k = function(a, b) {
return b.hoverIntent_t = clearTimeout(b.hoverIntent_t), b.hoverIntent_s = 0, d.out.apply(b, [ a ]);
}, l = function(b) {
var c = jQuery.extend({}, b), e = this;
e.hoverIntent_t && (e.hoverIntent_t = clearTimeout(e.hoverIntent_t)), b.type == "mouseenter" ? (g = c.pageX, h = c.pageY, a(e).bind("mousemove", i), e.hoverIntent_s != 1 && (e.hoverIntent_t = setTimeout(function() {
j(c, e);
}, d.interval))) : (a(e).unbind("mousemove", i), e.hoverIntent_s == 1 && (e.hoverIntent_t = setTimeout(function() {
k(c, e);
}, d.timeout)));
};
return this.bind("mouseenter", l).bind("mouseleave", l);
};
}(jQuery), function(a, b, c) {
function w() {
w.history = w.history || [], w.history.push(arguments);
if ("object" == typeof console) var a = console[console.warn ? "warn" : "log"], b = a.apply ? a.apply(console, arguments) : a(Array.prototype.slice.call(arguments));
}
function x(b) {
var c;
if (!b || "object" != typeof b) return e;
"object" != typeof b.metadata && (b.metadata = {
type: b.metadata
});
if ("content" in b) {
if ("object" != typeof b.content || b.content.jquery) b.content = {
text: b.content
};
c = b.content.text || e, !a.isFunction(c) && (!c && !c.attr || c.length < 1 || "object" == typeof c && !c.jquery) && (b.content.text = e), "title" in b.content && ("object" != typeof b.content.title && (b.content.title = {
text: b.content.title
}), c = b.content.title.text || e, !a.isFunction(c) && (!c && !c.attr || c.length < 1 || "object" == typeof c && !c.jquery) && (b.content.title.text = e));
}
return "position" in b && "object" != typeof b.position && (b.position = {
my: b.position,
at: b.position
}), "show" in b && "object" != typeof b.show && (b.show.jquery ? b.show = {
target: b.show
} : b.show = {
event: b.show
}), "hide" in b && "object" != typeof b.hide && (b.hide.jquery ? b.hide = {
target: b.hide
} : b.hide = {
event: b.hide
}), "style" in b && "object" != typeof b.style && (b.style = {
classes: b.style
}), a.each(h, function() {
this.sanitize && this.sanitize(b);
}), b;
}
function y(c, s, t, w) {
function H(a) {
var b = 0, c, d = s, e = a.split(".");
while (d = d[e[b++]]) b < e.length && (c = d);
return [ c || s, e.pop() ];
}
function I() {
var a = s.style.widget;
D.toggleClass(l, a).toggleClass(o, !a), F.content.toggleClass(l + "-content", a), F.titlebar && F.titlebar.toggleClass(l + "-header", a), F.button && F.button.toggleClass(k + "-icon", !a);
}
function J() {
F.title && (F.titlebar.remove(), F.titlebar = F.title = F.button = f, y.reposition());
}
function K() {
var b = s.content.title.button, c = typeof b == "string", d = c ? b : "Close tooltip";
F.button && F.button.remove(), b.jquery ? F.button = b : F.button = a("<a />", {
"class": "ui-state-default " + (s.style.widget ? "" : k + "-icon"),
title: d,
"aria-label": d
}).prepend(a("<span />", {
"class": "ui-icon ui-icon-close",
html: "&times;"
})), F.button.appendTo(F.titlebar).attr("role", "button").hover(function(b) {
a(this).toggleClass("ui-state-hover", b.type === "mouseenter");
}).click(function(a) {
return D.hasClass(m) || y.hide(a), e;
}).bind("mousedown keydown mouseup keyup mouseout", function(b) {
a(this).toggleClass("ui-state-active ui-state-focus", b.type.substr(-4) === "down");
}), y.redraw();
}
function L() {
var b = A + "-title";
F.titlebar && J(), F.titlebar = a("<div />", {
"class": k + "-titlebar " + (s.style.widget ? "ui-widget-header" : "")
}).append(F.title = a("<div />", {
id: b,
"class": k + "-title",
"aria-atomic": d
})).insertBefore(F.content), s.content.title.button ? K() : y.rendered && y.redraw();
}
function M(a) {
var b = F.button, c = F.title;
if (!y.rendered) return e;
a ? (c || L(), K()) : b.remove();
}
function N(b, d) {
var f = F.title;
if (!y.rendered || !b) return e;
a.isFunction(b) && (b = b.call(c, G.event, y) || ""), b.jquery && b.length > 0 ? f.empty().append(b.css({
display: "block"
})) : f.html(b), y.redraw(), d !== e && y.rendered && D.is(":visible") && y.reposition(G.event);
}
function O(b, d) {
function g(b) {
function g(f) {
clearTimeout(y.timers.img[this]), a(this).unbind(E), (c = c.not(this)).length === 0 && (y.redraw(), d !== e && y.reposition(G.event), b());
}
var c;
if ((c = f.find("img:not([height]):not([width])")).length === 0) return g.call(c);
c.each(function(b, c) {
(function d() {
if (c.height && c.width) return g.call(c);
y.timers.img[c] = setTimeout(d, 1e3);
})(), a(c).bind("error" + E + " load" + E, g);
});
}
var f = F.content;
return !y.rendered || !b ? e : (a.isFunction(b) && (b = b.call(c, G.event, y) || ""), b.jquery && b.length > 0 ? f.empty().append(b.css({
display: "block"
})) : f.html(b), y.rendered < 0 ? D.queue("fx", g) : (C = 0, g(a.noop)), y);
}
function P() {
function l(a) {
if (D.hasClass(m)) return e;
h.show.trigger("qtip-" + t + "-inactive"), clearTimeout(y.timers.show), clearTimeout(y.timers.hide);
var b = function() {
y.toggle(d, a);
};
s.show.delay > 0 ? y.timers.show = setTimeout(b, s.show.delay) : b();
}
function o(b) {
if (D.hasClass(m)) return e;
var c = a(b.relatedTarget || b.target), d = c.closest(n)[0] === D[0], g = c[0] === h.show[0];
clearTimeout(y.timers.show), clearTimeout(y.timers.hide);
if (f.target === "mouse" && d || s.hide.fixed && /mouse(out|leave|move)/.test(b.type) && (d || g)) {
b.preventDefault();
return;
}
s.hide.delay > 0 ? y.timers.hide = setTimeout(function() {
y.hide(b);
}, s.hide.delay) : y.hide(b);
}
function p(a) {
if (D.hasClass(m)) return e;
clearTimeout(y.timers.inactive), y.timers.inactive = setTimeout(function() {
y.hide(a);
}, s.hide.inactive);
}
function r(a) {
D.is(":visible") && y.reposition(a);
}
var f = s.position, h = {
show: s.show.target,
hide: s.hide.target,
viewport: a(f.viewport),
document: a(document),
window: a(b)
}, j = {
show: a.trim("" + s.show.event).split(" "),
hide: a.trim("" + s.hide.event).split(" ")
}, k = a.browser.msie && parseInt(a.browser.version, 10) === 6;
D.bind("mouseenter" + E + " mouseleave" + E, function(a) {
var b = a.type === "mouseenter";
b && y.focus(a), D.toggleClass(q, b);
}), s.hide.fixed && (h.hide = h.hide.add(D), D.bind("mouseover" + E, function() {
D.hasClass(m) || clearTimeout(y.timers.hide);
})), /mouse(out|leave)/i.test(s.hide.event) ? s.hide.leave && h.window.bind("mouse" + (s.hide.leave.indexOf("frame") > -1 ? "out" : "leave") + E, function(a) {
/select|option/.test(a.target) && !a.relatedTarget && y.hide(a);
}) : /mouse(over|enter)/i.test(s.show.event) && h.hide.bind("mouseleave" + E, function(a) {
clearTimeout(y.timers.show);
}), ("" + s.hide.event).indexOf("unfocus") > -1 && h.document.bind("mousedown" + E, function(b) {
var d = a(b.target), e = !D.hasClass(m) && D.is(":visible");
d.parents(n).length === 0 && d.add(c).length > 1 && y.hide(b);
}), "number" == typeof s.hide.inactive && (h.show.bind("qtip-" + t + "-inactive", p), a.each(g.inactiveEvents, function(a, b) {
h.hide.add(F.tooltip).bind(b + E + "-inactive", p);
})), a.each(j.hide, function(b, c) {
var d = a.inArray(c, j.show), e = a(h.hide);
d > -1 && e.add(h.show).length === e.length || c === "unfocus" ? (h.show.bind(c + E, function(a) {
D.is(":visible") ? o(a) : l(a);
}), delete j.show[d]) : h.hide.bind(c + E, o);
}), a.each(j.show, function(a, b) {
h.show.bind(b + E, l);
}), "number" == typeof s.hide.distance && h.show.bind("mousemove" + E, function(a) {
var b = G.origin || {}, c = s.hide.distance, d = Math.abs;
(d(a.pageX - b.pageX) >= c || d(a.pageY - b.pageY) >= c) && y.hide(a);
}), f.target === "mouse" && (h.show.bind("mousemove" + E, function(a) {
i = {
pageX: a.pageX,
pageY: a.pageY,
type: "mousemove"
};
}), f.adjust.mouse && (s.hide.event && D.bind("mouseleave" + E, function(a) {
(a.relatedTarget || a.target) !== h.show[0] && y.hide(a);
}), h.document.bind("mousemove" + E, function(a) {
!D.hasClass(m) && D.is(":visible") && y.reposition(a || i);
}))), (f.adjust.resize || h.viewport.length) && (a.event.special.resize ? h.viewport : h.window).bind("resize" + E, r), (h.viewport.length || k && D.css("position") === "fixed") && h.viewport.bind("scroll" + E, r);
}
function Q() {
var c = [ s.show.target[0], s.hide.target[0], y.rendered && F.tooltip[0], s.position.container[0], s.position.viewport[0], b, document ];
y.rendered ? a([]).pushStack(a.grep(c, function(a) {
return typeof a == "object";
})).unbind(E) : s.show.target.unbind(E + "-create");
}
var y = this, z = document.body, A = k + "-" + t, B = 0, C = 0, D = a(), E = ".qtip-" + t, F, G;
y.id = t, y.rendered = e, y.elements = F = {
target: c
}, y.timers = {
img: {}
}, y.options = s, y.checks = {}, y.plugins = {}, y.cache = G = {
event: {},
target: a(),
disabled: e,
attr: w
}, y.checks.builtin = {
"^id$": function(b, c, f) {
var h = f === d ? g.nextid : f, i = k + "-" + h;
h !== e && h.length > 0 && !a("#" + i).length && (D[0].id = i, F.content[0].id = i + "-content", F.title[0].id = i + "-title");
},
"^content.text$": function(a, b, c) {
O(c);
},
"^content.title.text$": function(a, b, c) {
if (!c) return J();
!F.title && c && L(), N(c);
},
"^content.title.button$": function(a, b, c) {
M(c);
},
"^position.(my|at)$": function(a, b, c) {
"string" == typeof c && (a[b] = new h.Corner(c));
},
"^position.container$": function(a, b, c) {
y.rendered && D.appendTo(c);
},
"^show.ready$": function() {
y.rendered ? y.toggle(d) : y.render(1);
},
"^style.classes$": function(b, c, d) {
a.attr(D[0], "class", k + " qtip ui-helper-reset " + d);
},
"^style.widget|content.title": I,
"^events.(render|show|move|hide|focus|blur)$": function(b, c, d) {
D[(a.isFunction(d) ? "" : "un") + "bind"]("tooltip" + c, d);
},
"^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)": function() {
var a = s.position;
D.attr("tracking", a.target === "mouse" && a.adjust.mouse), Q(), P();
}
}, a.extend(y, {
render: function(b) {
if (y.rendered) return y;
var f = s.content.title.text, g = s.position, i = a.Event("tooltiprender");
return a.attr(c[0], "aria-describedby", A), D = F.tooltip = a("<div/>", {
id: A,
"class": k + " qtip ui-helper-reset " + o + " " + s.style.classes,
width: s.style.width || "",
tracking: g.target === "mouse" && g.adjust.mouse,
role: "alert",
"aria-live": "polite",
"aria-atomic": e,
"aria-describedby": A + "-content",
"aria-hidden": d
}).toggleClass(m, G.disabled).data("qtip", y).appendTo(s.position.container).append(F.content = a("<div />", {
"class": k + "-content",
id: A + "-content",
"aria-atomic": d
})), y.rendered = -1, C = 1, f && (L(), N(f)), O(s.content.text, e), y.rendered = d, I(), a.each(s.events, function(b, c) {
a.isFunction(c) && D.bind(b === "toggle" ? "tooltipshow tooltiphide" : "tooltip" + b, c);
}), a.each(h, function() {
this.initialize === "render" && this(y);
}), P(), D.queue("fx", function(a) {
i.originalEvent = G.event, D.trigger(i, [ y ]), C = 0, y.redraw(), (s.show.ready || b) && y.toggle(d, G.event), a();
}), y;
},
get: function(a) {
var b, c;
switch (a.toLowerCase()) {
case "dimensions":
b = {
height: D.outerHeight(),
width: D.outerWidth()
};
break;
case "offset":
b = h.offset(D, s.position.container);
break;
default:
c = H(a.toLowerCase()), b = c[0][c[1]], b = b.precedance ? b.string() : b;
}
return b;
},
set: function(b, c) {
function m(a, b) {
var c, d, e;
for (c in k) for (d in k[c]) if (e = (new RegExp(d, "i")).exec(a)) b.push(e), k[c][d].apply(y, b);
}
var g = /^position\.(my|at|adjust|target|container)|style|content|show\.ready/i, h = /^content\.(title|attr)|style/i, i = e, j = e, k = y.checks, l;
return "string" == typeof b ? (l = b, b = {}, b[l] = c) : b = a.extend(d, {}, b), a.each(b, function(c, d) {
var e = H(c.toLowerCase()), f;
f = e[0][e[1]], e[0][e[1]] = "object" == typeof d && d.nodeType ? a(d) : d, b[c] = [ e[0], e[1], d, f ], i = g.test(c) || i, j = h.test(c) || j;
}), x(s), B = C = 1, a.each(b, m), B = C = 0, D.is(":visible") && y.rendered && (i && y.reposition(s.position.target === "mouse" ? f : G.event), j && y.redraw()), y;
},
toggle: function(b, c) {
function q() {
b ? (a.browser.msie && D[0].style.removeAttribute("filter"), D.css("overflow", "")) : D.css({
display: "",
visibility: "",
opacity: "",
left: "",
top: ""
});
}
if (!y.rendered) if (b) y.render(1); else return y;
var g = b ? "show" : "hide", h = s[g], j = D.is(":visible"), k = !c || s[g].target.length < 2 || G.target[0] === c.target, l = s.position, m = s.content, o, p;
(typeof b).search("boolean|number") && (b = !j);
if (!D.is(":animated") && j === b && k) return y;
if (c) {
if (/over|enter/.test(c.type) && /out|leave/.test(G.event.type) && c.target === s.show.target[0] && D.has(c.relatedTarget).length) return y;
G.event = a.extend({}, c);
}
return p = a.Event("tooltip" + g), p.originalEvent = c ? G.event : f, D.trigger(p, [ y, 90 ]), p.isDefaultPrevented() ? y : (a.attr(D[0], "aria-hidden", !b), b ? (G.origin = a.extend({}, i), y.focus(c), a.isFunction(m.text) && O(m.text, e), a.isFunction(m.title.text) && N(m.title.text, e), !v && l.target === "mouse" && l.adjust.mouse && (a(document).bind("mousemove.qtip", function(a) {
i = {
pageX: a.pageX,
pageY: a.pageY,
type: "mousemove"
};
}), v = d), y.reposition(c), h.solo && a(n, h.solo).not(D).qtip("hide", p)) : (clearTimeout(y.timers.show), delete G.origin, v && !a(n + '[tracking="true"]:visible', h.solo).not(D).length && (a(document).unbind("mousemove.qtip"), v = e), y.blur(c)), k && D.stop(0, 1), h.effect === e ? (D[g](), q.call(D)) : a.isFunction(h.effect) ? (h.effect.call(D, y), D.queue("fx", function(a) {
q(), a();
})) : D.fadeTo(90, b ? 1 : 0, q), b && h.target.trigger("qtip-" + t + "-inactive"), y);
},
show: function(a) {
return y.toggle(d, a);
},
hide: function(a) {
return y.toggle(e, a);
},
focus: function(b) {
if (!y.rendered) return y;
var c = a(n), d = parseInt(D[0].style.zIndex, 10), e = g.zindex + c.length, f = a.extend({}, b), h, i;
return D.hasClass(p) || (i = a.Event("tooltipfocus"), i.originalEvent = f, D.trigger(i, [ y, e ]), i.isDefaultPrevented() || (d !== e && (c.each(function() {
this.style.zIndex > d && (this.style.zIndex = this.style.zIndex - 1);
}), c.filter("." + p).qtip("blur", f)), D.addClass(p)[0].style.zIndex = e)), y;
},
blur: function(b) {
var c = a.extend({}, b), d;
return D.removeClass(p), d = a.Event("tooltipblur"), d.originalEvent = c, D.trigger(d, [ y ]), y;
},
reposition: function(c, d) {
if (!y.rendered || B) return y;
B = 1;
var f = s.position.target, g = s.position, j = g.my, l = g.at, m = g.adjust, n = m.method.split(" "), o = D.outerWidth(), p = D.outerHeight(), q = 0, r = 0, t = a.Event("tooltipmove"), u = D.css("position") === "fixed", v = g.viewport, w = {
left: 0,
top: 0
}, x = y.plugins.tip, A = {
horizontal: n[0],
vertical: n[1] || n[0],
left: function(a) {
var b = A.horizontal === "shift", c = v.offset.left + v.scrollLeft, d = j.x === "left" ? o : j.x === "right" ? -o : -o / 2, e = l.x === "left" ? q : l.x === "right" ? -q : -q / 2, f = x && x.size ? x.size.width || 0 : 0, g = x && x.corner && x.corner.precedance === "x" && !b ? f : 0, h = c - a + g, i = a + o - v.width - c + g, k = d - (j.precedance === "x" || j.x === j.y ? e : 0), n = j.x === "center";
return b ? (g = x && x.corner.precedance === "y" ? f : 0, k = (j.x === "left" ? 1 : -1) * d - g, w.left += h > 0 ? h : i > 0 ? -i : 0, w.left = Math.max(v.offset.left + (g && x.corner.x === "center" ? x.offset : 0), a - k, Math.min(Math.max(v.offset.left + v.width, a + k), w.left))) : (h > 0 && (j.x !== "left" || i > 0) ? w.left -= k + (n ? 0 : 2 * m.x) : i > 0 && (j.x !== "right" || h > 0) && (w.left -= n ? -k : k + 2 * m.x), w.left !== a && n && (w.left -= m.x), w.left < c && -w.left > i && (w.left = a)), w.left - a;
},
top: function(a) {
var b = A.vertical === "shift", c = v.offset.top + v.scrollTop, d = j.y === "top" ? p : j.y === "bottom" ? -p : -p / 2, e = l.y === "top" ? r : l.y === "bottom" ? -r : -r / 2, f = x && x.size ? x.size.height || 0 : 0, g = x && x.corner && x.corner.precedance === "y" && !b ? f : 0, h = c - a + g, i = a + p - v.height - c + g, k = d - (j.precedance === "y" || j.x === j.y ? e : 0), n = j.y === "center";
return b ? (g = x && x.corner.precedance === "x" ? f : 0, k = (j.y === "top" ? 1 : -1) * d - g, w.top += h > 0 ? h : i > 0 ? -i : 0, w.top = Math.max(v.offset.top + (g && x.corner.x === "center" ? x.offset : 0), a - k, Math.min(Math.max(v.offset.top + v.height, a + k), w.top))) : (h > 0 && (j.y !== "top" || i > 0) ? w.top -= k + (n ? 0 : 2 * m.y) : i > 0 && (j.y !== "bottom" || h > 0) && (w.top -= n ? -k : k + 2 * m.y), w.top !== a && n && (w.top -= m.y), w.top < 0 && -w.top > i && (w.top = a)), w.top - a;
}
};
if (a.isArray(f) && f.length === 2) l = {
x: "left",
y: "top"
}, w = {
left: f[0],
top: f[1]
}; else if (f === "mouse" && (c && c.pageX || G.event.pageX)) l = {
x: "left",
y: "top"
}, c = !c || c.type !== "resize" && c.type !== "scroll" ? c && c.pageX && c.type === "mousemove" ? c : i && (m.mouse || !c || !c.pageX) ? {
pageX: i.pageX,
pageY: i.pageY
} : !m.mouse && G.origin ? G.origin : c : G.event, w = {
top: c.pageY,
left: c.pageX
}; else {
f === "event" ? c && c.target && c.type !== "scroll" && c.type !== "resize" ? f = G.target = a(c.target) : f = G.target : G.target = a(f), f = a(f).eq(0);
if (f.length === 0) return y;
f[0] === document || f[0] === b ? (q = h.iOS ? b.innerWidth : f.width(), r = h.iOS ? b.innerHeight : f.height(), f[0] === b && (w = {
top: !u || h.iOS ? (v || f).scrollTop() : 0,
left: !u || h.iOS ? (v || f).scrollLeft() : 0
})) : f.is("area") && h.imagemap ? w = h.imagemap(f, l) : f[0].namespaceURI === "http://www.w3.org/2000/svg" && h.svg ? w = h.svg(f, l) : (q = f.outerWidth(), r = f.outerHeight(), w = h.offset(f, g.container, u)), w.offset && (q = w.width, r = w.height, w = w.offset), w.left += l.x === "right" ? q : l.x === "center" ? q / 2 : 0, w.top += l.y === "bottom" ? r : l.y === "center" ? r / 2 : 0;
}
return w.left += m.x + (j.x === "right" ? -o : j.x === "center" ? -o / 2 : 0), w.top += m.y + (j.y === "bottom" ? -p : j.y === "center" ? -p / 2 : 0), v.jquery && f[0] !== b && f[0] !== z && A.vertical + A.horizontal !== "nonenone" ? (v = {
elem: v,
height: v[(v[0] === b ? "h" : "outerH") + "eight"](),
width: v[(v[0] === b ? "w" : "outerW") + "idth"](),
scrollLeft: u ? 0 : v.scrollLeft(),
scrollTop: u ? 0 : v.scrollTop(),
offset: v.offset() || {
left: 0,
top: 0
}
}, w.adjusted = {
left: A.horizontal !== "none" ? A.left(w.left) : 0,
top: A.vertical !== "none" ? A.top(w.top) : 0
}) : w.adjusted = {
left: 0,
top: 0
}, D.attr("class", function(b, c) {
return a.attr(this, "class").replace(/ui-tooltip-pos-\w+/i, "");
}).addClass(k + "-pos-" + j.abbreviation()), t.originalEvent = a.extend({}, c), D.trigger(t, [ y, w, v.elem || v ]), t.isDefaultPrevented() ? y : (delete w.adjusted, d === e || isNaN(w.left) || isNaN(w.top) || f === "mouse" || !a.isFunction(g.effect) ? D.css(w) : a.isFunction(g.effect) && (g.effect.call(D, y, a.extend({}, w)), D.queue(function(b) {
a(this).css({
opacity: "",
height: ""
}), a.browser.msie && this.style.removeAttribute("filter"), b();
})), B = 0, y);
},
redraw: function() {
if (y.rendered < 1 || C) return y;
var a = s.position.container, b, c, d, e;
return C = 1, s.style.width ? D.css("width", s.style.width) : (D.css("width", "").addClass(r), c = D.width() + 1, d = D.css("max-width") || "", e = D.css("min-width") || "", b = (d + e).indexOf("%") > -1 ? a.width() / 100 : 0, d = (d.indexOf("%") > -1 ? b : 1) * parseInt(d, 10) || c, e = (e.indexOf("%") > -1 ? b : 1) * parseInt(e, 10) || 0, c = d + e ? Math.min(Math.max(c, e), d) : c, D.css("width", Math.round(c)).removeClass(r)), C = 0, y;
},
disable: function(b) {
var c = m;
return "boolean" != typeof b && (b = !D.hasClass(c) && !G.disabled), y.rendered ? (D.toggleClass(c, b), a.attr(D[0], "aria-disabled", b)) : G.disabled = !!b, y;
},
enable: function() {
return y.disable(e);
},
destroy: function() {
var b = c[0], d = a.attr(b, u);
return y.rendered && (D.remove(), a.each(y.plugins, function() {
this.destroy && this.destroy();
})), clearTimeout(y.timers.show), clearTimeout(y.timers.hide), Q(), a.removeData(b, "qtip"), d && (a.attr(b, "title", d), c.removeAttr(u)), c.removeAttr("aria-describedby").unbind(".qtip"), delete j[y.id], c;
}
});
}
function z(b, c) {
var i, j, k, l, m = a(this), n = a(document.body), o = this === document ? n : m, p = m.metadata ? m.metadata(c.metadata) : f, q = c.metadata.type === "html5" && p ? p[c.metadata.name] : f, r = m.data(c.metadata.name || "qtipopts");
try {
r = typeof r == "string" ? (new Function("return " + r))() : r;
} catch (s) {
w("Unable to parse HTML5 attribute data: " + r);
}
l = a.extend(d, {}, g.defaults, c, typeof r == "object" ? x(r) : f, x(q || p)), j = l.position, l.id = b;
if ("boolean" == typeof l.content.text) {
k = m.attr(l.content.attr);
if (l.content.attr !== e && k) l.content.text = k; else return w("Unable to locate content for tooltip! Aborting render of tooltip on element: ", m), e;
}
j.container === e && (j.container = n), j.target === e && (j.target = o), l.show.target === e && (l.show.target = o), l.show.solo === d && (l.show.solo = n), l.hide.target === e && (l.hide.target = o), l.position.viewport === d && (l.position.viewport = j.container), j.at = new h.Corner(j.at), j.my = new h.Corner(j.my);
if (a.data(this, "qtip")) if (l.overwrite) m.qtip("destroy"); else if (l.overwrite === e) return e;
return a.attr(this, "title") && (a.attr(this, u, a.attr(this, "title")), this.removeAttribute("title")), i = new y(m, l, b, !!k), a.data(this, "qtip", i), m.bind("remove.qtip", function() {
i.destroy();
}), i;
}
function A(b) {
var c = this, f = b.elements.tooltip, g = b.options.content.ajax, h = ".qtip-ajax", i = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, j = d;
b.checks.ajax = {
"^content.ajax": function(a, b, d) {
b === "ajax" && (g = d), b === "once" ? c.init() : g && g.url ? c.load() : f.unbind(h);
}
}, a.extend(c, {
init: function() {
return g && g.url && f.unbind(h)[g.once ? "one" : "bind"]("tooltipshow" + h, c.load), c;
},
load: function(d, h) {
function n() {
m && (f.css("visibility", ""), h = e);
}
function o(c) {
l && (c = a("<div/>").append(c.replace(i, "")).find(l)), b.set("content.text", c), n();
}
function p(a, c, d) {
b.set("content.text", c + ": " + d), n();
}
if (d && d.isDefaultPrevented()) return c;
var j = g.url.indexOf(" "), k = g.url, l, m = g.once && !g.loading && h;
return m && f.css("visibility", "hidden"), j > -1 && (l = k.substr(j), k = k.substr(0, j)), a.ajax(a.extend({
success: o,
error: p,
context: b
}, g, {
url: k
})), c;
}
}), c.init();
}
function B(a, b, c) {
var d = Math.ceil(b / 2), e = Math.ceil(c / 2), f = {
bottomright: [ [ 0, 0 ], [ b, c ], [ b, 0 ] ],
bottomleft: [ [ 0, 0 ], [ b, 0 ], [ 0, c ] ],
topright: [ [ 0, c ], [ b, 0 ], [ b, c ] ],
topleft: [ [ 0, 0 ], [ 0, c ], [ b, c ] ],
topcenter: [ [ 0, c ], [ d, 0 ], [ b, c ] ],
bottomcenter: [ [ 0, 0 ], [ b, 0 ], [ d, c ] ],
rightcenter: [ [ 0, 0 ], [ b, e ], [ 0, c ] ],
leftcenter: [ [ b, 0 ], [ b, c ], [ 0, e ] ]
};
return f.lefttop = f.bottomright, f.righttop = f.bottomleft, f.leftbottom = f.topright, f.rightbottom = f.topleft, f[a.string()];
}
function C(b, g) {
function t(f, g, h, l) {
if (!k.tip) return;
var n = a.extend({}, i.corner), o = h.adjusted, p = b.options.position.adjust.method.split(" "), q = p[0], r = p[1] || p[0], s = {
left: e,
top: e,
x: 0,
y: 0
}, t, u = {}, v;
i.corner.fixed !== d && (q === "shift" && n.precedance === "x" && o.left && n.y !== "center" ? n.precedance = n.precedance === "x" ? "y" : "x" : q === "flip" && o.left && (n.x = n.x === "center" ? o.left > 0 ? "left" : "right" : n.x === "left" ? "right" : "left"), r === "shift" && n.precedance === "y" && o.top && n.x !== "center" ? n.precedance = n.precedance === "y" ? "x" : "y" : r === "flip" && o.top && (n.y = n.y === "center" ? o.top > 0 ? "top" : "bottom" : n.y === "top" ? "bottom" : "top"), n.string() !== m.corner && (m.top !== o.top || m.left !== o.left) && i.update(n, e)), t = i.position(n, o), t.right !== c && (t.left = -t.right), t.bottom !== c && (t.top = -t.bottom), t.user = Math.max(0, j.offset);
if (s.left = q === "shift" && !!o.left) n.x === "center" ? u["margin-left"] = s.x = t["margin-left"] - o.left : (v = t.right !== c ? [ o.left, -t.left ] : [ -o.left, t.left ], (s.x = Math.max(v[0], v[1])) > v[0] && (h.left -= o.left, s.left = e), u[t.right !== c ? "right" : "left"] = s.x);
if (s.top = r === "shift" && !!o.top) n.y === "center" ? u["margin-top"] = s.y = t["margin-top"] - o.top : (v = t.bottom !== c ? [ o.top, -t.top ] : [ -o.top, t.top ], (s.y = Math.max(v[0], v[1])) > v[0] && (h.top -= o.top, s.top = e), u[t.bottom !== c ? "bottom" : "top"] = s.y);
k.tip.css(u).toggle(!(s.x && s.y || n.x === "center" && s.y || n.y === "center" && s.x)), h.left -= t.left.charAt ? t.user : q !== "shift" || s.top || !s.left && !s.top ? t.left : 0, h.top -= t.top.charAt ? t.user : r !== "shift" || s.left || !s.left && !s.top ? t.top : 0, m.left = o.left, m.top = o.top, m.corner = n.string();
}
function u(a, b, c) {
b = b ? b : a[a.precedance];
var d = l.hasClass(r), e = k.titlebar && a.y === "top", f = e ? k.titlebar : k.content, g = "border-" + b + "-width", h;
return l.addClass(r), h = parseInt(f.css(g), 10), h = (c ? h || parseInt(l.css(g), 10) : h) || 0, l.toggleClass(r, d), h;
}
function v(b) {
var c = k.titlebar && b.y === "top", d = c ? k.titlebar : k.content, e = a.browser.mozilla, f = e ? "-moz-" : a.browser.webkit ? "-webkit-" : "", g = b.y + (e ? "" : "-") + b.x, h = f + (e ? "border-radius-" + g : "border-" + g + "-radius");
return parseInt(d.css(h), 10) || parseInt(l.css(h), 10) || 0;
}
function w(a) {
var b = a.precedance === "y", c = n[b ? "width" : "height"], d = n[b ? "height" : "width"], e = a.string().indexOf("center") > -1, f = c * (e ? .5 : 1), g = Math.pow, h = Math.round, i, j, k, l = Math.sqrt(g(f, 2) + g(d, 2)), m = [ p / f * l, p / d * l ];
return m[2] = Math.sqrt(g(m[0], 2) - g(p, 2)), m[3] = Math.sqrt(g(m[1], 2) - g(p, 2)), i = l + m[2] + m[3] + (e ? 0 : m[0]), j = i / l, k = [ h(j * d), h(j * c) ], {
height: k[b ? 0 : 1],
width: k[b ? 1 : 0]
};
}
var i = this, j = b.options.style.tip, k = b.elements, l = k.tooltip, m = {
top: 0,
left: 0,
corner: ""
}, n = {
width: j.width,
height: j.height
}, o = {}, p = j.border || 0, q = ".qtip-tip", s = !!(a("<canvas />")[0] || {}).getContext;
i.corner = f, i.mimic = f, i.border = p, i.offset = j.offset, i.size = n, b.checks.tip = {
"^position.my|style.tip.(corner|mimic|border)$": function() {
i.init() || i.destroy(), b.reposition();
},
"^style.tip.(height|width)$": function() {
n = {
width: j.width,
height: j.height
}, i.create(), i.update(), b.reposition();
},
"^content.title.text|style.(classes|widget)$": function() {
k.tip && i.update();
}
}, a.extend(i, {
init: function() {
var b = i.detectCorner() && (s || a.browser.msie);
return b && (i.create(), i.update(), l.unbind(q).bind("tooltipmove" + q, t)), b;
},
detectCorner: function() {
var a = j.corner, c = b.options.position, f = c.at, g = c.my.string ? c.my.string() : c.my;
return a === e || g === e && f === e ? e : (a === d ? i.corner = new h.Corner(g) : a.string || (i.corner = new h.Corner(a), i.corner.fixed = d), i.corner.string() !== "centercenter");
},
detectColours: function() {
var c, d, e, f = k.tip.css({
backgroundColor: "",
border: ""
}), g = i.corner, h = g[g.precedance], m = "border-" + h + "-color", p = "border" + h.charAt(0) + h.substr(1) + "Color", q = /rgba?\(0, 0, 0(, 0)?\)|transparent/i, s = "background-color", t = "transparent", u = a(document.body).css("color"), v = b.elements.content.css("color"), w = k.titlebar && (g.y === "top" || g.y === "center" && f.position().top + n.height / 2 + j.offset < k.titlebar.outerHeight(1)), x = w ? k.titlebar : k.content;
l.addClass(r), o.fill = d = f.css(s), o.border = e = f[0].style[p] || l.css(m);
if (!d || q.test(d)) o.fill = x.css(s) || t, q.test(o.fill) && (o.fill = l.css(s) || d);
if (!e || q.test(e) || e === u) {
o.border = x.css(m) || t;
if (q.test(o.border) || o.border === v) o.border = e;
}
a("*", f).add(f).css(s, t).css("border", ""), l.removeClass(r);
},
create: function() {
var b = n.width, c = n.height, d;
k.tip && k.tip.remove(), k.tip = a("<div />", {
"class": "ui-tooltip-tip"
}).css({
width: b,
height: c
}).prependTo(l), s ? a("<canvas />").appendTo(k.tip)[0].getContext("2d").save() : (d = '<vml:shape coordorigin="0,0" style="display:inline-block; position:absolute; behavior:url(#default#VML);"></vml:shape>', k.tip.html(d + d));
},
update: function(b, c) {
var g = k.tip, l = g.children(), m = n.width, q = n.height, r = "px solid ", t = "px dashed transparent", v = j.mimic, x = Math.round, y, z, A, C, D;
b || (b = i.corner), v === e ? v = b : (v = new h.Corner(v), v.precedance = b.precedance, v.x === "inherit" ? v.x = b.x : v.y === "inherit" ? v.y = b.y : v.x === v.y && (v[b.precedance] = b[b.precedance])), y = v.precedance, i.detectColours(), o.border !== "transparent" && o.border !== "#123456" ? (p = u(b, f, d), j.border === 0 && p > 0 && (o.fill = o.border), i.border = p = j.border !== d ? j.border : p) : i.border = p = 0, A = B(v, m, q), i.size = D = w(b), g.css(D), b.precedance === "y" ? C = [ x(v.x === "left" ? p : v.x === "right" ? D.width - m - p : (D.width - m) / 2), x(v.y === "top" ? D.height - q : 0) ] : C = [ x(v.x === "left" ? D.width - m : 0), x(v.y === "top" ? p : v.y === "bottom" ? D.height - q - p : (D.height - q) / 2) ], s ? (l.attr(D), z = l[0].getContext("2d"), z.restore(), z.save(), z.clearRect(0, 0, 3e3, 3e3), z.translate(C[0], C[1]), z.beginPath(), z.moveTo(A[0][0], A[0][1]), z.lineTo(A[1][0], A[1][1]), z.lineTo(A[2][0], A[2][1]), z.closePath(), z.fillStyle = o.fill, z.strokeStyle = o.border, z.lineWidth = p * 2, z.lineJoin = "miter", z.miterLimit = 100, p && z.stroke(), z.fill()) : (A = "m" + A[0][0] + "," + A[0][1] + " l" + A[1][0] + "," + A[1][1] + " " + A[2][0] + "," + A[2][1] + " xe", C[2] = p && /^(r|b)/i.test(b.string()) ? parseFloat(a.browser.version, 10) === 8 ? 2 : 1 : 0, l.css({
antialias: "" + (v.string().indexOf("center") > -1),
left: C[0] - C[2] * Number(y === "x"),
top: C[1] - C[2] * Number(y === "y"),
width: m + p,
height: q + p
}).each(function(b) {
var c = a(this);
c[c.prop ? "prop" : "attr"]({
coordsize: m + p + " " + (q + p),
path: A,
fillcolor: o.fill,
filled: !!b,
stroked: !b
}).css({
display: p || b ? "block" : "none"
}), !b && c.html() === "" && c.html('<vml:stroke weight="' + p * 2 + 'px" color="' + o.border + '" miterlimit="1000" joinstyle="miter" ' + ' style="behavior:url(#default#VML); display:inline-block;" />');
})), c !== e && i.position(b);
},
position: function(b) {
var c = k.tip, f = {}, g = Math.max(0, j.offset), h, l, m;
return j.corner === e || !c ? e : (b = b || i.corner, h = b.precedance, l = w(b), m = [ b.x, b.y ], h === "x" && m.reverse(), a.each(m, function(a, c) {
var e, i;
c === "center" ? (e = h === "y" ? "left" : "top", f[e] = "50%", f["margin-" + e] = -Math.round(l[h === "y" ? "width" : "height"] / 2) + g) : (e = u(b, c, d), i = v(b), f[c] = a ? p ? u(b, c) : 0 : g + (i > e ? i : 0));
}), f[b[h]] -= l[h === "x" ? "width" : "height"], c.css({
top: "",
bottom: "",
left: "",
right: "",
margin: ""
}).css(f), f);
},
destroy: function() {
k.tip && k.tip.remove(), l.unbind(q);
}
}), i.init();
}
function D(c) {
var f = this, g = c.options.show.modal, h = c.elements, i = h.tooltip, j = "#qtip-overlay", k = ".qtipmodal", l = k + c.id, m = "is-modal-qtip", o = a(document.body), q;
c.checks.modal = {
"^show.modal.(on|blur)$": function() {
f.init(), h.overlay.toggle(i.is(":visible"));
}
}, a.extend(f, {
init: function() {
return g.on ? (q = f.create(), i.attr(m, d).unbind(k).unbind(l).bind("tooltipshow" + k + " tooltiphide" + k, function(a, b, c) {
var d = a.originalEvent;
d && a.type === "tooltiphide" && /mouse(leave|enter)/.test(d.type) && d.relatedTarget.closest(q[0]).length ? a.preventDefault() : f[a.type.replace("tooltip", "")](a, c);
}).bind("tooltipfocus" + k, function(a, b, c) {
q[0].style.zIndex = c;
}).bind("tooltipblur" + k, function(b) {
a("[" + m + "]:visible").not(i).last().qtip("focus", b);
}), g.escape && a(b).unbind(l).bind("keydown" + l, function(a) {
a.keyCode === 27 && i.hasClass(p) && c.hide(a);
}), g.blur && h.overlay.unbind(l).bind("click" + l, function(a) {
i.hasClass(p) && c.hide(a);
}), f) : f;
},
create: function() {
var c = a(j);
return c.length ? (h.overlay = c, c) : (q = h.overlay = a("<div />", {
id: j.substr(1),
html: "<div></div>",
mousedown: function() {
return e;
}
}).insertBefore(a(n).last()), a(b).unbind(k).bind("resize" + k, function() {
q.css({
height: a(b).height(),
width: a(b).width()
});
}).triggerHandler("resize"), q);
},
toggle: function(b, c, h) {
if (b && b.isDefaultPrevented()) return f;
var j = g.effect, k = c ? "show" : "hide", p = q.is(":visible"), r = a("[" + m + "]:visible").not(i), s;
return q || (q = f.create()), q.is(":animated") && p === c || !c && r.length ? f : (c ? (q.css({
left: 0,
top: 0
}), q.toggleClass("blurs", g.blur), o.delegate("*", "focusin" + l, function(b) {
a(b.target).closest(n)[0] !== i[0] && a("a, :input, img", i).add(i).focus();
})) : o.undelegate("*", "focus" + l), q.stop(d, e), a.isFunction(j) ? j.call(q, c) : j === e ? q[k]() : q.fadeTo(parseInt(h, 10) || 90, c ? 1 : 0, function() {
c || a(this).hide();
}), c || q.queue(function(a) {
q.css({
left: "",
top: ""
}), a();
}), f);
},
show: function(a, b) {
return f.toggle(a, d, b);
},
hide: function(a, b) {
return f.toggle(a, e, b);
},
destroy: function() {
var d = q;
return d && (d = a("[" + m + "]").not(i).length < 1, d ? (h.overlay.remove(), a(b).unbind(k)) : h.overlay.unbind(k + c.id), o.undelegate("*", "focus" + l)), i.removeAttr(m).unbind(k);
}
}), f.init();
}
function E(b) {
var c = this, d = b.elements, e = d.tooltip, f = ".bgiframe-" + b.id;
a.extend(c, {
init: function() {
d.bgiframe = a('<iframe class="ui-tooltip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>'), d.bgiframe.appendTo(e), e.bind("tooltipmove" + f, c.adjust);
},
adjust: function() {
var a = b.get("dimensions"), c = b.plugins.tip, f = d.tip, g, h;
h = parseInt(e.css("border-left-width"), 10) || 0, h = {
left: -h,
top: -h
}, c && f && (g = c.corner.precedance === "x" ? [ "width", "left" ] : [ "height", "top" ], h[g[1]] -= f[g[0]]()), d.bgiframe.css(h).css(a);
},
destroy: function() {
d.bgiframe.remove(), e.unbind(f);
}
}), c.init();
}
"use strict";
var d = !0, e = !1, f = null, g, h, i, j = {}, k = "ui-tooltip", l = "ui-widget", m = "ui-state-disabled", n = "div.qtip." + k, o = k + "-default", p = k + "-focus", q = k + "-hover", r = k + "-fluid", s = "-31000px", t = "_replacedByqTip", u = "oldtitle", v;
g = a.fn.qtip = function(b, h, i) {
var j = ("" + b).toLowerCase(), k = f, l = j === "disable" ? [ d ] : a.makeArray(arguments).slice(1), m = l[l.length - 1], n = this[0] ? a.data(this[0], "qtip") : f;
if (!arguments.length && n || j === "api") return n;
if ("string" == typeof b) return this.each(function() {
var b = a.data(this, "qtip");
if (!b) return d;
m && m.timeStamp && (b.cache.event = m);
if (j !== "option" && j !== "options" || !h) b[j] && b[j].apply(b[j], l); else if (a.isPlainObject(h) || i !== c) b.set(h, i); else return k = b.get(h), e;
}), k !== f ? k : this;
if ("object" == typeof b || !arguments.length) return n = x(a.extend(d, {}, b)), g.bind.call(this, n, m);
}, g.bind = function(b, f) {
return this.each(function(i) {
function q(b) {
function d() {
o.render(typeof b == "object" || k.show.ready), l.show.add(l.hide).unbind(n);
}
if (o.cache.disabled) return e;
o.cache.event = a.extend({}, b), o.cache.target = b ? a(b.target) : [ c ], k.show.delay > 0 ? (clearTimeout(o.timers.show), o.timers.show = setTimeout(d, k.show.delay), m.show !== m.hide && l.hide.bind(m.hide, function() {
clearTimeout(o.timers.show);
})) : d();
}
var k, l, m, n, o, p;
p = a.isArray(b.id) ? b.id[i] : b.id, p = !p || p === e || p.length < 1 || j[p] ? g.nextid++ : j[p] = p, n = ".qtip-" + p + "-create", o = z.call(this, p, b);
if (o === e) return d;
k = o.options, a.each(h, function() {
this.initialize === "initialize" && this(o);
}), l = {
show: k.show.target,
hide: k.hide.target
}, m = {
show: a.trim("" + k.show.event).replace(/ /g, n + " ") + n,
hide: a.trim("" + k.hide.event).replace(/ /g, n + " ") + n
}, /mouse(over|enter)/i.test(m.show) && !/mouse(out|leave)/i.test(m.hide) && (m.hide += " mouseleave" + n), l.show.bind(m.show, q), (k.show.ready || k.prerender) && q(f);
});
}, h = g.plugins = {
Corner: function(a) {
a = ("" + a).replace(/([A-Z])/, " $1").replace(/middle/gi, "center").toLowerCase(), this.x = (a.match(/left|right/i) || a.match(/center/) || [ "inherit" ])[0].toLowerCase(), this.y = (a.match(/top|bottom|center/i) || [ "inherit" ])[0].toLowerCase(), this.precedance = a.charAt(0).search(/^(t|b)/) > -1 ? "y" : "x", this.string = function() {
return this.precedance === "y" ? this.y + this.x : this.x + this.y;
}, this.abbreviation = function() {
var a = this.x.substr(0, 1), b = this.y.substr(0, 1);
return a === b ? a : a === "c" || a !== "c" && b !== "c" ? b + a : a + b;
};
},
offset: function(c, d, e) {
function l(a, b) {
f.left += b * a.scrollLeft(), f.top += b * a.scrollTop();
}
var f = c.offset(), g = d, i = 0, j = document.body, k;
if (g) {
do {
g.css("position") !== "static" && (k = g[0] === j ? {
left: parseInt(g.css("left"), 10) || 0,
top: parseInt(g.css("top"), 10) || 0
} : g.position(), f.left -= k.left + (parseInt(g.css("borderLeftWidth"), 10) || 0), f.top -= k.top + (parseInt(g.css("borderTopWidth"), 10) || 0), i++);
if (g[0] === j) break;
} while (g = g.offsetParent());
(d[0] !== j || i > 1) && l(d, 1), (h.iOS < 4.1 && h.iOS > 3.1 || !h.iOS && e) && l(a(b), -1);
}
return f;
},
iOS: parseFloat(("" + (/CPU.*OS ([0-9_]{1,3})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [ 0, "" ])[1]).replace("undefined", "3_2").replace("_", ".")) || e,
fn: {
attr: function(b, c) {
if (!this.length) return;
var d = this[0], e = "title", f = a.data(d, "qtip");
if (b === e) {
if (arguments.length < 2) return a.attr(d, u);
if (typeof f == "object") return f && f.rendered && f.options.content.attr === e && f.cache.attr && f.set("content.text", c), a.fn["attr" + t].apply(this, arguments), a.attr(d, u, a.attr(d, e)), this.removeAttr(e);
}
},
clone: function(b) {
var c = a([]), d = "title", e;
return e = a.fn["clone" + t].apply(this, arguments).filter("[oldtitle]").each(function() {
a.attr(this, d, a.attr(this, u)), this.removeAttribute(u);
}).end(), e;
},
remove: a.ui ? f : function(b, c) {
a(this).each(function() {
c || (!b || a.filter(b, [ this ]).length) && a("*", this).add(this).each(function() {
a(this).triggerHandler("remove");
});
});
}
}
}, a.each(h.fn, function(b, c) {
if (!c) return d;
var e = a.fn[b + t] = a.fn[b];
a.fn[b] = function() {
return c.apply(this, arguments) || e.apply(this, arguments);
};
}), g.version = "2.0.0pre", g.nextid = 0, g.inactiveEvents = "click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "), g.zindex = 15e3, g.defaults = {
prerender: e,
id: e,
overwrite: d,
content: {
text: d,
attr: "title",
title: {
text: e,
button: e
}
},
position: {
my: "top left",
at: "bottom right",
target: e,
container: e,
viewport: e,
adjust: {
x: 0,
y: 0,
mouse: d,
resize: d,
method: "flip flip"
},
effect: function(b, c, d) {
a(this).animate(c, {
duration: 200,
queue: e
});
}
},
show: {
target: e,
event: "mouseenter",
effect: d,
delay: 90,
solo: e,
ready: e
},
hide: {
target: e,
event: "mouseleave",
effect: d,
delay: 0,
fixed: e,
inactive: e,
leave: "window",
distance: e
},
style: {
classes: "",
widget: e,
width: e
},
events: {
render: f,
move: f,
show: f,
hide: f,
toggle: f,
focus: f,
blur: f
}
}, h.ajax = function(a) {
var b = a.plugins.ajax;
return "object" == typeof b ? b : a.plugins.ajax = new A(a);
}, h.ajax.initialize = "render", h.ajax.sanitize = function(a) {
var b = a.content, c;
b && "ajax" in b && (c = b.ajax, typeof c != "object" && (c = a.content.ajax = {
url: c
}), "boolean" != typeof c.once && c.once && (c.once = !!c.once));
}, a.extend(d, g.defaults, {
content: {
ajax: {
loading: d,
once: d
}
}
}), h.tip = function(a) {
var b = a.plugins.tip;
return "object" == typeof b ? b : a.plugins.tip = new C(a);
}, h.tip.initialize = "render", h.tip.sanitize = function(a) {
var b = a.style, c;
b && "tip" in b && (c = a.style.tip, typeof c != "object" && (a.style.tip = {
corner: c
}), /string|boolean/i.test(typeof c.corner) || (c.corner = d), typeof c.width != "number" && delete c.width, typeof c.height != "number" && delete c.height, typeof c.border != "number" && c.border !== d && delete c.border, typeof c.offset != "number" && delete c.offset);
}, a.extend(d, g.defaults, {
style: {
tip: {
corner: d,
mimic: e,
width: 6,
height: 6,
border: d,
offset: 0
}
}
}), h.imagemap = function(b, c) {
function l(a, b) {
var d = 0, e = 1, f = 1, g = 0, h = 0, i = a.width, j = a.height;
while (i > 0 && j > 0 && e > 0 && f > 0) {
i = Math.floor(i / 2), j = Math.floor(j / 2), c.x === "left" ? e = i : c.x === "right" ? e = a.width - i : e += Math.floor(i / 2), c.y === "top" ? f = j : c.y === "bottom" ? f = a.height - j : f += Math.floor(j / 2), d = b.length;
while (d--) {
if (b.length < 2) break;
g = b[d][0] - a.offset.left, h = b[d][1] - a.offset.top, (c.x === "left" && g >= e || c.x === "right" && g <= e || c.x === "center" && (g < e || g > a.width - e) || c.y === "top" && h >= f || c.y === "bottom" && h <= f || c.y === "center" && (h < f || h > a.height - f)) && b.splice(d, 1);
}
}
return {
left: b[0][0],
top: b[0][1]
};
}
b.jquery || (b = a(b));
var d = b.attr("shape").toLowerCase(), e = b.attr("coords").split(","), f = [], g = a('img[usemap="#' + b.parent("map").attr("name") + '"]'), h = g.offset(), i = {
width: 0,
height: 0,
offset: {
top: 1e10,
right: 0,
bottom: 0,
left: 1e10
}
}, j = 0, k = 0;
h.left += Math.ceil((g.outerWidth() - g.width()) / 2), h.top += Math.ceil((g.outerHeight() - g.height()) / 2);
if (d === "poly") {
j = e.length;
while (j--) k = [ parseInt(e[--j], 10), parseInt(e[j + 1], 10) ], k[0] > i.offset.right && (i.offset.right = k[0]), k[0] < i.offset.left && (i.offset.left = k[0]), k[1] > i.offset.bottom && (i.offset.bottom = k[1]), k[1] < i.offset.top && (i.offset.top = k[1]), f.push(k);
} else f = a.map(e, function(a) {
return parseInt(a, 10);
});
switch (d) {
case "rect":
i = {
width: Math.abs(f[2] - f[0]),
height: Math.abs(f[3] - f[1]),
offset: {
left: f[0],
top: f[1]
}
};
break;
case "circle":
i = {
width: f[2] + 2,
height: f[2] + 2,
offset: {
left: f[0],
top: f[1]
}
};
break;
case "poly":
a.extend(i, {
width: Math.abs(i.offset.right - i.offset.left),
height: Math.abs(i.offset.bottom - i.offset.top)
}), c.string() === "centercenter" ? i.offset = {
left: i.offset.left + i.width / 2,
top: i.offset.top + i.height / 2
} : i.offset = l(i, f.slice()), i.width = i.height = 0;
}
return i.offset.left += h.left, i.offset.top += h.top, i;
}, h.svg = function(b, c) {
var d = a(document), e = b[0], f = {
width: 0,
height: 0,
offset: {
top: 1e10,
left: 1e10
}
}, g, h, i, j, k;
if (e.getBBox && e.parentNode) {
g = e.getBBox(), h = e.getScreenCTM(), i = e.farthestViewportElement || e;
if (!i.createSVGPoint) return f;
j = i.createSVGPoint(), j.x = g.x, j.y = g.y, k = j.matrixTransform(h), f.offset.left = k.x, f.offset.top = k.y, j.x += g.width, j.y += g.height, k = j.matrixTransform(h), f.width = k.x - f.offset.left, f.height = k.y - f.offset.top, f.offset.left += d.scrollLeft(), f.offset.top += d.scrollTop();
}
return f;
}, h.modal = function(a) {
var b = a.plugins.modal;
return "object" == typeof b ? b : a.plugins.modal = new D(a);
}, h.modal.initialize = "render", h.modal.sanitize = function(a) {
a.show && (typeof a.show.modal != "object" ? a.show.modal = {
on: !!a.show.modal
} : typeof a.show.modal.on == "undefined" && (a.show.modal.on = d));
}, a.extend(d, g.defaults, {
show: {
modal: {
on: e,
effect: d,
blur: d,
escape: d
}
}
}), h.bgiframe = function(b) {
var c = a.browser, d = b.plugins.bgiframe;
return a("select, object").length < 1 || !c.msie || c.version.charAt(0) !== "6" ? e : "object" == typeof d ? d : b.plugins.bgiframe = new E(b);
}, h.bgiframe.initialize = "render";
}(jQuery, window), function() {
function A(a, b, c) {
if (a === b) return a !== 0 || 1 / a == 1 / b;
if (a == null || b == null) return a === b;
a._chain && (a = a._wrapped), b._chain && (b = b._wrapped);
if (w.isFunction(a.isEqual)) return a.isEqual(b);
if (w.isFunction(b.isEqual)) return b.isEqual(a);
var d = typeof a;
if (d != typeof b) return !1;
if (!a != !b) return !1;
if (w.isNaN(a)) return w.isNaN(b);
var e = w.isString(a), f = w.isString(b);
if (e || f) return e && f && String(a) == String(b);
var g = w.isNumber(a), h = w.isNumber(b);
if (g || h) return g && h && +a == +b;
var i = w.isBoolean(a), k = w.isBoolean(b);
if (i || k) return i && k && +a == +b;
var l = w.isDate(a), m = w.isDate(b);
if (l || m) return l && m && a.getTime() == b.getTime();
var n = w.isRegExp(a), o = w.isRegExp(b);
if (n || o) return n && o && a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
if (d != "object") return !1;
if (a.length !== b.length) return !1;
if (a.constructor !== b.constructor) return !1;
var p = c.length;
while (p--) if (c[p] == a) return !0;
c.push(a);
var q = 0, r = !0;
for (var s in a) if (j.call(a, s)) {
q++;
if (!(r = j.call(b, s) && A(a[s], b[s], c))) break;
}
if (r) {
for (s in b) if (j.call(b, s) && !(q--)) break;
r = !q;
}
return c.pop(), r;
}
var a = this, b = a._, c = {}, d = Array.prototype, e = Object.prototype, f = Function.prototype, g = d.slice, h = d.unshift, i = e.toString, j = e.hasOwnProperty, k = d.forEach, l = d.map, m = d.reduce, n = d.reduceRight, o = d.filter, p = d.every, q = d.some, r = d.indexOf, s = d.lastIndexOf, t = Array.isArray, u = Object.keys, v = f.bind, w = function(a) {
return new C(a);
};
typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = w), exports._ = w) : typeof define == "function" && define.amd ? define("underscore", function() {
return w;
}) : a._ = w, w.VERSION = "1.2.1";
var x = w.each = w.forEach = function(a, b, d) {
if (a == null) return;
if (k && a.forEach === k) a.forEach(b, d); else if (a.length === +a.length) {
for (var e = 0, f = a.length; e < f; e++) if (e in a && b.call(d, a[e], e, a) === c) return;
} else for (var g in a) if (j.call(a, g) && b.call(d, a[g], g, a) === c) return;
};
w.map = function(a, b, c) {
var d = [];
return a == null ? d : l && a.map === l ? a.map(b, c) : (x(a, function(a, e, f) {
d[d.length] = b.call(c, a, e, f);
}), d);
}, w.reduce = w.foldl = w.inject = function(a, b, c, d) {
var e = c !== void 0;
a == null && (a = []);
if (m && a.reduce === m) return d && (b = w.bind(b, d)), e ? a.reduce(b, c) : a.reduce(b);
x(a, function(a, f, g) {
e ? c = b.call(d, c, a, f, g) : (c = a, e = !0);
});
if (!e) throw new TypeError("Reduce of empty array with no initial value");
return c;
}, w.reduceRight = w.foldr = function(a, b, c, d) {
a == null && (a = []);
if (n && a.reduceRight === n) return d && (b = w.bind(b, d)), c !== void 0 ? a.reduceRight(b, c) : a.reduceRight(b);
var e = (w.isArray(a) ? a.slice() : w.toArray(a)).reverse();
return w.reduce(e, b, c, d);
}, w.find = w.detect = function(a, b, c) {
var d;
return y(a, function(a, e, f) {
if (b.call(c, a, e, f)) return d = a, !0;
}), d;
}, w.filter = w.select = function(a, b, c) {
var d = [];
return a == null ? d : o && a.filter === o ? a.filter(b, c) : (x(a, function(a, e, f) {
b.call(c, a, e, f) && (d[d.length] = a);
}), d);
}, w.reject = function(a, b, c) {
var d = [];
return a == null ? d : (x(a, function(a, e, f) {
b.call(c, a, e, f) || (d[d.length] = a);
}), d);
}, w.every = w.all = function(a, b, d) {
var e = !0;
return a == null ? e : p && a.every === p ? a.every(b, d) : (x(a, function(a, f, g) {
if (!(e = e && b.call(d, a, f, g))) return c;
}), e);
};
var y = w.some = w.any = function(a, b, d) {
b = b || w.identity;
var e = !1;
return a == null ? e : q && a.some === q ? a.some(b, d) : (x(a, function(a, f, g) {
if (e |= b.call(d, a, f, g)) return c;
}), !!e);
};
w.include = w.contains = function(a, b) {
var c = !1;
return a == null ? c : r && a.indexOf === r ? a.indexOf(b) != -1 : (c = y(a, function(a) {
if (a === b) return !0;
}), c);
}, w.invoke = function(a, b) {
var c = g.call(arguments, 2);
return w.map(a, function(a) {
return (b.call ? b || a : a[b]).apply(a, c);
});
}, w.pluck = function(a, b) {
return w.map(a, function(a) {
return a[b];
});
}, w.max = function(a, b, c) {
if (!b && w.isArray(a)) return Math.max.apply(Math, a);
if (!b && w.isEmpty(a)) return -Infinity;
var d = {
computed: -Infinity
};
return x(a, function(a, e, f) {
var g = b ? b.call(c, a, e, f) : a;
g >= d.computed && (d = {
value: a,
computed: g
});
}), d.value;
}, w.min = function(a, b, c) {
if (!b && w.isArray(a)) return Math.min.apply(Math, a);
if (!b && w.isEmpty(a)) return Infinity;
var d = {
computed: Infinity
};
return x(a, function(a, e, f) {
var g = b ? b.call(c, a, e, f) : a;
g < d.computed && (d = {
value: a,
computed: g
});
}), d.value;
}, w.shuffle = function(a) {
var b = [], c;
return x(a, function(a, d, e) {
d == 0 ? b[0] = a : (c = Math.floor(Math.random() * (d + 1)), b[d] = b[c], b[c] = a);
}), b;
}, w.sortBy = function(a, b, c) {
return w.pluck(w.map(a, function(a, d, e) {
return {
value: a,
criteria: b.call(c, a, d, e)
};
}).sort(function(a, b) {
var c = a.criteria, d = b.criteria;
return c < d ? -1 : c > d ? 1 : 0;
}), "value");
}, w.groupBy = function(a, b) {
var c = {}, d = w.isFunction(b) ? b : function(a) {
return a[b];
};
return x(a, function(a, b) {
var e = d(a, b);
(c[e] || (c[e] = [])).push(a);
}), c;
}, w.sortedIndex = function(a, b, c) {
c || (c = w.identity);
var d = 0, e = a.length;
while (d < e) {
var f = d + e >> 1;
c(a[f]) < c(b) ? d = f + 1 : e = f;
}
return d;
}, w.toArray = function(a) {
return a ? a.toArray ? a.toArray() : w.isArray(a) ? g.call(a) : w.isArguments(a) ? g.call(a) : w.values(a) : [];
}, w.size = function(a) {
return w.toArray(a).length;
}, w.first = w.head = function(a, b, c) {
return b != null && !c ? g.call(a, 0, b) : a[0];
}, w.initial = function(a, b, c) {
return g.call(a, 0, a.length - (b == null || c ? 1 : b));
}, w.last = function(a, b, c) {
return b != null && !c ? g.call(a, a.length - b) : a[a.length - 1];
}, w.rest = w.tail = function(a, b, c) {
return g.call(a, b == null || c ? 1 : b);
}, w.compact = function(a) {
return w.filter(a, function(a) {
return !!a;
});
}, w.flatten = function(a, b) {
return w.reduce(a, function(a, c) {
return w.isArray(c) ? a.concat(b ? c : w.flatten(c)) : (a[a.length] = c, a);
}, []);
}, w.without = function(a) {
return w.difference(a, g.call(arguments, 1));
}, w.uniq = w.unique = function(a, b, c) {
var d = c ? w.map(a, c) : a, e = [];
return w.reduce(d, function(c, d, f) {
if (0 == f || (b === !0 ? w.last(c) != d : !w.include(c, d))) c[c.length] = d, e[e.length] = a[f];
return c;
}, []), e;
}, w.union = function() {
return w.uniq(w.flatten(arguments, !0));
}, w.intersection = w.intersect = function(a) {
var b = g.call(arguments, 1);
return w.filter(w.uniq(a), function(a) {
return w.every(b, function(b) {
return w.indexOf(b, a) >= 0;
});
});
}, w.difference = function(a, b) {
return w.filter(a, function(a) {
return !w.include(b, a);
});
}, w.zip = function() {
var a = g.call(arguments), b = w.max(w.pluck(a, "length")), c = new Array(b);
for (var d = 0; d < b; d++) c[d] = w.pluck(a, "" + d);
return c;
}, w.indexOf = function(a, b, c) {
if (a == null) return -1;
var d, e;
if (c) return d = w.sortedIndex(a, b), a[d] === b ? d : -1;
if (r && a.indexOf === r) return a.indexOf(b);
for (d = 0, e = a.length; d < e; d++) if (a[d] === b) return d;
return -1;
}, w.lastIndexOf = function(a, b) {
if (a == null) return -1;
if (s && a.lastIndexOf === s) return a.lastIndexOf(b);
var c = a.length;
while (c--) if (a[c] === b) return c;
return -1;
}, w.range = function(a, b, c) {
arguments.length <= 1 && (b = a || 0, a = 0), c = arguments[2] || 1;
var d = Math.max(Math.ceil((b - a) / c), 0), e = 0, f = new Array(d);
while (e < d) f[e++] = a, a += c;
return f;
};
var z = function() {};
w.bind = function(b, c) {
var d, e;
if (b.bind === v && v) return v.apply(b, g.call(arguments, 1));
if (!w.isFunction(b)) throw new TypeError;
return e = g.call(arguments, 2), d = function() {
if (this instanceof d) {
z.prototype = b.prototype;
var a = new z, f = b.apply(a, e.concat(g.call(arguments)));
return Object(f) === f ? f : a;
}
return b.apply(c, e.concat(g.call(arguments)));
};
}, w.bindAll = function(a) {
var b = g.call(arguments, 1);
return b.length == 0 && (b = w.functions(a)), x(b, function(b) {
a[b] = w.bind(a[b], a);
}), a;
}, w.memoize = function(a, b) {
var c = {};
return b || (b = w.identity), function() {
var d = b.apply(this, arguments);
return j.call(c, d) ? c[d] : c[d] = a.apply(this, arguments);
};
}, w.delay = function(a, b) {
var c = g.call(arguments, 2);
return setTimeout(function() {
return a.apply(a, c);
}, b);
}, w.defer = function(a) {
return w.delay.apply(w, [ a, 1 ].concat(g.call(arguments, 1)));
}, w.throttle = function(a, b) {
var c, d, e, f, g;
return g = w.debounce(function() {
f = !1;
}, b), function() {
d = this, e = arguments;
var h = function() {
c = null, a.apply(d, e), g();
};
c || (c = setTimeout(h, b)), f || a.apply(d, e), g && g(), f = !0;
};
}, w.debounce = function(a, b) {
var c;
return function() {
var d = this, e = arguments, f = function() {
c = null, a.apply(d, e);
};
clearTimeout(c), c = setTimeout(f, b);
};
}, w.once = function(a) {
var b = !1, c;
return function() {
return b ? c : (b = !0, c = a.apply(this, arguments));
};
}, w.wrap = function(a, b) {
return function() {
var c = [ a ].concat(g.call(arguments));
return b.apply(this, c);
};
}, w.compose = function() {
var a = g.call(arguments);
return function() {
var b = g.call(arguments);
for (var c = a.length - 1; c >= 0; c--) b = [ a[c].apply(this, b) ];
return b[0];
};
}, w.after = function(a, b) {
return function() {
if (--a < 1) return b.apply(this, arguments);
};
}, w.keys = u || function(a) {
if (a !== Object(a)) throw new TypeError("Invalid object");
var b = [];
for (var c in a) j.call(a, c) && (b[b.length] = c);
return b;
}, w.values = function(a) {
return w.map(a, w.identity);
}, w.functions = w.methods = function(a) {
var b = [];
for (var c in a) w.isFunction(a[c]) && b.push(c);
return b.sort();
}, w.extend = function(a) {
return x(g.call(arguments, 1), function(b) {
for (var c in b) b[c] !== void 0 && (a[c] = b[c]);
}), a;
}, w.defaults = function(a) {
return x(g.call(arguments, 1), function(b) {
for (var c in b) a[c] == null && (a[c] = b[c]);
}), a;
}, w.clone = function(a) {
return w.isObject(a) ? w.isArray(a) ? a.slice() : w.extend({}, a) : a;
}, w.tap = function(a, b) {
return b(a), a;
}, w.isEqual = function(a, b) {
return A(a, b, []);
}, w.isEmpty = function(a) {
if (w.isArray(a) || w.isString(a)) return a.length === 0;
for (var b in a) if (j.call(a, b)) return !1;
return !0;
}, w.isElement = function(a) {
return !!a && a.nodeType == 1;
}, w.isArray = t || function(a) {
return i.call(a) == "[object Array]";
}, w.isObject = function(a) {
return a === Object(a);
}, i.call(arguments) == "[object Arguments]" ? w.isArguments = function(a) {
return i.call(a) == "[object Arguments]";
} : w.isArguments = function(a) {
return !!a && !!j.call(a, "callee");
}, w.isFunction = function(a) {
return i.call(a) == "[object Function]";
}, w.isString = function(a) {
return i.call(a) == "[object String]";
}, w.isNumber = function(a) {
return i.call(a) == "[object Number]";
}, w.isNaN = function(a) {
return a !== a;
}, w.isBoolean = function(a) {
return a === !0 || a === !1 || i.call(a) == "[object Boolean]";
}, w.isDate = function(a) {
return i.call(a) == "[object Date]";
}, w.isRegExp = function(a) {
return i.call(a) == "[object RegExp]";
}, w.isNull = function(a) {
return a === null;
}, w.isUndefined = function(a) {
return a === void 0;
}, w.noConflict = function() {
return a._ = b, this;
}, w.identity = function(a) {
return a;
}, w.times = function(a, b, c) {
for (var d = 0; d < a; d++) b.call(c, d);
}, w.escape = function(a) {
return ("" + a).replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
}, w.mixin = function(a) {
x(w.functions(a), function(b) {
E(b, w[b] = a[b]);
});
};
var B = 0;
w.uniqueId = function(a) {
var b = B++;
return a ? a + b : b;
}, w.templateSettings = {
evaluate: /<%([\s\S]+?)%>/g,
interpolate: /<%=([\s\S]+?)%>/g,
escape: /<%-([\s\S]+?)%>/g
}, w.template = function(a, b) {
var c = w.templateSettings, d = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + a.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(c.escape, function(a, b) {
return "',_.escape(" + b.replace(/\\'/g, "'") + "),'";
}).replace(c.interpolate, function(a, b) {
return "'," + b.replace(/\\'/g, "'") + ",'";
}).replace(c.evaluate || null, function(a, b) {
return "');" + b.replace(/\\'/g, "'").replace(/[\r\n\t]/g, " ") + "__p.push('";
}).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');", e = new Function("obj", d);
return b ? e(b) : e;
};
var C = function(a) {
this._wrapped = a;
};
w.prototype = C.prototype;
var D = function(a, b) {
return b ? w(a).chain() : a;
}, E = function(a, b) {
C.prototype[a] = function() {
var a = g.call(arguments);
return h.call(a, this._wrapped), D(b.apply(w, a), this._chain);
};
};
w.mixin(w), x([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(a) {
var b = d[a];
C.prototype[a] = function() {
return b.apply(this._wrapped, arguments), D(this._wrapped, this._chain);
};
}), x([ "concat", "join", "slice" ], function(a) {
var b = d[a];
C.prototype[a] = function() {
return D(b.apply(this._wrapped, arguments), this._chain);
};
}), C.prototype.chain = function() {
return this._chain = !0, this;
}, C.prototype.value = function() {
return this._wrapped;
};
}(), _.mixin({
indexBy: function(a, b) {
var c = null;
return typeof b == "string" ? c = function(a) {
return a[b];
} : c = b, _.reduce(a, function(a, b) {
return a[c(b)] = b, a;
}, {});
}
}), function() {
var a = this, b = a.Backbone, c;
typeof exports != "undefined" ? c = exports : c = a.Backbone = {}, c.VERSION = "0.5.3";
var d = a._;
!d && typeof require != "undefined" && (d = require("underscore")._);
var e = a.jQuery || a.Zepto;
c.noConflict = function() {
return a.Backbone = b, this;
}, c.emulateHTTP = !1, c.emulateJSON = !1, c.Events = {
bind: function(a, b, c) {
var d = this._callbacks || (this._callbacks = {}), e = d[a] || (d[a] = []);
return e.push([ b, c ]), this;
},
unbind: function(a, b) {
var c;
if (!a) this._callbacks = {}; else if (c = this._callbacks) if (!b) c[a] = []; else {
var d = c[a];
if (!d) return this;
for (var e = 0, f = d.length; e < f; e++) if (d[e] && b === d[e][0]) {
d[e] = null;
break;
}
}
return this;
},
trigger: function(a) {
var b, c, d, e, f, g = 2;
if (!(c = this._callbacks)) return this;
while (g--) {
d = g ? a : "all";
if (b = c[d]) for (var h = 0, i = b.length; h < i; h++) (e = b[h]) ? (f = g ? Array.prototype.slice.call(arguments, 1) : arguments, e[0].apply(e[1] || this, f)) : (b.splice(h, 1), h--, i--);
}
return this;
}
}, c.Model = function(a, b) {
var c;
a || (a = {});
if (c = this.defaults) d.isFunction(c) && (c = c.call(this)), a = d.extend({}, c, a);
this.attributes = {}, this._escapedAttributes = {}, this.cid = d.uniqueId("c"), this.set(a, {
silent: !0
}), this._changed = !1, this._previousAttributes = d.clone(this.attributes), b && b.collection && (this.collection = b.collection), this.initialize(a, b);
}, d.extend(c.Model.prototype, c.Events, {
_previousAttributes: null,
_changed: !1,
idAttribute: "id",
initialize: function() {},
toJSON: function() {
return d.clone(this.attributes);
},
get: function(a) {
return this.attributes[a];
},
escape: function(a) {
var b;
if (b = this._escapedAttributes[a]) return b;
var c = this.attributes[a];
return this._escapedAttributes[a] = w(c == null ? "" : "" + c);
},
has: function(a) {
return this.attributes[a] != null;
},
set: function(a, b) {
b || (b = {});
if (!a) return this;
a.attributes && (a = a.attributes);
var c = this.attributes, e = this._escapedAttributes;
if (!b.silent && this.validate && !this._performValidation(a, b)) return !1;
this.idAttribute in a && (this.id = a[this.idAttribute]);
var f = this._changing;
this._changing = !0;
for (var g in a) {
var h = a[g];
d.isEqual(c[g], h) || (c[g] = h, delete e[g], this._changed = !0, b.silent || this.trigger("change:" + g, this, h, b));
}
return !f && !b.silent && this._changed && this.change(b), this._changing = !1, this;
},
unset: function(a, b) {
if (a in this.attributes) {
b || (b = {});
var c = this.attributes[a], d = {};
return d[a] = void 0, !b.silent && this.validate && !this._performValidation(d, b) ? !1 : (delete this.attributes[a], delete this._escapedAttributes[a], a == this.idAttribute && delete this.id, this._changed = !0, b.silent || (this.trigger("change:" + a, this, void 0, b), this.change(b)), this);
}
return this;
},
clear: function(a) {
a || (a = {});
var b, c = this.attributes, d = {};
for (b in c) d[b] = void 0;
if (!a.silent && this.validate && !this._performValidation(d, a)) return !1;
this.attributes = {}, this._escapedAttributes = {}, this._changed = !0;
if (!a.silent) {
for (b in c) this.trigger("change:" + b, this, void 0, a);
this.change(a);
}
return this;
},
fetch: function(a) {
a || (a = {});
var b = this, d = a.success;
return a.success = function(c, e, f) {
if (!b.set(b.parse(c, f), a)) return !1;
d && d(b, c);
}, a.error = v(a.error, b, a), (this.sync || c.sync).call(this, "read", this, a);
},
save: function(a, b) {
b || (b = {});
if (a && !this.set(a, b)) return !1;
var d = this, e = b.success;
b.success = function(a, c, f) {
if (!d.set(d.parse(a, f), b)) return !1;
e && e(d, a, f);
}, b.error = v(b.error, d, b);
var f = this.isNew() ? "create" : "update";
return (this.sync || c.sync).call(this, f, this, b);
},
destroy: function(a) {
a || (a = {});
if (this.isNew()) return this.trigger("destroy", this, this.collection, a);
var b = this, d = a.success;
return a.success = function(c) {
b.trigger("destroy", b, b.collection, a), d && d(b, c);
}, a.error = v(a.error, b, a), (this.sync || c.sync).call(this, "delete", this, a);
},
url: function() {
var a = t(this.collection) || this.urlRoot || u();
return this.isNew() ? a : a + (a.charAt(a.length - 1) == "/" ? "" : "/") + encodeURIComponent(this.id);
},
parse: function(a, b) {
return a;
},
clone: function() {
return new this.constructor(this);
},
isNew: function() {
return this.id == null;
},
change: function(a) {
this.trigger("change", this, a), this._previousAttributes = d.clone(this.attributes), this._changed = !1;
},
hasChanged: function(a) {
return a ? this._previousAttributes[a] != this.attributes[a] : this._changed;
},
changedAttributes: function(a) {
a || (a = this.attributes);
var b = this._previousAttributes, c = !1;
for (var e in a) d.isEqual(b[e], a[e]) || (c = c || {}, c[e] = a[e]);
return c;
},
previous: function(a) {
return !a || !this._previousAttributes ? null : this._previousAttributes[a];
},
previousAttributes: function() {
return d.clone(this._previousAttributes);
},
_performValidation: function(a, b) {
var c = this.validate(a);
return c ? (b.error ? b.error(this, c, b) : this.trigger("error", this, c, b), !1) : !0;
}
}), c.Collection = function(a, b) {
b || (b = {}), b.comparator && (this.comparator = b.comparator), d.bindAll(this, "_onModelEvent", "_removeReference"), this._reset(), a && this.reset(a, {
silent: !0
}), this.initialize.apply(this, arguments);
}, d.extend(c.Collection.prototype, c.Events, {
model: c.Model,
initialize: function() {},
toJSON: function() {
return this.map(function(a) {
return a.toJSON();
});
},
add: function(a, b) {
if (d.isArray(a)) for (var c = 0, e = a.length; c < e; c++) this._add(a[c], b); else this._add(a, b);
return this;
},
remove: function(a, b) {
if (d.isArray(a)) for (var c = 0, e = a.length; c < e; c++) this._remove(a[c], b); else this._remove(a, b);
return this;
},
get: function(a) {
return a == null ? null : this._byId[a.id != null ? a.id : a];
},
getByCid: function(a) {
return a && this._byCid[a.cid || a];
},
at: function(a) {
return this.models[a];
},
sort: function(a) {
a || (a = {});
if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
return this.models = this.sortBy(this.comparator), a.silent || this.trigger("reset", this, a), this;
},
pluck: function(a) {
return d.map(this.models, function(b) {
return b.get(a);
});
},
reset: function(a, b) {
return a || (a = []), b || (b = {}), this.each(this._removeReference), this._reset(), this.add(a, {
silent: !0
}), b.silent || this.trigger("reset", this, b), this;
},
fetch: function(a) {
a || (a = {});
var b = this, d = a.success;
return a.success = function(c, e, f) {
b[a.add ? "add" : "reset"](b.parse(c, f), a), d && d(b, c);
}, a.error = v(a.error, b, a), (this.sync || c.sync).call(this, "read", this, a);
},
create: function(a, b) {
var c = this;
b || (b = {}), a = this._prepareModel(a, b);
if (!a) return !1;
var d = b.success;
return b.success = function(a, e, f) {
c.add(a, b), d && d(a, e, f);
}, a.save(null, b), a;
},
parse: function(a, b) {
return a;
},
chain: function() {
return d(this.models).chain();
},
_reset: function(a) {
this.length = 0, this.models = [], this._byId = {}, this._byCid = {};
},
_prepareModel: function(a, b) {
if (a instanceof c.Model) a.collection || (a.collection = this); else {
var d = a;
a = new this.model(d, {
collection: this
}), a.validate && !a._performValidation(d, b) && (a = !1);
}
return a;
},
_add: function(a, b) {
b || (b = {}), a = this._prepareModel(a, b);
if (!a) return !1;
var c = this.getByCid(a);
if (c) throw new Error([ "Can't add the same model to a set twice", c.id ]);
this._byId[a.id] = a, this._byCid[a.cid] = a;
var d = b.at != null ? b.at : this.comparator ? this.sortedIndex(a, this.comparator) : this.length;
return this.models.splice(d, 0, a), a.bind("all", this._onModelEvent), this.length++, b.silent || a.trigger("add", a, this, b), a;
},
_remove: function(a, b) {
return b || (b = {}), a = this.getByCid(a) || this.get(a), a ? (delete this._byId[a.id], delete this._byCid[a.cid], this.models.splice(this.indexOf(a), 1), this.length--, b.silent || a.trigger("remove", a, this, b), this._removeReference(a), a) : null;
},
_removeReference: function(a) {
this == a.collection && delete a.collection, a.unbind("all", this._onModelEvent);
},
_onModelEvent: function(a, b, c, d) {
if (a != "add" && a != "remove" || c == this) a == "destroy" && this._remove(b, d), b && a === "change:" + b.idAttribute && (delete this._byId[b.previous(b.idAttribute)], this._byId[b.id] = b), this.trigger.apply(this, arguments); else return;
}
});
var f = [ "forEach", "each", "map", "reduce", "reduceRight", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "sortBy", "sortedIndex", "toArray", "size", "first", "rest", "last", "without", "indexOf", "lastIndexOf", "isEmpty", "groupBy" ];
d.each(f, function(a) {
c.Collection.prototype[a] = function() {
return d[a].apply(d, [ this.models ].concat(d.toArray(arguments)));
};
}), c.Router = function(a) {
a || (a = {}), a.routes && (this.routes = a.routes), this._bindRoutes(), this.initialize.apply(this, arguments);
};
var g = /:([\w\d]+)/g, h = /\*([\w\d]+)/g, i = /[-[\]{}()+?.,\\^$|#\s]/g;
d.extend(c.Router.prototype, c.Events, {
initialize: function() {},
route: function(a, b, e) {
c.history || (c.history = new c.History), d.isRegExp(a) || (a = this._routeToRegExp(a)), c.history.route(a, d.bind(function(c) {
var d = this._extractParameters(a, c);
e.apply(this, d), this.trigger.apply(this, [ "route:" + b ].concat(d));
}, this));
},
navigate: function(a, b) {
c.history.navigate(a, b);
},
_bindRoutes: function() {
if (!this.routes) return;
var a = [];
for (var b in this.routes) a.unshift([ b, this.routes[b] ]);
for (var c = 0, d = a.length; c < d; c++) this.route(a[c][0], a[c][1], this[a[c][1]]);
},
_routeToRegExp: function(a) {
return a = a.replace(i, "\\$&").replace(g, "([^/]*)").replace(h, "(.*?)"), new RegExp("^" + a + "$");
},
_extractParameters: function(a, b) {
return a.exec(b).slice(1);
}
}), c.History = function() {
this.handlers = [], d.bindAll(this, "checkUrl");
};
var j = /^#*/, k = /msie [\w.]+/, l = !1;
d.extend(c.History.prototype, {
interval: 50,
getFragment: function(a, b) {
if (a == null) if (this._hasPushState || b) {
a = window.location.pathname;
var c = window.location.search;
c && (a += c), a.indexOf(this.options.root) == 0 && (a = a.substr(this.options.root.length));
} else a = window.location.hash;
return decodeURIComponent(a.replace(j, ""));
},
start: function(a) {
if (l) throw new Error("Backbone.history has already been started");
this.options = d.extend({}, {
root: "/"
}, this.options, a), this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && window.history && window.history.pushState);
var b = this.getFragment(), c = document.documentMode, f = k.exec(navigator.userAgent.toLowerCase()) && (!c || c <= 7);
f && (this.iframe = e('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(b)), this._hasPushState ? e(window).bind("popstate", this.checkUrl) : "onhashchange" in window && !f ? e(window).bind("hashchange", this.checkUrl) : setInterval(this.checkUrl, this.interval), this.fragment = b, l = !0;
var g = window.location, h = g.pathname == this.options.root;
if (this._wantsPushState && !this._hasPushState && !h) return this.fragment = this.getFragment(null, !0), window.location.replace(this.options.root + "#" + this.fragment), !0;
this._wantsPushState && this._hasPushState && h && g.hash && (this.fragment = g.hash.replace(j, ""), window.history.replaceState({}, document.title, g.protocol + "//" + g.host + this.options.root + this.fragment));
if (!this.options.silent) return this.loadUrl();
},
route: function(a, b) {
this.handlers.unshift({
route: a,
callback: b
});
},
checkUrl: function(a) {
var b = this.getFragment();
b == this.fragment && this.iframe && (b = this.getFragment(this.iframe.location.hash));
if (b == this.fragment || b == decodeURIComponent(this.fragment)) return !1;
this.iframe && this.navigate(b), this.loadUrl() || this.loadUrl(window.location.hash);
},
loadUrl: function(a) {
var b = this.fragment = this.getFragment(a), c = d.any(this.handlers, function(a) {
if (a.route.test(b)) return a.callback(b), !0;
});
return c;
},
navigate: function(a, b) {
var c = (a || "").replace(j, "");
if (this.fragment == c || this.fragment == decodeURIComponent(c)) return;
if (this._hasPushState) {
var d = window.location;
c.indexOf(this.options.root) != 0 && (c = this.options.root + c), this.fragment = c, window.history.pushState({}, document.title, d.protocol + "//" + d.host + c);
} else window.location.hash = this.fragment = c, this.iframe && c != this.getFragment(this.iframe.location.hash) && (this.iframe.document.open().close(), this.iframe.location.hash = c);
b && this.loadUrl(a);
}
}), c.View = function(a) {
this.cid = d.uniqueId("view"), this._configure(a || {}), this._ensureElement(), this.delegateEvents(), this.initialize.apply(this, arguments);
};
var m = function(a) {
return e(a, this.el);
}, n = /^(\S+)\s*(.*)$/, o = [ "model", "collection", "el", "id", "attributes", "className", "tagName" ];
d.extend(c.View.prototype, c.Events, {
tagName: "div",
$: m,
initialize: function() {},
render: function() {
return this;
},
remove: function() {
return e(this.el).remove(), this;
},
make: function(a, b, c) {
var d = document.createElement(a);
return b && e(d).attr(b), c && e(d).html(c), d;
},
delegateEvents: function(a) {
if (!a && !(a = this.events)) return;
d.isFunction(a) && (a = a.call(this)), e(this.el).unbind(".delegateEvents" + this.cid);
for (var b in a) {
var c = this[a[b]];
if (!c) throw new Error('Event "' + a[b] + '" does not exist');
var f = b.match(n), g = f[1], h = f[2];
c = d.bind(c, this), g += ".delegateEvents" + this.cid, h === "" ? e(this.el).bind(g, c) : e(this.el).delegate(h, g, c);
}
},
_configure: function(a) {
this.options && (a = d.extend({}, this.options, a));
for (var b = 0, c = o.length; b < c; b++) {
var e = o[b];
a[e] && (this[e] = a[e]);
}
this.options = a;
},
_ensureElement: function() {
if (!this.el) {
var a = this.attributes || {};
this.id && (a.id = this.id), this.className && (a["class"] = this.className), this.el = this.make(this.tagName, a);
} else d.isString(this.el) && (this.el = e(this.el).get(0));
}
});
var p = function(a, b) {
var c = s(this, a, b);
return c.extend = this.extend, c;
};
c.Model.extend = c.Collection.extend = c.Router.extend = c.View.extend = p;
var q = {
create: "POST",
update: "PUT",
"delete": "DELETE",
read: "GET"
};
c.sync = function(a, b, f) {
var g = q[a], h = d.extend({
type: g,
dataType: "json"
}, f);
return h.url || (h.url = t(b) || u()), !h.data && b && (a == "create" || a == "update") && (h.contentType = "application/json", h.data = JSON.stringify(b.toJSON())), c.emulateJSON && (h.contentType = "application/x-www-form-urlencoded", h.data = h.data ? {
model: h.data
} : {}), c.emulateHTTP && (g === "PUT" || g === "DELETE") && (c.emulateJSON && (h.data._method = g), h.type = "POST", h.beforeSend = function(a) {
a.setRequestHeader("X-HTTP-Method-Override", g);
}), h.type !== "GET" && !c.emulateJSON && (h.processData = !1), e.ajax(h);
};
var r = function() {}, s = function(a, b, c) {
var e;
return b && b.hasOwnProperty("constructor") ? e = b.constructor : e = function() {
return a.apply(this, arguments);
}, d.extend(e, a), r.prototype = a.prototype, e.prototype = new r, b && d.extend(e.prototype, b), c && d.extend(e, c), e.prototype.constructor = e, e.__super__ = a.prototype, e;
}, t = function(a) {
return !a || !a.url ? null : d.isFunction(a.url) ? a.url() : a.url;
}, u = function() {
throw new Error('A "url" property or function must be specified');
}, v = function(a, b, c) {
return function(d) {
a ? a(b, d, c) : b.trigger("error", b, d, c);
};
}, w = function(a) {
return a.replace(/&(?!\w+;|#\d+;|#x[\da-f]+;)/gi, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
};
}.call(this);

var Handlebars = {};

Handlebars.VERSION = "1.0.beta.2", Handlebars.helpers = {}, Handlebars.partials = {}, Handlebars.registerHelper = function(a, b, c) {
c && (b.not = c), this.helpers[a] = b;
}, Handlebars.registerPartial = function(a, b) {
this.partials[a] = b;
}, Handlebars.registerHelper("helperMissing", function(a) {
if (arguments.length === 2) return undefined;
throw new Error("Could not find property '" + a + "'");
}), Handlebars.registerHelper("blockHelperMissing", function(a, b) {
var c = b.inverse || function() {}, d = b.fn, e = "", f = Object.prototype.toString.call(a);
f === "[object Function]" && (a = a());
if (a === !0) return d(this);
if (a === !1 || a == null) return c(this);
if (f === "[object Array]") {
if (a.length > 0) for (var g = 0, h = a.length; g < h; g++) e += d(a[g]); else e = c(this);
return e;
}
return d(a);
}), Handlebars.registerHelper("each", function(a, b) {
var c = b.fn, d = b.inverse, e = "";
if (a && a.length > 0) for (var f = 0, g = a.length; f < g; f++) e += c(a[f]); else e = d(this);
return e;
}), Handlebars.registerHelper("if", function(a, b) {
return !a || Handlebars.Utils.isEmpty(a) ? b.inverse(this) : b.fn(this);
}), Handlebars.registerHelper("unless", function(a, b) {
var c = b.fn, d = b.inverse;
return b.fn = d, b.inverse = c, Handlebars.helpers["if"].call(this, a, b);
}), Handlebars.registerHelper("with", function(a, b) {
return b.fn(a);
}), Handlebars.registerHelper("log", function(a) {
Handlebars.log(a);
}), Handlebars.Exception = function(a) {
var b = Error.prototype.constructor.apply(this, arguments);
for (var c in b) b.hasOwnProperty(c) && (this[c] = b[c]);
}, Handlebars.Exception.prototype = new Error, Handlebars.SafeString = function(a) {
this.string = a;
}, Handlebars.SafeString.prototype.toString = function() {
return this.string.toString();
}, function() {
var a = {
"<": "&lt;",
">": "&gt;",
'"': "&quot;",
"'": "&#x27;",
"`": "&#x60;"
}, b = /&(?!\w+;)|[<>"'`]/g, c = /[&<>"'`]/, d = function(b) {
return a[b] || "&amp;";
};
Handlebars.Utils = {
escapeExpression: function(a) {
return a instanceof Handlebars.SafeString ? a.toString() : a == null || a === !1 ? "" : c.test(a) ? a.replace(b, d) : a;
},
isEmpty: function(a) {
return typeof a == "undefined" ? !0 : a === null ? !0 : a === !1 ? !0 : Object.prototype.toString.call(a) === "[object Array]" && a.length === 0 ? !0 : !1;
}
};
}(), Handlebars.VM = {
template: function(a) {
var b = {
escapeExpression: Handlebars.Utils.escapeExpression,
invokePartial: Handlebars.VM.invokePartial,
programs: [],
program: function(a, b, c) {
var d = this.programs[a];
return c ? Handlebars.VM.program(b, c) : d ? d : (d = this.programs[a] = Handlebars.VM.program(b), d);
},
programWithDepth: Handlebars.VM.programWithDepth,
noop: Handlebars.VM.noop
};
return function(c, d) {
return d = d || {}, a.call(b, Handlebars, c, d.helpers, d.partials, d.data);
};
},
programWithDepth: function(a, b, c) {
var d = Array.prototype.slice.call(arguments, 2);
return function(c, e) {
return e = e || {}, a.apply(this, [ c, e.data || b ].concat(d));
};
},
program: function(a, b) {
return function(c, d) {
return d = d || {}, a(c, d.data || b);
};
},
noop: function() {
return "";
},
invokePartial: function(a, b, c, d, e) {
if (a === undefined) throw new Handlebars.Exception("The partial " + b + " could not be found");
if (a instanceof Function) return a(c, {
helpers: d,
partials: e
});
if (!Handlebars.compile) throw new Handlebars.Exception("The partial " + b + " could not be compiled when running in vm mode");
return e[b] = Handlebars.compile(a), e[b](c, {
helpers: d,
partials: e
});
}
}, Handlebars.template = Handlebars.VM.template;

var Templates = {};

Templates.cache_ = {}, Templates.fromScript_ = function(a) {
var b = $("#template_" + a);
if (!b.length) throw Error("Can't find a template for [" + a + "]");
return Handlebars.compile(b.html());
}, Templates.getCanonicalName = function(a) {
if (a.indexOf(".") > -1) {
var b = a.split(".");
a = b[0] + "-package_" + b[1];
}
return a;
}, Templates.get = function(a) {
a = Templates.getCanonicalName(a);
if (Handlebars.templates) {
var b = Handlebars.templates[a];
if (b) return b;
}
return Templates.cache_[a] || (Templates.cache_[a] = Templates.fromScript_(a));
}, !function(a) {
function d(c) {
var d = this, e = this.$element.hasClass("fade") ? "fade" : "";
if (this.isShown && this.settings.backdrop) {
var f = a.support.transition && e;
this.$backdrop = a('<div class="modal-backdrop ' + e + '" />').appendTo(document.body), this.settings.backdrop != "static" && this.$backdrop.click(a.proxy(this.hide, this)), f && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), f ? this.$backdrop.one(b, c) : c();
} else if (!this.isShown && this.$backdrop) {
this.$backdrop.removeClass("in");
function g() {
d.$backdrop.remove(), d.$backdrop = null;
}
a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(b, g) : g();
} else c && c();
}
function e() {
var b = this;
this.isShown && this.settings.keyboard ? a(document).bind("keyup.modal", function(a) {
a.which == 27 && b.hide();
}) : this.isShown || a(document).unbind("keyup.modal");
}
var b;
a(document).ready(function() {
a.support.transition = function() {
var a = document.body || document.documentElement, b = a.style, c = b.transition !== undefined || b.WebkitTransition !== undefined || b.MozTransition !== undefined || b.MsTransition !== undefined || b.OTransition !== undefined;
return c;
}(), a.support.transition && (b = "TransitionEnd", a.browser.webkit ? b = "webkitTransitionEnd" : a.browser.mozilla ? b = "transitionend" : a.browser.opera && (b = "oTransitionEnd"));
});
var c = function(b, c) {
return this.settings = a.extend({}, a.fn.modal.defaults), this.$element = a(b).delegate(".close", "click.modal", a.proxy(this.hide, this)), c && (a.extend(this.settings, c), c.show && this.show()), this;
};
c.prototype = {
toggle: function() {
return this[this.isShown ? "hide" : "show"]();
},
show: function() {
var b = this;
return this.isShown = !0, this.$element.trigger("show"), e.call(this), d.call(this, function() {
b.$element.appendTo(document.body).show(), a.support.transition && b.$element.hasClass("fade") && b.$element[0].offsetWidth, b.$element.addClass("in").trigger("shown");
}), this;
},
hide: function(c) {
function g() {
f.$element.hide().trigger("hidden"), d.call(f);
}
c && c.preventDefault();
var f = this;
return this.isShown = !1, e.call(this), this.$element.trigger("hide").removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one(b, g) : g(), this;
}
}, a.fn.modal = function(b) {
var d = this.data("modal");
return d ? b === !0 ? d : (typeof b == "string" ? d[b]() : d && d.toggle(), this) : (typeof b == "string" && (b = {
show: /show|toggle/.test(b)
}), this.each(function() {
a(this).data("modal", new c(this, b));
}));
}, a.fn.modal.Modal = c, a.fn.modal.defaults = {
backdrop: !1,
keyboard: !1,
show: !0
}, a(document).ready(function() {
a("body").delegate("[data-controls-modal]", "click", function(b) {
b.preventDefault();
var c = a(this).data("show", !0);
a("#" + c.attr("data-controls-modal")).modal(c.data());
});
});
}(window.jQuery || window.ender);

var gae_bingo = function() {
var a = "/gae_bingo/blotter/", b = $.noop, c = $.noop, d = {}, e = function(d) {
d = typeof d == "undefined" ? {} : d, a = d.path || a, b = d.success !== undefined ? d.success : b, c = d.error !== undefined ? d.error : c, b = d.debug === undefined ? b : function(a, b, c) {
console.log("gae_bingo success(" + c.status + "):", a);
}, c = d.debug === undefined ? c : function(a, b) {
console.error("gae_bingo error (" + a.status + "):", a);
};
}, f = function(e, f, g, h, i) {
i = i || c, h = h || b;
var j = window.JSON.stringify || $.noop, k = {
canonical_name: e,
alternative_params: j(f),
conversion_name: j(g)
};
jQuery.ajax({
type: "POST",
url: a + "ab_test",
data: k,
success: function(a, b, c) {
d[e] = a, h(a, b, c);
},
error: i
});
}, g = function(d, e, f) {
f = f || c, e = e || b, jQuery.ajax({
url: a + "bingo",
type: "POST",
data: {
convert: $.isArray(d) ? d.join("\t") : d
},
success: e,
error: f
});
};
return {
init: e,
ab_test: window.JSON ? f : $.noop,
bingo: g,
tests: d
};
}();

Handlebars.registerHelper("opttr", function(a) {
var b = [];
return _.each(a.hash, function(a, c) {
a !== null && a !== undefined && b.push(c + '="' + Handlebars.Utils.escapeExpression(a) + '"');
}), new Handlebars.SafeString(b.join(" "));
}), Handlebars.registerHelper("repeat", function(a, b) {
var c = b.fn, d = "";
for (var e = 0; e < a; e++) d += c();
return d;
});

var KAConsole = {
debugEnabled: !1,
log: function() {
window.console && KAConsole.debugEnabled && (console.log.apply ? console.log.apply(console, arguments) : Function.prototype.apply.call(console.log, null, arguments));
}
};

$(function() {
$("#page_search input[type=text]").placeholder().length && initAutocomplete("#page_search input[type=text]", !0), $("#page_search").submit(function(a) {
return !!$.trim($("#page_search input[type=text]").val());
});
});

var VideoControls = {
player: null,
initJumpLinks: function() {
$("span.youTube").addClass("playYouTube").removeClass("youTube").click(VideoControls.clickYouTubeJump);
},
clickYouTubeJump: function() {
var a = $(this).attr("seconds");
VideoControls.player && a && (VideoControls.player.seekTo(Math.max(0, a - 2), !0), VideoControls.scrollToPlayer());
},
play: function() {
$(VideoControls).trigger("beforeplay"), VideoControls.player && VideoControls.player.playVideo && VideoControls.player.playVideo();
},
pause: function() {
VideoControls.player && VideoControls.player.pauseVideo && VideoControls.player.pauseVideo();
},
scrollToPlayer: function() {
var a = $(VideoControls.player).offset().top - 2;
$(window).scrollTop() > a && $(window).scrollTop(a);
},
onYouTubeBlocked: function(a) {
$("<img width=0 height=0>").error(a).attr("src", "http://www.youtube.com/favicon.ico?" + Math.random()).appendTo("#page-container");
},
initThumbnails: function() {
var a = {
duration: 150,
queue: !1
};
$("#thumbnails").cycle({
fx: "scrollHorz",
timeout: 0,
speed: 550,
slideResize: 0,
easing: "easeInOutBack",
startingSlide: 0,
prev: "#arrow-left",
next: "#arrow-right",
before: function() {
$(this).find("div.pending").each(function() {
$(this).css("background-image", "url('" + $(this).data("src") + "')");
});
}
}).css({
width: ""
}).find(".thumbnail_link").click(VideoControls.thumbnailClick).end().find(".thumbnail_td").hover(function() {
$(this).find(".thumbnail_label").animate({
marginTop: -78
}, a).end().find(".thumbnail_teaser").animate({
height: 45
}, a);
}, function() {
$(this).find(".thumbnail_label").animate({
marginTop: -32
}, a).end().find(".thumbnail_teaser").animate({
height: 0
}, a);
});
},
thumbnailClick: function() {
var a = $(this).parents("td").first(), b = a.attr("data-youtube-id");
if (VideoControls.player && b) return $(VideoControls).trigger("beforeplay"), VideoControls.player.loadVideoById(b, 0, "default"), VideoControls.scrollToPlayer(), $("#thumbnails td.selected").removeClass("selected"), a.addClass("selected"), VideoStats.startLoggingProgress(a.attr("data-key")), !1;
}
}, VideoStats = {
dPercentGranularity: .05,
dPercentLastSaved: 0,
fSaving: !1,
player: null,
intervalId: null,
fAlternativePlayer: !1,
fEventsAttached: !1,
cachedDuration: 0,
cachedCurrentTime: 0,
dtLastSaved: null,
sVideoKey: null,
sYoutubeId: null,
playing: !1,
getSecondsWatched: function() {
return this.player ? this.player.getCurrentTime() || 0 : 0;
},
getSecondsWatchedSinceSave: function() {
var a = (new Date - this.dtLastSaved) / 1e3;
return Math.min(a, this.getSecondsWatched());
},
getPercentWatched: function() {
if (!this.player) return 0;
var a = this.player.getDuration() || 0;
return a <= 0 ? 0 : this.getSecondsWatched() / a;
},
startLoggingProgress: function(a, b) {
if (b) this.sYoutubeId = b; else if (a) this.sVideoKey = a; else return;
this.dPercentLastSaved = 0, this.cachedDuration = 0, this.cachedCurrentTime = 0, this.dtLastSaved = new Date;
if (this.fEventsAttached) return;
this.player && this.listenToPlayerStateChange();
var c = this;
$(this).bind("playerready.videostats", function() {
c.listenToPlayerStateChange();
}), this.intervalId === null && (this.intervalId = setInterval(function() {
VideoStats.playerStateChange(-2);
}, 1e4)), this.fEventsAttached = !0;
},
stopLoggingProgress: function() {
$(this).unbind("playerready.videostats"), this.playerStateChange(2), this.intervalId !== null && (clearInterval(this.intervalId), this.intervalId = null), this.fEventsAttached = !1;
},
listenToPlayerStateChange: function() {
!this.fAlternativePlayer && !this.player.fStateChangeHookAttached && (this.player.addEventListener("onStateChange", "onYouTubePlayerStateChange"), this.player.fStateChangeHookAttached = !0);
},
playerStateChange: function(a) {
var b = this.playing || this.fAlternativePlayer;
if (a == -2) {
var c = this.getPercentWatched();
c > this.dPercentLastSaved + this.dPercentGranularity && this.save();
} else a === 0 && b ? (this.playing = !1, this.save()) : a == 2 && b ? (this.playing = !1, this.getSecondsWatchedSinceSave() > 1 && this.save()) : a == 1 && (this.playing = !0, this.dtLastSaved = new Date, this.dPercentLastSaved = this.getPercentWatched(), !VideoControls.videoBingoSent && typeof Homepage != "undefined" && (gae_bingo.bingo([ "homepage_restructure_homepage_video_played", "homepage_restructure_homepage_video_played_binary" ]), VideoControls.videoBingoSent = !0));
},
save: function() {
if (this.fSaving) return;
if (!areCookiesEnabled()) {
KAConsole.log("Cookies appear to be disabled. Not logging video progress.");
return;
}
this.fSaving = !0;
var a = this.getPercentWatched(), b = this.dtLastSaved, c = 0, d = {
last_second_watched: this.getSecondsWatched(),
seconds_watched: this.getSecondsWatchedSinceSave()
};
this.sVideoKey !== null ? d.video_key = this.sVideoKey : this.sYoutubeId !== null && (c = this.sYoutubeId), $.ajax({
type: "GET",
url: "/api/v1/user/videos/" + c + "/log_compatability",
data: d,
success: function(b) {
VideoStats.finishSave(b, a);
},
error: function() {
VideoStats.fSaving = !1, VideoStats.dtLastSaved = b;
}
}), this.dtLastSaved = new Date;
},
tooltip: function(a, b) {
$(a).qtip({
content: {
text: b
},
style: {
classes: "ui-tooltip-youtube"
},
position: {
my: "top center",
at: "bottom center"
},
hide: {
fixed: !0,
delay: 150
}
});
},
finishSave: function(a, b) {
VideoStats.fSaving = !1, VideoStats.dPercentLastSaved = b;
if (a && a.action_results.user_video) {
video = a.action_results.user_video;
var c = $(".video-energy-points");
c.length && (c.data("title", c.data("title").replace(/^\d+/, video.points)), $(".video-energy-points-current", c).text(video.points), VideoStats.tooltip("#points-badge-hover", c.data("title")));
}
},
prepareAlternativePlayer: function() {
this.player = $("#flvPlayer").get(0);
if (!this.player) return;
this.player.getDuration = function() {
return VideoStats.cachedDuration;
}, this.player.getCurrentTime = function() {
return VideoStats.cachedCurrentTime;
}, this.fAlternativePlayer = !0;
},
cacheStats: function(a, b) {
var c = parseFloat(a);
c && (this.cachedCurrentTime = c), this.cachedDuration = parseFloat(b);
}
}, Badges = {
show: function(a) {
var b = $(".badge-award-container");
a && (b.remove(), $("body").append(a), b = $(".badge-award-container"), b.length && Social.init(b));
if (!b.length) return;
$(".achievement-badge", b).click(function() {
return window.location = KA.profileRoot + "/achievements", !1;
});
var c = $(".badge-target"), d = $("#page-container-inner"), e = c.offset().top + c.height() + 5;
setTimeout(function() {
b.css("visibility", "hidden").css("display", ""), b.css("left", d.offset().left + d.width() / 2 - b.width() / 2).css("top", -1 * b.height());
var a = e + 10;
b.css("display", "").css("visibility", "visible"), b.animate({
top: a
}, 300, function() {
b.animate({
top: e
}, 100);
});
}, 100);
},
hide: function() {
var a = $(".badge-award-container");
a.animate({
top: -1 * a.height()
}, 500, function() {
a.hide();
});
},
showMoreContext: function(a) {
var b = $(a).parents(".badge-context-hidden-link"), c = b.parents(".achievement-badge"), d = $(".badge-context-hidden", c);
b.length && c.length && d.length && ($(".ellipsis", b).remove(), b.html(b.text()), d.css("display", ""), c.css("min-height", c.css("height")).css("height", "auto"), c.nextAll(".achievement-badge").first().css("clear", "both"));
}
}, Notifications = {
show: function(a) {
var b = $(".notification-bar");
if (a) {
var c = $(a);
b.empty().append(c.children());
}
$(".notification-bar-close a").click(function() {
return Notifications.hide(), !1;
}), b.is(":visible") || setTimeout(function() {
b.css("visibility", "hidden").css("display", "").css("top", -b.height() - 2).css("visibility", "visible");
var a = {
duration: 350,
queue: !1
};
$(".notification-bar-spacer").animate({
height: 35
}, a), b.show().animate({
top: 0
}, a);
}, 100);
},
showTemplate: function(a) {
var b = Templates.get(a);
this.show(b());
},
hide: function() {
var a = $(".notification-bar"), b = {
duration: 350,
queue: !1
};
$(".notification-bar-spacer").animate({
height: 0
}, b), a.animate({
top: -a.height() - 2
}, $.extend({}, b, {
complete: function() {
a.empty().css("display", "none");
}
})), $.post("/notifierclose");
}
}, Timezone = {
tz_offset: null,
append_tz_offset_query_param: function(a) {
return a.indexOf("?") > -1 ? a += "&" : a += "?", a + "tz_offset=" + Timezone.get_tz_offset();
},
get_tz_offset: function() {
return this.tz_offset == null && (this.tz_offset = -1 * (new Date).getTimezoneOffset()), this.tz_offset;
}
};

Date.prototype.toISOString || (Date.prototype.toISOString = function() {
var a = function(a) {
return a < 10 ? "0" + a : a;
};
return this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z";
});

var parseISO8601 = function(a) {
var b = a.split("T"), c = b[0].split("-"), d = b[1].split("Z"), e = d[0].split(":"), f = e[2].split("."), g = Number(e[0]), h = new Date;
return h.setUTCFullYear(Number(c[0])), h.setUTCMonth(Number(c[1]) - 1), h.setUTCDate(Number(c[2])), h.setUTCHours(Number(g)), h.setUTCMinutes(Number(e[1])), h.setUTCSeconds(Number(f[0])), f[1] && h.setUTCMilliseconds(Number(f[1])), h;
}, MailingList = {
init: function(a) {
var b = $("#mailing_list_container_" + a), c = $("form", b), d = $(".email", c);
d.placeholder().change(function() {
$(".error", b).css("display", !$(this).val() || validateEmail($(this).val()) ? "none" : "");
}).keypress(function() {
$(".error", b).is(":visible") && validateEmail($(this).val()) && $(".error", b).css("display", "none");
}), c.submit(function(c) {
return validateEmail(d.val()) && ($.post("/mailing-lists/subscribe", {
list_id: a,
email: d.val()
}), b.html("<p>Done!</p>")), c.preventDefault(), !1;
});
}
}, CSSMenus = {
active_menu: null,
init: function() {
$(".noscript").removeClass("noscript"), $(document).delegate(".css-menu > ul > li", "click", function() {
CSSMenus.active_menu && CSSMenus.active_menu.removeClass("css-menu-js-hover"), CSSMenus.active_menu && this == CSSMenus.active_menu[0] ? CSSMenus.active_menu = null : CSSMenus.active_menu = $(this).addClass("css-menu-js-hover");
}), $(document).bind("click focusin", function(a) {
CSSMenus.active_menu && $(a.target).closest(".css-menu").length === 0 && (CSSMenus.active_menu.removeClass("css-menu-js-hover"), CSSMenus.active_menu = null);
}), $(document).delegate(".css-menu a", {
focus: function(a) {
$(a.target).addClass("css-menu-js-hover").closest(".css-menu > ul > li").addClass("css-menu-js-hover");
},
blur: function(a) {
$(a.target).removeClass("css-menu-js-hover").closest(".css-menu > ul > li").removeClass("css-menu-js-hover");
}
});
}
};

$(CSSMenus.init);

var IEHtml5 = {
init: function() {
var a = [ "header", "footer", "nav", "article", "section", "menu" ];
for (var b = 0; b < a.length; b++) document.createElement(a[b]);
}
};

IEHtml5.init();

var VideoViews = {
init: function() {
var a = 2.4637851937509475e-13 * Math.exp(3.584901929640884e-11 * +(new Date)), b = addCommas("" + Math.round(a));
//$("#page_num_visitors").append(b), $("#page_visitors").css("display", "inline");
}
};

$(VideoViews.init);

var FacebookHook = {
init: function() {
if (!window.FB_APP_ID) return;
window.fbAsyncInit = function() {
FB.init({
appId: FB_APP_ID,
status: !0,
cookie: !0,
xfbml: !0,
oauth: !0
}), USERNAME || FB.Event.subscribe("auth.login", function(a) {
a.authResponse && FacebookHook.fixMissingCookie(a.authResponse);
var b = URL_CONTINUE || "/";
b.indexOf("?") > -1 ? b += "&fb=1" : b += "?fb=1";
var c = !!readCookie("fbsr_" + FB_APP_ID);
b += "&hc=" + (c ? "1" : "0"), b += "&hs=" + (a.authResponse ? "1" : "0"), window.location = b;
}), FB.getLoginStatus(function(a) {
a.authResponse && FacebookHook.fixMissingCookie(a.authResponse), $("#page_logout").click(function(b) {
eraseCookie("fbsr_" + FB_APP_ID);
if (a.authResponse) return FB.logout(function() {
window.location = $("#page_logout").attr("href");
}), b.preventDefault(), !1;
});
});
}, $(function() {
var a = document.createElement("script");
a.async = !0, a.src = document.location.protocol + "//connect.facebook.net/en_US/all.js", document.getElementById("fb-root").appendChild(a);
});
},
fixMissingCookie: function(a) {
if (readCookie("fbsr_" + FB_APP_ID)) return;
a && a.signedRequest && createCookie("fbsr_" + FB_APP_ID, a.signedRequest);
}
};

FacebookHook.init();

var Throbber = {
jElement: null,
show: function(a, b) {
Throbber.jElement || (Throbber.jElement = $("<img style='display:none;' src='/images/throbber.gif' class='throbber'/>"), $(document.body).append(Throbber.jElement));
if (!a.length) return;
var c = a.offset(), d = c.top + a.height() / 2 - 8, e = b ? c.left - 16 - 4 : c.left + a.width() + 4;
Throbber.jElement.css("top", d).css("left", e).css("display", "");
},
hide: function() {
Throbber.jElement && Throbber.jElement.css("display", "none");
}
}, SearchResultHighlight = {
doReplace: function(a, b) {
textElements = $(b).contents().filter(function() {
return this.nodeType != 1;
}), textElements.each(function(b, c) {
var d = c.data.toLowerCase().indexOf(a);
if (d >= 0) {
var e = c.splitText(d);
e.splitText(a.length), $(e).wrap('<span class="highlighted" />');
}
});
},
highlight: function(a) {
$(".searchresulthighlight").each(function(b, c) {
SearchResultHighlight.doReplace(a, c);
});
}
}, globalPopupDialog = {
visible: !1,
bindings: !1,
show: function(a, b, c, d, e) {
var f = b ? {
position: "relative",
width: b[0],
height: b[1],
marginLeft: (-0.5 * b[0]).toFixed(0),
marginTop: (-0.5 * b[1] - 100).toFixed(0)
} : {};
return $("#popup-dialog").hide().find(".dialog-frame").attr("class", "dialog-frame " + a).attr("style", "").css(f).find(".description").html("<h3>" + c + "</h3>").end().end().find(".dialog-contents").html(d).end().find(".close-button").click(function() {
globalPopupDialog.hide();
}).end().show(), e && !globalPopupDialog.bindings ? ($(document).bind("keyup.popupdialog", function(a) {
a.which == 27 && globalPopupDialog.hide();
}), $("body").bind("click.popupdialog", function(a) {
$(a.target).closest(".dialog-frame").length === 0 && globalPopupDialog.hide();
}), globalPopupDialog.bindings = !0) : !e && globalPopupDialog.bindings && ($(document).unbind("keyup.popupdialog"), $("body").unbind("click.popupdialog"), globalPopupDialog.bindings = !1), globalPopupDialog.visible = !0, globalPopupDialog;
},
hide: function() {
return globalPopupDialog.visible && ($("#popup-dialog").hide().find(".dialog-contents").html(""), globalPopupDialog.bindings && ($(document).unbind("keyup.popupdialog"), $("body").unbind("click.popupdialog"), globalPopupDialog.bindings = !1), globalPopupDialog.visible = !1), globalPopupDialog;
}
};

(function() {
var a = null;
popupGenericMessageBox = function(b) {
a && $(a).modal("hide").remove(), b = _.extend({
buttons: [ {
title: "OK",
action: hideGenericMessageBox
} ]
}, b);
var c = Templates.get("shared.generic-dialog");
a = $(c(b)).appendTo(document.body).modal({
keyboard: !0,
backdrop: !0,
show: !0
}).get(0), _.each(b.buttons, function(b) {
$('.generic-button[data-id="' + b.title + '"]', $(a)).click(b.action);
});
}, hideGenericMessageBox = function() {
a && $(a).modal("hide").remove(), a = null;
};
})();

var dynamicPackageLoader = {
loadedPackages: {},
loadingPackages: {},
currentFiles: [],
load: function(a, b, c) {
this.loadedPackages[a] ? b && b(a) : new dynamicPackage(a, b, c);
},
packageLoaded: function(a) {
return this.loadedPackages[a];
},
setPackageLoaded: function(a) {
this.loadedPackages[a] = !0;
}
};

$(function() {
$(document).delegate("input.blur-on-esc", "keyup", function(a, b) {
if (b && b.silent) return;
a.which == "27" && $(a.target).blur();
});
}), $.fx.step.reviewExplode = function(a) {
var b = a.now + a.unit;
$(a.elem).css("boxShadow", "0 0 " + b + " " + b + " " + "rgba(227, 93, 4, 0.2)");
};

var Review = {
REVIEW_DONE_HTML: "Review&nbsp;Done!",
highlightDone: function() {
if ($("#review-mode-title").hasClass("review-done")) return;
var a = 800, b = $("#container").css("overflow");
$("#container").css("overflow", "visible").delay(a).queue(function() {
$(this).css("overflow", b);
}), $("#review-mode-title").stop().addClass("review-done").animate({
reviewExplode: 200
}, a).queue(function() {
$(this).removeAttr("style").addClass("post-animation");
}), $("#review-mode-title > div").css("backgroundColor", "#F9DFCD").delay(a).queue(function() {
$(this).removeAttr("style").addClass("review-done");
}), $("#review-mode-title h1").html(Review.REVIEW_DONE_HTML).css({
fontSize: "100px",
right: 0,
position: "absolute"
}).stop().animate({
reviewGlow: 1,
opacity: 1,
fontSize: 30
}, a).queue(function() {
$(this).removeAttr("style");
});
},
initCounter: function(a) {
var b = "0 1 2 3 4 5 6 7 8 9 ";
$("#review-counter-container").find(".ones").text((new Array(11)).join(b)).end().find(".tens").text(b);
},
updateCounter: function(a) {
var b = $("#review-counter-container"), c = $("#review-mode-title"), d = b.data("counter") || 0, e = Math.floor(a % 100 / 10), f = {
duration: Math.log(1 + Math.abs(a - d)) * 1e3 * .5 + .2,
easing: "easeInOutCubic"
}, g = parseInt(b.children().css("lineHeight"), 10);
b.find(".ones").animate({
top: a % 100 * -g
}, f), b.find(".tens").animate({
top: e * -g
}, f), a === 0 ? d > 0 ? Review.highlightDone() : c.addClass("review-done post-animation").find("h1").html(Review.REVIEW_DONE_HTML) : c.hasClass("review-done") || $("#review-mode-title h1").text(a === 1 ? "Exercise Left!" : "Exercises Left"), b.data("counter", a);
}
}, APIActionResults = {
init: function() {
this.hooks = [], $(document).ajaxComplete(function(e, xhr, settings) {
xhr && xhr.getResponseHeader("X-KA-API-Version-Mismatch") && apiVersionMismatch();
if (xhr && xhr.getResponseHeader("X-KA-API-Response") && xhr.responseText) {
try {
eval("var result = " + xhr.responseText);
} catch (e) {
return;
}
if (result) {
var action = result.action_results || result.actionResults;
action && $(APIActionResults.hooks).each(function(a, b) {
typeof action[b.prop] != "undefined" && b.fxn(action[b.prop]);
});
}
}
}), jQuery.ajaxSetup({
beforeSend: function(a, b) {
if (b && b.url && b.url.indexOf("/api/") > -1) {
var c = readCookie("fkey");
if (c) a.setRequestHeader("X-KA-FKey", c); else return apiVersionMismatch(), b.error && b.error(), !1;
}
}
});
},
register: function(a, b) {
this.hooks[this.hooks.length] = {
prop: a,
fxn: b
};
}
};

APIActionResults.init(), $(function() {
APIActionResults.register("badges_earned_html", Badges.show);
}), $(function() {
APIActionResults.register("login_notifications_html", Notifications.show);
}), $(function() {
APIActionResults.register("user_info_html", function(a) {
$("#user-info").html(a);
});
}), $(function() {
var a = function(a) {
if (jQuery(".single-exercise").length > 0 && a.points > 0) {
var b = jQuery("<div>+" + a.points + "</div>").addClass("energy-points-badge");
jQuery(".streak-bar").append(b), jQuery(b).fadeIn(195).delay(650).animate({
top: "-30",
opacity: 0
}, 350, "easeInOutCubic", function() {
jQuery(b).hide(0).remove();
});
}
};
APIActionResults.register("points_earned", a);
}), $(function() {
APIActionResults.register("reviews_left", Review.updateCounter);
}), window.IncrementalCollection = Backbone.Collection.extend({
fetchByID: function(a, b, c) {
var d = this.get(a);
if (!d) {
this.idAttribute || (this.idAttribute = this.model.prototype.idAttribute, this.idAttribute || (this.idAttribute = "id"));
var e = {};
e[this.idAttribute] = a, d = this._add(e);
}
return d.__inited ? (KAConsole.log("IC (" + a + "): Already loaded."), b && b.apply(null, [ d ].concat(c))) : (d.__callbacks || (d.__callbacks = []), b && d.__callbacks.push({
callback: b,
args: c
}), d.__requesting ? KAConsole.log("IC (" + a + "): Already requested.") : (KAConsole.log("IC (" + a + "): Sending request..."), d.fetch({
success: function() {
KAConsole.log("IC (" + a + "): Request succeeded."), d.__inited = !0, d.__requesting = !1, _.each(d.__callbacks, function(a) {
a.callback.apply(null, [ d ].concat(a.args));
}), d.__callbacks = [];
},
error: function() {
KAConsole.log("IC (" + a + "): Request failed!"), d.__requesting = !1;
}
}), d.__requesting = !0)), d;
},
resetInited: function(a, b) {
this.reset(a, b), _.each(this.models, function(a) {
a.__inited = !0;
});
},
addInited: function(a, b) {
this.idAttribute || (this.idAttribute = (new this.model({})).idAttribute, this.idAttribute || (this.idAttribute = "id"));
var c = this;
this.add(a, b), _.each(a, function(a) {
var b = c.get(a[c.idAttribute]);
b.__inited = !0;
});
}
});

var Social = {
init: function(a) {
$(".twitterShare", a).click(function(a) {
var b = 550, c = 370, d = ($(window).width() - b) / 2, e = ($(window).height() - c) / 2, f = this.href, g = "status=1,width=" + b + ",height=" + c + ",top=" + e + ",left=" + d;
return window.open(f, "twitter", g), !1;
}), $(".sharepop", a).hide(), $(".notif-share", a).click(function() {
return $(this).next(".sharepop").toggle("drop", {
direction: "up"
}, "fast"), !1;
});
},
facebookBadge: function(a, b, c, d) {
return FB.ui({
method: "feed",
name: "I just earned the " + a + " badge" + (d ? " in " + d : "") + " at Khan Academy!",
link: "http://www.khanacademy.org",
picture: b.substring(0, 7) === "http://" ? b : "http://www.khanacademy.org/" + b,
caption: "www.khanacademy.org",
description: "You can earn this too if you " + c
}), !1;
},
facebookVideo: function(a, b, c) {
return FB.ui({
method: "feed",
name: a,
link: "http://www.khanacademy.org/" + c,
picture: "http://www.khanacademy.org/images/handtreehorizontal_facebook.png",
caption: "www.khanacademy.org",
description: b,
message: "I just learned about " + a + " on Khan Academy"
}), !1;
},
facebookExercise: function(a, b, c, d) {
return FB.ui({
method: "feed",
name: a + " question" + b + " answered!",
link: "http://www.khanacademy.org/exercisedashboard",
picture: "http://www.khanacademy.org/images/proficient-badge-complete.png",
caption: "www.khanacademy.org",
description: "I just answered " + a + " question" + b + " " + c + " " + d + " on www.khanacademy.org",
message: "I've been practicing " + d + " on http://www.khanacademy.org"
}), !1;
}
};

$(function() {
Social.init();
});

var Promos = {};

Promos.cache_ = {}, Promos.hasUserSeen = function(a, b, c) {
if (a in Promos.cache_) {
b.call(c, Promos.cache_[a]);
return;
}
$.ajax({
type: "GET",
url: "/api/v1/user/promo/" + encodeURIComponent(a),
success: function(d) {
Promos.cache_[a] = d, b.call(c, d);
},
error: function() {
b.call(c, !0);
}
});
}, Promos.markAsSeen = function(a) {
$.ajax({
type: "POST",
url: "/api/v1/user/promo/" + encodeURIComponent(a)
}), Promos.cache_[a] = !0;
}, function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["shared-package_youtube-player"] = a(function(a, b, c, d, e) {
c = c || a.helpers;
var f = "", g, h, i, j = this, k = "function", l = c.helperMissing, m = void 0, n = this.escapeExpression;
return f += '\n<object id="idOVideo" name="idOVideo" ', g = {}, h = c.width || b.width, g.width = h, h = c.height || b.height, g.height = h, h = c.opttr || b.opttr, i = {}, i.hash = g, typeof h === k ? g = h.call(b, i) : h === m ? g = l.call(b, "opttr", i) : g = h, f += n(g) + ' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">\n    <param name="movie" value="http://www.youtube.com/v/', g = c.youtubeId || b.youtubeId, typeof g === k ? g = g.call(b, {
hash: {}
}) : g === m && (g = l.call(b, "youtubeId", {
hash: {}
})), f += n(g) + '?version=3&hl=en_US&fs=1&rel=0&enablejsapi=1">\n    <param name="allowFullScreen" value="true">\n    <param name="allowScriptAccess" value="always">\n    <param name="wmode" value="transparent">\n    <embed id="idPlayer" name="idPlayer" wmode="transparent" src="http://www.youtube.com/v/', g = c.youtubeId || b.youtubeId, typeof g === k ? g = g.call(b, {
hash: {}
}) : g === m && (g = l.call(b, "youtubeId", {
hash: {}
})), f += n(g) + '?version=3&hl=en_US&fs=1&rel=0&enablejsapi=1" type="application/x-shockwave-flash" allowScriptAccess="always" allowfullscreen="true" ', g = {}, h = c.width || b.width, g.width = h, h = c.height || b.height, g.height = h, h = c.opttr || b.opttr, i = {}, i.hash = g, typeof h === k ? g = h.call(b, i) : h === m ? g = l.call(b, "opttr", i) : g = h, f += n(g) + ">\n</object>\n", f;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["shared-package_api-version-mismatch"] = a(function(a, b, c, d, e) {
c = c || a.helpers;
var f = this;
return '<div class="notification-bar" style="display:none;">\n{% if login_notification %}\n\t<span class="notification-bar-content">The version of this page that you are viewing is out of date, and some features may stop working. Please <a href="javascript: location.reload(true)">refresh the page</a>.</span>\n\t<span class="notification-bar-close">(<a href="javascript:">close</a>)</span>\n{% endif %}\n</div>\n<div class="notification-bar-spacer"></div>\n';
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["shared-package_streak-bar"] = a(function(a, b, c, d, e) {
function f(a, b) {
return "proficient";
}
function g(a, b) {
return "suggested";
}
function h(a, b) {
var d = "", e;
return d += '\n          <li class="level-label" style="left: ', e = c.left || a.left, typeof e === n ? e = e.call(a, {
hash: {}
}) : e === p && (e = o.call(a, "left", {
hash: {}
})), d += q(e) + 'px"></li>\n        ', d;
}
c = c || a.helpers;
var i = "", j, k, l, m = this, n = "function", o = c.helperMissing, p = void 0, q = this.escapeExpression;
i += '<div id="streak-bar-container" class="new">\n  <div class="streak-bar ', j = c.proficient || b.proficient, k = c["if"], l = m.program(1, f, e), l.hash = {}, l.fn = l, l.inverse = m.noop, j = k.call(b, j, l);
if (j || j === 0) i += j;
i += " ", j = c.suggested || b.suggested, k = c["if"], l = m.program(3, g, e), l.hash = {}, l.fn = l, l.inverse = m.noop, j = k.call(b, j, l);
if (j || j === 0) i += j;
i += '" title="Current progress: ', j = c.progressDisplay || b.progressDisplay, typeof j === n ? j = j.call(b, {
hash: {}
}) : j === p && (j = o.call(b, "progressDisplay", {
hash: {}
})), i += q(j) + '">\n    <div class="current-streak">\n      <ul class="unit-rating" style="width: ', j = c.maxWidth || b.maxWidth, typeof j === n ? j = j.call(b, {
hash: {}
}) : j === p && (j = o.call(b, "maxWidth", {
hash: {}
})), i += q(j) + 'px">\n        <li class="current-rating" style="width: ', j = c.width || b.width, typeof j === n ? j = j.call(b, {
hash: {}
}) : j === p && (j = o.call(b, "width", {
hash: {}
})), i += q(j) + 'px"></li>\n        <li class="streak-icon"></li>\n        ', j = c.milestones || b.milestones, k = c.each, l = m.program(5, h, e), l.hash = {}, l.fn = l, l.inverse = m.noop, j = k.call(b, j, l);
if (j || j === 0) i += j;
return i += '\n        <li class="current-label" style="width: ', j = c.width || b.width, typeof j === n ? j = j.call(b, {
hash: {}
}) : j === p && (j = o.call(b, "width", {
hash: {}
})), i += q(j) + 'px"></li>\n      </ul>\n    </div>\n  </div>\n</div>\n', i;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["shared-package_generic-dialog"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e;
return d += '\n          <a class="generic-button simple-button blue action-gradient" href="javascript:void(0)" data-id="', e = c.title || a.title, typeof e === l ? e = e.call(a, {
hash: {}
}) : e === n && (e = m.call(a, "title", {
hash: {}
})), d += o(e) + '">', e = c.title || a.title, typeof e === l ? e = e.call(a, {
hash: {}
}) : e === n && (e = m.call(a, "title", {
hash: {}
})), d += o(e) + "</a>\n        ", d;
}
c = c || a.helpers;
var g = "", h, i, j, k = this, l = "function", m = c.helperMissing, n = void 0, o = this.escapeExpression;
g += '<div class="generic-dialog modal fade hide">\n    <div class="modal-header">\n        <span class="title">', h = c.title || b.title, typeof h === l ? h = h.call(b, {
hash: {}
}) : h === n && (h = m.call(b, "title", {
hash: {}
})), g += o(h) + '</span> <a href="javascript:void(0)" class="close-button close">x</a>\n    </div>\n    <div class="modal-body">\n        <p class="generic-message">', h = c.message || b.message, typeof h === l ? h = h.call(b, {
hash: {}
}) : h === n && (h = m.call(b, "message", {
hash: {}
})), g += o(h) + "</p>\n\n        ", h = c.buttons || b.buttons, i = c.each, j = k.program(1, f, e), j.hash = {}, j.fn = j, j.inverse = k.noop, h = i.call(b, h, j);
if (h || h === 0) g += h;
return g += "\n\n    </div>\n</div>\n", g;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["shared-package_knowledgemap-exercise"] = a(function(a, b, c, d, e) {
function f(a, b) {
return "disabled";
}
function g(a, b) {
var e;
return e = a, e = l.invokePartial(d["streak-bar"], "streak-bar", e, c, d), e || e === 0 ? e : "";
}
c = c || a.helpers, d = d || a.partials;
var h = "", i, j, k, l = this, m = "function", n = c.helperMissing, o = void 0, p = this.escapeExpression;
h += '<div class="exercise-badge" data-id="', i = c.name || b.name, typeof i === m ? i = i.call(b, {
hash: {}
}) : i === o && (i = n.call(b, "name", {
hash: {}
})), h += p(i) + '">\n  <a class="proficient-badge ', i = c.disabled || b.disabled, j = c["if"], k = l.program(1, f, e), k.hash = {}, k.fn = k, k.inverse = l.noop, i = j.call(b, i, k);
if (i || i === 0) h += i;
h += '" href="', i = c.url || b.url, typeof i === m ? i = i.call(b, {
hash: {}
}) : i === o && (i = n.call(b, "url", {
hash: {}
})), h += p(i) + '">\n    <img src="', i = c.badgeIcon || b.badgeIcon, typeof i === m ? i = i.call(b, {
hash: {}
}) : i === o && (i = n.call(b, "badgeIcon", {
hash: {}
})), h += p(i) + '" height="80" width="76">\n    <div class="exercise-goal-wrapper"><img class="exercise-goal-icon" style="display: none" src="/static/images/flag.png"></div>\n  </a>\n  <div class="energy-points-badge">', i = c.points || b.points, typeof i === m ? i = i.call(b, {
hash: {}
}) : i === o && (i = n.call(b, "points", {
hash: {}
})), h += p(i) + '</div>\n  <div class="exercise-title"><a href="', i = c.url || b.url, typeof i === m ? i = i.call(b, {
hash: {}
}) : i === o && (i = n.call(b, "url", {
hash: {}
})), h += p(i) + '">', i = c.display_name || b.display_name, typeof i === m ? i = i.call(b, {
hash: {}
}) : i === o && (i = n.call(b, "display_name", {
hash: {}
})), h += p(i) + '</a></div>\n  <span class="exercise-show simple-button action-gradient" data-id="name" style="display:none;"><img src="/static/images/map-target.png" title="Show in map" alt="Show in map"></span>\n  ', i = c.streakBar || b.streakBar, j = c["with"], k = l.program(3, g, e), k.hash = {}, k.fn = k, k.inverse = l.noop, i = j.call(b, i, k);
if (i || i === 0) h += i;
return h += "\n</div>\n", h;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["shared-package_knowledgemap-admin-exercise"] = a(function(a, b, c, d, e) {
function f(a, b) {
return "#069";
}
function g(a, b) {
return "red";
}
function h(a, b) {
return "text-decoration: line-through";
}
c = c || a.helpers;
var i = "", j, k, l, m = this, n = "function", o = c.helperMissing, p = void 0, q = this.escapeExpression;
i += '<div class="exercise-edit" data-id="', j = c.name || b.name, typeof j === n ? j = j.call(b, {
hash: {}
}) : j === p && (j = o.call(b, "name", {
hash: {}
})), i += q(j) + '">\n  <a href="', j = c.url || b.url, typeof j === n ? j = j.call(b, {
hash: {}
}) : j === p && (j = o.call(b, "url", {
hash: {}
})), i += q(j) + '" style="color: ', j = c.live || b.live, k = c["if"], l = m.program(1, f, e), l.hash = {}, l.fn = l, l.inverse = m.program(3, g, e), j = k.call(b, j, l);
if (j || j === 0) i += j;
i += "; ", j = c.live || b.live, k = c["if"], l = m.program(5, h, e), l.hash = {}, l.fn = l, l.inverse = m.noop, j = k.call(b, j, l);
if (j || j === 0) i += j;
return i += '; display: block">', j = c.display_name || b.display_name, typeof j === n ? j = j.call(b, {
hash: {}
}) : j === p && (j = o.call(b, "display_name", {
hash: {}
})), i += q(j) + "</a></div>\n</div>\n\n", i;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["shared-package_goal-summary-area"] = a(function(a, b, c, d, e) {
c = c || a.helpers;
var f = "", g, h = this, i = "function", j = c.helperMissing, k = void 0, l = this.escapeExpression;
return f += '<a id="goals-drawer" href="javascript:void(0)">', g = c.title || b.title, typeof g === i ? g = g.call(b, {
hash: {}
}) : g === k && (g = j.call(b, "title", {
hash: {}
})), f += l(g) + " &middot; ", g = c.objectiveProgress || b.objectiveProgress, typeof g === i ? g = g.call(b, {
hash: {}
}) : g === k && (g = j.call(b, "objectiveProgress", {
hash: {}
})), f += l(g) + "/", g = c.objectives || b.objectives, g = g.length, typeof g === i ? g = g.call(b, {
hash: {}
}) : g === k && (g = j.call(b, "objectives.length", {
hash: {}
})), f += l(g) + " &middot; ", g = c.progressStr || b.progressStr, typeof g === i ? g = g.call(b, {
hash: {}
}) : g === k && (g = j.call(b, "progressStr", {
hash: {}
})), f += l(g) + '%</a>\n<span class="separator"></span>\n', f;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["shared-package_goalbook-row"] = a(function(a, b, c, d, e) {
function f(a, b) {
return "active";
}
function g(a, b) {
return "recently-completed";
}
function h(a, b) {
return "Complete!";
}
function i(a, b) {
var d = "", e;
return d += '\n            <span class="objectives-complete">', e = c.objectiveProgress || a.objectiveProgress, typeof e === p ? e = e.call(a, {
hash: {}
}) : e === r && (e = q.call(a, "objectiveProgress", {
hash: {}
})), d += s(e) + "/", e = c.objectives || a.objectives, e = e.length, typeof e === p ? e = e.call(a, {
hash: {}
}) : e === r && (e = q.call(a, "objectives.length", {
hash: {}
})), d += s(e) + '</span>\n            &middot;\n            <span class="percent-complete">', e = c.progressStr || a.progressStr, typeof e === p ? e = e.call(a, {
hash: {}
}) : e === r && (e = q.call(a, "progressStr", {
hash: {}
})), d += s(e) + "%</span>\n            ", d;
}
function j(a, b) {
var e = "", f;
e += "\n        ", f = a, f = o.invokePartial(d["goal-objectives"], "goal-objectives", f, c, d);
if (f || f === 0) e += f;
return e += "\n    ", e;
}
c = c || a.helpers, d = d || a.partials;
var k = "", l, m, n, o = this, p = "function", q = c.helperMissing, r = void 0, s = this.escapeExpression, t = c.blockHelperMissing;
k += '\n<div class="goal pulls ', l = c.active || b.active, n = o.program(1, f, e), n.hash = {}, n.fn = n, n.inverse = o.noop, typeof l === p ? l = l.call(b, n) : l = t.call(b, l, n);
if (l || l === 0) k += l;
k += " ", l = c.complete || b.complete, n = o.program(3, g, e), n.hash = {}, n.fn = n, n.inverse = o.noop, typeof l === p ? l = l.call(b, n) : l = t.call(b, l, n);
if (l || l === 0) k += l;
k += '" data-id="', l = c.id || b.id, typeof l === p ? l = l.call(b, {
hash: {}
}) : l === r && (l = q.call(b, "id", {
hash: {}
})), k += s(l) + '">\n    <p class="goal-description">\n        <span class="goal-title">', l = c.title || b.title, typeof l === p ? l = l.call(b, {
hash: {}
}) : l === r && (l = q.call(b, "title", {
hash: {}
})), k += s(l) + '</span>\n        <span class="summary-light">\n            ', l = c.complete || b.complete, m = c["if"], n = o.program(5, h, e), n.hash = {}, n.fn = n, n.inverse = o.program(7, i, e), l = m.call(b, l, n);
if (l || l === 0) k += l;
k += '\n        </span>\n        <span class="goal-controls">\n            <a class="simple-button action-gradient archive" href="javascript:void(0)">Archive Completed Goal</a>\n        </span>\n    </p>\n    <ul class="inline-list objective-list">\n    ', l = c.objectives || b.objectives, m = c.each, n = o.program(9, j, e), n.hash = {}, n.fn = n, n.inverse = o.noop, l = m.call(b, l, n);
if (l || l === 0) k += l;
return k += '\n    </ul>\n    <div class="clear"></div>\n</div>\n', k;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["shared-package_goalbook"] = a(function(a, b, c, d, e) {
function f(a, b) {
var e = "", f;
e += "\n    ", f = a, f = j.invokePartial(d["goalbook-row"], "goalbook-row", f, c, d);
if (f || f === 0) e += f;
return e += "\n    ", e;
}
c = c || a.helpers, d = d || a.partials;
var g = "", h, i, j = this, k = "function", l = c.blockHelperMissing, m = c.helperMissing, n = void 0, o = this.escapeExpression;
g += '<div class="goals-area goals-personal fancy-scrollbar">\n    ', h = c.goals || b.goals, i = j.program(1, f, e), i.hash = {}, i.fn = i, i.inverse = j.noop, typeof h === k ? h = h.call(b, i) : h = l.call(b, h, i);
if (h || h === 0) g += h;
return g += '\n</div>\n<div id="goalbook-controls">\n    <a class="new-goal simple-button action-gradient green" href="javascript:void(0)">New goal</a>\n    <a class="goal-history simple-button action-gradient seethrough" href="', h = c.profileRoot || b.profileRoot, typeof h === k ? h = h.call(b, {
hash: {}
}) : h === n && (h = m.call(b, "profileRoot", {
hash: {}
})), g += o(h) + '/goals">Goal History</a>\n    <a class="close-button">x</a>\n</div>\n', g;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["shared-package_goal-objectives"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e;
return d += '\n            <span class="objective-progress-meter" style="height: ', e = c.iconFillHeight || a.iconFillHeight, typeof e === w ? e = e.call(a, {
hash: {}
}) : e === y && (e = x.call(a, "iconFillHeight", {
hash: {}
})), d += z(e) + 'px"></span>\n            ', d;
}
function g(a, b) {
var d = "", e;
return d += "Watch video <b>", e = c.description || a.description, typeof e === w ? e = e.call(a, {
hash: {}
}) : e === y && (e = x.call(a, "description", {
hash: {}
})), d += z(e) + "</b>", d;
}
function h(a, b) {
return "Watch any video";
}
function i(a, b) {
var d = "", e;
return d += "Complete exercise <b>", e = c.description || a.description, typeof e === w ? e = e.call(a, {
hash: {}
}) : e === y && (e = x.call(a, "description", {
hash: {}
})), d += z(e) + "</b>", d;
}
function j(a, b) {
return "Complete any exercise";
}
function k(a, b) {
var d = "", e, f;
d += "\n              Complete\n              ", e = c.isAnyVideo || a.isAnyVideo, f = c["if"], u = v.program(12, l, b), u.hash = {}, u.fn = u, u.inverse = v.noop, e = f.call(a, e, u);
if (e || e === 0) d += e;
d += "\n              ", e = c.isAnyExercise || a.isAnyExercise, f = c["if"], u = v.program(14, m, b), u.hash = {}, u.fn = u, u.inverse = v.noop, e = f.call(a, e, u);
if (e || e === 0) d += e;
return d += "\n            ", d;
}
function l(a, b) {
var d = "", e;
return d += " (<b>", e = c.description || a.description, typeof e === w ? e = e.call(a, {
hash: {}
}) : e === y && (e = x.call(a, "description", {
hash: {}
})), d += z(e) + "</b>)", d;
}
function m(a, b) {
var d = "", e;
return d += " (<b>", e = c.description || a.description, typeof e === w ? e = e.call(a, {
hash: {}
}) : e === y && (e = x.call(a, "description", {
hash: {}
})), d += z(e) + "</b>)", d;
}
function n(a, b) {
var d = "", e, f;
d += "\n              ", e = c.progress || a.progress, f = c["if"], u = v.program(17, o, b), u.hash = {}, u.fn = u, u.inverse = v.program(19, p, b), e = f.call(a, e, u);
if (e || e === 0) d += e;
return d += "\n            ", d;
}
function o(a, b) {
var d = "", e;
return d += " In progress (", e = c.progressStr || a.progressStr, typeof e === w ? e = e.call(a, {
hash: {}
}) : e === y && (e = x.call(a, "progressStr", {
hash: {}
})), d += z(e) + "%) ", d;
}
function p(a, b) {
return " Not started ";
}
function q(a, b) {
return ' <span class="goal-tooltip-struggling">(Struggling)<span> ';
}
c = c || a.helpers;
var r = "", s, t, u, v = this, w = "function", x = c.helperMissing, y = void 0, z = this.escapeExpression;
r += '<li class="objective" style="width: ', s = c.objectiveWidth || b.objectiveWidth, typeof s === w ? s = s.call(b, {
hash: {}
}) : s === y && (s = x.call(b, "objectiveWidth", {
hash: {}
})), r += z(s) + '%">\n    <a data-id="', s = c.objectiveID || b.objectiveID, typeof s === w ? s = s.call(b, {
hash: {}
}) : s === y && (s = x.call(b, "objectiveID", {
hash: {}
})), r += z(s) + '" class="objective ', s = c.type || b.type, typeof s === w ? s = s.call(b, {
hash: {}
}) : s === y && (s = x.call(b, "type", {
hash: {}
})), r += z(s) + " simple-button seethrough exercise-color ", s = c.status || b.status, typeof s === w ? s = s.call(b, {
hash: {}
}) : s === y && (s = x.call(b, "status", {
hash: {}
})), r += z(s) + '"\n        href="', s = c.url || b.url, typeof s === w ? s = s.call(b, {
hash: {}
}) : s === y && (s = x.call(b, "url", {
hash: {}
})), r += z(s) + '"\n        data-progress="', s = c.progress || b.progress, typeof s === w ? s = s.call(b, {
hash: {}
}) : s === y && (s = x.call(b, "progress", {
hash: {}
})), r += z(s) + '">\n            <span class="objective-description">', s = c.description || b.description, typeof s === w ? s = s.call(b, {
hash: {}
}) : s === y && (s = x.call(b, "description", {
hash: {}
})), r += z(s) + "</span>\n            ", s = c.complete || b.complete, t = c.unless, u = v.program(1, f, e), u.hash = {}, u.fn = u, u.inverse = v.noop, s = t.call(b, s, u);
if (s || s === 0) r += s;
r += '\n    </a>\n    <div class="hover-data" style="display: none">\n        <div>\n          ', s = c.isVideo || b.isVideo, t = c["if"], u = v.program(3, g, e), u.hash = {}, u.fn = u, u.inverse = v.noop, s = t.call(b, s, u);
if (s || s === 0) r += s;
r += "\n          ", s = c.isAnyVideo || b.isAnyVideo, t = c["if"], u = v.program(5, h, e), u.hash = {}, u.fn = u, u.inverse = v.noop, s = t.call(b, s, u);
if (s || s === 0) r += s;
r += "\n          ", s = c.isExercise || b.isExercise, t = c["if"], u = v.program(7, i, e), u.hash = {}, u.fn = u, u.inverse = v.noop, s = t.call(b, s, u);
if (s || s === 0) r += s;
r += "\n          ", s = c.isAnyExercise || b.isAnyExercise, t = c["if"], u = v.program(9, j, e), u.hash = {}, u.fn = u, u.inverse = v.noop, s = t.call(b, s, u);
if (s || s === 0) r += s;
r += '\n        </div>\n        <div class="goal-tooltip-status">\n          <span>Status:</span>\n          <span>\n            ', s = c.complete || b.complete, t = c["if"], u = v.program(11, k, e), u.hash = {}, u.fn = u, u.inverse = v.program(16, n, e), s = t.call(b, s, u);
if (s || s === 0) r += s;
r += "\n            ", s = c.struggling || b.struggling, t = c["if"], u = v.program(21, q, e), u.hash = {}, u.fn = u, u.inverse = v.noop, s = t.call(b, s, u);
if (s || s === 0) r += s;
return r += "\n          </span>\n        </div>\n    </div>\n</li>\n", r;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["shared-package_goal-new"] = a(function(a, b, c, d, e) {
function f(a, b) {
return "disabled";
}
function g(a, b) {
return '\n                    <li class="objective" style="width: 20%">\n                        <a class="objective simple-button action-gradient video blue" href="#">\n                            <span class="objective-description">Any exercise</span>\n                        </a>\n                    </li>\n                ';
}
function h(a, b) {
return "disabled";
}
function i(a, b) {
return '\n                    <li class="objective" style="width: 20%">\n                        <a class="objective simple-button action-gradient GoalObjectiveAnyExerciseProficiency blue" href="#">\n                            <span class="objective-description">Any exercise</span>\n                        </a>\n                    </li>\n                ';
}
c = c || a.helpers;
var j = "", k, l, m, n = this, o = "function", p = c.blockHelperMissing;
j += '<div class="goalpicker">\n    <h3>Start a new goal</h3>\n\n        <div class="small newgoal goal five_videos ', k = c.hasVideo || b.hasVideo, l = c["if"], m = n.program(1, f, e), m.hash = {}, m.fn = m, m.inverse = n.noop, k = l.call(b, k, m);
if (k || k === 0) j += k;
j += '">\n            <h4><a href="#five-videos">Five Videos</a></h4>\n            <div class="objective_list">\n                <ul class="inline-list objective-list">\n                ', k = 5, l = c.repeat || b.repeat, m = n.program(3, g, e), m.hash = {}, m.fn = m, m.inverse = n.noop, typeof l === o ? k = l.call(b, k, m) : k = p.call(b, l, k, m);
if (k || k === 0) j += k;
j += '\n                </ul>\n            </div>\n            <div class="info pos-right">\n                <p>Watch any five videos to complete this goal!</p>\n                <p>\n                    As you finish more of your\n                    goal, the goal icons will fill\n                    in until it\'s a solid bar.\n                </p>\n                <button class="simple-button action-gradient green">start it!</button>\n            </div>\n        </div>\n\n        <div class="small newgoal goal five_exercises ', k = c.hasExercise || b.hasExercise, l = c["if"], m = n.program(5, h, e), m.hash = {}, m.fn = m, m.inverse = n.noop, k = l.call(b, k, m);
if (k || k === 0) j += k;
j += '">\n            <h4><a href="#five-exercises">Five Exercises</a></h4>\n            <div class="objective_list">\n                <ul class="inline-list objective-list">\n                ', k = 5, l = c.repeat || b.repeat, m = n.program(7, i, e), m.hash = {}, m.fn = m, m.inverse = n.noop, typeof l === o ? k = l.call(b, k, m) : k = p.call(b, l, k, m);
if (k || k === 0) j += k;
return j += '\n                </ul>\n            </div>\n            <div class="info pos-left">\n                <p>Complete any five exercises!</p>\n                <p>\n                    As you finish more of your\n                    goal, the goal icons will fill\n                    in until it\'s a solid bar.\n                </p>\n                <button class="simple-button action-gradient green">start it!</button>\n            </div>\n        </div>\n\n        <div class="big newgoal goal custom">\n            <h4><a href="#custom-goal">Custom Goal</a></h4>\n            <ul class="inline-list objective-list">\n                <li class="objective" style="width: 16.67%;">\n                    <a class="objective simple-button action-gradient blue exercise" href="#">\n                        <span class="objective-description">Adding decimals</span>\n                    </a>\n                </li>\n                <li class="objective" style="width: 16.67%;">\n                    <a class="objective simple-button action-gradient blue exercise" href="#">\n                        <span class="objective-description">Multiplication 2</span>\n                    </a>\n                </li>\n                <li class="objective" style="width: 16.67%;">\n                    <a class="objective simple-button action-gradient blue exercise" href="#">\n                        <span class="objective-description">Arithmetic word problems 2</span>\n                    </a>\n                </li>\n                <li class="objective" style="width: 16.67%;">\n                    <a class="objective simple-button action-gradient blue video" href="#">\n                        <span class="objective-description">Algebra: graphing lines 1</span>\n                    </a>\n                </li>\n                <li class="objective" style="width: 16.67%;">\n                    <a class="objective simple-button action-gradient blue video" href="#">\n                        <span class="objective-description">Quadratic Equation part 2</span>\n                    </a>\n                </li>\n                <li class="objective" style="width: 16.67%;">\n                    <a class="objective simple-button action-gradient blue exercise" href="#" data-progress="0\n                        " style="border-right-style: none; border-right-width: initial; border-right-color: initial;"><span class="objective-description">Reading tables 2</span>\n                    </a>\n                </li>\n            </ul>\n\n            <div class="info pos-top">\n                <p>Custom goals can contain exercises or videos that you pick yourself.</p>\n\n                <button class="simple-button action-gradient green">start it!</button>\n            </div>\n\n        </div>\n</div>\n', j;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["shared-package_goal-new-dialog"] = a(function(a, b, c, d, e) {
c = c || a.helpers, d = d || a.partials;
var f = "", g, h = this;
f += '<div class="goal-new modal fade hide">\n    <div class="modal-header">\n        <a href="#" class="close-button close">x</a>\n    </div>\n    <div class="modal-body">\n        <div class="viewcontents">\n            ', g = b, g = h.invokePartial(d["goal-new"], "goal-new", g, c, d);
if (g || g === 0) f += g;
return f += '\n        </div>\n        <div style="clear: both"></div>\n    </div>\n</div>\n', f;
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["shared-package_goal-new-custom-dialog"] = a(function(a, b, c, d, e) {
c = c || a.helpers;
var f = this;
return '<div class="goal-new-custom modal fade hide">\n    <div class="modal-body">\n        <div class="progress-bar-wrapper">\n            <div class="progress-bar"></div>\n       </div>\n    </div>\n</div>\n';
});
}(), function() {
var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
b["shared-package_goal-create"] = a(function(a, b, c, d, e) {
function f(a, b) {
var d = "", e;
return d += '\n        <li class="objective">\n            <a class="objective simple-button action-gradient blue ', e = c.css || a.css, typeof e === k ? e = e.call(a, {
hash: {}
}) : e === m && (e = l.call(a, "css", {
hash: {}
})), d += n(e) + '" href="', e = c.url || a.url, typeof e === k ? e = e.call(a, {
hash: {}
}) : e === m && (e = l.call(a, "url", {
hash: {}
})), d += n(e) + '" data-progress="', e = c.progress || a.progress, typeof e === k ? e = e.call(a, {
hash: {}
}) : e === m && (e = l.call(a, "progress", {
hash: {}
})), d += n(e) + '">\n                <span class="objective-description">', e = c.description || a.description, typeof e === k ? e = e.call(a, {
hash: {}
}) : e === m && (e = l.call(a, "description", {
hash: {}
})), d += n(e) + "</span>\n            </a>\n        </li>\n    ", d;
}
c = c || a.helpers;
var g = "", h, i, j = this, k = "function", l = c.helperMissing, m = void 0, n = this.escapeExpression, o = c.blockHelperMissing;
g += '<div class="goal pulls">\n    <p class="goal-description" class="pulled"></p>\n    <ul class="inline-list objective-list">\n    ', h = c.objectives || b.objectives, i = j.program(1, f, e), i.hash = {}, i.fn = i, i.inverse = j.noop, typeof h === k ? h = h.call(b, i) : h = o.call(b, h, i);
if (h || h === 0) g += h;
return g += '\n    </ul>\n    <div style="clear: both;"></div>\n</div>\n', g;
});
}();

var Goal = Backbone.Model.extend({
defaults: {
active: !1,
complete: !1,
progress: 0,
title: "Unnamed goal",
objectives: []
},
urlRoot: "/api/v1/user/goals",
initialize: function() {
if (!this.has("created")) {
var a = (new Date).toISOString();
this.set({
created: a,
updated: a
});
}
_.each(this.get("objectives"), function(a) {
a.progress == null && (a.progress = 0, a.status = "not-started"), a.status == null && (a.status = "not-started");
}), this.calcDependents(), this.bind("change", this.fireCustom, this);
},
calcDependents: function() {
var a = this.calcTotalProgress(this.get("objectives")), b = 100 / this.get("objectives").length;
_.each(this.get("objectives"), function(a) {
Goal.calcObjectiveDependents(a, b);
}), this.set({
progress: a,
progressStr: Goal.floatToPercentageStr(a),
complete: a >= 1,
objectiveProgress: _.filter(this.get("objectives"), function(a) {
return a.progress >= 1;
}).length,
updatedTime: parseISO8601(this.get("updated")).getTime()
}, {
silent: !0
});
},
calcTotalProgress: function(a) {
a = a || this.get("objectives");
var b = 0;
return a.length && (b = _.reduce(a, function(a, b) {
return a + b.progress;
}, 0), a.length > 0 ? b /= a.length : b = 0), b;
},
fireCustom: function() {
this.calcDependents();
if (this.hasChanged("progress")) {
var a = [];
this.get("progress") >= 1 ? a.push([ "goalcompleted", this ]) : (oldObjectives = this.previous("objectives"), _.each(this.get("objectives"), function(b, c) {
var d = oldObjectives[c];
b.progress > d.progress && (a.push([ "progressed", this, b ]), b.progress >= 1 && a.push([ "completed", this, b ]));
}, this)), _.any(a) && this.collection.bind("change", function b() {
this.unbind("change", b), _.each(a, function(a) {
this.trigger.apply(this, a);
}, this);
}, this.collection);
}
}
}, {
calcObjectiveDependents: function(a, b) {
a.complete = a.progress >= 1, a.progressStr = Goal.floatToPercentageStr(a.progress), a.iconFillHeight = Goal.calcIconFillHeight(a), a.objectiveWidth = b, a.isVideo = a.type == "GoalObjectiveWatchVideo", a.isAnyVideo = a.type == "GoalObjectiveAnyVideo", a.isExercise = a.type == "GoalObjectiveExerciseProficiency", a.isAnyExercise = a.type == "GoalObjectiveAnyExerciseProficiency";
},
calcIconFillHeight: function(a) {
var b = a.type.toLowerCase().indexOf("exercise") >= 1 ? 13 : 12, c = a.type.toLowerCase().indexOf("exercise") >= 1 ? 4 : 6;
return Math.ceil(a.progress * b) + c;
},
floatToPercentageStr: function(a) {
return (a * 100).toFixed(0);
},
objectiveUrlForType: {
GoalObjectiveWatchVideo: function(a) {
return "/video/" + a.internal_id;
},
GoalObjectiveAnyVideo: function(a) {
return "/";
},
GoalObjectiveExerciseProficiency: function(a) {
return "/build/" + a.internal_id;
},
GoalObjectiveAnyExerciseProficiency: function(a) {
return "/exercisedashboard";
}
},
objectiveUrl: function(a) {
return Goal.objectiveUrlForType[a.type](a);
},
defaultVideoProcessGoalAttrs_: {
title: "Complete Five Videos",
objectives: [ {
description: "Any video",
type: "GoalObjectiveAnyVideo"
}, {
description: "Any video",
type: "GoalObjectiveAnyVideo"
}, {
description: "Any video",
type: "GoalObjectiveAnyVideo"
}, {
description: "Any video",
type: "GoalObjectiveAnyVideo"
}, {
description: "Any video",
type: "GoalObjectiveAnyVideo"
} ]
},
defaultExerciseProcessGoalAttrs_: {
title: "Complete Five Exercises",
objectives: [ {
description: "Any exercise",
type: "GoalObjectiveAnyExerciseProficiency"
}, {
description: "Any exercise",
type: "GoalObjectiveAnyExerciseProficiency"
}, {
description: "Any exercise",
type: "GoalObjectiveAnyExerciseProficiency"
}, {
description: "Any exercise",
type: "GoalObjectiveAnyExerciseProficiency"
}, {
description: "Any exercise",
type: "GoalObjectiveAnyExerciseProficiency"
} ]
},
exidToExerciseName: function(a) {
return a[0].toUpperCase() + a.slice(1).replace(/_/g, " ");
},
GoalObjectiveExerciseProficiency: function(a) {
var b = {
type: "GoalObjectiveExerciseProficiency",
internal_id: a,
description: Goal.exidToExerciseName(a)
};
return b.url = Goal.objectiveUrl(b), b;
}
}), GoalCollection = Backbone.Collection.extend({
model: Goal,
initialize: function() {
this.updateActive(), this.bind("add", this.updateActive, this), this.bind("remove", this.updateActive, this), this.bind("reset", this.updateActive, this);
},
url: "/api/v1/user/goals",
comparator: function(a) {
return -a.get("updatedTime");
},
active: function(a) {
var b = this.find(function(a) {
return a.get("active");
}) || null;
return a && a !== b && (b !== null && b.set({
active: !1
}), a.set({
active: !0
}), b = a), b;
},
updateActive: function() {
this.active(this.findActiveGoal());
},
incrementalUpdate: function(a) {
_.each(a, function(a) {
oldGoal = this.get(a.id) || null, oldGoal !== null ? oldGoal.set(a) : KAConsole.log("Error: brand new goal appeared from somewhere", a);
}, this);
},
findGoalWithObjective: function(a, b, c) {
return this.find(function(c) {
return _.find(c.get("objectives"), function(c) {
return c.type == b && a == c.internal_id;
});
}) || this.find(function(a) {
return _.find(a.get("objectives"), function(a) {
return a.type == c;
});
}) || null;
},
findActiveGoal: function() {
var a = null;
return window.location.pathname.indexOf("/build") === 0 && window.userExerciseName ? a = this.findGoalWithObjective(userExerciseName, "GoalObjectiveExerciseProficiency", "GoalObjectiveAnyExerciseProficiency") : window.location.pathname.indexOf("/video") === 0 && typeof Video.readableId != "undefined" && (a = this.findGoalWithObjective(Video.readableId, "GoalObjectiveWatchVideo", "GoalObjectiveAnyVideo")), a === null && (a = this.at(0)), a;
},
processGoalContext: function() {
return {
hasExercise: this.any(function(a) {
return _.any(a.get("objectives"), function(a) {
return a.type === "GoalObjectiveAnyExerciseProficiency";
});
}),
hasVideo: this.any(function(a) {
return _.any(a.get("objectives"), function(a) {
return a.type === "GoalObjectiveAnyVideo";
});
})
};
}
}), GoalBookView = Backbone.View.extend({
template: Templates.get("shared.goalbook"),
isVisible: !1,
needsRerender: !0,
initialize: function() {
$(this.el).delegate(".close-button", "click", $.proxy(this.hide, this)).delegate(".goal.recently-completed", "mouseenter mouseleave", function(a) {
var b = $(a.currentTarget);
a.type == "mouseenter" ? (b.find(".goal-description .summary-light").hide(), b.find(".goal-description .goal-controls").show()) : (b.find(".goal-description .goal-controls").hide(), b.find(".goal-description .summary-light").show());
}).delegate(".archive", "click", $.proxy(function(a) {
var b = $(a.target).closest(".goal"), c = this.model.get(b.data("id"));
this.animateGoalToHistory(b).then($.proxy(function() {
this.model.remove(c);
}, this));
}, this)).delegate(".new-goal", "click", $.proxy(function(a) {
a.preventDefault(), this.hide(), newGoalDialog.show();
}, this)).delegate(".goal-history", "click", $.proxy(this.goalHistoryButtonClicked, this)), this.model.bind("change", this.render, this), this.model.bind("reset", this.render, this), this.model.bind("remove", this.render, this), this.model.bind("add", this.added, this), this.model.bind("goalcompleted", this.show, this);
},
show: function() {
this.isVisible = !0, this.needsRerender && this.render();
var a = this;
return $(this.el).slideDown("fast", function() {
$(document).bind("keyup.goalbook", function(b) {
b.which == 27 && a.hide();
}), $("body").bind("click.goalbook", function(b) {
$(b.target).closest("#goals-nav-container").length === 0 && a.hide();
});
});
},
hide: function() {
this.isVisible = !1, $(document).unbind("keyup.goalbook"), $("body").unbind("click.goalbook");
var a = this.model.filter(function(a) {
return a.get("complete");
}), b = this.$(".recently-completed");
if (b.length > 0) this.animateThenHide(b); else return $(this.el).slideUp("fast");
},
goalHistoryButtonClicked: function(a) {
typeof Profile != "undefined" && !a.metaKey && (a.preventDefault(), this.hide(), Profile.router.navigate("/goals", !0));
},
added: function(a, b) {
this.needsRerender = !0, this.show(), $(".goal[data-id=" + a.get("id") + "]").effect("highlight", {}, 2500);
},
animateThenHide: function(a) {
var b = _.map(a, function(a) {
return this.model.get($(a).data("id"));
}, this);
this.animateGoalToHistory(a).then($.proxy(function() {
$(this.el).slideUp("fast").promise().then($.proxy(function() {
this.model.remove(b);
}, this));
}, this));
},
render: function() {
var a = $(this.el);
if (!this.isVisible) this.needsRerender = !0; else {
KAConsole.log("rendering GoalBookView", this), this.needsRerender = !1;
var b = _.pluck(this.model.models, "attributes");
a.html(this.template({
goals: b,
profileRoot: KA.profileRoot
}));
}
return this;
},
animateGoalToHistory: function(a) {
var b = this.$("a.goal-history"), c = $(a).map(function(a, c) {
var d = $.Deferred(), e = $(c);
return e.children().each(function() {
$(this).css("overflow", "hidden").css("height", $(this).height());
}).end().delay(500).animate({
width: b.width(),
left: b.position().left
}).animate({
top: b.position().top - e.position().top,
height: "0",
opacity: "toggle"
}, "easeInOutCubic", function() {
$(this).remove(), d.resolve();
}), d.promise();
}).get(), d = $.Deferred();
return $.when.apply(null, c).then(function() {
b.animate({
backgroundColor: "orange"
}).animate({
backgroundColor: "#ddd"
}, d.resolve);
}), d.promise();
}
}), GoalSummaryView = Backbone.View.extend({
template: Templates.get("shared.goal-summary-area"),
initialize: function(a) {
$(this.el).delegate("#goals-drawer", "click", $.proxy(a.goalBookView.show, a.goalBookView)), this.model.bind("change", this.render, this), this.model.bind("reset", this.render, this), this.model.bind("remove", this.render, this), this.model.bind("add", this.render, this), this.model.bind("completed", this.justFinishedObjective, this);
},
render: function() {
KAConsole.log("rendering GoalSummaryView", this);
var a = this.model.active() || null;
return a !== null ? $(this.el).html(this.template(a.attributes)) : $(this.el).empty(), this;
},
justFinishedObjective: function(a, b) {
this.render(), this.$("#goals-drawer").effect("highlight", {}, 2500);
}
}), NewGoalView = Backbone.View.extend({
template: Templates.get("shared.goal-new"),
events: {
"click .newgoal.custom": "createCustomGoal",
"click .newgoal.five_exercises": "createExerciseProcessGoal",
"click .newgoal.five_videos": "createVideoProcessGoal"
},
initialize: function() {
this.render();
},
render: function() {
var a = this.model.processGoalContext();
return $(this.el).html(this.template(a)), this.hookup(), this;
},
hookup: function() {
var a = this;
this.$(".newgoal").hoverIntent(function(c) {
if ($(this).hasClass("disabled")) return;
a.$(".newgoal").not(this).not(".disabled").hoverFlow(c.type, {
opacity: .2
}, 750, "easeInOutCubic"), $(".info.pos-left", this).hoverFlow(c.type, {
left: "+=30px",
opacity: "show"
}, 350, "easeInOutCubic"), $(".info.pos-right, .info.pos-top", this).hoverFlow(c.type, {
right: "+=30px",
opacity: "show"
}, 350, "easeInOutCubic");
}, function(c) {
if ($(this).hasClass("disabled")) return;
a.$(".newgoal").not(this).not(".disabled").hoverFlow(c.type, {
opacity: 1
}, 175, "easeInOutCubic"), $(".info.pos-left", this).hoverFlow(c.type, {
left: "-=30px",
opacity: "hide"
}, 150, "easeInOutCubic"), $(".info.pos-right, .info.pos-top", this).hoverFlow(c.type, {
right: "-=30px",
opacity: "hide"
}, 150, "easeInOutCubic");
});
},
createVideoProcessGoal: function(a) {
a.preventDefault();
if ($(a.currentTarget).hasClass("disabled")) return;
var b = new Goal(Goal.defaultVideoProcessGoalAttrs_);
this.createSimpleGoal(b);
},
createExerciseProcessGoal: function(a) {
a.preventDefault();
if ($(a.currentTarget).hasClass("disabled")) return;
var b = new Goal(Goal.defaultExerciseProcessGoalAttrs_);
this.createSimpleGoal(b);
},
createSimpleGoal: function(a) {
this.model.add(a), a.save().fail($.proxy(function() {
KAConsole.log("Error while saving new custom goal", a), this.model.remove(a);
}, this)), this.trigger("creating");
},
createCustomGoal: function(a) {
this.trigger("creating"), a.preventDefault(), newCustomGoalDialog.show();
}
}), NewGoalDialog = Backbone.View.extend({
template: Templates.get("shared.goal-new-dialog"),
initialize: function() {
this.render();
},
render: function() {
var a = this.model.processGoalContext();
return this.el = $(this.template(a)).appendTo(document.body).get(0), this.newGoalView = new NewGoalView({
el: this.$(".viewcontents"),
model: this.model
}), this.newGoalView.bind("creating", this.hide, this), this;
},
show: function() {
return this.newGoalView.render(), $(this.el).modal({
keyboard: !0,
backdrop: !0,
show: !0
});
},
hide: function() {
return this.$(".info").hide(), $(this.el).modal("hide");
}
}), NewCustomGoalDialog = Backbone.View.extend({
template: Templates.get("shared.goal-new-custom-dialog"),
loaded: !1,
render: function() {
this.el = $(this.template()).appendTo(document.body).get(0), this.innerEl = this.$(".modal-body").get(0);
var a = $(this.el);
return a.bind("shown", function() {
a.removeClass("fade");
}), a.bind("hide", function() {
a.addClass("fade");
}), this;
},
_show: function() {
return $(this.el).modal({
keyboard: !1,
backdrop: !0,
show: !0
});
},
show: function() {
this.innerEl || this.render(), this.loaded || (this.loaded = !0, this.load().error($.proxy(function() {
this.loaded = !1;
})), this.$(".progress-bar").progressbar({
value: 10
}).slideDown("fast")), this._show();
},
load: function() {
return dynamicPackageLoader.packageLoaded("maps") || $('<script src="http://maps.google.com/maps/api/js?v=3.3&sensor=false&callback=finishLoadingMapsPackage" type="text/javascript"></script>').appendTo(document), $.ajax({
url: "/goals/new",
type: "GET",
dataType: "html"
}).done($.proxy(function(a) {
KAConsole.log("Loaded /goals/new."), this.waitForMapsPackage(a);
}, this)).error($.proxy(function() {
KAConsole.log(Array.prototype.slice.call(arguments)), $(this.innerEl).text("Page load failed. Please try again.");
}, this));
},
hide: function() {
$(this.el).modal("hide");
},
waitForMapsPackage: function(a) {
if (!dynamicPackageLoader.packageLoaded("maps")) {
var b = this;
setTimeout(function() {
b.waitForMapsPackage(a);
}, 100);
return;
}
KAConsole.log("Done loading."), $(this.innerEl).html(a), createGoalInitialize();
}
});

$(function() {
window.GoalBook = new GoalCollection(window.GoalsBootstrap || []), APIActionResults.register("updateGoals", $.proxy(GoalBook.incrementalUpdate, window.GoalBook)), window.myGoalBookView = new GoalBookView({
el: "#goals-nav-container",
model: GoalBook
}), window.myGoalSummaryView = new GoalSummaryView({
el: "#goals-container",
model: GoalBook,
goalBookView: myGoalBookView
}), myGoalSummaryView.render(), window.newGoalDialog = new NewGoalDialog({
model: GoalBook
}), window.newCustomGoalDialog = new NewCustomGoalDialog;
}), Handlebars.registerPartial("goal-objectives", Templates.get("shared.goal-objectives")), Handlebars.registerPartial("goalbook-row", Templates.get("shared.goalbook-row")), Handlebars.registerPartial("goal-new", Templates.get("shared.goal-new"));

var GoalCreator = {
objectives: [],
knowledgeMap: null,
videosAreInit: !1,
init: function(a) {
this.knowledgeMap = a, $(window).resize($.proxy(this.resize, this)), $("#create-goal .goal-title").focus(function() {
$(this).animate({
width: "600px"
});
}).blur(function() {
$(this).animate({
width: "250px"
});
}).placeholder();
var b = $("#create-goal");
b.find("input").mouseup(function() {
$(this).removeClass("fieldError");
}), b.find('input[name="title"]').change(function() {
GoalCreator.updateViewAndDescription();
}).keypress(function(a) {
a.which == "13" && (a.preventDefault(), $(a.target).blur());
}), GoalCreator.updateViewAndDescription();
},
getCurrentVideoObjectives: function() {
var a = {};
return $.each(GoalBook.models, function(b, c) {
$.each(c.get("objectives"), function(b, c) {
c.type == "GoalObjectiveWatchVideo" && (a[c.internal_id] = !0);
});
}), a;
},
initVideos: function() {
$("#goal-choose-videos").find("#smarthistory").remove().end().on("click", ".vl", function(a) {
a.preventDefault();
var b = $(a.currentTarget), c = b.children("span"), d = $(c).css("background-image");
if (d.indexOf("indicator-complete") == -1) {
var e = b.attr("data-id"), f = c.text();
GoalCreator.onVideoClicked(e, f);
} else alert("You can't add a video you've already watched to a goal.");
}), $("#goal-choose-videos .vl").each(function(a, b) {
var c = $(b), d = c.children("span"), e = $(d).css("background-image");
e.indexOf("indicator-complete") >= 0 && c.addClass("goalVideoInvalid");
});
},
reset: function() {
GoalCreator.objectives = [], $('#create-goal input[name="title"]').val(""), GoalCreator.updateExerciseCount(), GoalCreator.updateVideoCount(), GoalCreator.updateViewAndDescription(), GoalCreator.showExercises();
},
toggleObjectiveInternal: function(a, b, c, d) {
var e = 1, f = -1;
$("#goal-commit-response").hide(), $.each(GoalCreator.objectives, function(b, d) {
d.type == a && d.id == c && (f = b), d.idx >= e && (e = d.idx + 1);
});
if (f >= 0) {
var g = GoalCreator.objectives[f];
return GoalCreator.objectives.splice(f, 1), null;
}
if (GoalCreator.objectives.length < 10) {
var h = {
type: a,
css: b,
description: d,
progress: 0,
url: "javascript:GoalCreator.onSelectedObjectiveClicked('" + a + "', '" + b + "', '" + c + "', '" + d + "');",
idx: e,
id: c
};
return GoalCreator.objectives.push(h), h;
}
},
updateViewAndDescription: function() {
var a = {
title: $("#create-goal").find('input[name="title"]').val(),
objectives: GoalCreator.objectives
}, b = Templates.get("shared.goal-create")(a);
$("#create-goal-view").html(b), GoalCreator.objectives.length < 2 ? $("#create-goal-view .goal").addClass("with-border") : $("#create-goal-view .goal").removeClass("with-border"), GoalCreator.objectives.length === 0 && $("#goal-info-section > .goal-description").remove(), GoalCreator.objectives.length > 0 && $("#goal-info-section").children(".goal-description").length === 0 && $("#create-goal-view .goal .goal-description").remove().insertAfter("#create-goal-view"), GoalCreator.objectives.length >= 1 && $("#create-goal-view .goal .goal-description").remove(), GoalCreator.objectives.length > 1 && ($("#create-goal-view .goal li.objective").css("width", 100 / GoalCreator.objectives.length + "%"), $("#create-goal-view .goal li.objective").last().children("a").css("border-right", "none"));
var c = "";
if (GoalCreator.objectives.length === 0) c = "This goal currently has no objectives selected. Select <b>up to 10</b> exercises or videos to complete below."; else {
var d;
c = "To complete this goal, you will have to <ul>", d = [], $.each(GoalCreator.objectives, function(a, b) {
b.type == "GoalObjectiveExerciseProficiency" && d.push(b);
}), d.length > 0 && (c += "<li class='exercise-objectives'>become proficient in exercise", d.length == 1 ? c += " <em>" + d[0].description + "</em>" : (c += "s ", $.each(d, function(a, b) {
a === 0 ? c += "<em>" + b.description + "</em>" : a < d.length - 1 ? c += ", <em>" + b.description + "</em>" : c += " and <em>" + b.description + "</em>";
})), c += "</li>"), d = [], $.each(GoalCreator.objectives, function(a, b) {
b.type == "GoalObjectiveWatchVideo" && d.push(b);
}), d.length > 0 && (c += "<li class='video-ojectives'>, and watch video", d.length == 1 ? c += " <em>" + d[0].description + "</em>" : (c += "s ", $.each(d, function(a, b) {
a === 0 ? c += "<em>" + b.description + "</em>" : a < d.length - 1 ? c += ", <em>" + b.description + "</em>" : c += " and <em>" + b.description + "</em>";
})), c += ".</li>"), c += "</ul>";
}
$(".create-goal-page .goal-description").html(c), this.resize();
},
resize: function() {
var a = $("#goal-choose-exercises"), b = $(".dashboard-drawer", a).add(".dashboard-drawer-inner", a).add(".dashboard-map", a).add("#goal-choose-videos .dashboard-content-stretch"), c = $(".goal-new-custom.modal"), d = c.outerHeight(!0), e = $("#goal-spacer").offset().top - c.offset().top, f = 48, g = d - (e + f);
b.height(g);
var h = $(".dashboard-drawer-inner", a);
h.height(h.height() - 20), this.knowledgeMap && this.knowledgeMap.map && google.maps.event.trigger(this.knowledgeMap.map, "resize");
},
showExercises: function() {
$("#goal-choose-exercises").show(), $("#goal-choose-videos").hide(), $("#show-vid-btn").removeClass("blue"), $("#show-ex-btn").addClass("blue"), this.resize();
},
onExerciseClicked: function(a, b) {
b.preventDefault();
if (a.get("status") == "Proficient" || a.get("status") == "Review" || a.get("goal_req")) return;
GoalCreator.toggleObjectiveInternal("GoalObjectiveExerciseProficiency", "exercise", a.get("name"), a.get("display_name")), GoalCreator.updateExerciseCount(), GoalCreator.updateViewAndDescription();
},
onExerciseBadgeClicked: function(a) {
this.onExerciseClicked(this.knowledgeMap.dictNodes[a], null);
},
updateExerciseCount: function() {
var a = 0, b = this;
$.each(GoalCreator.objectives, function(b, c) {
c.type == "GoalObjectiveExerciseProficiency" && a++;
}), $("#goal-exercise-count").html(a), $.each(b.knowledgeMap.dictNodes, function(a, c) {
var d = !1;
$.each(GoalCreator.objectives, function(a, b) {
b.type == "GoalObjectiveExerciseProficiency" && b.id == c.name && (d = !0);
}), $.each(b.knowledgeMap.exerciseRowViews, function(a, b) {
c.name == b.model.get("name") && b.showGoalIcon(d);
}), b.knowledgeMap.exerciseMarkerViews[c.name].showGoalIcon(d);
});
},
onVideoClicked: function(a, b) {
if (a in GoalCreator.getCurrentVideoObjectives()) return;
GoalCreator.toggleObjectiveInternal("GoalObjectiveWatchVideo", "video", a, b), GoalCreator.updateVideoCount(), GoalCreator.updateViewAndDescription();
},
showVideos: function() {
GoalCreator.videosAreInit || (GoalCreator.videosAreInit = !0, GoalCreator.initVideos()), $("#goal-choose-exercises").hide(), $("#goal-choose-videos").show(), $("#show-vid-btn").addClass("blue"), $("#show-ex-btn").removeClass("blue"), this.resize();
for (var a in GoalCreator.getCurrentVideoObjectives()) $('.vl[data-id="' + a + '"]').addClass("goalVideoInvalid");
},
updateVideoCount: function() {
var a = 0;
$.each(GoalCreator.objectives, function(b, c) {
c.type == "GoalObjectiveWatchVideo" && a++;
}), $("#goal-video-count").html(a), $("#library-content-main").find(".vl").each(function(a, b) {
var c = $(b).attr("data-id"), d = !1;
$.each(GoalCreator.objectives, function(a, b) {
b.type == "GoalObjectiveWatchVideo" && b.id == c && (d = !0);
});
var e = $(b).children(".video-goal-icon");
d ? e.length === 0 && $('<span class="video-goal-icon"><img src="/static/images/flag.png"></span>').insertBefore($(b).children("span")[0]) : e.detach();
});
},
onSelectedObjectiveClicked: function(a, b, c, d) {
GoalCreator.toggleObjectiveInternal(a, b, c, d), GoalCreator.updateExerciseCount(), GoalCreator.updateVideoCount(), GoalCreator.updateViewAndDescription();
},
validate: function(a) {
var b = "";
return GoalCreator.objectives.length < 2 && (b = "We'd like you to pick at least two (2) objectives"), b !== "" ? ($("#goal-commit-response").html(b).show(), !1) : !0;
},
submit: function() {
var a = $("#create-goal"), b = "";
if (!GoalCreator.validate(a)) return;
var c = a.find('input[name="title"]');
c.val() === "" && c.val("Custom goal: " + (new Date).toDateString());
var d = new Goal({
title: c.val(),
objectives: _.map(GoalCreator.objectives, function(a) {
var b = {
type: a.type,
internal_id: a.id,
description: a.description
};
return b.url = Goal.objectiveUrl(b), b;
})
});
return GoalBook.add(d), d.save().fail(function(a) {
KAConsole.log("Goal creation failed: " + a.responseText, d), GoalBook.remove(d);
}), newCustomGoalDialog.hide(), GoalCreator.reset(), !1;
}
};

window.TestTopics = function() {
var a = getDefaultTopicTree();
KAConsole.log("Fetching root..."), a.fetchByID("root", function() {
KAConsole.log("Got root. Fetching first child..."), a.fetchByID(this.get("children")[0].id, function() {
KAConsole.log("Got child topic:", this);
});
});
}, function() {
var a = null;
window.TopicVersion = Backbone.Model.extend({
defaults: {
number: 0,
kind: "TopicVersion",
"default": !1,
edit: !1,
title: "(untitled version)",
last_edited_by: "",
description: "",
created_on: "",
updated_on: ""
},
idAttribute: "number",
urlRoot: "/api/v1/topicversion",
initialize: function() {
this._topicTree = new TopicTree(this);
},
getTopicTree: function() {
return this._topicTree;
}
}), window.TopicVersionList = IncrementalCollection.extend({
model: TopicVersion,
url: "/api/v1/topicversions/"
}), window.getTopicVersionList = function() {
return a = a || new TopicVersionList, a;
};
}(), function() {
var a = null;
window.Topic = Backbone.Model.extend({
defaults: {
id: "new_topic",
title: "New Topic",
standalone_title: "New Topic",
kind: "Topic",
description: "",
hide: !1,
ka_url: "",
tags: [],
children: []
},
initialize: function() {},
url: function() {
var a = this.collection ? this.collection.getVersionID() : "edit";
return "/api/v1/topicversion/" + a + "/topic/" + this.id;
},
getChildren: function() {
var a = this;
return _.map(this.get("children"), function(b) {
return a.tree.get(b.id);
});
},
addChild: function(a, b) {
var c = this.get("children").slice(0);
c.splice(b, 0, a), this.set({
children: c
});
},
removeChild: function(a, b) {
var c = null, d = _.filter(this.get("children"), function(d) {
return d.kind != a || d.id != b ? !0 : (c = d, !1);
});
return this.set({
children: d
}), c;
},
updateNode: function() {
var a = this.tree;
_.each(this.get("children"), function(b) {
if (b.kind == "Topic" && !a.get(b.id)) {
var c = new Topic(b);
a.addNode(c), b.__ptr = c;
}
}), a.each(function(a) {
var b = _.map(a.get("children"), function(a) {
return a.__ptr && a.__ptr.__inited ? {
kind: a.kind,
__ptr: a.__ptr,
id: a.__ptr.id,
title: a.__ptr.get("title"),
hide: a.__ptr.get("hide")
} : a;
});
a.set({
children: b
});
});
}
}), window.TopicTree = IncrementalCollection.extend({
model: Topic,
version: null,
initialize: function(a) {
this.version = a;
},
getRoot: function() {
var a = this.fetchByID("root");
return a.__inited || a.set({
title: "Loading..."
}), a;
},
addNode: function(a) {
KAConsole.log("Adding node to tree: " + a.get("id")), a.tree = this, this.add([ a ]), a.bind("change", a.updateNode, a);
},
getVersionID: function() {
return _.isString(this.version) ? this.version : this.version.get("number");
}
});
var b = {
Topic: "id",
Video: "readable_id",
Exercise: "name",
Url: "id"
}, c = {
Topic: "title",
Video: "title",
Exercise: "display_name",
Url: "title"
}, d = {
Topic: "hide"
};
window.TopicChild = function(a) {
a instanceof Backbone.Model ? this.model = a.toJSON() : this.model = a, this.kind = this.model.kind, this.id = this.model[b[this.model.kind]], this.title = this.model[c[this.model.kind]], d[this.model.kind] ? this.hide = this.model[d[this.model.kind]] : this.hide = !1;
}, window.getDefaultTopicTree = function() {
return a = a || new TopicTree("default"), a;
};
}(), function() {
var a = null;
window.Video = Backbone.Model.extend({
defaults: {
readable_id: "",
kind: "Video",
title: "",
youtube_id: "",
description: "",
keywords: "",
duration: 0,
views: 0,
date_added: "",
url: "",
ka_url: "",
relative_url: "",
download_urls: null
},
idAttribute: "readable_id",
initialize: function(a) {
this.version = a;
},
urlRoot: "/api/v1/topicversion/edit/videos"
}), window.VideoList = IncrementalCollection.extend({
model: Video
}), window.getVideoList = function() {
return a = a || new VideoList, a;
};
}(), function() {
var a = null;
window.Exercise = Backbone.Model.extend({
defaults: {
name: "new_exercise",
kind: "Exercise",
display_name: "New Exercise",
short_display_name: "New Ex",
creation_date: "",
h_position: 0,
v_position: 0,
live: !1,
summative: !1,
num_milestones: 0,
seconds_per_fast_problem: 0,
covers: [],
prerequisites: [],
ka_url: "",
relative_url: "",
description: "",
tags: []
},
idAttribute: "name",
urlRoot: "/api/v1/topicversion/edit/exercises"
}), window.ExerciseList = IncrementalCollection.extend({
model: Exercise
}), window.getExerciseList = function() {
return a = a || new ExerciseList, a;
};
}(), function() {
var a = null;
window.ExternalURL = Backbone.Model.extend({
defaults: {
id: "",
kind: "Url",
url: "",
title: "New URL",
tags: [],
created_on: "",
updated_on: ""
},
urlRoot: "/api/v1/topicversion/edit/url"
}), window.URLList = IncrementalCollection.extend({
model: ExternalURL
}), window.getUrlList = function() {
return a = a || new URLList, a;
};
}();
