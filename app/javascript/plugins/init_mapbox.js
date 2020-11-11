import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 120, maxZoom: 15, duration: 0 });
};

const initMapbox = () => {
  // Select the map
  const mapElement = document.getElementById('map');

  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/yannlucklein/ckhcpz1w713xj1aqfigczblb5'
    });

    map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken, mapboxgl: mapboxgl }));

    const markers = JSON.parse(mapElement.dataset.markers);

    markers.forEach((marker) => {

      const popup = new mapboxgl.Popup().setHTML(marker.infoWindow); // add this

      // Create a HTML element for your custom marker
      const element = document.createElement('i');
      element.className = 'fas fa-map-pin';
      element.style.fontSize = '64px';
      element.style.color = 'green';
      // element.style.backgroundImage = `url('${marker.image_url}')`;
      // element.style.backgroundSize = 'contain';
      // element.style.borderRadius = '50%';
      // element.style.width = '32px';
      // element.style.height = '32px';

      new mapboxgl.Marker(element)
        .setLngLat([ marker.lng, marker.lat ])
        .setPopup(popup)
        .addTo(map);
    });

    fitMapToMarkers(map, markers);
  }
};

export { initMapbox };
