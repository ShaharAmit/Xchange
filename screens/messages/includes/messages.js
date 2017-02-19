$(function() {
    var main = $("main"),
        fName,
        message,
        pictureURL,
        rankURL,
        currency,
        amount,
        lName,
        phone,
        tumbD,
        tumbU,
        messageID,
        dealID,
        id,
        cells = 0,
        body = $("body"),
        del = $(".delete"),
        detail = $(".details");
    $("li").eq(1).addClass("underLine");
    function deleteAll() {
        $.ajax({
            type: "GET",
            url: "../../includes/action.php?",
            data: {
                action: "deleteAllMessages",
                dealID:dealID,
                amount:amount,
                buyerID:pictureURL
            },
            dataType: 'text',
            success: function (data) {
            }
        });
    }
    function deleteRow() {
        $.ajax({
            type: "GET",
            url: "../../includes/action.php?",
            data: {
                action: "deleteMessage",
                messageID: messageID
            },
            dataType: 'text',
            success: function (data) {
            }
        });
    }
    function dealsInfo() {
        var userMes = $("#userMessege");
        userMes.append(
            "<section id='profilePic'>" +
                "<section id='rank'></section>" +
                "<section id='tumbU'><p></p></section>" +
                "<section id='tumbD'><p></ptumbR></section>" +
            "</section>" +
            "<section><p id='name'></p></section>" +
            "<section><p id='phone'></p></section>" +
            "<section><p id='message'></p></section>" +
            "<section></section>" +
            "<section></section>"
        );
        var sec = userMes.find("> section"),
            tumbUp = $("#tumbU"),
            tumbDown = $("#tumbD");
        sec.eq(0).css('background-image', 'url('+"../../images/users/"+pictureURL+".png"+')');
        $("#rank").css('background-image', 'url('+rankURL+')');
        tumbUp.css('background-image', 'url("../../images/graphics/tumbUp.png")');
        tumbDown.css('background-image', 'url("../../images/graphics/tumbDown.png")');
        tumbUp.find("p").html(tumbU);
        tumbDown.find("p").html(tumbD);
        $("#name").html(fName + " " + lName);
        $("#phone").html(phone);
        $("#message").html(message);
        sec.eq(4).css('background-image', 'url('+"../../images/buttons/btBack.png"+')');
        sec.eq(5).css('background-image', 'url('+"../../images/buttons/btOK.png"+')');
        sec.eq(4).click(function () {
            $("#userMessege").remove();
            $("#coverBlack").remove();
        });
        sec.eq(5).click(function () {
            deleteAll();
            userMes.empty();
            userMes.append(
                "<div id='exit'></div>" +
                "<section id='confirmed'></section>" +
                "<p id='confirmedMessage'>העסקה אושרה בהצלחה</p>"
            );
            $("#confirmed").css('background-image', 'url('+"../../images/graphics/confirmed.png"+')');
            $("#exit").click(function () {
                $("#userMessege").remove();
                $("#coverBlack").remove();
            });
        });
    }
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
        cell.eq(cells).parent().data({lName:lName,phone:phone,tumbU:tumbU,tumbD:tumbD,fName:fName,dealID:dealID,
            message:message,pictureURL:pictureURL,rankURL:rankURL,amount:amount,currency:currency,messageID:messageID});
        cell.eq(cells).css('background-image', 'url('+"../../images/users/"+pictureURL+".png"+')');
        cells+=2;
        cell.eq(cells).css('background-image', 'url('+rankURL+')');
        cells+=5;
     }
    function loadMessages() {
        $.ajax({
                type: "GET",
                url: "../../includes/action.php?",
                data:{
                    action: "getMessages",
                    id: id
                },
                dataType: 'json',
                success: function (data) {
                    $.each(data, function(index, element) {
                        fName = element.user_name;
                        message = element.messages_message;
                        pictureURL = element.user_id;
                        rankURL = "../../images/ranks/rank"+element.user_rank+".png";
                        currency = element.messages_currency;
                        amount = element.messages_amount;
                        phone = element.user_phone;
                        tumbD = element.user_tumb_d;
                        tumbU = element.user_tumb_u;
                        lName = element.user_last_name;
                        messageID = element.messages_id;
                        dealID = element.messages_deals_id;
                        createRow();
                    });
                    del = $(".delete");
                    del.click(function () {
                        messageID = $(this).parent().data('messageID');
                        deleteRow();
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
                        dealID = $(this).parent().data('dealID');

                        body.append("<div id='coverBlack'></div>");
                        body.append("<div id='userMessege'><div id='exit'></div></div>");
                        dealsInfo();
                        $("#exit").click(function () {
                            $("#userMessege").remove();
                            $("#coverBlack").remove();
                        });
                        $("#coverBlack").click(function () {
                            $("#userMessege").remove();
                            $("#coverBlack").remove();
                        });
                    });
                },
            error: function (data) {
                console.log("something went wrong");
            }
        });
    }
    function getID() {
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
                loadMessages();
            }
        });
    }
    getID();
});