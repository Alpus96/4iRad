function writeHighScore(hsList){
	console.log(hsList);
// create the HighScore list
    for(let hs in hsList){
       
        let propertyValeu = hsList[hs];
		console.log(hsList, propertyValeu);
        $('#hs').append(' <div class=""><div class="well-sm"><h3>Namn:<h/3><p>'+propertyValeu.Name+'</p><h3>Score:</h3><P>'+propertyValeu.score+'<p> </div></div>');
    }
       
    
}