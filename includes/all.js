$(function(){
    $("body").prepend(
        "<header>" +
            "<a id='profile' href='../profile/index.html'></a>" +
            "<div id='navButton' title='nav'></div>" +
            "<a id='logo' href='../../index.html'></a>" +
        "</header>" +
        "<nav>" +
            "<ul class='nav nav-pills' id='ul1'>" +
                "<li role='presentation'><a href='../meeting/index.html'>עסקאות" +
                    "<div class='messages'><p>10</p></div>" +
                "</a></li>" +
                "<li role='presentation'><a href='../messages/index.html'>הודעות" +
                    "<div class='meeting'><p>1</p></div>" +
                "</a></li>" +
            "</ul>" +
            "<ul class='nav nav-pills' id='ul2'>" +
                "<li role='presentation'><a href='../selling/index.html'>מכירת מט&#8221;ח</a></li>" +
                "<li role='presentation'><a href='../buying/index.html'>קניית מט&#8221;ח</a></li>" +
            "</ul>" +
        "</nav>"
    );
    var nav = $("nav");
    $("#navButton").click(function () {
        if( nav.css('display') == 'block') {
            console.log("here1");
            nav.css('display','none');
        } else {
            nav.css('display','block');
            console.log("here2");

        }
    });
});
