//  Static js script main file.
$(function () {
    switchPage();
    window.onhashchange = switchPage;
});

//  Will update the page content
//  depending on the url.
function switchPage () {
    let l;
     $('.page').hide();
    if (location.hash) {
        l = location.hash;
    } else if (!location.hash) {
        l = '#home';
    }

    if (l === '#highscore') {
        const ajax = new Ajax();
        ajax.get('/highscore', (response) => {
            displayHighScore(response);
        });
    }

    $(l).show();

    switchMenuItem(l);
}

//  Changes the active menu item after
//  the page content has been changed.
function switchMenuItem (l) {
    $(`header nav a#names`).html("Spela").attr('href', '#spel');

    $('header nav li').removeClass('active');

    if (l === "#spel" || l === "#play") {
        $('header nav a#names').html("Avbryt").attr('href', '#home');
        $('header nav a#names').parent().addClass('active');
    } else {
        $('header nav a[href = "' + l + '"]').parent().addClass('active');
    }
}

function displayHighScore(hsList){
	let counter = 0;
    for(let hs in hsList){
    	counter++;
        let propertyValeu = hsList[hs];
        $('#hs').append(
            ' <div class="centerText"><div class="well-sm"><h4>Ranking: '
            + counter + ' <b>' + propertyValeu.name + '</b>  Antal drag: '
            + propertyValeu.score + ' </h4></div></div>'
        );
    }
}
