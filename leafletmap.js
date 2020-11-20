window.onload = function () {
    var basemap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	});

    $.getJSON("route.geojson", function(data) {

    var geojson = L.geoJson(data, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.Area_Name);
      }
    });


    var map = L.map('my-map')
    .fitBounds(geojson.getBounds());

    basemap.addTo(map);
    geojson.addTo(map);

    //https://programminghistorian.org/en/lessons/mapping-with-python-leaflet
    // show geojson with leaflet -> above
    // show an inteactive js marker -> below
    //https://stackoverflow.com/a/13699060/11323942
    var marker = L.marker([35.6825,19.413]).addTo(map);

    // Create an element to hold all your text and markup
    var container = $('<div />');

    // Delegate all event handling for the container itself and its contents to the container
    container.on('click', '.smallPolygonLink', function() {
        alert("test");
    });

    // Insert whatever you want into the container, using whichever approach you prefer
    container.html("This is a link: <a href='#' class='smallPolygonLink'>Click me</a>.");
    container.append($('<span class="bold">').text(" :)"))

    // Insert the container into the popup
    marker.bindPopup(container[0]);

  });

};