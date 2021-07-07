import interfaceConfig from './controlConfig';
import descriptionWeather from './descriptionWeather';
import state from './state';

const drawWeatherCard = (data, data2, language) => {
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
  const descriptionCode = data.data[0].weather.code;
  state.descriptionCode = descriptionCode;

  document.querySelector('.weather-card_temp').innerHTML = `<span data="temp">${Math.round(data.data[0].temp)}</span>°`;
  document.querySelector('.weather-card_icon').src = `assets/image/${data.data[0].weather.icon}.svg`;
  document.querySelector('.weather-card_info').innerHTML = `
  <span class="descriptionCard">${descriptionWeather[descriptionCode][lang]}</span> <br>
  <span class="feelsLikeCard">${interfaceConfig.feelsLike[language]}</span>: <span data="temp" class="temp">${Math.round(data.data[0].app_temp)}</span>°<br>
  <span class="windCard">${interfaceConfig.wind[language]}</span>: <span class="windSpeed"> ${Math.round(data.data[0].wind_spd)} </span><span class="windSpeedCard">${interfaceConfig.windSpeed[language]}</span><br>
  <span class="humidityCard">${interfaceConfig.humidity[language]}</span>: <span class="humidityValue">${data.data[0].rh}%</span>`;

  document.querySelector('.weather-future').innerHTML = '';
  const date = new Date();
  const timeZona = Number(date.toLocaleString(state.language, {
    day: 'numeric',
    timeZone: state.timeZone,
  }));
  for (let i = 0; i < 3; i += 1) {
    if (timeZona === date.getDate()) {
      document.querySelector('.weather-future').innerHTML += `
      <div>
        <span class="weather-small-card_day">${interfaceConfig.weekDays[language][(date.getDay() + i + 1) % 7]}</span>
        <div class="weather-card-small-details">
          <span data="temp">${Math.round(data2.data[i + 1].temp)}</span><span>°</span>
          <img src="assets/image/${data.data[i + 1].weather.icon}.svg">
        </div>
      </div>`;
    }
    if (timeZona < date.getDate()) {
      document.querySelector('.weather-future').innerHTML += `
        <div>
          <span class="weather-small-card_day">${interfaceConfig.weekDays[language][(date.getDay() + i) % 7]}</span>
          <div class="weather-card-small-details">
            <span data="temp">${Math.round(data2.data[i + 1].temp)}</span><span>°</span>
            <img src="assets/image/${data.data[i + 1].weather.icon}.png">
          </div>
        </div>`;
    }
    if (timeZona > date.getDate()) {
      document.querySelector('.weather-future').innerHTML += `
          <div>
            <span class="weather-small-card_day">${interfaceConfig.weekDays[language][(date.getDay() + i + 2) % 7]}</span>
            <div class="weather-card-small-details">
              <span data="temp">${Math.round(data2.data[i + 1].temp)}</span><span>°</span>
              <img src="assets/image/${data.data[i + 1].weather.icon}.png">
            </div>
          </div>`;
    }
  }
};


export default drawWeatherCard;
