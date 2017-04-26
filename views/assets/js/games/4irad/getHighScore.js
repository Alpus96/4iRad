function writeHighScore(hsList){
	console.log(hsList);
	// create the HighScore list
	let counter =0;
    for(let hs in hsList){
    	counter++;

        let propertyValeu = hsList[hs];
		console.log(hsList, propertyValeu);
        $('#hs').append(' <div class="centerText"><div class="well-sm"><h4>Ranking: ' +counter+  ' <b>' +propertyValeu.Name+  '</b>  Antal drag: '  +propertyValeu.score+' </h4></div></div>');
    }
}
