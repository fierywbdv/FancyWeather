import interfaceConfig from './controlConfig';
import state from './state';

const message = document.querySelector('.message-wrapper');

try {
  setInterval(() => {
    const date = new Date();
    const timeZonaFull = date.toLocaleString(state.language, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
      timeZone: state.timeZone,
    });
    const timeZona = Number(date.toLocaleString(state.language, {
      day: 'numeric',
      timeZone: state.timeZone,
    }));
    const dateWiew = `${interfaceConfig.month[state.language][date.getMonth()]} 
      ${date.getFullYear()} 
      ${timeZonaFull}`;
    if (timeZona === date.getDate()) {
      document.querySelector('.weather-card_day').innerHTML = `
      ${interfaceConfig.weekDays[state.language][date.getDay() % 7]} 
      ${date.getDate()} 
      ${dateWiew}`;
    }
    if (timeZona < date.getDate() && date.getDay() !== 0) {
      document.querySelector('.weather-card_day').innerHTML = `
      ${interfaceConfig.weekDays[state.language][(date.getDay() - 1) % 7]} 
      ${date.getDate() - 1} 
      ${dateWiew}`;
    }
    if (timeZona < date.getDate() && date.getDay() === 0) {
      document.querySelector('.weather-card_day').innerHTML = `
      ${interfaceConfig.weekDays[state.language][6]} 
      ${date.getDate() - 1} 
      ${dateWiew}`;
    }
    if (timeZona > date.getDate()) {
      document.querySelector('.weather-card_day').innerHTML = `
      ${interfaceConfig.weekDays[state.language][(date.getDay() + 1) % 7]} 
      ${date.getDate() + 1} 
      ${dateWiew}`;
    }
  }, 1000);
} catch (err) {
  message.innerText = `ERROR CATCH(${err.code}): ${err.message}`;
  console.warn(`ERROR CATCH(${err.code}): ${err.message}`);
  throw err;
}

export default setInterval;
