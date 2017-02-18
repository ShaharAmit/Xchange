$(function() {
    var log=$("#login"),
        sec = $("section");
    function login() {
        $.ajax({
            type: "GET",
            url: "../../includes/action.php?",
            data:{
                action: "getDeals",
                cards: cards+1
            },
            dataType: 'json',
            success: function (data) {
                $.each(data, function(index, element) {
                    fName = element.user_name;
                    lName = element.user_last_name;
                    deals = element.user_deals;
                    likes = element.user_tumb_u;
                    disLikes = element.user_tumb_d;
                    userId = element.user_id;
                    pictureURL = "../../images/users/"+userId+".png";
                    rank = element.user_rank;
                    rankURL ="../../images/ranks/rank"+rank+".png";
                    if(index%2 == 0)
                        AddRight();
                    else
                        AddLeft();
                });
            }
        });
    }
    $("button").click(function () {
        if(log.val()==="12345678"||log.val()==="23456789")
            login();
        else
            alert("please log to 12345678 - מיכל or 23456789 - חן")
    });
    sec.eq(0).click(function () {

    });
    sec.eq(1).click(function () {

    });
});