import setInterval from '../js/setInterval';

describe('Get day', () => {
  it('it should return day', () => {
    const result = setInterval(new Date('Sun May 31 2020 14:10:09 GMT+0300').getDay());
    expect(result).toEqual(4);
  });
});

describe('Get season', () => {
  it('it should return month', () => {
    const result = setInterval(new Date('15 Mar 2020 08:00:0 GMT').getMonth());
    expect(result).toEqual(7);
  });
});
