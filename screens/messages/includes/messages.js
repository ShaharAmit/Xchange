/**
 * Created by shahar on 17/02/17.
 */
$(function() {
    var main = $("main"),
        row = $("row"),
        savedData,
        fName,
        message,
        pictureURL,
        rankURL,
        currency,
        amount,
        rows;
    function createRow(){
        main.append("<section class='row'>"+
                            "<section  class='cell'></section>" +
                            "<section class='cell'><p>"+fName+"</p></section>" +
                            "<section  class='cell'></section>" +
                            "<section class='cell'><p>"+message+"</p></section>" +
                            "<section class='cell'><p>"+amount+currency+"</p></section>" +
                            "<section  class='cell'></section>" +
                            "<section  class='cell'></section>" +
                        "</section>"
        );
        row.eq(rows).child(0).css('background-image', 'url(' + pictureURL + ')');
        row.eq(rows).child(2).css('background-image', 'url(' + rankURL + ')');
        rows++;
    }
    main.append("<i class='fa fa-refresh fa-spin' style='font-size:60px; position: fixed; left: 50%; top: 50%'></i>");
    $.ajax({
        type: "GET",
        url: "../../includes/action.php?",
        data:{action: "getMessages"},
        dataType: 'txt',
        success: function (data) {
            console.log(data);
            savedData = data;
            /*$.each(data, function(index, element) {
                fName = element.FIRST_NAME;
                pictureURL = element.PICTURE;
                rankURL = element.RANK;
                currency = element.CURRENCY;
                amount = element.AMOUNT;
                message = element.MESSAGE;
                createRow();
            });*/
            $(".fa").remove();
        }
    });
});