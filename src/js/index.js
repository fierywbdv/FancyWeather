import '../sass/main.scss';
import state from './state';
import firstPage from './firstPage';
import makeRequest from './nextPage';
import changeLanguage from './changeLanguage';
import speakVoice from './speechControl';
import button from './variables';
import hasLetter from './validation';
import {} from './setInterval';
import {} from './calendar';


const message = document.querySelector('.message-wrapper');
// загрузка первой страницы
document.addEventListener('DOMContentLoaded', async () => {
  try {
    firstPage();
  } catch (err) {
    message.innerText = `ERROR CATCH(${err.code}): ${err.message}`;
    throw err;
  }
});

button.addEventListener('click', async () => {
  const town = document.querySelector('.search-input').value;
  if (town !== '' && hasLetter(town)) {
    message.innerText = '';
    if (message.innerText === "ERROR CATCH(undefined): Cannot read property 'components' of undefined") {
      console.warn('ERROR(что-то пошло не так');
    } else {
      state.cityName = town;
      makeRequest(state.cityName);
    }
  } else {
    if (localStorage.getItem('language') === 'ru') {
      message.innerText = 'Введите правильный запрос';
    }
    if (localStorage.getItem('language') === 'en') {
      message.innerText = 'Enter the correct request';
    }
    if (localStorage.getItem('language') === 'be') {
      message.innerText = 'Увядзіце правільны запыт';
    }
  }
});
// загрузка послудующей страницы при нажатии на ентер
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    button.click();
  }
});

const checkbox = document.querySelector('#checkboxMode');
const switchLanguageElement = document.querySelector('.switch-language');
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

checkbox.onchange = () => {
  if (checkbox.checked) {
    state.degree = 'cel';
    document.querySelectorAll('[data=temp]').forEach((item) => {
      const element = item;
      element.innerHTML = Math.round(((+element.innerHTML - 32) * 5) / 9);
    });
  } else {
    state.degree = 'far';
    document.querySelectorAll('[data=temp]').forEach((item) => {
      const element = item;
      element.innerHTML = Math.round((+element.innerHTML * 9) / 5 + 32);
    });
  }
  localStorage.setItem('degree', state.degree);
};

speakVoice();
