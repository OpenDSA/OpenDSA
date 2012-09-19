var server = "opendsa.cc.vt.edu:8080"; //"128.173.54.186:8000";
var base_url = "http://" + server;

$(document).ready(function() {
	//Make sure localStorage is enabled
	var localStorageEnabled = function() {
		var enabled, uid = +new Date;
		try {
			localStorage[ uid ] = uid;
			enabled = ( localStorage[ uid ] == uid );
			localStorage.removeItem( uid );
			return enabled;
		}
		catch( e ) {
			return false;
		}
	}();

	if ( !localStorageEnabled ) {
		if ( typeof jQuery !== "undefined" ) {
			warn( "You must enable DOM storage in your browser.", false );
		}
		return;
	}
	
	if (serverEnabled()) {
		// TODO: Figure out a more robust way to determine if this is a module
		// Get the module or AV name as soon as possible
		if (getAVName() === "") {
			var modName = getNameFromURL();
			// Save the module name in localStorage
			localStorage["module_name"] = modName;
			// Log the browser ready event
			log_user_action('', 'document-ready', 'User loaded the ' + modName + ' module page');
		} else {
			// Log the browser ready event
			log_user_action(getNameFromURL(), 'document-ready', 'User loaded the page');
		}
		
		// Suggest the user login if they don't have a valid session,
		// update the login link with their name if they do
		if (is_SessionExpired()){
			localStorage.removeItem("opendsa");
			showLoginBox();
		} else {
			var uname = get_user_fromDS();
			$('a.login-window').text(uname);
			update_proficiency_display(uname);
		}
		
		// TODO: Test that this works
		// Add button_logger to all buttons on the page with a data-desc attribute
		//$('input[data-desc]').each(function(index, item){
		// Add button_logger to all buttons on the page
		$(':button').each(function(index, item){
			$(item).click(button_logger);
		});
		
		// Add link_logger to all links on the page
		$('a').each(function(index, item){
			$(item).click(link_logger);
		});

		// Attempts to log the user in when they click submit on the login window
		$('button.submit-button').click(function(event){
			//authenticate user
			username = document.forms["signin"]["username"].value;
			password = document.forms["signin"]["password"].value;
			jQuery.ajax({
				url:   base_url + "/api/v1/users/login/",
				type:  "POST",
				data: {"username":  username , "password": password  },
				contentType: "application/json; charset=utf-8",
				datatype: "json",
				xhrFields: {withCredentials: true},
				success: function(data) {
					var obj = getJSON(data);
				
					if(obj.success){
						updateLocalStorage(username );
					
						localStorage.name=document.forms["signin"]["username"].value; //$('username').attr('value');
						$('a.login-window').text(username);

						log_user_action('', 'user-login', 'User logged in');
						// Submit any stored data
						flush_stored_data();
						
						update_proficiency_display(username);
					}
				},
				error: function(data){ console.log("ERROR " +  JSON.stringify( data ));}
			});
			
			hideLoginBox();
		});

		// Brings up the login box if the user clicks 'Login' and
		// logs the user out if they click their username
		$('a.login-window').click(function() {
			if ($('a.login-window').text() !== get_user_fromDS()){
				showLoginBox();
				return false;
			} else {
				// Submit whatever data we have collected before the user logs out
				flush_stored_data();
				jQuery.ajax({
					url:   base_url + "/api/v1/users/logout/",
					type:  "GET",
					data: {"username":  get_user_fromDS() },
					contentType: "application/json; charset=utf-8",
					datatype: "json",
					xhrFields: {withCredentials: true},
					success: function(data){
						var obj = getJSON(data)
					
						if(obj.success){
							log_user_action('', 'user-logout', 'User logged out');
							localStorage.removeItem('opendsa');
							$('a.login-window').text("Login");
						}
					},
					error: function(data){ console.log("ERROR " +  JSON.stringify( data ));}
				});
			}
		});

		// When clicking on the button close or the mask layer the popup closed
		$('a.close, #mask').live('click', function() {
			hideLoginBox();
		});
	}

	$("input.showLink").click(function(event){
		// If the server is enabled and no user is logged in, prompt them to login
		if (serverEnabled() && !userLoggedIn())
		{
			alert('You must login to complete exercises');
			showLoginBox();
			return;
		}

		var shID = event.target.id;
		var name = $(this).attr("name");
		var av = name.split('+');
		var target = name+'+hide'

		$('input[name="'+target+'"]').after('<p><center> <iframe src="'+av[0]+'" \ntype="text/javascript" width="'+av[1]+'" height="'+av[2]+'" frameborder="0" marginwidth="0" marginheight="0" scrolling="no">\n </iframe></center></p></div>');
		$('input[name="'+target+'"]').attr("name",name);
		showHide(shID);
	});
		
	$("input.hideLink").click(function(event){
		var shID = event.target.id;
		showHide(shID);
	});

	$("a.abt").click(function(event){
		info();
	});
	
	$(".slide-out-div").tabSlideOut({
		tabHandle: '.handle',                              //class of the element that will be your tab
		pathToTabImage: '_static/Images/contact_tab.gif',          //path to the image for the tab *required*
		imageHeight: '122px',                               //height of tab image *required*
		imageWidth: '40px',                               //width of tab image *required*    
		tabLocation: 'left',                               //side of screen where tab lives, top, right, bottom, or left
		speed: 300,                                        //speed of animation
		action: 'click',                                   //options: 'click' or 'hover', action to trigger animation
		topPos: '200px',                                   //position from the top
		fixedPosition: false                               //options: true makes it stick(fixed position) on scroll
	});
});

