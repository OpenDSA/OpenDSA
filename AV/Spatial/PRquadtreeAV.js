//global alert: true, ODSA
$(document).ready(function () {
  // Process About button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }
  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#run').click(runIt);
  $('#reset').click(ODSA.AV.reset);

  //////////////////////////////////////////////////////////////////
  // Start processing here
  //////////////////////////////////////////////////////////////////
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig(),
      interpret = config.interpreter,       // get the interpreter
      settings = config.getSettings();      // Settings for the AV
  // Execute the "Run" button function
  function runIt() {
    ODSA.AV.reset(true);
    var jsav = new JSAV($('.avcontainer'), {settings: settings});
    var point = new Point(120, 120, "A");
    jsav.umsg("Let's get started");
    //console.log("Setup the Bintree");
    var bint = new QuadTree(jsav, 256, 256);
    jsav.displayInit();

    jsav.umsg("Step 1: insert node with value 'A @ 130, 120");
    var point = new Point(130, 120, "A");
    bint.insert(point, 1);

    jsav.step();
    jsav.umsg("Step 2: Insert C- (90,200)");
    var point = new Point(90, 200, "C");
    bint.insert(point, 1);

    jsav.step();
    jsav.umsg("Step 3: Insert D- (30,154)");
    var point = new Point(30, 154, "D");
    bint.insert(point, 1);

    jsav.step();
    jsav.umsg("Step 4: Insert E- (130,90)");
    var point = new Point(130, 90, "E");
    bint.insert(point, 1);
    jsav.step();
    jsav.umsg("Step 4: remove E- (130,90)");
    bint.remove(point, 1);
    jsav.recorded(); // mark the end
  }
});
