import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#00AAFF',
      dark: '#A566FF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#0F1E29',
      dark: '#EE6C4D',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#9996A8',
      contrastText: '#FFFFFF',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF', // #081016
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '32px',
          padding: '12.5px 25px',
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
        },
        h1: {
          fontWeight: 500,
          fontSize: '4.5rem',
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
          fontSize: '1.2rem',
        },
        h5: {
          fontWeight: 400,
          fontSize: '1rem',
        },
      },
    },
  },
};

export const theme: Theme = createTheme(lightTheme)
