$(function() {
    var obj=$(".clear").last(),
        cont=$(".cont").last(),
        cards=0,
        i,
        fName,
        lName,
        id,
        deals,
        likes,
        disLikes,
        pictureURL,
        rankURL;
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
    /*for(i=0;i<24;i++){
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
    }*/
    function AddRight(index) {
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
        $(".score").eq(index).css('background-image', 'url(' + rankURL + ')');
        $(".avatars").eq(index).css('background-image', 'url(' + pictureURL + ')');
        cards++;
    }
    function AddLeft(index) {
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
        $(".score").eq(index).css('background-image', 'url(' + rankURL + ')');
        $(".avatars").eq(index).css('background-image', 'url(' + pictureURL + ')');
        cards++;
    }
    $.ajax({
        type: "GET",
        url: "includes/action.php?action=data",
        dataType: 'json',
        success: function (data) {
            $.each(data, function(index, element) {
                fName = element.FIRST_NAME;
                lName = element.LAST_NAME;
                deals = element.DEALS_AMOUNT;
                likes = element.LIKES;
                disLikes = element.DISLIKES;
                pictureURL = element.PICTURE;
                rankURL = element.RANK;
                if(index%2 == 0)
                    AddRight(index);
                else
                    AddLeft(index);
            });
        }
    });
});
