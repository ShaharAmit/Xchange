$(function(){
    var clear=$("#clear"),
        obj=$("#clearing").last(),
        avatarsNum=0,
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
    function InSection(index,pictureURL){
        obj.before("<section></section>");
        $("section").eq(index).css('background-image', 'url(' + pictureURL + ')');
        avatarsNum++;
    }
    function loadPeople() {
        try {
            $('.fa').remove();
            form.before("<i class='fa fa-refresh fa-spin' style='font-size:60px; position: fixed; left: 50%; top: 80%;z-index: 5;'></i>");
            var xhr = $.ajax({
                type: "GET",
                url: "../../includes/action.php?",
                data: {
                    action: "getSellers",
                    fromDate: firDate.eq(0).val(),
                    toDate: secDate.eq(0).val(),
                    amount: amount.eq(0).val(),
                    currency: form.eq(0).val()
                },
                dataType: 'json',
                success: function (data) {
                    alert(data.length);
                    $.each(data, function (index, element) {
                        sellerId = element.deals_seller_id;
                        pictureURL ="../../images/users/"+sellerId+".png";
                        InSection(index,pictureURL);
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

});

