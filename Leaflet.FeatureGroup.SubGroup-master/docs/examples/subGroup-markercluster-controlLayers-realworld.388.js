var map = L.map('map', {
  center: [-25.261520, 136.440191],
  minZoom: 2,
  zoom: 4
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
}).addTo(map);

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
  group1 = L.featureGroup.subGroup(mcg), // use `L.featureGroup.subGroup(parentGroup)` instead of `L.featureGroup()` or `L.layerGroup()`!
  group2 = L.featureGroup.subGroup(mcg),
  group3 = L.featureGroup.subGroup(mcg),
  group4 = L.featureGroup.subGroup(mcg),
  group5 = L.featureGroup.subGroup(mcg),
  group6 = L.featureGroup.subGroup(mcg),
  group7 = L.featureGroup.subGroup(mcg),
  control = L.control.layers(null, null, {
    collapsed: false
  }),
  marker;

mcg.addTo(map);

for (i = 0; i < markers.length; i++) {
  var popup = markers[i].properties.Name +
    '<br/><b>Lead Project:</b> ' + markers[i].properties.LeadProject +
    '<br/><b>Role:</b> ' + markers[i].properties.Role +
    '<br/><b>Electorate:</b> ' + markers[i].properties.Electorate;

  var m;
  if (markers[i].properties.Role === "Lead Agent") {
    m = L.marker([markers[i].properties.Latitude, markers[i].properties.Longitude], {
        icon: orangeIcon
      }).addTo(group1)
      .bindPopup(popup);
  } else if (markers[i].properties.Role === "Participant") {
    m = L.marker([markers[i].properties.Latitude, markers[i].properties.Longitude], {
        icon: tealIcon
      }).addTo(group1)
      .bindPopup(popup);
  } else if (markers[i].properties.Role === "Infrastructure Site") {
    m = L.marker([markers[i].properties.Latitude, markers[i].properties.Longitude], {
        icon: yellowIcon
      }).addTo(group1)
      .bindPopup(popup);
  }
  mcg.addLayer(m);
}

for (i = 0; i < aurin.length; i++) {
  var popup2 = aurin[i].properties.Name +
    '<br/><b>Lead Project:</b> ' + aurin[i].properties.LeadProject +
    '<br/><b>Role:</b> ' + aurin[i].properties.Role +
    '<br/><b>Electorate:</b> ' + aurin[i].properties.Electorate;

  var a;

  if (aurin[i].properties.Role === "Lead Agent") {
    a = L.marker([aurin[i].properties.Latitude, aurin[i].properties.Longitude], {
        icon: orangeIcon
      }).addTo(group2)
      .bindPopup(popup2);
  } else if (aurin[i].properties.Role === "Participant") {
    a = L.marker([aurin[i].properties.Latitude, aurin[i].properties.Longitude], {
        icon: tealIcon
      }).addTo(group2)
      .bindPopup(popup2);
  } else if (aurin[i].properties.Role === "Infrastructure Site") {
    a = L.marker([aurin[i].properties.Latitude, aurin[i].properties.Longitude], {
        icon: yellowIcon
      }).addTo(group2)
      .bindPopup(popup2);
  }
  mcg.addLayer(a);
}

control.addOverlay(group1, 'Astronomy Australia');
control.addOverlay(group2, 'AURIN');
control.addOverlay(group3, 'TERN');
control.addOverlay(group4, 'CSIRO');
control.addOverlay(group5, 'AuScope');
control.addOverlay(group6, 'Bioplatforms Australia');
control.addOverlay(group7, 'ANSTO');
control.addTo(map);

group1.addTo(map); // Adding to map now adds all child layers into the parent group.
group2.addTo(map);
group3.addTo(map);
group4.addTo(map);
group5.addTo(map);
group6.addTo(map);
group7.addTo(map);


// Set-up buttons.

document.getElementById("add").addEventListener("click", function() {
  map.addLayer(mcg);
});

document.getElementById("remove").addEventListener("click", function() {
  map.removeLayer(mcg);
});
