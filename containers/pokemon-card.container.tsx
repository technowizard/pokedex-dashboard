import type { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { VStack, Text } from '@chakra-ui/react';

import Card from '~/components/card.component';

import TypeBadge from './type-badge.container';

import { usePokemon } from '~/hooks/usePokeApi.hooks';

import { capitalizeFirstLetter } from '~/utils/pokemon-util';

interface PokemonCardProps {
  id: string;
}

const PokemonCard: FC<PokemonCardProps> = ({ id }) => {
  const router = useRouter();

  const { pokemon, isLoading } = usePokemon(id);

  return (
    <Card w="100%" cursor="pointer" p={6} onClick={() => router.push(`/pokemon/${pokemon?.name}`)}>
      {!isLoading && (
        <VStack>
          <Text mb={4} fontWeight="bold">
            {capitalizeFirstLetter(pokemon?.name)}
          </Text>
          <Image
            priority
            alt="pokemon-sprite"
            layout="fixed"
            width={160}
            height={160}
            src={
              pokemon?.sprites?.other['official-artwork']['front_default'] || '/images/pokeball.png'
            }
          />
          <Text fontWeight="semibold">Type</Text>
          <TypeBadge types={pokemon?.types} />
        </VStack>
      )}
    </Card>
  );
};

export default PokemonCard;