function showLoginBox() {
	log_user_action('', 'login-box-open', 'Login box was opened');
	
	var loginBox = '#login-box';
	
	// Preload the last saved username in the login form
	var username = localStorage.name;
	if (typeof username !== "undefined") {
		document.forms["signin"]["username"].value = username;
	}

	//Fade in the Popup
	$(loginBox).fadeIn(300);

	//Set the center alignment padding + border see css style
	var popMargTop = ($(loginBox).height() + 24) / 2;
	var popMargLeft = ($(loginBox).width() + 24) / 2;

	$(loginBox).css({
		'margin-top' : -popMargTop,
		'margin-left' : -popMargLeft
	});

	// Add the mask to body
	$('body').append('<div id="mask"></div>');
	$('#mask').fadeIn(300);
}

function hideLoginBox() {
	log_user_action('', 'login-box-close', 'Login box was closed');
	
	$('#mask , .login-popup').fadeOut(300 , function() {
		$('#mask').remove();
	});
	return false;
}

function showHide(shID) {
	var s=shID.split('+');
	var ID=s[0];
	var div_numb = s[0].split('Example').slice(1);
	if (document.getElementById(ID)) {
		if (document.getElementById(shID).style.display != 'none' && s[1]=='show'){
			document.getElementById(shID).style.display = 'none';
			document.getElementById(ID).style.display = 'block';
			var strt = "div.start"+ div_numb;
			$(strt).hide();
		}
		else {
			document.getElementById(s[0]+'+show').style.display = 'inline';
			document.getElementById(ID).style.display = 'none';
			var strt = "div.start"+ div_numb;
			$(strt).hide();   // $('div.start'+div_numb).hide();
		}
	}
}

