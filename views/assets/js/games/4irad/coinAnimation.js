$(document).ready(function(){
    deleteBord();
    createBord();
    resizer();
    $(window).resize(resizer);
    columnClick();
    startClick();
    replayClick ();
    cancelClick();
    stopMusic();

    $(window).load(function () {
    /* window.location.replace("index.html");*/
    });

    const game = new Game();

    // create the board
    function createBord(){
        for(let i = 0; i <= 5; i++){
            for(let j = 0; j <= 6; j++){
                  $('#Bord').append(' <div class="col row-'+i+'-col-'+j+'"><div class="white-and-round"></div></div>');
            }
        }
    }
    // delete the board
    function deleteBord(){
        for(let i = 0; i <= 5; i++){
            for(let j = 0; j <= 6; j++){
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
    let e= new Eesy();
    let i =5;
    let selected;
    let player1 = new Player(10,"Björn","green",21,1);
    let player2= new Player(50,"Nisse","yellow",21,2);
    let idval = [];
    let turn = true;


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


    /*addCoin(coin, column) {
        if (!this.gameBoard[column].length > 6 && coin instanceof Coin) {
            //  If the column is not ful place a Coin in it and return tue.
            this.gameBoard[column].push(coin);
            return true;
        } else {
            //  If the column was ful or the coin was not a Coin return false.
            return false;
        }
    }*/
     function runComp(){
        if(turn===false && selected==="Dator"){
            setTimeout(function(){
            column=e.makeMove();
            turn=false;
            addCoin(column);
            },600);
        }
     }
     //animerar drop av coins
     function animateCoin(column){
        let k =8;
        if(turn===true){

            for(let i =0; i<=k; i++){
               if(!$(".row-"+i+"-col-"+column).find(".white-and-round").attr("id")){
                    k--;
               
                $(".row-"+i+"-col-"+column).find('.white-and-round').effect("highlight",{color: player2.colore},300);
                }
                
            }
        }
        else if(turn===false ){
             for(let i =0; i<=k; i++){
                if(!$(".row-"+i+"-col-"+column).find(".white-and-round").attr("id")){
                    k--;
                    $(".row-"+i+"-col-"+column).find('.white-and-round').effect("highlight",{color: player1.colore},300);
                }
            }
          

        }

     }


    //adding coins

    function addCoin(column){
        audio.play();
        let coinColor;
        let id;
        
        if(turn===true)
        {

            turn=false;
             id = player1.id;
             coinColor = player1.colore;
             $("#p2").css('border','2px solid #E8F558').animate({
            "background-color": player2.colore,
            "border-color": "#32a511",
            "border-width": "5px"
            }, 500);
             $("#p1").css('border','');
              

        }
         else if(turn===false){
            turn=true;
             id = player2.id;
            coinColor = player2.colore;
             $("#p1").css('border','2px solid #E8F558').animate({
            "background-color": player1.colore,
            "border-color": "#32a511",
            "border-width": "5px"
            }, 500);
            $("#p2").css('border','');
            

        }

            if(i ===5 && !$(".row-"+i+"-col-"+column).find(".white-and-round").attr("id"))
            {
               
                val=i+column+id;
               $(".row-"+i+"-col-"+column).find('.white-and-round').css('background-color',coinColor).attr("id",val);
               i=5;
               speladeCoins();
               animateCoin(column);
               runComp();
               
            }
            else if(i===5){
                 i--;
            }

             if(i===4 && !$(".row-"+i+"-col-"+column).find(".white-and-round").attr("id")){

                 val=i+column+id;
               $(".row-"+i+"-col-"+column).find('.white-and-round').css('background-color',coinColor).attr("id",val);
               i=5;
               speladeCoins();
                animateCoin(column);
               runComp();
              
            }
            else if(i===4){
                 i--;
            }

             if(i===3 && !$(".row-"+i+"-col-"+column).find(".white-and-round").attr("id")){

                 val=i+column+id;
               $(".row-"+i+"-col-"+column).find('.white-and-round').css('background-color',coinColor).attr("id",val);
               i=5;
               speladeCoins();
                animateCoin(column);
               runComp();
               
            }
            else if(i===3){
                 i--;
            }
             if(i===2 && !$(".row-"+i+"-col-"+column).find(".white-and-round").attr("id")){

                 val=i+column+id;
               $(".row-"+i+"-col-"+column).find('.white-and-round').css('background-color',coinColor).attr("id",val);
               i=5;
               speladeCoins();
               animateCoin(column);
               runComp();
               
            }
            else if(i===2){
                 i--;
            }

             if(i===1 && !$(".row-"+i+"-col-"+column).find(".white-and-round").attr("id")){

                 val=i+column+id;
               $(".row-"+i+"-col-"+column).find('.white-and-round').css('background-color',coinColor).attr("id",val);
               i=5;
               speladeCoins();
               animateCoin(column);
               runComp();
               
            }
            else if(i===1){
                 i--;
            }
              if(i===0 && !$(".row-"+i+"-col-"+column).find(".white-and-round").attr("id")){

                 val=i+column+id;
               $(".row-"+i+"-col-"+column).find('.white-and-round').css('background-color',coinColor).attr("id",val);
               i=5;
               speladeCoins();
               animateCoin(column);
               runComp();
               

            }
            else if(i===0 && selected==="Dator"){
                if(turn===true){
                    turn=false;
                     column=e.makeMove();
                     i=5;
                    addCoin(column);
                }
                 if(turn===false){
                    turn=true;
                    alert("Raden är full!");
                    columnClick();
                }

                 i=5;


            }
            //om man klickar på en full rad
            else if(i===0){
                alert("Raden är full!");
                if(turn===true){
                    turn=false;
                }
                 if(turn===false){
                    turn=true;
                }
                i=5;
            }

            game.addCoin(new Coin(id), Number(column));
            game.checkForWinner({id: id});

    }
    function speladeCoins(){
                if(turn===false){
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
            turn=true;
            deleteBord();
            createBord();
            resizer();
            $(window).resize(resizer);
            runComp();
            columnClick();
            startClick();
            replayClick ();
            player1 = new Player1(0, $('#Player1').val());
            if(selected==="Dator"){
                player2= new Player(0,'Dator',"yellow",21,2);
            }
            else{
            player2 = new Player2(0, $('#Player2').val());
            }
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


    $(function(ready){
        $('#selectedVal').change(function() {
                selected=$(this).val();
                if ($(this).val() === 'Dator') {
                 $('#Player2').hide();
                }
                else{
                    $('#Player2').show();
                }

        });
    });



   function startClick(){
    $("#startBtn").click(function(){
            audioElement.play();
            turn = true;
            player1 = new Player1(0, $('#Player1').val());
            if(selected==="Dator"){
                player2= new Player(0,"Dator","yellow",21,2);

            }
            else{
                player2 = new Player2(0, $('#Player2').val());
            }
                window.location.hash = '#play';
                deleteBord();
                createBord();
                i=5;
                setTimeout(function(){ resizer() },0);
                // only connect the resizer to window resize
                // events ONCE - otherwise it will run several times
                // for each resize
                if(!window.resizerOn){
                    $(window).resize(resizer);
                    window.resizerOn = true;
                }
                runComp();
                columnClick();
                updatePlayer();
                stopMusic();
         });
    }
    function updatePlayer(){
           $("#p1").html(
            '<h4>Spelare1: '+ player1.name + '</h4>' +
                '<p>Antal mynt kvar: ' + player1.coins + '</p>'
            ).css("background-color", player1.colore);
            $("#p2").html(
            '<h4>Spelare2: '+ player2.name + '</h4>' +
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

});
