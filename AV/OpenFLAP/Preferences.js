(function () {
  "use strict";

  var store = window.OpenFLAPPreferences;
  var form = document.getElementById("preferences-form");
  var status = document.getElementById("preferences-status");
  var fields = Array.prototype.filter.call(form.querySelectorAll("[name]"), function (field) {
    return Object.prototype.hasOwnProperty.call(store.definitions, field.name);
  });

  // A select's choices come from the shared definition, not a second HTML list.
  fields.forEach(function (field) {
    var definition = store.definitions[field.name];
    if (field.tagName === "SELECT" && definition.choices) {
      definition.choices.forEach(function (choice) {
        var option = document.createElement("option");
        option.value = choice.value;
        option.textContent = choice.label;
        field.appendChild(option);
      });
    }
  });

  function loadPreferences() {
    var settings = store.load();
    fields.forEach(function (field) {
      if (field.type === "checkbox") {
        field.checked = settings[field.name];
      } else {
        field.value = settings[field.name];
      }
    });
    store.applyPalette(settings);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var changes = {};
    fields.forEach(function (field) {
      changes[field.name] = field.type === "checkbox" ? field.checked : field.value;
    });
    try {
      var settings = store.save(changes);
      store.applyPalette(settings);
      status.textContent = "Preferences saved.";
    } catch (error) {
      status.textContent = "Could not save preferences. Please check your choices and browser storage settings.";
    }
  });

  // Clear the confirmation when there are edits that have not been saved.
  form.addEventListener("input", function () {
    status.textContent = "Unsaved changes.";
  });
  form.addEventListener("change", function () {
    status.textContent = "Unsaved changes.";
  });

  document.getElementById("cancel-preferences").addEventListener("click", function () {
    loadPreferences();
    status.textContent = "Changes discarded. You can close this window.";
    window.close();
  });

  document.getElementById("close-preferences").addEventListener("click", function () {
    window.close();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      document.getElementById("cancel-preferences").click();
    }
  });

  loadPreferences();
}());
