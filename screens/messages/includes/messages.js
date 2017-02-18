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
    loadMessages();
});

function loadMessages() {
$.ajax({
        type: "GET",
        url: "../../includes/action.php?",
        data:{
            action: "getMessages"
        },
        dataType: 'json',
        success: function (data) {
            console.log(data);
        },
    error: function (data) {
        console.log("wtf");
    }
    });
}