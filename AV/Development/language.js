function getInterpreter(langJSON, selectedLanguage) {
    var trans;

    // get the translation from the given location or object 
    if (typeof langJSON === "string") {
      // assume langJSON is a url
      if (langJSON.indexOf("{lang}") !== -1) {
        // replace {lang} label with the selected language
        langJSON = langJSON.replace("{lang}", selectedLanguage);
        selectedLanguage = undefined;
      }
      $.ajax({
        url: langJSON,
        async: false,
        dataType: "json",
        success: function (data) {
          if (selectedLanguage) {
            trans = data[selectedLanguage];
          } else {
            trans = data;
          }
        }
      });
    } else if (typeof langJSON === "object") {
      // assume this is an object containing one or more translations
      if (selectedLanguage) {
        trans = langJSON[selectedLanguage];
      } else {
        trans = langJSON;
      }
    }

    // if the selected translation is not an object give a warning and
    // return a dummy function
    if (typeof trans !== "object") {
      console.warn("Language not found (" + selectedLanguage + ")");
      return function (label) {
        return "[" + label + "]";
      };
    }

    // return the interpreter function for the selected language
    return function (label) {
      if (typeof trans[label] === "undefined") {
        console.warn("Cannot find label: " + label);
        return "[" + label + "]";
      }
      return trans[label];
    };
  }