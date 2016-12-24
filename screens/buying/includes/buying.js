$(function(){
    var clear = $("#clear"),
    obj = $("div.clear", "#avatars").last(),
        avatarsNum=0,
        i,
        date = $('[type="date"]'),
        menu = $('.menu'),
        nav = $("nav");

    $('nav ul li a').each(function(){
            var href = $(this).attr('href');
            if(href == "#" ) {
                $(this).parent().css("background","#4990e2")
            }
        });
    for(i=0;i<24;i++){
        InSection();
    }
    function InSection(){
        obj.before("<section><img src='../../images/mainAvatar.png'></section>");
        avatarsNum++;
    }
    menu.click(function () {
        nav.toggleClass("navDis");
    });
});
