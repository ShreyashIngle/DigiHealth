"use strict";

// Class definition
var KTGoogleMapsDemo = function() {

    // Private functions

    var demo1 = function() {
        var map = new GMaps({
            div: '#kt_gmap_1',
            lat: 22.3068135186707,
            lng: 70.76779844914232
        });
        map.addMarker({
            lat: 22.3068135186707,
            lng: 70.76779844914232,
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