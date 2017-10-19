var map = L.map('map', {
  center: [40.000, -75.1639],
  zoom: 12
});
var CartoDB_Positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


$( document ).ready(function() {
    /*
     * Mobile sidebar toggle
     */
     $('#sidebar-toggle').on('click', function(el) {
        el.preventDefault();

        $('.sidebar').toggleClass('active');
     });


     /*
      * Selectize
      */
      $('.selectize').selectize({
          create: true,
          sortField: 'text'
      });

      //$('#modal').modal()
});