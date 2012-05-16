var attempt = 0;   
var st; 
var user='';
$(document).ready(function(){

  //from khan-exercises.js
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


  window.addEventListener('message',function(event) {
   if(event.origin !== 'http://algoviz-beta.cc.vt.edu') return;
   if(event.data.indexOf("user")>=0){ 
      var obj = jQuery.parseJSON(event.data);
      user = obj.user;  
   }  
   console.log('received response:  ',event.data);
 },false);



  $('button.submit-button').click(function(event){
     
     localStorage.name=document.forms["signin"]["username"].value;            //$('username').attr('value');
     console.log("username=="+localStorage.name); 
     $('#mask , .login-popup').fadeOut(300 , function() {
                $('#mask').remove();
        });

  });


$('input.login-window').click(function() {

                //Getting the variable's value from a link 
		var loginBox = $(this).attr('name');

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
	});
	
	// When clicking on the button close or the mask layer the popup closed
	$('a.close, #mask').live('click', function() { 
	  $('#mask , .login-popup').fadeOut(300 , function() {
		$('#mask').remove();  
	}); 
	return false;
	});





  $("input.showLink").click(function(event){
            var shID = event.target.id;
            var name = $(this).attr("name");
            var av = name.split('+');
            var target = name+'+hide'
            var ifrID ='iframe_'+shID;
            $('input[name="'+target+'"]').after('<p><center> <iframe id="'+ifrID+'" src="'+av[0]+'" \ntype="text/javascript" width="'+av[1]+'" height="'+av[2]+'" frameborder="0" marginwidth="0" marginheight="0" scrolling="no">\n </iframe></center></p></div>');
            $('input[name="'+target+'"]').attr("name",name);
            showHide(shID);
          
           var domain = 'http://algoviz-beta.cc.vt.edu';
           var iframe = document.getElementById(ifrID).contentWindow;
           var message = '{"user":"'+localStorage.name+'"}';   
           console.log('blog.local:  sending message:  ' + message);
           setTimeout(function(){iframe.postMessage(message,domain);},1250); //send the message and target URI set a timeout to make sure the iframe elements are loaded     


        });
  $("input.hideLink").click(function(event){
            var shID = event.target.id;
            showHide(shID);
        });


});



 function showHide(shID) { 
     var s=shID.split('+');
         var ID=s[0];    
          
         if (document.getElementById(ID)) { 
            if (document.getElementById(shID).style.display != 'none' && s[1]=='show'){
              document.getElementById(shID).style.display = 'none';
              document.getElementById(ID).style.display = 'block';
            }
            else {
             document.getElementById(s[0]+'+show').style.display = 'inline';
             document.getElementById(ID).style.display = 'none';
            }
           }
  }

//for each exercise check the number of attempt from the localStorage and the server
//and adjust accordingly
var initAttempt = function(){

   if(localStorage.name==user){
      if(localStorage.getItem('attempt')!=0){
           attempt=localStorage.getItem('attempt');
      }
   else{

   }

}
}
var getAttempt = function(){
   return attempt;
}

var incrAttempt = function(){
   attempt++;
}


var getAttemptTime = function(){
   var currentTime = new Date()
   var month = currentTime.getMonth() + 1
   var day = currentTime.getDate()
   var year = currentTime.getFullYear()
   return month + "/" + day + "/" + year;   

}




function Stopwatch(){
  var startTime, endTime, instance = this;

  this.start = function (){
    startTime = new Date();
  };

  this.stop = function (){
    endTime = new Date();
  }

  this.clear = function (){
    startTime = null;
    endTime = null;
  }

  this.getSeconds = function(){
    if (!endTime){
    return 0;
    }
    return Math.round((endTime.getTime() - startTime.getTime()) / 1000);
  }

  this.getMinutes = function(){
    return instance.getSeconds() / 60;
  }      
  this.getHours = function(){
    return instance.getSeconds() / 60 / 60;
  }    
  this.getDays = function(){
    return instance.getHours() / 24;
  }   
}
