class Player{

	constructor(score,name){
		this.name = name;
		this.score= score;

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