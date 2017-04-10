$(document).ready(function(){
	$('#field').on('click', function (event) {
		console.log($('#filed').width(), $('#filed').height());
	});
});

class Player{

	constructor(score,name,colore, coins,id){
		this.id =id;
		this.name = name;
		this.score= score;
		this.colore= colore;
		this.coins= coins;
	}
	
}
class Computer extends Player{

	constructor(difficulty){
		this.difficulty = difficulty
	}
}
class Eesy extends Computer{

	easyCalculate(){
		
	}
}
class Medium extends Computer{

	mediumCalculate(){

	}
}
class Hard extends Computer{

	hardCalculate(){

	}
}

