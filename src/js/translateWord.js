
const message = document.querySelector('.message-wrapper');
const langYandexKey = 'trnsl.1.1.20200501T172144Z.c784356c3f286594.5cbbf7226bde620d92ce5f3996d05cc59c7d6a7a';
export default async function translateWord(word, lang) {
  try {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${langYandexKey}&text=${word}&lang=${lang}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.text.join();
  } catch (err) {
    message.innerText = `ERROR CATCH(${err.code}): ${err.message}`;
    console.warn(`ERROR CATCH(${err.code}): ${err.message}`);
    throw err;
  }
}
