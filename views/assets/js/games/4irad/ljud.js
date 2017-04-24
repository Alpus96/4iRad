
    let audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'http://www.soundjay.com/free-music/sounds/destination-01.mp3');
    
    audioElement.addEventListener('ended', function() {
        this.play();
    }, false);
    
    audioElement.addEventListener("canplay",function(){
        $("#length").text("Duration:" + audioElement.duration + " seconds");
        $("#source").text("Source:" + audioElement.src);
        $("#status").text("Status: Ready to play").css("color","green");
    });
    
    audioElement.addEventListener("timeupdate",function(){
        $("#currentTime").text("Current second:" + audioElement.currentTime);
    });
    
    $('#play').click(function() {
        audioElement.play();
        $("#status").text("Status: Playing");
    });
    function stopMusic(){
        $('#pause').click(function() {
            audioElement.pause();
        });
    }
    
    $('#restart').click(function() {
        audioElement.currentTime = 0;
    });
