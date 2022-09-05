import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import pokeApi from '~/libs/pokeapi';

import { getPokemonIdByUrl, getPokemonImageById } from '~/utils/pokemon-util';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id }
  } = req;

  const { data: pokemonSpeciesData } = await pokeApi.get(`/pokemon-species/${id}`);

  const pokemonIdInChain = getPokemonIdByUrl(pokemonSpeciesData.evolution_chain.url as string);

  const { data: evolutionChain } = await pokeApi.get(`/evolution-chain/${pokemonIdInChain}`);

  const results = evolutionChain.chain.evolves_to.map(evolves => {
    const { name: baseFormName, url: baseFormUrl } = evolutionChain.chain.species;

    const first_form = {
      id: getPokemonIdByUrl(baseFormUrl),
      name: baseFormName,
      url: evolutionChain.chain.species.url,
      image: getPokemonImageById(getPokemonIdByUrl(baseFormUrl))
    };

    let third_form = null;

    if (evolves.evolves_to.length !== 0) {
      evolves.evolves_to.map(secondEvolves => {
        const secondEvolutionPokemonId = getPokemonIdByUrl(secondEvolves.species.url);

        third_form = {
          id: secondEvolutionPokemonId,
          name: secondEvolves.species.name,
          url: secondEvolves.species.url,
          image: getPokemonImageById(secondEvolutionPokemonId)
        };

        return third_form;
      });
    }

    const firstEvolutionPokemonId = getPokemonIdByUrl(evolves.species.url);

    const second_form = {
      id: firstEvolutionPokemonId,
      name: evolves.species.name,
      url: evolves.species.url,
      image: getPokemonImageById(firstEvolutionPokemonId)
    };

    return {
      first_form,
      second_form,
      third_form
    };
  });

  return res.status(200).json(results[0]);
};

export default handler;