// Change button color from red to light green when user is proficient
// Displays check marks next to inline AVs the user has completed
function update_proficiency_display(username){
	// Don't bother trying to contact the server if one isn't setup
	if (serverEnabled()) {
		var av_url, av_name, resp;
		
		$('.showLink').each(function(index, item){
			av_url = $(item).attr("name").split("+")[0].split("/");
			av_name = av_url[av_url.length -1].split(".")[0];
			jQuery.ajax({
				url:   base_url + "/api/v1/userdata/isproficient/",
				type:  "POST",
				data: {"user":  get_user_fromDS(),"exercise": av_name },
				contentType: "application/json; charset=utf-8",
				datatype: "json",
				xhrFields: {withCredentials: true},
				success: function(data){
					var obj = getJSON(data);
					
					if(obj.proficient){
						$(item).css("background-color","lime");
					}
				},
				error: function(data){ console.log("ERROR " + "isProficient" /*JSON.stringify( data )*/);}
			});
		});

		$('.hideLink').each(function(index, item){
			av_url = $(item).attr("name").split("+")[0].split("/");
			av_name = av_url[av_url.length -1].split(".")[0];
			jQuery.ajax({
				url:   base_url + "/api/v1/userdata/isproficient/",
				type:  "POST",
				data: {"user":  get_user_fromDS(),"exercise": av_name },
				contentType: "application/json; charset=utf-8",
				datatype: "json",
				xhrFields: {withCredentials: true},
				success: function(data){
					var obj = getJSON(data);
					
					if(obj.proficient){
						$(item).css("background-color","lime");
					}
				},
				error: function(data){ console.log("ERROR " + "isProficient" /*JSON.stringify( data )*/);}
			});
		});
		
		// Check proficiency of all inline AVs
		$('img.prof_check_mark').each(function(index, item){
			av_name = $(item).attr('id').replace("_check_mark", '');
			console.log("checking for proficiency of: " + av_name);
		
			jQuery.ajax({
				url:   base_url + "/api/v1/userdata/isproficient/",
				type:  "POST",
				data: {"user":  get_user_fromDS(),"exercise": av_name },
				contentType: "application/json; charset=utf-8",
				datatype: "json",
				xhrFields: {withCredentials: true},
				success: function(data){
					var obj = getJSON(data);
					
					if(obj.proficient){
						mark_inline_av_completed(av_name);
					}
				},
				error: function(data){ console.log("ERROR " + "isProficient" /*JSON.stringify( data )*/);}
			});
		});
	}
}

function info() { // This is what we pop up
	var loc = window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1);
	if (loc==""){
		loc="index.html";
	}
	var mod = loc.split('.');
	outcome = -1 
	$.ajax({
		url: 'modules.json',
		async: false,
		dataType: 'json',
		success: function (data) {
			$.each(data, function(key, val) {
				if(val.fields.short_display_name.toLowerCase()==mod[0].toLowerCase()){
					var mystring = mod[0] +"\nWritten by "+val.fields.author +" \nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nFile created: "+val.fields.last_modified +"\nJSAV library version " + JSAV.version();
					outcome = 1  
					alert(mystring);
				}
			});
		}
	});
	
	if (outcome == -1) {  
		var mystring = mod[0] +" \nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nJSAV library version " + JSAV.version();
		alert(mystring);  
	} 
}

function updateLocalStorage(username ) {
	var myDate=new Date();
	myDate.setDate(myDate.getDate()+5);  //the session is valid 5 days
	var strSession = '{"username" :"'+ username + '", "expires" :"'+ myDate + '"}';
	localStorage["opendsa"] = strSession;
}

function is_SessionExpired() {
	if ( typeof localStorage["opendsa"] !== "undefined" ) {
		var  bj = JSON.parse( localStorage["opendsa"]);
		sDate = bj.expires;
		var cDate=new Date();
		return sDate <= cDate;
	}
	return true;
}

function get_user_fromDS() {
	if ( typeof localStorage["opendsa"] !== "undefined" ) {
		var obj = JSON.parse(localStorage["opendsa"]);
		return obj.username;
	}
	return "";
}

// Determine if the backend metrics collection server is enabled
function serverEnabled() {
	return (server !== "");
}

function userLoggedIn() {
	return (get_user_fromDS() !== "");
}

// Reads the module name from localStorage
function getModuleName() {
	if ( typeof localStorage["module_name"] !== "undefined" ) {
		return localStorage.module_name;
	}
	return "";
}

// Parses the name of the AV or module from the page URL
function getNameFromURL()
{
	var path = location.pathname;
	var start = path.lastIndexOf("/") + 1;
	var end = path.lastIndexOf(".html");
	return path.slice(start, end);
}

function getAVName() {
	// TODO: Find a better way to determine whether the page is a module or not
	if (document.title.match(".+OpenDSA Sample eTextbook") != null) {
		return "";
	} else {
		return getNameFromURL();
	}
}

// Returns the given data as a JSON object
// If given a string, converts it to JSON
// If given a JSON object, does nothing
function getJSON(data) {
	if (typeof data === "string") {
		data = jQuery.parseJSON( data );
	}

	if (data == null) {
		console.log("Error parsing JSON data: " + JSON.stringify(data));
	}

	return data;
}

//*****************************************************************************
//****************       Logging and Metrics Collection        ****************
//*****************************************************************************

