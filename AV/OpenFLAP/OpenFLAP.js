(function () {
  "use strict";

  var searchControls = document.getElementById("search-controls");
  var searchInput = document.getElementById("tool-search");
  var clearButton = document.getElementById("clear-search");
  var searchStatus = document.getElementById("search-status");
  var toolItems = document.querySelectorAll("#tool-list > li");

  function normalize(text) {
    return text
      .toLowerCase()
      .replace(/[-\u2010-\u2015]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Cache each tool's name and aliases once.
  var tools = Array.prototype.map.call(toolItems, function (item) {
    var name = item.querySelector(".tool-label").textContent;
    var keywords = item.getAttribute("data-keywords") || "";

    return {
      element: item,
      name: normalize(name),
      aliases: normalize(keywords).split(" ")
    };
  });

  function filterTools() {
    var query = normalize(searchInput.value);
    var words = query ? query.split(" ") : [];
    var visibleCount = 0;

    tools.forEach(function (tool) {
      var matches = words.every(function (word) {
        // Match partial names, but require exact alias matches.
        return tool.name.indexOf(word) !== -1 ||
          tool.aliases.indexOf(word) !== -1;
      });

      tool.element.hidden = !matches;

      if (matches) {
        visibleCount += 1;
      }
    });

    clearButton.hidden = searchInput.value.length === 0;

    if (visibleCount === 0) {
      searchStatus.textContent = "No tools found. Try another name.";
    } else {
      searchStatus.textContent =
        visibleCount + (visibleCount === 1 ? " tool shown" : " tools shown");
    }
  }

  searchInput.addEventListener("input", filterTools);

  clearButton.addEventListener("click", function () {
    searchInput.value = "";
    filterTools();
    searchInput.focus();
  });


  var preferenceStore = window.OpenFLAPPreferences;
  var settings;

  function loadPreferences() {
    settings = preferenceStore.load();
  }

  function applyPreferences() {
    preferenceStore.applyPalette(settings);

    tools.forEach(function (tool) {
      var notice = tool.element.querySelector(".visually-hidden");
      if (notice) {
        notice.textContent = settings.openMode === "window" ?
          "(opens in new window)" : "(opens in new tab)";
      }
    });
  }

  document.getElementById("preferences-link").addEventListener("click", function (event) {
    if (event.button !== 0 || event.ctrlKey || event.metaKey ||
        event.shiftKey || event.altKey) {
      return;
    }
    var preferencesWindow = window.open(this.href, "OpenFLAPPreferences",
      "popup,width=520,height=620,resizable=yes,scrollbars=yes");
    if (preferencesWindow) {
      event.preventDefault();
      preferencesWindow.focus();
    }
    // If a popup is blocked, the ordinary link opens the preferences page.
  });

  window.addEventListener("storage", function (event) {
    if (event.key === preferenceStore.storageKey || event.key === null) {
      loadPreferences();
      applyPreferences();
    }
  });

  // Also refresh after returning from a preferences window or cached page.
  window.addEventListener("focus", function () {
    loadPreferences();
    applyPreferences();
  });
  window.addEventListener("pageshow", function () {
    loadPreferences();
    applyPreferences();
  });

  document.getElementById("tool-list").addEventListener("click", function (event) {
    var link = event.target.closest("a.tool");
    if (!link || settings.openMode !== "window" || event.defaultPrevented ||
        event.button !== 0 || event.ctrlKey || event.metaKey ||
        event.shiftKey || event.altKey) {
      return;
    }

    // Request a separate window only during a direct user action.
    event.preventDefault();
    window.open(link.href, "_blank", "popup,width=1100,height=800,noopener");
  });

  loadPreferences();
  applyPreferences();

  // Keep the tool list usable if JavaScript is unavailable.
  searchControls.hidden = false;
  filterTools();
}());
