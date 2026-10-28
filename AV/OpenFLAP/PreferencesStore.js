/* Shared preference definitions and persistence for the launcher and settings window. */
(function (global) {
  "use strict";

  var storageKey = "openflap.preferences";
  var definitions = {
    openMode: {
      defaultValue: "window",
      choices: [
        { value: "tab", label: "New tab" },
        { value: "window", label: "New window" }
      ]
    },
    palette: {
      defaultValue: "default",
      choices: [
        { value: "default", label: "Classic cream" },
        { value: "blue", label: "Blue" },
        { value: "green", label: "Green" },
        { value: "purple", label: "Purple" }
      ]
    }
  };

  function isValid(name, value) {
    var definition = definitions[name];
    if (typeof value !== typeof definition.defaultValue) {
      return false;
    }
    return !definition.choices || definition.choices.some(function (choice) {
      return choice.value === value;
    });
  }

  function readStored() {
    var stored = JSON.parse(global.localStorage.getItem(storageKey));
    return stored && typeof stored === "object" && !Array.isArray(stored) ?
      stored : {};
  }

  function normalize(stored) {
    var settings = {};
    Object.keys(definitions).forEach(function (name) {
      settings[name] = Object.prototype.hasOwnProperty.call(stored, name) &&
        isValid(name, stored[name]) ? stored[name] : definitions[name].defaultValue;
    });
    return settings;
  }

  function load() {
    try {
      return normalize(readStored());
    } catch (error) {
      // Invalid JSON or blocked storage must not prevent the tools from loading.
      return normalize({});
    }
  }

  function save(changes) {
    var stored;
    try {
      stored = readStored();
    } catch (error) {
      stored = {};
    }
    // Merge only supplied, registered fields. Preserve other stored keys so an
    // older preferences window cannot erase settings introduced by newer code.
    Object.keys(changes).forEach(function (name) {
      if (Object.prototype.hasOwnProperty.call(definitions, name)) {
        if (!isValid(name, changes[name])) {
          throw new Error("Invalid preference: " + name);
        }
        stored[name] = changes[name];
      }
    });
    var settings = normalize(stored);
    Object.keys(settings).forEach(function (name) {
      stored[name] = settings[name];
    });
    // Let the form report write failures; never claim that a failed save worked.
    global.localStorage.setItem(storageKey, JSON.stringify(stored));
    return settings;
  }

  function applyPalette(settings) {
    global.document.documentElement.setAttribute("data-palette", settings.palette);
  }

  global.OpenFLAPPreferences = {
    definitions: definitions,
    storageKey: storageKey,
    load: load,
    save: save,
    applyPalette: applyPalette
  };
}(window));
