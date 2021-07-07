import state from './state';

const message = document.querySelector('.message-wrapper');
const geoDataKey = '41aa6c2782d542e6acc9e748d27c6b4c';
export default async function getGeoData(parameter) {
  try {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${parameter}&key=${geoDataKey}&pretty=1`;
    const res = await fetch(url);
    const data = await res.json();
    if (data) {
      const { city } = data.results[0].components;
      const cityRegion = data.results[0].formatted.split(',');
      const cityAnotherSearch = cityRegion[0].toString().replace(/[0-9]/g, '');

      state.cityName = city !== undefined ? city : cityAnotherSearch;

      state.countryName = data.results[0].components.country;
      state.coords.latitude = +data.results[0].geometry.lat;
      state.coords.longitude = +data.results[0].geometry.lng;

      state.timeZone = data.results[0].annotations.timezone.name;
    } else {
      message.innerText = 'somesyng ment wrong';
      console.warn('ERROR CATCH(somesyng ment wrong)');
    }
  } catch (err) {
    message.innerText = `ERROR CATCH(${err.code}): ${err.message}`;
    console.warn(`ERROR CATCH(${err.code}): ${err.message}`);
  }
}
