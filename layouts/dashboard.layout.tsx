import { FC, ReactNode } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { ChakraProps, Flex, Box, Text, Spacer } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';

import Card from '~/components/card.component';

interface LayoutProps extends ChakraProps {
  children: ReactNode;
  title: string;
  canGoBack?: boolean;
}

interface NavbarProps {
  title: string;
  canGoBack?: boolean;
}

const Sidebar: FC<ChakraProps> = () => {
  return (
    <Box as="aside" bg="#E33142" w="240px" pos="fixed" h="100vh" py={4} display={['none', 'block']}>
      <Flex direction="column" h="full">
        <Box mb={5} ml={5}>
          <Image
            alt="pokemon-logo"
            layout="fixed"
            width={200}
            height={125}
            src="/images/pokemon-logo.svg"
          />
        </Box>
      </Flex>
    </Box>
  );
};

const Navbar: FC<NavbarProps> = ({ title, canGoBack }) => {
  const router = useRouter();

  return (
    <Flex
      as="nav"
      height={16}
      align="center"
      py={4}
      px={6}
      ml={['0px', '240px']}
      bgColor="white"
      borderBottom="1px solid #D2D2D2"
    >
      <Flex direction="row" align="center">
        {canGoBack ? (
          <Box as="button" mr={4} onClick={() => router.back()}>
            <FiArrowLeft size={24} />
          </Box>
        ) : null}
        <Box>
          <Text fontSize="20px" fontWeight="semibold">
            {title}
          </Text>
        </Box>
      </Flex>
      <Spacer />
    </Flex>
  );
};

const DashboardLayout: FC<LayoutProps> = ({ children, title, canGoBack }) => (
  <Flex direction="column" h="100vh">
    <Head>
      <title>{`${title} | PokeDex Dashboard`}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link href="/favicon.svg" rel="shortcut icon" />
    </Head>
    <Sidebar />
    <Navbar canGoBack={canGoBack} title={title} />
    <Flex flex="1" direction="column" p={6} bgColor="#f3f5fa">
      <Box ml={['0px', '240px']}>
        <Card>{children}</Card>
      </Box>
    </Flex>
  </Flex>
);

export default DashboardLayout;
