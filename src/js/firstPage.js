import getGeoData from './getGeoData';
import state from './state';
import drawPageWeather from './drawPageWeather';
import showMap from './showMap';
import getBackgroundImage from './getBackgroundImage';
import checkbox from './variables';

const message = document.querySelector('.message-wrapper');
function firstPage() {
  const lang = {
    en: 1,
    ru: 2,
    be: 3,
  };
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      document.querySelector('.background').style.zIndex = '10';
      const crd = pos.coords;
      const coordsParameter = `${crd.latitude}+${crd.longitude}`;
      await getGeoData(coordsParameter);

      if (localStorage.getItem('language')) {
        state.language = localStorage.getItem('language');
        document.querySelector('.switch-language').value = lang[state.language];
      } else {
        localStorage.setItem('language', 'en');
      }
      await drawPageWeather(state.language, state.coords, state.cityName, state.countryName);
      if (localStorage.getItem('degree') === 'far') {
        state.degree = 'far';
        checkbox.checked = false;
        document.querySelectorAll('[data=temp]').forEach((item) => {
          const element = item;
          element.innerHTML = Math.round((+element.innerHTML * 9) / 5 + 32);
        });
      }
      showMap(state.coords);
      await getBackgroundImage();
      document.querySelector('.background').style.zIndex = '-1';
    },
    async (err) => {
      console.warn(`ERROR CATCH(${err.code}): ${err.message}`);
      message.innerText = `${`ERROR(${err.code}): ${err.message}`}`;
      document.querySelector('.background').style.zIndex = '10';
      await getGeoData('Minsk');

      if (localStorage.getItem('language')) {
        state.language = localStorage.getItem('language');
        document.querySelector('.switch-language').value = lang[state.language];
      } else {
        localStorage.setItem('language', 'en');
      }
      await drawPageWeather(state.language, state.coords, state.cityName, state.countryName);
      if (localStorage.getItem('degree') === 'far') {
        state.degree = 'far';
        checkbox.checked = false;
        document.querySelectorAll('[data=temp]').forEach((item) => {
          const element = item;
          element.innerHTML = Math.round((+element.innerHTML * 9) / 5 + 32);
        });
      }
      showMap(state.coords);
      await getBackgroundImage();
      document.querySelector('.background').style.zIndex = '-1';
    },
    options,
  );
}

export default firstPage;
