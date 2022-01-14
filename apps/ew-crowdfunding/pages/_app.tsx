import { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './global.css';
import CssBaseline from '@mui/material/CssBaseline';
import { Web3ContextProvider } from '../web3';
import { DSLAThemeProvider } from '../theme';
import { DSLAModalsProvider } from '../modals';
import { DSLAModalsCenter } from '../containers';

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
