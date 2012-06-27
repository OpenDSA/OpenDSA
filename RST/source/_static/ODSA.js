$(document).ready(function()    {
  $("input.showLink").click(function(event){
            var shID = event.target.id;
            var name = $(this).attr("name");
            var target = name+'+hide'
            $('input[name="'+target+'"]').after('<center><div="embedHere"></div><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script><script type="text/javascript">$(function() { $.getJSON("http://algoviz.org/oembed/?url='+name+'&callback=?", function(data) {$("#embedHere").html(data.html); })});</script></center>');
            $('input[name="'+target+'"]').attr("name",name);
            showHide(shID);
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

