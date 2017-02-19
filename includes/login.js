$(function() {
    var log=$("#login"),
        sec = $("section"),
        id,
        rank,
        returnedId;
    function login() {
        $.ajax({
            type: "GET",
            url: "includes/session.php?",
            data:{
                action: "setUser",
                userID: id
            },
            dataType: 'json',
            success: function (data) {
                    returnedId = data.id;
                    if (returnedId == id){
                    window.location.replace("./screens/home/index.html");
                }
            }
        });
    }
    $("button").click(function () {
        if(log.val()==="12345678"||log.val()==="23456789") {
            id = log.val();
            login();
        }
        else
            alert("התחבר ל 12345678 - מיכל או ל 23456789 - חן")
    });
    sec.eq(0).click(function () {
        id = "12345678";
        login();
    });
    sec.eq(1).click(function () {
        id = "23456789";
        login();
    });
});