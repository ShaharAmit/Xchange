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
        sellerTd,
        sellerTu,
        dealAmount,
        sellerFullname,
        userLat,
        userLng,
        dealCurrency,
        savedCoin,
        lat,
        lng,
        inNis,
        id,
        messege,
        viewtype = "grid";
        ILSAmount = $("#ilsAmount");
    $("li").last().addClass("underLine");
    function InSection(i,picUrl,dId,lati,longt,damo,dcurren,daddress,sName,tu,td,sRank,sid){
        obj.before("<section id="+dId+"></section>");
        $("#"+dId).data({lat:lati,lng:longt,amount:damo,code:dcurren,location:daddress,sName:sName,tu:tu,td:td,sRank:sRank,sid:sid});
        $("section").eq(i).css('background-image', 'url(' + picUrl + ')');
    }
    function loadPeople(sortType) {
        try {
            $('.fa').remove();
            form.before("<i class='fa fa-refresh fa-spin' style='font-size:60px; position: fixed; left: 50%; top: 80%;z-index: 5;'></i>");
            console.log(sortType);
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
                    currency: "USD",
                    sortType: sortType
                },
                dataType: 'json',
                success: function (data) {
                    $.each(data, function (index, element) {
                        sellerId = element.deals_seller_id;
                        pictureURL ="../../images/users/"+sellerId+".png";
                        dealId = element.deals_id;
                        lng = element.deals_lng;
                        lat = element.deals_lat;
                        dealAmount = element.deals_amount;
                        dealCurrency = element.deals_currency;
                        address ="מיקום ההחלפה:"+ " "+ element.deals_location ;
                        sellerFullname =  element.user_name + " " +element.user_last_name;
                        sellerTu = element.user_tumb_u;
                        sellerTd = element.user_tumb_d;
                        sellerRank = element.user_rank;
                        userLat = element.user_lat;
                        userLng = element.user_lng;
                        if(viewtype =="grid"){
                            InSection(index,pictureURL,dealId,lat,lng,dealAmount,dealCurrency,address,sellerFullname,sellerTu,sellerTd,sellerRank,sellerId);
                        }
                        else if(viewtype == "list"){
                            createRow(index,pictureURL,dealId,lat,lng,dealAmount,dealCurrency,address,sellerFullname,sellerTu,sellerTd,sellerRank,sellerId);
                        }
                    });
                    $("section").click(function (seller) {
                        var dlat = ($(seller.currentTarget).data('lat')),
                            dlng = ($(seller.currentTarget).data('lng')),
                            damou = ($(seller.currentTarget).data('amount')),
                            dcode = ($(seller.currentTarget).data('code')),
                            daddre = ($(seller.currentTarget).data('location')),
                            sellerName = ($(seller.currentTarget).data('sName')),
                            sellertu = ($(seller.currentTarget).data('tu')),
                            sellertd = ($(seller.currentTarget).data('td')),
                            sellerRank =($(seller.currentTarget).data('sRank')),
                            sellerID = ($(seller.currentTarget).data('sid')),
                            did =  seller.currentTarget.id,
                        body = $("body");
                        body.append("<div id='coverBlack'></div>");
                        body.append("<div id='userMessege'><div id='exit'></div></div>");
                        dealsInfo(damou,dcode,daddre,sellerName);
                        initmap(dlat,dlng);
                        $("#btsend").click(function () {
                            $("#userMessege").empty();
                            massegesSeant(did,messege,damou,dcode,sellerID);

                        });
                        $("#btinfo").click(function () {
                            $("#userMessege").empty();
                            sellerInfo();
                        });
                        setexit();
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
        } catch (err) {
            alert("something went wrong" + err);
        }
    }
    function changeToILS(currAmaountVal,type){
        try{
            $.getJSON("http://api.fixer.io/latest?base="+type,function (data) {
                $.each(data, function(index, element) {
                    ILSAmount.html(Math.round((element.ILS * currAmaountVal) * 100 )/100);
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
            loadPeople("deals_amount","grid");
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
        location.href = "#";
    });
    $("#listType").click(function () {
        $("#scrollBuying").empty();
        if(viewtype == "grid"){
            $("#listType").css('background-image','url("../../images/buttons/btGrid.png');
            viewtype = "list";
            loadPeople("deals_amount");

        }
        else if(viewtype == "list"){
            $("#listType").css('background-image','url("../../images/buttons/btList.png');
            viewtype = "grid";
            loadPeople("deals_amount");

        }
    });
    function initmap (lat,lng) {
        var uluru = {lat: parseFloat(lat), lng: parseFloat(lng)};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 16,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map
        });
    }
    function dealsInfo (dAmount,dCurr,dAddress,nameOfseller) {
        var usermassege = $("#userMessege");
        inNis =  getNis(dCurr,dAmount);
        usermassege.append("<h2 class ='sellerName'>"+nameOfseller+"</h2>");
        usermassege.append("<h3 class ='dealinfo'> :מוכר/ת</h3>");
        usermassege.append("<h3 class ='priceing'>"+dAmount+" "+dCurr+"</h3>");
        usermassege.append("<h3 class ='dealinfo'>:ערך העסקה בשקלים</h3>");
        usermassege.append("<h3 id='nis' class ='priceing'>"+inNis+" NIS</h3>");
        usermassege.append("<h3 class ='addressText'>"+dAddress+"</h3>");
        usermassege.append("<div id="+'map'+"></div>");
        usermassege.append("<textarea rows='4' cols='50' placeholder='כתוב הודעה'>");
        usermassege.append("<div id='btsend'></div>");
        usermassege.append("<div id='btinfo'></div>");
        messege = $("textarea").eq(0).val();
    }
    function sellerInfo() {
        var usermassege = $("#userMessege");
        usermassege.append("<div id='exit'></div>");
        setexit();
    }

    function sender (n,m,a,c,s){
    var usermassege = $("#userMessege");
        usermassege.append("<div id='exit'></div>");
        console.log(n,"בדיקה",a,c,s,id);
        $.ajax({
            url: "../../includes/action.php?",
            data: {
                action: 'sendMassege',
                deal_id: n,
                message: "בדיקה",
                amount: a,
                code: c,
                buyer_Id:id,
                selle_id: s
            },
            dataType: 'text',
            type: 'GET',
            success: function(result) {
                console.log(result);
                if(result.match("^ok")){
                    usermassege.append("<p>ההודעה נשלחה בהצלחה</p>");
                    usermassege.css('background-image','url(../../images/graphics/sendSecseded.png');
                }
            }
        });
    }
    function massegesSeant(pn,pm,pa,pc,ps) {
        setexit();
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
                sender(pn,pm,pa,pc,ps);
            }
        });


    }
    function setexit() {
        $("#exit").click(function () {
            $("#userMessege").remove();
            $("#coverBlack").remove();
        });
    }
    function getNis(dCurr,dAmount) {
        var temp = [];
        try{
            $.getJSON("http://api.fixer.io/latest?base="+dCurr,function (data) {
                $.each(data, function(index, element) {
                    temp.push(Math.round((element.ILS * dAmount) * 100 )/100);
                    $("#nis").html(temp[2]+ " NIS");
                });
            });
        } catch(err) {
            alert("something went wrong "+err)
        }
    }
    $("#filScore").click(function () {
        $("section").remove();
        loadPeople("user_rank");
    });
    $("#filCash").click(function () {
        $("section").remove();
        loadPeople("deals_amount");
    });

    function createRow(i,picUrl,dId,lati,longt,damo,dcurren,daddress,sName,tu,td,sRank,sid) {
        var sb = $("#scrollBuying");
        sb.append("<div id ="+dId+" class='row'>"+
                "<div id='pic' class='cell'></div>" +
                "<div class='cell'><p>"+sName+"</p></div>" +
                "<div  id='rank' class='cell'></div>" +
                "<div class='cell'><p>"+damo+" "+dcurren+"</p></div>" +
                "</div>"
        )
        $("#"+dId).data({lat:lati,lng:longt,amount:damo,code:dcurren,location:daddress,sName:sName,tu:tu,td:td,sRank:sRank,sid:sid});
        $(".row").find("#pic").eq(i).css('background-image', 'url(' + picUrl + ')');
    };

});