//  Static js script main file.
$(document).ready(function(){
    //  Run start when pahe is loaded.
    switchPage();

    //  When the hash part of the url changes
    //  run switchPage to update content.
    window.onhashchange = switchPage;
});

//  Will update the page content
//  depending on the url.
function switchPage() {

    let l;
     $('.page').hide();
    if (location.hash) {
        l = location.hash;
    } else if (!location.hash) {
        l = '#home';
    }
    if(!l){
    l = '#start';
  }

    $(l).show();
    menuItemActive(l);
}

//  Changes the active menu item after
//  the page content has been changed.
function menuItemActive (l) {
    $(`header nav a#names`).html("Spela").attr('href', '#start');

    $('header nav li').removeClass('active');

    if (l === "#start" || l === "#play") {
        $('header nav a#names').html("Avbryt").attr('href', '#home');
        $('header nav a#names').parent().addClass('active');
    } else {
        $('header nav a[href = "${l}"]').parent().addClass('active');
    }

    $('#button').on('click', function () {
        window.location.hash = '#play'
    });

    /*
        Add $#play.on(click, show "du vann!")
    */
    $('#play img').on('click', function () {
        if (!won) {
            won = true;
            $('#won').show();
        } else {
            won = false;
            $('#won').hide();
        }
    });
}

/*
Error: Connection lost: The server closed the connection.
    at Protocol.end (/Users/alpus96/Sites/website/4iRad/node_modules/mysql/lib/protocol/Protocol.js:109:13)
    at Socket.<anonymous> (/Users/alpus96/Sites/website/4iRad/node_modules/mysql/lib/Connection.js:109:28)
    at emitNone (events.js:91:20)
    at Socket.emit (events.js:185:7)
    at endReadableNT (_stream_readable.js:974:12)
    at _combinedTickCallback (internal/process/next_tick.js:74:11)
    at process._tickCallback (internal/process/next_tick.js:98:9)

npm ERR! Darwin 16.5.0
npm ERR! argv "/usr/local/bin/node" "/usr/local/bin/npm" "start"
npm ERR! node v6.10.0
npm ERR! npm  v3.10.10
npm ERR! code ELIFECYCLE
npm ERR! 4irad@1.0.0 start: `node server.js`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the 4irad@1.0.0 start script 'node server.js'.
npm ERR! Make sure you have the latest version of node.js and npm installed.
npm ERR! If you do, this is most likely a problem with the 4irad package,
npm ERR! not with npm itself.
npm ERR! Tell the author that this fails on your system:
npm ERR!     node server.js
npm ERR! You can get information on how to open an issue for this project with:
npm ERR!     npm bugs 4irad
npm ERR! Or if that isn't available, you can get their info via:
npm ERR!     npm owner ls 4irad
npm ERR! There is likely additional logging output above.

npm ERR! Please include the following file with any support request:
npm ERR!     /Users/alpus96/Sites/website/4iRad/npm-debug.log
*/
