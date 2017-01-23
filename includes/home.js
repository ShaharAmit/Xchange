$(function() {
    var obj=$(".clear").last(),
        cont=$(".cont").last(),
        cards=0,
        i;
    $("a[href='../profile/index.html']").attr("href","./screens/profile/index.html");
    $("a[href='../meeting/index.html']").attr("href","./screens/meeting/index.html");
    $("a[href='../messages/index.html']").attr("href","./screens/messages/index.html");
    $("a[href='../selling/index.html']").attr("href","./screens/selling/index.html");
    $("a[href='../buying/index.html']").attr("href","./screens/buying/index.html");
    $("a[href='../../index.html']").attr("href","./index.html");
    cont.before( "<div class='topLine'></div>" +
                "<div class='clear'></div>" +
                "<h1>מוצאים - מחליפים - חוסכים</h1>" +
                "<div class='bottomLine'></div>" +
                "<div class='clear'></div>"
    );
    for(i=0;i<24;i++){
        InSection();
    }
    function InSection(){
        obj.before("<section class='cardsRight'>" +
                        "<p>בר ביצע 2 עסקאות</p>" +
                        "<section class='avatars'>" +
                            "<section class='score'></section>" +
                        "</section>" +
                        "<section class='likes'>" +
                            "<section class='like'></section>" +
                            "<p>0</p>" +
                            "<section class='disLike'></section>" +
                            "<p>2</p>" +
                        "</section>" +
                    "</section>" +
                    "<section class='cardsLeft'>" +
                        "<p>בר ביצע 2 עסקאות</p>" +
                        "<section class='avatars'>" +
                            "<section class='score'></section>" +
                        "</section>" +
                        "<section class='likes'>" +
                            "<section class='like'></section>" +
                            "<p>0</p>" +
                            "<section class='disLike'></section>" +
                            "<p>2</p>" +
                        "</section>" +
                    "</section>");
        cards++;
    }
});
