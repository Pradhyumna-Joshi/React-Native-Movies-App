import {API_KEY, BASE_URL} from './Constants';

export const getMovies = async url => {
  const API = `${BASE_URL}${url}?api_key=${API_KEY}`;

  let response = await fetch(API, {
    method: 'GET',
  });

  response = response.json();
  return response;
};
