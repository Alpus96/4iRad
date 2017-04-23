$(document).ready(function(){
	$('#field').on('click', function (event) {
		console.log($('#filed').width(), $('#filed').height());
	});
});

class Player{

	constructor(score,name,colore, coins,id,mail,password){
		this.id =id;
		this.name = name;
		this.score= score;
		this.colore= colore;
		this.coins= coins;
		this.mail= mail;
		this.password =password;
	}
	
}
class Player1 extends Player{
	
	constructor(score=0,name="Björn",colore="green",id=1, coins=21,mail,password){
		super(name, score);
		this.id=id;
		this.colore= colore;
		this.name= name;
		this.score=score;
		this.coins= coins;
		this.mail =mail;
		this.password =password;
	}
}
class Player2 extends Player{
	
	constructor(score=0, name="Lisa",colore="red",id=2, coins=21,mail,password){
		super(name, score)
		this.id=id;
		this.colore= colore;
		this.name= name;
		this.score=score;
		this.coins= coins;
		this.mail= mail;
		this.password =password;
	}
}
class Computer {

	constructor(difficulty){
		this.difficulty = difficulty;
	}
}
class Eesy extends Computer{

	easyCalculate(difficulty= Eesy){
		this.difficulty = difficulty;
		
	}
	 makeMove(){

		let column = Math.random();
		let c= column*7;
		Math.round(c);
		return c;
		console.log(c);
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

