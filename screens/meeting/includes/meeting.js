
//map componnet
function initMap() {
    var uluru = {lat: 32.089, lng: 34.802};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17, center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}
