$(document).ready(function(){
    createBord();
    resizer();
    $(window).resize(resizer);
    columnClick();
    startClick();
    


    // create the board
    function createBord(){
        for(let i = 0; i <= 5; i++){
            for(let j = 0; j <= 6; j++){
                  $('#Bord').append(' <div class="col row-'+i+'-col-'+j+'"><div class="white-and-round"></div></div>');
            }
        }
    }
    let i =5;  
    let counter =0;
    let player1 = new Player(10,"Björn","green",24,1);
    let player2= new Player(50,"Nisse","yellow",24,2);

    //adding coins

    function addCoin(column){
         counter++;
        console.log(counter%2);
        let value = counter%2;
        let coinColor;
        let id;

        if(value===1)
        {
             id = player1.id;
             coinColor = player1.colore;
        }
        else if(value===0){
             id = player2.id;
            coinColor = player2.colore;
        }
      console.log(coinColor);
       
            if(i ===5 && !$(".row-"+i+"-col-"+column).find(".white-and-round").attr("id"))
            {
                
                val=i+column+id;
               $(".row-"+i+"-col-"+column).find('.white-and-round').css('background-color',coinColor).attr("id",val);
               
            }
            else if(i===5){
                 i--;   
            }
            
             if(i===4 && !$(".row-"+i+"-col-"+column).find(".white-and-round").attr("id")){
                
                 val=i+column+id;
               $(".row-"+i+"-col-"+column).find('.white-and-round').css('background-color',coinColor).attr("id",val);
               i=5;
            }
            else if(i===4){
                 i--;   
            }
            
             if(i===3 && !$(".row-"+i+"-col-"+column).find(".white-and-round").attr("id")){
                
                 val=i+column+id;
               $(".row-"+i+"-col-"+column).find('.white-and-round').css('background-color',coinColor).attr("id",val);
               i=5;
            }
            else if(i===3){
                 i--;   
            }
             if(i===2 && !$(".row-"+i+"-col-"+column).find(".white-and-round").attr("id")){
                
                 val=i+column+id;
               $(".row-"+i+"-col-"+column).find('.white-and-round').css('background-color',coinColor).attr("id",val);
               i=5;
            }
            else if(i===2){
                 i--;   
            }
          
             if(i===1 && !$(".row-"+i+"-col-"+column).find(".white-and-round").attr("id")){
                
                 val=i+column+id;
               $(".row-"+i+"-col-"+column).find('.white-and-round').css('background-color',coinColor).attr("id",val);
               i=5;
            }
            else if(i===1){
                 i--;   
            }
              if(i===0 && !$(".row-"+i+"-col-"+column).find(".white-and-round").attr("id")){
                
                 val=i+column+id;
               $(".row-"+i+"-col-"+column).find('.white-and-round').css('background-color',coinColor).attr("id",val);
               i=5;
            }
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
            console.log(player1);
            window.location.replace("spel.html");
            
            
         });
    }
    
        $("#p1").html(
            '<h1>Player1: '+ player1.name + '!</h1>' +
                '<p>Antal coins: ' + player1.coins + '!</p>'
            ).css("background-color", player1.colore);
         $("#p2").html(
            '<h1>Player2: '+ player2.name + '!</h1>' +
                '<p>Antal coins: ' + player2.coins + '!</p>'
            ).css("background-color", player2.colore);
    


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
