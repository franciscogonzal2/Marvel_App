const marvelURL = 'https://gateway.marvel.com/v1/public/';
const apiKey = `apikey=${'f55f076c5b567439937732604afa33da'}`;
const ts = `ts=${'1&'}`;
const hash = `&hash=${'a0923bc8f5f2267a8918c26fc1a9deb1'}`;
const getMarvelCharacters = options => {
  const { offset, name, exactMatch, sortName, limit } = Object.assign(
    {
      offset: 0,
      name: '',
      exactMatch: false,
      sortName: '',
      limit: 20
    },
    options
  );

  let url = `${marvelURL}characters?${ts}${apiKey}${hash}&offset=${offset}&orderBy=${sortName}name&limit=${limit}`;
  if (name) {
    if (exactMatch) {
      url += `&name=${name}`;
    } else {
      url += `&nameStartsWith=${name}`;
    }
  }
  return fetch(url).then(res => res.json()).then(resObj => {
    try {
      if (resObj.code === 200) {
        if (offset > resObj.data.total) {
          throw new Error('Page does not exist.');
        } else {
          const pages = Math.floor(resObj.data.total / limit);
          return {
            characters: resObj.data.results,
            maxPage: resObj.data.total % limit > 0 ? pages + 1 : pages
          };
        }
      } else {
        throw new Error(`Marvel API bad response. Status code ${resObj.code}.`);
      }
    } catch (e) {
      console.error(e);
      return {
        characters: [],
        maxPage: 0
      };
    }
  });
};

export { getMarvelCharacters };
