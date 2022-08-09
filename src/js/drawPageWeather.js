import drawWeatherCard from './drawWeatherCard';
import drawInterfaceInfo from './drawInterfaceInfo';

const weathwebitKey = '31249ef7ee2e4650b41176858106fd7b';
const message = document.querySelector('.message-wrapper');
export default async function drawPageWeather(language, coords, city, country) {
  try {
    const url1 = `https://api.weatherbit.io/v2.0/forecast/hourly?lat=${coords.latitude}&lon=${coords.longitude}&lang=${language}&key=${weathwebitKey}&hours=48&`;
    const res = await fetch(url1);
    const url2 = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${coords.latitude}&lon=${coords.longitude}&lang=${language}&key=${weathwebitKey}&days=16&`;
    const res2 = await fetch(url2);
    const data = await res.json();
    const data2 = await res2.json();
    drawWeatherCard(data, data2, language);
    drawInterfaceInfo(language, city, country, coords.latitude, coords.longitude);
  } catch (err) {
    message.innerText = `ERROR CATCH(${err.code}): ${err.message}`;
    console.warn(`ERROR CATCH(${err.code}): ${err.message}`);
  }
}
