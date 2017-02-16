$(function(){
    var $header = $("body"),
        $nav = $("header > button");
    $header.prepend(
        "<header>" +
            "<div><a id='profile' href='../profile/index.html'></a></div>" +
            "<button></button>" +
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
    $nav.click(function () {

    });
});
