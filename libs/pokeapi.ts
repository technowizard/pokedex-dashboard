import axios from 'axios';

const pokeApiUrl = process.env.NEXT_PUBLIC_POKEAPI_URL || '';

const pokeApi = axios.create({
  baseURL: pokeApiUrl
});

export default pokeApi;
