const message = document.querySelector('.message-wrapper');
// -----------------переводчик с автоопределением языка----------------
// export default async function translateWord(word, lang) {
//   try {
//     detectlanguage.detect(word).then((result) => {
//       const wordLang = JSON.stringify(result[0].language).slice(1, 3);
//       console.log(wordLang);
//     });
//     const res = await fetch(`
//     https://webit-translator.p.rapidapi.com/translate?text=${word}&to=${lang}`, {
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json',
//         'x-rapidapi-key': '8c7a62bd09msha0fcd2de5032f4ap1e9fbdjsncf7dd3c862f8',
//         'x-rapidapi-host': 'webit-translator.p.rapidapi.com',
//       },
//       body: {
//         key1: 'value',
//         key2: 'value',
//       },
//     });
//     const data = await res.json();
//     console.log(data.data.translation.slice(0, -1));
//     return data.data.translation.slice(0, -1);
//   } catch (err) {
//     message.innerText = `ERROR CATCH(${err.code}): ${err.message}`;
//     console.warn(`ERROR CATCH(${err.code}): ${err.message}`);
//     throw err;
//   }
// }
// ---------------------------------------------------------------------------
export default async function translateWord(word, lang) {
  try {
    let wordLang = '';
    if (word.match(/[а-яА-Я]/) || word === 'Беларусь') {
      wordLang = 'ru';
    } else if (word.match(/[a-zA-Z]/)) {
      wordLang = 'en';
    } else {
      wordLang = 'be';
    }

    console.log(wordLang, lang);

    if (wordLang !== lang) {
      const res = await fetch(
        `https://translated-mymemory---translation-memory.p.rapidapi.com/api/get?q=${word}&langpair=${wordLang}|${lang}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key':
              '8c7a62bd09msha0fcd2de5032f4ap1e9fbdjsncf7dd3c862f8',
            'x-rapidapi-host':
              'translated-mymemory---translation-memory.p.rapidapi.com',
          },
        },
      );
      const data1 = await res.json();
      return data1.responseData.translatedText;
    }
    return word;
  } catch (err) {
    message.innerText = `ERROR CATCH(${err.code}): ${err.message}`;
    console.warn(`ERROR CATCH(${err.code}): ${err.message}`);
    throw err;
  }
}
