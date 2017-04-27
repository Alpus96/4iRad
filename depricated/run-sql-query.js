class RunSqlQuery {

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

}