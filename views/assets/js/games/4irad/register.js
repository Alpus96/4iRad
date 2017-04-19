$(document).ready(function(){
    addClickHandlersForButtons();
});

function addClickHandlersForButtons(){

    $('#Reg').click(function(){
        let name = $('#inputUsername').val();
        let mail = $('#inputEmail').val();
        let password = $('#inputPassword').val();
        
        if(!isNaN(name)){
              alert("Name is not valid");

            }
        if(password.length<8 || !isNaN(password)){

            alert("Password is not valid");
            }
        if(!isNaN(mail)){
            alert("Enter valid email-Id");
        }    
     });        
}