$(document).ready(function()    {
  $("input.showLink").click(function(event){
            var shID = event.target.id;
            showHide(shID);
        });
  $("input.hideLink").click(function(event){
            var shID = event.target.id;
            showHide(shID);
        });
});
 function showHide(shID) { 
     var s=shID.split('-');
         var ID=s[0];    
          
         if (document.getElementById(ID)) { 
            if (document.getElementById(shID).style.display != 'none' && s[1]=='show'){
              document.getElementById(shID).style.display = 'none';
              document.getElementById(ID).style.display = 'block';
            }
            else {
             document.getElementById(s[0]+'-show').style.display = 'inline';
             document.getElementById(ID).style.display = 'none';
            }
           }
  }

