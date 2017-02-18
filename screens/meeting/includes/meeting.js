$(function(){
    var main = $("main"),
        sID,
        dID,
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
    function createRow(){
        main.append("<section class='row'>"+
            "<section  class='cell'></section>" +
            "<section class='cell'><p>"+fName+"</p></section>" +
            "<section  class='cell'></section>" +
            "<section class='cell'><p>"+message+"</p></section>" +
            "<section class='cell'><p>"+amount+currency+"</p></section>" +
            "<section  class='cell delete'></section>" +
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
    function loadMeetings() {
        $.ajax({
            type: "GET",
            url: "../../includes/action.php?",
            data:{
                action: "getMeetings"
            },
            dataType: 'json',
            success: function (data) {
                savedData = data;
                console.log(savedData);
                $.each(data, function(index, element) {
                    sID = element.deals_seller_id;
                    dID = element.deals_buyer_id;
                    amount = element.deals_amount;
                    currency = element.deals_currency;
                    location = element.deals_location;
                    lat = element.deals_lat;
                    lng = element.deals_lng;
                    sName = element.sell_um;
                    sRank = element.sell_ur;
                    bName = element.buy_un;
                    bRank = element.buy_ur;
/*
                    createRow();
*/
                });
                del = $(".delete");
                del.click(function () {
                    if(cells>7)
                        cells = cells -7;
                    $(this).parent().remove();
                });
                detail = $(".details");
                detail.click(function () {
                    fName = $(this).parent().data('fName');
                    currency = $(this).parent().data('currency');
                    message = $(this).parent().data('message');
                    pictureURL = $(this).parent().data('pictureURL');
                    rankURL = $(this).parent().data('rankURL');
                    amount = $(this).parent().data('amount');
                    phone = $(this).parent().data('phone');
                    tumbD = $(this).parent().data('tumbD');
                    tumbU = $(this).parent().data('tumbU');
                    lName = $(this).parent().data('lName');
                });
            },
            error: function (data) {
                console.log("something went wrong");
            }
        });
    }
    loadMeetings();
});

