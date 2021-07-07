import getGeoData from './getGeoData';
import state from './state';
import drawPageWeather from './drawPageWeather';
import showMap from './showMap';
import getBackgroundImage from './getBackgroundImage';

const checkbox = document.querySelector('#checkboxMode');

export default async function makeRequest(city) {
  await getGeoData(city);

  await drawPageWeather(state.language, state.coords, state.cityName, state.countryName);
  if (!checkbox.checked) {
    state.degree = 'far';
    document.querySelectorAll('[data=temp]').forEach((item) => {
      const element = item;
      element.innerHTML = Math.round((+element.innerHTML * 9) / 5 + 32);
    });
  }
  await getBackgroundImage(state.cityName);

  showMap(state.coords);
}
