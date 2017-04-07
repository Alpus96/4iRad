$(document).ready(function(){
    $(".white-and-round").hover(function(){
        $(this).css("background-color", "yellow");},
          function(){
        $(this).css("background-color", "white");
    
    });
    $(".col-md-1").click(function(){
    	console.log(
    		$(this).find('.white-and-round').css('background-color')
    	);
    });



    function resizer(){
    	// Set the height of white-and-round to its witdh
    	let w = $('.white-and-round').width();
    	$('.white-and-round').height(w);
    }
   	$(window).resize(resizer); // run resizer each time the window changes size
   	resizer(); // and run it once initially too



});
