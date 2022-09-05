import useSWR from 'swr';

import fetcher from '~/libs/fetcher';

const pokeApiUrl = process.env.NEXT_PUBLIC_POKEAPI_URL || '';

export const usePokemonLists = (limit?: number) => {
  let url = `${pokeApiUrl}/pokemon`;

  if (limit) {
    url += `?limit=${limit}`;
  }

  const { data, error } = useSWR(url, fetcher);

  return {
    pokemonLists: data?.results,
    isLoading: !error && !data,
    isError: error
  };
};

export const usePokemon = (id: string) => {
  const url = `${pokeApiUrl}/pokemon/${id}`;

  const { data, error } = useSWR(id ? url : null, fetcher);

  return {
    pokemon: data,
    isLoading: !error && !data,
    isError: error
  };
};

export const useAbilities = (name: string) => {
  const url = `${pokeApiUrl}/ability/${name}`;

  const { data, error } = useSWR(name ? url : null, fetcher);

  return {
    abilities: data,
    isLoading: !error && !data,
    isError: error
  };
};

export const useSpecies = (id: number) => {
  const url = `${pokeApiUrl}/pokemon-species/${id}`;

  const { data, error } = useSWR(id ? url : null, fetcher);

  return {
    species: data,
    isLoading: !error && !data,
    isError: error
  };
};

export const useEvolutionChain = (id: string) => {
  const url = `/api/evolution/${id}`;

  const { data, error } = useSWR(id ? url : null, fetcher);

  return {
    evolutionChain: data,
    isLoading: !error && !data,
    isError: error
  };
};
