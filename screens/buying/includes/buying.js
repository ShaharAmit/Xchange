$(function(){
    var clear=$("#clear"),
        obj=$("#clearing").last(),
        form = $("form"),
        people=$("#scroll"),
        button=$("#button"),
        firDate = $("#firstDate"),
        secDate = $("#secondDate"),
        amount = $("#amount"),
        error = $(".error"),
        pictureURL,
        sellerId,
        sellerRank,
        dealId,
        address,
        lng,
        lat,
        sellerTu,
        sellerTd,
        dealAmount,
        toShekels,
        sellerName,
        sellerLastName,
        savedCoin,
        ILSAmount = $("#ilsAmount");

    $("li").last().addClass("underLine");
    function InSection(index,pictureURL,dealId,lng,lat){
        obj.before("<section id="+dealId+" data-lng="+lng+" data-lat="+lat+"></section>");
        $("section").eq(index).css('background-image', 'url(' + pictureURL + ')');
    }
    function loadPeople() {
        try {
            $('.fa').remove();
            form.before("<i class='fa fa-refresh fa-spin' style='font-size:60px; position: fixed; left: 50%; top: 80%;z-index: 5;'></i>");
            var xhr = $.ajax({
                type: "GET",
                url: "../../includes/action.php?",
                data: {
                    // action: "getSellers",
                    // fromDate: firDate.eq(0).val(),
                    // toDate: secDate.eq(0).val(),
                    // amount: amount.eq(0).val(),
                    // currency: $("#coin").val()

                    action: "getSellers",
                    fromDate: "2017-01-01 00:00:00",
                    toDate: "2017-07-01 00:00:00",
                    amount: "100",
                    currency: "USD"
        },
                dataType: 'json',
                success: function (data) {
                    $.each(data, function (index, element) {
                        sellerId = element.deals_seller_id;
                        pictureURL ="../../images/users/"+sellerId+".png";
                        dealId = element.deals_id;
                        lng = element.deals_lng;
                        lat = element.deals_lat;
                        InSection(index,pictureURL,dealId,lng,lat);
                    });
                    $("section").click(function (seller) {
                        var dlat = ($(seller.currentTarget).data('lat')),
                            dlng = ($(seller.currentTarget).data('lng'));
                        body = $("body");
                        body.append("<div id='coverBlack'></div>");
                        body.append("<div id='userMessege'><div id='exit'></div></div>");
                        var usermassege = $("#userMessege");
                        usermassege.append("<h2 class ='sellerName'>מיכל שדה</h2>");
                        usermassege.append("<h3 class ='dealinfo'>:מוכר/ת</h3>");
                        usermassege.append("<h3 class ='priceing'>100 USD</h3>");
                        usermassege.append("<h3 class ='dealinfo'>:ערך העסקה בשקלים</h3>");
                        usermassege.append("<h3 class ='priceing'>376 ILS</h3>");
                        usermassege.append("<h3 class ='addressText'>:מיקום ההחלפה</h3>");
                        usermassege.append("<div id="+'map'+"></div>");
                        usermassege.append("<textarea rows='4' cols='50' placeholder='כתוב הודעה'>");
                        usermassege.append("<div id='btsend'></div>");
                        usermassege.append("<div id='btinfo'></div>");
                        initmap(dlat,dlng);
                        $("#btsend").click(function () {

                        });
                        $("#exit").click(function () {
                            $("#userMessege").remove();
                            $("#coverBlack").remove();
                        });
                        $("#coverBlack").click(function () {
                            $("#userMessege").remove();
                            $("#coverBlack").remove();
                        });
                    });
                    $(".fa").remove();
                }
            });
            setTimeout(function () {
                xhr.abort();
            },10000);
        } catch (err){
            alert("something went wrong"+err);
        }
    }
    function changeToILS(foreign,type){
        try{
            $.getJSON("http://api.fixer.io/latest?base="+type,function (data) {
                $.each(data, function(index, element) {
                    ILSAmount.html(Math.round((element.ILS * foreign) * 100 )/100);
                });
            });
        } catch(err) {
            alert("something went wrong "+err)
        }

    }
    form.submit(function(e) {
        e.preventDefault();
        if(amount.val()===""||firDate.val()===""||secDate.val()==="")
                error.css("display","inline");
        else {
            error.css("display","none");
            loadPeople();
            people.fadeIn();
            savedCoin = $("#coin").val();
            changeToILS(amount.val(),savedCoin);
        }
    });
    firDate.datepicker({minDate: 0,  dateFormat: "yy-mm-dd"
    });
    firDate.datepicker().datepicker("setDate", new Date());
    secDate.datepicker({minDate: 0,  dateFormat: "yy-mm-dd"
    });
    secDate.datepicker().datepicker("setDate", new Date());
    firDate.datepicker().change(function () {
        secDate.datepicker("setDate",firDate.datepicker().val());
    });
    secDate.datepicker().change(function () {
        if(firDate.datepicker().val()>secDate.datepicker().val())
            firDate.datepicker("setDate",secDate.datepicker().val());
    });

    $("#avatar").click(function () {
        location.href = "../../profile/index.html";
    });
    $("#listType").click(function () {
        window.location.href = '../tableView.html';
    });
    $("section").click(function () {
        window.location.href = '../../requestBuyer/index.html';
    });
    function initmap (lat,lng) {
        var uluru = {lat: lat, lng: lng};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 16,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map
        });
    }
});

