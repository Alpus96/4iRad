//  Static js script main file.
let won;
//  Run start when pahe is loaded.
$(switchPage);

//  When the hash part of the url changes
//  run switchPage to update content.
window.onhashchange = switchPage;

//  Will update the page content
//  depending on the url.
function switchPage() {
    let l;
    if (location.hash) {
        l = location.hash;
    } else if (!location.hash) {
        l = '#home';
    }
    $('.page').hide();
    $(l).show();
    console.log(l);
    menuItemActive(l);
}

//  Changes the active menu item after
//  the page content has been changed.
function menuItemActive (l) {
    $(`header nav a#names`).html("Spela").attr('href', '#start');

    $('header nav li').removeClass('active');

    if (l === "#start" || l === "#play") {
        $(`header nav a#names`).html("Avbryt").attr('href', '#home');
        $(`header nav a#names`).parent().addClass('active');
    } else {
        $(`header nav a[href = "${l}"]`).parent().addClass('active');
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
