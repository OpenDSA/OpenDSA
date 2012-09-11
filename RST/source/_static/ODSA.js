var server = "128.173.55.223:8080"; //"128.173.54.186:8000";
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

	if (is_SessionExpired()){
		localStorage.removeItem("opendsa");
	} else {
		var uname = get_user_fromDS();
		$('a.login-window').text(uname);
		update_show_hide_button(uname);
	}

	$("input.showLink").click(function(event){
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
				var obj = jQuery.parseJSON( data );
				
				// Chrome doesn't read 'data' correctly so we have to stringify it
				if (obj == null) {
					obj = jQuery.parseJSON(JSON.stringify( data ));
				}
				
				if(obj.success){
					updateLocalStorage(username );
					
					localStorage.name=document.forms["signin"]["username"].value; //$('username').attr('value');
					$('a.login-window').text(username);
                                        update_show_hide_button(username);
				}
			},

			error: function(data){ alert("ERROR " +  JSON.stringify( data ));}
		});

		$('#mask , .login-popup').fadeOut(300 , function() {
			$('#mask').remove();
		});
	});

	// Brings up the login box if the user clicks 'Login' and
	// logs the user out if they click their username
	$('a.login-window').click(function() {
		if ($('a.login-window').text() !== get_user_fromDS()){
			//Getting the variable's value from a link
			var loginBox = $(this).attr('name');

			// Preload the last saved username in the login form
			var username = localStorage.name;
			if (typeof username !== "undefined")
			{
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

			return false;
		} else {
			jQuery.ajax({
				url:   base_url + "/api/v1/users/logout/",
				type:  "GET",
				data: {"username":  get_user_fromDS() },
				contentType: "application/json; charset=utf-8",
				datatype: "json",
				xhrFields: {withCredentials: true},
				success: function(data){
					var obj = jQuery.parseJSON( data );
					
					if (obj == null) {
						obj = jQuery.parseJSON(JSON.stringify( data ));
					}
					
					if(obj.success){
						localStorage.removeItem('opendsa');
						//clearLocalStorage();
						$('a.login-window').text("Login");
					}
				},
				error: function(data){ alert("ERROR " +  JSON.stringify( data ));}
			});
		}
	});

	// When clicking on the button close or the mask layer the popup closed
	$('a.close, #mask').live('click', function() {
		$('#mask , .login-popup').fadeOut(300 , function() {
			$('#mask').remove();
		});
		return false;
	});
});


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

function info() { // This is what we pop up
	var loc = window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1);
	if (loc==""){
		loc="index.html";
	}
	var mod = loc.split('.');
	$.ajax({
		url: 'modules.json',
		async: false,
		dataType: 'json',
		success: function (data) {
			$.each(data, function(key, val) {
				if(val.fields.short_display_name.toLowerCase()==mod[0].toLowerCase()){
					var mystring = mod[0] +"\nWritten by "+val.fields.author +" \nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nFile created: "+val.fields.last_modified +"\nJSAV library version " + JSAV.version();
					alert(mystring);
				}
			});
		}
	});
}

// Clears the values we store in localstorage
function clearLocalStorage() {
	localStorage.removeItem('name');
	localStorage.removeItem('opendsa');
}

function updateLocalStorage(username ){
	var myDate=new Date();
	myDate.setDate(myDate.getDate()+5);  //the session is valid 5 days
	var strSession = '{"username" :"'+ username + '", "expires" :"'+ myDate + '"}';
	localStorage["opendsa"] = strSession;
}

function is_SessionExpired(){
	if ( typeof localStorage["opendsa"] !== "undefined" ) {
		var  bj = JSON.parse( localStorage["opendsa"]);
		sDate = bj.expires;
		var cDate=new Date();
		return sDate <= cDate;
	}
	return true;
}


function get_user_fromDS(){
	if ( typeof localStorage["opendsa"] !== "undefined" ) {
		var obj = JSON.parse(localStorage["opendsa"]);
		return obj.username;
	}
	return "";
}

