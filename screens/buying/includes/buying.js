$(function(){
    var clear=$("#clear"),
        obj=$("div.clear", "#scrollBuying").last(),
        avatarsNum=0,
        form = $("form"),
        people=$("#scroll"),
        button=$("#button"),
        firDate = $("#firstDate"),
        secDate = $("#secondDate"),
        amount = $("#amount"),
        error = $(".error"),
        pictureURL,
        savedAmount,
        savedFirDate,
        savedSecDate,
        savedCoin,
        ILSAmount = $("#ilsAmount");
    $("li:last").addClass("underLine");
    function InSection(){
        obj.before("<section></section>");
        $("section").eq(avatarsNum).css('background-image', 'url(' + pictureURL + ')');
        avatarsNum++;
    }
    function loadPeople() {
        obj.before("<i class='fa fa-refresh fa-spin' style='font-size:60px; position: fixed; left: 50%; top: 70%'></i>");
        $.ajax({
            type: "GET",
            url: "../../includes/action.php?",
            data:{
                action: "people",
                img: avatarsNum+1
            },
            dataType: 'json',
            success: function (data) {
                $.each(data, function(index, element) {
                    pictureURL = element.IMG;
                    InSection();
                });
                $(".fa").remove();
            }
        });
    }
    function changeToILS(foreign,type){
        try{
            $.getJSON("http://api.fixer.io/latest?base="+type,function (data) {
                $.each(data, function(index, element) {
                    ILSAmount.html(element.ILS * foreign);
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
            people.fadeIn();
            loadPeople();
            savedCoin = $("#coin").val();
            changeToILS(amount.val(),savedCoin);
        }
    });
    firDate.datepicker({minDate: 0, onSelect: function () {
        secDate.datepicker({minDate: firDate.val(), setDate: firDate.val});
    }});
    firDate.datepicker().datepicker("setDate", new Date());
    secDate.datepicker({minDate: 0});
    secDate.datepicker().datepicker("setDate", new Date());

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

