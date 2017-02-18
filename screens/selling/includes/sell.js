var lat="";
var lng="";
var addressName="";

$("document").ready(function () {
    $("#inpDate").datepicker({
        minDate: 0,
        dateFormat: "yy-mm-dd"
    });
    $("#inpDate").datepicker().datepicker("setDate", new Date());
    $("#inpTime").timepicker({
        timeFormat: 'h:mm p',
        interval: 60,
        minTime: '7',
        maxTime: '22:00pm',
        defaultTime: '22',
        startTime: '07:00',
        dynamic: false,
        dropdown: true,
        scrollbar: true
    });

});
function initMap() {
    var nLatitude = 32.090;
    var nLongitude = 34.803;
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: nLatitude, lng: nLongitude},
        zoom: 15
    });
    var input = document.getElementById('searchInput');
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            //window.alert("Autocomplete's returned place contains no geometry");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(15);
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || '')
            ].join(' ');
        }

        infowindow.setContent('<div id="infoeindow" style="text-align: right;width: 100%">' +
            '<strong>' + place.name + '</strong><br>' + address +'</div>');
        infowindow.open(map, marker);

        //Location details
        for (var i = 0; i < place.address_components.length; i++) {
            if(place.address_components[i].types[0] == 'postal_code'){
                document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;
            }
            if(place.address_components[i].types[0] == 'country'){
                //document.getElementById('country').innerHTML = place.address_components[i].long_name;
            }
        }
        // document.getElementById('location').innerHTML = place.formatted_address;
        // document.getElementById('lat').innerHTML = place.geometry.location.lat();
        // document.getElementById('lon').innerHTML = place.geometry.location.lng();

        addressName = place.formatted_address;
        lat = place.geometry.location.lat();
        lng = place.geometry.location.lng();

    });

}
function submiting() {
    var amount = $("#inpamunt").eq(0).val(),
        currency =$("#seletCurr").eq(0).val(),
        time = $("#inpTime").eq(0).val(),
        date = $("#inpDate").eq(0).val(),
        body = $("body");
    if(amount > 0 && currency != "---" && addressName != ""){
       //save to db
        $.ajax({
            url: "../../includes/action.php?",
            data: {
                action: 'publishSell',
                amount: amount,
                currency: currency,
                time: time,
                date: date,
                address: addressName,
                lat: lat,
                lng: lng,
                sellerId: "12345678"
            },
            dataType: 'text',
            type: 'GET',
            success: function(result) {
                console.log(result);
                if(result.match("^ok")){
                    body.append("<div id='coverBlack'></div>");
                    body.append("<div id='userMessege'><p>המכירה פורסמה בהצלחה</p><div id='exit'></div></div>");
                    $("#userMessege").css('background-image','url(../../images/graphics/sellPublished.png');
                    $ ("#sellForm").submit(function (e) {
                        e.preventDefault();
                    });
                    $("#exit").click(function () {
                        location.reload();
                    });
                    $("#coverBlack").click(function () {
                        location.reload();
                    });
                }
            }
        });
    }
    else {
        $("#aform").append("<p class='erorMes'>יש להזין סכום גדול מ-1 וגם לבחור מטבע ומיקום להחלפה</p>")
    }

}

