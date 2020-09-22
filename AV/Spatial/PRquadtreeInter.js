$(document).ready(function() {
  function about() {
    alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }
  var config = ODSA.UTILS.loadConfig(),
      interpret = config.interpreter,       // get the interpreter
      settings = config.getSettings();      // Settings for the AV
  
  var numPoint = 1;
  var insertMode = 0;
  $('#about').click(about);
  $('#remove').click(rmv);
  $('#insert').click(insert);
  $('#submit').click(sbmt);
  $('#reset').click(rst);
  $('#container').click(coor);

  function coor(){
    var x = event.pageX; //649
    var y = event.pageY; //187
    var point = new Point(event.pageX - clickOffsetX, event.pageY - clickOffsetY, "'");
    if (insertMode === 1) {
      bint.insert(point, txt);
    } else if (insertMode === 2) {
      bint.remove(point, txt);
    }
  }
  var clickOffsetX = 638;
  var clickOffsetY = 194;
  var mapleft = 640;
  var maptop = 25;
  var w = 256;
  var h = 256
  var txt = 3;
  var again = true;
  var submited = false;
  
  var jsav = new JSAV("container", $('.avcontainer'), {
    settings: settings
  }),
      bint = new QuadTree(jsav, 256, 256,false);
  jsav.umsg("Submit number of point for splitting and start inserting");

  function rmv() {
    if (insertMode == 1) {
      insertMode = 2;
      jsav.umsg("Remove Mode");
      $('#insert').css("background-color", "transparent");
      $('#remove').css("background-color", "#FFFF00");
    } else if (insertMode == 0) {
      insertMode = 0;
      alert("You must first submit/insert a point to be in this state");
    }
  }
  function sbmt() {
    if (again) {
      txt = $('#text').val();
      submited = true;
      jsav.umsg("Submitted! now you can press insert and start inserting");
      alert("Submitted with spliting value " + txt);
      again = false;
    }
    $('#submit').attr("disabled", true);
  }
  function rst() {
    location.reload(true);
  }
  function insert() {
    if (!submited) {
      alert("You must submit the number of point for spliting!");
    } else {
      insertMode = 1;
      jsav.umsg("Insert Mode");
      $('#remove').css("background-color", "transparent");
      $('#insert').css("background-color", "#FFFF00");
    }
  }
}());
