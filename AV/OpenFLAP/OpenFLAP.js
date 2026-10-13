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

  // Keep the tool list usable if JavaScript is unavailable.
  searchControls.hidden = false;
  filterTools();
}());
