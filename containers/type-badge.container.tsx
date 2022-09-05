import { Flex, Box, Text } from '@chakra-ui/react';

import { capitalizeFirstLetter, parseTypeColor } from '~/utils/pokemon-util';

const TypeBadge = ({ types }) => {
  return (
    <Flex direction="row" gap={4}>
      {types.length > 0 &&
        types.map((item: any, index: number) => (
          <Flex key={index} direction="row" alignItems="center">
            <Box
              mr={2}
              borderRadius={40}
              w="14px"
              h="14px"
              bgColor={parseTypeColor(item.type.name)}
            />
            <Text fontWeight="semibold" fontSize="18px">
              {capitalizeFirstLetter(item.type.name)}
            </Text>
          </Flex>
        ))}
    </Flex>
  );
};

export default TypeBadge;
