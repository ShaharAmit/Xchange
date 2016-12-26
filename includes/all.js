$(function() {
    var body=$("body");

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
    $('nav ul li a').each(function(){
        var href = $(this).attr('href');
        if(href == "#" ) {
            $(this).parent().css("background-color","#4990e2");
        }
    });
    $('.menu').click(function () {
        nav.toggle();
    });
});
