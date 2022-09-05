import { useRouter } from 'next/router';
import Image from 'next/image';

import { Flex, Box, Text, VStack, Divider, Spinner, Stack } from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';

import { useEvolutionChain, usePokemon, useSpecies } from '~/hooks/usePokeApi.hooks';

import AbilityInfo from '~/containers/ability-info.container';
import PokemonCard from '~/containers/pokemon-card.container';
import TypeBadge from '~/containers/type-badge.container';

import DashboardLayout from '~/layouts/dashboard.layout';

import { capitalizeFirstLetter, parseBaseStatsName } from '~/utils/pokemon-util';

const PokemonDetailsPage = () => {
  const router = useRouter();

  const pokemonName = router?.query?.name as string;

  const { pokemon, isLoading: isPokemonLoading } = usePokemon(pokemonName);

  const pokemonId = pokemon?.id;

  const { species } = useSpecies(pokemonId);
  const { evolutionChain } = useEvolutionChain(pokemonId);

  return (
    <DashboardLayout
      canGoBack
      title={!isPokemonLoading ? capitalizeFirstLetter(pokemonName) : 'Loading...'}
    >
      {!isPokemonLoading ? (
        <>
          <Flex justifyContent="center" gap={8} mb={8}>
            <VStack alignSelf="center">
              <Text color="black" fontWeight="bold" fontSize={24} mb={4}>
                {capitalizeFirstLetter(pokemonName)}
              </Text>
              <Image
                alt="pokemon-sprite"
                layout="fixed"
                width={240}
                height={240}
                src={
                  pokemon?.sprites?.other['official-artwork']['front_default'] ||
                  '/images/pokeball.png'
                }
              />
              <Flex
                direction={['column', 'row']}
                justifyContent="center"
                gap={8}
                textAlign="center"
              >
                <Box>
                  <Text color="black" fontWeight="medium" mb={2}>
                    Type
                  </Text>
                  <Flex direction="row" alignItems="center" gap={4}>
                    <TypeBadge types={pokemon?.types} />
                  </Flex>
                </Box>
                <Box>
                  <Text color="black" fontWeight="medium" mb={2}>
                    Height
                  </Text>
                  <Text fontWeight="semibold" fontSize="18px">{`${pokemon?.height / 10} m`}</Text>
                </Box>
                <Box>
                  <Text color="black" fontWeight="medium" mb={2}>
                    Weight
                  </Text>
                  <Text fontWeight="semibold" fontSize="18px">{`${pokemon?.weight / 10} kg`}</Text>
                </Box>
              </Flex>
            </VStack>
          </Flex>
          <Flex direction={['column', 'row']} justifyContent="center" gap={8}>
            <Box w={['100%', '50%']}>
              <Text color="black" fontWeight="bold" fontSize={20} mb={4}>
                Description
              </Text>
              <Flex direction="column" gap={2}>
                {species?.flavor_text_entries[1].flavor_text}
              </Flex>
            </Box>
            <Box w={['100%', '50%']}>
              <Text color="black" fontWeight="bold" fontSize={20} mb={4}>
                Base Stats
              </Text>
              <Flex direction="column" gap={2}>
                {pokemon?.stats.map((item: any, index: number) => {
                  const statsName = parseBaseStatsName(item.stat.name);
                  const baseStat = item.base_stat;

                  return (
                    <Flex justifyContent="space-between" maxW="160px" gap={8} key={index}>
                      <Box>
                        <Text fontWeight="semibold">{statsName}</Text>
                      </Box>
                      <Box>
                        <Text>{baseStat}</Text>
                      </Box>
                    </Flex>
                  );
                })}
              </Flex>
            </Box>
          </Flex>
          <Divider borderColor="gray.400" my={4} />
          <Box>
            <Text color="black" fontWeight="semibold" fontSize={20} mb={4}>
              Evolution Chains
            </Text>
            {evolutionChain ? (
              <Stack
                direction={['column', 'row']}
                spacing={4}
                justifyContent="center"
                alignItems="center"
              >
                <Box>
                  <PokemonCard id={evolutionChain?.first_form?.id} />
                </Box>
                <Box>
                  <FiArrowRight size={32} />
                </Box>
                <Box>
                  <PokemonCard id={evolutionChain?.second_form?.id} />
                </Box>
                {evolutionChain?.third_form && (
                  <>
                    <Box>
                      <FiArrowRight size={32} />
                    </Box>
                    <Box>
                      <PokemonCard id={evolutionChain?.third_form?.id} />
                    </Box>
                  </>
                )}
              </Stack>
            ) : (
              <Text>This pokemon doesn&apos;t have evolution</Text>
            )}
          </Box>

          <Divider borderColor="gray.400" my={4} />
          <Box>
            <Text color="black" fontWeight="semibold" fontSize={20} mb={4}>
              Abilities
            </Text>
            <Flex direction="column" gap={4}>
              {pokemon?.abilities.map((item: any, index: number) => (
                <AbilityInfo key={index} abilityName={item.ability.name} />
              ))}
            </Flex>
          </Box>
        </>
      ) : (
        <Flex justifyContent="center" alignItems="center" minH="400px">
          <Spinner size="xl" />
        </Flex>
      )}
    </DashboardLayout>
  );
};

export default PokemonDetailsPage;
