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
        button=$("#button");
    $("li:last").addClass("underLine");
    for(i=0;i<24;i++){
        InSection();
    }

    function InSection(){
        obj.before("<section></section>");
        avatarsNum++;
    }

    button.click(function(e) {
/*        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '../../includes/all.php',
            data: $(this).serialize(),
            success: function() {
                var MyJSStringVar = <?php echo $fruits_list ?>;
                console.log(MyJSStringVar);
            }
        });*/
        people.slideDown();
        arrowDown.slideDown();
        arrowUp.slideDown();
        return false;
    });



   /*
    $('.submit_to_a').parent('form').on('submit', function(e) {

    e.preventDefault();

    $.ajax({
    type: 'post',
    url: 'a.php',
    data: $(this).serialize(),
    success: function() {}
    });

    });
   */
/*    arrowUp.click(function() {
        if(scroll<scrollTop-224){
            scroll+=112;
            people.animate({scrollTop: scroll},500);
        }
        return false;
    });
    arrowDown.click(function() {
        if(scroll>0){
            scroll-=112;
            people.animate({scrollTop: scroll},500);
        }
        return false;
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
