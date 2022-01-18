import { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './global.css';
import { Web3ContextProvider } from '../context';
import { DSLAModalsProvider } from '../context';
import { DSLAModalsCenter } from '../containers';
import { DSLAThemeProvider } from '../dsla-theme';
import { CssBaseline } from '@mui/material';

export default function Crowdfunding({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Solar Crowdfunding</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
      </Head>
      <DSLAModalsProvider>
        <DSLAThemeProvider>
          <CssBaseline />
          <Web3ContextProvider>
            <Component {...pageProps} />
          </Web3ContextProvider>
          <DSLAModalsCenter />
        </DSLAThemeProvider>
      </DSLAModalsProvider>
    </>
  );
}
