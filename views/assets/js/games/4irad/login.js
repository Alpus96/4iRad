$(document).ready(function(){
    addClickHandlersForButtons();
});

function addClickHandlersForButtons(){
    
    $('#login1').click(function(){
        let name = $("#iUsername").val();
        let password = $('#iPassword').val();
        
        if(!isNaN(name)){
              alert("Name is not valid 11");
              return false;
            }
        if(password.length<8 || !isNaN(password)){
            alert("Password is not valid");
            return false;
         }
         window.location.hash = '#spel';
             
    });

    $('#logout').click(function() {
        window.location.hash = '#home';
    });

}