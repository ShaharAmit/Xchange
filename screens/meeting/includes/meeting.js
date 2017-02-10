
//map componnet
/*function initMap() {
    var uluru = {lat: 32.089, lng: 34.802};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17, center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}*/
$(function(){
    /*navigator.geolocation.getCurrentPosition(function(position) {*/
        var nLatitude = 32.090;
        var nLongitude = 34.803;
        var latlng = new google.maps.LatLng(nLatitude, nLongitude);//user position
        var map_opts = {
            zoom: 15,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP //HYBRID,ROADMAP,TERRAIN,SATELLITE
        };
        map=new google.maps.Map(document.getElementById("map"),map_opts);
        var markerIt = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "you are here!!"
        });
});

