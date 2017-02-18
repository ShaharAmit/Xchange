$(function(){
    var main = $("main"),
        sID,
        bID,
        amount,
        currency,
        location,
        lat,
        lng,
        sName,
        sRank,
        bName,
        bRank,
        cells = 14,
        del = $(".delete"),
        detail = $(".details");
    function createRow(name,imageUrl,rankUrl){
        main.append("<section class='row'>"+
                "<section  class='cell'></section>" +
                "<section class='cell'><p>"+name+"</p></section>" +
                "<section  class='cell'></section>" +
                "<section class='cell'><p>"+location+"</p></section>" +
                "<section class='cell'><p>"+amount+currency+"</p></section>" +
                "<section  class='cell tumbD'></section>" +
                "<section  class='cell tumbU'></section>" +
                "<section  class='cell details'></section>" +
            "</section>"
        );
        var cell = $(".cell");
        cell.eq(cells).parent().data({lName:lName,phone:phone,tumbU:tumbU,tumbD:tumbD,fName:fName,
            message:message,pictureURL:pictureURL,rankURL:rankURL,amount:amount,currency:currency});
        cell.eq(cells).css('background-image', 'url('+pictureURL+')');
        cells+=2;
        cell.eq(cells).css('background-image', 'url('+rankURL+')');
        cells+=5;
    }
    function checkID() {
        $.ajax({
            type: "GET",
            url: "../../includes/session.php?",
            data:{
                action: "getUserId"
            },
            dataType: 'json',
            success: function (data) {
                id = data.id;
                id = id.user_id;
                if(id == sID){
                    createRow(sName,sID,sRank);
                }else if(id == bID){
                    createRow(bName,bID,bRank);
                }
            }
        });
    }
    function loadMeetings() {
        $.ajax({
            type: "GET",
            url: "../../includes/action.php?",
            data:{
                action: "getMeetings"
            },
            dataType: 'json',
            success: function (data) {
                $.each(data, function(index, element) {
                    sID = element.deals_seller_id;
                    bID = element.deals_buyer_id;
                    amount = element.deals_amount;
                    currency = element.deals_currency;
                    location = element.deals_location;
                    lat = element.deals_lat;
                    lng = element.deals_lng;
                    sName = element.sell_um;
                    sRank = element.sell_ur;
                    bName = element.buy_un;
                    bRank = element.buy_ur;
                });
                detail = $(".details");
                detail.click(function () {
                    sID = $(this).parent().data('sID');
                    dID = $(this).parent().data('dID');
                    amount = $(this).parent().data('amount');
                    currency = $(this).parent().data('currency');
                    location = $(this).parent().data('location');
                    lat = $(this).parent().data('lat');
                    lng = $(this).parent().data('lng');
                    sName = $(this).parent().data('sName');
                    sRank = $(this).parent().data('sRank');
                    bName = $(this).parent().data('bName');
                    bRank = $(this).parent().data('bRank');
                });
            },
            error: function (data) {
                console.log("something went wrong");
            }
        });
    }
    loadMeetings();
});

