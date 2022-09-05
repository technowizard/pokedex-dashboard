import { useState, useEffect, Suspense } from 'react';
import type { NextPage } from 'next';

import {
  Flex,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Spinner
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { useDebounce } from 'use-debounce';

import PokemonCard from '~/containers/pokemon-card.container';

import allPokemons from '~/constants/pokemon.json';

import DashboardLayout from '~/layouts/dashboard.layout';

import { usePokemonLists } from '~/hooks/usePokeApi.hooks';

import { getPokemonIdByUrl } from '~/utils/pokemon-util';

const Home: NextPage = () => {
  const { pokemonLists = [], isLoading } = usePokemonLists();

  const [search, setSearch] = useState('');
  const [filteredList, setFilteredList] = useState(pokemonLists);

  const [searchQuery] = useDebounce(search, 500);

  useEffect(() => {
    setFilteredList(pokemonLists);

    if (searchQuery && searchQuery.length >= 3) {
      let result = [];

      result = allPokemons.data.filter(item => item.name.includes(searchQuery.toLowerCase()));

      setFilteredList(result);
    } else {
      setFilteredList(pokemonLists);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, pokemonLists]);

  const handleSearch = event => {
    event.preventDefault();

    setSearch(event.target.value);
  };

  return (
    <DashboardLayout title="Pokemon Lists">
      <Suspense fallback={null}>
        {!isLoading ? (
          <>
            <Box mb={8}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiSearch />
                </InputLeftElement>
                <Input
                  borderColor="black.500"
                  focusBorderColor="brand.500"
                  _hover={{ borderColor: 'brand.500' }}
                  type="text"
                  placeholder="Search Pokemon"
                  onChange={handleSearch}
                />
              </InputGroup>
            </Box>
            <SimpleGrid columns={[1, 2, null, 4]} spacing={8}>
              {filteredList.map((item: any, index: number) => {
                const pokemonId = getPokemonIdByUrl(item.url);

                return <PokemonCard key={index} id={pokemonId} />;
              })}
            </SimpleGrid>
          </>
        ) : (
          <Flex justifyContent="center">
            <Spinner size="xl" />
          </Flex>
        )}
      </Suspense>
    </DashboardLayout>
  );
};

export default Home;
