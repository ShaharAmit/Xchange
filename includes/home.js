$(function() {
    var obj=$(".clear").last(),
        cards=0,
        i;
    for(i=0;i<24;i++){
        InSection();
    }
    function InSection(){
        obj.before("<section class='cards'>" +
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
