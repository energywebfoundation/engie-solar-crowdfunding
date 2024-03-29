import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';

const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#00AAFF',
      dark: '#0F1E29',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#23D2B5',
      dark: '#0E2333',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#9996A8',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#E74A50',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF', // #081016
    },
  },
  typography: {
    fontFamily: 'Lato',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0',
          padding: '8px 24px',
          fontSize: '15px',
          lineHeight: '34px',
          width: 'auto'
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '60px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          lineHeight: '1.6',
        },
        h1: {
          fontWeight: 500,
          fontSize: '4rem',
        },
        h2: {
          fontWeight: 400,
          fontSize: '3rem',
        },
        h3: {
          fontWeight: 400,
          fontSize: '2rem',
        },
        h4: {
          fontWeight: 400,
          fontSize: '1.3rem',
        },
        h5: {
          fontWeight: 400,
          fontSize: '1rem',
        },
      },
    },
  },
};

export const theme: Theme = createTheme(lightTheme);
