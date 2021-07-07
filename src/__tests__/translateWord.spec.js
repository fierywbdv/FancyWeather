import translateWord from '../js/translateWord';

describe('Testing translateWord function', () => {
  it('it should be true or false', () => {
    const wordInput = 'мама';
    const data = translateWord(wordInput, 'en');
    expect(data).toBeInstanceOf(Object);
  });
});
