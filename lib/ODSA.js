$(document).ready(function()    {
  $("input.showLink").click(function(event){
            var shID = event.target.id;
            var name = $(this).attr("name");
            var av = name.split('+');
            var target = name+'+hide'
            $('input[name="'+target+'"]').after('<center>\n <iframe src="'+av[0]+'" \ntype="text/javascript" width="'+av[1]+'" height="'+av[2]+'" frameborder="0" marginwidth="0" marginheight="0" scrolling="no">\n </iframe></center></div>');
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

