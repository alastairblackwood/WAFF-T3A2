const filterByTerm = require('../filterByTerm');

describe('Filter function', () => {
  test('it should filter by a search term (link)', () => {
    // DEFINING THE INPUT
    const input = [
      { id: 1, url: 'https://www.url1.dev' },
      { id: 2, url: 'https://www.url2.dev' },
      { id: 3, url: 'https://www.link3.dev' },
    ];
    // DEFINING THE EXPECTED RESULT
    const output = [{ id: 3, url: 'https://www.link3.dev' }];

    // DEFINING THE TEST
    // function = 'filterByTerm(inputArr, "link"); *wrap it inside 'expect'
    expect(filterByTerm(input, 'link')).toEqual(output);

    expect(filterByTerm(input, 'LINK')).toEqual(output); // New test
  });
});
