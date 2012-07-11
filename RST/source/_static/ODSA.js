$(document).ready(function()    {
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
	    console.log('test+=' + window.location.pathname);
	    info();
        });

});
 function showHide(shID) { 
     var s=shID.split('+');
         var ID=s[0];    

         if (document.getElementById(ID)) { 
            if (document.getElementById(shID).style.display != 'none' && s[1]=='show'){
              document.getElementById(shID).style.display = 'none';
              document.getElementById(ID).style.display = 'block';
              if (document.getElementById('start')){ 
                 document.getElementById('start').style.display = 'none';
              } 
            }
            else {
             document.getElementById(s[0]+'+show').style.display = 'inline';
             document.getElementById(ID).style.display = 'none';
             if (document.getElementById('start')){
                 document.getElementById('start').style.display = 'none';
              } 
            }
           }
  }

function info() { // This is what we pop up

 var loc = window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1);
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

