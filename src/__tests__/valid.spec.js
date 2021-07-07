import hasLetter from '../js/validation';


describe('Testing hasRussianLetter function', () => {
  it('it should be true or false', () => {
    const wordInput = 'минск';
    expect(hasLetter(wordInput)).toBe(true);
  });

  it('it should be true or false', () => {
    const wordInput = 'minsk';
    expect(hasLetter(wordInput)).toBe(true);
  });


  it('it should be true or false', () => {
    const wordInput = 'МИНСК';
    expect(hasLetter(wordInput)).toBe(true);
  });

  it('it should be true or false', () => {
    const wordInput = 'MINSK';
    expect(hasLetter(wordInput)).toBe(true);
  });

  it('it should be true or false', () => {
    const wordInput = '````';
    expect(hasLetter(wordInput)).toBe(false);
  });

  it('it should be true or false', () => {
    const wordInput = '1111';
    expect(hasLetter(wordInput)).toBe(false);
  });


  it('it should be true or false', () => {
    const wordInput = '432234wrfwerf';
    expect(hasLetter(wordInput)).toBe(false);
  });
});
