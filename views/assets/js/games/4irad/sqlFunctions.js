//get name and score from highscore decending

new RunSqlQuery(
  'getNameAndScore',
  function(response){
    console.log('getNameAndScore',response);
  }
);

// Adding player1 to highscore list
new RunSqlQuery(
  'addToHighscore',
  {name:'.player1.name',score:'player1.score',playerid:'player1.id'},
  function(response){
    console.log('addToHighscore',response);
  }
);
//Addin users
new RunSqlQuery(
  'addUsers',
   {name:'.player1.name',score:'player1.score',colore:'player1.colore',Mail:'player1.mail',passwod:'player1.passwod'},
  function(response){
    console.log('theOwnerOfAnAnimal',response);
  }
);

//Addin users
new RunSqlQuery(
  'getAllUsers',
  function(response){
    console.log('getAllUsers',response);
  }
);