$(function(){
    var $header = $("body");

    $header.prepend(
        "<header>" +
            "<div><a id='profile' href='../profile/index.html'></a></div>" +
            "<nav>" +
                "<ul class='nav nav-pills'>" +
                    "<li role='presentation'><a href='../meeting/index.html'>עסקאות" +
                        "<div class='messages'><p>10</p></div>" +
                    "</a></li>" +
                    "<li role='presentation'><a href='../messages/index.html'>הודעות" +
                        "<div class='meeting'><p>1</p></div>" +
                    "</a></li>" +
                "</ul>" +
                "<ul class='nav nav-pills'>" +
                    "<li role='presentation'><a href='../selling/index.html'>מכירת מט&#8221;ח</a></li>" +
                    "<li role='presentation'><a href='../buying/index.html'>קניית מט&#8221;ח</a></li>" +
                "</ul>" +
                "<a id='logo' href='../../index.html'></a>" +
            "</nav>" +
        "</header>"
    );
});
