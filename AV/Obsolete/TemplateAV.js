"use strict";
/*global alert: true, ODSA, console */
$(document).ready(function () {
  // Process About button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring("About Box Title", "Author Names"));
  }

  // Connect action callbacks to the HTML entities
  $('#about').click(about);

  //////////////////////////////////////////////////////////////////
  // Start processing here
  //////////////////////////////////////////////////////////////////

  // create a new settings panel and specify the link to show it                                                                           
  var settings = new JSAV.utils.Settings($(".jsavsettings"));

  // Create a JSAV instance
  var av = new JSAV($('.avcontainer'), {settings: settings});

  // Initialize the display
  av.umsg("This slide holds stuff that you see at the start.");
  av.displayInit();

  av.umsg("Now just make as many slides as we like.");
  av.step();

  av.umsg("The last slide is followed by `av.recorded()`");
  av.recorded(); // done recording changes, will rewind
});