if (serverEnabled()) {
	$(window).on('beforeunload', function() {
		// Log the browser unload event
		log_user_action('', 'window-unload', 'User closed or refreshed the page');

		// Remove the module name when they leave the module page
		if ( getModuleName() !== "" ) {
			localStorage.removeItem('module_name');
		}
	});

	// Listen for JSAV events
	$("body").on("jsav-log-event", function(e, data) { 
		console.log(data);    // TODO: FOR DEBUGGING
		
		data.desc = data.type;

		// Save the event in localStorage
		log_event(data);
		
		if (data.type === "jsav-exercise-grade-change") {
			// On grade change events, log the user's score and submit it
			store_av_score(data.av, data.score);
			flush_stored_data();
		} else if (data.type === "jsav-forward" && data.currentStep == data.totalSteps) {
			// When a user reaches the end of an AV, store and submit a completion score
			var score = {};
			score.student = data.currentStep;
			score.correct = data.currentStep;
			score.total = data.totalSteps;
			score.fix = 0;
			score.undo = 0;
			
			// Store and submit the score
			store_av_score(data.av, score);
			flush_stored_data();
			
			// Mark the AV as completed
			mark_inline_av_completed(data.av);
		}
	});
}

// If the given AV has a completion check mark, make it visible
function mark_inline_av_completed(av_name)
{
	var profMark = $("img#" + av_name + "_check_mark");
	if (profMark !== "undefined")
	{
		profMark.css('display', 'block');
	}
}

// The function OpenDSA developers will call to log the initialization of an array
function log_exercise_init_array(av_name, arr) {
	if (serverEnabled()) {
		log_user_action(av_name, 'exercise_initialization', '[' + initialArray.toString() + ']');
	}
}

// Default function to handle logging button clicks
function button_logger() {
	if (serverEnabled()) {
		var type = this.type + "-" + this.value;
		var av_name = getAVName();
		
		if (av_name === "" && this.form != null) {
			av_name = this.form.id;
		}
		
		var desc = "";
		
		// TODO: Find a better way to get the description for a button
		if (this.getAttribute('data-desc') !== null) {
			desc = this.getAttribute('data-desc');
		} else if (this.id !== "") {
			desc = this.id;
		} else if (this.name !== "") {
			desc = this.name;
		}
		
		log_user_action(av_name, type, desc);
	}
}

// Default function to handle logging hyperlink clicks
function link_logger() {
	if (serverEnabled()) {
		// TODO: Find a better way to log links
		log_user_action('', 'hyperlink', $(this).html() + "(" + this.href + ")");
	}
}

// The function OpenDSA developers will call to log a user action
function log_user_action(av_name, type, desc) {
	if (serverEnabled()) {
		
		console.log("log_user_action(" + av_name + ", " + type + ", " + desc +");"); 	// TODO: FOR TESTING
		
		var json_data = {};
		json_data.av = av_name;
		json_data.type = type;
		json_data.desc = desc;
		log_event(json_data);
	}
}

// Appends given JSON data to a list of events stored in localStorage
function log_event(data) {
	if (serverEnabled()) {
		data = getJSON(data);
		
		console.log("logging: " + data.desc);		//TODO: FOR TESTING
		
		var modName = getModuleName();
		
		// Don't log events without either an AV name or a module name
		// Getting duplicates of some events where one is missing both
		// Currently all legitimate events should have one or the other
		if (data.av === "" && modName === "") {
			return;
		}
		
		data.modname = modName;
		
		// Add a timestamp to the data
		if (typeof data.tstamp !== "undefined") {
			// Convert existing JSAV timestamp from ISO format to milliseconds
			data.tstamp = new Date(data.tstamp).getTime();
		} else {
			data.tstamp = (new Date()).getTime();
		}
		
		var actions_list = new Array();

		// Retrieve existing data from localStorage if it exists
		if ( typeof localStorage["event_data"] !== "undefined" ) {
			actions_list = getJSON(localStorage["event_data"]);
		}

		actions_list.push(data);

		localStorage["event_data"] = JSON.stringify(actions_list);
	}
}

