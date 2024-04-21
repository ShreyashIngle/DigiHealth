"use strict";

// Class definition
var KTGoogleMapsDemo = function() {

    // Private functions

    var demo1 = function() {
        var map = new GMaps({
            div: '#kt_gmap_1',
            lat: 18.5204,
            lng: 73.8567
        });
        map.addMarker({
            lat: 18.5204,
            lng: 73.8567,
            title: 'Digihealth Hospital',
            click: function(e) {
                alert('You clicked in this marker');
            }
        });
    }


    return {
        // public functions
        init: function() {
            // default charts
            demo1();
        }
    };
}();

jQuery(document).ready(function() {
    KTGoogleMapsDemo.init();
});