//change button color from red to light green when user is proficient
function update_show_hide_button(username){
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
				var obj = jQuery.parseJSON( data );

				if (obj == null) {
						obj = jQuery.parseJSON(JSON.stringify( data ));
				}
				if(obj.proficient){
						$(item).css("background-color","lime");
				}
			},
			error: function(data){ console.log("ERROR " +  JSON.stringify( data ));}
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
				var obj = jQuery.parseJSON( data );

				if (obj == null) {
						obj = jQuery.parseJSON(JSON.stringify( data ));
				}
				if(obj.proficient){
						$(item).css("background-color","lime");
				}
			},
			error: function(data){ console.log("ERROR " +  JSON.stringify( data ));}
		});
	});
}

// Posts the given JSON data to the specified URL
function send_data(url_suffix, json_data) {
	if (typeof json_data === "string")
	{
		json_data = $.parseJSON(json_data);
	}

	jQuery.ajax({
		url:   base_url + url_suffix,
		type:  "POST",
		data: json_data,
		contentType: "application/json; charset=utf-8",
		datatype: "json",
		xhrFields: {withCredentials: true},
		success: function(data){
			var obj = jQuery.parseJSON( data );
			if (obj == null) {
				obj = jQuery.parseJSON(JSON.stringify( data ));
			}
			
			if(obj.success) {
				return true;
			}
		},
		error: function(data){
			console.log("ERROR " +  JSON.stringify( data ));
		}
	});
	
	return false;
}

// Sends the user action data logged in localStorage to the server
function send_stored_data() {
	var action_list = $.parseJSON(localStorage["user_action_data"]);

	var json_data = {};
	json_data.username = get_user_fromDS();
	json_data.actions = action_list;
	
	var success = send_data("/api/v1/user/exercise", json_data); // TODO: Need URL to send the data to
	
	// Clear the saved data once it has been
	if (success) {
		localStorage.removeItem('user_action_data');
		return true;
	}
	
	return false;
}

// Appends given JSON data to a list of user actions stored in localStorage
function log_to_LS(data) {
	if (typeof data === "string")
	{
		data = $.parseJSON(data);
	}
	
	// Add a timestamp to the data
	data.timestamp = (new Date()).getTime();
	
	var actions_list = new Array();

	// Retrieve existing data from localStorage if it exists
	if ( typeof localStorage["user_action_data"] !== "undefined" ) {
		actions_list = $.parseJSON(localStorage["user_action_data"]);

		if (typeof stored_data === "undefined")
		{
			actions_list = $.parseJSON(JSON.stringify(localStorage["user_action_data"]));
		}
	}
	
	actions_list.push(data);
	
	localStorage["user_action_data"] = JSON.stringify(actions_list);
}

// The function OpenDSA developers will call to log a user action
function log_user_action(exercise_name, button_class) {
	var json_data = {};
	// TODO: What data fields do we need???
	json_data["exercise-name"] = exercise_name;
	json_data["button-class"] = button_class;
	log_to_LS(json_data);
}

// Attempt to send data before the user leaves the page
$(window).on('beforeunload', function() {
	send_stored_data();
	//if (localStorage["user_action_data"] != null)
	//{
	//	return "Page contains unsubmitted data";
	//}
});


// FOR TESTING
function test_log()
{
	log_user_action("quicksort-proficiency", "reset");
}

// FOR TESTING
function submit_score()
{
	var success = send_stored_data();
	
	if (success)
	{
		alert("Data submitted successfully");
	} else {
		alert("Data submission failure");
	}
}

/*
// Original attempt to log user actions to localStorage
function log_to_LS_old(data) {

	if (typeof data === "string")
	{
		data = $.parseJSON(data);
	}

	if ( typeof localStorage["user_action_data"] !== "undefined" ) {
		var stored_data = $.parseJSON(localStorage["user_action_data"]);

		if (typeof stored_data === "undefined")
		{
			$.parseJSON(JSON.stringify(localStorage["user_action_data"]));
		}

		var tmp_data = stored_data.actions.push(data);
		
		localStorage["user_action_data"] = JSON.stringify(stored_data); // user_data.actions.push(data);
	} else {
		var json = {"username": get_user_fromDS(), "actions":[data]};
		localStorage["user_action_data"] = JSON.stringify(json);
	}
	
	//alert(localStorage["user_action_data"]);
	//alert("str: " + JSON.stringify(($.parseJSON(localStorage["user_action_data"])).actions[0]));
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
