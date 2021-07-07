
import interfaceConfig from './controlConfig';

const input = document.querySelector('.search-input');
const button = document.querySelector('.search-button');
const buttonVoice = document.querySelector('.control-button');

const msg = new SpeechSynthesisUtterance();
msg.volume = 0.5;
function listenTotheWeather() {
  const descriptionCard = document.querySelector('.descriptionCard').innerText;
  const feelsLikeCard = document.querySelector('.feelsLikeCard').innerText;
  const temp = document.querySelector('.temp').innerText.split(' ')[0];
  const windCard = document.querySelector('.windCard').innerText;
  const windSpeed = document.querySelector('.windSpeed').innerText;
  const humidityCard = document.querySelector('.humidityCard').innerText;
  const humidityValue = document.querySelector('.humidityValue').innerText;
  msg.rate = 1;
  msg.pitch = 1;
  msg.text = `${interfaceConfig.sound[localStorage.getItem('language')]} ${temp} ${interfaceConfig.degree[localStorage.getItem('language')]},  
  ${descriptionCard},
  ${feelsLikeCard} ${temp} ${interfaceConfig.degree[localStorage.getItem('language')]},
  ${windCard} ${windSpeed} ${interfaceConfig.windWord[localStorage.getItem('language')]},
  ${humidityCard} ${humidityValue}`;
  speechSynthesis.speak(msg);
}

export default function speakVoice() {
  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  const microphoneBtn = document.querySelector('.voice-button');
  const recognition = new window.SpeechRecognition();
  recognition.interimResults = false;
  recognition.maxAlternatives = 2;
  recognition.continuous = false;

  recognition.onresult = (event) => {
    for (let i = event.resultIndex, len = event.results.length; i < len; i += 1) {
      const { transcript } = event.results[i][0];
      if (event.results[i].isFinal) {
        input.value = transcript;
      } else {
        input.value = transcript;
      }
    }
    if (localStorage.getItem('language') === 'en') {
      switch (input.value) {
        case 'weather':
          listenTotheWeather();
          break;
        case 'quieter':
          msg.volume -= 0.2;
          break;
        case 'louder':
          msg.volume += 0.2;
          break;
        default:
          button.click();
      }
    }
    if (localStorage.getItem('language') === 'ru') {
      switch (input.value) {
        case 'погода':
          listenTotheWeather();
          break;
        case 'тише':
          msg.volume -= 0.2;
          break;
        case 'громче':
          msg.volume += 0.2;
          break;
        default:
          button.click();
      }
    }
    if (localStorage.getItem('language') === 'be') {
      switch (input.value) {
        case 'надвор\'е':
          listenTotheWeather();
          break;
        case 'цішэй':
          msg.volume -= 0.2;
          break;
        case 'гучней':
          msg.volume += 0.2;
          break;
        default:
          button.click();
      }
    }
  };

  recognition.onaudioend = () => {
    microphoneBtn.classList.remove('microphone-active');
  };

  const microphoneactivated = () => {
    microphoneBtn.addEventListener('click', () => {
      if (localStorage.getItem('language') === 'en') {
        recognition.lang = 'en-US';
        msg.lang = 'en-UK';
      } else if (localStorage.getItem('language') === 'ru') {
        recognition.lang = 'ru-RU';
        msg.lang = 'ru-RU';
      } else if (localStorage.getItem('language') === 'be') {
        recognition.lang = 'be-BE';
        msg.lang = 'be-BE';
      }
      if (microphoneBtn.classList.contains('microphone-active')) {
        microphoneBtn.classList.remove('microphone-active');
        recognition.stop();
      } else {
        microphoneBtn.classList.add('microphone-active');
        recognition.start();
      }
    });
  };
  microphoneactivated();
}

buttonVoice.addEventListener('click', () => {
  const recognition = new window.SpeechRecognition();
  if (localStorage.getItem('language') === 'en') {
    recognition.lang = 'en-US';
    msg.lang = 'en-UK';
  } else if (localStorage.getItem('language') === 'ru') {
    recognition.lang = 'ru-RU';
    msg.lang = 'ru-RU';
  } else if (localStorage.getItem('language') === 'be') {
    recognition.lang = 'be-BE';
    msg.lang = 'be-BE';
  }
  recognition.start();
  listenTotheWeather();
  recognition.stop();
});
