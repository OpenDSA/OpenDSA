if (typeof JSAV_EXERCISE_OPTIONS === "undefined")
  window.JSAV_EXERCISE_OPTIONS = {};

if (typeof window.JSAV_OPTIONS === "undefined")
  window.JSAV_OPTIONS = {};


// same as updateJSAVExerOptions, except that it uses the flag JOP instead of
// JXOP and sets JSAV_OPTIONS instead of JSAV_EXERCISE_OPTIONS
function updateJSAVOptions() {
  // Parse the querystring from the URL
  var urlParamList = location.href.substring(location.href.indexOf("?") + 1).split('&');
  var kvPair;

  // Loop through all arguments in the querystring
  for (var i in urlParamList) {
    // Arguments that begin with the prefix 'JOP-' are JSAV exercise option settings
    if (urlParamList[i].indexOf('JOP-') === 0) {
      kvPair = urlParamList[i].split('=');
      // Strip the 'JOP-' flag from the setting name and apply the specified value
      window.JSAV_EXERCISE_OPTIONS[kvPair[0].replace('JOP-', '')] = kvPair[1];
    }
  }
}

updateJSAVOptions();


ODSA.UTILS.getConfig = function (url) {
  var configurationFile;
  var result = {};

  // the selected language and code
  var lang = JSAV_EXERCISE_OPTIONS.lang || JSAV_OPTIONS.lang || "en";
  var code = JSAV_EXERCISE_OPTIONS.code || JSAV_OPTIONS.code;

  // download the entire configurationFileiguration file
  $.ajax({
    url: url,
    async: false,
    dataType: "json",
    success: function (data) { configurationFile = data; }
  });

  // set the language object for the result
  if (typeof configurationFile.translations[lang] === "object") {
    // return the language object in the configurationFileiguration file
    result.language = configurationFile.translations[lang];
  } else if (typeof configurationFile.translations[lang] === "string") {
    // download the language object from the url
    var langData;
    // create a url with the same path as in the "url" string
    var langUrl = url.split("/");
    langUrl.pop();
    langUrl = langUrl.join("/");
    if (langUrl !== "") {
      langUrl += "/"
    }
    langUrl += configurationFile.translations[lang];

    $.ajax({
      url: langUrl,
      async: false,
      dataType: "json",
      success: function (data) { langData = data; }
    });
    result.language = langData;
  }

  // set the code object for the result
  if (configurationFile.code) {
    result.code = configurationFile.code[code];
  }

  return result;
};


ODSA.UTILS.setTitleAndInstructions = function (container, translation) {
  container = $(container);
  var $title = container.find(".ODSAtitle");
  var $instructLabel = container.find(".ODSAinstructlabel");
  var $instructions = container.find(".ODSAinstructions");

  if ($title.length !== 0) {
    $title.html(translation.ODSAtitle);
  }
  if ($instructLabel.length !== 0) {
    $instructLabel.html(translation.ODSAinstructlabel);
  }
  if ($instructions.length !== 0) {
    $instructions.html(translation.ODSAinstructions);
  }
};
