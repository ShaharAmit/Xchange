$(function(){
    var clear=$("#clear"),
        obj=$("div.clear", "#scrollBuying").last(),
        avatarsNum=0,
        i,
        form = $("form"),
        people=$("#scroll"),
        arrowUp=$("#arrowUp"),
        arrowDown=$("#arrowDown"),
        scroll=0,
        button=$("#button"),
        firDate = $("#firstDate"),
        secDate = $("#secondDate");
    $("li:last").addClass("underLine");
    for(i=0;i<24;i++){
        InSection();
    }

    function InSection(){
        obj.before("<section></section>");
        avatarsNum++;
    }

    button.click(function(e) {
/*
        e.preventDefault();
*/
/*        $("#amount").required = true;
        console.log("here");*/
        people.slideDown();
        arrowDown.slideDown();
        arrowUp.slideDown();
        return false;
    });
    firDate.datepicker({minDate: 0, onSelect: function () {
        secDate.datepicker({minDate: firDate.val(), setDate: firDate.val});
    }});
    firDate.datepicker().datepicker("setDate", new Date());
    secDate.datepicker({minDate: 0});
    secDate.datepicker().datepicker("setDate", new Date());

    
        
    





   /* $("#form").submit(function(e) {
        e.preventDefault();


    });*/

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