// Stores the user's score for an AV / exercise
function store_av_score(av_name, score) {
	if (serverEnabled()) {
		var score_data = {};
		
		// Get stored score_data if it exists
		if ( typeof localStorage["score_data"] !== "undefined" ) {
			score_data = getJSON(localStorage["score_data"]);
		}
		
		// Store data if no data for the current AV is already stored or
		// update the score data if the given score data is >= what is stored
		if (typeof score_data[av_name] === "undefined" || (typeof score_data[av_name] !== "undefined" && score.correct >= score_data[av_name].score.correct)) {
			var data = {};
			data.submit_time = (new Date).getTime();
			data.module_name = getModuleName();
			data.score = score;
			data.attempt = 0;		// TODO: Figure out how to record attempts
			data.total_time = 0;	// TODO: Figure out how to record total time
			score_data[av_name] = data;
			
			localStorage["score_data"] = JSON.stringify(score_data);
		}
	}
}

// Sends stored event data and any stored AV scores
function flush_stored_data() {
	if (serverEnabled()) {
		send_event_data();
		send_av_scores();
	}
}

// Sends the event data logged in localStorage to the server
function send_event_data() {
	if (serverEnabled() && userLoggedIn()) {
		var event_list = getJSON(localStorage["event_data"]);

		// Return if there is no data to send
		if (event_list.length == 0) {
			return true;
		}

		var json_data = {};
		json_data.username = get_user_fromDS();
		// Timestamp the submission so we can calculate offset from server time
		json_data.submit_time = (new Date()).getTime();
		json_data.actions = JSON.stringify(event_list);		// TODO: Find a better way to send this list so that Django can still interpret it
		
		// Send the data to the server
		jQuery.ajax({
			url:   base_url + "/api/v1/user/exercise/avbutton/",
			type:  "POST",
			data: json_data,
			contentType: "application/json; charset=utf-8",
			datatype: "json",
			xhrFields: {withCredentials: true},
			success: function(data) {
				data = getJSON(data);
				// Clear the saved data once it has been successfully transmitted
				if (data.success) {
					localStorage.removeItem('event_data');
				}
			},
			error: function(data) {
				console.log("ERROR " +  JSON.stringify( data ));
			}
		});
	}
}

// Loops through and sends all stored AV scores
function send_av_scores() {
	if (serverEnabled()) {
		var score_data = {};
		
		// Get stored score_data if it exists
		if ( typeof localStorage["score_data"] !== "undefined" ) {
			score_data = getJSON(localStorage["score_data"]);
		}
		
		// Return if there is no score data
		if (score_data === {}) {
			return;
		}
		
		for (var av_name in score_data) {
			send_av_score(av_name);
		}
	}
}

// Sends a the score for a single AV
function send_av_score(av_name) {
	if (serverEnabled()) {
		// Load stored score data from localStorage
		var score_data = {};
		if ( typeof localStorage["score_data"] !== "undefined" ) {
			score_data = getJSON(localStorage["score_data"]);
		}
		
		// Return if there is no score data
		if (score_data === {}) {
			return;
		}
			
		if (userLoggedIn()) {
			var username = get_user_fromDS();
		
			var json_data = score_data[av_name];
			json_data.av = av_name;
			json_data.username = username;
			
			jQuery.ajax({
				url:   base_url + "/api/v1/user/exercise/attemptpe/",
				type:  "POST",
				data: json_data,
				contentType: "application/json; charset=utf-8",
				datatype: "json",
				xhrFields: {withCredentials: true},
				success: function(data){
					data = getJSON(data);
					
					// Clear the saved data once it has been successfully transmitted
					if (data.success) {
						delete score_data[av_name];
					}
					
					// Check whether the user is proficient
					if (data.proficient) {
						update_proficiency_display(username);
					}
				},
				error: function(data) {
					//console.log("ERROR " +  JSON.stringify( data ));
				}
			});
		} else {
			alert('You must be logged in to receive credit');
		}
	}
}

