$(document).ready(function(){
    deleteBord();
    createBord();
    resizer();
    $(window).resize(resizer);
    columnClick();
    startClick();
    replayClick ();
    cancelClick();
    


    // create the board
    function createBord(){
        for(let i = 0; i <= 6; i++){
            for(let j = 0; j <= 5; j++){
                  $('#Bord').append(' <div class="col row-'+i+'-col-'+j+'"><div class="white-and-round"></div></div>');
            }
        }
    }
    // delete the board
    function deleteBord(){
        for(let i = 0; i <= 6; i++){
            for(let j = 0; j <= 5; j++){
                  $('.row-'+i+'-col-'+j).remove();
            }
        }
    }
function cancelClick(){
    $('#cancel').click(function() 
    { 
        deleteBord();
        window.location.replace("index.html");

    });
}

   /* var width = $(window).width() - 25; 
$("#mydiv").width(width);*/
    let i =6;  
    let counter =0;
    let player1 = new Player(10,"Björn","green",24,1);
    let player2= new Player(50,"Nisse","yellow",24,2);
    let value =1;
    let idval = [];

     function runEffect() {
      // Most effect types need no options passed by default
      var options = {};
      // Run the effect
      $( "#p1" ).effect( "highlight", options, 5000, callback );
    };
    function callback() {
      setTimeout(function() {
        $(this).css( "border",'' );
      }, 1000 );
    };

   /* function vinstKoll(column){

         for(let i = 0; i <= 6; i++){
            for(let j = 0; j <= 5; j++){
                if($(".row-"+i+"-col-"+column).find(".white-and-round").attr("id"))
                {
                 idval =  $('.row-'+i+'-col-'+column).find(".white-and-round").attr("id");
                 console.log(idval[2]);
                }
            }
        }
    }*/

    
    //adding coins

    function addCoin(column){
         counter++;
        
        value = counter%2;
        let coinColor;
        let id;

        if(value===1)
        {
             id = player1.id;
             coinColor = player1.colore;
             $("#p2").css('border','2px solid #E8F558').animate({
            "background-color": player2.colore,
            "border-color": "32a511",
            "border-width": "5px"
            }, 500);
             $("#p1").css('border','');
                
        }
        else if(value===0){
             id = player2.id;
            coinColor = player2.colore;
             $("#p1").css('border','2px solid #E8F558').animate({
            "background-color": player1.colore,
            "border-color": "32a511",
            "border-width": "5px"
            }, 500);
            $("#p2").css('border','');
            
        }
      

             if(i ===6 && !$(".row-"+i+"-col-"+column).find(".white-and-round").attr("id"))
            {
                
                val=i+column+id;
               $(".row-"+i+"-col-"+column).find('.white-and-round').css('background-color',coinColor).attr("id",val);
               speladeCoins();
               
            }
            else if(i===6){
                 i--;   
            }
       
            if(i ===5 && !$(".row-"+i+"-col-"+column).find(".white-and-round").attr("id"))
            {
                
                val=i+column+id;
               $(".row-"+i+"-col-"+column).find('.white-and-round').css('background-color',coinColor).attr("id",val);
               i=6;
               speladeCoins();
            }
            else if(i===5){
                 i--;   
            }
            
             if(i===4 && !$(".row-"+i+"-col-"+column).find(".white-and-round").attr("id")){
                
                 val=i+column+id;
               $(".row-"+i+"-col-"+column).find('.white-and-round').css('background-color',coinColor).attr("id",val);
               i=6;
               speladeCoins();
            }
            else if(i===4){
                 i--;   
            }
            
             if(i===3 && !$(".row-"+i+"-col-"+column).find(".white-and-round").attr("id")){
                
                 val=i+column+id;
               $(".row-"+i+"-col-"+column).find('.white-and-round').css('background-color',coinColor).attr("id",val);
               i=6;
               speladeCoins();
            }
            else if(i===3){
                 i--;   
            }
             if(i===2 && !$(".row-"+i+"-col-"+column).find(".white-and-round").attr("id")){
                
                 val=i+column+id;
               $(".row-"+i+"-col-"+column).find('.white-and-round').css('background-color',coinColor).attr("id",val);
               i=6;
               speladeCoins();
            }
            else if(i===2){
                 i--;   
            }
          
             if(i===1 && !$(".row-"+i+"-col-"+column).find(".white-and-round").attr("id")){
                
                 val=i+column+id;
               $(".row-"+i+"-col-"+column).find('.white-and-round').css('background-color',coinColor).attr("id",val);
               i=6;
               speladeCoins();
            }
            else if(i===1){
                 i--;   
            }
              if(i===0 && !$(".row-"+i+"-col-"+column).find(".white-and-round").attr("id")){
                
                 val=i+column+id;
               $(".row-"+i+"-col-"+column).find('.white-and-round').css('background-color',coinColor).attr("id",val);
               i=6;
               speladeCoins();
            }
    }
    function speladeCoins(){
                if(value===1){
                player2.coins--;
                updatePlayer();
               }
               else{
                player1.coins--;
                console.log(player2.coins);
                updatePlayer();
               }
    }

    function replayClick(){
        $('#restart').click(function(){
            deleteBord();
            createBord();
            resizer();
            $(window).resize(resizer);
            columnClick();
            startClick();
            replayClick ();
            player1 = new Player1(0, $('#Player1').val());
            player2 = new Player2(0, $('#Player2').val());
            updatePlayer();
            
            console.log(player1);
        });
    }
    // click on a column (really on a slot)
    function columnClick(){
        $('#Bord .col').click(function(){
            console.log($(this).attr('class'));
            let column = $(this).attr('class').split('-col-')[1];
            console.log("You clicked column",column);
            addCoin(column);
        });
    }
  
   function startClick(){
    $("#startBtn").click(function(){
            player1 = new Player1(0, $('#Player1').val());
            player2 = new Player2(0, $('#Player2').val());
            window.location.hash = '#play';
            deleteBord();
            createBord();
            resizer();
            $(window).resize(resizer);
            columnClick();
            startClick();
            replayClick ();
            cancelClick();
            updatePlayer();
         });
    }
    function updatePlayer(){
           $("#p1").html(
            '<h4>Spelare2: '+ player1.name + '</h4>' +
                '<p>Antal mynt kvar: ' + player1.coins + '</p>'
            ).css("background-color", player1.colore);
            $("#p2").html(
            '<h4>Spelare1: '+ player2.name + '</h4>' +
                '<p>Antal mynt kvar: ' + player2.coins + '</p>'
            ).css("background-color", player2.colore); 
    }

    function resizer(){
    	// Set the height of white-and-round to its witdh
    	let w = $('.white-and-round').width();
    	$('.white-and-round').height(w);
    }
   	 // run resizer each time the window changes size
   	 // and run it once initially too

    $('#field').on('click', function (e) {
        console.log($('#field').width(), $('#field').height());
        alert(e.pageX + ' , ' + e.pageY);
    });

});
