import getGeoData from '../js/getGeoData';

describe('Testing firstPage function', () => {
  it('it should be true or false', () => {
    const data = getGeoData();
    expect(data).toBeInstanceOf(Object);
  });
});
