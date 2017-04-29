
    let audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'https://www.soundjay.com/free-music/sounds/heart-of-the-sea-01.mp3');
    let audio = new Audio('https://www.soundjay.com/button/sounds/button-37.mp3');
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
            audio.pause();
        });
    }

    $('#restart').click(function() {
        audioElement.currentTime = 0;
    });
