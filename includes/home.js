$(function() {
    var obj=$(".clear").last(),
        cont=$(".cont").last(),
        cards=0,
        fName,
        lName,
        deals,
        likes,
        disLikes,
        pictureURL,
        rankURL,
        rowsNum,
        rank,
        userId;
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
    dataCall();
    $(function () {
        $.ajax({
            type: "GET",
            url: "includes/action.php?action=count",
            dataType: 'json',
            success: function (data) {
                $.each(data, function(index, element) {
                    rowsNum = element["COUNT(*)"];
                });
            }
        });
    });
    function AddRight() {
        obj.before("<section class='cardsRight'>" +
            "<p>"+fName+" "+lName+ " - "+deals+" עסקאות"+"</p>" +
            "<section class='avatars'>" +
            "<section class='score'></section>" +
            "</section>" +
            "<section class='likes'>" +
            "<section class='like'></section>" +
            "<p>"+likes+"</p>" +
            "<section class='disLike'></section>" +
            "<p>"+disLikes+"</p>" +
            "</section>" +
            "</section>");
        $(".score").eq(cards).css('background-image', 'url(' + rankURL + ')');
        $(".avatars").eq(cards).css('background-image', 'url(' + pictureURL + ')');
        cards++;
    }
    function AddLeft() {
        obj.before("<section class='cardsLeft'>" +
            "<p>"+fName+" "+lName+ " - "+deals+" עסקאות"+"</p>" +
            "<section class='avatars'>" +
            "<section class='score'></section>" +
            "</section>" +
            "<section class='likes'>" +
            "<section class='like'></section>" +
            "<p>"+likes+"</p>" +
            "<section class='disLike'></section>" +
            "<p>"+disLikes+"</p>" +
            "</section>" +
            "</section>");
        $(".score").eq(cards).css('background-image', 'url(' + rankURL + ')');
        $(".avatars").eq(cards).css('background-image', 'url(' + pictureURL + ')');
        cards++;
    }
    function dataCall() {
        obj.before("<i class='fa fa-refresh fa-spin' style='font-size:60px; position: fixed; left: 50%; top: 50%'></i>");
        disableScroll();
        $.ajax({
            type: "GET",
            url: "includes/action.php?",
            data:{
                action: "data",
                cards: cards+1
            },
            dataType: 'json',
            success: function (data) {
                $.each(data, function(index, element) {
                    fName = element.user_name;
                    lName = element.user_last_name;
                    deals = element.user_deals;
                    likes = element.user_tumb_u;
                    disLikes = element.user_tumb_d;
                    userId = element.user_id;
                    pictureURL = "images/users/"+userId+".png";
                    rank = element.user_rank;
                    rankURL ="images/ranks/rank"+rank+".png";
                    if(index%2 == 0)
                        AddRight();
                    else
                        AddLeft();
                });
                enableScroll();
                $(".fa").remove();
            }
        });
    }
    $(window).on("scroll", function() {
        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();
        if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
            if(cards<rowsNum)
                dataCall();
        }
    });
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove  = preventDefault; // mobile
        document.onkeydown  = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }
});