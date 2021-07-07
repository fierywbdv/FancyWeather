// import translateWord from './translateWord';
import interfaceConfig from './controlConfig';

const drawInterfaceInfo = async (language, city, country, lat, lng) => {
  document.querySelector('.search-input').placeholder = `${interfaceConfig.searchPlaceholder[language]}`;
  document.querySelector('.search-button').innerHTML = `${interfaceConfig.search[language]}`;
  // const cityName = await translateWord(city, language);
  // const countryName = await translateWord(country, language);
  document.querySelector('.weather-card_city').innerHTML = `${city},${country}`;

  document.querySelector('.coordinates-block').innerHTML = `
    <span class="coordinates-text"> 
    ${interfaceConfig.latitude[language]} : ${lat - (lat - parseInt(lat, 10))}°${Math.abs(parseInt((lat - parseInt(lat, 10)) * 60, 10))}′ <br> 
    ${interfaceConfig.longitude[language]} : ${lng - (lng - parseInt(lng, 10))}°${Math.abs(parseInt((lng - parseInt(lng, 10)) * 60, 10))}′ 
  </span>`;
};
export default drawInterfaceInfo;
