import type { AppProps } from 'next/app';
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from '../chakra/theme';
import Layout from '../components/layouts/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;