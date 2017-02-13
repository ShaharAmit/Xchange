/**
 * Created by danielluzgarten on 10/02/2017.
 */
// $(function(){
//     /*navigator.geolocation.getCurrentPosition(function(position) {*/
//     var nLatitude = 32.090;
//     var nLongitude = 34.803;
//     var latlng = new google.maps.LatLng(nLatitude, nLongitude);//user position
//     var map_opts = {
//         zoom: 15,
//         center: latlng,
//         mapTypeId: google.maps.MapTypeId.ROADMAP //HYBRID,ROADMAP,TERRAIN,SATELLITE
//
//     };
//     map=new google.maps.Map(document.getElementById("map"),map_opts);
//     var markerIt = new google.maps.Marker({
//         position: latlng,
//         map: map,
//         title: "you are here!!"
//     });
// });

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
                document.getElementById('country').innerHTML = place.address_components[i].long_name;
            }
        }
        document.getElementById('location').innerHTML = place.formatted_address;
        document.getElementById('lat').innerHTML = place.geometry.location.lat();
        document.getElementById('lon').innerHTML = place.geometry.location.lng();
    });

}
function submiting() {
     document.getElementById("sellForm").submit();
}