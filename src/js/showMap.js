
const mapboxgl = require('mapbox-gl');

const message = document.querySelector('.message-wrapper');
const mapToken = 'pk.eyJ1IjoidmlydGFsIiwiYSI6ImNrYWlpODNqbTAxMHUyeG13NHpkZnYwNXMifQ.Y8602VcUdPFt6jpTLC4Q8w';
export default function showMap(coords) {
  try {
    document.querySelector('.map').innerHTML = '';
    const lat = coords.latitude;
    const lng = coords.longitude;
    mapboxgl.accessToken = `${mapToken}`;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 10,
      logoPosition: 'top-left',
      attributionControl: false,
      showUserLocation: true,
    });
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
    );
    map.addControl(new mapboxgl.NavigationControl());
    const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
    return marker;
  } catch (err) {
    message.innerText = `ERROR CATCH(${err.code}): ${err.message}`;
    console.warn(`ERROR(${err.code}): ${err.message}`);
    throw err;
  }
}
