
var map = L.map( 'map', {
  center: [-37.801104, 145.041504],
  minZoom: 2,
  zoom: 4
  });

L.tileLayer( 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
}).addTo( map );

var tealIcon = L.icon({
  iconUrl: 'teal.svg',
  iconSize: [29, 24],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

var orangeIcon = L.icon({
  iconUrl: 'orange.svg',
  iconSize: [29, 24],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

var mcg = L.markerClusterGroup(),
    group1 = L.featureGroup.subGroup(mcg),// use `L.featureGroup.subGroup(parentGroup)` instead of `L.featureGroup()` or `L.layerGroup()`!
    group2 = L.featureGroup.subGroup(mcg),
    group3 = L.featureGroup.subGroup(mcg),
    group4 = L.featureGroup.subGroup(mcg),
    control = L.control.layers(null, null, { collapsed: false }),
  marker;

mcg.addTo(map);

for (i = 0; i < markers.length; i++)
{
  marker=markers[i];

var popup = marker.properties.Name +
          '<br/><b>Lead Project:</b> ' + markers[i].properties.LeadProject +
          '<br/><b>Role:</b> ' + markers[i].properties.Role +
          '<br/><b>Electorate:</b> ' + markers[i].properties.Electorate;

var m;
if(marker.properties.Role==="Lead Agent") {
    m = L.marker( [markers[i].properties.Latitude, markers[i].properties.Longitude], {icon: orangeIcon} )
                    .bindPopup( popup );
          }
else if(marker.properties.Role==="Participant") {
    m = L.marker( [markers[i].properties.Latitude, markers[i].properties.Longitude], {icon: tealIcon} )
                    .bindPopup( popup );
          }
  mcg.addLayer( m );

/*  marker.addTo(i < quarterCount ? group1 : i < quarterCount * 2 ? group2 : i < quarterCount * 3 ? group3 : group4);*/
}

control.addOverlay(group1, 'Astronomy Australia');
control.addOverlay(group2, 'AURIN');
control.addOverlay(group3, 'Third quarter');
control.addOverlay(group4, 'Fourth quarter');
control.addTo(map);

group1.addTo(map); // Adding to map now adds all child layers into the parent group.
group2.addTo(map);
group3.addTo(map);
group4.addTo(map);


// Set-up buttons.

document.getElementById("add").addEventListener("click", function () {
  map.addLayer(mcg);
});

document.getElementById("remove").addEventListener("click", function () {
  map.removeLayer(mcg);
});
