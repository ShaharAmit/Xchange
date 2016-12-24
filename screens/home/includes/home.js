$(function(){
    var clear=$("#clear"),
        obj=$("div.clear", "#avatars").last(),
        avatarsNum=0,
        i,
        date=$('[type="date"]'),
        nav=$("nav"),
        people=$("#avatars"),
        arrowUp=$("#arrowUp"),
        arrowDown=$("#arrowDown"),
        scroll=0,
        scrollTop;
    $('nav ul li a').each(function(){
        var href = $(this).attr('href');
        if(href == "#" ) {
            $(this).parent().css("background-color","#4990e2");
        }
    });
    for(i=0;i<24;i++){
        InSection();
    }
    scrollTop=avatarsNum*25.5;
    function InSection(){
        obj.before("<section><img src='../../images/mainAvatar.png'></section>");
        avatarsNum++;
    }
    $('.menu').click(function () {
        nav.toggle();
    });
    $("form").submit(function() {
        people.slideDown();
        arrowDown.slideDown();
        arrowUp.slideDown();
        return false;
    });
    arrowUp.click(function() {
        console.log(scroll);
        if(scroll<scrollTop-224){
            scroll+=112;
            people.animate({scrollTop: scroll},500);
        }
        return false;
    });
    arrowDown.click(function() {
        console.log(scroll);
        if(scroll>0){
            scroll-=112;
            people.animate({scrollTop: scroll},500);
        }
        return false;
    });
    $("#avatar").click(function () {
        location.href = "../profile/index.html";
    });
});
