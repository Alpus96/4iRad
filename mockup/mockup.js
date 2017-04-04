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
    menuItemActive(l);
}

//  Changes the active menu item after
//  the page content has been changed.
function menuItemActive (l) {
    $(`header nav a#start`).html("Spela").attr('href', '#start');

    $('header nav li').removeClass('active');
    $(`header nav a[href = "${l}"]`).parent().addClass('active');

    if (l === "#start" || l === "#play") {
        $(`header nav a[href = "${l}"]`).html("Avbryt").attr('href', '#home');
    }
}
