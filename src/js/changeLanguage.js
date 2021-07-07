import interfaceConfig from './controlConfig';
import descriptionWeather from './descriptionWeather';
import drawInterfaceInfo from './drawInterfaceInfo';
import state from './state';

const switchLanguageElement = document.querySelector('.switch-language');
const changeLanguage = (language, city, country, lat, lng, descriptionCode) => {
  const date = new Date();
  let lang;
  switch (language) {
    case 'en':
      lang = 0;
      break;
    case 'ru':
      lang = 1;
      break;
    case 'be':
      lang = 2;
      break;
    default:
  }
  document.querySelector('.feelsLikeCard').innerHTML = interfaceConfig.feelsLike[language];
  document.querySelector('.windCard').innerHTML = interfaceConfig.wind[language];
  document.querySelector('.humidityCard').innerHTML = interfaceConfig.humidity[language];
  document.querySelector('.windSpeedCard').innerHTML = interfaceConfig.windSpeed[language];
  let i = 0;
  document.querySelectorAll('.weather-small-card_day').forEach((item) => {
    const element = item;
    element.innerHTML = interfaceConfig.weekDays[language][(date.getDay() + i + 1) % 7];
    i += 1;
  });
  document.querySelector('.descriptionCard').innerHTML = descriptionWeather[descriptionCode][lang];

  drawInterfaceInfo(language, city, country, lat, lng);
};

switchLanguageElement.addEventListener('click', (event) => {
  switch (event.target.value) {
    case '2':
      state.language = 'ru';
      break;
    case '3':
      state.language = 'be';
      break;
    default:
      state.language = 'en';
      break;
  }
  localStorage.setItem('language', state.language);
  changeLanguage(state.language, state.cityName, state.countryName,
    state.coords.latitude, state.coords.longitude, state.descriptionCode);
});

export default changeLanguage;
