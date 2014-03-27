if (typeof JSAV_EXERCISE_OPTIONS === "undefined")
  window.JSAV_EXERCISE_OPTIONS = {};

if (typeof window.JSAV_OPTIONS === "undefined")
  window.JSAV_OPTIONS = {};


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
  var $title = container.find(".exerciseTitle");
  var $instructLabel = container.find(".instructLabel");
  var $instructions = container.find(".instructions");

  if ($title.length !== 0) {
    $title.html(translation.exerciseTitle);
  }
  if ($instructLabel.length !== 0) {
    $instructLabel.html(translation.instructLabel);
  }
  if ($instructions.length !== 0) {
    $instructions.html(translation.instructions);
  }
};
