import { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './global.css';
import { DSLAModalsProvider } from '../context';
import { DSLAModalsCenter } from '../containers';
import { DSLAThemeProvider } from '../dsla-theme';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from '../redux-store';

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
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <title>Solar Crowdfunding</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
        <meta name='theme-color' content='#00AAFF' />
      </Head>
      <DSLAModalsProvider>
        <DSLAThemeProvider>
          <CssBaseline />
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
          <DSLAModalsCenter />
        </DSLAThemeProvider>
      </DSLAModalsProvider>
    </>
  );
}
