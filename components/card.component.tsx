import type { ReactNode } from 'react';

import { Box, BoxProps, ChakraProps } from '@chakra-ui/react';

interface CardProps extends ChakraProps {
  children: ReactNode;
}

const Card = ({ children, ...otherProps }: CardProps & BoxProps) => (
  <Box
    bgColor="white"
    borderRadius={8}
    p={6}
    boxShadow="0px 2px 8px rgba(0,0,0,0.24)"
    {...otherProps}
  >
    {children}
  </Box>
);

export default Card;
