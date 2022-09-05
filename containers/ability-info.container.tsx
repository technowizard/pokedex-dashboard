import { useState, useEffect } from 'react';

import { Flex, Box, UnorderedList, Text, ListItem } from '@chakra-ui/react';

import { useAbilities } from '~/hooks/usePokeApi.hooks';
import { parseAbilityName } from '~/utils/pokemon-util';

const AbilityInfo = ({ abilityName }) => {
  const [pokemonAbility, setPokemonAbility] = useState(null);
  const { abilities, isLoading } = useAbilities(abilityName);

  useEffect(() => {
    getDescription();

    // eslint-disable-next-line
  }, [abilities]);

  const getDescription = () => {
    abilities?.effect_entries.forEach((el: any) => {
      if (el.language.name === 'en') {
        setPokemonAbility({ name: el.name, description: el.effect });
        return;
      }
    });
  };

  return (
    <Flex direction="column">
      {!isLoading && (
        <UnorderedList>
          <ListItem>
            <Text fontWeight="semibold">{parseAbilityName(abilityName)}</Text>
            <Box>{pokemonAbility?.description}</Box>
          </ListItem>
        </UnorderedList>
      )}
    </Flex>
  );
};

export default AbilityInfo;