/*
// TODO: Fix the Django server to accept batch scores
// Send a batch of AV scores
function send_av_scores() {
	if (serverEnabled()) {
		// Load stored score data from localStorage
		var score_data = {};
		if ( typeof localStorage["score_data"] !== "undefined" ) {
			score_data = getJSON(localStorage["score_data"]);
		}
		
		// Return if there is no score data
		if (score_data === {}) {
			return;
		}
			
		if (userLoggedIn()) {
			var username = get_user_fromDS();
		
			var json_data = {};
			json_data.username = username;
			// Timestamp the submission so we can calculate offset from server time
			json_data.submit_time = (new Date()).getTime();
			json_data.avs = score_data;
			
			jQuery.ajax({
				url:   base_url + "/api/v1/user/exercise/attemptpe/",
				type:  "POST",
				data: json_data,
				contentType: "application/json; charset=utf-8",
				datatype: "json",
				xhrFields: {withCredentials: true},
				success: function(data){
					data = getJSON(data);
					
					// Clear the saved data once it has been successfully transmitted
					if (data.success) {
						localStorage.removeItem('score_data');
					}
					
					// Check whether the user is proficient
					if (data.proficient) {
						update_proficiency_display(username);
					}
				},
				error: function(data) {
					//console.log("ERROR " +  JSON.stringify( data ));
				}
			});
		} else {
			alert('You must be logged in to receive credit');
		}
	}
}


// Original attempt to log user actions to localStorage
function log_event_old(data) {

	if (typeof data === "string")
	{
		data = $.parseJSON(data);
	}

	if ( typeof localStorage["event_data"] !== "undefined" ) {
		var stored_data = $.parseJSON(localStorage["event_data"]);

		if (typeof stored_data === "undefined")
		{
			$.parseJSON(JSON.stringify(localStorage["event_data"]));
		}

		var tmp_data = stored_data.actions.push(data);
		
		localStorage["event_data"] = JSON.stringify(stored_data); // user_data.actions.push(data);
	} else {
		var json = {"username": get_user_fromDS(), "actions":[data]};
		localStorage["event_data"] = JSON.stringify(json);
	}
	
	//alert(localStorage["event_data"]);
	//alert("str: " + JSON.stringify(($.parseJSON(localStorage["event_data"])).actions[0]));
}
*/









/**
*
*  Secure Hash Algorithm (SHA1)
*  http://www.webtoolkit.info/
*
**/

function SHA1 (msg) {

	function rotate_left(n,s) {
		var t4 = ( n<<s ) | (n>>>(32-s));
		return t4;
	};

	function lsb_hex(val) {
		var str="";
		var i;
		var vh;
		var vl;

		for( i=0; i<=6; i+=2 ) {
			vh = (val>>>(i*4+4))&0x0f;
			vl = (val>>>(i*4))&0x0f;
			str += vh.toString(16) + vl.toString(16);
		}
		return str;
	};

	function cvt_hex(val) {
		var str="";
		var i;
		var v;

		for( i=7; i>=0; i-- ) {
			v = (val>>>(i*4))&0x0f;
			str += v.toString(16);
		}
		return str;
	};


	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	};

	var blockstart;
	var i, j;
	var W = new Array(80);
	var H0 = 0x67452301;
	var H1 = 0xEFCDAB89;
	var H2 = 0x98BADCFE;
	var H3 = 0x10325476;
	var H4 = 0xC3D2E1F0;
	var A, B, C, D, E;
	var temp;

	msg = Utf8Encode(msg);

	var msg_len = msg.length;

	var word_array = new Array();
	for( i=0; i<msg_len-3; i+=4 ) {
		j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
		msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
		word_array.push( j );
	}

	switch( msg_len % 4 ) {
		case 0:
			i = 0x080000000;
		break;
		case 1:
			i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
		break;

		case 2:
			i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
		break;

		case 3:
			i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8	| 0x80;
		break;
	}

	word_array.push( i );

	while( (word_array.length % 16) != 14 ) word_array.push( 0 );

	word_array.push( msg_len>>>29 );
	word_array.push( (msg_len<<3)&0x0ffffffff );


	for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {

		for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
		for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);

		A = H0;
		B = H1;
		C = H2;
		D = H3;
		E = H4;

		for( i= 0; i<=19; i++ ) {
			temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}

		for( i=20; i<=39; i++ ) {
			temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}

		for( i=40; i<=59; i++ ) {
			temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}

		for( i=60; i<=79; i++ ) {
			temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B,30);
			B = A;
			A = temp;
		}

		H0 = (H0 + A) & 0x0ffffffff;
		H1 = (H1 + B) & 0x0ffffffff;
		H2 = (H2 + C) & 0x0ffffffff;
		H3 = (H3 + D) & 0x0ffffffff;
		H4 = (H4 + E) & 0x0ffffffff;

	}

	var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

	return temp.toLowerCase();

}
