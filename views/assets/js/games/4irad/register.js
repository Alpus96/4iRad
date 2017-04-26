/*class RunSqlQuery {

  constructor(queryName,data = {},callbackFunc){

    if(typeof data == 'function'){
      callbackFunc = data;
      data = {};
    }
    
    $.ajax({
      url: 'query/' + queryName,  
      method: 'POST',
      dataType: 'json',
      data: {data:data},
      success: function(response){
        callbackFunc(response);
      },
      error: function(err){
        callbackFunc({error:err});
      }
    })
  
  }

}*/
/*
Url: “/register”
localhost:3000/register
data: {username: ‘’, password: ‘’}*/



$(document).ready(function(){
    addClickHandlersForRegistrationButtons();
});

function addClickHandlersForRegistrationButtons(){

    $('#iRegistration').click(function(){
       
        let name = $('#iname').val();
        let mail = $('#iEmail').val();
        let password = $('#iRegPassword').val();
        //alert(name + mail +password);
            if(!isNaN(name)){
                  alert("Name is not valid");
                  return false;
              }     
            
            if(!isNaN(mail)){
                     alert("Enter valid email-Id");
                     return false;
                  }
            if(password.length<8 || !isNaN(password)){
                    alert("Password is not valid");
                  return false;
              }       
                     window.location.hash = '#log';     
     });        
}