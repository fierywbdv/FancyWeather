import state from './state';

const unsplashKey = 'CN1uDOn-LukSJCqBoLaoXnqlPkAnXzRpWGWsKEPs35o';

export default async function getBackgroundImage(city) {
  const message = document.querySelector('.message-wrapper');
  const date = new Date();
  const currentMonth = date.toLocaleString(state.language, {
    month: 'numeric',
    hour12: false,
    timeZone: state.timeZone,
  });
  const currentHour = date.toLocaleString(state.language, {
    hour: 'numeric',
    hour12: false,
    timeZone: state.timeZone,
  });

  let quarter;
  let hour;
  if (state.coords.latitude > 0) {
    if (currentMonth < 3) {
      quarter = 'winter';
    } else if (currentMonth < 6 && currentMonth > 2) {
      quarter = 'spring';
    } else if (currentMonth < 9 && currentMonth > 5) {
      quarter = 'summer';
    } else if (currentMonth < 12 && currentMonth > 4) {
      quarter = 'autumn';
    }
  }
  if (state.coords.latitude < 0) {
    if (currentMonth < 3) {
      quarter = 'summer';
    } else if (currentMonth < 6 && currentMonth > 2) {
      quarter = 'autumn';
    } else if (currentMonth < 9 && currentMonth > 5) {
      quarter = 'winter';
    } else if (currentMonth < 12 && currentMonth > 4) {
      quarter = 'spring';
    }
  }
  if (currentHour < 13 && currentHour > 4) {
    hour = 'morning';
  } else if (currentHour < 16 && currentHour > 12) {
    hour = 'daytime ';
  } else if (currentHour < 25 && currentHour > 15) {
    hour = 'evening';
  } else if (currentHour < 5 && currentHour >= 0) {
    hour = 'night';
  }
  console.log(`request:${quarter},${hour},${city}`);

  try {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${quarter} ${hour} ${city}&client_id=${unsplashKey}`;
    const res = await fetch(url);
    const data = await res.json();
    const img = await fetch(data.urls.regular);
    const blob = await img.blob();
    document.querySelector('.background').style.backgroundImage = `url(${URL.createObjectURL(blob)})`;
  } catch (err) {
    document.querySelector('.background').style.backgroundImage = 'url(../assets/image/bg.png)';
    message.innerText = `ERROR CATCH(${err.code}): ${err.message}`;
    console.warn(`ERROR CATCH(${err.code}): ${err.message}`);
  }
}

document.querySelector('.switch-image').addEventListener('click', async () => {
  await getBackgroundImage(state.cityName);
});
