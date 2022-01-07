import { AppProps } from 'next/app';
import Head from 'next/head';
import './global.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect } from 'react';
import { lightTheme } from '../theme';

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
        <title>Welcome to ew-crowdfunding!</title>
      </Head>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <main className='app'>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  );
}
