$(function() {
    var body=$("body"),
        current = (window.location.pathname).replace('/Xchange/screens/','');

    body.prepend("<header></header><nav></nav>");
    var nav=$("nav");

    $("header").prepend("<div id='avatar'></div>" +
        "<label>חן חפץ</label>" +
        "<div class='menu'></div>" +
        "<a id='logo' href=#'></a>" +
        "<div class='clear'></div>"
    );
    nav.append("<ul>" +
        "<li><a href='../home/index.html'>בית</a></li>" +
        "<li><a href='../buying/index.html'>קנייה</a></li>" +
        "<li><a href='../selling/index.html'>מכירה</a></li>" +
        "<li><a href='../messages/index.html'>הודעות</a></li>" +
        "<li><a href='../meeting/index.html'>עסקאות פעילות</a></li>" +
        "<li><a href='../profile/index.html'>פרופיל</a></li>" +
            "</ul>"
    );
    console.log($("nav  a"));
    $('nav ul li a').each(function(){
        var href = $(this).attr('href').replace('../','');
        if(href == current ) {
            $(this).css({"background-color": "#080808", "color": "#ffffff"});
        }
    });
    $('.menu').click(function () {
        nav.toggle();
    });
});
//map componnet
function initMap() {
    var uluru = {lat: 32.089, lng: 34.802};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17, center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}
